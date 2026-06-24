---
name: claude-home-assistant
description: A Claude Code plugin bundling skills, agents, and bilingual specifications for Home Assistant development — custom integrations, Lovelace cards, blueprints / automations, and ESPHome / add-on work.
repo: https://github.com/nolte/claude-home-assistant
homepage: https://nolte.github.io/claude-home-assistant
tags: ["claude-code", "home-assistant", "developer-tooling", "skills", "agents", "ai"]
lang: en
translationKey: claude-home-assistant
archived: false
order: 2
---

claude-home-assistant is a Claude Code plugin that packages the skills, agents,
and specifications I use to build Home Assistant artifacts. Instead of explaining
the same HACS conventions and config-flow patterns to an AI assistant over and
over, that knowledge lives in one installable plugin and gets pulled in when it
is relevant.

## What you get

- **Skills.** Focused, on-demand workflow primitives Claude Code reaches for when
  relevant — config-flow scaffolding, Lovelace card boilerplate, blueprint
  authoring, ESPHome component patterns, and more.
- **Agents.** Larger, autonomous helpers for multi-step tasks, such as wiring a
  new integration end-to-end or validating a card against a live HA instance.
- **Specifications.** Bilingual source-of-truth documents under `spec/` that
  govern every skill and agent.

## Scope

The plugin covers the four most common Home Assistant authoring surfaces:

- **Custom integrations (Python)** — `custom_components/<domain>/`, config flows,
  coordinators, entities, and tests against `pytest-homeassistant-custom-component`.
- **Lovelace cards (TypeScript / JavaScript)** — Lit-based custom cards,
  HACS-conformant packaging, `hass`-object usage, and `card-mod` patterns.
- **Blueprints & automations (YAML)** — automation and script blueprints, Jinja
  templates, and the `packages/` layout.
- **ESPHome / add-ons** — ESPHome custom components and Home Assistant add-ons
  (Docker / s6).

## How it's built

The plugin installs into Claude Code through its marketplace mechanism, or runs
locally with `claude --plugin-dir .`. Automation goes through a `Taskfile.yml`
(`task lint`, `task test`, `task docs`), documentation is an MkDocs site
published to GitHub Pages, and it ships under the MIT license. It is the tooling
that drives projects like the
[Kamerplanter Home Assistant integration](https://github.com/nolte/kamerplanter-ha).
