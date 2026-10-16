// Motion walkthrough checks (Phase 6/9). Usage: node scripts/qa/motion.mjs [baseUrl] [outDir]
import { chromium } from "@playwright/test";
import fs from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "docs/homepage/screenshots/motion";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
const results = {};
const log = (k, v) => { results[k] = v; console.log(k.padEnd(34), typeof v === "string" ? v : JSON.stringify(v)); };

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  await ctx.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  return { ctx, page, errors };
}
const opacity = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); return el ? +getComputedStyle(el).opacity : null; }, sel);

// 1. Entrance timeline
{
  const { ctx, page, errors } = await newPage();
  const t0 = Date.now();
  await page.goto(base, { waitUntil: "commit" });
  const frames = [];
  for (const ms of [150, 400, 700, 1000, 1300, 1800]) {
    const wait = ms - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait);
    await page.screenshot({ path: `${out}/entrance-${ms}.png`, clip: { x: 0, y: 0, width: 1440, height: 781 } });
    frames.push([ms, await opacity(page, "[data-hero-line]"), await opacity(page, "[data-hero-cta]")]);
  }
  log("entrance [ms, h1 line, cta]", frames);
  const anims = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running" && a.effect?.target?.closest?.("section")?.matches("section:first-of-type")).length);
  log("hero animations still running @1.8s", anims);
  log("nav clickable immediately", await page.evaluate(() => getComputedStyle(document.querySelector("#site-header nav a")).opacity === "1"));

  // 2. Reveals below the fold: hidden before, visible after scrolling
  const sel = "section:has(#aree-title) li";
  log("area card opacity before scroll", await opacity(page, sel));
  await page.evaluate(() => document.querySelector("#aree-title").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(1300);
  log("area card opacity after scroll", await opacity(page, sel));
  log("aree h2 split lines", await page.evaluate(() => { const h = document.querySelector("#aree-title"); return { ready: h.hasAttribute("data-split-ready"), lines: h.querySelectorAll(".split-line").length, isIn: h.classList.contains("is-in"), text: h.textContent }; }));
  await page.screenshot({ path: `${out}/areas-revealed.png` });

  // 3. Header hide/show
  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo({ top: 2600, behavior: "instant" }));
  await page.waitForTimeout(700);
  const hidden = await page.evaluate(() => document.getElementById("site-header").getBoundingClientRect().bottom);
  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
  await page.waitForTimeout(700);
  const shown = await page.evaluate(() => document.getElementById("site-header").getBoundingClientRect().bottom);
  log("header bottom after down / up", [Math.round(hidden), Math.round(shown)]);

  // 4. Scroll-linked rise (M8): stats panel opacity across scroll positions
  const statsY = await page.evaluate(() => document.querySelector("#servizi dl").getBoundingClientRect().top + scrollY);
  const scrub = [];
  for (const off of [950, 800, 650, 500, 300]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), statsY - off);
    await page.waitForTimeout(250);
    scrub.push([off, await page.evaluate(() => { const cs = getComputedStyle(document.querySelector("#servizi dl")); return [+(+cs.opacity).toFixed(2), cs.transform]; })]);
  }
  log("stats rise [viewport top offset, op/tf]", scrub);
  // Reverse: scrolling back up re-hides (scrubbed)
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), statsY - 900);
  await page.waitForTimeout(250);
  log("stats opacity after scrolling back", await opacity(page, "#servizi dl"));

  // 5. Parallax (M7)
  const par = [];
  const cardY = await page.evaluate(() => document.querySelector("[data-parallax-scope]").getBoundingClientRect().top + scrollY);
  for (const off of [800, 400, 0, -300]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), cardY - off);
    await page.waitForTimeout(200);
    par.push(await page.evaluate(() => getComputedStyle(document.querySelector("[data-parallax]")).transform));
  }
  log("parallax transforms", par);

  // Full pass to settle everything, then CLS + console
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 300) { await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y); await page.waitForTimeout(60); }
  await page.waitForTimeout(1500);
  log("hidden reveal elements after full pass", await page.evaluate(() => [...document.querySelectorAll("[data-reveal]:not(.is-in), [data-split]:not(.is-in)")].map((e) => e.id || e.className).slice(0, 5)));
  log("CLS (full scroll)", await page.evaluate(() => +window.__cls.toFixed(4)));
  log("console errors/warnings", errors);
  await ctx.close();
}

// 6. Carousel
{
  const { ctx, page } = await newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelector("#mercati [aria-roledescription=slide]").scrollIntoView({ block: "center", behavior: "instant" }));
  await page.waitForTimeout(400);
  await page.click('[aria-label="Navigazione mercati"] button[aria-label="Successivo"]');
  await page.waitForTimeout(1200);
  log("markets active after next", await page.evaluate(() => [...document.querySelectorAll("#mercati [aria-roledescription=slide]")].findIndex((a) => a.hasAttribute("data-active"))));
  await page.focus("#mercati [tabindex='0']");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(1200);
  log("markets active after ArrowRight", await page.evaluate(() => [...document.querySelectorAll("#mercati [aria-roledescription=slide]")].findIndex((a) => a.hasAttribute("data-active"))));
  log("next disabled at end", await page.evaluate(() => document.querySelector('[aria-label="Navigazione mercati"] button[aria-label="Successivo"]').disabled));
  await page.screenshot({ path: `${out}/markets-slide3.png` });
  await ctx.close();
}

// 7. Menu (mobile)
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.tap('button[aria-controls][aria-label$=\"menu\"]');
  await page.waitForTimeout(600);
  log("menu open: expanded / focus / scroll lock / main inert", await page.evaluate(() => [
    document.querySelector("button[aria-controls][aria-label$=\"menu\"]").getAttribute("aria-expanded"),
    document.activeElement?.textContent,
    document.documentElement.classList.contains("no-scroll"),
    document.getElementById("main").hasAttribute("inert"),
  ]));
  await page.screenshot({ path: `${out}/menu-open-390.png` });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  log("menu after Esc: expanded / panel hidden / focus", await page.evaluate(() => [
    document.querySelector("button[aria-controls][aria-label$=\"menu\"]").getAttribute("aria-expanded"),
    document.getElementById(document.querySelector("button[aria-controls][aria-label$=\"menu\"]").getAttribute("aria-controls")).hidden,
    document.activeElement?.getAttribute("aria-label"),
  ]));
  await ctx.close();
}

// 8. Reduced motion
{
  const { ctx, page, errors } = await newPage({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  log("RM hero line opacity @300ms", await opacity(page, "[data-hero-line]"));
  await page.evaluate(() => document.querySelector("#servizi dl").scrollIntoView({ block: "center", behavior: "instant" }));
  await page.waitForTimeout(400);
  log("RM stats transform / opacity", await page.evaluate(() => { const cs = getComputedStyle(document.querySelector("#servizi dl")); return [cs.transform, cs.opacity, document.querySelector("#servizi dl").getAnimations().length]; }));
  log("RM parallax animations", await page.evaluate(() => document.querySelector("[data-parallax]").getAnimations().length));
  log("RM scroll-behavior", await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior));
  log("RM console", errors);
  await page.screenshot({ path: `${out}/reduced-motion-services.png` });
  await ctx.close();
}

// 9. No JavaScript: all content visible
{
  const { ctx, page } = await newPage({ javaScriptEnabled: false });
  await page.goto(base, { waitUntil: "load" });
  log("noJS html class", await page.evaluate(() => document.documentElement.className.includes("no-js")).catch(() => "n/a (js disabled)"));
  await page.screenshot({ path: `${out}/nojs-full.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2));
