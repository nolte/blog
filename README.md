# blog

Bilingual (EN primary, DE secondary) knowledge base and project log,
AI-drafted and human-curated.

## Stack

- **Astro 5** with Content Collections
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **MDX** for posts that need embedded components
- **GitHub Pages** for hosting

## Local development

```bash
task install     # or: npm install
task dev         # or: npm run dev — http://localhost:4321
task build       # or: npm run build
task check       # or: npm run check
```

Run `task` (no args) for the full list. A `task new-post POST=my-slug`
scaffolds a draft EN/DE post pair with the correct frontmatter.

## Writing posts

Posts live in `src/content/posts/<lang>/<slug>.md`. Every post must exist in
both `en/` and `de/`, linked by a shared `translationKey` in the frontmatter.
See [`CLAUDE.md`](./CLAUDE.md) for the full authoring conventions and the
prompt-driven workflow.

## Project structure

```
src/
├── components/     # Header, Footer
├── content/
│   ├── posts/      # Blog posts (en/ and de/ subfolders)
│   └── projects/   # Project entries shown on /projects
├── i18n/           # UI string translations
├── layouts/        # BaseLayout, PostLayout
├── pages/          # Routes — EN at root, DE under /de/
└── styles/
```

## Deployment

`main` deploys automatically via `.github/workflows/deploy.yml`. Enable
GitHub Pages in repo settings with **Source: GitHub Actions** for the first
deploy. Adjust `site` and `base` in `astro.config.mjs` when a custom domain
is added.

## License

Personal blog — content © Nolte. Code is released under MIT (see `LICENSE`).
