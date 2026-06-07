# Blog-author delivery contract — github-token-vs-probot-app

Slug / translationKey: `github-token-vs-probot-app`
Pair: `src/content/posts/en/github-token-vs-probot-app.md` + `src/content/posts/de/github-token-vs-probot-app.md`
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
- D2 OIDC glossed for secondary audience B: passed (expanded to "OIDC (OpenID Connect)" on first use during lektorat patch)

### Per-language block — DE

- a-1 / a-2 audience fields identical to EN: passed
- a-3 voice mirrors EN (idiom-for-idiom): passed
- a-4 forbidden-words clean: passed
- a-4a LIX corridor (DE aim ≤ 50): passed (LIX 43)
- a-5 headings sentence-case (German noun-capitalisation correct): passed
- a-7 bilingual typography (`„…“`, spaced em-dash, ä/ö/ü/ß, no ASCII substitutes): passed (straight closing quotes corrected to `“` U+201C during lektorat patch; code-block quote at de:98 left byte-identical per refactor-safety)
- D3 grammar: passed (`entlang zu bewegen` → `entlangzubewegen` corrected during lektorat patch)
- D4 address register (`du`): consistent informal address is the consumer voice contract for blog posts (CLAUDE.md §Tone and voice)

### Per-pair block

- translationKey identical (en/de): passed (`github-token-vs-probot-app`)
- file slug identical: passed
- audience fields identical: passed (A / [B])
- aiGenerated flag set in both: passed (`true`)
- build command green: passed (`npm run build`, 25 pages built, both post pages rendered, Mermaid → SVG via Playwright)
- lektorat applied: `audit` + `patch` — 0 critical, 5 warning, 8 suggestion; all 13 applied, 0 skipped. Audit trail `.audits/lektorat/2026-06-07-2012/` (not committed). Re-build green after patch.

## Source-to-claim mapping

Every technical claim is grounded in this repository's own `.github/` configuration and in GitHub Actions' documented `GITHUB_TOKEN` behaviour. No claim about a project invents a fact.

| Post passage (heading · claim) | Source |
|---|---|
| "What the built-in token actually is" · GITHUB_TOKEN minted per run, repo-scoped, capped by `permissions:`; CI asks `contents: read` | `.github/workflows/ci.yml` (`permissions: contents: read`) |
| "The wall…" · events triggered by GITHUB_TOKEN do not start a new workflow run (recursion guard) | GitHub Actions documented behaviour; corroborated by sibling post `from-branch-to-published-release` §What this costs ("GITHUB_TOKEN release:published doesn't cascade") |
| "The wall…" · automerge squash-merges to develop; the push should wake release-drafter + deploy | `.github/workflows/automerge.yaml`, `.github/workflows/release-drafter.yml`, `.github/workflows/deploy.yml` (all on push to develop) |
| "The wall…" · publish should wake the workflow that fast-forwards main | `.github/workflows/release-publish.yml`, `.github/workflows/release-cd-refresh-master.yml` (on `release: [published]`) |
| "What a GitHub App gives you" · workflow mints an installation token from app-id + app-private-key; merge carries both tokens | `.github/workflows/automerge.yaml` (`app-id: ${{ vars.PORTFOLIO_APP_ID }}`, `app-private-key: ${{ secrets.PORTFOLIO_APP_PRIVATE_KEY }}`, plus `token: ${{ secrets.GITHUB_TOKEN }}`); `.github/workflows/release-publish.yml` (same shape) |
| "What a GitHub App gives you" · App registered once at account level, installed across the portfolio, one identity / one permission set | reusable workflows referenced via `uses: nolte/gh-plumbing/...@v1.1.19`; `PORTFOLIO_APP_*` naming |
| "Two kinds of app" · Probot settings/boring-cyborg/stale apps; settings app reconciles config-as-code on default-branch push | `.github/settings.yml` (header comment + `_extends`), `.github/boring-cyborg.yml`, `.github/stale.yml` |
| "Where classic pipelines stay" · CI on `contents: read`; Pages deploy on platform OIDC; release-drafter on built-in token as an endpoint | `.github/workflows/ci.yml`, `.github/workflows/deploy.yml` (`id-token: write`), `.github/workflows/release-drafter.yml` (GITHUB_TOKEN only) |
| "What it costs" · private key stored as a secret, must be rotated; some steps stay manual until the App is provisioned portfolio-wide | sibling post `from-branch-to-published-release` §What this costs (operator-driven fallback alignment; downstream cascade watched) |

No source is unused. No claim names a third party without grounding. No private communication is quoted.

## Handover manifest

- **Build status**: green — `npm run build`, 25 pages, both `/blog/github-token-vs-probot-app/` and `/de/blog/github-token-vs-probot-app/` rendered (post-patch re-build also green).
- **Lektorat**: `nolte-shared:lektorat-apply` `audit` + `patch` via `lektorat-scanner`. Audit trail `.audits/lektorat/2026-06-07-2012/` (local artifact, not committed). 0 critical · 5 warning · 8 suggestion; all applied.
- **Repository state**: branch `post/github-token-vs-probot-app` (worktree `.claude/worktrees/post+github-token-probot`), rebased onto `develop`. Commit, PR, and merge are the operator's call.
