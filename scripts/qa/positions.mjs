// Compare section y-positions of the build at 1440 with Figma node 47:4207 coordinates.
import { chromium } from "@playwright/test";
const targets = [
  ["header bottom", "#site-header", "bottom", 81],
  ["hero h1", "#hero-title", "top", 81 + 364],
  ["logos rule", "main > section:nth-of-type(2) hr", "top", 951],
  ["banner card", "#enabling-title", "panelTop", 1031],
  ["areas eyebrow", "#aree-title", "eyebrowTop", 1631],
  ["areas rule", "main > section:nth-of-type(4) hr", "top", 2217],
  ["markets eyebrow", "#mercati-title", "eyebrowTop", 2301],
  ["markets slide", "#mercati [aria-roledescription=slide]", "top", 2508],
  ["services", "#servizi", "top", 3106],
  ["services stats", "#servizi dl", "top", 3106 + 463],
  ["case eyebrow", "#case-title", "eyebrowTop", 3861],
  ["case featured", "#case-title ~ article, section:has(#case-title) article", "top", 4058],
  ["case grid", "section:has(#case-title) ul", "top", 4534],
  ["careers", "section:has(#careers-title)", "top", 4936],
  ["careers card", "section:has(#careers-title) article", "top", 4936 + 301],
  ["tech eyebrow", "#tecnologie-title", "eyebrowTop", 5917],
  ["tech cards", "#tecnologie [aria-roledescription=slide]", "top", 6100],
  ["tech controls", "#tecnologie [role=group][aria-label^=Navigazione]", "top", 6650],
  ["contact h2", "#contatti-title", "top", 6831],
  ["footer", "#site-footer", "top", 7231],
  ["page end", "#site-footer", "bottom", 7794],
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
