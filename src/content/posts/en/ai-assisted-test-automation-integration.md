---
title: "The integration tier is where the agent's leash runs out"
description: "Part three of the series: make the database real and the unit tier's three properties break at once. Why no autonomous agent lives on the integration tier, what Claude is good for instead, and why kamerplanter's thinnest tier is a decision rather than neglect."
pubDate: 2026-06-12
lang: en
translationKey: ai-assisted-test-automation-integration
tags: ["testing", "claude", "automation", "test-pyramid", "integration-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Here is the entire integration tier of `kamerplanter`'s backend. Not an excerpt — the whole thing, one file of 46 lines:

```python
ARANGO_AVAILABLE = False
try:
    client = ArangoClient(hosts="http://localhost:8529")
    client.db("_system", username="root", password="rootpassword").version()
    ARANGO_AVAILABLE = True
    client.close()
except Exception:
    pass


@pytest.mark.skipif(not ARANGO_AVAILABLE, reason="ArangoDB not available")
class TestArangoSetup:
    def test_collections_created(self):
        ...
```

Read the guard at the top carefully, because it is the story of this whole post. The test tries to reach a real ArangoDB at `localhost:8529`. If it cannot, `ARANGO_AVAILABLE` stays `False` and the entire test class skips itself. In CI — where no database is running — this test does nothing. It reports as skipped and the build goes green.

This is part three of the series. [Part two](/blog/ai-assisted-test-automation-unit) was about the unit tier, where I let a Claude agent run an autonomous fix loop. I closed it by promising to show what happens to the agent's leash when the dependency becomes real. This is that post, and the short answer is: the leash runs out.

## What breaks when the dependency becomes real

The unit tier earned its autonomy from three properties: it was fast, isolated, and deterministic. Make the database real and all three break at once.

It stops being fast. A test that talks to ArangoDB has to connect, create collections, write data, and tear it down. Seconds, not milliseconds. It stops being isolated — the test now depends on a live service that may or may not be there, which is exactly why the `skipif` guard exists. And it stops being deterministic in the way that matters: the result depends on external state, so a red run no longer cleanly means "the code regressed." It might mean "the container wasn't up."

The unit tier's comfort came from never touching anything real. The integration tier exists precisely to touch something real. That is its job, and it is also why none of the unit tier's conveniences survive the trip.

## Why no agent lives here

In part two, the `unit-test-runner` agent refused to run this tier. Its instructions are explicit: do not run `tests/integration/`, because it needs an ArangoDB container and is too slow. That refusal is not a limitation to fix. It is the correct boundary.

An autonomous fix loop needs the three properties to work. It runs the suite, reads a failure, applies a pattern fix, and re-runs — many times, fast, trusting that a flip from red to green is real signal. Point that loop at a suite that skips itself when the dependency is absent and it learns nothing; point it at a suite that needs a real database and every iteration costs setup time and can fail for reasons that have nothing to do with the code. The loop that made the unit tier productive becomes noise here.

So the leash does not just shorten on this tier. It comes off, because there is nothing safe to attach it to. The agent that fixes is the wrong shape for a tier where "fix" is rarely a one-line test edit and "fast" is gone.

## The spec says one thing, the repo does another

Here is the part I find most honest, and most useful. `kamerplanter` has a written test strategy. Its integration-tier rule is a hard requirement: integration tests **must** use testcontainers for ArangoDB and Redis — no in-memory fakes — and must cover at least 70% of the critical service and engine paths.

Now look back at the actual file. It does not use testcontainers. It connects to a database you are expected to start by hand with `docker compose up arangodb`, and it guards itself with a `skipif` so it disappears when that database is absent. It tests one thing: that the collections and the graph get created. One file, against a written target of 70% critical-path coverage with managed containers.

That is a `MUST` the repo does not meet. I am not showing you this to confess a sin — I am showing you because it is the normal state of a real project, and because it is exactly the kind of gap a test pyramid is supposed to make visible. The spec stated an ambition. The repo made a different bet. The distance between them is information, not shame.

## What Claude is actually for on this tier

If the agent that fixes does not belong here, what does Claude do on a tier like this? The honest answer is: it stops being a fix loop and becomes an auditor and a scaffolder, both on request rather than on autopilot.

The auditing role is the `test-pyramid-check` skill from the shared plugin. It reads a feature's tiers and reports which are present, which are thin, and which are missing — and a tier that exists but skips itself in CI is precisely what it is built to flag. It does not fix the gap. It names it, so a human can decide.

The scaffolding role is the same pipeline from the opener — `test-case-extractor` deriving cases, a generator turning them into tests — but pointed at integration scenarios only if you have first committed to the infrastructure to run them. That "if" is the whole point. Claude can write you a testcontainers-backed integration suite. It cannot decide for you whether the critical paths are worth the CI minutes, the container startup time, and the maintenance. That decision is yours, and it should be.

## The honest part: the thinnest tier is a bet, not neglect

In the opener I said `kamerplanter`'s pyramid is lopsided, and this is the tier where it is thinnest. It would be easy to read that as laziness. I want to argue it is a defensible bet instead.

Integration tests are the expensive middle of the pyramid. They cost real infrastructure in CI, they are slower than unit tests, and they are flakier than both the tier below and — done well — the tier above. `kamerplanter` put its critical-path confidence somewhere else: into the end-to-end (E2E) tier, where a real browser drives a real backend through real user journeys. That is 70 test files of coverage at the top against one skippable file in the middle. It is an inverted shape from the textbook diagram, and for this project it is a deliberate trade, not an accident.

The value of writing it down — and of a tool that audits it — is that the bet stays visible. A thin integration tier you chose is a strategy. A thin integration tier you forgot is a risk. The only difference is whether anyone wrote down which one it is.

## What's next

The next tier is contract/API: the endpoints, tested with `httpx` against the application. `kamerplanter` has four files there — more than the integration tier — and yet they share its core problem in a different form. The tests exist, they are cheap to run, and the standard CI job still does not run them. The integration tier is thin because the tests are missing. The contract tier is thin because the tests are present but unwired. That distinction, and what Claude can do about each, is the next post.
