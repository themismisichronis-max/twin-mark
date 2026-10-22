// Usage: node scripts/capture.mjs <url> <outDir> [times(ms) comma list] [--full]
// Captures desktop (1440x900) and phone (390x844, touch) frames of the
// running page, so motion can be judged mid-animation.
import { chromium, devices } from "playwright";
import fs from "node:fs";

const [url = "http://localhost:8787/", out = ".impeccable/review/frames", timesArg = "300,800,1300,2600"] = process.argv.slice(2);
const full = process.argv.includes("--full");
const scrollTo = (process.argv.find((a) => a.startsWith("--scroll=")) || "").split("=")[1];
const reduce = process.argv.includes("--reduce");
const nojs = process.argv.includes("--nojs");
const times = timesArg.split(",").map(Number);
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const shapes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  phone: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }
};
for (const [name, opts] of Object.entries(shapes)) {
  const ctx = await browser.newContext({ ...opts, reducedMotion: reduce ? "reduce" : "no-preference", javaScriptEnabled: !nojs });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(m.text()); });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  if (scrollTo) {
    await page.waitForTimeout(2600);
    const y = await page.evaluate((s) => { const el = document.querySelector(s); return el ? el.getBoundingClientRect().top + scrollY : Number(s) || 0; }, scrollTo);
    await page.evaluate((y) => scrollTo(0, y), y - 40);
  }
  const t0 = Date.now();
  for (const t of times) {
    const wait = t - (Date.now() - t0);
    if (wait > 0) await page.waitForTimeout(wait);
    await page.screenshot({ path: `${out}/${name}-${t}.png`, fullPage: full && t === times[times.length - 1] });
  }
  if (errors.length) console.log(name, "errors:", errors.join("\n"));
  await ctx.close();
}
await browser.close();
console.log("frames in", out);
