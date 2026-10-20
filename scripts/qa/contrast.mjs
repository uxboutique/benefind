// Contrast of text over imagery/gradients (axe "incomplete"): screenshot each text box with the
// text hidden, compare the text colour against the real background pixels (median and worst 5%).
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3000";
const SELECTORS = [
  "#hero-title", "[data-hero-cta] a",
  "#enabling-title", "section:has(#enabling-title) p",
  // every Markets slide (each has its own background): "@n" = advance the carousel to slide n first
  ...[0, 1, 2, 3, 4, 5, 6].flatMap((n) => [`@${n} #mercati [data-active] h3`, `@${n} #mercati [data-active] li`, `@${n} #mercati [data-active] p`]),
  "#servizi-title", "#servizi p", "#servizi dd", "#servizi dt",
  "#careers-title", "section:has(#careers-title) p:first-child",
  "#tecnologie [aria-roledescription=slide]:nth-child(1) h3", "#tecnologie [aria-roledescription=slide]:nth-child(1) p",
  "#tecnologie [aria-roledescription=slide]:nth-child(2) h3", "#tecnologie [aria-roledescription=slide]:nth-child(2) p",
];
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  console.log(`\n=== ${width}px`);
  for (const entry of SELECTORS) {
    const slide = entry.match(/^@(\d+) /);
    const sel = slide ? entry.slice(slide[0].length) : entry;
    if (slide) {
      const want = +slide[1];
      await page.locator("#mercati").scrollIntoViewIfNeeded();
      for (let k = 0; k < 8; k++) {
        const cur = await page.evaluate(() => [...document.querySelectorAll("#mercati [aria-roledescription=slide]")].findIndex((n) => n.hasAttribute("data-active")));
        if (cur === want) break;
        await page.locator(`#mercati [aria-label=${cur < want ? "Successivo" : "Precedente"}]`).click();
        await page.waitForTimeout(900);
      }
    }
    const el = page.locator(sel).first();
    if (!(await el.count())) { console.log(sel, "not found"); continue; }
    await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
    const info = await el.evaluate((n) => { const cs = getComputedStyle(n); return { color: cs.color, bg: cs.backgroundColor, size: parseFloat(cs.fontSize), weight: +cs.fontWeight, opacity: +cs.opacity }; });
    const fg = info.color.match(/\d+(\.\d+)?/g).map(Number);
    await el.evaluate((n) => { n.dataset.prevColor = n.style.color; n.style.color = "transparent"; n.querySelectorAll("*").forEach((c) => { c.style.color = "transparent"; if (c.matches("img, svg")) c.style.visibility = "hidden"; }); });
    const buf = await el.screenshot();
    await el.evaluate((n) => { n.style.color = n.dataset.prevColor; n.querySelectorAll("*").forEach((c) => { c.style.color = ""; c.style.visibility = ""; }); });
    const px = await page.evaluate(async (b64) => {
      const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
      const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, img.width, img.height).data; const out = [];
      for (let i = 0; i < d.length; i += 16) out.push([d[i], d[i + 1], d[i + 2]]);
      return out;
    }, buf.toString("base64"));
    // Opaque own background (e.g. a solid button): measure against it, not the photo behind its rounded corners.
    const ownBg = info.bg.match(/\d+(\.\d+)?/g)?.map(Number);
    if (ownBg && (ownBg[3] ?? 1) === 1) px.splice(0, px.length, ownBg.slice(0, 3));
    // fg alpha (e.g. stat labels at 70% opacity) — blend over each bg pixel
    const a = (fg[3] ?? 1) * info.opacity;
    const rs = px.map((bg) => ratio(fg.slice(0, 3).map((c, i) => c * a + bg[i] * (1 - a)), bg)).sort((p, q) => p - q);
    const large = info.size >= 24 || (info.size >= 18.66 && info.weight >= 700);
    const need = large ? 3 : 4.5; const p5 = rs[Math.floor(rs.length * 0.05)], med = rs[Math.floor(rs.length / 2)];
    console.log(`${p5 >= need ? "PASS" : "FAIL"} ${entry.padEnd(58)} ${info.size}px need ${need}: worst5% ${p5.toFixed(2)} median ${med.toFixed(2)}`);
  }
  await page.close();
}
await browser.close();
