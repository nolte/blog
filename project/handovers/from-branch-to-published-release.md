# Blog-author delivery contract — from-branch-to-published-release

Slug / translationKey: `from-branch-to-published-release`
Pair: `src/content/posts/en/from-branch-to-published-release.md` + `src/content/posts/de/from-branch-to-published-release.md`
primaryAudience: A (technical readers) · secondaryAudiences: [B] (portfolio reviewers)

## Self-check manifest

### Per-language block — EN

- a-1 primaryAudience declared: passed (A)
- a-2 secondaryAudiences declared: passed ([B])
- a-3 voice (first person, conversational, direct): passed
- a-4 forbidden-words list clean (leverage/delve/robust/seamless/…): passed
- a-4a LIX corridor (EN aim ≤ 45): passed (LIX 39)
- a-5 headings sentence-case: passed
- a-6 code blocks language-tagged (yaml, mermaid): passed
- a-7 bilingual typography (EN straight quotes, spaced em-dash): passed
- a-8 every named-project/tool claim grounded in a source: passed (see source-to-claim mapping)
- D2 jargon glosses for secondary audience B: passed (Conventional Commits, squash-merge, fast-forward, HACS glossed)
- D1 paragraph ≤ 3 sentences: passed (CI-gate paragraph split during repair)

### Per-language block — DE

- a-1 / a-2 audience fields identical to EN: passed
- a-3 voice mirrors EN (idiom-for-idiom): passed
- a-4 forbidden-words clean: passed
- a-4a LIX corridor (DE aim ≤ 50): passed (LIX 42)
- a-5 headings sentence-case (German noun-capitalisation correct): passed
- a-7 bilingual typography (`„…"`, spaced em-dash, ä/ö/ü/ß, no ASCII substitutes): passed
- D2 jargon glosses mirrored: passed
- D4 address register (`du`): finding dismissed — consistent informal address is the consumer voice contract for blog posts (CLAUDE.md §Tone and voice)

### Per-pair block

- translationKey identical (en/de): passed (`from-branch-to-published-release`)
- file slug identical: passed
- audience fields identical: passed (A / [B])
- aiGenerated flag set in both: passed (`true`)
- build command green: passed (`npm run build`, clean build, 23 pages built, both post pages rendered)
- language-switcher EN↔DE flip in dev server: passed — verified against a running `npm run dev` server. EN page (`/blog/blog/from-branch-to-published-release/`, HTTP 200) links to the DE counterpart and the DE page (`/blog/de/blog/from-branch-to-published-release/`, HTTP 200) links back to EN, via both the visible header switcher and the `<head>` hreflang alternate. Rendered titles/H1 correct in both languages (umlauts intact).

## Source-to-claim mapping

Every technical claim is grounded in the portfolio spec corpus under `nolte/claude-shared` (read by the operator before drafting) and the reusable workflows under `nolte/gh-plumbing`.

| Post passage (heading · claim) | Source |
|---|---|
| "Two branches…" · develop = integration, main = release-presentation, no manual writes to main | `spec/project/branching-model/` §Branch roles |
| "Two branches…" · feature-branch prefixes feat/fix/chore/docs/exp; prefix = Conventional-Commits type; exp/ throwaway | `spec/project/branching-model/` §Branch roles |
| "Two branches…" · branch protection declared as code in .github/settings.yml via Probot Settings app | `spec/project/branching-model/` §Branch protection |
| "How a feature lands…" · rebase onto develop, strict require-up-to-date | `spec/project/pull-request-workflow/` §Branch freshness |
| "How a feature lands…" · 5-section PR template (Summary/Changes/Linked issues/Testing/Risk) + PR-lint required check | `spec/project/pull-request-workflow/` §PR description structure, §PR lint workflow |
| "How a feature lands…" · CI gate, enforce_admins true, automerge via label, squash-only, delete_branch_on_merge | `spec/project/pull-request-workflow/` §CI gate, §Merge strategy, §Automerge trigger protocol, §Post-merge branch cleanup |
| "How a feature lands…" · fix-forward, no force-push except rebase | `spec/project/pull-request-workflow/` §Fix-forward on red checks |
| "Cutting a release…" · release-drafter maintains draft on develop | `spec/project/branching-model/` §Required GitHub workflows; `spec/project/release-automation/` §Context |
| "Cutting a release…" · chore(release): <tag> aligns version-bearing files before publish | `spec/project/release-automation/` §Version-bearing file alignment, §Pre-publish verification |
| "Cutting a release…" · release-publish.yml workflow_dispatch-only flip; gh release edit --draft=false fallback only | `spec/project/release-automation/` §Workflow existence and trigger, §Operational contract |
| "Cutting a release…" · release-cd-refresh-master.yml on release:published fast-forwards main | `spec/project/branching-model/` §Required GitHub workflows; `spec/project/release-automation/` §Permissions and protection |
| "Cutting a release…" · release-notes-curate (A) + release-publish-trigger (B) skill layer; never publish directly | `spec/project/release-skill-layer/` §Skill A, §Skill B |
| "Publishing packages and docs" · release-cd-deliver-docs.yml on release:published publishes MkDocs via reusable-mkdocs.yaml | `spec/project/project-structure/` §Release and documentation workflows |
| "Publishing packages and docs" · repo-specific release.yml (HACS ZIP, PyPI dist, ghcr.io image) on release:published; artifact taxonomy per project type | `spec/project/project-structure/` §Release workflows; `spec/project/release-artifact/` §Artefact taxonomy |
| "What this costs" · operator-driven fallback alignment (PR + UI squash-merge); GITHUB_TOKEN release:published doesn't cascade | `spec/project/release-automation/` §Fallback path, §Permissions and protection |

No source is unused. No claim names a third party without grounding. No private communication is quoted.

## Handover manifest

- **Route**: target-state — dispatched `nolte-shared:lektorat-apply` (operation `audit`) via the `lektorat-scanner` agent. Audit trail: `.audits/lektorat/2026-06-07-1844/`. 0 critical, 7 warning (all fixed), 5 suggestion (4 fixed, 1 dismissed with rationale).
- **Build status**: green — `npm run build` (clean build after repairs), 23 pages built, both `/blog/from-branch-to-published-release/` and `/de/blog/from-branch-to-published-release/` rendered.
- **Repository state**: branch `post/from-branch-to-published-release` (worktree `.claude/worktrees/post+release-workflow`), based on `develop` @ dc8f050. Not yet committed — staging, commit, and PR creation remain the operator's call (`nolte-shared:pull-request-create`).
