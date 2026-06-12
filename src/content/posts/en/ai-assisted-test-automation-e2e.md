---
title: "End-to-end: three agents and a wall of screenshots"
description: "The series finale: the E2E tier is where kamerplanter is strongest and where Claude's role splits into three bounded agents — generate, review, and read the screenshots back like a human. The six disciplines in full, and why a strong tier is an auditable one rather than a green one."
pubDate: 2026-06-12
lang: en
translationKey: ai-assisted-test-automation-e2e
tags: ["testing", "claude", "automation", "test-pyramid", "e2e-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Every end-to-end test in `kamerplanter` opens with a block like this, at the top of the file:

```text
Spec-TC Mapping (test TC → spec/e2e-testcases/TC-REQ-002.md):
  TC-REQ-002-001  →  TC-002-001  Site list loads (empty state / title)
  TC-REQ-002-005  →  TC-002-005  Create site — open dialog
  TC-REQ-002-006  →  TC-002-006  Create site — name field required
  TC-REQ-002-009  →  (no spec TC)  Sort by column click
  TC-REQ-002-011  →  TC-002-004  Row click navigates to detail page
```

That is the location test file, and it maps 27 browser tests back to the requirement cases they verify. Some map cleanly; a few are marked `(no spec TC)` because the test covers something the spec case did not. This is the top of the pyramid, and it is where `kamerplanter` is strongest — 70 test files, 58 page objects, screenshots at every checkpoint, a generated protocol. It is also where Claude's role changes the most.

This is the final post in the series. [The opener](/blog/ai-assisted-test-automation-overview) promised the six E2E disciplines in full, and the four tiers since have each shortened the agent's leash: autonomous on unit, off entirely on integration, and audit-only on contract. Up here the leash is gone, and three agents take its place.

## The six disciplines are the actual product

The opener made one claim above all others: the reusable part of test automation is not the test code, it is the discipline that keeps a suite trustworthy. Nowhere is that clearer than E2E, because a browser test written without discipline is the flakiest, slowest, least trustworthy artefact in the whole codebase.

The shared spec states the discipline as six rules, framework-neutral, every one a `MUST`:

- **Page objects** — every UI interaction goes through a page object; a test never calls the driver's element lookups directly.
- **Deterministic waiting** — no fixed sleeps; every wait is a condition (presence, visibility, clickability, URL change, loading-indicator gone).
- **Locator strategy** — a robustness hierarchy, most stable first: `data-testid` → element id → role/semantic → CSS → XPath last, with position-based XPath forbidden.
- **Screenshot checkpoints** — at least one screenshot per test, at the standard points (page-load, before an action, after it, any error state), named by TC-ID.
- **Test protocol** — a run can emit a machine-generated Markdown protocol with metadata, a pass/fail/skip summary, and per-requirement coverage.
- **Spec traceability** — every test names the TC-ID and requirement it verifies, in its own docstring.

The spec is careful to say this discipline is the binding core, expressed against capabilities every browser stack provides — navigate, locate, wait, act, capture. Selenium plus pytest is the reference profile, not a mandate. The discipline travels; the library is glue.

## Discipline you can read in the code

What makes `kamerplanter` a good example is that the disciplines are not aspirational — they are visible in the files. The base page object carries the waiting vocabulary the spec asks for:

```python
def wait_for_element_clickable(self, locator, timeout=DEFAULT_TIMEOUT):
    return WebDriverWait(self.driver, timeout).until(
        EC.element_to_be_clickable(locator)
    )

def wait_for_loading_complete(self, timeout=DEFAULT_TIMEOUT):
    """Wait until all [data-testid='loading-skeleton'] elements disappear."""
```

Two disciplines in one snippet. The wait is a condition, never a sleep — and the loading check keys on a `data-testid`, the top of the locator hierarchy. The one place a sleep is allowed shows up in the location test file as a single honest import:

```python
import time  # kept for debounce waits
```

That comment is the spec's escape hatch made literal: a fixed sleep may appear, but only for a genuine time-based concern — here a 0.3-second search debounce — and it must carry a justifying comment. The same file's docstring spells out the contract it holds itself to: page objects only, `WebDriverWait` preferred, screenshots at page-load / before / after / error, descriptive assertions. The discipline is written down next to the tests that obey it.

A run turns that into an audit trail. The protocol is a real Markdown file with a metadata header — timestamp, commit, branch, OS, browser, device, Python version — a pass/fail/skip table, and a per-requirement coverage count. It is opt-in behind a `--generate-protocol` flag and lands in a git-ignored, timestamped folder, so protocols pile up as history without polluting the repo.

## Three agents, one job each

On the unit tier, one agent did everything: run, fix, re-run. The E2E tier breaks that single job into three, because no part of it is safe to do on autopilot.

`e2e-test-generator` scaffolds the suite from the test cases. It writes page objects, test modules, fixtures, and the protocol wiring — and its boundaries are sharp. It writes only into the E2E directory, it never adds a `data-testid` to the application (that is application work, listed as a precondition instead), and it uses the shell only to collect tests, never to run the full browser suite.

`e2e-test-reviewer` grades an existing suite against the six disciplines and applies minimal, intent-preserving fixes. It cites every finding by file and line. Crucially, it repairs rather than regenerates — a suite that has drifted gets surgical corrections, not a rewrite that would throw away the human judgement already in the tests.

The split matters because generation and review want opposite instincts. A generator is constructive and will happily produce new code; a reviewer is conservative and should change as little as possible. Folding both into one agent blurs that line. Keeping them apart means each can be the right kind of careful.

## The agent that looks at pictures

The third agent is the one I find most interesting in the whole series. `e2e-result-reviewer` does not run anything and does not edit anything. It reads a finished run's output — the screenshots, as images, and the protocol — and reviews them the way a human reviewer would.

It looks at a screenshot and checks the layout, the required elements, the displayed state, the language, the error and validation states, against the requirement and UI specs the project declares. Then it reports findings ranked by priority, each one keyed to the TC-ID and requirement it concerns. It is read-only by construction: it cannot re-run the suite to make a finding disappear, and it cannot quietly edit a test to match a wrong screenshot. Its only output is judgement.

This is the cleanest expression of the series' arc. At the bottom of the pyramid, Claude fixes code in a fast loop. At the top, Claude looks at a wall of screenshots and tells you which ones are wrong. The work moved from doing to seeing, exactly as the contract-tier post predicted, and the seeing is now literal.

## The honest part: strong is not the same as green

This is the tier where `kamerplanter` is strongest, and I still do not get to show you a perfect picture. A real protocol from the suite records nine tests, six passed, three failed — a 66.7% success rate on that run. Several tests across the suite carry an explicit skip: `Site list uses accordion cards — no DataTable search`, because the UI moved to a different component and the test was honestly parked rather than quietly deleted. And a handful of tests trace to `(no spec TC)`, meaning they verify something real that no requirement case covers yet.

None of that is failure of the tier. It is the tier working. A reasoned skip with a written cause is discipline, not debt — the spec demands exactly that over a silent early return. A red run captured in a protocol is more useful than a green run with no trail. The point of the disciplines was never to make the suite always pass; it was to make every run legible — so a failure tells you what broke, a skip tells you why, and a screenshot shows you the state with the TC-ID printed on its filename. A strong E2E tier is an auditable one, not a green one.

## The shape of the whole series

Five tiers, one idea. The reusable thing in test automation is the discipline, and the discipline is what lets an agent help in the right shape at every altitude.

At the unit tier the discipline is isolation, and isolation earns an autonomous fix loop. On integration the dependency turns real, the discipline becomes honesty about cost, and the agent steps back to auditor and scaffolder. On the contract tier the discipline is wiring — running the tests you already have — and the agent's job is to see the dark tier and name it. At the top, the discipline is the six rules that keep a browser suite trustworthy, and the agent splits into three: one to build, one to review the build, one to read the result.

The leash got shorter as the tiers got slower, and that was never a limitation to fix. It was the system working as designed. An agent should run free where running free is safe, and hand the wheel back where it is not. The thing that stays constant from the bottom of the pyramid to the top is not the automation. It is the discipline — written down, enforced by a spec, and applied by whichever shape of help the tier actually wants. That is the whole series, and that is what makes the help worth having.
