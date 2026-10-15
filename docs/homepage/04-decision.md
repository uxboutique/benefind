# 04 — Technical decision: motion stack

_Date: 2026-10-15 · Phase 4 · Status: **approved and implemented** (as-built notes at the end)_

## Decision

**CSS transitions/keyframes + one shared IntersectionObserver + CSS scroll-driven animations (`animation-timeline: view()`, with `@supports` fallback). Native scrolling. No animation or scroll dependency.**

All motion code lives in `components/motion/` + `styles/motion.css` + `lib/motion/tokens.ts`. The estimate is ~3–4 KB gz of first-party JS, to be measured in Phase 8.

## What the matrix needs

| Need | Matrix rows | Minimum capability |
|---|---|---|
| One-shot reveals with stagger | M1, M3, M5, M6 | time-based transitions triggered once on entry |
| Line-split headlines | M3 | split text into measured lines; no plugin needed |
| Scrubbed, reversible scroll-linked motion | M7, M8, M9 | scroll progress → transform/opacity |
| Header hide/show | M2 | scroll direction (one passive listener) |
| Carousels | M11 | snap scrolling with buttons and keyboard |
| Menu | M13 | class toggles, focus management |
| **Not needed** | M10 (pinning), M18 (smooth scroll) | — |

Nothing needs pinning, timeline sequencing across sections, or scroll smoothing. That's what decides the stack.

## Candidates compared (sizes measured today, min + gzip)

| Candidate | SSR / hydration (Next 16, RSC) | Control | Runtime perf | Touch | Reduced motion | Bundle | Maintenance | Works with the rest |
|---|---|---|---|---|---|---|---|---|
| **CSS transitions / keyframes** | ✔ zero JS; Server Components stay server | Enough for one-shot reveals, staggers via `--d` | Compositor-only (transform/opacity) | n/a | `@media` query, trivial | 0 | Lowest | ✔ |
| **IntersectionObserver** | ✔ runs after hydration; content visible without JS | Precise thresholds, once-only | Async, no scroll handlers | ✔ | Skip observing | ~1 KB own code | Low | ✔ triggers the CSS above |
| **CSS scroll-driven animations** | ✔ pure CSS | Scrub by `view()` / `scroll()` ranges | Off main thread in Chromium (compositor) | ✔ native scroll | `@media` query | 0 | Low; needs a fallback path | ✔ fallback = IO reveal / static |
| **Motion** (`motion` 14.2) | Needs `"use client"` on animated nodes; fine but pushes sections client-side | Excellent | Good (WAAPI) | ✔ | `useReducedMotion` | `motion/react` full **45.1 KB**; `LazyMotion+domAnimation` **31.0 KB**; vanilla `animate/inView/scroll` **26.8 KB** | Medium | Overlaps with CSS + IO |
| **GSAP + ScrollTrigger** (3.15) | Client-only, `useGSAP`/cleanup | Best for pinning and timelines | Very good, but main-thread rAF | ✔ (with care) | Manual (`matchMedia`) | core **28.3 KB** + ScrollTrigger **18.0 KB** = **46.3 KB** | Medium (refresh on resize/font load, Strict Mode cleanup) | Needs a shared ticker if Lenis is added |
| **Lenis** (1.3.26) | Client-only | Smooth wheel inertia | Adds a rAF loop for the page's lifetime | Off on touch by default | Must be disabled manually | **5.4 KB** | Low–medium (anchors, `scroll-padding`, modals need `stop()`) | Must drive ScrollTrigger from its RAF if both are used |

Bundle measurement: `npm pack` dist files and an esbuild ESM bundle with React external (`scratchpad`), gzip -9.

## Why the alternatives were rejected

- **GSAP + ScrollTrigger.** Its strengths (pinning, scrubbed multi-step timelines) map to M10, which is **skipped**. The two scrubbed effects we keep (M7–M9) are single-property, single-element animations that CSS scroll-driven animations express natively and off the main thread. It would add 46 KB gz and lifecycle code (refresh, cleanup, Strict Mode) for no visible gain.
- **Motion / Framer Motion.** It would duplicate what CSS + IO already do (two libraries solving the same problem is ruled out by the brief). It also forces animated sections into client components, adding 27–45 KB gz.
- **Lenis.** Native scrolling isn't "clearly insufficient" here:
  1. Apple, the reference for scroll continuity, uses native scroll.
  2. ICON itself switches Lenis **off** on touch, below 1024px and on reduced motion, so most visitors never get it.
  3. Smooth-wheel inertia on a corporate site with anchors, keyboard and assistive-tech users is a net risk for a sober brief.
  4. It would add a permanent rAF loop.
  It can be revisited after the build if the client explicitly wants the ICON "glide". The integration plan is already written in "Escape hatch" below.

## Animation architecture

```
app/layout.tsx
  <html className="no-js">  + inline <script> in <head>: swaps no-js→js before first paint
                              (reveal "hidden" states exist ONLY under .js; SSR HTML is fully visible)
  <MotionRoot/>  (single "use client" island, renders null)
     ├─ one IntersectionObserver  → adds .is-in to [data-reveal], [data-split], .media  (once, then unobserve)
     ├─ applies --d stagger to children of [data-stagger]
     ├─ header controller: passive scroll + rAF throttle → toggles .is-hidden on <header> (no React state)
     └─ honours matchMedia('(prefers-reduced-motion: reduce)') live (change listener)
components/motion/SplitLines.tsx  ("use client")
     server renders plain text → after fonts.ready measures lines → wraps in .split-line spans
     re-splits on width change (ResizeObserver, debounced); text stays real DOM text
hooks/useCarousel.ts
     scroll-snap track; IO on slides → active index → data-active attribute; buttons → scrollBy;
     ArrowLeft/Right on the track; disabled state at ends
styles/motion.css
     tokens, .js-scoped initial states, transitions, @keyframes heroIn,
     @supports (animation-timeline: view()) { M7/M8/M9 }, @media (prefers-reduced-motion) overrides
```

Rules this architecture enforces:
- Only `transform` and `opacity` are animated (the static `backdrop-filter` and light-band `filter: blur` are never transitioned).
- No React state updates on scroll. All per-frame work is class or custom-property toggling.
- Effects initialise once, guarded against Strict Mode double-mount by an idempotent `init` that returns a cleanup which disconnects observers and listeners.
- No content is ever hidden without JS. A visitor whose scripts fail sees the final state.
- Scroll-driven effects are progressive enhancement. Browsers without `animation-timeline` support (Chromium has it from 115; Safari and Firefox support must be verified at QA time) get the one-shot M5 reveal or a static final state.

## Motion tokens (single source)

`styles/tokens.css` (consumed by CSS) mirrored in `lib/motion/tokens.ts` (consumed by JS for IO margins and stagger math):

```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* entrances */
  --ease-io:  cubic-bezier(0.65, 0, 0.35, 1);  /* state changes */
  --dur-ui: 200ms;
  --dur-reveal: 700ms;
  --dur-lines: 800ms;
  --dur-media: 1200ms;
  --dur-hero: 1100ms;
  --reveal-distance: 24px;
  --stagger: 80ms;
  --stagger-lines: 90ms;
  --media-scale-from: 1.06;
}
```

IO settings: `rootMargin: '0px 0px -12% 0px'`, `threshold: 0.01` (ICON's values, which feel right for a calm reveal).

## Dependencies

- **Added for motion:** none.
- **Project (from 01-audit):** `next@16.4.1`, `react@19.3.1`, `react-dom@19.3.1`, dev `typescript@6.0.3`, `eslint`, `eslint-config-next@16.4.1`, `@types/*`, `@playwright/test@1.56.1` (QA only).

## Risks

| Risk | Mitigation |
|---|---|
| Line splitting causes layout shift or breaks on font swap | Split only after `document.fonts.ready`. Rows use `display:block` with the same line-height, so the split DOM occupies identical geometry. Measured with CLS in Phase 8 |
| Screen readers reading split spans oddly | Words stay in normal text nodes with real spaces; no `aria-hidden` duplicates. Verified with the accessibility tree in Phase 7 |
| Scroll-driven CSS unsupported in some browsers | `@supports` gate; the fallback is the IO reveal |
| Glass `backdrop-filter` + scroll-driven transforms on the same layer → jank | Never animate a layer that carries `backdrop-filter`. M8 animates the panel's wrapper; verified in the performance trace |
| Header hide surprises keyboard users | Never hidden while focus is inside the header or the menu is open; shown on `focusin` |
| Carousel scroll-snap + smooth `scrollBy` can't use custom easing | Accepted: native feel and touch physics outweigh matching ICON's 1.2 s curve |

## Escape hatch (only if approved later)

If pinning or Lenis becomes a requirement, add `gsap` + `ScrollTrigger` + `lenis` together and drive them from one RAF: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. Create Lenis only for `(pointer: fine)` and ≥1024 without reduced motion. Stop it while the menu is open. Keep `scroll-padding-top` for anchors.

## As-built notes (Phases 6–8)

- **Measured footprint of the motion layer:** `MotionRoot` + `SplitLines` + tokens = **2.4 KB min / 1.3 KB gz** JS (esbuild, React external); `styles/motion.css` = **1.6 KB gz** (unminified source). No animation dependencies were added.
- **Gotcha found and fixed:** `overflow: hidden` on a section makes it a *scroll container*, so `view()` timelines inside it track a box that never scrolls (the stats panel was stuck at 67% progress). The Services and Careers sections use **`overflow: clip`** instead: same clipping, no scroll container.
- Scroll-linked effects use **named** `view-timeline`s on static wrappers (`[data-*-scope]`), never on the moving element itself, so the motion can't feed back into its own progress.
- **Boot safety:** the inline head script adds `js` before first paint. If `MotionRoot` hasn't set `motion-ready` within 4 s, `motion-fallback` forces all content visible.
- **Header hide (M2):** locked while the menu is open or a header element has `:focus-visible` (keyboard), so it never hides from keyboard users.
- **Scroll performance** (`docs/homepage/perf/scroll-trace-*.json`): no long tasks over 50 ms. At 4× CPU slowdown, the one-shot reveal transitions are the main per-frame cost (A/B: disabling them roughly halves paint time). Static blurs and `backdrop-filter` measured within noise.
