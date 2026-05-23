---
title: "Why I run one Claude Code plugin across every repo"
description: "How I stopped duplicating CLAUDE.md snippets across projects and extracted everything reusable into a single shared plugin called nolte-shared."
pubDate: 2026-05-23
updatedDate: 2026-05-23
lang: en
translationKey: claude-shared-baseline
tags: ["claude-code", "plugins", "developer-tools", "portfolio"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

I run Claude Code across about a dozen repos — this blog, home-automation tools, Ansible playbooks, cookiecutter templates. Until a few months ago, the workflows Claude needed in each lived in each repo's `CLAUDE.md`, and that stopped working. The shared baseline now lives in one place: a plugin called `nolte-shared`, source at [`nolte/claude-shared`](https://github.com/nolte/claude-shared). This post is why I extracted it and what it actually contains.

## The drift you don't see until it bites

For a while, the duplication felt fine. I'd write a `## Pull request conventions` block in one repo's `CLAUDE.md`, copy it into the next, tweak a couple of lines, move on. The repos worked. Each Claude session had what it needed.

The problem showed up the third time I had to change something. I'd added a stricter PR-title rule in one repo (Conventional Commits with a required scope), and Claude in that repo respected it. In the other repos, Claude was still suggesting bare `feat: ...` titles, because the duplicated blocks were a quarter-stale and nobody updated them. The same drift was hiding in the review prompts and the Vale vocabulary references — a baseline I could no longer trust.

Visually, the move from a dozen drifting copies to one plugin looks like this:

```text
Before                              After

  repo A  ──  CLAUDE.md (v3)         repo A  ──┐
  repo B  ──  CLAUDE.md (v1)         repo B  ──┤
  repo C  ──  CLAUDE.md (v3)         repo C  ──┼──▶  nolte-shared plugin
  repo D  ──  CLAUDE.md (v2)         repo D  ──┤
  repo …  ──  CLAUDE.md (v?)         repo …  ──┘

  many copies, drifting              one source, no drift
```

Same set of repos either way. The difference is whether the workflows they share live in one place or twelve.

## What `nolte-shared` actually contains

The plugin sits in [`nolte/claude-shared`](https://github.com/nolte/claude-shared) at commit `fc0ef69` as I write this, version `0.1.3`. It ships three categories of artefact:

- **Skills** under `skills/<name>/SKILL.md` — invocable as `/nolte-shared:<name>`. Examples include `pull-request-create`, `pull-request-merge`, `quality-gate`, `dependency-audit`, `skill-management`, and `spec`.
- **Agents** under `agents/<name>.md` — focused sub-agents with narrower tool access, dispatched by skills or by the `Task` tool. Examples include `claude-plugin-developer`, `prose-vale-curator`, and `docs-freshness-checker`.
- **Specifications** under `spec/` — bilingual Markdown (canonical English, German translation kept in sync) describing the contract each skill or agent implements.

What makes it more than a `CLAUDE.md` collection is the third bucket. Every skill in the plugin has a spec it implements. If the skill drifts from its spec, the `skill-review` skill catches it and writes an actionable review plan; if the spec itself contradicts another spec, `spec-readiness-reviewer` flags it. The Claude Code [plugin documentation](https://docs.claude.com/en/docs/claude-code/plugins) handles distribution; the specs handle correctness.

## Why a plugin and not the alternatives

I considered three other shapes before landing on a plugin.

A git submodule that vendored the shared `CLAUDE.md` fragments into each repo would have kept the files local. But `git submodule update` is, in my experience, one of the most painful workflows in git tooling, and submodules version code, not capabilities. Every repo would have pinned a specific SHA, and updates would have been a constant chore.

A simple copy-script that synced `~/.claude/skills/` from a central repo crossed a hard line. The skill-management spec at `spec/claude/skill-management/` is explicit: plugin-owned skills must not be distributed by copying or symlinking into a consumer's `.claude/skills/`. Distribution is the plugin mechanism's job, and the reason is exactly the drift problem above — a copy is a stale copy the moment it lands.

A monorepo containing the shared bits plus all the consumer projects would have collapsed twelve repositories into one. The Claude side would have stayed consistent — but everything else (CI scope, release cadence, dependency upgrades, GitHub Actions costs) would have gotten worse. Sharing the Claude baseline doesn't justify sharing everything else.

A plugin gives me three things at once: a marketplace install path for normal consumers (`/plugin install nolte-shared@nolte-shared`), a versioned `.claude-plugin/plugin.json` that the release workflow updates on every tag, and a dev-mode loop (`claude --plugin-dir /path/to/claude-shared` plus `/reload-plugins`) for iterating on the plugin from inside its own repo. That last loop — using the plugin to develop the plugin — is what makes the whole thing sustainable.

## Dogfooding: the plugin develops itself

The `claude-shared` repo applies its own specs to itself. Its roadmap (`project/roadmap.md`) follows `spec/project/roadmap/`; the `sprint-execute` skill manages its sprints (`project/sprints/`); `pull-request-create` opens its pull requests and `pull-request-merge` lands them, both following `spec/project/pull-request-workflow/`. The spec governs the repo; the skill enforces the spec; both ship in the same plugin.

This is the cheapest reality check I know. If a spec is unworkable, the first place it falls apart is here, in the repo that owns it; if a skill produces awkward output, I notice it on the next PR I open, not on the next consumer who installs it. The fix lands in the same PR — with the spec, with the skill, with the example. Roadmap item `R-1` ("Planning-suite dogfood adoption complete") is the explicit commitment to keep doing this before anything migrates to consumer repos.

## Outside scope and what's next

A few things this post deliberately doesn't cover.

The release pipeline — getting from a `develop` merge to a published `v0.1.4` that consumers can install — is tracked as `R-2` on the roadmap, blocked by a small `ci.yml` `workflow_dispatch` gap. Until that lands, the marketplace path works for releases I publish manually; the `--plugin-dir` loop covers everything else.

The spec corpus is still labelled `Status: draft` end-to-end. That's not because the specs are unfinished — they describe real running code — but because the lift from `draft` to `accepted` is a deliberate gate I want to make explicit, not a default. A few specs are close; others will stay `draft` for a while because they have open questions I haven't answered yet.

If you want to see what a self-applied plugin looks like in practice, the entry point is the [`README`](https://github.com/nolte/claude-shared#readme); the more interesting reading is in [`spec/claude/`](https://github.com/nolte/claude-shared/tree/develop/spec/claude/), where the contracts live.
