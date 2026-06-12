---
title: "Why Claude gets the longest leash on unit tests"
description: "Part two of the test-automation series: the unit tier is fast, isolated, and deterministic, which is exactly why an autonomous Claude agent can run and fix it in a loop while a quality-gate skill only ever reports."
pubDate: 2026-06-12
lang: en
translationKey: ai-assisted-test-automation-unit
tags: ["testing", "claude", "automation", "test-pyramid", "unit-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Here is a unit test from `kamerplanter`'s frontend, in full:

```ts
it('setPage updates page and offset', () => {
  const { result } = renderHook(() => usePagination(10));
  act(() => result.current.setPage(2));
  expect(result.current.page).toBe(2);
  expect(result.current.offset).toBe(20);
});
```

No database. No server. No browser. It renders one hook, calls one function, and checks two numbers. It runs in milliseconds, and it gives the same answer every time. A Claude agent can run this test, watch it fail after a refactor, fix it, and run it again — all without asking me a single question.

That autonomy is the whole point of the unit tier, and it is the subject of this post. This is part two of the series; [the opener](/blog/ai-assisted-test-automation-overview) lays out the pyramid and the pipeline. Here I want to show why the fast tier is the one place I let an agent run unattended — and where I draw the line even so.

## Three properties that earn autonomy

The unit tier has three properties the tiers above it lack: it is fast, isolated, and deterministic.

Fast means a full run finishes in seconds, so an agent can run the suite many times in one sitting. Isolated means each test exercises one unit with its dependencies mocked, so a failure points at one place. Deterministic means the same input gives the same result, so a green-then-red flip is a real regression, not flakiness.

Those three properties are what make an autonomous fix loop safe. `kamerplanter` ships a project-local agent, `unit-test-runner`, that does exactly this. It is pinned to Claude Haiku on purpose — its job is to classify a failure by pattern (an import error, a changed assertion, a stale mock) and apply the obvious fix, which is pattern recognition, not deep reasoning. It runs the static analysis, runs pytest and vitest, reads each failure, fixes the test, and re-runs until the suite is green.

The loop has hard limits so it cannot thrash. A single test run that passes 120 seconds is aborted. After three fix iterations that still leave failures, the agent stops and reports what remains. And it never tries the same fix twice — if a fix did not help, that is a finding, not a retry.

## The boundary the agent does not cross

An autonomous agent that edits code is only safe if its reach is bounded. The `unit-test-runner` boundary is sharp: it edits test files only. Backend tests under `src/backend/tests/`, frontend tests under `src/frontend/src/test/` and the `*.test.tsx` files — nothing else. Production code under `app/` or the frontend `src/` is off-limits.

That boundary follows from a rule worth stating on its own: a failing test is a signal, not a nuisance. When a test fails, the agent first decides whether the test is stale or the code is wrong. If the code has an obvious bug, the agent does not quietly patch it to make the test pass. It records a `[PROD-FIX]` finding and leaves the production code untouched for a human or the feature developer to handle. The matching anti-rule is just as important: never delete a failing test to get to green.

This is the discipline that makes the autonomy trustworthy. The agent is allowed to move fast precisely because it cannot reach the code under test. The worst it can do is write a wrong test assertion, which the next review catches — not silently bend the product to a broken expectation.

## Two tools at two altitudes

The unit tier is served by two different things, and the difference between them is the clearest example of the skill-versus-agent split in the whole series.

`unit-test-runner` is an agent. It runs deep inside the implement-then-test loop, it fixes test code in place, and it returns a single verdict: merge-ready or not. It can run in parallel with the feature work, keeping the suite green while a feature lands.

`quality-gate` is a skill from the shared plugin. Its mandate is wider and shallower: run the project's lint, typecheck, and test steps in parallel, then tabulate exactly what failed in a `Check / Status / Runner / Details` table. It prefers the project's own `task` targets so the project's ignore lists stay in charge. It honours fixed timeouts — two minutes for lint, five for typecheck, ten for tests.

The decisive difference: `quality-gate` never fixes anything. It surfaces failures so the caller can triage before a commit, a PR, or a release. One tool fixes inside the loop; the other reports at the gate. The agent has the longer leash because its scope is narrow and its edits are reversible test code; the skill has no leash because its job is to tell the truth about the whole repo, not to change it.

## What "isolated" actually buys you

Isolation is the word that does the heavy lifting on this tier, and it is worth being concrete about how it is achieved.

The frontend test above never makes a network request. `kamerplanter`'s vitest setup starts a Mock Service Worker before the suite and resets its handlers after every test. The component thinks it is talking to the backend; it is talking to a mock. That is what lets a "unit" test of a data-driven component stay fast and deterministic — the one real dependency that would make it slow and flaky, the network, is replaced at the boundary.

Isolation is also what makes a coverage target meaningful. `kamerplanter`'s test strategy fixes thresholds: at least 80% line and 75% branch coverage overall, and at least 85% line coverage for the business-logic layer under `services/` and `engines/`. The shared spec does not pick those numbers for you — it fixes the rule that such a threshold must exist and must be checked. The agent does not invent the target; it works against the one the project declares.

## The honest part: this is the strongest tier

In the opener I promised each tier article would say where the example is strong and where it is thin. The unit tier is where `kamerplanter` is strongest. The backend carries its unit tests under `src/backend/tests/unit/`; the frontend carries component and hook tests under `src/frontend/src/test/`. Both run on every pull request — the backend CI job runs `pytest tests/unit/` on each change under `src/backend`, and the frontend job runs vitest the same way.

That is the broad base of the pyramid done right: the cheapest, fastest tests run the most often, on every change, with an agent keeping them green between human reviews. The next tier is where that comfort runs out.

## What's next

The next article is the integration tier — critical paths with real dependencies, where the database is no longer mocked. That single change breaks all three properties this tier relies on: the tests get slower, they stop being perfectly isolated, and they stop being perfectly deterministic. Watch what happens to the agent's leash when the dependency becomes real. In `kamerplanter`, the honest answer is that the tier almost disappears — and the next post is about why.
