---
id: F-1
title: Deploy Astro site to GitHub Pages with bilingual landing
status: draft
roadmap_item: R-1
sprint: null
created: 2026-05-21
ended: null
verifies_sprint_value: acceptance-2
consistency_check:
  performed_at: 2026-05-21
  agent_version: feature-consistency-reviewer@e0e40f8
  findings:
    - kind: prior-art
      target: .github/workflows/deploy.yml
      resolution: proceed
    - kind: prior-art
      target: src/pages/index.astro
      resolution: proceed
    - kind: prior-art
      target: src/layouts/BaseLayout.astro
      resolution: proceed
    - kind: drift
      target: project/features/deploy-bilingual-site.md (acceptance-4)
      resolution: revisit-after browser-smoke-test-tooling-decision
---

## Description

This feature delivers the first publicly reachable deployment of the
blog. It bundles three things that, together, mean an outside reader
typing the URL gets a working bilingual site: (a) the GitHub Actions
workflow that builds the Astro site and publishes to GitHub Pages on
every push to `main`; (b) the bilingual `/` (EN) and `/de/` (DE)
landings, each linking to at least one published post in their
language; (c) the welcome-post pair (already in `src/content/posts/`)
becoming the visible content of those landings.

The feature documents and verifies the deployment chain end-to-end —
parts of the implementation already exist in the repository (the
workflow file, the landings, the layout's `<html lang>` plumbing), so
the work is primarily a verification gate plus filling the last gaps
(welcome posts wired through, smoke-tested in two browsers).

The verifying acceptance criterion is `acceptance-2`: both landings
link to at least one post in their respective language — that is what
the sprint's `value_statement` ("Readers can reach the bilingual blog
with at least one post in each language") asserts in operational form.

## Acceptance criteria

- [ ] **acceptance-1** The deploy workflow runs successfully on every
  push to `main` and publishes to GitHub Pages.
- [ ] **acceptance-2** Both deployed landings (`/` for EN, `/de/` for
  DE) each link to at least one published post in their language.
- [ ] **acceptance-3** Each linked post opens and renders correctly
  with its language attribute set on the `<html>` element.
- [ ] **acceptance-4** A manual cross-browser smoke test on the
  deployed site (current Chromium and current Firefox, DevTools
  console open) finds no console errors on the EN landing, the DE
  landing, and one linked post in each language.

## Test hooks

- **acceptance-1** — GitHub Actions UI for `.github/workflows/deploy.yml`
  on `main`, cross-checked locally via `task build` — pending
- **acceptance-2** — Manual browser visit to the deployed Pages URL for
  `/` and `/de/`, verifying at least one post link each — pending
- **acceptance-3** — Manual browser navigation into one linked post per
  language, plus DevTools `document.documentElement.lang` check — pending
- **acceptance-4** — Manual demo: open Chromium, open Firefox, visit
  `/`, `/de/`, one EN post, one DE post, DevTools console open, record
  any errors. Status flips to `skipped` if the operator opts to defer
  automated browser-test tooling and the manual demo passed — pending

## Consistency notes

The `feature-consistency-reviewer` agent (run at SHA `e0e40f8`,
2026-05-21) returned three `prior-art` findings and one `drift`
finding; no `overlap` or `duplication`. Summary:

**Prior art — deploy workflow.** `.github/workflows/deploy.yml`
already implements `acceptance-1` end-to-end via `withastro/action@v3`
and `actions/deploy-pages@v4`, triggered on push to `main`. The
feature documents the existing chain; no second workflow is added.
Test hook for `acceptance-1` points at the existing workflow run.

**Prior art — bilingual landings with post listing.**
`src/pages/index.astro` and `src/pages/de/index.astro` already filter
posts by `data.lang` and list per-language results. The welcome-post
pair (`src/content/posts/en/welcome.md`, `…/de/welcome.md`) is in
place. `acceptance-2`, the sprint verifier, is therefore implemented
in code; this feature primarily verifies the deployment surfaces it.

**Prior art — `<html lang>` plumbing.** `src/layouts/BaseLayout.astro`
sets `<html lang={lang}>` via `BaseLayout` props; `PostLayout` passes
`post.data.lang` through. `acceptance-3` is satisfied by existing
infrastructure and verified, not re-implemented.

**Drift — browser smoke-test tooling.** The repo carries no Playwright
or other browser-test configuration, so `acceptance-4`'s verification
mechanism cannot point at automated tooling today. The resolution is
`revisit-after browser-smoke-test-tooling-decision`: the operator
decides later whether to introduce Playwright (then `acceptance-4`
becomes `passing` automated) or to keep `acceptance-4` as a manual
demo (then status moves to `skipped` with the operator's rationale, or
to `passing` after the demo is performed and observed clean). Until
that decision lands, `acceptance-4` stays `pending` and is not a
`draft → ready` blocker per the consistency-check spec — only
`overlap` and `duplication` block by default.

## Risks

- The deployment domain is not yet decided (default
  `https://nolte.github.io/blog` with `base: "/blog"`, configurable in
  `astro.config.mjs`); a custom-domain switch later will require
  flipping `site` and `base` together, which is a small but easily
  missed step.
- The manual browser smoke test (`acceptance-4`) is per-operator; if
  the operator forgets to run it before flipping the feature `done`,
  the gate is honour-based until automated tooling lands.
