// Renders a topic folder's video.html frame by frame to MP4, and its carousel.html slides to PNG.
// Usage: node render.mjs <folder> [video|carousel|stills [t1,t2,...]]
// Needs playwright + ffmpeg (on PATH or via FFMPEG env var).
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const topic = process.argv[2];
const mode = process.argv[3] || "video";
if (!topic) { console.error("usage: node render.mjs <folder> [video|carousel|stills]"); process.exit(1); }
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), topic);
const FPS = 30;
const ffmpeg = process.env.FFMPEG || "ffmpeg";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: mode === "carousel" ? 1350 : 1920 } });

if (mode === "carousel") {
  await page.goto("file://" + path.join(dir, "carousel.html"));
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(dir, "karussell");
  fs.mkdirSync(out, { recursive: true });
  const n = await page.locator(".slide").count();
  for (let i = 0; i < n; i++) {
    await page.locator(".slide").nth(i).screenshot({ path: path.join(out, `slide-${String(i + 1).padStart(2, "0")}.png`) });
  }
  console.log(`${n} slides -> ${out}`);
} else {
  await page.goto("file://" + path.join(dir, "video.html"));
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.TOTAL);
  if (mode === "stills") {
    const times = (process.argv[4] || "3,10,18,25,33,40,48,58").split(",").map(Number);
    fs.mkdirSync(path.join(dir, "preview"), { recursive: true });
    for (const t of times) {
      await page.evaluate((t) => window.render(t), t);
      await page.screenshot({ path: path.join(dir, "preview", `t${String(t).padStart(3, "0")}.png`) });
    }
  } else {
    const frames = Math.round(total * FPS);
    const ff = spawn(ffmpeg, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
      "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      path.join(dir, `${topic}-reel.mp4`)], { stdio: ["pipe", "inherit", "inherit"] });
    for (let f = 0; f < frames; f++) {
      await page.evaluate((t) => window.render(t), f / FPS);
      const buf = await page.screenshot({ type: "jpeg", quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
      if (f % 300 === 0) console.log(`frame ${f}/${frames}`);
    }
    ff.stdin.end();
    await new Promise((r) => ff.on("close", r));
    console.log(`video: ${total}s`);
  }
}
await browser.close();
