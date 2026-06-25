---
name: claude-shared
description: A plugin monorepo of reusable Claude Code skills, agents, and bilingual specifications that I share across my whole portfolio — one source for the review habits, workflows, and conventions every repo would otherwise duplicate.
repo: https://github.com/nolte/claude-shared
homepage: https://nolte.github.io/claude-shared
tags: ["claude-code", "developer-tooling", "skills", "agents", "specifications", "ai"]
lang: en
translationKey: claude-shared
archived: false
order: 3
---

claude-shared is the foundation the rest of my Claude Code tooling builds on. I
run Claude Code across about a dozen repositories, and the workflows it needs —
pull-request conventions, review habits, spec authoring, documentation structure
— used to live duplicated in each repo's `CLAUDE.md`. That drifted. This is where
the shared baseline lives instead.

## What it ships

It's a plugin monorepo with three plugins:

- **`nolte-shared`** — the common delivery-lifecycle bundle: spec authoring,
  pull-request workflow, documentation scaffolding, audits, and the
  parallel-working-copies conventions.
- **`nolte-media`** — image generation and media processing.
- **`nolte-engineering`** — implementation, test, and code-audit capabilities for
  code repositories.

After install, every skill is callable as `/<plugin>:<name>` — for example
`/nolte-shared:spec` or `/nolte-shared:working-copy-start`.

## The three building blocks

- **Skills.** Focused, on-demand workflow primitives invoked through Claude
  Code's `Skill` tool — scaffolding a worktree, opening a spec-conformant pull
  request, auditing prose, curating release notes.
- **Agents.** Specialized sub-agents with focused tool access — reviewers,
  explorers, planners — dispatched by skills or directly when the caller knows
  which one it wants.
- **Specifications.** Bilingual source-of-truth documents under `spec/` that
  govern every skill and agent, so the behavior is grounded in a written rule
  rather than a prompt that drifts.

## How it's built

Automation runs through a `Taskfile.yml` (`task lint`, `task test`, `task docs`),
documentation is an MkDocs site published to GitHub Pages, and it ships under the
MIT license. It's the tooling layer behind projects like
[claude-home-assistant](https://github.com/nolte/claude-home-assistant) and the
workflows I write about on this blog.
