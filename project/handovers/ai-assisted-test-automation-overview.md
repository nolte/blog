# Handover — ai-assisted-test-automation-overview

Bilingual post pair, kickoff of a five-part series on AI-assisted test
automation. EN-canonical + DE translation, `translationKey:
ai-assisted-test-automation-overview`.

## Self-check manifest

### Per-language — EN
- a-1 primaryAudience declared (A): passed
- a-2 secondaryAudiences declared (C): passed
- a-4a LIX corridor (EN aim ≤ 45): passed — LIX 38
- forbidden-words scan: passed (no leverage/delve/robust/seamless/…)
- headings sentence-case: passed
- code fences language-tagged (mermaid): passed
- every named-tool claim sourced: passed (see source-to-claim map)
- D1 structural (paragraph ≤ ~3 sentences): finding adopted — tier-definition
  paragraph split into two

### Per-language — DE
- a-4a LIX corridor (DE aim ≤ 50): passed — LIX 43
- German typography (`„…"` with U+201E / U+201C, ä/ö/ü/ß, em-dash spaced):
  passed — closing quote codepoint verified U+201C
- Du-form throughout: passed
- D3 subject-verb agreement (line 67): finding fixed
- D4 sentence-opener variety (line 67): finding fixed
- D6 coinage „absichtswahrend": finding adopted — reworded to relative clause

### Per-pair
- translationKey identical: passed
- file slug identical (en/…overview.md ↔ de/…overview.md): passed
- audience fields identical (A primary, [C] secondary): passed
- aiGenerated: true in both: passed
- pubDate / tags identical: passed
- build command ready: passed
- language-switcher flip in running dev server: deferred — no dev server in
  this run; binding-key parity verified statically instead (finding/deferral)

## Source-to-claim mapping

- "70 `test_req*.py` files / 58 page-object classes" (lede, §real repo)
  → kamerplanter @ `1da54e5d`, `tests/e2e/` (file counts verified on disk)
- "four tiers: unit, integration, contract/API, E2E" (§pyramid)
  → claude-shared @ `v0.1.5`, `spec/project/e2e-test-automation/` line ~49
- "E2E reserved for user-journey verification" (§pyramid)
  → same spec, tier-completeness rule
- pipeline agents test-case-extractor / e2e-test-generator / e2e-test-reviewer /
  e2e-result-reviewer; skills quality-gate / test-pyramid-check (§chain)
  → claude-shared `agents/`, `skills/` @ `v0.1.5`
- "locator hierarchy data-testid > id > role > css > xpath, no position XPath"
  (§reference profile) → e2e-test-automation spec, locator-strategy discipline
- "Selenium+pytest normative reference profile, binding core stack-agnostic"
  (§reference profile) → e2e-test-automation spec, Context + reference-profile
- "TC-REQ-002-001 → TC-002-001" docstring traceability (§real repo)
  → kamerplanter `tests/e2e/test_req002_standorte.py`
- "integration = 1 file, not in CI; contract/API = 4 files, not in standard CI"
  (§honest part) → kamerplanter `src/backend/tests/{integration,api}/`,
  `.github/workflows/backend.yml` (runs `tests/unit/` only)
- "project-local agents unit-test-runner / selenium-test-generator /
  e2e-testcase-extractor" (§real repo) → kamerplanter `.claude/agents/`

Unused briefing sources: spec/project/test-case-derivation/ and
spec/project/quality-gate/ are cited at tier level only (finding, not violation;
the tier articles will draw on them directly).

## Handover manifest

- Route: target-state — dispatched `nolte-shared:lektorat-apply` (operation
  `audit`); audit trail at `.audits/lektorat/2026-06-12-1832/`. 2 warnings fixed,
  3 suggestions adopted, 0 critical. EN D3/D4 skipped (vale-unavailable).
- Build: green — `task build`, 29 pages, re-run clean after edits.
- Repository state: branch `post/ai-assisted-test-automation`, worktree
  `.claude/worktrees/test-automation-series` (uncommitted working tree).
