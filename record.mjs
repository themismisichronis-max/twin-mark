// Usage: node scripts/record.mjs <url> <outDir> [scrollTarget selector]
// Records the opening scene and a slow ride to a station, desktop and phone.
import { chromium, devices } from "playwright";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const [url = "http://localhost:8787/", out = ".impeccable/review/video", target = "#video"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const shapes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, size: { width: 1440, height: 900 } },
  phone: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, size: { width: 390, height: 844 } }
};
for (const [name, s] of Object.entries(shapes)) {
  const { size, ...opts } = s;
  const ctx = await browser.newContext({ ...opts, recordVideo: { dir: out, size } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3200);
  if (target === "full") {
    // ride the whole page at a steady, readable pace
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const speed = name === "phone" ? 520 : 640; // px per second
    const frames = Math.round((max / speed) * 25);
    for (let i = 1; i <= frames; i++) {
      await page.evaluate((v) => window.scrollTo(0, v), Math.round((i / frames) * max));
      await page.waitForTimeout(40);
    }
  } else {
    const y = await page.evaluate((sel) => document.querySelector(sel).getBoundingClientRect().top + scrollY, target);
    const steps = 90;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps, e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      await page.evaluate((v) => window.scrollTo(0, v), Math.round(e * (y + 140)));
      await page.waitForTimeout(40);
    }
  }
  await page.waitForTimeout(1800);
  const v = page.video();
  await ctx.close();
  const src = await v.path();
  const dst = `${out}/${name}.mp4`;
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", src, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-movflags", "+faststart", dst]);
  fs.unlinkSync(src);
  console.log("wrote", dst);
}
await browser.close();
