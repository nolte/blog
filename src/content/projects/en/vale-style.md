---
name: vale-style
description: A Vale package that shares spelling rules and vocabularies across my projects — ship one zip, consume it everywhere — so prose linting stays consistent without copying word lists per repo.
repo: https://github.com/nolte/vale-style
homepage: https://nolte.github.io/vale-style
tags: ["vale", "prose-linting", "documentation", "developer-tooling", "reusable"]
lang: en
translationKey: vale-style
archived: false
order: 7
---

vale-style is the prose-linting counterpart to the rest of my shared tooling.
[Vale](https://github.com/errata-ai/vale) catches spelling slips and off-list
terminology in Markdown, but its vocabularies and accept-lists tend to get
copied into every repo and then drift. This packages them once and ships them as
a single release archive that any project consumes by URL.

## How it's consumed

A consumer adds the package to its `.vale.ini` and points at the
`releases/latest` archive, so the reference doesn't need to be bumped by hand:

```ini
StylesPath = styles

Packages = https://github.com/nolte/vale-style/releases/latest/download/nolte-styles.zip

Vocab = technical

[*.md]
BasedOnStyles = Vale, nolte-styles
```

Then `vale sync` pulls the archive and `vale .` lints. Projects that want
reproducible builds pin a specific release tag instead of `latest`.

## What's in the archive

The release `nolte-styles.zip` unpacks to a `.vale.ini`, the `nolte-styles`
placeholder style, and the vocabularies under `styles/config/vocabularies/`.
Two vocabularies ship today:

- **`technical`** — general cross-project and software-engineering terminology
  (Ansible, ESPHome, MkDocs, CI, PRs, Dockerfiles, runbooks, dogfooding, …).
- **`esphome`** — ESPHome-specific hardware, pins, and YAML keys (`GPIO`,
  `baud_rate`, `restore_from_flash`, …).

You activate additional vocabularies by listing them in `Vocab`.

## How it's built and governed

There's no version file — bumping happens by cutting a GitHub Release, which
triggers the archive workflow to attach `nolte-styles.zip`. The curation rules
for the vocabularies live under `spec/` as bilingual EN/DE specs kept
structurally in sync, the same source-of-truth pattern I use in
[claude-shared](https://github.com/nolte/claude-shared). It's the style backbone
behind the Vale checks in
[gh-plumbing](https://github.com/nolte/gh-plumbing)'s reusable workflows.
