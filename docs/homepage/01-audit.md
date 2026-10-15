# 01 — Repository audit

_Date: 2026-10-15 · Phase 1 · Status: complete. Scaffold **approved and built** (Phase 5); see the note at the end._

## 1. What exists

| Item | Finding |
|---|---|
| Working directory | `/home/user`: **empty** (no files, no `.git`, no `package.json`) |
| Framework / language | none |
| Package manager | none chosen; available: npm 10.9.4, pnpm 10.28.0, yarn 1.22.22 |
| Runtime | Node v22.22.0 |
| Styling / tokens | none |
| Animation / smooth-scroll / UI libs | none |
| Components, fonts, icons, assets | none in repo; Figma assets staged in `figma-assets/` (see §5) |
| Lint / typecheck / tests | none |
| Deploy target | none visible (no `vercel.json`, Dockerfile, CI config) |
| Browser tooling | Chromium at `/opt/pw-browsers/chromium`; Playwright 1.56.1 installed globally (used outside the repo for reference analysis) |

So the rule to "preserve the existing architecture" has nothing to preserve. The brief says to propose a minimal scaffold and **wait for confirmation**, so nothing has been scaffolded yet.

## 2. Proposed scaffold (pending approval)

**Next.js 16 (App Router) + React 19 + TypeScript, styled with CSS Modules over global CSS custom properties.**

Versions checked on the npm registry today:

| Package | Version | Note |
|---|---|---|
| `next` | 16.4.1 | requires Node ≥ 20.9 (we have 22.22 ✔) |
| `react`, `react-dom` | 19.3.1 | within Next's peer range `^18.2 \|\| ^19` ✔ |
| `typescript` | **6.0.3 (pinned)** | 7.0.2 is the new native compiler. Next 16's type-check integration has not been verified against it here, so pin 6.0.x and upgrade deliberately later |
| `eslint` + `eslint-config-next` | 10.x / 16.4.1 | flat config |
| `@types/react`, `@types/react-dom`, `@types/node` | latest | — |

Package manager: **npm**. It's already present, has no extra setup, and produces a single lockfile.

### Styling choice: CSS Modules + CSS variables (not Tailwind)

- The Figma file defines **no variables** (`get_variable_defs` returned `{}`). Tokens have to be authored by hand anyway, and `:root` custom properties are the most direct, framework-agnostic home for them. They can also be read by the motion layer (`var(--ease-out)`).
- The page has few, large, bespoke sections. CSS Modules keep each section's layout local and readable, without long utility strings.
- Zero runtime and zero extra dependencies (Next supports CSS Modules natively).
- The Figma MCP output is Tailwind, but only as reference. The MCP itself says not to install Tailwind unless asked.

### Proposed structure (only folders that will actually be used)

```
app/
  layout.tsx            fonts, <html class> no-js→js inline script, metadata
  page.tsx              homepage composition
  globals.css           reset + tokens import + base type
components/
  layout/               Header, MobileMenu, Footer
  sections/             Hero, ClientLogos, Areas, EnablingBanner, Markets,
                        Services, CaseStudies, Careers, Technologies, Contact
  ui/                   Button, Eyebrow, SectionHeading, CarouselControls
  motion/               Reveal, SplitLines, MotionRoot (single client entry)
hooks/                  useCarousel (scroll-snap state), useHeaderScroll
lib/motion/tokens.ts    motion tokens (mirrors CSS variables)
styles/tokens.css       color / type / spacing / radius / motion variables
public/assets/          logos/, images/, icons/  (from figma-assets/)
docs/homepage/          these documents + screenshots
```

### Scripts that will exist

`dev`, `build`, `start`, `lint` (`eslint .`), `typecheck` (`tsc --noEmit`). A small Playwright script for screenshot QA will live outside the app bundle (`scripts/qa/`, devDependency `@playwright/test` pinned to the installed 1.56 so it uses `/opt/pw-browsers`).

## 3. Reusable pieces

None in the repo. From the design, the reusable pieces are:

- **Pill button** in 4 visual variants: white/navy (on dark), navy/white (on light), outline navy, outline white, plus the sky header CTA.
- **Eyebrow + display heading** pair: used in 6 sections.
- **Glass panel**: 4 uses, two themes (dark 30% black, light 66% white).
- **Prev/next round controls**: 2 visual variants (translucent 50px with Lucide arrow; navy pill with `←/→` glyph).
- **Media frame**: rounded image with overflow clip, the target for the image reveal.

## 4. Constraints & risks

| Risk | Impact | Mitigation |
|---|---|---|
| No tablet/mobile frames in Figma | Responsive layouts must be inferred | Documented per section in `02-implementation-map.md`; validate with client after the first build |
| Several images are placeholders or AI-generated stand-ins (hero "sostituire il fill con l'immagine", "Segnaposto foto", "AI generated") | Final art will change | Image slots built to fixed aspect ratios with `object-fit: cover`, so swapping art doesn't change layout |
| Client-logo strip (Booking.com, Zalando, SAP, Spotnana, Fever, HealthEquity, "taupe" SVGs) looks like template content | **Legal/brand risk** if these aren't Benefind clients | Implement as designed, flag prominently; confirm before go-live |
| Header logo is a raster PNG (2386×827) | Softness at some DPRs, heavier than SVG | Serve via `next/image`; request SVG |
| `next/font/google` downloads fonts at **build** time | Build needs network to fonts.googleapis | Acceptable here (proxy allows HTTPS). Fallback: vendor the woff2 files and use `next/font/local` |
| TypeScript 7 just released | Possible tooling incompatibility | Pin 6.0.3 |
| `backdrop-filter` glass panels over images | Cost on low-end GPUs; contrast varies with image | Static only (never animated); verify contrast on final art |
| Large PNG sources (1.2–2.8 MB each) | LCP / bandwidth | `next/image` → AVIF/WebP at responsive sizes; `priority` only on the LCP element |

## 5. Dependencies: reuse / add / avoid

- **Reuse:** nothing exists.
- **Add (runtime):** `next`, `react`, `react-dom`. That's all.
- **Add (dev):** `typescript@6.0.3`, `eslint`, `eslint-config-next`, `@types/*`, `@playwright/test@1.56.1` (QA scripts only).
- **Avoid:** Tailwind (see §2), GSAP, Lenis, Motion/Framer Motion, Swiper, any split-text library. Reasons are in `04-decision.md`.

## 6. Assets already secured

Figma MCP asset URLs expire after 7 days, so all 26 assets were downloaded on 2026-10-15 to `figma-assets/` (staging). They'll be moved into `public/assets/` during Phase 5. The inventory is in `02-implementation-map.md §4`.

## 7. Post-approval notes (Phase 5)

- Scaffolded as proposed: Next.js 16.4.1 (Turbopack build), React 19.3.1, TypeScript **6.0.3** (verified: `next build` type-check passes), CSS Modules + `styles/tokens.css`.
- ESLint: **9.39** (not 10.x). `eslint-config-next@16.4.1` declares `eslint >=9`, and 9 is the line it is tested against. Flat config in `eslint.config.mjs`.
- `npm audit` reports 5 high-severity advisories, all in the **dev-only** lint chain (`micromatch` ← `fast-glob` ← `@next/eslint-plugin-next`). None ship to the browser. Revisit when `eslint-config-next` updates.
- `@playwright/test@1.56.1` (devDependency) drives `scripts/qa/*`, using the preinstalled Chromium.
