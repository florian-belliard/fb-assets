# fb-assets

Public assets for the mails of Florian Belliard EI, served by jsDelivr. Gmail shows no SVG, so the
design system's icons are published here as PNG.

## Icons

`icons/<name>-<colour>.png`, 32 px, to be shown at 16 px. Colours: `blue` (#0B3D91), `amber`
(#7A5000, amber-ink), `ink` (#1F2933), `white`.

    https://cdn.jsdelivr.net/gh/florian-belliard/fb-assets@v1/icons/zap-blue.png

The source is `design-system/icons/` in the private repo fb-private: an icon is added there first,
then rendered here and published under a new tag (`v2`, …). A published tag never changes, since
mails already sent point to it.

    node scripts/render-icons.mjs ../fb-private/design-system/icons

The icons are [Lucide](https://lucide.dev) icons, under the ISC licence (`LICENSE-lucide.txt`).
