---
id: F-2
title: Language switcher in header with translation linkage
status: draft
roadmap_item: R-1
sprint: null
created: 2026-05-21
ended: null
verifies_sprint_value: null
consistency_check:
  performed_at: 2026-05-21
  agent_version: feature-consistency-reviewer@e0e40f8
  findings:
    - kind: prior-art
      target: src/components/Header.astro
      resolution: proceed
    - kind: drift
      target: project/features/language-switcher.md (acceptance-4)
      resolution: proceed
    - kind: prior-art
      target: src/pages/blog/[...slug].astro
      resolution: proceed
---

## Description

The site header carries a one-click language switcher that takes the
reader from the current page to its translated counterpart — not just
to the language root. On the welcome post in EN, the switcher leads
to the welcome post in DE; not to `/de/`. The switcher falls back
gracefully on pages that do not have a translation (it goes to the
locale root rather than producing a 404).

The current header (`src/components/Header.astro`) already implements
a path-based switcher: it computes the alternate locale and rewrites
the URL via path-prefix stripping. That covers structurally identical
routes (same slug on both sides), but breaks the moment EN and DE
slugs diverge — the switcher would point at a non-existent path. This
feature replaces the path-based logic with a `translationKey`-driven
lookup that finds the post pair regardless of slug, and adds the
fallback path for translation-less pages.

The feature does not carry `verifies_sprint_value`; the sprint
verifier sits on F-1's `acceptance-2`.

## Acceptance criteria

- [ ] **acceptance-1** The header on every page shows a visible
  language switcher labelled with the target language code (DE on
  EN pages, EN on DE pages).
- [ ] **acceptance-2** Clicking the switcher on a post page navigates
  to that post's translation, not just to the locale root.
- [ ] **acceptance-3** Clicking the switcher on a page without a
  translation falls back to the locale root and does not 404.
- [ ] **acceptance-4** The switcher uses the `translationKey`
  frontmatter field for routing on post pages, not a hard-coded slug
  map.

## Test hooks

- **acceptance-1** — Manual browser inspection of `/`, `/blog`,
  `/about`, the welcome post in EN, and their DE counterparts;
  confirm the switcher is present and labelled — pending
- **acceptance-2** — Manual test: visit `/blog/welcome`, click the
  DE switch, observe the destination is `/de/blog/welcome` (the
  translated post), not `/de/` — pending
- **acceptance-3** — Manual test: visit a page that has no DE
  counterpart (or vice versa), click the switch, observe the
  destination is the locale root and the page renders without a
  404 — pending
- **acceptance-4** — Code inspection of `src/components/Header.astro`
  (or the helper the switcher delegates to) confirming that post
  routes resolve their target via a `translationKey` lookup in the
  posts collection, not via path-prefix arithmetic — pending

## Consistency notes

The `feature-consistency-reviewer` agent (run at SHA `e0e40f8`,
2026-05-21) returned two `prior-art` findings and one `drift`
finding; no `overlap` or `duplication`. Summary:

**Prior art — existing language switcher in the header.**
`src/components/Header.astro` (lines 19–22 and 41–47) already exposes
a visible switcher labelled with the target locale and rewrites the
URL via path-prefix logic. `acceptance-1` is therefore satisfied by
existing code; `acceptance-2` is satisfied for structure-identical
routes (same slug on both sides). The feature is documented as an
extension of the existing switcher, not a replacement.

**Drift — `translationKey` routing not yet implemented.** This is
the substantive change in scope: today's switcher uses path-prefix
rewriting and the welcome `translationKey` field defined in the
content schema (`src/content.config.ts`) is not yet consulted in
`Header.astro`. `acceptance-4` deliberately mandates the
`translationKey`-driven approach, because it is robust against
divergent slugs between EN and DE — a divergence likely to occur the
moment posts are translated by Claude with different idiomatic
titles. The drift is resolved `proceed` because the spec does not
mandate a particular routing mechanism; the choice is the feature's
to make, and the rationale (slug-divergence safety) is recorded
verbatim here per the consistency-check spec's requirement that
`drift` resolutions paired with `proceed` carry an explicit
paragraph rationale.

**Prior art — post-internal translation link is also path-based.**
`src/pages/blog/[...slug].astro` and the DE counterpart derive
`translationHref` by path arithmetic too, not via `translationKey`
lookup. This is consistent with the header but means the feature's
fix lands cleanest if the `translationKey`-lookup is exposed as a
shared helper consumed by both the header and the post layouts; if
only the header is changed, the post page's "Read in German/English"
link will still break on divergent slugs. Recorded here as an
implementation hint, not as a separate feature; if the operator
wants strict separation, they can `split-out` post-layout
consolidation as a follow-up feature.

## Risks

- Refactoring two consumers (header + post layout) for the same
  routing semantics is the cleanest fix, but doubling the surface
  area for what reads as a small feature; the operator should
  decide before `ready → in_progress` whether both consumers are in
  scope or only the header.
- The `translationKey` lookup needs the posts collection at build
  time on both sides; Astro's content-collection APIs make this
  straightforward, but a change to the content schema would require
  re-checking this assumption.
