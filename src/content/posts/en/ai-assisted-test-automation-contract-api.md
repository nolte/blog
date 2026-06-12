---
title: "The contract tier runs in milliseconds — and never in CI"
description: "Part four of the series: kamerplanter's API tests drive the app in-process with the database mocked — fast, isolated, deterministic, just like unit tests. Yet CI never runs them and the agent refuses them on a false assumption. Tests that exist but never run are their own kind of debt."
pubDate: 2026-06-12
lang: en
translationKey: ai-assisted-test-automation-contract-api
tags: ["testing", "claude", "automation", "test-pyramid", "contract-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Here is a contract test from `kamerplanter`'s backend:

```python
def _get_client():
    """Create test client, mocking DB connection."""
    with patch("app.main.get_connection"), patch("app.main.ensure_collections"):
        from app.main import app
        return TestClient(app)


class TestVPDCalculation:
    def test_vpd_calculation(self):
        client = _get_client()
        response = client.post(
            "/api/v1/calculations/vpd",
            json={"temp_c": 25.0, "humidity_percent": 60.0, "phase": "vegetative"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "vpd_kpa" in data
        assert "status" in data
        assert "recommendation" in data
```

Look at `_get_client`. It patches the database connection away and hands back a FastAPI `TestClient`. That client drives the application in-process — there is no server to start, no database to reach. The test posts to a real endpoint, gets a real response, and pins the response contract: status 200, and a body that carries `vpd_kpa`, `status`, and `recommendation`.

This is part four of the series. In [part three](/blog/ai-assisted-test-automation-integration) the integration tier was thin because its tests were missing. The contract tier is thin for the opposite reason: the tests are right here, they are cheap, and the standard CI job still does not run them. That gap is the subject of this post.

## What a contract test pins

A contract test does not check business logic — a unit test already did that. It checks the promise an endpoint makes to its callers: the route exists, it accepts this shape, it returns that shape, and it fails in a defined way.

`kamerplanter`'s test strategy is specific about it. The API tier must validate response schemas against the Pydantic models, and must cover every public endpoint with at least a happy path and one error path. The calculation test above is the happy path. The error path is its own file, and it is more interesting than it sounds:

```python
"""NFR-006: Verify structured error responses and no information leakage."""

FORBIDDEN_PATTERNS = [
    r"ArangoDB", r"Traceback", r'File "/', r"\.py",
    r"localhost:", r"redis://", r"uvicorn", r"FastAPI", r"Pydantic",
]
```

That test drives the app into error states and asserts the response body contains none of those strings. No stack trace, no database name, no internal hostname, no framework fingerprint. It is a contract test in the strict sense — the contract being "an error tells the caller what went wrong without telling an attacker how the system is built." That is exactly the kind of promise you want pinned by a fast, repeatable test rather than discovered in production.

## These tests have the unit tier's three properties

Back in part two I said the unit tier earns autonomy from being fast, isolated, and deterministic. Read the contract tests against that list and they pass every item.

They are fast — `TestClient` runs the app in the same process, so there is no network round-trip and no container to boot. They are isolated — the database connection is patched out, the services are mocked, so a failure points at the endpoint, not at infrastructure. They are deterministic — same request, same mocked dependencies, same response, every run.

In other words, nothing about the contract tier's nature stops an agent from running it in the same tight loop it runs the unit tier in. The properties that earned the unit tier its long leash are all present here too.

## But two doors are shut

So why doesn't this tier run on autopilot? Because two separate doors are closed on it, and neither is about cost.

The first door is CI. The backend's CI job runs `pytest tests/unit/` and nothing else. The API tests live in `tests/api/`, one directory over, and the path filter simply never reaches them. They pass locally and are invisible to every pull request.

The second door is the agent. In part two, the `unit-test-runner` listed the tiers it must not run, and `tests/api/` was on that list with the reason "needs a running server." Except these tests need no server — `TestClient` is in-process and the database is mocked. The agent is skipping a tier it could safely run, on a reason that does not hold for the tests actually in that directory.

Neither door was shut on purpose. Both are stale defaults — a CI filter that was scoped to the unit tier early and never widened, and an agent rule written from a reasonable-sounding assumption that the real tests have since outgrown.

## A sneakier kind of thin

This is what makes the contract tier different from the integration tier, and worth its own post. A missing test is honest about being missing — `test-pyramid-check` finds an empty tier immediately, and a developer feels the absence. A test that exists but never runs is sneakier. The file is in the repo. The coverage looks present to anyone skimming the directory tree. The build is green. And yet the tier is dark, because green only ever meant "the unit tier passed."

Tests that exist but never run are a specific kind of debt. They rot quietly — an endpoint changes, the contract test that would have caught it is never executed, and the test drifts out of sync with no failure to announce it. By the time someone runs `tests/api/` again, the test is as likely to be wrong as the code.

## What Claude is for here

On the integration tier, the useful Claude role was scaffolding-on-request, because the tests genuinely did not exist. Here the tests exist, so the role is narrower and sharper: audit, then a one-line wiring fix that a human approves.

`test-pyramid-check` is built for exactly this. It does not just ask "does a tier have tests" — it asks whether the fast-tier coverage is gated, meaning actually wired into the gate that runs on every change. A tier full of green-locally tests that CI never runs is precisely the finding it surfaces. And the remedy is not a test rewrite — it is widening the CI job to include `tests/api/` and correcting the agent's exclusion list. Configuration, not code.

That is the whole shape of AI help on this tier. The audit names the dark tier; the human decides it should run; the change is a few lines of workflow YAML. Claude is good at the first and the third. The decision in the middle — is this tier worth gating — stays where it belongs.

## The honest part

The strongest evidence that the contract tier should run is `kamerplanter`'s own strategy. The tier table does not mark these tests as local-only. It marks them "local and CI," and it sets a target of 100% of public endpoints, each with a happy path and an error path. The project already decided this tier belongs in the gate. The wiring just never caught up to the decision.

That is the most ordinary kind of drift there is, and the least dramatic to fix. No new infrastructure, no rewrite — one path added to a workflow file and one line removed from an agent's do-not-run list. It needed an audit to be seen, and a human to sign off. Neither step is the autonomous fix loop that made the unit tier feel effortless, and that is the throughline of the series: the further up the pyramid you go, the more the AI's job shifts from doing to seeing.

## What's next

The last article is the top of the pyramid: end-to-end. This is where `kamerplanter` is strongest — 70 test files, 58 page objects, screenshots, a generated protocol. It is also where the six disciplines from the opener finally get their full treatment, and where Claude's role splits cleanly into three agents: one to generate the suite, one to review the suite, and one to read the run's screenshots back like a human would. The autonomous fixer is gone for good up here. What replaces it is the most interesting collaboration in the whole series.
