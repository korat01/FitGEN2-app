import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(path.join(__dirname, 'ascend-icon-master.svg'));

const buffers = await Promise.all(
  [16, 32, 48].map((size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer())
);
const ico = await pngToIco(buffers);
writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), ico);
console.log('favicon.ico written');
