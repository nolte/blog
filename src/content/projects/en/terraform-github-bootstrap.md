---
name: terraform-github-bootstrap
description: Manages parts of my GitHub account as Terraform — the repository inventory and modern repository rulesets — as a deliberate complement to the Probot-owned settings in gh-plumbing.
repo: https://github.com/nolte/terraform-github-bootstrap
tags: ["terraform", "github", "infrastructure-as-code", "iac", "automation"]
lang: en
translationKey: terraform-github-bootstrap
archived: false
order: 6
---

terraform-github-bootstrap owns part of my GitHub configuration as code, using
the [`integrations/github`](https://registry.terraform.io/providers/integrations/github/latest/docs)
Terraform provider. The scope is deliberately narrow: which repositories exist
(description, topics, visibility, the `has_issues` / `has_wiki` flags) and the
per-repo repository rulesets that are GitHub's modern take on branch protection.

`nolte` is a personal user account, not an organisation, so org-only concerns —
org settings, teams, organisation-wide rulesets — are out of scope. If the
account ever migrates to an organisation, those can be added in a separate root
module without disturbing what's here.

## Why two systems, not one

This repo is a conscious complement to
[gh-plumbing](https://github.com/nolte/gh-plumbing), and the split is the
interesting part:

- **Terraform here** owns repository inventory and repository rulesets.
- **Probot in gh-plumbing** owns per-repo settings, labels, merge strategy, and
  classic branch protection via the Settings App's `_extends`.

To keep the two from fighting over the same fields, the `github_repository`
resource uses `ignore_changes` on everything Probot owns — merge strategies,
`delete_branch_on_merge`, auto-merge. Each tool stays the single source of truth
for its own slice.

## How it runs

Day-to-day operation goes through go-task: `task tf:fmt`, `task tf:validate`,
`task tf:plan`, and the human-gated `task tf:apply`. Existing repositories are
adopted one `terraform import` at a time before the first apply, so Terraform
adjusts what's there instead of trying to recreate it. The state backend is
local for now.

There's also a `portfolio-app` module that wraps the GitHub App from gh-plumbing.
Because there's no API for creating a GitHub App or generating its private key,
that part has a documented manual runbook — register the App, generate the key,
install it, and persist the credentials in `gopass` so Terraform reads them via
`TF_VAR_*` without anything touching tfvars.

## Status

Bootstrap / pre-MVP: local state, no CI gate on `tf:plan` yet, and the inventory
starts by dogfooding this repo itself before growing one import at a time. It was
scaffolded with [claude-shared](https://github.com/nolte/claude-shared).
