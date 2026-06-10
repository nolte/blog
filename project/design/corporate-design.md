# Blog Corporate Design — Description

> **Status:** draft / phase 1 of 2
> **Scope:** This document is the *design description*. It defines the visual
> identity, the per-surface application, the mascot strategy, and the complete
> image/icon manifest for individualizing this Astro blog with the nolte
> corporate design. **It does not contain the implementation.** Phase 2 turns
> this description into a Tailwind v4 `@theme` block, CSS custom properties, an
> icon set, and the processed assets.
> **Direction (decided):** *balanced* — reading-first stays the core, but the
> brand is clearly present (muted-indigo primary, moss/amber accents) and the
> sloth mascot recurs as a deliberate eyecatcher at four surfaces.

---

## 1. Sources of truth

This description is derived from, and must stay consistent with, the published
corporate-design artifacts in `nolte/claude-shared` (clone path
`~/repos/github/claude-shared`):

| Artifact | Path (in claude-shared) | What it governs |
| --- | --- | --- |
| Color-system spec | `spec/design/corporate-design-colors/en.md` | Canonical OKLCH brand hues, ramp & token architecture, WCAG gates, light/dark rules |
| Brand vocabulary | `design/brand/brand-vocabulary.md` | Approved descriptive color phrases + OKLCH/hex |
| Mascot character | `design/prompts/illustration_sloth-mascot.md` | The invariant sloth identity |
| Mascot expressions | `design/prompts/illustration_sloth-mascot-expressions.md` | 12 expressions → UI/content states |
| Mascot scenes | `design/prompts/illustration_sloth-coding.md` | "Sloth coding" hero scene |
| Logo emblem | `design/prompts/logo_sloth-emblem.md` | Heraldic favicon/logo mark |
| Rendered assets | `design/assets/*.png|jpg`, `design/brand/reference/*.jpg` | Existing FLUX renders to reuse |

### Two caveats that shape every value below

1. **The canonical `brand-primary` value vs. the bootstrap anchor.** The spec
   fixes the brand-owner decision (2026-06-06) as **`oklch(0.47 0.12 276)` /
   `#4A529D`** (a deep muted indigo). The older `brand-vocabulary.md` table
   still lists a lighter *v0 bootstrap anchor* `oklch(0.55 0.13 275)` /
   `#5B5FC7`. **This blog treats the spec value (`#4A529D`) as canonical for
   UI surfaces.** The lighter `#5B5FC7` only explains why the *rendered mascot
   fur* reads as it does (FLUX rendered it bluer still, ≈ `#4A4E6B`); it is not
   the UI primary. Where this document later needs a brighter indigo for links
   or focus rings, it derives a ramp step from the canonical anchor rather than
   re-using the bootstrap hex.

2. **The DTCG token bundle is not published yet.** The spec mandates a pinned,
   versioned 12-step DTCG token bundle that consumers reference instead of
   copy-pasting the palette — but that bundle does not exist yet. Therefore the
   semantic token values in §3 are **interim, derived in-repo from the canonical
   OKLCH anchors**, and are explicitly marked so. When the DTCG bundle ships,
   the blog's `@theme` block must be re-pointed at the pinned export and these
   interim values retired (see §13). This is a conscious, documented exception,
   not a silent palette fork.

---

## 2. Design principles

1. **Reading-first.** Long-form posts are the product. Brand color and the
   mascot frame the content; they never compete with the prose column.
2. **One recognizable brand.** A reader who sees a release-notes page, a hero
   image, and a Mermaid diagram should feel one product family before any text
   registers (spec §Context). Indigo is the load-bearing signature.
3. **The mascot is warmth, not noise.** The sloth appears where a human would
   welcome a friendly face — the front door (hero), the lost-and-found (404),
   the empty room (empty states), and as a graceful fallback — never inside the
   reading flow of an article.
4. **Accessible by default.** WCAG 2.2 AA contrast is the floor for every
   functional pair (spec §Contrast gates). The mascot and wordmark use the
   logotype carve-out and are exempt; functional UI is not.
5. **Static and fast.** No client framework, no tracking, no runtime JS beyond
   what a post genuinely needs (blog CLAUDE.md). Imagery is optimized and
   lazy-loaded; the mascot must never block first paint.

---

## 3. Color system

The blog binds to a **semantic token layer** (role-named), never to raw hues in
component code — matching the spec's token architecture. Below is the semantic
set the blog needs, with interim light/dark values derived from the canonical
anchors. OKLCH is canonical; hex is the derived reinforcement.

### 3.1 Brand anchors (from the corporate spec, verbatim)

| Slot | Phrase | OKLCH (canonical) | Hex |
| --- | --- | --- | --- |
| `brand-primary` (light) | muted indigo | `oklch(0.47 0.12 276)` | `#4A529D` |
| `brand-primary` (dark) | soft cobalt-violet | `oklch(0.72 0.10 275)` | `#8E92E6` |
| `brand-secondary` (light) | warm moss green | `oklch(0.62 0.11 150)` | `#4F9D69` |
| `brand-secondary` (dark) | soft fern green | `oklch(0.72 0.10 150)` | `#6FBF8A` |
| `brand-accent` | warm amber / honey gold | `oklch(0.78 0.13 75)` | `#E0A23C` |
| `brand-complement` | soft yellow-green | `oklch(0.80 0.10 110)` | `#B7C24F` |
| neutral surface (light) | warm bone white | `oklch(0.95 0.008 90)` | `#F4F1EA` |
| neutral surface (dark) | deep warm charcoal | `oklch(0.25 0.008 275)` | `#20222A` |

Rules carried over from the spec: dark-mode primary is **re-pulled, never
RGB-inverted**; the neutral family is **warm throughout** (chroma ≤ 0.01); the
dark root surface is **never `#000000`**; `brand-accent` is **functional
emphasis only** — never body text, large fills, or running surface; the true
180° `brand-complement` is **chart/illustration accents only**.

### 3.2 Semantic tokens (interim — derive, then verify)

Values are provisional, chosen to pass WCAG 2.2 AA, and **must be contrast-
measured during phase-2 implementation** (raw, un-rounded — spec forbids
rounding 4.49 up to 4.5). Replace wholesale when the DTCG bundle lands.

| Semantic token | Role | Light | Dark |
| --- | --- | --- | --- |
| `surface.page` | Page background | `#F4F1EA` | `#20222A` |
| `surface.subtle` | Subtle zone / inset | `#EDE9DE` | `#262833` |
| `surface.elevated` | Card / popover | `#FCFBF7` | `#2B2E39` |
| `surface.header` | Sticky header (translucent) | `#F4F1EA` @ 80% + blur | `#20222A` @ 80% + blur |
| `text.primary` | Body & headings | `#23242B` | `#F1EEE5` |
| `text.secondary` | Meta, descriptions | `#5B5A52` | `#AEACA2` |
| `text.muted` | Dates, captions | `#7A786E` | `#85837A` |
| `border.default` | Dividers, hairlines | `#DED9CC` | `#383B45` |
| `border.strong` | Card outline, inputs | `#CDC7B6` | `#454956` |
| `primary.solid` | Brand fill, primary button | `#4A529D` | `#8E92E6` |
| `primary.solid-hover` | Hover/pressed | `#3E4585` | `#A2A6EE` |
| `primary.text` | Link & accent text on surface | `#41488C` | `#A6AAEF` |
| `primary.on-solid` | Text/icon on `primary.solid` | `#F4F1EA` | `#1B1D24` |
| `secondary.solid` | Moss fill (tags, success) | `#4F9D69` | `#6FBF8A` |
| `secondary.text` | Moss text on surface | `#3F7E54` | `#7FCF9A` |
| `accent.solid` | Amber emphasis (AI badge, highlight) | `#E0A23C` | `#E0A23C` |
| `accent.on-solid` | Text on amber | `#3A2D12` | `#3A2D12` |
| `focus.ring` | Keyboard focus outline | `#5B5FC7` | `#8E92E6` |
| `code.bg` | Inline & block code background | `#EDE9DE` | `#262833` |
| `selection.bg` | Text selection | `#4A529D` @ 18% | `#8E92E6` @ 24% |

> **Contrast notes to verify in phase 2** (the load-bearing pairs):
> `text.primary`/`surface.page`, `text.secondary`/`surface.page`,
> `primary.text`/`surface.page` (≥ 4.5:1 normal text),
> `primary.on-solid`/`primary.solid`, `focus.ring`/`surface.page` (≥ 3:1
> non-text), `accent.on-solid`/`accent.solid`. The amber accent is light:
> **never use it as text on a light surface** — only as a fill with dark text,
> or as a thin highlight rule.

### 3.3 Composition heuristic

Apply the spec's **60 / 30 / 10** as a starting point for hero and marketing
surfaces: ~60 % warm-neutral surface, ~30 % indigo (primary/secondary
structure), ~10 % amber accent. Deviate only with a noted reason.

---

## 4. Typography

The corporate-design spec covers **color only**; typography is an explicit
non-goal awaiting a sibling spec. So the blog **keeps its current, well-chosen
type pairing** and only formalizes the scale and brand-tints the prose.

- **Sans (UI + body):** `Inter` → system-sans fallback (unchanged).
- **Mono (code, wordmark, tags, metadata):** `JetBrains Mono` → system-mono
  fallback (unchanged). The mono face is part of the blog's tech-forward
  character — keep using it for the site title, tags, dates, and the 404 code.
- **Type scale (rem):** `xs .75 · sm .875 · base 1 · lg 1.125 · xl 1.25 ·
  2xl 1.5 · 3xl 1.875 · 4xl 2.25 · 5xl 3`. Body line-height `1.7`; headings
  `1.2`, `tracking-tight`.
- **Headings** stay sentence case (blog CLAUDE.md). H1 hero uses `4xl`–`5xl`
  bold. Prose H2/H3 get a subtle indigo underline accent or indigo color
  (see §6.4).
- **Prose (`@tailwindcss/typography`):** retune the `prose` theme so links use
  `primary.text`, inline code uses `code.bg` + `text.primary`, blockquote
  borders use `primary.solid`, and `hr` uses `border.default`. Dark mode keeps
  `dark:prose-invert` with the dark token values.

> *Open follow-up:* if a future imagery/typography sibling spec introduces a
> brand display face, the hero H1 and wordmark are the first adoption points.

---

## 5. Iconography

The blog currently ships **no icon set** (RSS and the language toggle are bare
text). The redesign introduces a small, consistent set.

- **Source set:** [Lucide](https://lucide.dev) (ISC license, clean even-weight
  outlines that match the mascot's "bold even-weight outline" style). Embed as
  **inline SVG** (e.g. via `astro-icon`) so icons inherit `currentColor` and
  carry no runtime JS.
- **Tint rule:** icons use `currentColor`; brand tint comes from the text token
  of the surrounding context (`text.secondary` default, `primary.text` on
  hover/active). Icon-on-background must meet 3:1 (spec §1.4.11).
- **Needed icons (functional):**

  | Icon | Used in | Lucide name |
  | --- | --- | --- |
  | RSS | Header, footer, post-list | `rss` |
  | Language / globe | Header EN⇄DE toggle | `languages` or `globe` |
  | External link | Projects (repo/homepage), outbound links | `external-link` |
  | Repository | Projects cards | `github` (brand) / `git-fork` |
  | Tag | Post tags, tag chips | `tag` |
  | Calendar | Post date metadata | `calendar` |
  | Arrow | "Read more", post-card affordance | `arrow-right` |
  | Sparkle / bot | AI-generated badge (pairs with amber) | `sparkles` |
  | Sun / Moon | *Optional* manual theme toggle (see §11) | `sun` / `moon` |

- **Brand/social glyphs** (GitHub etc.) come from
  [Simple Icons](https://simpleicons.org) where Lucide lacks them, monochrome,
  tinted via `currentColor`.

---

## 6. Per-surface design

Each surface lists: layout intent, brand application, and mascot/imagery role.
The prose column stays `max-w-3xl` centered; full-bleed brand zones may exceed
it.

### 6.1 Header (`src/components/Header.astro`)

- **Layout:** sticky, translucent `surface.header` with backdrop blur and a
  `border.default` bottom hairline (keep the current pattern).
- **Brand:** left cluster = **logo emblem (mascot eyecatcher #2)** + wordmark
  "Nolte's Blog" in JetBrains Mono. The emblem is the heraldic sloth mark
  (§7, asset `logo-emblem`), ~28 px, light/dark variant swapped via
  `prefers-color-scheme`.
- **Nav:** Home / Blog / Projects / About. Active route gets `primary.text` +
  an indigo underline; hover underlines in `primary.text`.
- **Language toggle:** the `languages` icon + "EN/DE", bordered chip
  (`border.strong`), `primary.text` on hover.

### 6.2 Homepage (`src/pages/index.astro`, `de/index.astro`)

- **Hero (mascot eyecatcher #1):** a two-column hero — left: H1 (`4xl`–`5xl`),
  the site tagline (`text.secondary`), and a primary CTA into the blog
  (`primary.solid` button, `primary.on-solid` label); right: the **"sloth
  coding" scene** (§7, asset `hero-sloth-coding`) at a generous size, with a
  soft `brand-secondary`/`brand-accent` radial or blob backdrop honoring 60/30/10.
  On mobile the mascot stacks above the text, capped in height so it never
  pushes the CTA below the fold.
- **Latest posts:** the existing 5-post list, restyled as post cards (§6.6).
- The hero illustration is **decorative** → `alt=""` (or a short decorative
  alt) and `loading="eager"` only if above the fold and lightweight; otherwise
  `loading="lazy"`.

### 6.3 Blog list (`blog/index.astro`)

- A clean vertical stack of post cards (§6.6), newest-first. Section heading in
  sentence case. Optional tag-filter chips along the top use `secondary.solid`
  pills.

### 6.4 Post page (`PostLayout.astro`, `blog/[...slug].astro`)

- **Post header (not-prose):** title (`3xl`–`4xl`), description
  (`text.secondary`), date/updated (`text.muted` + `calendar` icon), the **AI
  badge** (amber `accent.solid` pill + `sparkles` icon — this is the one
  sanctioned amber surface), and tags (mono chips on `surface.subtle`).
- **Hero image:** if `heroImage` is set, render it full-column above the prose.
  **If absent → mascot eyecatcher #4 (post-hero fallback):** render a branded
  banner — an indigo→bone gradient band with the **default "content" mascot**
  (§7, asset `mascot-content`) at the right edge. The fallback is decorative
  (`alt=""`) and must be visually quieter than a real hero so authored heroes
  always win.
- **Prose body:** `prose prose-zinc dark:prose-invert` retuned to brand tokens
  (links `primary.text`, code `code.bg`, blockquote border `primary.solid`,
  H2/H3 optionally prefixed with a small indigo marker). The reading column
  carries **no mascot** — principle 3.
- **Mermaid diagrams:** brand-themed (see §9).

### 6.5 Projects (`projects/index.astro`)

- Project cards (`surface.elevated`, `border.strong`) with name, description,
  and `repo`/`homepage` links using the `github` / `external-link` icons in
  `primary.text`. Tags as moss pills.
- **Empty state (mascot eyecatcher #3):** when no projects exist (current
  state), show the **"sleeping" mascot** (§7, asset `mascot-sleeping`) + a
  one-line "Nothing parked here yet" message, centered.

### 6.6 Post card (shared component — *new*)

Extract a reusable `PostCard.astro`:

- `surface.elevated` background, `border.default`, subtle hover lift (shadow +
  `primary.solid` left-border accent on hover).
- Title (`lg`/`xl`, `text.primary` → `primary.text` on hover), description
  (`sm`, `text.secondary`), date (`xs`, `text.muted` + calendar icon), tag
  chips, and an `arrow-right` affordance.
- Optional thumbnail slot (post `heroImage` if present).

### 6.7 About (`about.astro`)

- Standard prose article. A single mascot accent is welcome here (e.g. the
  **"proud" or "happy"** expression beside the intro paragraph) since About is
  not an article-reading flow — keep it small and to one side.

### 6.8 404 (`404.astro`) — mascot eyecatcher #3

- Centered: the **"curious" (or "sad") mascot** (§7, asset `mascot-404`), a
  large mono "404", a short message, and a `primary.solid` button back home.
  Keep the existing centered-mono aesthetic, now with a friendly face.

### 6.9 Footer (`src/components/Footer.astro`)

- `border.default` top rule, `text.muted` attribution ("Built with Astro and
  curated with Claude"), RSS link with the `rss` icon, and a small static logo
  emblem. No mascot scene here (keep it quiet).

---

## 7. Mascot strategy (the eyecatcher)

The sloth is the brand's heraldic animal and the redesign's signature
eyecatcher. It appears at **four surfaces** (decided), each with a fixed
expression mapped from the expression sheet's UI-state table.

| # | Surface | Asset id | Expression | State rationale |
| --- | --- | --- | --- | --- |
| 1 | Homepage hero | `hero-sloth-coding` | coding scene (content/happy) | "Welcome — this is where the work happens" |
| 2 | Header logo + favicon | `logo-emblem` | heraldic emblem | Persistent brand mark |
| 3a | 404 page | `mascot-404` | **curious** (alt: sad) | "Looking for something that isn't here" |
| 3b | Empty states (projects) | `mascot-sleeping` | **sleeping** | "Nothing here yet — napping" |
| 4 | Post-hero fallback | `mascot-content` | **content** (canonical) | Calm default banner |

**Invariants (from the mascot character spec — never break):** fur is deep
blue-indigo (never brown); cream is **only** on the heart-shaped face mask
(no belly patch); exactly three cream claws per limb; two diagonal dark
eye-stripes; small head tuft. Dark mode swaps fur to **soft cobalt-violet**
(`#8E92E6`) and the outline to warm-bone — **re-pulled, never inverted**, so a
dark-mode variant of each mascot asset is required, not a CSS filter.

**Placement rules:**
- The mascot **never** appears inside the prose reading column (principle 3).
- Each placement is **decorative** for accessibility: `alt=""` (or terse
  decorative alt), never load-blocking, `loading="lazy"` except the eager hero.
- Mascot and wordmark use the spec's **logotype carve-out** — exempt from the
  contrast gates; surrounding functional UI is not.
- **Motion:** at most a subtle idle (e.g. a slow blink or a 2-px float on the
  hero). Gate every animation behind `prefers-reduced-motion: reduce` →
  static.

---

## 8. Image & icon manifest

The deliverables phase 2 must produce or import. **Provenance:** image assets
trace to `~/repos/github/claude-shared/design/` (rendered with FLUX.1-schnell).
Copying these *generated images* into the blog is fine; copying the *color
palette* is not (that waits for the DTCG bundle — §1, §13). Target home in the
blog: `public/mascot/`, `public/brand/`, and `public/icons/` (or
`src/assets/` if pipeline-optimized).

### 8.1 Brand imagery (mascot + logo)

| Asset id | Source render (claude-shared) | Target (blog) | Format & sizes | Processing | Modes |
| --- | --- | --- | --- | --- | --- |
| `logo-emblem` | **none yet** — `design/prompts/logo_sloth-emblem.md` (prompt only, light+dark) | `public/brand/logo-emblem-{light,dark}.svg` | SVG + PNG 32/180/192/512 | **Generate** (FLUX) → `png-to-transparent-svg` → favicon set | light + dark |
| `favicon` | derived from `logo-emblem` | `public/favicon.svg`, `public/favicon-32.png`, `apple-touch-icon.png` (180), `icon-192/512.png` | SVG + PNG | replaces current "N" favicon | single (works both) |
| `hero-sloth-coding` | `design/assets/sloth-coding-9121.jpg` (pick best of `sloth-coding*`/`sloth-at-pc*`) | `public/mascot/hero-coding-{light,dark}.webp` (+png) | WebP, ~1200×900 + 2× | crop, `png-to-transparent-svg` for bg removal, WebP encode | light + **dark variant to generate** |
| `mascot-content` | `design/assets/mascot-light-1.png` (best of 1–4) | `public/mascot/content-{light,dark}.webp` | WebP, ~600×600 | bg→transparent, encode | light + dark to generate |
| `mascot-404` | `design/assets/expr-curious.jpg` (alt `expr-sad.jpg`) | `public/mascot/curious-{light,dark}.webp` | WebP, ~600×600 | bg→transparent, encode | light + dark to generate |
| `mascot-sleeping` | `design/assets/expr-sleeping.jpg` | `public/mascot/sleeping-{light,dark}.webp` | WebP, ~600×600 | bg→transparent, encode | light + dark to generate |
| `mascot-about` *(optional)* | `design/assets/expr-proud.jpg` or `expr-happy.jpg` | `public/mascot/about-{light,dark}.webp` | WebP, ~480×480 | bg→transparent, encode | light + dark to generate |
| `og-default` | new — mascot + wordmark on brand band | `public/og/default.png` | PNG 1200×630 | compose (brand band + `mascot-content` + wordmark) | single |

> **Dark-mode mascots:** the existing renders are light-mode (bone background,
> indigo fur). Each dark placement needs a **re-pulled** dark variant
> (cobalt-violet fur, warm-bone outline) — regenerate via the mascot prompts'
> dark swap, do **not** CSS-invert. Until dark variants exist, phase 2 may ship
> light mascots on a neutral plate as a documented interim.

### 8.2 Icons

| Group | Source | Target | Notes |
| --- | --- | --- | --- |
| UI icons | Lucide (ISC) | inline SVG via `astro-icon` | `rss, languages, external-link, tag, calendar, arrow-right, sparkles, sun, moon` |
| Brand glyphs | Simple Icons | inline SVG | `github` (+ any social) |

### 8.3 Asset-processing tooling

- **Background removal / vectorization:** the JPG/PNG renders carry a baked
  bone-white background. Use the `png-to-transparent-svg` agent
  (in claude-shared) to strip it before placing mascots on colored surfaces.
- **WebP encoding & sizing:** Astro's image pipeline (`astro:assets`) or
  `sharp` for responsive `srcset`.
- **Favicon set:** generate from the vectorized `logo-emblem`.

---

## 9. Mermaid theme mapping

Per spec §Per-artifact application, diagrams must inherit the brand as a
**light/dark pair** (never a single mode-agnostic theme), wired once globally
(no per-diagram `%%{init}%%`). Interim mapping (verify in phase 2):

| Mermaid var | Light | Dark |
| --- | --- | --- |
| `background` / `mainBkg` | `#F4F1EA` / `#FCFBF7` | `#20222A` / `#2B2E39` |
| `primaryColor` | `#4A529D` | `#8E92E6` |
| `primaryTextColor` | `#F4F1EA` | `#1B1D24` |
| `primaryBorderColor` | `#3E4585` | `#A2A6EE` |
| `lineColor` | `#5B5A52` | `#AEACA2` |
| `secondaryColor` | `#4F9D69` | `#6FBF8A` |
| `tertiaryColor` | `#E0A23C` | `#E0A23C` |

This replaces the current dark-mode `filter: invert(...)` hack in `global.css`
with a real themed pair.

---

## 10. Interaction & motion

- **Hover/focus:** links and cards transition color/shadow over ~150 ms.
  Keyboard focus always shows a visible `focus.ring` (≥ 3:1).
- **Cards:** subtle lift (shadow + indigo left-accent) on hover only.
- **Mascot idle:** optional slow blink/float on the hero, ≤ 2 px, ≥ 4 s cycle.
- **`prefers-reduced-motion: reduce`** disables all non-essential motion
  (mascot idle, card lift animation) → instant states. Required.

---

## 11. Dark mode

- Keep **automatic** `prefers-color-scheme` switching (current behavior); every
  semantic token resolves in both modes (spec: dark is not optional).
- **Recommended addition:** a manual **theme toggle** (sun/moon icon in the
  header) writing a `data-theme` attribute + `localStorage`, with the CSS
  authored as `:root` (light) / `[data-theme="dark"]` overrides so it works for
  both the media query and the manual override. *Decision deferred to phase 2
  — costs a few lines of inline JS, which the "static, no runtime JS" rule
  tolerates for this single control.*
- Dark surfaces use `deep warm charcoal`, never `#000000`. Mascots swap to
  their re-pulled dark variants.

---

## 12. Accessibility checklist (phase-2 gate)

- [ ] Every legal text-on-surface pair measured ≥ WCAG 2.2 AA (4.5:1 / 3:1),
      raw values recorded, no rounding up.
- [ ] Focus rings and icon-on-background ≥ 3:1 (SC 1.4.11).
- [ ] Mascot/logo decorative (`alt=""`) or carve-out exempt; functional icons
      have accessible names.
- [ ] `prefers-reduced-motion` honored everywhere.
- [ ] Language toggle is a real link/button with an accessible name, not an
      icon alone.
- [ ] Color is never the sole carrier of meaning (AI badge pairs amber with the
      `sparkles` icon + text; active nav pairs color with an underline).

---

## 13. Phase-2 implementation map

What the later CSS/theme work touches (no code here):

1. **`src/styles/global.css` — `@theme` block:** add the §3 semantic tokens as
   CSS custom properties under `:root` and the dark override; map Tailwind
   color utilities to them. Keep `--font-sans` / `--font-mono`.
2. **Components:** `Header.astro` (logo emblem, brand nav, lang toggle, optional
   theme toggle), `Footer.astro` (icons, logo), **new** `PostCard.astro`,
   **new** `Mascot.astro` (mode-aware `<picture>` wrapper with decorative alt).
3. **Layouts:** `BaseLayout.astro` (favicon set, OG default, Mermaid theme
   init, theme-toggle bootstrap), `PostLayout.astro` (brand prose, post-hero
   fallback, AI badge).
4. **Pages:** `index`/`de/index` (hero), `projects` (empty state), `404`
   (mascot), retuned prose.
5. **Assets:** produce §8 manifest into `public/`.
6. **Mermaid:** global themed light/dark config; remove the invert hack.

### Migration note — retire the interim palette

When the DTCG token bundle ships from claude-shared, **re-point the `@theme`
block at the pinned export** and delete the interim hex values in §3.2 / §9.
Track this as a follow-up so the blog doesn't permanently fork the palette
(spec forbids ad-hoc palette copies in consumers).

---

## 14. Open decisions for phase 2

1. **Manual theme toggle** — add now or stay auto-only? (§11; recommended: add.)
2. **Dark-mode mascot variants** — generate the re-pulled dark renders now, or
   ship light mascots on a neutral plate as interim? (§8.1.)
3. **`logo-emblem`** is prompt-only — needs one generation + vectorization pass
   before the header/favicon can adopt it.
4. **Hero scene pick** — confirm which `sloth-coding*` render becomes
   `hero-sloth-coding`.
5. **Asset home** — `public/` (simple) vs. `src/assets/` (Astro-optimized
   `srcset`). Recommended: `src/assets/` for mascots/hero, `public/` for
   favicon/OG.
