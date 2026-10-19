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
