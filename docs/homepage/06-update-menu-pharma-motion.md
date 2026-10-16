# 06 — Update: homepage, mega-menu, Pharma, smooth motion

Figma sources: Home 47:4207 · Menu 117:3815 (hover/animate 122:4922) · Pharma 117:3461 ·
Button 120:4775 · Link 122:4867.

## What changed
- **Homepage**: all CTAs now map to the Figma Button set (`variant` accent / secondary / white,
  `size` s / m, 20px arrow) and "Leggi →" / "Scopri" to the Link set (`TextLink`). Type tokens
  aligned (display tracking −0.5px, 16/24 light body, 18/1.35 medium), spacing re-measured.
- **Mega-menu (desktop)**: `components/layout/MegaMenu.tsx`. Hover intent (open 90 ms / close
  220 ms), panel fades + rises 8px, links stagger 25 ms. Hovered link turns bold with an arrow and the
  others drop to 50% (Figma "Animate"). Keyboard: Tab enters the panel and Esc returns to the trigger;
  focus-out or a click outside closes it. Nav data lives in `content/navigation.ts`.
- **Pharma page**: `/markets/pharma/` (`app/markets/pharma`, `content/pharma.ts`), new sections
  PageIntro, SplitIntro, ImageBanner, CaseStudyCarousel, MarketCards; ClientLogos `compact`.
- **Carousels (swipe bugfix, Apple gallery model)**: `hooks/useCarousel.ts`. Position comes from
  scrollLeft, not IntersectionObserver. `scroll-snap-stop: always` gives one card per swipe. Mouse
  drag uses flick detection, and the click after a drag is swallowed. Horizontal wheel / trackpad
  moves one card per gesture. Prev/Next use ease-out expo over 700 ms; reduced motion jumps instantly.
- **Smooth scroll**: Lenis 1.3.26 (`components/motion/SmoothScroll.tsx`). This reverses the earlier
  "no Lenis" decision at the client's request. It loads only on desktop fine pointer ≥1024px, never
  with reduced motion, and lazily. `?lenis=0` disables it for QA. Same-page anchors are handled in
  one Lenis scroll that honours `scroll-padding-top`, and Lenis stops while the mobile menu locks
  scroll.

## Verified (local, production build)
- `npm run lint`, `npm run typecheck`, static export with `/benefind` basePath: OK. noindex is
  present on every page.
- `scripts/qa/motion.mjs`: all checks pass (CLS 0, no hidden reveals, menu/Esc, reduced motion, no-JS).
- axe on Home and Pharma at 1440 and 390: 0 violations. `contrast.mjs`: all pass.
- Carousel: drag, touch swipe, wheel and buttons move exactly 1 card; end states are correct.
  The anchor lands 81px below the top.

## Decisions (approved by the client on 2026-10-16)
All the items below are approved as they are. Scope is limited to the 3 requested templates (Home, Mega-menu,
Pharma). Integration Platforms stays in Figma only and will not be built in code.

### Approved placeholders
- GSK logo and photo on the Pharma page: brand-usage rights need confirming.
- The 3 Pharma case slides and the "Altri markets" card copy are duplicated placeholder text from Figma.
- The Enabling / Services / Products mega-menu panels are not designed in Figma. They reuse the
  footer lists and follow the Markets panel layout.
- Lenis was checked with headless wheel events; still worth a quick feel-check on a real trackpad.

## Figma file (SsKBEykTxpXsWKvGVuS0ed, page "Layout")
- **Tokens**: the collection "Color" keeps its original variable IDs, renamed to `brand/*`, `text/*`, `surface/*`,
  `base/*`, plus 12 new colours from `styles/tokens.css`. New collections "Spacing" (space/4–120,
  button/*, link/gap, layout/*) and "Radius" (sm/md/lg/pill). Every variable has explicit scopes and
  WEB code syntax (`var(--…)`).
- **Components**: Button 120:4775 and Link 122:4867 have a `Label` text property. Padding, gap and radius
  are bound to tokens, text/arrow colours to variables, and the stray white fill on the icon frame was removed.
- **Layouts**: 33 hand-drawn CTAs and "Leggi →" texts in Home, Menu ×2 and Pharma are now Button/Link instances
  (same mapping as the code). Auto layout is applied to: headers (space-between, gutter token), mega-menu
  panels, Pharma intro, section headings, carousel arrow pairs.
- **Motion spec**: frame "Motion spec · Carousel swipe" (133:188). The Markets track is keyframed
  0 → 1 → 2 → 1 → 0 slides, 0.7 s each, cubic-bezier(0.16, 1, 0.3, 1), and Prev/Next fade to 40% at the ends.
  Checked on an exported video.
- **Integration Platforms**: the old 1920 page (Montserrat/Poppins, orange, watermarked stock image, "Video o
  immagine" placeholder) is rebuilt as "Enabling Technologies > Integration Platforms - Concept" (136:197) at 1440 with the
  concept components and the original copy. The old frame is kept, renamed "[OLD 1920 – sostituita]".
  Placeholders: the case-study slider (GSK), the banner/card photos, and the banner CTA "Primary CTA".
