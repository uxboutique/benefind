# 05 — Final report: Benefind homepage

_Date: 2026-10-15 · Phases 5–10 · Build: Next.js 16.4.1 production (`next build` + `next start`)_

---

## Part A — Completed work

### 1. What was built
The full Benefind homepage from Figma node `47:4207`, in the **current** state of the file (the designer revised it mid-build; see `02-implementation-map.md §R`). It has 10 sections plus a sticky header and the footer:

Hero · Client logos · Enabling banner · Le aree · Mercati (carousel) · Servizi (dark) · Case study · Careers · Tecnologie (carousel) · Contatti · Footer.

On top of that sits a motion layer drawn from ICON (reveals, line splits, image settle, parallax, header) and Apple iOS (scroll-linked, scrubbed continuity), built to the matrix in `03-motion-matrix.md`.

### 2. Architecture and why
- **Next.js App Router, statically prerendered (`○ /`).** Server Components by default. Client components only where interaction needs them: `Header` (menu, header hide), `Markets` / `Technologies` (carousels), `SplitLines`, `MotionRoot`.
- **CSS Modules + global CSS custom properties** (`styles/tokens.css`), because Figma defines no variables. No Tailwind, no UI kit.
- **Motion = CSS + one IntersectionObserver + CSS scroll-driven animations.** Native scrolling, no animation libraries (rationale in `04-decision.md`).
- **Content is data:** `content/home.ts` holds all copy verbatim from Figma, so components stay presentational.
- **Progressive enhancement:** hidden-until-revealed states exist only under `html.js`. There's a 4 s boot fallback, and HTML without JS is complete.

### 3. Components created
| Area | Files |
|---|---|
| Layout | `components/layout/Header.tsx` (nav, menu panel, M2/M13), `Footer.tsx` |
| Sections | `Hero`, `ClientLogos`, `EnablingBanner`, `Areas`, `Markets`, `Services`, `CaseStudies`, `Careers`, `Technologies`, `Contact` (each with a `.module.css`) |
| UI | `Button` (5 variants, Figma heights 40/43/45/47), `SectionHeading` (eyebrow + h2), `CarouselControls` (glass / solid), `LightField` (data-driven rebuild of the Figma CSS "light band" visuals) |
| Motion | `components/motion/MotionRoot.tsx`, `SplitLines.tsx`, `styles/motion.css`, `lib/motion/tokens.ts` |
| Hooks | `hooks/useCarousel.ts` (scroll-snap, IO-based active slide, keyboard) |
| App | `app/layout.tsx` (fonts, boot script, skip link), `app/page.tsx`, `app/globals.css`, `app/icon.png`, `app/apple-icon.png` |
| QA tooling | `scripts/qa/screens.mjs`, `positions.mjs`, `motion.mjs`, `a11y.mjs`, `contrast.mjs`, `scroll-trace.mjs` |

### 4. Motion effects implemented (→ section)
| Effect | Section(s) | Mechanism |
|---|---|---|
| M1 hero entrance: lines rise, CTA follows, visual settles 1.06→1 (done ≈1.0 s, no loader) | Hero | CSS keyframes from first paint |
| M2 header hides on scroll down after 400 px, shows on scroll up | Header | rAF-throttled class toggle |
| M3 headline line reveal (90 ms per line) | All section h2s, Contact display | `SplitLines` + IO |
| M5 block reveal + stagger (60–80 ms) | Eyebrows, paragraphs, CTAs, logos, area cards, case grid, tech cards, banner panel | IO + CSS transitions |
| M6 image settle 1.06→1 / 1.2 s | Banner, slide photos, featured case, careers portrait | IO + CSS |
| M7 parallax ±60 px (desktop, fine pointer) | Enabling banner image | `animation-timeline: view()` |
| M8 Apple-style scrubbed rise (≈450 px range, reversible) | Services stats panel, Careers card | `animation-timeline: view()` |
| M9 background scale 1.08→1 with scroll | Services background | `animation-timeline: view()` |
| M11 active slide settle; snap carousels with buttons and arrow keys | Mercati, Tecnologie | scroll-snap + `useCarousel` |
| M12 micro-interactions (underline grow, pill colour, arrow nudge 3 px, card image 1.03) | Nav, buttons, cards, footer | CSS, `@media (hover: hover)` |
| M13 menu open/close + link stagger, Esc, focus return, scroll lock, `inert` | Header menu (all widths) | CSS + effect |

Reduced motion replaces all movement with ≤200 ms fades or instant changes, and disables parallax, scrubbing and smooth anchor scrolling.

### 5. Dependencies
| Added | Kind | Why |
|---|---|---|
| `next@16.4.1`, `react@19.3.1`, `react-dom@19.3.1` | runtime | framework |
| `typescript@6.0.3`, `@types/*` | dev | 6.0 pinned; 7.0 (native compiler) not yet verified with Next |
| `eslint@9`, `eslint-config-next@16.4.1` | dev | lint (flat config incl. React Compiler rules) |
| `@playwright/test@1.56.1` | dev | QA scripts, using the preinstalled Chromium |

**No animation or scroll libraries** (GSAP, Lenis and Motion were all evaluated and rejected). Measured motion footprint: **1.3 KB gz JS + 1.6 KB gz CSS**. Nothing was removed (fresh repo).

### 6. Responsive design and accessibility
- Breakpoints (inferred; Figma has only 1440): ≥1280 1:1, 1024–1279 (gutter 48), 768–1023 (burger nav, stacked splits, 2-col grids), <768 (1 col), down to 320. Fluid `clamp()` type with floors per token.
- **No horizontal overflow** at 1440 / 1280 / 768 / 390 / 320 (measured `scrollWidth − clientWidth = 0`).
- Semantics: one `h1`, ordered h2/h3 outline, `header` / `nav` / `main` / `footer` landmarks, labelled sections and carousels (`role="region"`, `aria-roledescription`), `dl` stats, `address`, skip link, real `<a>` / `<button>`.
- Keyboard: logical tab order through 30+ stops, **visible focus on every stop**; carousels are focusable with arrow keys; menu handles Esc and returns focus; header never hides while it has keyboard focus.
- Contrast: all solid pairs ≥ 7:1. Text over imagery was measured pixel-by-pixel (`scripts/qa/contrast.mjs`): every text element passes AA (lowest: banner h3 4.43 against a 3.0 large-text requirement).

### 7. Performance (real measurements, production build, local server)
| Run | Perf | FCP | LCP | TBT | CLS | Bytes |
|---|---|---|---|---|---|---|
| Lighthouse 12.8.2 desktop | **100** | 0.3 s | 0.7 s | 0 ms | 0 | 330 KiB |
| Lighthouse mobile (simulated, final run) | **98** | 1.1 s | 2.5 s | 60 ms | 0 | 328 KiB |
| Lighthouse mobile (DevTools throttling) | **96** | 1.7 s | 2.0 s | 170 ms | 0.016 | 328 KiB |

Accessibility, Best Practices and SEO score **100** in all runs. JSON summaries are in `docs/homepage/perf/`.

**Scroll trace** (full page, wheel scroll, `docs/homepage/perf/scroll-trace-cpu{1,4}x.json`):
- 1× CPU: median frame 16.7 ms, 3 of 217 frames over 20 ms, **0 long tasks** (longest 25 ms), ≈52 layouts in total (no thrashing).
- 4× CPU: 0 long tasks (longest 30 ms), ≈16% of frames over 20 ms. A/B testing shows the one-shot reveal transitions are the main cost; static blurs and backdrop glass are within noise.

Fixes made during this phase:
- Newsreader fallback metrics switched to Times New Roman, the font-swap reflow source.
- Footer grid overflow at 1280 fixed.
- Favicon 404 fixed.
- The `overflow: hidden` scroll-container bug that froze the scroll timelines fixed.

### 8. Checks run, with their real outcomes
| Check | Result |
|---|---|
| `npm run lint` | ✔ 0 errors, 0 warnings |
| `npm run typecheck` | ✔ pass |
| Tests | none configured (no test runner in scope); QA scripts below act as checks |
| `next build` (clean `.next`) | ✔ compiled, `/` prerendered static |
| Console at 1440/1280/768/390/320, default, reduced motion | ✔ no errors or warnings, no failed requests |
| Asset loading | ✔ no 4xx/5xx or failed requests (script logs them) |
| Links | 78 anchors: 62 `#` (destination not defined, see Part B), 11 in-page anchors (all targets exist), `tel:` ×1, `mailto:` ×2, `/` ×1, skip link ×1 |
| Figma geometry at 1440 (`positions.mjs`) | ✔ all 21 measured anchors within **±4 px** (page 7798 vs 7794) |
| Visual comparison | `screenshots/compare/*` (Figma left, build right, 8 slices) |
| Type metrics | ✔ Newsreader ink width = Figma exactly (734 / 931 px) |
| axe-core 4.10 (WCAG 2.1 A/AA + best practice) @1440, @390 | ✔ 0 violations (color-contrast "incomplete" items checked manually, see §6) |
| Motion walkthrough (`motion.mjs`) | ✔ all assertions as expected (`screenshots/motion/walkthrough.txt`) |
| Reduced motion (emulated) | ✔ no transforms or animations; content visible at 300 ms |
| JavaScript disabled | ✔ all content visible (`screenshots/build/full-*-nojs.jpg`) |
| CLS over a full scroll (desktop) | ✔ 0 |

---

## Part B — Known gaps and deviations

### Content and assets (client input needed)
1. **"Primary CTA"** labels ×5 (hero, banner, 3 market slides, services; kept as in Figma, per approval).
2. **Bracketed placeholders:** 4 case titles, "[Nome], [Ruolo]", quote, "[Una riga di invito al contatto.]".
3. **Duplicates in Figma:** markets slide 3 copy = slide 1, identical lead text on every slide, tech card 3 = card 1, stat labels duplicated and in English.
4. **⚠ Client logo strip** (Booking.com, Zalando, SAP, Spotnana, Fever, HealthEquity): confirm these are real Benefind clients with usage rights.
5. **Stand-in visuals:** hero, careers and area-card visuals are CSS rebuilds of Figma layers named "sostituire il fill con l'immagine". Images marked "AI generated" and stock photos (careers portrait, slide/case photos) should be replaced with final art. Slots keep fixed ratios, so swapping is drop-in.
6. **Header logo** is a raster PNG (2386×827). Request the SVG.
7. **Favicon** is derived (cropped logo mark), because Figma has none.
8. **Typo fixed:** "Benfind" → "Benefind".

### Links (all `#` unless noted)
- **Header:** Markets → `#mercati`, Enabling Technologies → `#tecnologie`, Services → `#servizi` (in-page for now; point to subpages later). Products → `#`. Search → `#` (no search design). Contattaci → `#contatti`.
- **Page CTAs:** all "Primary CTA", "Leggi il case study", case cards, "Lavora con noi", "Leggi la storia", "Scopri" ×3 → `#`. The area cards go to the in-page sections, except Products → `#`. Contact CTA → `mailto:info@benefind.it`.
- **Footer:** all 35 column links → `#`. The menu panel repeats the nav plus the 7 "Benefind Group" links (→ `#`). Phone and e-mail are real (`tel:` / `mailto:`).

### Deviations from Figma (intentional)
- Hero text x87 → aligned to the x80 grid. Banner x77 → x80. Nav centred (Figma 24 px left of centre).
- Stat numbers normalised to 52 px (Figma 52.1 / 49.7 / 49.1).
- Services veil: the 26 px backdrop blur is applied as a static blur on the image (same look, cheaper).
- Carousel controls render once per carousel, not inside every slide. "Previous" is disabled (45% opacity) on the first slide; Figma shows both arrows enabled.
- Neighbouring (inactive) market slides are dimmed to 50% (M11); Figma shows the peeking slide at full opacity.
- Menu panel, search, and hover/focus states were **not designed** in Figma; they're built minimally from page tokens.
- Mobile/tablet layouts are **inferred** (no Figma frames).

### Measured caveats
- Lighthouse **simulated** mobile LCP varied **2.5–3.4 s** across runs (CPU contention in this container). DevTools-throttled mobile LCP is 1.8–2.0 s. The LCP element is the header logo: the hero headline starts at opacity 0 for the entrance, which makes it ineligible.
- Mobile CLS 0.016 under DevTools throttling: a small hero reflow when Newsreader swaps in, well under 0.1.
- `npm audit`: 5 high advisories in the dev-only ESLint chain.
- Scroll-driven effects (M7–M9) need `animation-timeline` support: Chromium yes (verified). Safari and Firefox support was not verified here, since only Chromium was available. Other browsers get the fallback (one-shot reveal or static).
- Only Chromium was tested. Safari/WebKit and Firefox are unverified.
- Footer and menu link targets are 18 px tall: fine for WCAG 2.1 AA, below the 2.2 AA 24 px target-size guidance.

---

## Part C — Recommended next steps
1. Get final copy for the five "Primary CTA"s and the bracketed placeholders, plus the logo SVG and final imagery; confirm the client-logo rights.
2. Define the routes (Markets / Enabling Technologies / Services / Products, case studies, careers, legal pages) and replace the `#` links.
3. Ask design for the menu panel, search and hover/active states, plus mobile frames for sign-off.
4. Cross-browser QA on Safari (iOS/macOS) and Firefox, especially scroll-driven effects, `backdrop-filter` and scroll-snap.
5. Make the hero headline LCP-eligible if mobile field LCP needs to be lower: e.g. start the entrance from a small non-zero opacity, or keep line 1 static.
6. Set up git, CI (lint, typecheck, build, `scripts/qa/*`) and a deploy target. This workspace has **no git repository**, so nothing has been committed or pushed.
7. Increase mobile tap-target height for footer and menu links if aiming for WCAG 2.2.
8. Remove the `figma-assets/` staging folder (gitignored) once the assets are final.

## How to run
```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
# QA (server running on :3000)
node scripts/qa/screens.mjs      # full-page shots at 1440/1280/768/390/320 + console/overflow report
node scripts/qa/positions.mjs    # section y-positions vs Figma at 1440
node scripts/qa/motion.mjs       # motion walkthrough
node scripts/qa/a11y.mjs         # axe + keyboard walkthrough
node scripts/qa/contrast.mjs     # contrast over imagery
node scripts/qa/scroll-trace.mjs http://localhost:3000 4   # scroll trace at 4× CPU
```
