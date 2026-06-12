# Handover — ai-assisted-test-automation-e2e

Article 5 of 5 (finale). EN-canonical + DE translation, `translationKey:
ai-assisted-test-automation-e2e`. Thesis: the E2E tier is where kamerplanter is
strongest and where the AI's role splits into three bounded agents
(generate / review / read-the-screenshots); the six disciplines are the reusable
product; a strong tier is auditable, not green. Capstone section ties the whole
series arc together (leash shortens as tiers slow; discipline is the constant).

## Self-check manifest

### Per-language — EN
- primaryAudience A / secondaryAudiences [C]: passed
- LIX corridor (EN aim ≤ 45): passed — LIX 41 (finale, longer/rhetorical by design)
- forbidden-words scan: passed
- headings sentence-case: passed
- code fences language-tagged (```text + ```python ×2): passed

### Per-language — DE
- LIX corridor (DE aim ≤ 50): passed — LIX 44
- German typography (decimals 66,7 % and 0,3 Sekunden comma+space; em-dash): passed
- Du-form throughout: passed
- D6 calque „Instinkte wollen" (line 76): finding adopted („verlangen")
- D4 „Auf …-Stufe" anaphora (line 96): finding adopted (second opener „Bei Integration")

### Per-pair
- translationKey / slug / audience fields identical: passed
- aiGenerated: true in both: passed
- pubDate / tags identical: passed
- TC-mapping code block uses the repo's verbatim German descriptions on the DE
  side / English on the EN side: intentional, faithful to source
- build command: passed (task build green, 37 pages, re-run clean after edits)
- language-switcher flip: deferred — no dev server; binding parity verified statically

## Source-to-claim mapping

- TC-ID mapping block (lede), 27 tests, „(kein Spec-TC)" entries
  → kamerplanter @ `1da54e5d` `tests/e2e/test_req002_standorte.py` docstring
- base_page waits (wait_for_element_clickable, wait_for_loading_complete keyed
  on `[data-testid='loading-skeleton']`) → kamerplanter
  `tests/e2e/pages/base_page.py`
- `import time  # kept for debounce waits` (0.3 s search debounce) → same test
  file's imports + docstring
- six disciplines (page objects / deterministic waiting / locator hierarchy /
  screenshot checkpoints / protocol / spec traceability), each a MUST,
  framework-neutral binding core + Selenium+pytest reference profile
  → claude-shared @ `v0.1.5` `spec/project/e2e-test-automation/en.md`
- three agents: e2e-test-generator (writes E2E dir only, never adds data-testid,
  shell only to collect), e2e-test-reviewer (grades vs disciplines, minimal
  intent-preserving fixes, cites file/line, repairs not regenerates),
  e2e-result-reviewer (read-only, reads screenshots as images + protocol,
  findings keyed to TC-ID/priority) → claude-shared `agents/`
- protocol metadata header + pass/fail/skip + per-REQ coverage, `--generate-protocol`
  flag, git-ignored timestamped folder → kamerplanter `tests/e2e/conftest.py`,
  `tests/e2e/protocol_plugin.py`, a real `test-reports/e2e/<ts>/protokoll.md`
- honest run: 9 tests, 6 passed, 3 failed, 66.7 % → real protokoll.md
- reasoned skips „Site list uses accordion cards — no DataTable search"
  → kamerplanter `tests/e2e/test_req002_standorte.py` @pytest.mark.skip reasons
- 70 test files / 58 page objects → file counts verified on disk

## Handover manifest

- Route: target-state — `nolte-shared:lektorat-apply` (audit); trail at
  `.audits/lektorat/2026-06-12-1942/`. 0 critical, 0 warning, 2 suggestions
  adopted. EN D3/D4 skipped (vale-unavailable).
- Build: green — `task build`, 37 pages, re-run clean after edits.
- Repository state: branch `post/ai-assisted-test-automation`, worktree
  `.claude/worktrees/test-automation-series` (uncommitted working tree).
