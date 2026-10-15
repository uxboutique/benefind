# 03 — Motion matrix

_Date: 2026-10-15 · Phase 3 · Status: complete_

## How the references were observed

Both sites were opened in Chromium (Playwright) at 1440×900 and 390×844 (touch), and again with `prefers-reduced-motion: reduce`. I captured entrance frames at 100/400/800/1400/2200/3500 ms and scrolled the full page in 10 steps. I checked the loaded scripts, globals, stylesheets (CSSOM) and inline styles. Screenshots are in `screenshots/references/`.

**ICON (icon.andreagalanti.it).** A headless browser first gets a "Visitor anti-robot validation" page; the site loads with a normal desktop user agent. Direct `curl` of its JS/CSS still returns the captcha page, so the running script was read through the DevTools protocol and the CSS through CSSOM. Third-party source is **not** stored in this repo; only the short excerpts below are quoted.

### ICON: what's actually running (evidence)

- **Scripts:** `js/vendor/lenis.min.js` + `js/main.min.js` (≈15 KB, vanilla). **No GSAP, ScrollTrigger, SplitText, Swiper or framework.** `<html class="js lenis is-loaded">`.
- **Smooth scroll:** `new Lenis({ duration: 1.15, easing: t => 1 - (1 - t)^4 })`, created **only if** there is no reduced motion, viewport ≥ 1024 **and** `(pointer: fine)`. Touch and mobile get native scroll. Lenis is stopped while menus or modals are open.
- **Tokens (CSS):** `--ease-out: cubic-bezier(.16,1,.3,1)`, `--ease-io: cubic-bezier(.65,0,.35,1)`, `--dur-reveal: 1.1s`, `--dur-media: 2.2s`. These are the same easings the brief proposes.
- **Reveals:** a single IntersectionObserver (`rootMargin: 0 0 -12% 0`, threshold .01) adds `.is-in` once, then unobserves. `[data-reveal]` goes from `opacity 0; translateY(4rem); blur(6px)` → none. `[data-stagger]` children get `--d = i × 90ms`. Hidden only under `.js` (no-JS safe).
- **Headline lines:** `[data-split]` is split into **lines** after `document.fonts.ready` (re-split on resize). Each `.split-line` has `overflow: clip` and its inner span goes `translateY(100%) + opacity 0 + blur(4px)` → none, with a **110 ms** step per line.
- **Media:** `.media img` scales `1.12 → 1` over **2.2 s** ease-out when revealed. On hover the scale goes to 1.03 over 1.4 s.
- **Parallax:** `[data-parallax]` (speed ≈ .15) sets `--py` on scroll in a rAF-throttled handler, only for visible elements, **disabled < 1024px and on reduced motion**.
- **Header:** `.is-scrolled` past 40px (fades in a background gradient, shrinks the logo). `.is-hidden` (translateY −100%) when scrolling down past 400px, shown again on scroll up. Transition .7 s ease-out.
- **Scrub text:** `[data-scrub]` words go from opacity .35 to 1 as the block crosses the viewport.
- **Carousels:** a transform track, 1.2 s `cubic-bezier(.19,1,.22,1)`, pointer-drag with rubber-banding at the ends, arrow keys. Gallery images counter-shift ±6% (inner parallax).
- **Menus:** mega-menu on hover / click, Esc closes, `aria-expanded` kept in sync. The mobile menu sets `hidden`, then `.is-open` next frame, and locks scroll.
- **Cursor:** no custom cursor (only `grab` on galleries).
- **Reduced motion:** reveals and splits forced visible with no transition, parallax and media zoom off, Lenis not created.
- **Observed entrance:** the hero image is visible from first paint. The headline rises line by line by ~400 ms, the body copy follows, and the CTA appears at ~1.4 s. There's no loader.

### Apple iOS page (apple.com/it/os/ios): evidence

- **Scripts:** Apple's own bundles (`main.built.js`, `head.built.js`, `ac-films`, global header/footer). **No GSAP or Lenis. Native scrolling.** `<html class="… no-reduced-motion …">` drives reduced-motion branches.
- **Scroll-linked, reversible text:** each section is a `data-anim-scroll-group`. Measured on the "Apple Intelligence nelle app" eyebrow: at viewport-top 1000px it's `opacity 0, translateY 30px`; at 780px `opacity .43, translateY 9.9px`; at 570px `opacity 1, translateY 0`. That's a **~430 px scroll range**, scrubbed (not time-based), set as inline styles.
- **Hero:** the headline is static. Product imagery fades / settles in after load (frames at 1.4 s → 3.5 s).
- **Pinned storytelling:** `position: sticky` on the local nav and in the "all-access-pass" media-card gallery. Galleries expose a `--progress` custom property and use dot-nav plus prev/next.
- **Section transitions:** hard background changes between dark and light sections. There's no colour morphing.
- **Easing:** mostly `cubic-bezier(.4,0,.6,1)` (state changes) and `cubic-bezier(.25,.1,.3,1)` / `(.28,.11,.32,1)` (entrances). Micro-transitions run 240–320 ms with 80 ms staggers (global nav).

## Matrix

| ID | Effect | Ref | Where on Benefind | Intended behaviour | Implementation | Decision |
|---|---|---|---|---|---|---|
| M1 | Hero entrance | ICON | S1 Hero | h1 lines rise 24px + fade in (800 ms, 100 ms/line). CTA follows at +200 ms. The light-band visual goes from opacity .6 / scale 1.06 to 1 / 1 over 1200 ms. Everything done by ≈1.2 s. Nav is static and usable from first paint. | CSS keyframes started by the `.js` class at load. No observer needed (above the fold). | **Adapt**: no blur, shorter than ICON (1.1 s / 2.2 s), no loader |
| M2 | Header hide on scroll down / show on scroll up | ICON | S0 Header | Hide (translateY −100%) after 400px when scrolling down. Show on any upward scroll. Never hidden while the menu is open or focus is inside the header. | Passive scroll listener, rAF-throttled, toggles a class on the DOM node (no React state). Transition 500 ms `--ease-out`. | **Adapt**: drop the `is-scrolled` logo shrink and gradient (header is already solid white with a border) |
| M3 | Headline line reveal | ICON | h2 in S3, S5, S6, S7, S8, S9; Contact display S10 | Lines inside clipped rows: translateY 100% → 0 + opacity, 800 ms, 90 ms/line, once. | Small `SplitLines` client component: splits by measured line after `fonts.ready`, re-splits on width change, keeps the real text in the DOM, and only hides under `html.js`. | **Adapt**: no blur. Only on the headings listed, never body copy or per-character |
| M4 | Scroll-scrub word highlight | ICON | — | Words light up as you scroll. | — | **Skip**: reads as showy, hurts readability, adds per-word spans to body copy |
| M5 | Block reveal with stagger | ICON | Eyebrows, paragraphs, CTAs, logo strip (60 ms), area cards (80 ms), case grid (80 ms), tech cards, banner panel | Fade + translateY 24px → 0, 700 ms `--ease-out`, stagger 60–80 ms, once. IO `rootMargin: 0 0 -12% 0`. | One shared IntersectionObserver in `MotionRoot`, driven by data attributes (`data-reveal`, `data-stagger`). CSS does the animating. | **Keep** (distance 24px instead of 40px, no blur) |
| M6 | Image settle on reveal | ICON | S4 banner image, S5 slide photos, S7 featured + grid images, S8 portrait | Inner image scale 1.06 → 1 over 1200 ms `--ease-out` inside an `overflow: hidden` frame, triggered with the reveal. | Same observer, `.media` class, transform only. | **Adapt**: 1.06 / 1.2 s instead of 1.12 / 2.2 s |
| M7 | Image parallax | ICON | S4 enabling banner image only (already oversized 1440×900 in a 520 frame) | Image drifts ≈ −60px → +60px across the viewport pass. Desktop ≥1024 and fine pointer only. | **CSS scroll-driven animation** (`animation-timeline: view()`) inside `@supports`; static fallback elsewhere. No JS loop. | **Adapt**: one instance only |
| M8 | Scroll-linked rise (Apple continuity) | Apple | S6 stats glass panel, S8 person card | translateY 40px → 0 and opacity .0 → 1 over the first ~35% of the element's entry (≈ Apple's 430px range), scrubbed and reversible. | CSS `animation-timeline: view()` + `animation-range: entry 0% entry 80%`. Fallback (no support): the M5 one-shot reveal. | **Adapt**: two places, where content sits over a dark backdrop, mimicking Apple's settle-into-place |
| M9 | Background scale with scroll | Apple / ICON | S6 Cocoa-satin bg | Scale 1.08 → 1 while the section crosses the viewport (very slow, transform only). | CSS scroll-driven animation; static fallback. | **Keep**: subtle, adds depth to the one photographic dark band |
| M10 | Pinned / sticky storytelling | Apple | — | — | — | **Skip**: the page has no step-by-step narrative. Pinning would need GSAP and fights the sober direction |
| M11 | Carousel slide change | ICON | S5 markets slider, S9 tech carousel | Native scroll-snap with smooth `scrollBy` from the buttons. The newly active slide's text block fades/rises 12px (500 ms). Buttons are disabled at the ends. Arrow keys work. | `useCarousel` hook (IO on slides decides "active", no scroll handlers). CSS transitions. | **Adapt**: native scroll-snap instead of a JS transform track and pointer-drag (better touch, less code). Skip the inner ±6% image counter-shift |
| M12 | Micro-interactions | ICON / Apple | Nav links, pills, "Leggi →" links, area / case / tech cards, footer links | Underline grows from the left on nav and footer links (200 ms). Pill bg/colour transition 200 ms. Arrow glyph nudges 3px. Card image scales 1.03 (600 ms). Visible `:focus-visible` ring on everything. | CSS only. Hovers wrapped in `@media (hover: hover)`. | **Keep** |
| M13 | Menu open / close | ICON | S0 menu button (all widths: the design shows the burger on desktop too) | Panel fades in and slides 16px (400 ms). Links stagger 40 ms. Body scroll locked, focus trapped, Esc closes and returns focus. | `hidden` → next frame `.is-open`, as ICON does. `inert` on the page behind. | **Keep** (the panel design itself is missing, so it gets minimal styling) |
| M14 | Mega-menu with image panes | ICON | — | — | — | **Skip**: not designed for Benefind |
| M15 | Marquee (logos / headline) | Apple (marquee headline), ICON (`@keyframes marquee`) | — | — | — | **Skip**: Figma shows a static logo row; a perpetual marquee is distracting |
| M16 | Hero scroll cue line | ICON | — | — | — | **Skip**: not in Figma |
| M17 | Reveal blur / filter transitions | ICON | — | — | — | **Skip**: the brief forbids animating blur, and it's costly with the existing `backdrop-filter` glass |
| M18 | Smooth scrolling (Lenis) | ICON | — | — | — | **Skip**: see `04-decision.md`. Apple uses native scroll. ICON itself disables Lenis on touch / <1024 |
| M19 | Count-up stats | — | — | — | — | **Skip**: not in either reference |

## Reduced motion (both references honour it; we will too)

`prefers-reduced-motion: reduce` removes all translate, scale, parallax, scroll-linked and split-line motion. Reveals become a 200 ms opacity fade (or instant). The carousel scrolls with `behavior: 'auto'`. The menu just fades. The header still hides and shows (that's a state change, not decorative motion), but with no slide: it's instant.

## Motion tokens (carried into `04-decision.md`)

| Token | Value | Source |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | brief = ICON |
| `--ease-io` | `cubic-bezier(0.65, 0, 0.35, 1)` | brief = ICON |
| `--dur-ui` | 200ms | brief (Apple 240–320) |
| `--dur-reveal` | 700ms (lines 800ms) | brief (ICON 1.1s, shortened) |
| `--dur-media` | 1200ms | brief (ICON 2.2s, shortened) |
| `--dur-hero` | 1100ms total window | brief |
| `--reveal-distance` | 24px | brief 16–32 (ICON 40) |
| `--stagger` | 80ms (60 for logos, 90 for lines) | brief (ICON 90/110) |
| `--media-scale-from` | 1.06 | brief (ICON 1.12) |

## Implementation status (Phase 6, verified in Phase 9)

| ID | Status | Where in code | Verified by (`scripts/qa/motion.mjs`, results in `screenshots/motion/walkthrough.txt`) |
|---|---|---|---|
| M1 | ✔ built | `[data-hero-*]` in `Hero.tsx`, keyframes in `styles/motion.css` | h1 line opacity .83 @150 ms → 1 @1000 ms; CTA done ≈1.0 s; 0 hero animations running @1.8 s; nav usable at first paint |
| M2 | ✔ built | `Header.tsx` effect (rAF-throttled passive scroll, class toggle) | header bottom 0 px after scrolling down, 81 px after scrolling up |
| M3 | ✔ built | `components/motion/SplitLines.tsx` (all h2s via `SectionHeading`, Contact) | lines split after `fonts.ready`; no layout change (section positions identical ±0 px before and after split); text keeps spaces between lines |
| M5 | ✔ built | `data-reveal` + `--d` stagger; `MotionRoot.tsx` single IO | area card opacity 0 → 1 on entry; 0 elements left hidden after a full pass |
| M6 | ✔ built | `data-media` / `data-media-inner` (banner, slide photos, featured case, careers portrait) | scale 1.06 → 1 / 1.2 s |
| M7 | ✔ built | `data-parallax-scope` / `data-parallax` (enabling banner) | translateY −51 → +48 px across the pass; off below 1024 px, on coarse pointers and with reduced motion |
| M8 | ✔ built | `data-scroll-rise(-scope)` (services stats, careers card) | opacity 0 → .37 → .77 → 1 over ≈450 px; reverses when scrolling back (.11) |
| M9 | ✔ built | `data-scroll-scale(-scope)` (services background) | CSS scroll-driven, static fallback |
| M11 | ✔ built | `useCarousel` + `[data-active]` styles (Markets) | next → slide 2; ArrowRight → slide 3; next disabled at the end |
| M12 | ✔ built | CSS only (`@media (hover: hover)`) | manual review in screenshots |
| M13 | ✔ built | `Header.tsx` + `Header.module.css` | expanded=true, focus on the first link, scroll locked, `main` inert; Esc closes, panel hidden, focus back on the toggle |
| Reduced motion | ✔ | `@media (prefers-reduced-motion: reduce)` blocks | hero opacity 1 @300 ms; stats untransformed, 0 animations; parallax 0 animations; `scroll-behavior: auto` |
| No JS | ✔ | `html.no-js` until the boot script runs | full-page screenshots `screenshots/build/full-*-nojs.jpg` show all content |

Skipped as planned: M4, M10, M14, M15, M16, M17, M18, M19.
