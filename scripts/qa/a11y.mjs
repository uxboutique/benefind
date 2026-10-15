// Accessibility checks: axe-core (WCAG 2.1 A/AA) at 1440 and 390, plus a keyboard tab walkthrough.
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3000";
const AXE = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  // reveal everything first so contrast is measured on the final state
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) { await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(40); }
  await page.waitForTimeout(500);
  await page.addScriptTag({ url: AXE });
  const res = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } });
    return { violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, targets: v.nodes.slice(0, 4).map((x) => x.target.join(" ")), msg: v.nodes[0]?.failureSummary?.slice(0, 160) })), incomplete: r.incomplete.map((v) => `${v.id}(${v.nodes.length})`), passes: r.passes.length };
  });
  console.log(`\n=== axe @${width}: ${res.violations.length} violations, ${res.passes} passed rules`);
  for (const v of res.violations) console.log(JSON.stringify(v));
  console.log("incomplete (needs manual review):", res.incomplete.join(", "));
  if (width === 1440) {
    const heads = await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3")].map((h) => `${h.tagName} ${h.textContent.trim().slice(0, 40)}`));
    console.log("\nheading outline:\n " + heads.join("\n "));
    console.log("landmarks:", await page.evaluate(() => [...document.querySelectorAll("header,nav,main,footer,section[aria-labelledby],section[aria-label]")].length));
  }
  await page.close();
}

// Keyboard walkthrough (first 30 tab stops), checking a visible focus indicator on each.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: "networkidle" });
const stops = [];
for (let i = 0; i < 30; i++) {
  await page.keyboard.press("Tab");
  stops.push(await page.evaluate(() => {
    const el = document.activeElement; const cs = getComputedStyle(el);
    const visible = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
    const r = el.getBoundingClientRect();
    return `${visible ? "✔" : "✘"} ${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") || el.textContent).trim().slice(0, 30)}" inView=${r.bottom > 0 && r.top < innerHeight}`;
  }));
}
console.log("\nkeyboard tab order:\n " + stops.join("\n "));
await browser.close();
