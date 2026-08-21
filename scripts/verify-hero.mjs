import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = process.env.PORTFOLIO_VERIFY_URL ?? 'http://127.0.0.1:5173';
const outputDir = new URL('../.verification/', import.meta.url);

const viewports = [
  { name: 'desktop', width: 1440, height: 960, scale: 1 },
  { name: 'mobile', width: 390, height: 844, scale: 2 },
];

async function inspectCanvas(page) {
  return page.evaluate(async () => {
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
    const canvas = document.querySelector('canvas');

    if (!(canvas instanceof HTMLCanvasElement)) {
      return { ok: false, reason: 'No canvas element was rendered.' };
    }

    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) {
      return { ok: false, reason: 'Canvas did not expose a WebGL context.' };
    }

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const samples = [
      [Math.floor(width * 0.5), Math.floor(height * 0.5)],
      [Math.floor(width * 0.35), Math.floor(height * 0.45)],
      [Math.floor(width * 0.65), Math.floor(height * 0.54)],
      [Math.floor(width * 0.5), Math.floor(height * 0.32)],
    ];

    const pixel = new Uint8Array(4);
    const totals = [];

    for (const [x, y] of samples) {
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
      totals.push(pixel[0] + pixel[1] + pixel[2] + pixel[3]);
    }

    return {
      ok: width > 0 && height > 0 && totals.some((value) => value > 260),
      reason: `drawingBuffer=${width}x${height}; sampleTotals=${totals.join(',')}`,
    };
  });
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: EDGE_PATH,
  headless: true,
});

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.scale,
    });

    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    await page.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
    await page.waitForTimeout(3200);

    const canvasInspection = await inspectCanvas(page);
    await page.screenshot({
      path: fileURLToPath(new URL(`hero-${viewport.name}.png`, outputDir)),
      fullPage: false,
    });
    await page.close();

    if (!canvasInspection.ok) {
      throw new Error(`${viewport.name} WebGL inspection failed: ${canvasInspection.reason}`);
    }

    console.log(`${viewport.name}: ${canvasInspection.reason}`);
  }
} finally {
  await browser.close();
}
