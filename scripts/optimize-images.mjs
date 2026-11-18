#!/usr/bin/env node
/**
 * Resizes and converts client photos so static hosts (which have no image
 * optimizer) serve small files. Run by /aksumite-template after copying images.
 *   - public/hero/**      JPG / PNG / WebP → WebP, at most 1920 px wide, plus a
 *                         960 px `<name>-960.webp` copy for phones (hero photo)
 *   - public/projects/**  JPG / PNG / WebP → WebP, at most 1600 px wide
 *   - public/partners/**  JPG / PNG / WebP → WebP (keeps transparency), at most 560×160
 * The original is replaced by `<name>.webp`; point the data files at the .webp
 * paths. A WebP that is already small enough is left alone, so running twice
 * does not lose quality. SVG, GIF, the logo and the share image are not touched.
 * Usage: npm run images:optimize
 */
import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

// small: also write a copy that wide (`<name>-960.webp`), which hero.tsx serves
// to phones and tablets
const TARGETS = [
  { dir: 'hero', width: 1920, height: undefined, budget: 550_000, small: 960 },
  { dir: 'projects', width: 1600, height: undefined, budget: 300_000 },
  { dir: 'partners', width: 560, height: 160, budget: 60_000 },
];

const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function filesIn(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

let converted = 0;
let failures = 0;

/** Writes `<name>-<width>.webp` next to a WebP unless an up-to-date one exists */
async function writeSmallCopy(file, smallWidth) {
  const smallFile = file.replace(/\.webp$/, `-${smallWidth}.webp`);
  if (existsSync(smallFile) && statSync(smallFile).mtimeMs >= statSync(file).mtimeMs) return;
  await sharp(file)
    .resize({ width: smallWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(smallFile);
  console.log(
    `ok   /${relative(PUBLIC, smallFile).replaceAll('\\', '/')} ` +
      `(${Math.round(statSync(smallFile).size / 1024)} KB, for phones)`
  );
}

for (const { dir, width, height, budget, small } of TARGETS) {
  for (const file of filesIn(join(PUBLIC, dir))) {
    const ext = extname(file).toLowerCase();
    if (!CONVERTIBLE.has(ext)) continue;
    if (small && file.endsWith(`-${small}.webp`)) continue;

    const name = relative(PUBLIC, file).replaceAll('\\', '/');
    try {
      const image = sharp(file);
      const meta = await image.metadata();
      const fits = (meta.width ?? 0) <= width && (!height || (meta.height ?? 0) <= height);
      if (ext === '.webp' && fits && statSync(file).size <= budget) {
        if (small) await writeSmallCopy(file, small);
        continue;
      }

      const output = `${file.slice(0, -ext.length)}.webp`;
      const temporary = `${output}.tmp`;
      const before = statSync(file).size;
      await image
        .rotate() // apply the camera's orientation before EXIF is dropped
        .resize({ width, height, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(temporary);
      if (file !== output) unlinkSync(file);
      renameSync(temporary, output);
      if (small) await writeSmallCopy(output, small);

      const after = statSync(output).size;
      converted++;
      console.log(
        `ok   /${name} → /${relative(PUBLIC, output).replaceAll('\\', '/')} ` +
          `(${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB)`
      );
      if (after > budget) {
        console.log(
          `warn /${name}: still over ${Math.round(budget / 1024)} KB; use a smaller photo`
        );
      }
    } catch (error) {
      failures++;
      console.error(`FAIL /${name}: ${error.message}`);
    }
  }
}

console.log(`\n${converted} image(s) optimized.`);
if (failures > 0) process.exit(1);
