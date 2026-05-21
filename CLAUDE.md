# Project Instructions for Claude Code

This repository is a bilingual (English-primary, German-secondary) blog and
knowledge base built with **Astro 5 + Tailwind 4 + Content Collections**. The
posts are AI-drafted and human-curated. The site deploys to GitHub Pages.

## Hard rules

- **Every post must exist in both languages.** A new English post is incomplete
  until its German counterpart sits next to it under the same `translationKey`.
- **English is the source language.** Always draft EN first, then translate to
  DE. Do not write a DE-only post unless explicitly told to.
- **Never invent technical facts about projects.** When a post claims a project
  does X, that claim must be grounded in source code, README, release notes,
  or an explicit user briefing — not in plausible-sounding guesses.
- **Do not remove the `aiGenerated: true` flag.** Transparency about the
  authoring process is a project value.

## Post anatomy

A post lives in `src/content/posts/<lang>/<slug>.md` (or `.mdx`).

```yaml
---
title: "..."                # plain text, no markdown
description: "..."          # 1–2 sentences, used in OG/RSS
pubDate: 2026-05-21         # ISO date
updatedDate: 2026-05-22     # optional
lang: en                    # or "de"
translationKey: my-post     # SAME slug in both languages — this binds them
tags: ["..."]
heroImage: "/og/foo.png"    # optional
draft: false                # true hides from build
portfolioProject: repo-name # optional, links to projects collection
aiGenerated: true           # leave true unless you wrote it by hand
---
```

**`translationKey` is the contract.** The EN file and DE file MUST share the
same `translationKey`. The router uses it to link translations together.

## Slugs

- Filenames stay identical across languages: `en/my-post.md` ↔ `de/my-post.md`.
- The English slug drives the URL on both sides. Even if you translate the
  title, leave the slug English.
- Keep slugs lowercase, hyphenated, ≤ 60 chars.

## Tone and voice

- **First person, conversational, direct.** Not corporate. Not a tutorial that
  begins with "In today's fast-paced world…".
- **Show the thinking, not just the conclusion.** When a decision was hard, say
  why it was hard.
- **No hype words.** Avoid "leverage", "delve", "robust", "seamless", "in
  today's modern landscape", emoji bullet headers.
- **Code blocks need a language tag.** ` ```ts `, ` ```bash `, etc.
- **Headings use sentence case**, not Title Case.

## Translation rules (EN → DE)

- Translate meaning, not words. Idiom for idiom.
- Keep technical identifiers (function names, file paths, CLI flags) untouched.
- German uses sharp-s `ß` and umlauts — not `ss`, `ae`, `oe`, `ue`.
- Quotes: English uses `"…"`, German uses `„…"`.
- Em-dashes in English ` — `, in German also ` — ` (with spaces, en-dash also
  acceptable for ranges).

## Authoring workflow (interactive)

1. The user briefs Claude on a topic (sometimes pointing to a portfolio repo
   or a transcript).
2. Claude drafts the EN post in `src/content/posts/en/<slug>.md`.
3. Claude translates to DE in `src/content/posts/de/<slug>.md` with the same
   `translationKey`.
4. Claude runs `npm run build` (or `npm run check`) to verify both files
   compile and links resolve.
5. The user reviews, requests edits, then commits.

## File layout cheatsheet

```
src/
  components/   Header, Footer
  content/
    posts/
      en/       English posts
      de/       German posts
    projects/   Project metadata (bilingual)
  i18n/ui.ts    UI string translations
  layouts/      BaseLayout, PostLayout
  pages/
    index.astro          EN landing
    blog/                EN blog list + post route
    projects/            EN project list
    about.astro
    404.astro
    rss.xml.ts           EN feed
    de/                  DE mirror of all of the above
```

## What NOT to do

- Don't introduce a new language without updating `LOCALES`, `i18n/ui.ts`,
  the content schema enum, the routing, and both RSS endpoints.
- Don't add a CMS, an admin panel, or runtime JS unless a post genuinely needs
  it. The site is static and should stay that way.
- Don't add tracking/analytics without asking — privacy is the default.
- Don't ship a draft. `draft: true` hides from build, but git history is
  public. Squash or delete if you change your mind.

## Useful commands

Both `task <name>` and `npm run <name>` work; `task` is preferred for
consistency with the other nolte repos.

- `task dev` — local server on http://localhost:4321
- `task build` — production build into `dist/`
- `task check` — TypeScript + content schema validation
- `task preview` — serve the production build locally
- `task new-post POST=my-slug` — scaffold a draft EN/DE post pair
- `task clean` — remove `dist/` and `.astro/`

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml` which builds and
publishes to GitHub Pages. The first deploy needs GitHub Pages enabled in
repo settings (Source: GitHub Actions). If a custom domain is added later,
update `site` and `base` in `astro.config.mjs`.
