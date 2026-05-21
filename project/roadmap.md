# Roadmap

This file is the project's work queue, governed by
[`spec/project/roadmap/`](../spec/project/roadmap/en.md). Detail-level and
lifecycle invariants are enforced by the `roadmap-refine` skill; adds,
edits, retargeting, and MVP flag flips are owned by `roadmap-planner`. Do
not add or edit items by hand without going through one of those skills.

Item identifiers (`R-<n>`) are monotonic and **never reused** across the
project's lifetime, even after deletion. The queue starts empty by design;
`roadmap-planner` begins its counter at `R-1`. Once `project/mission.md`
exists, every item will carry an `mvp: true | false` flag whose location is
defined in the roadmap spec and whose semantics live in
[`spec/project/mission/`](../spec/project/mission/en.md).

## Queue

<!-- Items are added by the `roadmap-planner` skill. Do not edit by hand. -->

### R-1 — Bilingual welcome site live on GitHub Pages

```yaml
id: R-1
title: Bilingual welcome site live on GitHub Pages
detail: fine
outcomes: [O-1, O-2]
target_sprint: 1
status: proposed
```

The first publicly reachable version of the site: bilingual EN / DE
landing, language switch, and a single welcome post pair, deployed to
GitHub Pages via the `.github/workflows/deploy.yml` workflow. This item
is the sprint-1 verifier — its first feature carries
`verifies_sprint_value` once authored by `feature-decompose`.

Intended features:

- [ ] Deploy Astro site to GitHub Pages with bilingual landing
- [ ] Language switcher in header with translation linkage

### R-2 — First three portfolio-derived blog posts (EN + DE pairs)

```yaml
id: R-2
title: First three portfolio-derived blog posts (EN + DE pairs)
detail: fine
outcomes: [O-2, O-5]
target_sprint: 1
status: proposed
```

Three real posts drawn from existing portfolio projects, each available
in English and German, demonstrating the AI-drafted human-curated
authoring workflow on actual content.

Intended features:

- [ ] First portfolio post (EN + DE pair)
- [ ] Second portfolio post (EN + DE pair)
- [ ] Third portfolio post (EN + DE pair)

### R-3 — Tag and topic index pages in both languages

```yaml
id: R-3
title: Tag and topic index pages in both languages
detail: fine
outcomes: [O-3]
target_sprint: 1
status: proposed
```

Per-language tag landing pages and a topic overview that let the author
find his own past posts by subject without grepping the source tree.

Intended features:

- [ ] Per-language tag landing pages
- [ ] Topic overview page

### R-4 — AI-disclosure UX

```yaml
id: R-4
title: AI-disclosure UX
detail: fine
outcomes: [O-4]
target_sprint: 1
status: proposed
```

Visible AI-disclosure: per-post badge, About-page explanation of the
AI-drafted human-curated workflow, link from the badge to the authoring
conventions.

Intended features:

- [ ] Per-post AI-disclosure badge with link
- [ ] About-page section explaining the AI-drafted workflow
