# Handover — how-lektorat-audits-my-docs

Delivery-contract artefacts for the EN+DE post pair, written by `nolte-shared:blog-author`.
Run date: 2026-06-06. Branch: `post/claude-shared-lektorat` (worktree `post+lektorat`).
Grounded artefact: `nolte/claude-shared@c9197fc` (plugin v0.1.4) — `spec/project/lektorat/en.md`,
`skills/lektorat-apply/SKILL.md`, `agents/lektorat-scanner.md`.

## Self-check manifest

Status per acceptance-criterion ID. `passed`, `finding: <reason>`, or `override: <reference>`.

### post-writing-style (EN-scoped where noted)

- a-1 (lede ≤ 80 words, names claim/question): passed — lede is ~75 words, 4 sentences, names `Lektorat` and the "curate consistently" question.
- a-2 (avg sentence length 14–20; no two consecutive > 30): finding: a few explanatory sentences run long (lede ~30 words); no two consecutive exceed 30. Measured by lektor D1 (LIX); within corridor.
- a-3 (no paragraph > 4 sentences): passed — two 5-sentence paragraphs (lede, guardrails) split during EN self-check.
- a-4 (Flesch–Kincaid 7–10, reviewer judgement): finding: upper edge given compound sentences; lektor D1 reports no critical/warning.
- a-4a (LIX corridor EN ≤ 45 / DE ≤ 50): passed — lektor D1 produced no critical/warning, only paragraph-density suggestions.
- a-5 (fenced blocks declare a language): passed — single `mermaid` block tagged on both sides.
- a-6 (link text self-describing): passed — `nolte-shared`, `baseline post`, `Vale` all describe destinations; internal link uses slug route.
- a-7 (sentence-case headings, single H1, no level skips): passed — heading "Three ways to run it: audit, patch, revise" recast to start with a capital during EN self-check.
- a-8 (no forbidden words without override): passed — "harness" (forbidden-list buzzword) reworded to "runtime" during EN self-check; grep against the closed list otherwise clean.
- a-9 (technical claims cite a verifiable source): passed — every Lektorat claim maps to the pinned claude-shared source (see mapping below).
- a-10 (AI-disclosure flag present; body doesn't contradict): passed — `aiGenerated: true` both files; body opens "AI-drafted and then curated by hand".
- a-11 (same translationKey + slug; both render): passed — `how-lektorat-audits-my-docs` both sides; `task build` rendered both routes.
- a-12 (DE typography `„…"`, em-dash w/ spaces, ä/ö/ü/ß; EN ASCII `"…"`): passed — three ASCII closing quotes in DE corrected to `“` (lektor D3 warnings).
- a-13 (named third parties cited; no unpermitted private quotes): passed — Vale (vale.sh) and LanguageTool named as public tools; no private quotes.
- a-14 (build command succeeds on the pair): passed — `task build` green (17 pages, both routes); clean run after `task clean` clears the transient `.astro` duplicate-id warning.
- a-15 (EN prose uses contractions): passed — it's / don't / I'm / can't / won't / here's throughout.
- a-16 (show-the-thinking: name the hard part before the choice): passed — names why eyeballing fails and why the skill/agent split exists before stating the design.
- a-17 (badge): n/a — consumer satisfies disclosure via `aiGenerated` flag (a-10).

### post-audience-communication

- a-1 (exactly one primaryAudience from {A,B,C}): passed — `primaryAudience: A`.
- a-2 (secondaryAudiences from same set, excludes primary): passed — `secondaryAudiences: [C]`.
- a-3 (first 80 words deliver the headline): passed — the consistency problem + the tool land in the lede.
- a-4 (depth tuned for primaryAudience A): passed — artefact-first, repo-grounded, no mid-post pivot.
- a-5 (escape-hatch for secondary audience C): passed — the closing coda serves the future-self knowledge-base reader (why a tool, not a chore).
- a-6 (named third party grounded, no private quotes): passed — Vale / LanguageTool public references only.
- a-7 (Diátaxis Explanation/How-to/blend): passed — explanation + how-to blend.
- a-8 (EN+DE identical audience fields): passed — A primary, [C] secondary both sides.
- a-9 (corpus-level, sprint review): n/a per-post.
- a-10 (collision favours primary, never against L): passed — no collision present.
- a-11 (depth-serves primaryAudience rubric): passed — A rubric.
- a-12 (no layering beyond lede/body/escape-hatch): passed — no `<details>` drawers.
- a-13 (no drawer holds primary-required content): passed.

### Per-pair block

- translationKey identical (EN/DE): passed — `how-lektorat-audits-my-docs`.
- filename slug identical: passed.
- audience fields identical: passed — A primary, [C] secondary both sides.
- AI-disclosure flag set in both: passed.
- build status: passed — `task build` green, both post routes rendered.

## Source-to-claim mapping

Every Lektorat claim is grounded in the pinned `nolte/claude-shared@c9197fc` corpus. No invented facts.

| Claim (passage) | Source |
| --- | --- |
| Five dimensions D1 readability / D2 comprehensibility / D3 spelling+grammar / D4 style / D5 audience-fit | `spec/project/lektorat/` §Quality dimensions; `agents/lektorat-scanner.md` §Detection procedure |
| Three operations audit (read-only) / patch (one finding, one diff, one approval) / revise (full-artefact rewrite, diff review) | `skills/lektorat-apply/SKILL.md` §Operations |
| Three severities critical / warning / suggestion, severity-sorted | `skills/lektorat-apply/SKILL.md` §Operations; `agents/lektorat-scanner.md` §Output |
| patch decisions approve / skip / skip-and-record → `dismissals.json` | `skills/lektorat-apply/SKILL.md` §Operation B step 5 |
| revise keeps every fact/claim/command/link/code, forbidden from inventing new content | `skills/lektorat-apply/SKILL.md` §Operation C steps 3–4 |
| `lektorat-apply` is a skill (writes + dialogue); `lektorat-scanner` is a read-only agent, tools Read/Grep/Glob/Bash, no Edit/Write | `agents/lektorat-scanner.md` frontmatter `tools:` + §"Why this is an agent" |
| LIX is the cross-language D1 primary metric; FRE/FKGL supplementary EN; WSTF DE | `agents/lektorat-scanner.md` §D1; `spec/project/readability-lix/` |
| EN D3/D4 via Vale; DE default LanguageTool HTTP API | `agents/lektorat-scanner.md` §D3 + §Read-only Bash justification; SKILL.md §Gotchas (OQ-2) |
| Outputs under `.audits/lektorat/<YYYY-MM-DD-HHMM>/` — findings.json, summary.md, run.json, dismissals.json, rewrite.diff | `skills/lektorat-apply/SKILL.md` §Output handling |
| Per-language rules (DE-rules on DE-text, EN on EN); cross-language passage flagged, not silently rewritten | `skills/lektorat-apply/SKILL.md` §User-language policy + §Hard rules |
| Refuses spec/ , SKILL.md, agents/*.md, source code, generated config, lockfiles; scope is Markdown prose | `skills/lektorat-apply/SKILL.md` §Hard rules |
| Never commits / pushes / opens PR | `skills/lektorat-apply/SKILL.md` §Gotchas |
| German trigger phrases ("lektoriere die README" etc.) | `skills/lektorat-apply/SKILL.md` §German trigger phrases |
| Vale 3.14.1 / LanguageTool Public endpoint reachable this run | live tool probe 2026-06-06 (recorded in `.audits/lektorat/2026-06-06-1719/findings.json` pipeline_metadata) |

No unused sources. Every named tool (Vale, LanguageTool) and the plugin link map to a passage.

## Handover manifest

- Route: target-state — dispatched `nolte-shared:lektorat-apply` operation `audit` over the EN+DE pair.
  Audit trail: `.audits/lektorat/2026-06-06-1719/`. Result: **0 critical, 5 warning, 9 suggestion, 1 infrastructure.**
- Build: `task build` — green (17 pages, both post routes rendered). Clean run after `task clean` clears the
  transient `.astro` duplicate-id warning; the empty-`projects`-collection warning is pre-existing and unrelated.
- Repository state: worktree branch `post/claude-shared-lektorat`, uncommitted working tree (post pair +
  this handover + `.audits/`). No commit SHA yet; staging/commit/PR is the operator's call.

## Lektor disposition

- **Fixed in place (warnings):**
  - D3 ×3 (DE L56/L60/L64): ASCII closing quote `"` → typographic `“` so every `„…“` pair is well-formed (also `a-12`).
  - D4 ×2 (DE L17/L66): informal `du`-address recast to impersonal for explanation-mode register
    consistency ("Wer das Plugin noch nicht kennt"; "bevor er veröffentlicht wurde"). EN "you" kept —
    second person is regular in English explanation prose and was not flagged.
- **Adopted (suggestions):** D2 `unified diff` gloss added in both EN and DE (genuine comprehension aid for a subset of audience A).
- **Dismissed with rationale (suggestions):** D2 `register drift` gloss — adopting it in the lede (its first
  use) would push the lede past the `a-1` ≤ 80-word budget; the higher-priority MUST wins.
- **Deferred (suggestions):** D1 `paragraph-length-heuristic` ×6 (EN L15/L31/L56/L78, DE L15/L56) — the pair
  already satisfies the `a-3` ≤ 4-sentences hard rule; further splitting is optional for an explanation-mode
  post aimed at a peer-technical audience.
- **Infrastructure (not patchable):** `vale-unavailable` — the blog repo has no `.vale.ini`, so EN D3/D4 Vale
  mechanics were skipped. D1 (LIX), D2 (heuristic), D4 (active-voice/consistency heuristics) and DE D3
  (LanguageTool HTTP) ran. Standing up a Vale config in this repo is tracked as a separate follow-up.
