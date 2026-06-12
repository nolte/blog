# Handover — ai-assisted-test-automation-contract-api

Article 4 of 5. EN-canonical + DE translation, `translationKey:
ai-assisted-test-automation-contract-api`. Thesis: the contract/API tests share
the unit tier's three properties (TestClient in-process, DB mocked → fast,
isolated, deterministic), yet two stale defaults keep them dark — a CI path
filter scoped to tests/unit/ and an agent exclusion that wrongly assumes
tests/api/ needs a running server. Tests that exist but never run are a sneakier
debt than missing tests; the remedy is configuration, not code, and an audit is
what surfaces it.

## Self-check manifest

### Per-language — EN
- primaryAudience A / secondaryAudiences [C]: passed
- LIX corridor (EN aim ≤ 45): passed — LIX 35
- forbidden-words scan: passed
- headings sentence-case: passed
- code fences language-tagged (```python ×2): passed
- E2E expanded on first use: passed

### Per-language — DE
- LIX corridor (DE aim ≤ 50): passed — LIX 40
- German typography (`„…"` U+201E/U+201C, ä/ö/ü/ß, em-dash, 100 % spaced): passed
- Du-form throughout: passed
- D3 substantivised ordinal (line 89): finding fixed („im Ersten und im Dritten")
- D6 calque „Gerüstbau auf Anfrage" (line 85): finding adopted (verbal rephrase)
- D6 coinage „Reparierer" (line 99): finding adopted („Reparatur-Agent")
- D4 „Sie sind" anaphora (line 63): dismissed — intentional, mirrors EN triad

### Per-pair
- translationKey / slug / audience fields identical: passed
- aiGenerated: true in both: passed
- pubDate / tags identical: passed
- build command: passed (task build green, 35 pages, re-run clean after edits)
- language-switcher flip: deferred — no dev server; binding parity verified
  statically

## Source-to-claim mapping

- test_calculations.py contract test (lede): _get_client patches the DB,
  TestClient(app), POST /api/v1/calculations/vpd, asserts 200 + schema
  → kamerplanter @ `1da54e5d` `src/backend/tests/api/test_calculations.py`
- four API files in tests/api/ (test_calculations, test_enrichment,
  test_error_handling, test_privacy_router) → directory listing on disk
- error-path / no-leakage test, NFR-006, FORBIDDEN_PATTERNS list
  → kamerplanter `src/backend/tests/api/test_error_handling.py`
- contract tier needs no server/DB (TestClient in-process, DB mocked)
  → test_calculations.py `_get_client()` body
- CI runs `pytest tests/unit/` only; tests/api/ excluded → kamerplanter
  `.github/workflows/backend.yml`
- unit-test-runner excludes tests/api with reason "needs a running server"
  → kamerplanter `.claude/agents/unit-test-runner.md` line 140
- NFR-008 §2.5 API/Contract tier: httpx/TestClient, Pydantic schema validation,
  100 % public endpoints (happy + error path each), tier table marks "Lokal + CI"
  → kamerplanter `spec/nfr/NFR-008_Teststrategie-Testprotokoll.md` §2.5 + table
- test-pyramid-check audits whether fast-tier coverage is *gated* (wired into CI)
  → claude-shared @ `v0.1.5` `skills/test-pyramid-check/SKILL.md`

## Handover manifest

- Route: target-state — `nolte-shared:lektorat-apply` (audit); trail at
  `.audits/lektorat/2026-06-12-1930/`. 1 warning fixed, 2 suggestions adopted,
  1 suggestion dismissed (documented), 0 critical. EN D3/D4 skipped
  (vale-unavailable).
- Build: green — `task build`, 35 pages, re-run clean after edits.
- Repository state: branch `post/ai-assisted-test-automation`, worktree
  `.claude/worktrees/test-automation-series` (uncommitted working tree).
