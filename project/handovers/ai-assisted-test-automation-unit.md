# Handover — ai-assisted-test-automation-unit

Article 2 of 5 in the AI-assisted test-automation series. EN-canonical + DE
translation, `translationKey: ai-assisted-test-automation-unit`. Thesis: the
unit tier earns the most agent autonomy because it is fast, isolated, and
deterministic; the agent fixes inside the loop while the quality-gate skill only
reports.

## Self-check manifest

### Per-language — EN
- primaryAudience A / secondaryAudiences [C]: passed
- LIX corridor (EN aim ≤ 45): passed — LIX 37
- forbidden-words scan: passed
- headings sentence-case: passed
- code fence language-tagged (```ts): passed
- every named-tool/agent claim sourced: passed (see source-to-claim map)

### Per-language — DE
- LIX corridor (DE aim ≤ 50): passed — LIX 42
- German typography (`„…"` U+201E/U+201C, ä/ö/ü/ß, em-dash spaced): passed
- Du-form throughout: passed
- D3 percent-sign spacing (line 63): finding fixed (80 % / 75 % / 85 %)
- D6 „still"→„stillschweigend" (line 43): finding fixed
- D6 „still"→„heimlich" (line 45): finding fixed

### Per-pair
- translationKey identical: passed
- file slug identical: passed
- audience fields identical (A / [C]): passed
- aiGenerated: true in both: passed
- pubDate / tags identical: passed
- build command: passed (task build green, 31 pages, re-run clean after edits)
- language-switcher flip: deferred — no dev server this run; binding parity
  verified statically

## Source-to-claim mapping

- usePagination test snippet (lede) → kamerplanter @ `1da54e5d`
  `src/frontend/src/test/hooks/usePagination.test.ts`
- unit-test-runner: model Haiku, edits test files only, [PROD-FIX] reporting,
  120 s/run timeout, 3-iteration cap, never same fix twice, refuses
  tests/integration & tests/api → kamerplanter
  `.claude/agents/unit-test-runner.md`
- quality-gate: surface-only, Check/Status/Runner/Details table, task-target
  preference, timeouts 2/5/10 min → claude-shared @ `v0.1.5`
  `skills/quality-gate/SKILL.md`
- MSW network mocking, beforeAll/afterEach reset → kamerplanter
  `src/frontend/src/test/setup.ts`
- coverage thresholds ≥80 % line / ≥75 % branch overall, ≥85 % line for
  services/ & engines/ → kamerplanter
  `spec/nfr/NFR-008_Teststrategie-Testprotokoll.md`
- CI runs `pytest tests/unit/` per change under src/backend → kamerplanter
  `.github/workflows/backend.yml`
- hybrid skill-vs-agent rationale → unit-test-runner frontmatter +
  quality-gate "Why this is a skill" section

## Handover manifest

- Route: target-state — `nolte-shared:lektorat-apply` (audit); trail at
  `.audits/lektorat/2026-06-12-1900/`. 3 warnings fixed, 0 critical,
  0 suggestion. EN D3/D4 skipped (vale-unavailable).
- Build: green — `task build`, 31 pages, re-run clean after edits.
- Repository state: branch `post/ai-assisted-test-automation`, worktree
  `.claude/worktrees/test-automation-series` (uncommitted working tree).
