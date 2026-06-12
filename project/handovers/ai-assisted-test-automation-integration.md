# Handover — ai-assisted-test-automation-integration

Article 3 of 5. EN-canonical + DE translation, `translationKey:
ai-assisted-test-automation-integration`. Thesis: making the dependency real
breaks the unit tier's three properties (fast/isolated/deterministic), so no
autonomous fix-loop agent lives here; Claude shifts to auditor
(`test-pyramid-check`) and on-request scaffolder. The thin tier is a defensible
bet, and the spec-vs-repo gap (NFR-008 MUST testcontainers + ≥70 % vs. one
self-skipping file) is the honest centre of the post.

## Self-check manifest

### Per-language — EN
- primaryAudience A / secondaryAudiences [C]: passed
- LIX corridor (EN aim ≤ 45): passed — LIX 35
- forbidden-words scan: passed
- headings sentence-case: passed
- code fence language-tagged (```python): passed
- D2 E2E first-use expansion: finding fixed

### Per-language — DE
- LIX corridor (DE aim ≤ 50): passed — LIX 37
- German typography (`„…"` U+201E/U+201C, ä/ö/ü/ß, em-dash, 70 % spaced): passed
- Du-form throughout: passed
- D2 E2E first-use expansion: finding fixed
- D4 „Sie"-anaphora (line 57): finding adopted (openers varied)
- D6 coinage „skippbare"→„überspringbare": finding adopted

### Per-pair
- translationKey identical: passed
- file slug identical: passed
- audience fields identical (A / [C]): passed
- aiGenerated: true in both: passed
- pubDate / tags identical: passed
- build command: passed (task build green, 33 pages, re-run clean after edits)
- language-switcher flip: deferred — no dev server; binding parity verified
  statically

## Source-to-claim mapping

- the full 46-line integration file, ARANGO_AVAILABLE guard + skipif (lede)
  → kamerplanter @ `1da54e5d`
  `src/backend/tests/integration/test_arango_integration.py`
- "connects to a manually-started `docker compose up arangodb`, no
  testcontainers" → same file's module docstring + body
- unit-test-runner refuses tests/integration ("needs ArangoDB container, too
  slow") → kamerplanter `.claude/agents/unit-test-runner.md`
- NFR-008 integration rule: MUST testcontainers (ArangoDB, Redis), no in-memory
  fakes, ≥70 % critical service/engine paths → kamerplanter
  `spec/nfr/NFR-008_Teststrategie-Testprotokoll.md` §2.4 + tier table
- integration tier not in CI (backend CI runs `pytest tests/unit/` only)
  → kamerplanter `.github/workflows/backend.yml`
- test-pyramid-check audits tier completeness, flags thin/skipped tier
  → claude-shared @ `v0.1.5` `skills/test-pyramid-check/SKILL.md`
- "70 test files at the E2E tier" → kamerplanter `tests/e2e/test_req*.py`
  (file count verified on disk)

## Handover manifest

- Route: target-state — `nolte-shared:lektorat-apply` (audit); trail at
  `.audits/lektorat/2026-06-12-1913/`. 2 warnings fixed, 2 suggestions adopted,
  0 critical. EN D3/D4 skipped (vale-unavailable).
- Build: green — `task build`, 33 pages, re-run clean after edits.
- Repository state: branch `post/ai-assisted-test-automation`, worktree
  `.claude/worktrees/test-automation-series` (uncommitted working tree).
