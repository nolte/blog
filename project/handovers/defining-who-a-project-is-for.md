# Handover — defining-who-a-project-is-for

Delivery-contract artefacts for the EN+DE post pair, written by `nolte-shared:blog-author`.
Run date: 2026-06-24. Branch: `develop` (working tree).
Grounded artefact: `nolte/claude-shared` — `spec/project/audience-identification/en.md`,
`skills/audience-identify/SKILL.md`, and this repo's own `AUDIENCES.md` as the worked example.

## Self-check manifest

Status per acceptance-criterion ID. `passed`, `finding: <reason>`, or `override: <reference>`.

### post-writing-style (EN-scoped where noted)

- a-1 (lede ≤ 80 words, names claim/question): passed — lede is 80 words, 4 sentences, names the claim "define audiences first" and the post's subject.
- a-2 (avg sentence length 14–20; no two consecutive > 30): passed — EN avg 15.4 words/sentence (LIX measure); no run of two > 30.
- a-3 (no paragraph > 4 sentences): passed — longest body paragraph is 4 sentences.
- a-4 (Flesch–Kincaid 7–10, reviewer judgement): finding: a few list-introducing sentences sit at the upper edge; lektor D1 to confirm no critical/warning.
- a-4a (LIX corridor EN ≤ 45 / DE ≤ 50): passed — EN LIX 37.4, DE LIX 42.5 (both inside corridor).
- a-5 (fenced blocks declare a language): passed — single `mermaid` block tagged on both sides.
- a-6 (link text self-describing): passed — `nolte-shared`, `baseline post` describe destinations; internal link uses slug route.
- a-7 (sentence-case headings, single H1 from frontmatter, no level skips): passed — all H2, sentence case both languages.
- a-8 (no forbidden words without override): passed — grep against the closed list is clean.
- a-9 (technical claims cite a verifiable source): passed — every method claim maps to `spec/project/audience-identification/en.md` or `AUDIENCES.md` (see mapping below).
- a-10 (AI-disclosure flag present; body doesn't contradict): passed — `aiGenerated: true` both files; this post is itself presented as a downstream consumer of the audience list.
- a-11 (same translationKey + slug; both render): passed — `defining-who-a-project-is-for` both sides; `npm run build` rendered both routes.
- a-12 (DE typography `„…"`, em-dash w/ spaces, ä/ö/ü/ß; EN ASCII `"…"`): passed — all 10 DE closing quotes corrected to U+201C; mermaid labels kept ASCII; EN uses ASCII quotes.
- a-13 (named third parties cited; no unpermitted private quotes): passed — only public artefacts (the plugin specs/skills) named; no private quotes.
- a-14 (build command succeeds on the pair): passed — `npm run build` green, 39 pages, both routes built.
- a-15 (EN prose uses contractions): passed — it's / isn't / can't / don't / haven't throughout.
- a-16 (show-the-thinking: name the hard part before the choice): passed — names the "private assumptions" failure before stating the fix.
- a-17 (badge): n/a — consumer satisfies disclosure via `aiGenerated` flag (a-10).

### post-audience-communication

- a-1 (exactly one primaryAudience from {A,B,C}): passed — `primaryAudience: A`.
- a-2 (secondaryAudiences from same set, excludes primary): passed — `secondaryAudiences: [B]`.
- a-3 (first 80 words deliver the headline): passed — "define audiences first, then write" lands in the lede.
- a-4 (depth tuned for primaryAudience A): passed — artefact-first, spec-grounded, concrete worked example.
- a-5 (escape-hatch for secondary audience B): passed — the portfolio-reviewer reader is served by the working-style framing and the consumer-wiring diagram.
- a-6 (named third party grounded, no private quotes): passed — only the author's own public plugin is referenced.
- a-7 (Diataxis positioning declared): explanation — the post explains a process and its rationale, not a step-by-step how-to.
- a-8 (multi-audience layering, no whiplash): passed — single A-first thread; B served by emphasis, not by a register switch.
- a-9 (no audience claimed that the body doesn't serve): passed — A and B only.
- a-10 (bilingual audience symmetry): passed — EN and DE target identical audiences, identical frontmatter.
- a-11 (L/M never primary): passed — neither named.
- a-12 (named-third-party fairness): n/a — no external third party portrayed.
- a-13 (audience fields written even if schema-unenforced): passed — schema enforces A/B/C here; fields valid.

### Per-pair

- translationKey identical: passed — `defining-who-a-project-is-for`.
- file slug identical: passed.
- audience fields identical: passed — A primary, [B] secondary both files.
- AI-disclosure flag set both: passed — `aiGenerated: true`.
- build status: passed — `npm run build` green.
- language-switcher flip: finding: not exercised (no dev server in this run); deferred to operator review.

## Source-to-claim mapping

- "without a disciplined way to enumerate audiences … decisions … made against the author's private assumptions" (§The problem it solves) → `spec/project/audience-identification/en.md` §Context.
- "starts with a bounded context … before a single reader is named" (§What defining the audience actually means) → spec Requirements, first MUST ("begin with a written declaration of the bounded context").
- "five relationship categories … recorded as 'none' with a reason" (same §) → spec Requirements, second MUST (the five categories + "state 'none' with a reason").
- per-audience fields (label, category, surface, expectation, track, open question) → spec Requirements, third MUST.
- "tagged confirmed … or assumed" → spec Requirements, fourth MUST.
- "must exist before any downstream artefact that claims an audience" (§Who consumes the list) → spec Requirements, "MUST produce the audience list before downstream artifacts".
- worked-example audiences A–M, all `assumed`, governance `none` with open question → this repo's `AUDIENCES.md`.
- "spec-drift-audit flags a project whose documented audiences no longer match its real interaction surface" (§Why it matters) → spec Acceptance Criteria ("The spec-drift-audit skill can flag a module whose documented audiences no longer match its actual interaction surface").
- "method scales down … README section instead of a standalone file" (closing) → spec Requirements, artifact-storage SHOULD ("the format scales with size, the method doesn't").

Unused sources: none.

## Handover manifest

- Route: target-state — dispatched `nolte-shared:lektorat-apply` operation `audit` over the EN+DE pair.
- Build: `npm run build` — green (39 pages, both `/blog/...` and `/de/blog/...` routes).
- Repository state: branch `develop`, working tree (uncommitted); self-check ran against the working-tree files.

### Lektorat audit outcome

Infrastructure: `vale-unavailable` (no `.vale.ini` in the repo; EN D3/D4 Vale mechanics skipped — known, expected). D1 and D5 clean both files; EN D6 clean.

- D3 `warning` (DE) — "Betreiber sind ich" subject-verb agreement → **fixed**: rephrased to "Betreiber bin ich als Seiten-Maintainer (D), dazu Claude Code als mein Co-Autor (E)".
- D6 `suggestion` (DE) — "die Methode skaliert nach unten" calque → **fixed**: "die Methode funktioniert auch im Kleinen".
- D6 `suggestion` (DE) — "wegskalieren" anglicised coinage → **fixed**: "Unverzichtbar bleibt allein die Reihenfolge".
- D6 `suggestion` (DE) — "Drift wird erwischt" unidiomatic collocation → **fixed**: "Drift wird erkannt".
- D4 `suggestion` (DE) — bold list-label capitalisation (lines 33–39) → **dismissed**: each label is a bold sentence-start; initial-capital is correct German and consistent across all five labels.

DE rebuild after the fixes: `npm run build` green; DE quote balance re-verified (10× U+201E / 10× U+201C, no ASCII `"` in prose).
