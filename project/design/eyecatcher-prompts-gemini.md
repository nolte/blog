# Eyecatcher Prompts — Gemini (`gemini-2.5-flash-image`)

> **Status:** draft / phase 1 companion to `corporate-design.md`
> **Target generator:** `gemini-2.5-flash-image` ("Nano Banana") via the
> `image-generate` tool's `gemini` provider — every prompt below is written
> for **this** model and is **not** portable to FLUX.
> **Governed by:** `spec/design/gemini-image-generation/`,
> `spec/design/graphic-prompt-authoring/`, and
> `spec/design/corporate-design-colors/` §AI image color contract (all in
> `nolte/claude-shared`).
> **Produces:** the brand eyecatchers from `corporate-design.md` §7/§8 — the
> logo emblem, the four mascot highlights, an optional About accent, and the
> default social card.

This document holds **copy-paste-ready Gemini prompts** for every generated
eyecatcher. Functional UI icons (RSS, tags, arrows, …) are **not** generated —
they come from Lucide / Simple Icons (see §11). Gemini's job here is the
brand imagery: the sloth mascot and the logo mark.

---

## 1. Why Gemini prompts look different

Gemini is natively multimodal and rewards **narrative description plus a stated
intent**, not the comma-tag stacks the existing FLUX prompts use. The rules
baked into every prompt below (per `gemini-image-generation`):

- **Describe the scene in full sentences**, subject first, then action →
  context → composition → style. Open with a strong verb (`Create`,
  `Illustrate`, `Design`).
- **State the asset's purpose**, not just its contents — it measurably lifts
  quality on Gemini.
- **Be hyper-specific about material, lighting, and composition** (the single
  biggest quality lever).
- **No negative prompts.** Gemini exposes no `--no` / negative parameter and
  ignores `no X` phrasing. Every constraint is therefore written as the
  **desired positive state** (`a plain blank charcoal lid` instead of "no
  logo"; `fur a cool blue-violet indigo throughout` instead of "not brown").
- **Quote any literal text** — but per `graphic-prompt-authoring` we render
  **no text inside these assets**; the wordmark is a post-step overlay (§G).
- **State the aspect ratio explicitly** every time (Gemini inherits the input
  ratio on edits, so a fresh generation must declare it).

---

## 2. Hard invariants — read before generating

| Invariant | Consequence for the blog |
| --- | --- |
| **SynthID watermark is always embedded** on Gemini output. | Every asset below carries an invisible Google watermark. This is a *material* difference from the FLUX-on-Cloudflare path (watermark-free) that produced the existing v1 renders. Acceptable for blog/brand use, but **weigh it** — for a pure logo/favicon you may prefer the FLUX path. |
| **Billing required.** `gemini-2.5-flash-image` reports Free-Tier `limit: 0`. | The `gemini` provider needs a billed key; an unbilled key fails. (Verified provider property.) |
| **One generator per prompt.** | These prompts target `gemini-2.5-flash-image` only. Do not paste them into FLUX — rewrite via the FLUX baseline if you switch. |

---

## 3. How to use this document

1. **Pick the asset section** (A–G) and the mode (Light / Dark).
2. **Condition on the verified v1 render** where noted — Gemini's multi-image
   strength keeps the character on-model. Pass the listed reference image from
   `claude-shared/design/brand/reference/` or `…/design/assets/` as the input
   image, then send the prompt. This is the spec's per-model style-reference
   equivalent (a fixed canonical reference image), not a free-text style note.
3. **Record the seed** in the asset's seed slot for reproducibility.
4. **Run** (reference path is illustrative — confirm the tool's flag names):
   `image-generate --provider gemini --prompt-file <f> [--reference <v1.jpg>] --aspect <ratio> --out <name>.png`
5. **Post-process** per the asset checklist (background removal → transparency
   via `png-to-transparent-svg`, WebP encode, size checks).

---

## 4. Shared brand blocks (reference — already inlined in each prompt)

Each prompt below is self-contained, but these are the canonical fragments they
reuse so the batch stays one visual register. **Color note:** the *mascot fur*
uses the rendered v1 lock (`#5B5FC7` / slate `#4A4E6B`) so new Gemini renders
match the existing FLUX v1 set; *UI surfaces* use the canonical spec primary
`#4A529D` (see `corporate-design.md` §1). Do not confuse the two.

**Style register:** modern flat-design kawaii vector cartoon — clean
even-weight outlines, smooth matte fills with one soft cel-shading step, rounded
friendly geometric shapes, generous negative space, the subject centred and
isolated on a flat plain background.

**Character identity (positive, invariant):** a chibi cartoon three-toed sloth
with a large round head about half its body height, topped by a small jagged
tuft of two or three short fur spikes; its fur a cool saturated blue-violet
indigo — the tone of denim or a blueberry — covering the body evenly so the
chest, belly, back and sides are all the same solid indigo; a big heart-shaped
warm-bone-white face mask with a small V-notch at the top holding the eyes, nose
and mouth, the cream staying entirely inside this mask; two broad dark
charcoal-indigo diagonal stripes sweeping from the top centre of the mask
outward and down across each eye, the bridge between the eyes left pale; two
large round dark-brown eyes each with a single small white highlight; a small
rounded dark nose above a thin gently-curved closed smile; two small round
coral-orange blush patches; a compact rounded body with no visible neck, short
arms at the sides, and exactly three pale cream claws on each hand and foot;
a bold even-weight dark-indigo outline around the whole figure and a small
soft-grey oval shadow beneath.

**Dark-mode swap:** fur becomes a soft cobalt-violet (a light blue-violet), the
outline becomes warm-bone so the figure stays crisp, and the background becomes
flat deep warm charcoal.

**Color lock — Light:** muted-indigo fur `#5B5FC7` deepening to slate `#4A4E6B`
in shadow, warm-bone-white mask `#F4F1EA`, coral-orange cheeks `#E8825A`,
near-black-brown eyes `#3A2A22`, on a warm bone-white background `#F4F1EA`.

**Color lock — Dark:** soft cobalt-violet fur `#8E92E6`, warm-bone outline and
mask `#F4F1EA`, coral-orange cheeks `#E8825A`, on a deep warm charcoal
background `#20222A`.

**On-brand positive guidance (the avoidance clause, phrased positively):** keep
the fur a cool blue-violet indigo throughout; keep the cream confined to the
face mask so the body is one solid indigo colour; keep exactly three claws per
limb; keep the illustration purely visual with the surface free of lettering and
free of any company emblem; keep the background a single clean flat colour.

---

## A. Logo emblem — `logo-emblem`  *(type: logo)*

- **Intent:** the portfolio's primary brand mark — a compact heraldic sloth
  emblem for the site header, favicon, and app icon; must read instantly at
  32 px.
- **Aspect / size:** 1:1, master 1024×1024 → favicon 32/180/192/512.
- **Variants:** Light + Dark. **Reference render:** `mascot-front-v1.jpg`.
- **Post:** background → transparency via `png-to-transparent-svg`; squint test
  at 32 px; pair with the wordmark as a *separate* overlay, never rendered here.

**Light**

```
Design a minimalist, iconic brand logo — a compact heraldic emblem of a cute cartoon sloth hanging from a short horizontal branch, front-facing, simplified into a few bold rounded shapes that form a clean badge-like mark that stays legible at favicon size. The sloth has a cool saturated blue-violet indigo body — the tone of denim — with a heart-shaped warm-bone-white face mask, two dark diagonal stripes across the eyes, and eyes and claws picked out in warm amber; it hangs from a short branch carrying a single warm moss-green leaf. Centre the mark with generous even padding all around, perfectly balanced and symmetrical. Render it as a modern flat-design vector emblem: thick even-weight indigo outline, smooth matte fills with one soft cel-shading step, on a flat warm bone-white background. The mark is purely graphic, its surface clean and free of any lettering or other company emblem. Square 1:1 composition. Brand colours: muted indigo #5B5FC7, warm moss green #4F9D69, warm amber #E0A23C, warm bone white #F4F1EA.
```

**Dark**

```
Design a minimalist, iconic brand logo — a compact heraldic emblem of a cute cartoon sloth hanging from a short horizontal branch, front-facing, simplified into a few bold rounded shapes that form a clean badge-like mark that stays legible at favicon size. The sloth has a soft cobalt-violet body (a light blue-violet), a heart-shaped warm-bone-white face mask, two dark diagonal stripes across the eyes, and eyes and claws picked out in warm amber; it hangs from a short branch carrying a single soft fern-green leaf. Give the mark a thick even-weight warm-bone outline so it stays crisp on a dark surface. Centre it with generous even padding, balanced and symmetrical. Render it as a modern flat-design vector emblem with smooth matte fills and one soft cel-shading step, on a flat deep warm charcoal background. The mark is purely graphic, its surface clean and free of any lettering or other company emblem. Square 1:1 composition. Brand colours: soft cobalt-violet #8E92E6, soft fern green #6FBF8A, warm amber #E0A23C, deep warm charcoal #20222A.
```

- **Seed:** _________

---

## B. Homepage hero — `hero-sloth-coding`  *(type: hero / scene)*

- **Intent:** the landing-page eyecatcher — a friendly "this is where the work
  happens" scene beside the hero headline.
- **Aspect / size:** 4:3 landscape, ~1200×900 (+2×). **Variants:** Light + Dark.
  **Reference render:** `sloth-coding-9121.jpg` (or the cleanest `sloth-coding*`).
- **Note:** lead with the *action* so the desk/laptop survive; keep the laptop a
  plain dark-charcoal slab so it reads as a generic laptop (a silver lid makes
  Gemini paint a fruit logo). Screen is a soft plain glow.
- **Post:** optional background removal; WebP; cap height on mobile so the CTA
  stays above the fold.

**Light**

```
Illustrate a warm, inviting hero scene for a software blog's landing page: a cute chibi cartoon sloth sitting on the floor behind a small low warm wood-brown table, viewed from the front and centred, leaning forward to type on an open laptop that stands on the table with both small three-clawed hands resting on the keyboard. The laptop is a chunky matte dark-charcoal slab with a plain smooth blank lid and rounded corners — a generic dark laptop whose lid is a clean unmarked surface — and its screen shows a soft plain glow. A small warm-bone-white mug sits on the floor to the right; the sloth's two clawed feet peek out below the table. The sloth has a cool saturated blue-violet indigo body — the tone of denim, the chest and belly the same solid indigo — a heart-shaped warm-bone-white face mask with two dark diagonal stripes across the eyes, two large dark-brown eyes with small white highlights, a small dark nose, a gentle closed smile, two coral-orange blush cheeks, and a small jagged head tuft; a happy, focused expression. Render it as a modern flat-design kawaii vector cartoon with bold even-weight dark outlines, smooth matte fills and one soft cel-shading step, soft even lighting, on a flat warm bone-white background with a soft oval shadow under the whole scene. Wide 4:3 composition with the scene centred and generous negative space around it. Brand colours: muted indigo #5B5FC7 deepening to slate #4A4E6B, warm bone white #F4F1EA, coral orange #E8825A, dark charcoal laptop #20222A, warm wood-brown table.
```

**Dark**

```
Illustrate a warm, inviting hero scene for a software blog's landing page, styled for a dark interface: a cute chibi cartoon sloth sitting on the floor behind a small low warm wood-brown table, viewed from the front and centred, leaning forward to type on an open laptop with both small three-clawed hands on the keyboard. The laptop is a chunky matte near-black slab with a plain smooth blank lid and rounded corners — a generic dark laptop whose lid is a clean unmarked surface — its screen a soft plain glow. A small warm-bone-white mug sits on the floor to the right; the two clawed feet peek out below the table. The sloth has a soft cobalt-violet body (a light blue-violet, the chest and belly the same solid colour), a heart-shaped warm-bone-white face mask with two dark diagonal stripes across the eyes, two large dark eyes with white highlights, a small dark nose, a gentle closed smile, two coral-orange blush cheeks, and a small jagged head tuft; a happy, focused expression. Give the figure a warm-bone outline so it stays crisp. Render it as a modern flat-design kawaii vector cartoon with smooth matte fills and one soft cel-shading step, soft even lighting, on a flat deep warm charcoal background with a soft shadow beneath. Wide 4:3 composition, centred, with generous negative space. Brand colours: soft cobalt-violet #8E92E6, warm bone white #F4F1EA, coral orange #E8825A, near-black laptop, deep warm charcoal background #20222A.
```

- **Seed:** _________

---

## C. Default mascot — `mascot-content`  *(type: illustration)*

- **Intent:** the calm default character for the post-hero fallback banner (when
  a post has no `heroImage`) and any neutral branded surface.
- **Aspect / size:** 1:1, ~600×600. **Variants:** Light + Dark.
  **Reference render:** `mascot-front-v1.jpg`.
- **Post:** background → transparency; WebP; keep visually quieter than a real
  hero so authored heroes always win.

**Light**

```
Illustrate the friendly brand mascot at rest for use as a calm default banner character: a chibi cartoon three-toed sloth sitting upright, facing the viewer, symmetrical, with a large round head about half its body height and a small jagged head tuft. Its fur is a cool saturated blue-violet indigo — the tone of denim — covering the body evenly so the chest, belly, back and sides are one solid indigo. A big heart-shaped warm-bone-white face mask with a small V-notch holds two large round dark-brown eyes with small white highlights; two broad dark diagonal stripes cross over the eyes like a mask, the bridge between them pale; a small dark nose sits above a thin gently-curved closed smile, with two small round coral-orange blush cheeks — a calm, content expression. Short arms rest at the sides and there are exactly three pale cream claws on each hand and foot. Render it as a modern flat-design kawaii vector cartoon with a bold even-weight dark-indigo outline, smooth matte fills and one soft cel-shading step, generous negative space, on a flat warm bone-white background with a soft oval shadow beneath. Square 1:1 composition. Brand colours: muted indigo #5B5FC7 deepening to slate #4A4E6B, warm bone white #F4F1EA, coral orange #E8825A, near-black-brown eyes #3A2A22.
```

**Dark**

```
Illustrate the friendly brand mascot at rest for a dark interface: a chibi cartoon three-toed sloth sitting upright, facing the viewer, symmetrical, with a large round head and a small jagged head tuft. Its fur is a soft cobalt-violet (a light blue-violet) covering the body evenly so the chest, belly, back and sides are one solid colour. A big heart-shaped warm-bone-white face mask with a small V-notch holds two large round dark eyes with white highlights; two broad dark diagonal stripes cross over the eyes, the bridge between them pale; a small dark nose above a thin gently-curved closed smile, with two coral-orange blush cheeks — a calm, content expression. Short arms at the sides, exactly three pale cream claws on each hand and foot. Give the figure a warm-bone outline so it stays crisp. Render it as a modern flat-design kawaii vector cartoon with smooth matte fills and one soft cel-shading step, generous negative space, on a flat deep warm charcoal background with a soft shadow beneath. Square 1:1 composition. Brand colours: soft cobalt-violet #8E92E6, warm bone white #F4F1EA, coral orange #E8825A, deep warm charcoal #20222A.
```

- **Seed:** _________

---

## D. 404 mascot — `mascot-404`  *(type: illustration)*

- **Intent:** a friendly "looking for something that isn't here" face on the
  404 page. Expression: **curious** (alt: sad/embarrassed).
- **Aspect / size:** 1:1, ~600×600. **Variants:** Light + Dark.
  **Reference render:** `mascot-expr-curious-v1.jpg`.
- **Post:** background → transparency; WebP.

**Light**

```
Illustrate the brand mascot looking gently puzzled, as if searching for a page that isn't there, for a 404 error screen: a chibi cartoon three-toed sloth sitting upright and facing the viewer, head tilted slightly to one side, one short three-clawed arm raised with a claw near its chin in a thoughtful pose, one eye slightly narrowed and the other round, a small thoughtful closed mouth — a curious, wondering expression. Its fur is a cool saturated blue-violet indigo — the tone of denim — covering the body evenly so chest, belly, back and sides are one solid indigo; a big heart-shaped warm-bone-white face mask with two broad dark diagonal stripes across the eyes; a small dark nose, two coral-orange blush cheeks, a small jagged head tuft, and exactly three pale cream claws per limb. Render it as a modern flat-design kawaii vector cartoon with a bold even-weight dark-indigo outline, smooth matte fills and one soft cel-shading step, generous negative space, on a flat warm bone-white background with a soft oval shadow beneath. Square 1:1 composition. Brand colours: muted indigo #5B5FC7 deepening to slate #4A4E6B, warm bone white #F4F1EA, coral orange #E8825A, near-black-brown eyes #3A2A22.
```

**Dark**

```
Illustrate the brand mascot looking gently puzzled for a 404 error screen on a dark interface: a chibi cartoon three-toed sloth sitting upright facing the viewer, head tilted slightly to one side, one short three-clawed arm raised with a claw near its chin, one eye slightly narrowed and the other round, a small thoughtful closed mouth — a curious, wondering expression. Its fur is a soft cobalt-violet (a light blue-violet) covering the body evenly so chest, belly, back and sides are one solid colour; a big heart-shaped warm-bone-white face mask with two broad dark diagonal stripes across the eyes; a small dark nose, two coral-orange blush cheeks, a small jagged head tuft, exactly three pale cream claws per limb. Give the figure a warm-bone outline. Render it as a modern flat-design kawaii vector cartoon with smooth matte fills and one soft cel-shading step, generous negative space, on a flat deep warm charcoal background with a soft shadow beneath. Square 1:1 composition. Brand colours: soft cobalt-violet #8E92E6, warm bone white #F4F1EA, coral orange #E8825A, deep warm charcoal #20222A.
```

- **Seed:** _________

---

## E. Empty-state mascot — `mascot-sleeping`  *(type: empty-state)*

- **Intent:** "nothing here yet" on empty lists (e.g. the projects page before
  any project exists). Expression: **sleeping**.
- **Aspect / size:** 1:1, ~600×600. **Variants:** Light + Dark.
  **Reference render:** `mascot-expr-sleeping-v1.jpg`.
- **Post:** background → transparency; WebP.

**Light**

```
Illustrate the brand mascot peacefully asleep for a friendly empty-state placeholder: a chibi cartoon three-toed sloth curled up and sitting, facing the viewer, its head tilted gently to one side, both eyes fully closed as two soft downward-curved lines, a small peaceful content smile, soft coral-orange blush — a calm sleeping expression. Its fur is a cool saturated blue-violet indigo — the tone of denim — covering the body evenly so chest, belly, back and sides are one solid indigo; a big heart-shaped warm-bone-white face mask with two broad dark diagonal stripes where the eyes are, a small dark nose, a small jagged head tuft, short arms at the sides, and exactly three pale cream claws per limb. Render it as a modern flat-design kawaii vector cartoon with a bold even-weight dark-indigo outline, smooth matte fills and one soft cel-shading step, generous negative space, on a flat warm bone-white background with a soft oval shadow beneath. Square 1:1 composition. Brand colours: muted indigo #5B5FC7 deepening to slate #4A4E6B, warm bone white #F4F1EA, coral orange #E8825A.
```

**Dark**

```
Illustrate the brand mascot peacefully asleep for an empty-state placeholder on a dark interface: a chibi cartoon three-toed sloth curled up and sitting, facing the viewer, head tilted gently to one side, both eyes closed as two soft downward-curved lines, a small peaceful smile, soft coral-orange blush — a calm sleeping expression. Its fur is a soft cobalt-violet (a light blue-violet) covering the body evenly so chest, belly, back and sides are one solid colour; a big heart-shaped warm-bone-white face mask with two broad dark diagonal stripes where the eyes are, a small dark nose, a small jagged head tuft, short arms at the sides, exactly three pale cream claws per limb. Give the figure a warm-bone outline. Render it as a modern flat-design kawaii vector cartoon with smooth matte fills and one soft cel-shading step, generous negative space, on a flat deep warm charcoal background with a soft shadow beneath. Square 1:1 composition. Brand colours: soft cobalt-violet #8E92E6, warm bone white #F4F1EA, coral orange #E8825A, deep warm charcoal #20222A.
```

- **Seed:** _________

---

## F. About accent — `mascot-about`  *(type: illustration, optional)*

- **Intent:** a small proud/pleased mascot beside the About intro. Expression:
  **proud** (alt: happy).
- **Aspect / size:** 1:1, ~480×480. **Variants:** Light + Dark.
  **Reference render:** `mascot-expr-proud-v1.jpg` (or `…-happy-v1.jpg`).
- **Post:** background → transparency; WebP.

**Light**

```
Illustrate the brand mascot looking quietly proud, for a small accent beside an About-page introduction: a chibi cartoon three-toed sloth sitting upright facing the viewer, head tilted slightly up, both eyes closed as upward happy curves, a wide satisfied grin, warm coral-orange blush — a proud, content expression. Its fur is a cool saturated blue-violet indigo — the tone of denim — covering the body evenly so chest, belly, back and sides are one solid indigo; a big heart-shaped warm-bone-white face mask with two broad dark diagonal stripes across the eyes, a small dark nose, a small jagged head tuft, short arms at the sides, and exactly three pale cream claws per limb. Render it as a modern flat-design kawaii vector cartoon with a bold even-weight dark-indigo outline, smooth matte fills and one soft cel-shading step, generous negative space, on a flat warm bone-white background with a soft oval shadow beneath. Square 1:1 composition. Brand colours: muted indigo #5B5FC7 deepening to slate #4A4E6B, warm bone white #F4F1EA, coral orange #E8825A.
```

**Dark**

```
Illustrate the brand mascot looking quietly proud, for a small About-page accent on a dark interface: a chibi cartoon three-toed sloth sitting upright facing the viewer, head tilted slightly up, both eyes closed as upward happy curves, a wide satisfied grin, warm coral-orange blush — a proud, content expression. Its fur is a soft cobalt-violet (a light blue-violet) covering the body evenly so chest, belly, back and sides are one solid colour; a big heart-shaped warm-bone-white face mask with two broad dark diagonal stripes across the eyes, a small dark nose, a small jagged head tuft, short arms at the sides, exactly three pale cream claws per limb. Give the figure a warm-bone outline. Render it as a modern flat-design kawaii vector cartoon with smooth matte fills and one soft cel-shading step, generous negative space, on a flat deep warm charcoal background with a soft shadow beneath. Square 1:1 composition. Brand colours: soft cobalt-violet #8E92E6, warm bone white #F4F1EA, coral orange #E8825A, deep warm charcoal #20222A.
```

- **Seed:** _________

---

## G. Default social card — `og-default`  *(type: social-card)*

- **Intent:** the fallback Open Graph / share image for posts without their own
  card — a branded band with the mascot, leaving clean negative space where the
  wordmark and title are overlaid **in post-processing**.
- **Aspect / size:** 1.91:1, 1200×630. **Variants:** single (works on both).
  **Reference render:** `mascot-front-v1.jpg`.
- **Important:** Gemini *can* render text, but per `graphic-prompt-authoring`
  the wordmark/title are **not** generated here — they are layered on later in
  the brand font, so the share card stays reproducible and on-typeface. Generate
  only the illustrated band; keep its left two-thirds clean for the overlay.

```
Design a clean, modern social share card background for a software blog: a wide banner with the friendly brand mascot placed on the right third and the left two-thirds left as calm, open negative space for a title to be added later. The mascot is a chibi cartoon three-toed sloth sitting upright, facing the viewer, with a cool saturated blue-violet indigo body — the tone of denim, chest and belly the same solid indigo — a heart-shaped warm-bone-white face mask with two dark diagonal stripes across the eyes, two large dark-brown eyes with small white highlights, a small dark nose, a gentle closed smile, two coral-orange blush cheeks, a small jagged head tuft, and exactly three pale cream claws per limb; a calm, welcoming expression. Set it against a soft warm bone-white background with a gentle band of muted indigo and a small warm moss-green leaf motif as quiet decoration in the lower corner, honouring a roughly sixty-thirty-ten balance of neutral, indigo, and accent. Render it as a modern flat-design kawaii vector cartoon with bold even-weight outlines, smooth matte fills and one soft cel-shading step, and keep the whole surface free of lettering. Wide 1.91:1 landscape composition, 1200×630. Brand colours: muted indigo #5B5FC7, warm moss green #4F9D69, warm amber #E0A23C, warm bone white #F4F1EA.
```

- **Seed:** _________
- **Post:** overlay the "Nolte's Blog" wordmark + post title in JetBrains Mono
  on the left negative space; export 1200×630 PNG to `public/og/default.png`.

---

## 5. Not generated with Gemini

The functional UI icons in `corporate-design.md` §5 (`rss`, `languages`,
`external-link`, `tag`, `calendar`, `arrow-right`, `sparkles`, `sun`, `moon`,
`github`) are **library icons** (Lucide ISC / Simple Icons), embedded as inline
SVG and tinted via `currentColor`. Generating pixel icons for a UI set is the
wrong tool — they must be crisp vectors at any size and visually uniform. Keep
Gemini for the brand illustrations above only.

---

## 6. Batch consistency & post-processing

- **One character across the set.** Condition each prompt on its listed
  `…-v1.jpg` reference so the body, mask, stripes, tuft, and three claws stay
  identical; only the expression/pose changes. If a render drifts (warm/brown
  fur, a second cream patch on the body, a fourth claw, a mark on the laptop),
  re-roll the seed or add one positive correction in a follow-up edit turn
  ("keep everything identical, but make the fur a cooler blue-violet").
- **Dark variants are re-pulled, not inverted** — always generate the Dark
  prompt; never CSS-invert a light render.
- **Transparency:** every mascot/logo asset → `png-to-transparent-svg` to strip
  the flat background before it sits on a colored surface.
- **Encode & size:** WebP (+1 PNG fallback) via Astro `astro:assets` / `sharp`;
  favicon set from the vectorized `logo-emblem`.
- **Record the seed** in each slot above so a later "same image, wider" is
  reproducible.

## 7. Provenance — verified v1 reference renders (claude-shared)

| Asset | Condition on (reference image) |
| --- | --- |
| `logo-emblem`, `mascot-content`, `og-default` | `design/brand/reference/mascot-front-v1.jpg` |
| `hero-sloth-coding` | `design/assets/sloth-coding-9121.jpg` |
| `mascot-404` | `design/brand/reference/mascot-expr-curious-v1.jpg` |
| `mascot-sleeping` | `design/brand/reference/mascot-expr-sleeping-v1.jpg` |
| `mascot-about` | `design/brand/reference/mascot-expr-proud-v1.jpg` |

These v1 renders were produced with FLUX.1-schnell (watermark-free). Re-rolling
them on Gemini buys higher fidelity and reliable composition at the cost of an
embedded SynthID watermark (§2) — decide per asset.
