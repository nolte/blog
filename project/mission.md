---
mission_statement: A bilingual AI-drafted and human-curated knowledge base that turns the author's software-project work into durable English and German posts for technical readers, portfolio reviewers, and the author's own future-self.
relevant_outcomes: [O-1, O-2, O-4, O-5]
audiences: [A, B, C]
verifies_via: F-1:acceptance-2
time_bound:
  kind: mvp_completion
mvp_status: defining
created: 2026-05-21
revised_at: null
---

## Statement

A bilingual AI-drafted and human-curated knowledge base that turns the
author's software-project work into durable English and German posts for
technical readers, portfolio reviewers, and the author's own future-self.

- **Specific** — anchored in `mission_statement`; the project is a
  bilingual knowledge base, and the for-whom resolves to audience
  identifiers `A`, `B`, `C` from [`AUDIENCES.md`](../AUDIENCES.md).
- **Measurable** — anchored in `verifies_via: F-1:acceptance-2`; when
  the deployed EN and DE landings each link to at least one published
  post in their language, the mission is observably achieved.
- **Achievable** — anchored in the MVP scope flagged on roadmap items
  `R-1` (site live) and `R-2` (first portfolio-derived posts); the
  scope is one to two sprints' worth of hobby-scale capacity, well
  inside the spec's "two-to-five sprints" range.
- **Relevant** — anchored in `relevant_outcomes: [O-1, O-2, O-4, O-5]`
  from [`goals.md`](goals.md); the mission ties to bilingual
  readability (O-1), portfolio first-impression (O-2), AI-disclosure
  trust (O-4), and the portfolio-to-posts workflow (O-5). O-3
  (knowledge-base self-findability via tag/topic indices) is supported
  but not Mission-tragend — it ships post-MVP.
- **Time-bound** — anchored in `time_bound: { kind: mvp_completion }`;
  the mission is bound to the moment `mvp_status` reaches `achieved`,
  not to a calendar date (consistent with the sibling `sprint` spec's
  variable-duration cadence).

## Audiences

### A — Technical readers

Technical readers find the blog through search engines or RSS when they
need to understand a specific topic the author has worked through. The
MVP delivers them a live bilingual site that publishes posts which
exist as real EN + DE pairs without translation drift — they can read
in their preferred language and trust that the German and English
versions say the same thing. The verifying acceptance criterion on
F-1 makes that promise observable: the site is online, the landings
link to posts, the posts render with their language attribute set.
This is the minimum viable surface a technical reader needs to use the
blog as a knowledge resource at all.

### B — Portfolio reviewers

Portfolio reviewers arrive from CV or LinkedIn links and want a fast
sense of what the author builds. The MVP delivers a working public
site that links to the first portfolio-derived blog posts (R-2) —
proving the author publishes, in two languages, and that there is a
visible body of work tied to real projects. Reviewers form their
first-visit picture from the landing page plus one or two posts;
deeper navigation, search, and a curated project index come post-MVP.

### C — Author as knowledge-base user

The author uses the same public site as his own knowledge-base entry
point: he finds his own past explanations by remembering which post
discussed which topic. The MVP delivers him a deployed site he can
bookmark, a bilingual structure he wrote in, and the first content
seed (the welcome post plus the three portfolio-derived posts) to
grow from. The dedicated tag and topic indices (R-3) that would make
this audience truly self-served are explicitly post-MVP — for the
MVP, the linear chronological post list is sufficient because the
corpus is small enough to scan.

## Verification

The mission is verified by feature [F-1
`deploy-bilingual-site`](features/deploy-bilingual-site.md), acceptance
criterion **acceptance-2**, which reads verbatim:

> Both deployed landings (`/` for EN, `/de/` for DE) each link to at
> least one published post in their language.

When that checkbox flips to checked — observed manually on the deployed
GitHub Pages URL — the mission's Measurable letter is satisfied. The
feature carries `verifies_sprint_value: acceptance-2`, so the sprint
that contains F-1 (Sprint 0001) is also the sprint that closes the
mission's MVP.

## Source

- **Audience artefact:** [`AUDIENCES.md`](../AUDIENCES.md), last
  recorded commit `e0e40f877a0c11098e1e1b8436a2a9d704cd06f1`.
- **Outcomes source:** [`project/goals.md`](goals.md), last recorded
  commit `e0e40f877a0c11098e1e1b8436a2a9d704cd06f1`.
- **Verifying-feature source:** [`project/features/deploy-bilingual-site.md`](features/deploy-bilingual-site.md),
  feature ID `F-1`, criterion `acceptance-2`.
- **Author:** operator `nolte` via the `mission-define` skill,
  commit-pending. The repository's bootstrap commit at the time of this
  mission write is `e0e40f8`.
