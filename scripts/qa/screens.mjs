// Screenshot QA: full page + per-section shots at several widths.
// Usage: node scripts/qa/screens.mjs [baseUrl] [outDir] [--reduced] [--nojs]
import { chromium } from "@playwright/test";
import fs from "node:fs";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) ?? "http://localhost:3000";
const out = args.find((a) => !a.startsWith("http") && !a.startsWith("--")) ?? "docs/homepage/screenshots/build";
const reduced = args.includes("--reduced");
const noJs = args.includes("--nojs");
const widths = (args.find((a) => a.startsWith("--widths="))?.slice(9) ?? "1440,1280,768,390,320").split(",").map(Number);
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
const report = [];
for (const width of widths) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? "reduce" : "no-preference",
    javaScriptEnabled: !noJs,
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && logs.push(`${m.type()}: ${m.text()}`));
  page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => logs.push(`requestfailed: ${r.url()}`));
  page.on("response", (r) => r.status() >= 400 && logs.push(`http ${r.status()}: ${r.url()}`));
  await page.goto(base, { waitUntil: "networkidle" });
  // Scroll through so lazy images + one-shot reveals settle, then back to top.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const tag = `${width}${reduced ? "-reduced" : ""}${noJs ? "-nojs" : ""}`;
  await page.screenshot({ path: `${out}/full-${tag}.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report.push({ width, height: h, horizontalOverflow: overflow, console: logs });
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${out}/report${reduced ? "-reduced" : ""}${noJs ? "-nojs" : ""}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
