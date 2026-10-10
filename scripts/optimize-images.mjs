// Turns the originals in photos-src/ into small, responsive WebP files in
// public/img/photos/. Run after adding or replacing a photo:
//
//   npm run images
//
// For every photo it writes <name>-<width>.webp for each width below (never
// larger than the original) plus a manifest the app reads for srcset.

import { mkdir, readdir, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const SRC = "photos-src"
const OUT = "public/img/photos"
const WIDTHS = [320, 640, 960, 1600]
const QUALITY = 72

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
const manifest = {}
const lowRes = []

for (const file of files.sort()) {
  const name = path.parse(file).name
  const input = sharp(path.join(SRC, file)).rotate() // respect EXIF orientation
  const { width } = await input.metadata()
  const widths = WIDTHS.filter((w) => w < width)
  if (!widths.length || width < WIDTHS.at(-1)) widths.push(Math.min(width, WIDTHS.at(-1)))
  const unique = [...new Set(widths)].sort((a, b) => a - b)

  for (const w of unique) {
    // sharp strips EXIF/XMP metadata by default.
    await input.clone().resize({ width: w }).webp({ quality: QUALITY }).toFile(path.join(OUT, `${name}-${w}.webp`))
  }
  // Tiny blurred preview, inlined in the app so it shows before any download.
  const tiny = await input.clone().resize({ width: 24 }).webp({ quality: 40 }).toBuffer()
  const t = await sharp(tiny).metadata()
  // Wrapped in an SVG blur filter, so the scaled-up preview looks soft instead of blocky.
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t.width} ${t.height}">` +
    `<filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="1"/>` +
    `<feComponentTransfer><feFuncA type="discrete" tableValues="1 1"/></feComponentTransfer></filter>` +
    `<image width="100%" height="100%" preserveAspectRatio="none" filter="url(#b)" ` +
    `href="data:image/webp;base64,${tiny.toString("base64")}"/></svg>`
  manifest[name] = { widths: unique, blur: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}` }
  if (width < 960) lowRes.push(`${file} (${width}px)`)
}

await writeFile("src/data/photo-manifest.json", JSON.stringify(manifest, null, 2) + "\n")

console.log(`Optimized ${files.length} photos into ${OUT}`)
if (lowRes.length) {
  console.log("\nLow resolution, replace with originals of at least 1600px wide:")
  for (const f of lowRes) console.log(`  - ${f}`)
}
