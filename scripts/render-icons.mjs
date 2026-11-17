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
// Tiles: the icon on its light tile, as one image (Gmail's dark mode recolours backgrounds, never
// images). 56 px, shown at 28 px. blue: #0B3D91 on #EEF3FA; amber: #7A5000 on #FFF6E3.
const TILES = { blue: ['#EEF3FA', '#0B3D91'], amber: ['#FFF6E3', '#7A5000'] }
const tile = await browser.newPage({ viewport: { width: 56, height: 56 } })
mkdirSync('tiles', { recursive: true })
for (const file of readdirSync(src).filter((f) => f.endsWith('.svg')).toSorted()) {
  const svg = readFileSync(join(src, file), 'utf8').replace(/width="24"\s+height="24"/, 'width="32" height="32"')
  for (const [name, [bg, fg]] of Object.entries(TILES)) {
    await tile.setContent(`<body style="margin:0;background:transparent"><div style="width:56px;height:56px;border-radius:16px;background:${bg};color:${fg};display:flex;align-items:center;justify-content:center">${svg}</div></body>`)
    await tile.screenshot({ path: `tiles/${basename(file, '.svg')}-${name}.png`, omitBackground: true, clip: { x: 0, y: 0, width: 56, height: 56 } })
  }
}
await browser.close()
