// Renders the design system's SVG icons (fb-private/design-system/icons) to PNG for mails:
// Gmail shows no SVG. Each icon, in each colour, at 32 px (shown at 16 px, sharp on retina).
// Usage: node scripts/render-icons.mjs <svg-dir>   (needs Playwright with Chromium)
import { readdirSync, readFileSync, mkdirSync } from 'node:fs'
import { join, basename } from 'node:path'
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')

const COLORS = { blue: '#0B3D91', amber: '#7A5000', ink: '#1F2933', white: '#FFFFFF' }
const SIZE = 32
const src = process.argv[2]
if (!src) throw new Error('usage: node scripts/render-icons.mjs <svg-dir>')
mkdirSync('icons', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } })
for (const file of readdirSync(src).filter((f) => f.endsWith('.svg')).toSorted()) {
  const svg = readFileSync(join(src, file), 'utf8').replace(/width="24"\s+height="24"/, `width="${SIZE}" height="${SIZE}"`)
  for (const [name, hex] of Object.entries(COLORS)) {
    await page.setContent(`<body style="margin:0;background:transparent;color:${hex}">${svg}</body>`)
    await page.screenshot({ path: `icons/${basename(file, '.svg')}-${name}.png`, omitBackground: true, clip: { x: 0, y: 0, width: SIZE, height: SIZE } })
  }
}
await browser.close()
