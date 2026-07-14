/**
 * One-off / repeatable image optimizer for public/images.
 * Usage: node scripts/optimize-images.mjs
 *
 * - Re-encodes JPEGs larger than 250 KB (max width 1600px, mozjpeg q78), in place.
 * - Converts named large PNGs to WebP (references must be updated manually).
 * - Generates OG card and PWA/touch icons.
 */
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES = path.join(ROOT, 'public', 'images');
const PUBLIC = path.join(ROOT, 'public');

const JPEG_THRESHOLD = 250 * 1024;
const MAX_WIDTH = 1600;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function recompressJpegs() {
  for await (const file of walk(IMAGES)) {
    if (!/\.(jpe?g)$/i.test(file)) continue;
    const { size } = await stat(file);
    if (size < JPEG_THRESHOLD) continue;

    const tmp = file + '.tmp';
    const img = sharp(file);
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(tmp);

    const newSize = (await stat(tmp)).size;
    if (newSize < size) {
      await rename(tmp, file);
      console.log(`✓ ${path.relative(ROOT, file)}: ${(size / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB`);
    } else {
      await unlink(tmp);
      console.log(`- ${path.relative(ROOT, file)}: already optimal`);
    }
  }
}

async function pngToWebp(relPng) {
  const src = path.join(PUBLIC, relPng);
  const dest = src.replace(/\.png$/i, '.webp');
  const { size } = await stat(src);
  await sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
  const newSize = (await stat(dest)).size;
  await unlink(src);
  console.log(`✓ ${relPng} → .webp: ${(size / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB`);
}

async function generateOgCard() {
  const src = path.join(IMAGES, 'profile', 'hero-banner.JPG');
  const dest = path.join(IMAGES, 'og-card.jpg');
  await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  console.log(`✓ generated images/og-card.jpg`);
}

async function generateIcons() {
  const src = path.join(PUBLIC, 'favicon.svg');
  const targets = [
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
  ];
  for (const [name, px] of targets) {
    await sharp(src, { density: 300 })
      .resize(px, px, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC, name));
    console.log(`✓ generated ${name}`);
  }
}

await recompressJpegs();
await pngToWebp('images/blog/orchestrator-ai-vyvoj/cover-agents.png');
await pngToWebp('images/projects/galtex/cover.png');
await generateOgCard();
await generateIcons();
console.log('Done.');
