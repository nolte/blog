# Lektorat auto-revise — hero-images-from-prompt-to-svg

Run: `2026-06-06-1741` · severity floor `warning` · target EN+DE post pair · audiences A (primary), C (secondary) · content_mode explanation/blend
Author route: `blog-post` → `blog-author` skill (assisted; briefing surfaced and operator-confirmed).
Source audit `.audits/lektorat/2026-05-30-2103/` was stale (already remediated by blog-author Step 7), so a fresh detection run was used per the skill's input contract.

## Escalated / needs operator decision (listed first)

### Non-deterministic re-audit count — NOT a regression from this run

The convergence re-audit returned **9 findings** versus the fresh pre-audit's **3**.
Every additional finding sits at a line the rewrite never touched (verified against
`rewrite.diff`, which changes only L36 and L88 in each file). The increase is
`lektorat-scanner` run-to-run variance: the second run flags on-brand English
compounds and abbreviations (`Hero-Bild`, `Marken-Hex-Werte`, `Seed-Slot`,
`Dark-Mode-Asset`, `PNG`, `KI`, `OG`) that the first run — and the original
`blog-author` Step 7 — deliberately accepted as audience-A technical register.

This run does **not** auto-accept convergence (count rose) and does **not** loop a
second author pass over these, because remediating them would either overload the
posts with abbreviation glosses against the established audience-A register or edit
`protected-terms-de.yml` in `claude-shared` — both out of scope for a post-pair
auto-revise. **Operator decision required:** treat the German loanword-compounds as
on-brand (recommended; matches prior disposition) or open a separate task to extend
`protected-terms-de.yml` upstream.

### Infrastructure condition (not author-remediable)

- `vale-unavailable` (EN) — no `.vale.ini`; EN D3 / Vale-driven D4 mechanics skipped.
  Tracked by roadmap **R-6** (Vale wiring for the author self-check).

## Addressed and verified resolved

| finding | file | dim | sev | action | re-audit |
|---|---|---|---|---|---|
| social unfurl unexplained | en L36 | D2 | warning | glossed: "(when a platform fetches and renders the link preview)" | resolved |
| Social-Unfurl unexplained | de L36 | D2 | warning | glossed: "(wenn eine Plattform die Linkvorschau abruft und rendert)" | resolved |
| "Außerdem" ×2 | de L88 | D4 | suggestion | 2nd → "Zudem" | resolved |
| "It also" ×2 (mirror) | en L88 | D4 | — | 2nd → "And it" (bilingual symmetry) | resolved |

All four operator-confirmed edits applied; `npm run build` green (17 pages). No
semantic-preservation violation: glosses add clarity without altering meaning, and
the connector swaps preserve the sentence logic.

## Pre / post counts

| file | pre (fresh audit) | targeted | post (re-audit) | targeted resolved |
|---|---|---|---|---|
| en | 1 | 1 | 2* | yes |
| de | 2 | 2 | 7* | yes |

\* post counts are inflated by scanner variance on out-of-scope on-brand terms; see
the escalation above. The targeted findings themselves are confirmed resolved.

## Files

- `routing.json` — per-file class + author routing
- `run.json` — run metadata, source-audit reference, convergence disposition
- `rewrite.diff` — the exact four edits (only L36 / L88 per language)
