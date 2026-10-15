// Scroll performance: records a Chrome trace while wheel-scrolling the full page and reports
// long tasks, forced layouts/style recalcs, and rAF frame pacing. Usage: [baseUrl] [cpuSlowdown]
import { chromium } from "@playwright/test";
import fs from "node:fs";
const base = process.argv[2] ?? "http://localhost:3000";
const slowdown = +(process.argv[3] ?? 1);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await page.context().newCDPSession(page);
await page.goto(base, { waitUntil: "networkidle" });
// Optional A/B: QA_CSS="..." injects CSS (e.g. to disable a layer and compare cost).
if (process.env.QA_CSS) await page.addStyleTag({ content: process.env.QA_CSS });
await page.waitForTimeout(1500);
if (slowdown > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: slowdown });

const events = [];
cdp.on("Tracing.dataCollected", (e) => events.push(...e.value));
const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
await cdp.send("Tracing.start", { categories: "toplevel,devtools.timeline,disabled-by-default-devtools.timeline.frame,blink.user_timing", transferMode: "ReportEvents" });
await page.evaluate(() => {
  window.__frames = [];
  let last = performance.now();
  const tick = (t) => { window.__frames.push(t - last); last = t; if (!window.__stop) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
const h = await page.evaluate(() => document.documentElement.scrollHeight);
await page.mouse.move(700, 450);
for (let y = 0; y < h; y += 120) { await page.mouse.wheel(0, 120); await page.waitForTimeout(16); }
await page.waitForTimeout(800);
const frames = await page.evaluate(() => { window.__stop = true; return window.__frames.slice(2); });
await cdp.send("Tracing.end");
await done;

const tasks = events.filter((e) => /RunTask$/.test(e.name) && e.dur && e.ph === "X");
const long = tasks.filter((e) => e.dur > 50000);
const count = (n) => events.filter((e) => e.name === n).length;
const sum = (n) => events.filter((e) => e.name === n && e.dur).reduce((a, e) => a + e.dur, 0) / 1000;
const over = (ms) => frames.filter((f) => f > ms).length;
const report = {
  cpuSlowdown: slowdown,
  scrollHeight: h,
  frames: frames.length,
  medianFrameMs: +frames.slice().sort((a, b) => a - b)[Math.floor(frames.length / 2)].toFixed(1),
  framesOver20ms: over(20),
  framesOver33ms: over(33.4),
  longTasksOver50ms: long.length,
  longestTaskMs: +(Math.max(0, ...tasks.map((t) => t.dur)) / 1000).toFixed(1),
  layoutEvents: count("Layout"),
  layoutTotalMs: +sum("Layout").toFixed(1),
  recalcStyleTotalMs: +sum("UpdateLayoutTree").toFixed(1),
  scriptTotalMs: +(sum("FunctionCall") + sum("EvaluateScript")).toFixed(1),
  paintTotalMs: +sum("Paint").toFixed(1),
};
console.log(JSON.stringify(report, null, 2));
fs.mkdirSync("docs/homepage/perf", { recursive: true });
if (!process.env.QA_CSS) fs.writeFileSync(`docs/homepage/perf/scroll-trace-cpu${slowdown}x.json`, JSON.stringify(report, null, 2));
await browser.close();
