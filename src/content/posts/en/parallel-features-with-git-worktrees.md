---
title: "Two features, one checkout, and the mess in between"
description: "Switching branches in place to juggle parallel features quietly destroys your working tree. Git worktrees give each feature its own working copy — here's the danger they remove and the conventions that keep them safe."
pubDate: 2026-06-25
lang: en
translationKey: parallel-features-with-git-worktrees
tags: ["git", "worktrees", "claude-code", "workflow", "developer-tools"]
draft: false
portfolioProject: claude-shared
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Here is a situation I hit almost every week. A long build is running on `feat/mermaid-diagrams`. While it churns, I want to draft an unrelated spec on `feat/parallel-working-copies`. One repository, one checkout, two features that have nothing to do with each other. So I do the obvious thing: `git switch feat/parallel-working-copies` and start typing.

That obvious thing is the mistake. This post is about why, and about the git feature that makes the mistake unnecessary.

## The danger isn't merge conflicts

When people warn about developing two features at once, they usually mean merge conflicts. But git is good at merge conflicts — that's a `git merge` or `git rebase` concern and it resolves the same whether or not the work happened side by side. The real damage happens earlier, and it happens silently.

A single checkout holds exactly one branch at a time. The moment I switch branches in place, the working tree of the branch I just left is gone — not from history, but from my disk. Concretely:

- **Uncommitted edits collide.** Anything I hadn't committed on the paused branch either blocks the switch or gets stashed into a pile I have to remember to reapply onto the *right* branch later. Reapply it onto the wrong one and you've smeared feature B's half-finished change across feature A's commit.
- **Build outputs invalidate.** The artifacts on disk now belong to a different branch. The next build is a cold build, and any incremental tooling throws its cache away.
- **IDE indexes thrash.** Language servers re-index, watchers re-scan, and everything that cached the current state has to rebuild it.
- **Tooling that pinned the working directory re-bootstraps.** This is the one that bites me hardest with AI assistants: a Claude Code session that had built up context about the files in front of it is now pointed at a different tree, and it has to start over.

None of this shows up as an error. It shows up as friction, as a stash you forgot, as twenty minutes of "why is this rebuilding," as a commit that quietly carries a line it shouldn't. The cost of parallel features in one checkout isn't the conflict at the end — it's the slow corruption of state along the way.

## What a worktree actually is

`git worktree` removes the premise that one repository equals one working tree. It adds a second working tree that shares the same `.git` object database but has its own independent index, its own working files, and its own `HEAD`.

```bash
git fetch origin develop
git worktree add -b feat/parallel-working-copies \
  ~/repos/.worktrees/blog/parallel-working-copies origin/develop
```

That is not a clone. There is one object store, so no duplicated history and no extra remotes to keep in sync. But the two branches now live in two directories that never touch each other's files. The build on `feat/mermaid-diagrams` keeps its artifacts; the spec draft gets a clean tree; each Claude Code session stays anchored to its own directory. The collision I described above simply cannot happen, because there is nothing to collide with.

## The conventions that keep it from drifting

A worktree used carelessly grows its own failure modes, so across my repositories the rules live in a spec — [`spec/project/parallel-working-copies/`](https://github.com/nolte/claude-shared/blob/develop/spec/project/parallel-working-copies/en.md) in the [`claude-shared`](https://github.com/nolte/claude-shared) plugin. A few of the load-bearing ones:

- **The primary checkout stays on `develop`, always.** It is not where features get built — it is the launchpad every feature worktree branches off, and the stable place to do integration work like rebases and release inspection. Even with only one feature in flight, that feature gets its own worktree. A single in-place switch destroys the launchpad role.
- **Worktrees live outside the primary checkout.** They go under a configurable root (`${NOLTE_WORKTREE_ROOT:-~/repos/.worktrees}/<repo>/<slug>/`), never nested inside the repo — and explicitly never inside `.claude/`, which plugin tooling may rewrite wholesale. Hiding a nested worktree behind a `.gitignore` entry is forbidden too: drift you can't see in `git status` is drift that accumulates.
- **One branch per worktree, and you only move a branch from inside the worktree that owns it.** Re-pointing a branch with `git branch -f` from somewhere else slides the ref out from under its working tree — which then shows the new files as uncommitted "changes" it never made. The fix is to do the merge or rebase from inside the worktree: `git -C <worktree> merge origin/develop`.
- **A plan goes on disk before the work does.** Each worktree gets a `.resume/<slug>/plan.md` — goal, current state, the load-bearing decision, the ordered steps — written before substantive work begins. It's gitignored, so it never competes with the real diff for review attention, but it means a crashed or interrupted session can be reopened from a known point rather than reconstructed from a half-finished change.

One of these rules isn't left to discipline. A pre-commit hook, `guard-primary-checkout`, blocks any commit made in the primary checkout while it's off `develop`, and stays inert inside linked worktrees. The rest of the spec is documentary — enforced by practice — but the most common slip, committing feature work straight into the primary checkout, is caught mechanically.

## Automating the start

Setting all that up by hand every time would guarantee I cut corners. So the creation path is a single command, `task worktree:add -- <branch> [slug]`, which resolves the root, branches off `origin/develop`, keeps the primary checkout untouched, and seeds the `.resume/<slug>/plan.md` stub.

Above that sits a Claude Code skill, `working-copy-start`. I tell it I want to start `feat/whatever`, and it runs the worktree creation, walks me through filling in the plan stub, and then hands off so the actual work happens in a fresh top-level session launched from the worktree — which matters because only a top-level session's transcript is independently resumable with `claude --resume`. The skill deliberately stops at the handoff: it sets the stage, it doesn't do the feature work.

## Reintegrating and cleaning up

The end of a worktree's life is unremarkable, which is the point. The branch is pushed and the PR opened exactly as it would be from a primary checkout — there is nothing worktree-specific about it. Two things are worth stating, though:

- **The quality gate runs inside the worktree.** A green gate in a different worktree is not evidence for this one; each has its own working tree, so each proves itself.
- **The PR mechanics are their own skills.** `pull-request-create` composes the branch into a conformant PR; `pull-request-merge` runs the pre-merge review, applies labels, and triggers the squash-merge onto `develop`. The worktree is just where the branch happened to live.

Cleanup has one rule that matters more than the rest: never `rm -rf` a worktree. Deleting the directory leaves git's bookkeeping behind, and the worktree lingers as a "missing" entry forever. Retire it properly:

```bash
git worktree remove ~/repos/.worktrees/blog/parallel-working-copies
git branch -d feat/parallel-working-copies   # -D if it was squash-merged
git worktree prune                            # reap any stale administrative entries
```

The primary checkout is the one worktree you never remove — it's the root the others are linked to, not a disposable copy.

## The shape of it

Parallel feature work used to mean a careful dance of stashes and a quiet worry that I'd reapply the wrong one. Worktrees turn it into something boring: each feature has a directory, the directories don't see each other, the primary checkout sits on `develop` and waits. The spec and the `working-copy-start` skill exist so the boring version is also the easy version — so the path of least resistance is the one that doesn't corrupt state along the way.
