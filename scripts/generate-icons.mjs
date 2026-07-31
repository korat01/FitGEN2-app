import sharp from 'sharp';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(path.join(__dirname, 'ascend-icon-master.svg'));
const outDir = path.join(__dirname, '..', 'public', 'icons');

const sizes = [57, 60, 72, 76, 96, 114, 120, 128, 144, 152, 180, 192, 384, 512];

await Promise.all(
  sizes.map((size) =>
    sharp(svg, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(outDir, `icon-${size}x${size}.png`))
  )
);

console.log('Generated', sizes.length, 'PNG icons in', outDir);
