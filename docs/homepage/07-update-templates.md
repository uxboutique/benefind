# 07 — Update: new templates, menus, carousel controls (Figma page "Layout" 46:4065, 2026-10-19)

## What changed
| Figma | Code | Route |
|---|---|---|
| Desktop - Homepage 47:4207: carousel controls moved below the slider and recoloured; Markets slides redesigned (check-list, 2 slides) | `CarouselControls`, `Markets` | `/` |
| Desktop - Template Enabling Technologies 142:3675 | `FeatureRows`, `InfoCards` (carousel), photo-only `ImageBanner` | `/enabling-technologies/integration-platforms/` |
| Desktop - Template Products 143:4468 | `PageIntro` (logo), `ProductShowcase`, `Benefits`, `FeatureList` (sticky), `ImageBanner` (text) | `/products/spera/` |
| Desktop - Template Services 147:6684 | `PageIntro` (single column), `InfoCards` (grid), `MarketCards` (title only) | `/services/information-technology-consulting/` |
| Menus: Enabling 145:6257, Services 147:7792, Products 144:5332 | `MegaMenu` (list / products grid), `content/navigation.ts` | — |
| Desktop - Menu - Hamburger 147:7973 | `Header` utility dropdown (≥1024px; the full-screen panel stays on mobile) | — |

- **Carousel controls** (all carousels): two 50px circles under the slider (24px gap), aligned to the
  container. Enabled = `surface/cyan-light`, disabled = `surface/lilac-100`, navy arrow.
- **"Le funzionalità"** (Products): the title block is `position: sticky`, and only the list
  (`funzionalità_scroll`) scrolls. CSS only.
- **Mega-menus**: widths and offsets are taken from Figma (Markets 874, Enabling 677, Services 708, Products 1086).
  Product tiles show the Figma hover state: 2px navy outline plus "Scopri".
- Footer links and menu entries point to the new pages where they exist (`lib/routes.ts`).
- Decorative "luminous" backgrounds are reproduced as rotated image layers (`lib/media.ts`), not flattened screenshots.

## Verified (production build, local)
- lint, typecheck, static export with `/benefind`: OK. noindex is present on all 5 pages.
- Height vs Figma at 1440: Home −5, Pharma +13, Enabling +7, Products +7, Services +12 px.
  `positions.mjs` was updated to the new Figma anchors (all within ±17px).
- Menu panels: x / width / height match Figma (Services 708×224, Products 1086×552, hamburger 334×241 at x1026).
- axe: 0 violations on all 5 pages at 1440 and 390. motion.mjs: all checks pass. CLS 0.
- Carousels: each Next press, swipe or drag moves exactly one card. Prev is disabled at the start and Next at the end.

## Placeholders kept as designed (approved)
- "Screen da inserire" cards (Enabling, Products): drawn as a decorative pseudo-element, to be replaced by screenshots.
- Products menu: 4 tiles marked "LOGO DA INSERIRE" in Figma. The code shows the remaining product names
  (Aeva, AllinApp, LegalHUB, REadvice) with the duplicated Figma description.
- Services "Altri servizi": the 5th Figma card is a leftover "Manufacturing" market card and is not rendered.
- "[Name] Enabling Technologies", "[Nome]", "Lorem ipsum", "Primary CTA", and the GSK slides
  (also reused on Services).
- Spera dashboard: the screenshot is a generic demo dashboard. As in Figma, the Spera logo covers its brand corner.

## 2026-10-19 (later): smooth scroll off + carousel CTA fix
- **Smooth scroll disabled at the client's request**: Lenis is removed (component and dependency) and so is CSS
  `scroll-behavior: smooth`. Wheel and anchor scrolling are fully native and instant. Anchors still land
  below the header (`scroll-padding-top`). The carousels keep their own one-card-per-gesture wheel handling.
- **Bug fix, homepage Markets carousel**: the "Primary CTA" on the "Artificial Intelligence" slide had
  `href="#"`, so clicking it jumped the page to the top. It now opens Integration Platforms (the only designed
  Enabling page), and the Pharma slide opens Pharma. Site-wide, every placeholder link (`href="#"`) is now
  inert (`components/motion/PlaceholderLinks.tsx`) instead of scrolling to the top.

## 2026-10-19 (mobile): menu, accordion, mobile audit
- **Mobile menu** (Figma 156:8062 / open 156:8163): an accordion with one section open at a time. The Lucide +
  morphs into − as the vertical bar collapses. Height animates via a `grid-template-rows` 0fr → 1fr transition
  (480 ms, apple.com easing `cubic-bezier(0.28, 0.11, 0.32, 1)`, new token `--ease-apple`). Links fade in with
  a 30 ms stagger and the feature card follows at +220 ms. Below the sections: Gruppo Benefind / Careers / Innovation,
  then English | Cerca. Figma frame 156:8163 has no keyframes, so the animation follows the open/closed states
  with Apple timings.
- **Mobile tokens** (393 Figma frame): 16px margins, 77px header (logo 146 × 44), compact CTA, and search moved
  into the menu.
- **Footer**: below 768px the columns become Apple-style accordions (44px rows, rotating chevron).
- **Fixes from the audit**:
  - No label below 12px.
  - "Scopri"-style links get a 44px touch area.
  - The breadcrumb stays on one horizontally scrollable line; it previously wrapped with an orphan separator.
  - Reveal elements skipped by a fast fling are revealed anyway.
- **Verified**:
  - No horizontal overflow on the 5 pages at 390.
  - axe 0 violations on 5 pages at 1440 and 390; motion suite green with CLS 0.
  - Desktop positions unchanged (±17px).

## 2026-10-19 (mobile fixes, round 2)
- **Bug**: on narrow windows the inner-page client-logo band (`ClientLogos compact`) stayed 120px tall while the logos
  wrapped onto 3 rows, so the banner covered the last row (Pharma, reported by the client). The 120px height now
  applies only ≥1024px.
- Overlap audit (`overlap.mjs`, widths 360–1180, all 5 pages): no section content spills into the next, no
  clipped text, no horizontal overflow.
- Small screens:
  - "Le funzionalità" keeps the row layout with a 112px thumbnail.
  - Services cards and Enabling media use 4:3 instead of square.
