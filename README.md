# fb-assets

Public assets for the mails of Florian Belliard EI, served by jsDelivr. Gmail shows no SVG, so the
design system's icons are published here as PNG.

## Icons

`icons/<name>-<colour>.png`, 32 px, to be shown at 16 px. Colours: `blue` (#0B3D91), `amber`
(#7A5000, amber-ink), `ink` (#1F2933), `white`.

    https://cdn.jsdelivr.net/gh/florian-belliard/fb-assets@f5cc793d6eb95eb95fbb6affb8516a29aba8ec33/icons/zap-blue.png

The source is `design-system/icons/` in the private repo fb-private: an icon is added there first,
then rendered here and committed. Mails pin the commit in the URL (`@<sha>`): a
pinned URL never changes, so mails already sent keep their icons.

    node scripts/render-icons.mjs ../fb-private/design-system/icons

The icons are [Lucide](https://lucide.dev) icons, under the ISC licence (`LICENSE-lucide.txt`).
