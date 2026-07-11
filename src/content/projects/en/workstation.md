---
name: workstation
description: A chezmoi source tree that provisions a developer workstation from a single command — asdf-pinned CLI tools, a baseline git config, zsh plugins, and a reusable Taskfile collection.
repo: https://github.com/nolte/workstation
homepage: https://nolte.github.io/workstation/
tags: ["chezmoi", "dotfiles", "asdf", "workstation", "developer-tooling", "automation"]
lang: en
translationKey: workstation
archived: false
order: 8
---

workstation is the chezmoi source tree that brings a fresh machine to a known
state with a single `chezmoi init --apply`. The problem it solves is the one
every developer eventually feels: a new laptop, or a reinstalled one, and hours
of hand-configuring tool versions, git defaults, and shell plugins that you'll
have to redo the next time. Here that setup lives once, declaratively, and stays
reproducible and idempotent across machines.

## What it provisions

The source tree renders straight into `$HOME` through
[chezmoi](https://www.chezmoi.io/):

- **Pinned CLI tools** — tool versions are pinned through
  [asdf](https://asdf-vm.com/) so every machine resolves the same versions, kept
  current by Renovate. It also adds asdf plugin repositories that aren't in the
  official `asdf-vm/asdf-plugins` index.
- **Git baseline** — a templated `~/.gitconfig` with sane defaults (default
  branch and friends), filled from the operator's name and email.
- **zsh plugins** — a set of plugins that make the interactive shell faster to
  work in.
- **A reusable Taskfile collection** — the [taskfiles](https://github.com/nolte/taskfiles)
  set fetched onto the provisioned machine for working with the installed tools.
- **A global GitHub MCP server** — it merges a `github` entry into
  `~/.claude.json` so every [Claude Code](https://www.claude.com/product/claude-code)
  project gets a GitHub [MCP](https://modelcontextprotocol.io/) server. It reads
  a Personal Access Token from `GITHUB_MCP_PAT` at runtime, so no secret is
  stored in the repo.

## How it's put together

`.chezmoiroot` points chezmoi at `chezmoi_config/` as the source directory.
Inside it, `dot_tool-versions` becomes `~/.tool-versions`, `dot_gitconfig.tmpl`
renders to `~/.gitconfig`, `run_onchange_*.sh` hooks handle provisioning
(plugin install, asdf install, virtualenvs), and `.chezmoiexternal.toml` pulls
in external sources like the zsh plugins and the Taskfile collection. Everything
outside `chezmoi_config/` is repository tooling and never reaches target
machines.

## How it fits together

It extends [gh-plumbing](https://github.com/nolte/gh-plumbing) for the reusable
GitHub workflows and Probot/Renovate presets, fetches the
[taskfiles](https://github.com/nolte/taskfiles) collection onto provisioned
machines, and lints its own docs with
[vale-style](https://github.com/nolte/vale-style). The documentation is an
MkDocs site on GitHub Pages. It's early-stage and personal-use — actively
maintained for a single operator's Linux workstation, so interfaces may change
without notice.
