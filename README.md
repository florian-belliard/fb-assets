# fb-assets

Public assets of the Florian Belliard EI design system, served by jsDelivr: anything a page, a mail
or a document must load from a public address. The design system itself (tokens, components, source
files) lives in the private repo fb-private, under `design-system/`; this repo only publishes what has
to be public.

Today: the design system's icons, as PNG in its colours. Gmail shows no SVG, and the Lucide project
publishes SVG only, in one colour.

## Icons

`icons/<name>-<colour>.png`, 32 px, to be shown at 16 px. Colours: `blue` (#0B3D91), `amber`
(#7A5000, amber-ink), `ink` (#1F2933), `white`.

    https://cdn.jsdelivr.net/gh/florian-belliard/fb-assets@f5cc793d6eb95eb95fbb6affb8516a29aba8ec33/icons/zap-blue.png

`tiles/<name>-<colour>.png`, 56 px, to be shown at 28 px: the icon on its light tile, in one image,
since Gmail's dark mode recolours backgrounds but never images. Colours: `blue` (#0B3D91 on #EEF3FA),
`amber` (#7A5000 on #FFF6E3). Mails sent through the Gmail connector cannot load external images: the
skills that send them carry copies of the tiles they use and attach them inline.

The source is `design-system/icons/` in the private repo fb-private: an icon is added there first,
then rendered here and committed. Mails pin the commit in the URL (`@<sha>`): a
pinned URL never changes, so mails already sent keep their icons.

    node scripts/render-icons.mjs ../fb-private/design-system/icons

The icons are [Lucide](https://lucide.dev) icons, under the ISC licence (`LICENSE-lucide.txt`).
