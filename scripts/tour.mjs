// Usage: node scripts/tour.mjs <url> <outDir> [--reduce] [--nojs]
// Rides the page top to bottom like a visitor, then captures each station
// in the viewport on desktop and phone, plus console errors.
import { chromium, devices } from "playwright";
import fs from "node:fs";

const [url = "http://localhost:8787/", out = ".impeccable/review/tour"] = process.argv.slice(2);
const reduce = process.argv.includes("--reduce");
const nojs = process.argv.includes("--nojs");
fs.mkdirSync(out, { recursive: true });
const stops = ["#top", "#video", "[data-reels]", ".pause", "#photos", "[data-gallery]@0.5", "#web", "#how", "#contact", ".brief", ".foot"];
const shapes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  phone: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }
};
const browser = await chromium.launch();
for (const [name, opts] of Object.entries(shapes)) {
  const ctx = await browser.newContext({ ...opts, reducedMotion: reduce ? "reduce" : "no-preference", javaScriptEnabled: !nojs });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) errors.push(m.text()); });
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  // ride down slowly so every once-trigger fires
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 300) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(60); }
  await page.waitForTimeout(800);
  let i = 0;
  for (const s of stops) {
    const [sel, frac] = s.split("@");
    const y = await page.evaluate(([sel, frac]) => {
      const el = document.querySelector(sel); if (!el) return null;
      const r = el.getBoundingClientRect();
      return frac ? r.top + scrollY + (r.height - innerHeight) * Number(frac) : r.top + scrollY - 20;
    }, [sel, frac]);
    if (y == null) continue;
    await page.evaluate((v) => scrollTo(0, Math.max(0, v)), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}/${name}-${String(i++).padStart(2, "0")}-${sel.replace(/[^a-z]/gi, "")}${frac ? "-mid" : ""}.png` });
  }
  console.log(name, "height", H, errors.length ? "errors:\n" + errors.join("\n") : "no console errors");
  await ctx.close();
}
await browser.close();
