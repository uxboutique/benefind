# Gruppo Benefind — homepage

Homepage redesign for benefind.it, built from the Figma file `SsKBEykTxpXsWKvGVuS0ed` (node `47:4207`).
Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules + CSS custom properties. No animation libraries.

## Run

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build && npm start  # production
npm run lint && npm run typecheck
```

## Test deploy (GitHub Pages)

Every push to `main` runs `.github/workflows/pages.yml`: lint, typecheck, then a static export
(`STATIC_EXPORT=1`, served under `/<repo-name>/`) published to GitHub Pages.

Local equivalent:

```bash
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/benefind npx next build   # → out/
```

## Where things are

| Path | What |
|---|---|
| `app/` | layout (fonts, boot script), page, global CSS, icons |
| `components/sections/` | one component per homepage section |
| `components/layout/` | header (nav, menu, hide-on-scroll), footer |
| `components/ui/` | Button, SectionHeading, CarouselControls, LightField |
| `components/motion/`, `styles/motion.css`, `lib/motion/tokens.ts` | motion layer |
| `content/home.ts` | all copy (verbatim from Figma) |
| `styles/tokens.css` | design tokens |
| `scripts/qa/` | Playwright QA: screenshots, Figma positions, motion, a11y, contrast, scroll trace |
| `docs/homepage/` | audit, implementation map, motion matrix, decision, final report |

Open items (placeholder copy, `#` links, client-logo rights, final imagery) are listed in
`docs/homepage/05-report.md`, Part B.
