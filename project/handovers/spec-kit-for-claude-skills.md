# Self-check manifest

Post pair: `src/content/posts/{en,de}/spec-kit-for-claude-skills.md` · `translationKey: spec-kit-for-claude-skills`

## Per-language criteria — `post-writing-style`

| ID | EN | DE |
| --- | --- | --- |
| a-1 lead ≤ 80 words naming the claim | passed (47 words) | passed (45 words) |
| a-2 avg sentence 14–20, no two consecutive > 30 | passed (15.5 avg; consecutive pair split during self-check) | passed (14.8 avg; none > 30 consecutive) |
| a-3 no paragraph > 4 sentences | passed (three 5-sentence paragraphs rewritten during self-check) | passed (same three rewritten) |
| a-4 Flesch–Kincaid 7–10 (EN only) | `finding: not measured — no textstat hook in this repo; criterion is reviewer judgement per spec §a-4 (provisional). LIX (a-4a) measured instead.` | n/a |
| a-4a LIX corridor | passed (39.4 ≤ 45) | passed (42.8 ≤ 50) |
| a-5 code blocks declare a language | passed (`mermaid` on the only fenced block) | passed |
| a-6 link text describes destination | passed | passed |
| a-7 sentence-case headings, no second H1, no level skip | passed (0 H1 in body; no Title Case detected) | passed |
| a-8 no forbidden-list word | passed (full closed list checked; no hits, no override needed) | passed |
| a-9 every named-tool claim cites a source | passed — see source-to-claim mapping | passed |
| a-10 AI-disclosure flag present, body does not contradict | passed | passed |
| a-12 quotation marks / em-dash / umlauts | passed (ASCII `"…"`, spaced em-dash) | passed (10× `„…“` with U+201E/U+201C; 10 ASCII closers repaired during self-check; no ae/oe/ue substitutes) |
| a-13 third-party characterisation cited | passed (GitHub / Spec Kit claims cite README, monorepo guide, and the locally scaffolded tree) | passed |
| a-15 contractions in running prose (EN only) | passed (31 verb contractions after repair; draft initially had 0 — finding raised and fixed) | n/a |
| a-16 names what made the decision hard before the choice | passed (§"Where I'm starting from" states the missing-layer problem before the tool appears; A1–A4 stated as open) | passed |
| a-17 / a-17a disclosure badge, informal register | passed (badge renders on `aiGenerated: true`; no impersonal `one`) | passed (one impersonal `man` rewritten to `du`; the single `Sie` is the pronoun for „die Kette", not the formal address) |
| a-17b no calque, no loanword-gender error | n/a | passed on self-pass — **detection gate is D6 in the `lektorat-apply` audit** |

## Per-pair criteria

| Item | Status |
| --- | --- |
| a-11 same `translationKey`, same filename slug | passed (`spec-kit-for-claude-skills` both sides) |
| Audience fields identical (`primaryAudience: A`, `secondaryAudiences: [C]`) | passed |
| `pubDate`, `tags`, `portfolioProject`, `draft`, `aiGenerated` identical | passed |
| a-14 build command succeeds | passed — see handover manifest |
| Dev-server language-switch flip | `finding: not performed — verified via the production build rendering both /blog/ and /de/blog/ routes instead` |

# Source-to-claim mapping

| Source | Claims it supports |
| --- | --- |
| https://github.com/github/spec-kit (README) | §The chain: purpose of each of the ten commands; §Where I'm starting from: the two quoted phrases "become executable, directly generating working implementations rather than just guiding them" and "multi-step refinement rather than one-shot code generation" |
| https://github.com/github/spec-kit/blob/main/docs/guides/monorepo.md | §`/speckit-specify`: quoted "Spec Kit does not provide a built-in base/inheritance mechanism." and "duplicate or sync shared engineering rules per project"; §What I think so far: no spec inheritance |
| `nolte/claude-shared` @ `exp/speckit-spike` commit `7fda420` | §The chain: Spec Kit 0.14.3 scaffolded; ten skills under `.claude/skills/speckit-*/`; §Where the spike actually stands: "two commits" |
| `nolte/claude-shared` @ `exp/speckit-spike` commit `c302e83` | §`/speckit-constitution`: constitution v1.0.0 ratified 2026-07-28, the five principle names and their content, the Sync Impact Report clearing three templates + ten skills + both runtime guidance files |
| `.specify/init-options.json`, `.specify/integration.json` | §The chain: `"ai_skills": true`, `"invoke_separator": "-"`, version 0.14.3 |
| `.specify/templates/plan-template.md` | §`/speckit-constitution` and §`/speckit-plan`: quoted gate "Must pass before Phase 0 research. Re-check after Phase 1 design."; Complexity Tracking table |
| `.specify/templates/tasks-template.md` | §`/speckit-tasks`: phase names (Setup, Foundational, per-user-story, Polish), `[P]` parallel marker, `[US1]` story tag |
| `.specify/workflows/speckit/workflow.yml` | §`/speckit-implement`: chain wiring `specify → review-spec → plan → review-plan → tasks → implement`, both gates human approve-or-abort |
| `.claude/skills/speckit-*/SKILL.md` (rendered) | §Where the spike stands, A2: the exact seven surviving frontmatter keys |
| `.resume/speckit-spike/plan.md` | §Where the spike stands: assumptions A1–A4 verbatim in substance; finding B0 (`specify --version` triggering a full init) |
| Local verification (`find`/`ls` over `nolte/claude-shared` @ `ce8b1dc`) | 64 skills, 60 agents, 114 spec topics, four plugins |

Unused sources: none.

# Handover manifest

- **Handover route**: target-state — `nolte-shared:lektorat-apply`, operation `audit`, over the EN+DE pair. **Not yet dispatched**: the operator did not request a subagent run, so the pair carries the self-check above but no independent editorial audit. The D6 calque dimension in particular is self-passed only. Note for when it runs: this repository ships no `.vale.ini`, so the audit's EN D3/D4 dimensions report `vale-unavailable`; D1/D2/D5/D6 and the DE dimensions run normally.
- **Build status**: green. `ASDF_NODEJS_VERSION=22.22.3 npm run build` (the repo pins no `.tool-versions`, so the Node version was set for the run). Final run was a clean build after `rm -rf .astro dist` — 45 pages, including `/blog/spec-kit-for-claude-skills/` and `/de/blog/spec-kit-for-claude-skills/`, no content-collection warnings.
- **Repository state**: `nolte/blog`, branch `develop`, working tree at `df13717` plus the uncommitted post pair and this artefact. No commit and no PR created — that boundary belongs to the operator.
