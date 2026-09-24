# AMTP Babylon Glyphs: the marketing-site icon set

Eleven original SVG icons for `marketing-site/index.html`. They replace the
emoji characters the page used to show (🧭 ✅ 🏦 🔒 💵 🤖 🎖️ 🛡️ 📱 🗑️ and the "✓"
list bullet). Each OS drew those characters in its own emoji font, which is
Apple Color Emoji on Apple devices. Our page was therefore showing Apple's
artwork, not ours.

Every glyph here is new geometry: circles, arcs, lines and polygons placed by
hand on a 48-unit grid. None of it was traced from, or modelled on, Apple,
Google or Microsoft emoji art or SF Symbols outlines. Some ideas are universal,
such as a shield, a tick or a phone. For those, the originality is in the
construction and the metaphor, and the "Deliberately avoided" section below
lists the lookalikes that were steered around.

## Files

| File | Bytes | Used on the page |
|---|---|---|
| `compass.svg` | ~1.1 KB | Diorama chip "What to fix first"; card "What to fix first" |
| `health-gauge.svg` | ~1.7 KB | Diorama chip "Instant health checks" |
| `bank.svg` | ~1.3 KB | Diorama chip "Banks, connected" |
| `vault.svg` | ~1.3 KB | Diorama chip "Bank-grade security"; card "We never see your bank login" |
| `plan-ring.svg` | ~1.7 KB | Card "Your whole financial life" |
| `ai-network.svg` | ~1.4 KB | Card "AI-powered insight" |
| `household.svg` | ~1.2 KB | Card "Built for real households" |
| `shield.svg` | ~1.1 KB | Card "Two-factor, always" |
| `phone.svg` | ~1.0 KB | Card "Your budget stays on your phone" |
| `delete-dissolve.svg` | ~2.0 KB | Card "Delete means delete" |
| `tick.svg` | ~0.5 KB | `ul.plain` list bullet (pricing card) |

The whole set is about 14.4 KB of SVG. It has no fonts, no `<text>`, no `<image>`, no
external references and no scripts. Every file is a standalone SVG with
`xmlns`, so it works in an `<img>` tag and as a CSS `background`.

## Grid and construction rules

- **Canvas:** `viewBox="0 0 48 48"`. The live area is 4 to 44, a 40-unit
  square. Only three small end marks come within 3 to 4 units of the edge:
  the vault hinges, the bank's link nodes and the AI network's outer nodes.
- **Keylines:** a circle Ø36 (r = 18) for round glyphs, a 33 × 33 square with
  r = 7 for square glyphs, and a 23 × 38 portrait rectangle for the phone.
- **Stroke weights:** the primary contour is 3 units. That is 1.5 px at 24 px,
  2 px at 32 px and 4 px at 64 px. Secondary detail is 2 to 2.5 units. Hairline
  texture, such as rim dots and bus lines, is 1.5 units and may disappear below
  24 px by design. Heavy bands (gauge, ring) are 4.5 to 6 units.
- **Small-size exception:** `tick.svg` uses a 6-unit stroke because it shows at
  18 px, where 3 units would be about 1.1 px.
- **Caps and joins:** round everywhere. The one exception is segmented bands
  (gauge, plan ring), which use butt caps so the gaps between segments stay
  exact.
- **Corner radii:** 7 on large containers, 5.5 on the phone body, 4 on the
  document, 1 to 1.5 on small parts (pixels, hinges).
- **Minimum gap:** 2 units, which is 1 px at 24 px.
- **ID prefixes:** every gradient ID carries a per-file prefix (`cmp-`, `hlt-`,
  `bnk-`, `vlt-`, `pln-`, `ain-`, `hsh-`, `shd-`, `phn-`, `del-`, `tck-`). The
  files can therefore be inlined together later without ID collisions.

## Lighting

There is one key light, from the upper left, matching the bright hairline the
site's Liquid Glass cards already carry along their top edge.

1. **Key-light gradient.** Each stroke or fill that uses a family color is
   painted with a `linearGradient` in `gradientUnits="userSpaceOnUse"` from
   (6,6) to (42,42). It runs from the family's **bright** stop at the upper
   left to its **mid** stop at the lower right. Because the gradient is in
   user space and not per-shape bounding box, every shape in every icon is lit
   from the same place. User space also means perfectly horizontal or vertical
   lines, whose bounding box is zero-height or zero-width, still paint.
2. **Facets.** Solid "carved" parts, such as the compass needle, are split
   into a lit left facet and a shaded right facet.
3. **Glass fill.** Closed containers get the family's bright stop at 10 to 20%
   opacity, echoing the site's glass tint.
4. **Specular glint.** Each icon gets one short arc or line of `#FFFFFF` at
   60% opacity and 1.25 units wide, laid on the stroke centerline at the upper
   left, where the key light would catch it.
5. **Glow.** The glow is not baked into the SVG, so edges stay crisp. The page
   adds it at display time with CSS
   `filter: drop-shadow(0 0 5px rgba(65,217,241,.3))`, which is the
   environment light and the same for every glyph. The bullet uses
   `drop-shadow(0 0 4px rgba(131,221,122,.55))`.

## Palette: every color traced

The palette uses only the Babylon Pixel Guide's four OKLCH families. Each
family has a **bright** stop (the shipped dark-mode token, L ≈ 0.818), a
**deep** stop (the shipped light-mode token, L ≈ 0.527) and a derived **mid**
stop.

| Family | Bright (used on the dark site) | Mid (derived, see below) | Deep | Source |
|---|---|---|---|---|
| AMTP Green | `#83DD7A` | `#55AE4C` | `#23801B` | Babylon Pixel Guide, lines 99–103 |
| `accent` (teal) | `#4ADECA` | `#2DAC9A` | `#0D7C6D` | Theme.swift lines 122–123; guide line 61 |
| `accentSecondary` (cyan) | `#41D9F1` | `#24A8BA` | `#007987` | Theme.swift lines 131–132; guide line 62 |
| `accentViolet` | `#E0A5FF` | `#B278D7` | `#854BB0` | Theme.swift lines 141–142; guide line 63 |

| Neutral | Hex | Source | Where used |
|---|---|---|---|
| Highlight | `#FFFFFF` | Theme.swift lines 92–93, `labelPrimary` dark | Every specular glint and highlight dot (AI center node, vault core), the compass hub, the gauge needle and the plan-ring hub |
| Chip | `#0E1311` | Theme.swift line 154, `displayChip` | Gauge hub pin |

- **AMTP Green is not in Theme.swift yet.** The guide says so itself: the
  color is derived and proposed there but not yet wired into the app.
- **The two glow colors in `index.html`** are `rgba(65,217,241,…)` =
  `#41D9F1` (accentSecondary dark) and `rgba(131,221,122,…)` = `#83DD7A`
  (AMTP Green dark).
- **Colors actually used:** checked with a grep over the `.svg` files, these
  are the eight bright and mid stops above, plus `#23801B`, `#007987`,
  `#FFFFFF` and `#0E1311`: twelve distinct values in all. `#0D7C6D` and `#854BB0` are part of the system but not used by
  the current eleven glyphs.

### How the mid stop is derived

The mid stop uses the guide's own method: the midpoint in OKLCH between the
family's two shipped stops. L and C are averaged, and H takes the shorter
circular mean. It is converted to sRGB with Ottosson's published
OKLab↔linear-sRGB matrices.

| Family | Mid OKLCH | Hex | Round-trip back from 8-bit hex |
|---|---|---|---|
| AMTP Green | oklch(0.6721 0.1597 142.01) | `#55AE4C` | 0.6735, 0.1603, 141.88° |
| accent | oklch(0.6723 0.1098 181.23) | `#2DAC9A` | 0.6730, 0.1102, 181.06° |
| accentSecondary | oklch(0.6723 0.1089 209.68) | `#24A8BA` | 0.6727, 0.1088, 209.13° |
| accentViolet | oklch(0.6677 0.1487 310.94) | `#B278D7` | 0.6690, 0.1480, 311.08° |

None of the four clip the sRGB gamut. The small drift in the right-hand
column comes from rounding to 8-bit hex: up to 0.0014 in L and 0.55° in H.
This is the same gamut and quantization effect the guide describes for
`accentViolet`.

### Deliberately excluded

Some colors in Theme.swift are Apple's own iOS system colors copied exactly.
Using them would reproduce the "Apple derivative" problem this set exists to
remove:

- `statusPass` / `statusWarning` / `statusCritical` (#34C759/#30D158,
  #FF9500/#FF9F0A, #FF3B30/#FF453A). This is why the health gauge is **not** a
  red/amber/green traffic light.
- The system grays (#F2F2F7, #1C1C1E, #3C3C43, #EBEBF5, #545458, #747480,
  #767680).
- `BankPalette` (`.blue`, `.green`, `.orange` and the rest).

The site's older CSS neon variables (`--neon-green #34f5a1`, `--neon-cyan
#22d3ee`, `--neon-violet #a78bfa`) are not OKLCH family members, so the glyphs
don't use them. Visually they sit together without conflict: `--neon-cyan` and
`accentSecondary` dark are both at hue ≈ 210–211°.

### Accent rule

Each icon has one primary family. **AMTP Green marks the one "focus" element**:
the compass's north needle, the gauge's healthy band and hub, the bank's coin
and link nodes, the vault's core, the AI's central node, the household's star,
the shield's inner layer, the phone's plan bars, the deleted pixels and the
tick. The eye lands on the same brand color in every glyph.

## Per-icon rationale

- **compass.svg: "What to fix first."** A compass rose built from its own
  parts: an r = 18 ring, four 45° ticks, and a faceted diamond needle. The
  north half is lit AMTP Green and points to the one thing to fix first. The
  south half is shaded cyan and pushed back. A white hub finishes it. It has
  no brass body and no red/white needle.
- **health-gauge.svg: "Instant health checks."** A 240° dial, with three
  bands running violet → cyan → AMTP Green from "needs work" to "healthy". The
  white needle rests in the green band, over a readout baseline. Brand hues
  only, never the traffic-light system colors. A dial rather than a checkmark,
  because the checks are measurements: debt-to-income and runway.
- **bank.svg: "Banks, connected."** A classical hall (pediment, entablature,
  four columns, plinth). An original AMTP Green coin sits in the pediment, and
  the plinth runs out into a "bus" line with a green link node at each end.
  Those nodes are the "connected" part, and they separate it from a generic
  columned-building glyph.
- **vault.svg: "Bank-grade security" / "We never see your bank login."** A
  vault door, not a padlock. It is a rounded-square door with two hinges, a
  dial ring, a three-spoke wheel and a lit green core. It echoes the page's
  own promise, "guards your security like a vault".
- **plan-ring.svg: "Your whole financial life."** Four equal ring segments in
  the four brand families (green, teal, cyan, violet) close into one circle:
  income, expenses, debt and savings in one plan. It is one segmented ring,
  not concentric activity-style rings.
- **ai-network.svg: "AI-powered insight."** Three violet input nodes feed one
  lit AMTP Green center node. Faint rim dots join the three nodes around the
  outside, reading as reasoning over your data. It has no robot face and no
  sparkle stars.
- **household.svg: "Built for real households."** A home whose roof is two
  stacked rank chevrons, for the military families this card speaks to, with
  a green five-point star in the wall. Home and service in one shape. It has
  no medal and no ribbon.
- **shield.svg: "Two-factor, always."** Two nested shields: an outer cyan
  layer and an inner AMTP Green layer with a core pin. Two layers stand for
  two factors. The inner shield is a full outline, not a half-filled split.
- **phone.svg: "Your budget stays on your phone."** A deliberately generic
  handset (rounded rectangle, no notch, no island, no buttons) holding three
  green plan bars: the budget living on the device. A draft had a thin
  baseline under the bars. It was removed because near the bottom of a phone
  outline it read as iOS's home-indicator bar.
- **delete-dissolve.svg: "Delete means delete."** A record whose right half
  breaks into Babylon "pixels". Four columns of green squares drift right and
  fade from 95% to 25% opacity. The data is gone, not moved to a bin.
- **tick.svg: bullet.** An asymmetric tick (short arm to long arm about
  1 : 2.1, knee at (19.5, 34.5)) with a 6-unit round stroke in the AMTP Green
  key-light gradient. It replaces the font's "✓" character.

## Deliberately avoided (lookalike check)

- A ribbed, tapered trash can with a lid (the SF Symbols `trash` family).
- Three four-point sparkle stars for AI (`sparkles`).
- A checkmark inside a seal or badge (`checkmark.seal`).
- A shield split into a filled left half (`shield.lefthalf.filled`).
- A phone outline with a notch, pill or home-indicator bar (iPhone trade dress).
- The emoji fonts' brass compass, gold padlock, green banknote, robot face,
  ribbon medal and grey bin.
- Safari's app icon, which is also a compass. `compass.svg` differs on
  purpose: a vertical north–south needle (not diagonal), green and cyan (not
  red and white), and four 45° ticks (not a full graduated dial).

## How the page uses them (accessibility)

- **Diorama chips:** the `role="img"` and `aria-label` stay on the chip
  `<div>`. The glyph inside is `<img class="glyph" alt="">`.
- **Feature cards:** the icon is decorative, because the card's `<h3>` already
  says what it is. The page uses `<span class="ico" aria-hidden="true"><img alt=""></span>`.
- **Bullet:** a CSS `::before` background image, so assistive technology
  never announces it.
- **Sizes on the page:** 32 px in the 48 px card tile, 42 px in the 74 px
  diorama chip (32 px in the 58 px chip under 640 px), 18 px for the bullet.

## Reproducing the review renders

Two points about rendering these files for review:

- **Quick Look (`qlmanage -t`)** draws each SVG at its native 48 px in the
  corner of a white 256 px canvas, so it is not a useful review render.
- **Headless Chrome** gives a useful render. Load a page that places the
  `<img>` at 256 px on `#05070d` and run:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --hide-scrollbars --allow-file-access-from-files --window-size=288,288 \
  --screenshot=out.png file:///path/to/page.html
```

Check crispness at 1× device scale factor, at 16 / 24 / 32 px. That is where
a stroke that is too thin shows up.
