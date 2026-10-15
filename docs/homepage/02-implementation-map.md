# 02 — Implementation map (Figma → code)

_Source: `SsKBEykTxpXsWKvGVuS0ed`, node `47:4207` "Home - Concept" (1440 × 7794). Page "Layout"._
_Date: 2026-10-15 · Phase 2 · Status: complete — **updated after a mid-build Figma revision (see §R)**_

## §R. Figma revision detected during Phase 5 (same day)

The designer edited the file while the build was in progress. The implementation follows the **current** file:

1. **Section order:** the Enabling banner (`53:4996`) moved to y1031, right after the logo rule. "Le aree" (`98:4905` group) is now at y1631 with its rule at y2217. Built order: Hero → Logos → **Enabling banner → Le aree** → Markets → …
2. **Case studies:** each image now has a real photo layer on top of the abstract fill (`98:4893`, `98:4891`, `98:4886`, `98:4890`, `98:4901`), each with its own crop box. Grid order is now **Public Administration, Manufacturing, Financial Services, Healthcare**.
3. **Markets slide 1:** a new photo layer `98:4884` (portrait, 736×478 at 2/−22) covers the building photo. Slides 2 and 3 are unchanged, so slide 3 now differs visually from slide 1.

New assets were downloaded the same day: `markets-slide1-portrait.jpg`, `case-{pharma,public-admin,manufacturing,financial,healthcare}-photo.jpg`. The abstract `case-*.png` fills are no longer rendered. `case-public-admin.png` is still used by tech card 3.


## 0. Findings that affect the whole page

- **Only a 1440 desktop frame exists.** The "Layout" page holds `WF - HOME` (an older 1920 wireframe), `Home - Concept` (this one) and `MARKETS > PHARMA`. There are no tablet or mobile frames, so every breakpoint below 1280 is **inferred** (§3).
- **No Figma variables** (`get_variable_defs` → `{}`). Tokens in §2 were reverse-engineered from the node styles.
- **The "UI Kit" page is out of date** (Montserrat, orange `#FC8300`, 1920 menus). It doesn't match the concept and is **not** used as a source.
- **No prototype interactions or motion** (`get_motion_context` recursive → no animated nodes). All motion comes from the references (`03-motion-matrix.md`).
- **Fonts:** **Newsreader** Light 300 (display) and **Geist** 300/400/500/600 (UI/body). Both are open source (Google Fonts / Vercel).
  - **Figma renders Newsreader with automatic optical sizing** (opsz = font size, max 72). The static Google cut is opsz 16 and measured ~5% narrower. The build self-hosts the 58 KB weight-300 file *with* the opsz axis, and the measured ink widths now equal Figma's (734 / 931 px).
- **Grid:** container 1280 on a 1440 canvas, gutter 80. Columns are implied: the 4-up cards are 305 + 20 gap, the 2-up blocks are 600 + 80 gap.
- **Vertical rhythm:** 80px between blocks (e.g. Line 1 at 951 → heading at 1031; cards end 1537 → Line 2 at 1617 → banner at 1697).
- **Off-canvas node ignored:** `97:3252` "Case study · Fashion & Luxury" sits at x=1680, outside the frame.

## 1. Sections, in order

Legend for **Motion**: IDs refer to rows in `03-motion-matrix.md`. "—" means static.

### S0 · Header `51:4811`, 1440×81
- **Layout:** white, bottom border 1px `#E9E8F3`. Logo PNG 155×47 at x80. Nav (Markets · Enabling Technologies · Services · Products), Geist 15 Regular navy, gap 28, starting x488 (24px left of true centre; **implemented centred**). Utility group at the right edge x1358, gap 14: pill "Contattaci →" (bg `#D3E0F5`, Geist 14 SemiBold, padding 11/18), search icon 20, menu icon 22.
- **Components:** `Header`, `Button(variant=sky,size=sm)`, `IconButton`.
- **Assets:** `logo-gruppo-benefind.png`, `icon-search.svg`, `icon-menu.svg`.
- **Responsive (inferred):** ≥1024 as designed. <1024: nav hidden, logo + Contattaci + menu button; the menu opens a full-height panel. <390: Contattaci collapses into the menu.
- **Gaps:** no design exists for the **menu panel**, **search** or nav **hover/active** states. A minimal panel will be built from the page tokens and flagged.
- **Motion:** M2 (hide on scroll down / show on scroll up), M12 (link/button micro-interactions), M13 (menu open/close).

### S1 · Hero `51:4920`, 1440×700
- **Layout:** navy `#0C0A68` base. The "AI visual · hero.jpg — **sostituire il fill con l'immagine**" visual is **made from CSS**: a vertical gradient `#07063F → #0C0A68 55% → #1B1890` with two diagonal "light bands" (rotated −14.04°, blurred gradients) and two 2px "light edges". Over it sits a "Velatura" gradient (transparent → `rgba(7,6,63,.85)`). Headline is 2 lines, Newsreader Light 64/1.04, −2.24 tracking, white, at x87 y434. White pill CTA at y590.
- **Implementation:** the visual is reproduced in CSS (a decorative `div` with `aria-hidden`), because the designer marked it as a stand-in for a future image. The slot is built to accept an `<Image>` later without layout change.
- **Assets:** none (pure CSS).
- **Copy:** `h1`: "Servizi IT per le aziende. / Tecnologie e professionalità avanzate." CTA label is "**Primary CTA**" (placeholder, see §5).
- **Responsive:** height `min(700px, 88svh)`, never below 520. Headline clamps 64 → 40. Text stays bottom-left.
- **Deviation:** text x87 → aligned to container x80 (7px; likely an accident).
- **Motion:** M1 hero entrance (lines + CTA + visual scale).

### S2 · Client logos `52:4938`, 1440×170, then rule `53:5013`
- **Layout:** 6 "taupe" SVG logos, vertically centred, spread between x128 and x1312 (≈ space-between with 48px inner inset). 1px rule (`#E9E8F3` assumed, matching the header border) at the bottom, container width.
- **Assets:** `logo-booking.svg`, `logo-zalando.svg`, `logo-sap.svg`, `logo-spotnana.svg`, `logo-fever.svg`, `logo-healthequity.svg`.
- **Responsive:** 6-up ≥1024. 3×2 grid at 768–1023. Below 768: 2×3 grid (no marquee, see M15 skip).
- **⚠ Flag:** confirm these are real Benefind clients before launch.
- **Motion:** M5 (fade-up with 60ms stagger).

### S3 · Le aree, heading `52:4963`, cards `52:4966`, rule `53:5015` (now rendered **after** S4, see §R)
- **Heading:** eyebrow "Le aree" (Geist 16, `#4A4960`) + h2 "Quattro aree, un solo gruppo." (Newsreader Light 56/1.08, −1.68), gap 12.
- **Cards:** 4 × 305 wide, gap 20. Each has a 265-tall CSS gradient visual (radius 8; one or two diagonal light bands at −23.48°, blurred 4px), title Geist Medium 17/1.35 navy, body Geist 15/1.55 `#4A4960`, gap 16.
- **Visual palettes (top → 55% → bottom):** 1 `#FFF→#F4F3F8→#E9E8F3`, 2 `#3A3FD9→#2E2AB8→#0C0A68`, 3 `#FFF→#E9E8F3→#D3E0F5`, 4 `#07063F→#0C0A68→#2E2AB8`.
- **Semantics:** the cards point to the 4 nav areas, so each card is a single link (`<a>` wrapping title + text; visual is decorative).
- **Responsive:** 4-up → 2×2 (<1024) → 1-up (<600). The visual keeps a 305:265 ratio.
- **Motion:** M3 (heading line reveal), M5 (cards stagger 80ms), M12 (card hover: visual scale 1.03).

### S4 · Enabling banner `53:4996`, 1280×520, radius 8
- **Layout:** full-bleed photo (barn, motion-blurred), image box 1440×900 offset −80/−190 inside the card (oversized, which suits parallax). Dark glass panel 574 wide, padding 40, `rgba(0,0,0,.3)` + `backdrop-filter: blur(12px)`, radius 8, vertically centred at left 40. Panel holds h3 Newsreader Light 48/1.08 white, body Geist Light 16/24 white, white pill CTA.
- **Assets:** `enabling-barn.jpg` (1284×716 source; upscaled in Figma, acceptable because the image is intentionally blurred).
- **Deviation:** card x=77 in Figma → aligned to x80.
- **Responsive:** <768 the card height becomes auto, the panel goes full width with 20px inset, and the image fills behind.
- **Copy:** CTA "Primary CTA" (placeholder).
- **Motion:** M6 (image scale-in on reveal), M7 (parallax on the oversized image, desktop only), M5 (panel fade-up).

### S5 · Mercati e soluzioni digitali: heading `58:5310` + text `58:5060`, slider `97:4865`
- **Heading row:** left 630 col with eyebrow + h2 "Soluzioni innovative per mercati in evoluzione" (56/1.08). Right col at x817, width 540: two paragraphs, Geist 15/24 `#4A4960`.
- **Slider:** slides 1280×520, radius 8, gap 24 (next slide peeks off the right edge). Each slide has a full-bleed "Luminous field" bg image (1324×588 at −22/−34), eyebrow (Geist 16 white), title (Newsreader Light 64/1.08 white), white pill CTA, a 1px vertical divider (white 19%) at x463, a lead paragraph (Geist 22/1.55 white) and a photo (738×346, radius 16) at x503/y137. Prev/next buttons are 50px circles, `rgba(255,255,255,.3)`, with a Lucide arrow, at bottom-left.
- **Slides:** 1 "Pharma" (photo `markets-slide1-photo.png`), 2 "Artificial Intelligence" (2-line title, CTA moves to y228, photo `markets-slide2-photo.png` cropped differently), 3 is an **exact duplicate of slide 1** (placeholder).
- **Semantics:** `<section aria-roledescription="carousel">`. Slides are `role="group" aria-roledescription="slide" aria-label="1 di 3"`. The prev/next buttons appear **once** per carousel (the design repeats them inside each slide) and are real `<button>`s with Italian labels.
- **Implementation:** CSS scroll-snap track (native touch / trackpad), buttons call `scrollBy`. Arrow-key support on the track.
- **Responsive:** <1024 the slide stacks (text on top, photo below, divider hidden) and the width becomes `calc(100vw - 2*gutter)`. <768 the title clamps to 44.
- **Assets:** `markets-slide1-bg.png`, `markets-slide2-bg.png`, the two photos, `icon-arrow-left.svg` (the "next" arrow is the same SVG rotated 180°; `icon-arrow-left-rot.svg` is byte-identical), `markets-divider.svg` (implemented as a CSS border; identical visual).
- **Copy flags:** "Benfind opera…" → typo for **Benefind** (corrected, flagged). Lead text repeats "Processi MES…" on every slide. CTA labels are "Primary CTA".
- **Motion:** M3 (heading), M5 (paragraphs), M11 (slide change: content fade/rise on the active slide).

### S6 · Servizi per le aziende `80:5393`, 1440×675, dark
- **Layout:** bg `#1F1C1B` plus the "Cocoa satin" image (cover, with a 20% black overlay), then a full-section `rgba(0,0,0,.41)` layer with `backdrop-filter: blur(26px)`. Eyebrow + h2 "Servizi su misura / per la trasformazione / digitale" (56/1.08, white, 3 forced lines) on the left. The right column at x833 has body copy (Geist Light 16/24 white, width 473) and a white CTA at y318.
- **Stats glass panel** 1113×123, centred, top ≈ 463, `rgba(0,0,0,.3)`, blur 12, border `rgba(255,255,255,.13)`, radius 8. Three stats: "70%" / "3X" / "24/7" in Geist SemiBold ≈52 (Figma uses 52.1 / 49.7 / 49.1; **normalised to 52**), with labels Geist Light 14 at 70% opacity and 1px dividers at 25% white.
- **Implementation:** the blur layer is static. To save GPU, the blurred bg can be pre-baked (the image is already soft); decide in Phase 8 based on the trace.
- **Responsive:** <1024 the columns stack. The stats panel becomes a 3-column row (<768: stacked, horizontal dividers).
- **Copy flags:** stat labels are English, and "faster time to resolution" is duplicated. Both look like placeholders.
- **Assets:** `services-cocoa-satin.png`.
- **Motion:** M3 (heading lines), M8 (Apple-style scroll-linked rise of the stats panel), M9 (bg image subtle scroll scale).

### S7 · Case study: title `97:3296`, featured `97:3304`, grid `97:3312`
- **Title:** eyebrow "Case study" + h2 "Progetti nei settori in cui operiamo." (600 wide).
- **Featured:** image 760×428 radius 8 + text col 480 (gap 40, vertically centred). Eyebrow caps "CASE STUDY · PHARMA" (Geist SemiBold 12, +0.96 tracking, `#3A3FD9`), h3 Newsreader Light 40/1.12 −0.8, body Geist 16/1.6, outline navy pill "Leggi il case study →".
- **Grid:** 4 × 296, gap 32. Each card: image 296×200 r8, caps 11 SemiBold +0.88 `#3A3FD9`, title Geist Medium 18/1.35 navy, "Leggi →" Geist SemiBold 14 `#3A3FD9`. Each card is one link.
- **Assets:** `case-pharma.png`, `case-manufacturing.png`, `case-financial.png`, `case-public-admin.png`, `case-healthcare.png`.
- **Copy flags:** grid titles are bracketed placeholders.
- **Responsive:** featured stacks <1024. Grid 4 → 2 → 1.
- **Motion:** M3, M6 (featured image scale-in), M5 (grid stagger), M12 (image hover 1.03, arrow nudge).

### S8 · Careers `97:3258`, 1440×901, dark luminous
- **Layout:** the same CSS "light band" visual as the hero, scaled ×1.31, plus the Velatura gradient. Eyebrow "Careers" + h2 "L'innovazione la fanno le persone" (white) + outline white pill "Lavora con noi →". Person card 1280×520, bg `#F4F3F8`, radius 8, two 640 cols with padding 48. Left: caps "STORIE DAL GRUPPO", display Newsreader Light 72/0.98 −2.16 "Incontra / [Nome], / [Ruolo]", navy pill "Leggi la storia →". Right: quote Geist 16/1.6 `#1A1930`, portrait 544×380 r8 over `#C9C7F7`.
- **Assets:** `careers-portrait.jpg` (placeholder photo; "Segnaposto foto").
- **Responsive:** card cols stack <1024.
- **Motion:** M3, M6 (portrait), M8 (card rises with scroll, Apple-style).

### S9 · Tecnologie per l'innovazione: header `97:3425`, carousel `97:3454`, arrows `97:3466`
- **Header:** 600 title col + 600 body col (Geist 16/1.65), gap 80.
- **Carousel:** cards 628×520 radius **16**, gap 24 (third card peeks). Cards 1 & 3 use the dark glass panel (`rgba(0,0,0,.3)`, border `rgba(255,255,255,.22)`, r12, padding 28, width 400, at 28/215). Card 2 uses the light glass (`rgba(255,255,255,.66)`, border .75, at 200/192). Panel contents: caps 11 (`#E9E8F3` or `#3A3FD9`), h3 Newsreader Light 32/1.12 −0.48, Geist 15/1.55, pill "Scopri →".
- **Arrows:** navy pills 47×45 with "←" / "→" glyphs (different style from the S5 controls; kept as designed).
- **Assets:** `enabling-barn.jpg` (card 1, same image as S4), `tech-security.png` (card 2), card 3 = barn + `case-public-admin.png` layered (Figma stacks two fills; the top one is opaque, so only `case-public-admin.png` is visible).
- **Copy flags:** card 3 duplicates card 1's text.
- **Implementation:** shared `useCarousel` scroll-snap hook (same as S5).
- **Responsive:** card width `min(628px, 86vw)`. On mobile the glass panel spans the card bottom.
- **Motion:** M3, M5, M11, M12.

### S10 · Contatti `97:3776`, 1440×480
- **Layout:** padding 80. Display Newsreader Light **104/0.98 −3.64** navy, 2 lines "Parliamo del / tuo futuro digitale". Placeholder line "[Una riga di invito al contatto.]" Geist 18 `#4A4960`. Navy pill "Contattaci →". Gap 24.
- **Responsive:** headline clamps 104 → 52.
- **Motion:** M3 (largest line reveal on the page), M5.

### S11 · Footer `97:3781`, 1440×563, `#07063F`
- **Layout:** padding 72/80/32, 5 columns (230 ×4 + 330, gap 20). Column heads Geist SemiBold 12 +0.96 `#A9A6F0`. Links Geist 14 `#E9E8F3`, gap 10. The 5th column holds the address block (14/1.6), Enabling Technologies and Legal. Bottom bar: top border `rgba(255,255,255,.16)`, padding-top 18, "Benefind" wordmark Newsreader Light 22 white, legal line Geist 12 `#9C9AB8`.
- **Semantics:** `<footer>` with `<nav aria-label>` per column. Lists are `<ul>`. Address in `<address>` with `tel:` / `mailto:` links.
- **Responsive:** 5 → 3 → 2 → 1 columns. The bottom bar stacks <768.
- **Motion:** — (static; link hover underline only, M12).

## 2. Design tokens → CSS variables

### Colour

| Token | Value | Used for |
|---|---|---|
| `--c-navy-950` | `#07063F` | footer bg, hero gradient top, Velatura |
| `--c-navy-900` | `#0C0A68` | brand primary: headings, buttons, nav |
| `--c-indigo-800` | `#1B1890` | hero gradient bottom |
| `--c-indigo-700` | `#2E2AB8` | slide / card fallback bg |
| `--c-indigo-600` | `#3A3FD9` | accent caps, "Leggi →" links |
| `--c-lilac-400` | `#7F7BF0` | light-band mid |
| `--c-lilac-300` | `#A9A6F0` | footer column heads |
| `--c-lilac-200` | `#C9C7F7` | portrait placeholder bg |
| `--c-lilac-100` | `#E9E8F3` | header border, footer links, caps on dark |
| `--c-mist-50` | `#F4F3F8` | careers card bg |
| `--c-sky-100` | `#D3E0F5` | header CTA bg |
| `--c-sky-500` | `#5D8DCB` | area card 3 band |
| `--c-ink-900` | `#1A1930` | quote text, light-glass body |
| `--c-ink-600` | `#4A4960` | body copy, eyebrows on light |
| `--c-ink-400` | `#9C9AB8` | footer legal line |
| `--c-cocoa-900` | `#1F1C1B` | services fallback bg |
| `--c-white` | `#FFFFFF` | |
| `--glass-dark` | `rgba(0,0,0,.30)` | panels on images |
| `--glass-light` | `rgba(255,255,255,.66)` | tech card 2 panel |
| `--line-on-dark` | `rgba(255,255,255,.16)` | footer rule (.13 / .19 / .22 / .25 variants normalised per use) |

Contrast (WCAG 2.1, computed): navy/white 16.7, ink-600/white 8.7, indigo-600/white 7.3, footer legal 7.0, lilac-300/navy-950 8.5. **All pass AA.** White text over glass-on-photo will be re-checked on final art in Phase 7.

### Typography

| Token | Family / weight | Size / line-height / tracking | Uses |
|---|---|---|---|
| `--t-display-xl` | Newsreader 300 | 104 / 0.98 / −0.035em | Contact headline |
| `--t-display-l` | Newsreader 300 | 72 / 0.98 / −0.03em | Careers card |
| `--t-display-hero` | Newsreader 300 | 64 / 1.04 / −0.035em | Hero h1 (slide titles: 64 / 1.08 / −0.03em) |
| `--t-h2` | Newsreader 300 | 56 / 1.08 / −0.03em | Section headings |
| `--t-h3-l` | Newsreader 300 | 48 / 1.08 / −0.03em | Enabling banner |
| `--t-h3` | Newsreader 300 | 40 / 1.12 / −0.02em | Featured case |
| `--t-h4` | Newsreader 300 | 32 / 1.12 / −0.015em | Tech cards |
| `--t-lead` | Geist 400 | 22 / 1.55 | Slide lead |
| `--t-body-l` | Geist 400 | 18 / normal | Contact line |
| `--t-body` | Geist 300 or 400 | 16 / 1.5–1.65 | Paragraphs |
| `--t-body-s` | Geist 400 | 15 / 1.55 (24px) | Card text |
| `--t-card-title` | Geist 500 | 17–18 / 1.35 | Area / case titles |
| `--t-nav` | Geist 400 | 15 / normal | Nav |
| `--t-button` | Geist 600 | 16 (14 in header) | Pills |
| `--t-caps` | Geist 600 | 12 / +0.08em (11 small) | Caps eyebrows |
| `--t-stat` | Geist 600 | 52 / 56.7px / −0.01em | Stats |

Fluid scaling below 1280: display sizes use `clamp()` with these mobile floors: 104→52, 72→44, 64→40, 56→36, 48→32, 40→30, 32→26, 22→18.

### Spacing, layout, radius, effects

| Token | Value |
|---|---|
| `--container` | 1280px |
| `--gutter` | 80 (≥1280) · 48 (1024–1279) · 32 (768–1023) · 20 (<768) |
| `--space-section` | 80 (≥1024) · 64 (tablet) · 56 (mobile) |
| Gap scale | 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 40, 48, 80 → `--s-1…` |
| `--r-sm` / `--r-md` / `--r-lg` / `--r-pill` | 8 / 12 / 16 / 999 |
| `--blur-glass` / `--blur-veil` | 12px / 26px |
| Pill padding | 11/18 (sm) · 12/20 (md) |

No shadows are used anywhere in the design.

## 3. Breakpoints (inferred: no Figma frames)

| Name | Range | Behaviour |
|---|---|---|
| desktop | ≥1280 | Figma 1:1, container 1280 centred (wider screens: centred, backgrounds full-bleed) |
| laptop | 1024–1279 | same layout, gutter 48, fluid type |
| tablet | 768–1023 | burger nav, 2-col grids, stacked split sections |
| mobile | <768 | 1-col, carousels show 1 card plus a peek, stats stacked |
| small | 320–389 | same as mobile, minimum type floors, Contattaci inside the menu |

## 4. Asset inventory (all downloaded 2026-10-15 → `figma-assets/`)

| File | Source node | Type / size | Status |
|---|---|---|---|
| `logo-gruppo-benefind.png` | 51:4863 | PNG 2386×827 | ✔ (SVG requested) |
| `icon-search.svg`, `icon-menu.svg` | 51:4828, 51:4831 | SVG 20/22 | ✔ |
| `logo-{booking,zalando,sap,spotnana,fever,healthequity}.svg` | 52:4939…4959 | SVG | ✔ ⚠ confirm usage rights |
| `enabling-barn.jpg` | 58:5335 / 97:3431 | JPEG 1284×716 | ✔ |
| `markets-slide{1,2}-bg.png` | 65:5379, 97:4848 | PNG 1584×672 | ✔ (AI generated) |
| `markets-slide{1,2}-photo.png` | 97:4669, 97:4864 | PNG 1534×1264 | ✔ |
| `icon-arrow-left.svg` (+ identical `-rot`) | 97:4839 | SVG 24 | ✔ |
| `markets-divider.svg` | 58:5305 | SVG | ✔ (rendered as CSS border) |
| `services-cocoa-satin.png` | 80:5418 | PNG 1584×672 | ✔ (AI generated) |
| `case-{pharma,manufacturing,financial,public-admin,healthcare}.png` | 97:3305…3329 | PNG 1584×672 | superseded by photo layers (only `public-admin` still used, tech card 3) |
| `case-{pharma,public-admin,manufacturing,financial,healthcare}-photo.jpg` | 98:4893, 98:4891, 98:4886, 98:4890, 98:4901 | JPEG 1392×904 (manufacturing 744×904) | ✔ (added in revision) |
| `markets-slide1-portrait.jpg` | 98:4884 | JPEG 1392×904 | ✔ (added in revision) |
| `careers-portrait.jpg` | 97:3342 | JPEG 2031×1042 | ✔ (placeholder photo) |
| `tech-security.png` | 97:3438 | PNG 1584×672 | ✔ |
| Hero / Careers / Area visuals | 52:4932, 97:3352, 52:4968… | **CSS** (designer stand-ins for future images) | ✔ built in CSS; final images pending |
| Fonts: Newsreader 300 (opsz axis), Geist 300/400/500/600 | — | Newsreader: `app/fonts/` via `next/font/local`; Geist: `next/font/google` (self-hosted at build) | ✔ |
| Favicon `app/icon.png`, `app/apple-icon.png` | derived from 51:4863 | PNG crop of the logo mark | ✔ derived (no favicon in Figma) |

## 5. Content flagged for the client (built as-is unless told otherwise)

1. CTA labels "**Primary CTA**" ×5 (hero, enabling banner, 2 markets slides, services).
2. Bracketed placeholders: case titles ×4, "[Nome], [Ruolo]", quote, "[Una riga di invito al contatto.]".
3. Duplicates: markets slide 3 copy = slide 1 (different photo since the revision); markets lead text identical on all slides; tech card 3 text = card 1; stat labels "faster time to resolution" ×2 (English).
4. Typo "Benfind" → "Benefind" (corrected).
5. Client logo strip: confirm these companies are Benefind clients.
6. Link destinations: none are defined in Figma. Every link uses `#` (or a proposed path) and is listed in the final report.
7. Undesigned states: menu panel, search, nav hover/active, focus styles (focus will use a 2px `--c-indigo-600` outline, offset 3px).
