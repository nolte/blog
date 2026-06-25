---
name: gh-plumbing
description: Centralised, reusable GitHub Actions workflows and shared GitHub App configurations, so the repos across my portfolio stop duplicating CI/CD boilerplate.
repo: https://github.com/nolte/gh-plumbing
homepage: https://nolte.github.io/gh-plumbing
tags: ["github-actions", "ci-cd", "reusable-workflows", "probot", "automation", "developer-tooling"]
lang: en
translationKey: gh-plumbing
archived: false
order: 4
---

gh-plumbing is where the CI/CD plumbing for my portfolio lives so it doesn't get
copy-pasted into every repo. The problem it solves is the boring one: a dozen
projects all need the same release pipeline, the same linting gates, the same
docs build — and keeping that logic in sync by hand across repos is a losing
game. So it lives here once, and downstream projects call into it.

## Reusable workflows

The heart of the repo is a set of `reusable-*` GitHub Actions workflows that
other repositories invoke with `workflow_call`. They cover the lifecycle I keep
hitting:

- **Building and testing** — pre-commit static checks, Python coverage with
  `pytest-cov`, Node.js coverage with Vitest or Jest, each with an optional
  `fail-under` gate rendered into the job summary.
- **Containers** — a fast lint-and-dry-build for PR feedback (`hadolint` plus a
  buildx build with no push) and a multi-arch publish step to a configurable OCI
  registry.
- **Releases** — release-drafter for the changelog, a publish step that promotes
  a draft to a published release, and a fast-forward of `master` to the latest
  tag.
- **Docs** — `mkdocs build --strict` so broken links fail the PR, plus build and
  publish to GitHub Pages (and the same for Sphinx).
- **Security and supply chain** — Trivy scans, dependency review, and the
  chain-bench CIS benchmark.

There are more — Ansible Galaxy publishing, Molecule scenarios, HACS validation
for Home Assistant integrations, Vale spell-checking — each one a thin wrapper
around a well-known action, pinned and shared.

## Shared Probot configuration

Beyond workflows, the repo carries a common set of Probot app configurations —
`settings`, `boring-cyborg`, `stale`, and the Renovate preset — that downstream
repos pull in via `_extends`. That's how repository settings, branch protection,
and PR labelling stay consistent without being re-declared everywhere.

## How it fits together

It pairs with [taskfiles](https://github.com/nolte/taskfiles) for the local
command sets and is complemented by
[terraform-github-bootstrap](https://github.com/nolte/terraform-github-bootstrap),
which owns the repository inventory and rulesets that Probot doesn't. Local
workflow testing runs through [nektos/act](https://github.com/nektos/act), and
the docs are an MkDocs site on GitHub Pages.
