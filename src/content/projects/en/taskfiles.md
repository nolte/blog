---
name: taskfiles
description: A curated collection of reusable Taskfile include modules that my projects wire in remotely, so common command sets — mkdocs, kind, pre-commit, k8s — live in one place instead of being copied per repo.
repo: https://github.com/nolte/taskfiles
homepage: https://nolte.github.io/taskfiles
tags: ["go-task", "taskfile", "developer-tooling", "automation", "reusable"]
lang: en
translationKey: taskfiles
archived: false
order: 5
---

taskfiles is the local-command counterpart to my CI plumbing. Where
[gh-plumbing](https://github.com/nolte/gh-plumbing) shares the GitHub Actions
that run in CI, this repo shares the [go-task](https://taskfile.dev) commands I
run on my own machine — so `task mkdocs:start` or `task pre-commit:install`
behaves the same in every project that wires it in.

## What it ships

Each module is a single YAML file under `src/`, and consumers pull it in through
Taskfile's [remote-taskfiles](https://taskfile.dev/experiments/remote-taskfiles/)
experiment. There's no build step and no runtime artefact — the YAML files
themselves are the product. Today it covers four areas:

- **mkdocs** — `start` to serve docs locally.
- **kind** — `start`, `destroy`, `recreate` for a local Kubernetes cluster.
- **pre-commit** — `install` and `start`.
- **k8s** — `bootstrap` and `install-argocd`.

## The one rule that makes it work

Every task in every module sets `dir: '{{.USER_WORKING_DIR}}'`, so commands run
in the consumer project's working directory, never inside this repository. That
single convention is what lets a remote include behave as if the tasks were
local.

## Wiring it in

A consumer points a base variable at the raw module path and lists the includes:

```yaml
version: '3'

vars:
  TASK_COLLECTION_BASE: https://raw.githubusercontent.com/nolte/taskfiles/main/src

includes:
  mkdocs: "{{.TASK_COLLECTION_BASE}}/taskfile-include-mkdocs.yaml"
  pre-commit: "{{.TASK_COLLECTION_BASE}}/taskfile-include-pre-commit.yaml"
```

Pinning to `main` is convenient for experimentation but exposes you to drift; for
repeatable behaviour you pin every include to a released tag instead. Because all
modules share the same base address, a Renovate-style bump lands in one pull
request. Each module also exposes a small set of `vars:` defaults you can
override per include.

It follows the same portfolio conventions as the rest of my repos — project
structure, branching model, release automation from
[claude-shared](https://github.com/nolte/claude-shared), CI through
gh-plumbing — and ships under the MIT license.
