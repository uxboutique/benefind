// Compare section y-positions of the build at 1440 with Figma node 47:4207 coordinates (version of 2026-10-19).
import { chromium } from "@playwright/test";
const targets = [
  ["header bottom", "#site-header", "bottom", 81],
  ["hero CTA", "[data-hero-cta]", "top", 81 + 588],
  ["logos rule", "main > section:nth-of-type(2) hr", "top", 951],
  ["banner card", "#enabling-title", "panelTop", 1031],
  ["areas eyebrow", "#aree-title", "eyebrowTop", 1631],
  ["areas rule", "main > section:nth-of-type(4) hr", "top", 2217],
  ["markets eyebrow", "#mercati-title", "eyebrowTop", 2297],
  ["markets slide", "#mercati [aria-roledescription=slide]", "top", 2537],
  ["markets controls", "#mercati [role=group][aria-label^=Navigazione]", "top", 3081],
  ["services", "#servizi", "top", 3211],
  ["services stats", "#servizi dl", "top", 3211 + 463],
  ["case eyebrow", "#case-title", "eyebrowTop", 3966],
  ["case featured", "#case-title ~ article, section:has(#case-title) article", "top", 4163],
  ["case grid", "section:has(#case-title) ul", "top", 4639],
  ["careers", "section:has(#careers-title)", "top", 5041],
  ["careers card", "section:has(#careers-title) article", "top", 5041 + 301],
  ["tech eyebrow", "#tecnologie-title", "eyebrowTop", 6022],
  ["tech cards", "#tecnologie [aria-roledescription=slide]", "top", 6205],
  ["tech controls", "#tecnologie [role=group][aria-label^=Navigazione]", "top", 6749],
  ["contact h2", "#contatti-title", "top", 6856 + 80],
  ["footer", "#site-footer", "top", 7336],
  ["page end", "#site-footer", "bottom", 7899],
];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
// reduced motion → final (untransformed) geometry
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto(process.argv[2] ?? "http://localhost:3000", { waitUntil: "networkidle" });
for (const [name, sel, edge, fy] of targets) {
  const y = await p.evaluate(([sel, edge]) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    if (edge === "eyebrowTop") return el.parentElement.getBoundingClientRect().top + scrollY;
    if (edge === "panelTop") return el.closest("section").firstElementChild.getBoundingClientRect().top + scrollY;
    const r = el.getBoundingClientRect();
    return (edge === "bottom" ? r.bottom : r.top) + scrollY;
  }, [sel, edge]);
  console.log(`${name.padEnd(16)} figma ${String(fy).padStart(5)}  build ${y == null ? "  n/a" : String(Math.round(y)).padStart(5)}  Δ ${y == null ? "" : Math.round(y - fy)}`);
}
await b.close();
