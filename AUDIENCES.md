# Audiences — Blog / Knowledge Base

<!--
Produced via the `audience-identify` skill, following
spec/project/audience-identification/.
Do not add audiences without first declaring the bounded context below.
-->

## Bounded context

This repository is a bilingual (English primary, German secondary) static
Astro blog that doubles as a personal knowledge base. Two purposes: (a)
public surface for the author's portfolio software projects, (b) a
searchable personal knowledge base for future-self consultation. Posts are
AI-drafted interactively via Claude Code and human-curated before publish.
Deployment is GitHub Pages.

**Inside the boundary**

- The Astro site (layouts, pages, content collections for posts and projects)
- The AI-authoring workflow (`CLAUDE.md`, `Taskfile.yml`)
- The deploy pipeline (`.github/workflows/deploy.yml` to GitHub Pages)
- The bilingual post corpus under `src/content/posts/{en,de}/`

**Outside the boundary**

- The referenced portfolio repositories themselves (only linked, not embedded)
- External search or analytics services (not planned)
- The `claude-shared` plugin corpus
- The specs under `spec/` (methodology authority, not product content)

## Audiences

Each entry: label, relationship category, interaction surface, expectation,
documentation `track` (`user-docs` or `developer-docs` per
spec/project/docs-audience-tracks/), open questions, `confirmed` or `assumed`,
criticality (primary / secondary / peripheral). Mark a whole category as
`none — <reason>` when it does not apply.

Portfolio-baseline track defaults: `user` → `user-docs`; `contributor` /
`operator` / `release-manager` → `developer-docs`. Both tracks are served
here — no track-omission note required.

### Direct consumers

- **A. Technical readers** — _category_: direct-consumer ·
  _surface_: rendered website, RSS feed, search-engine hit ·
  _expects_: technically accurate posts, working code samples,
  "show your work" depth over surface overviews; bilingual availability ·
  _track_: `user-docs` · _status_: `assumed` · _criticality_: primary
  - Open questions: which subset of topics actually attracts traffic — to be
    re-evaluated after the first 10 posts are live.

- **B. Portfolio reviewers** — _category_: direct-consumer ·
  _surface_: landing page, `/projects`, `/about`, direct link from CV /
  LinkedIn ·
  _expects_: fast overview of projects and working style, signal of activity
  and quality; readable in either EN or DE ·
  _track_: `user-docs` · _status_: `assumed` · _criticality_: primary
  - Open questions: none.

- **C. Author as knowledge-base user** — _category_: direct-consumer ·
  _surface_: own bookmarks, tag index, search across posts ·
  _expects_: findability by tag / topic, durable explanations for
  re-reading; tolerates rougher drafts than external readers because the
  reader is the author ·
  _track_: `user-docs` · _status_: `assumed`
  (status kept assumed; operator deferred explicit confirmation) ·
  _criticality_: primary
  - Open questions: none.

### Operators

- **D. Author as site maintainer** — _category_: operator ·
  _surface_: git, GitHub Actions, local `task dev` / `task build`,
  `CLAUDE.md`, `Taskfile.yml`, `astro.config.mjs` ·
  _expects_: stable build pipeline (green deploy on every `main` push),
  clear authoring conventions, fast iteration, type-check and build as
  pre-publish safety net ·
  _track_: `developer-docs` · _status_: `assumed` · _criticality_: secondary
  - Open questions: none.

- **E. Claude Code as AI co-operator** — _category_: operator ·
  _surface_: `task` targets, post-drafting workflow, frontmatter curation,
  Astro config maintenance, spec corpus under `spec/` ·
  _expects_: deterministic Taskfile targets, readable `CLAUDE.md` conventions,
  reproducible build steps, clear spec contracts so authoring decisions are
  derivable rather than guessed ·
  _track_: `developer-docs` · _status_: `assumed` · _criticality_: secondary
  - Open questions: none.

### Contributors / maintainers

- `none — strictly personal blog, no external contributions expected.`

### Governing parties

- `none — static personal blog with no data-collecting features, no external
  sign-off relationship; AI-disclosure handled internally via per-post
  frontmatter (aiGenerated flag).`
  - Open questions: governance needs are expected to surface later (see
    cross-cutting Open Questions below); explicitly tracked rather than
    silently dismissed.

### Indirect audiences

- **L. People and projects named in posts** — _category_: indirect ·
  _surface_: posts that discuss, compare, or critique external projects /
  libraries / decisions ·
  _expects_ (without knowing): fair and accurate portrayal, no confidential
  information leakage, plausible avenue for correction ·
  _track_: `user-docs` · _status_: `assumed` · _criticality_: peripheral
  - Open questions: should the site expose a contact / correction channel
    explicitly?

- **M. Search-engine crawlers and LLM trainers** — _category_: indirect ·
  _surface_: HTML meta tags, sitemap.xml, RSS feeds, `robots.txt` ·
  _expects_ (without knowing): well-formed metadata, sitemap, RSS for
  indexing; clear opt-in / opt-out signals (e.g., `robots.txt` directives,
  `ai.txt` or `noai` headers for LLM crawlers) ·
  _track_: `developer-docs` · _status_: `assumed` · _criticality_: peripheral
  - Open questions: actively opt LLM crawlers out (via `robots.txt`,
    `ai.txt`, `noai` headers) or remain permissive? Defer to a feature-level
    decision.

## Open questions (cross-cutting)

- **Governance category may grow.** Today recorded as `none` for the
  governing-parties category, but the operator explicitly flagged that
  governance needs are likely to emerge. Trigger candidates for a revisit:
  adding analytics, comments, a newsletter, regulated content (EU AI Act
  developments around synthetic-content disclosure), or material changes to
  GitHub Pages content policy.
- **Final ranking among primary direct consumers (A / B / C) is not yet
  decided.** All three are tagged `primary` ungrouped; the relative ordering
  among them needs real usage data before it can be committed.
- **LLM-crawler stance.** Open question carried by audience M; resolution is
  a feature-level decision that touches `public/robots.txt` and possibly
  meta tags.
- **First confirmed audience.** No audience is currently `confirmed`.
  The cheapest first confirmation is C (the author as KB-user) — once the
  search / tag UX exists and is used at least once, that entry can be
  promoted from `assumed` to `confirmed`.

## Revisit triggers

Re-run `audience-identify revisit` when any of the following changes:

- A new audience surface is introduced (comment system, newsletter,
  analytics, mailing list, public API for an external integration).
- A regulated content class enters the corpus (medical, financial, legal,
  political opinion at scale, content involving identified third parties).
- An external contributor pattern emerges (PRs, guest posts, translations
  by someone other than the author) — the contributors-category `none`
  needs to flip.
- A governance trigger fires (EU AI Act regulation lands; GitHub Pages TOS
  change; analytics decision made).
- The site grows a second deployment target beyond GitHub Pages.
- Real traffic data exists and the primary-direct-consumer ranking can be
  decided empirically rather than asserted.
