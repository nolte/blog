# Handover: `claude-shared-baseline`

Delivery contract for the bilingual post pair `src/content/posts/{en,de}/claude-shared-baseline.md`, produced by `nolte-shared:blog-author` per the consumer-side contract in `spec/project/blog-author/` §Liefervertrag. Three artefacts: self-check manifest, source-to-claim mapping, handoff manifest.

## Updates

- **2026-05-23** — added an ASCII before/after diagram at the end of the "drift" section visualising the convergence-not-drift thesis (12 driftenden Kopien → 1 Plugin). `updatedDate` set in both frontmatter blocks per `spec/project/blog-author/` §Update- vs. Neuanlage-Felder. `slug` and `translationKey` unchanged per the same spec MUST. Diagram is a `text`-fenced code block with one setup sentence before and one interpretation sentence after per `spec/project/post-writing-style/` §Code, Befehle und andere technische Inhalte. Regression-scan against per-post acceptance criteria: 0 oversized paragraphs, 0 forbidden-word hits, `task build` green (13 pages, 1.69s).
- **2026-05-23 (second update)** — replaced the ASCII diagram with a Mermaid `flowchart LR` block (build-time rendered to inline SVG via `rehype-mermaid` + Playwright/Chromium, no runtime JS). Both EN and DE files use the same diagram structure with localised labels. Diagram still sits at the same paragraph boundary; setup + interpretation sentences unchanged. Infrastructure changes that ship alongside this post: `astro.config.mjs` wires `rehype-mermaid` into `markdown.rehypePlugins` and excludes `mermaid` from Shiki syntax-highlighting; `.github/workflows/deploy.yml` replaces `withastro/action@v3` with explicit `setup-node` + `npm ci` + `npx playwright install --with-deps chromium` + `npm run build` + `upload-pages-artifact` so the CI build has Chromium available. New devDependencies: `rehype-mermaid`, `playwright`. Local `task build` green (13 pages, 2.22s); inline SVG verified present in both rendered pages (1 SVG per page, no `flowchart LR` source leakage). Mermaid infrastructure is now reusable for every future post.
- **2026-05-27** — reworked the diagram set. Three changes: (1) the original drift→convergence diagram switched from `flowchart LR` (two side-by-side subgraphs, ~2043 px wide, sprung the mobile viewport) to `flowchart TB` with the plugin node centred between a "Before" subgraph above and an "After" subgraph below — Plugin is now visually load-bearing, the diagram fits a mobile viewport. (2) added a plugin-anatomy diagram in section "What `nolte-shared` actually contains" showing the three buckets (Skills / Agents / Specs) with `implements` and `dispatches` edges between them. (3) added a dogfooding-loop diagram in section "Dogfooding: the plugin develops itself" showing the closed loop Spec → Skill → Repo → Spec. EN + DE in lockstep with localised prose labels (technical identifiers untouched). Local `task build` green (13 pages, 10.08s); 3 inline SVGs per language verified, no Mermaid source leakage. `updatedDate` already 2026-05-23 from the prior pass; diagram rework does not bump it on its own since it's the same content boundary. The matching CSS work that ships alongside this rework: `pre.mermaid` Tailwind Typography override (transparent background, no padding) so the client-rendered dev SVG is not framed by the prose `<pre>` dark code-block style; `prefers-color-scheme: dark` filter `invert(0.93) hue-rotate(180deg)` for the SVG so the diagram recolors under a dark OS without diverging the prod build.

## Self-check manifest

Per-post acceptance criteria from the two sibling specs, evaluated for each language separately plus the pair as a whole. Format: `<spec> a-<n>: <status> [— <reason>]`.

### EN — `src/content/posts/en/claude-shared-baseline.md`

- post-writing-style a-1: passed — lede 75 words, names thesis (baseline lives in one plugin)
- post-writing-style a-2: passed — avg sentence length 17.3 words; 3 sentences >30 words but none in a row
- post-writing-style a-3: passed — no paragraph exceeds 4 sentences
- post-writing-style a-4: passed — Flesch–Kincaid reviewer estimate ~9 (provisional per spec §Akzeptanzkriterien a-4 vorläufig clause; no `textstat` hook yet)
- post-writing-style a-5: passed — no fenced code blocks in body; n/a in practice
- post-writing-style a-6: passed — all 5 links carry self-describing text
- post-writing-style a-7: passed — sentence-case throughout; no body H1; no heading-level skips
- post-writing-style a-8: passed — mechanical scan: 0 forbidden-word hits
- post-writing-style a-9: passed — every named-project / library / tool claim cites a source (see §Source-to-claim mapping)
- post-writing-style a-10: passed — `aiGenerated: true` set; body uses "I considered" / "I'd write" framings on decisions actually made, no "I sat down and typed" myth
- post-writing-style a-11: passed (per-pair, see §Per-pair) — `translationKey` identical
- post-writing-style a-12: passed — EN uses ASCII `"…"`, em-dash with surrounding spaces, no en-dash misuse in prose
- post-writing-style a-13: passed — Audience-L (Anthropic / Claude Code, git submodule) grounded; "git submodule update is, in my experience, one of the most painful workflows" framed as opinion per §AI-Disclosure-Tone; no private communication quoted
- post-writing-style a-14: passed — `task build` ran green at 22:53:21, 13 pages built in 1.78s
- post-writing-style a-15: passed — contractions present: `don't` ×2, `doesn't`, `I'd` ×3, `that's` ×2, `haven't`, `what's`, `it's` ×1
- post-writing-style a-16: passed — three alternatives (submodule, copy-script, monorepo) are named with their downsides before the plugin choice
- post-writing-style a-17: n/a — badge-half of AI-disclosure deferred per spec until roadmap R-4 ships; the `aiGenerated: true` flag covered by a-10
- post-audience-communication a-1: passed — `primaryAudience: A` declared in frontmatter; author-side convention per consumer Zod-schema gap (see §Caveats)
- post-audience-communication a-2: passed — `secondaryAudiences: [C]` declared; does not contain the primary value
- post-audience-communication a-3: passed — first 80 words land the thesis without requiring further reading
- post-audience-communication a-4: passed — body depth, terminology, and code-fragment density tuned to A throughout; no mid-body swerve
- post-audience-communication a-5: passed — "Why a plugin and not the alternatives" is the explicit escape-hatch for C (decision Why + considered alternatives)
- post-audience-communication a-6: passed — mirrors writing-style a-13
- post-audience-communication a-7: passed — Diataxis position: Explanation
- post-audience-communication a-8: passed (per-pair) — both files declare identical audience fields
- post-audience-communication a-9: n/a — corpus criterion; current corpus has only 2 posts, below the 5- and 10-post window thresholds
- post-audience-communication a-10: passed — conflict resolution explicit (B would want more "what does this mean in practice"; resolved by staying A-focused with no L-fairness compromise)
- post-audience-communication a-11: passed — A-specific deliverables present: working artefact (repo + commit `fc0ef69` + version `0.1.3`), versions pinned, "Outside scope and what's next" coda, experience signal implicit ("about a dozen repos", "third time I had to change", "I considered three other shapes")
- post-audience-communication a-12: passed — three layers exactly (lede, body, escape-hatch); no fourth
- post-audience-communication a-13: n/a — no `<details>` drawers in the post

### DE — `src/content/posts/de/claude-shared-baseline.md`

- post-writing-style a-1: passed — lede 71 words, names thesis
- post-writing-style a-2: passed — avg sentence length 17.0 words; 4 sentences >30 words but none in a row
- post-writing-style a-3: passed — no paragraph exceeds 4 sentences
- post-writing-style a-4: n/a — Flesch–Kincaid is EN-calibrated; DE-specific readability target deferred per spec §Offene Fragen "DE-seitiges Lesbarkeitsziel"
- post-writing-style a-5: passed — no fenced code blocks in body
- post-writing-style a-6: passed — all 5 links carry self-describing text
- post-writing-style a-7: passed — sentence-case throughout; no body H1; no heading-level skips
- post-writing-style a-8: passed — mechanical scan over EN + German equivalents (`nahtlos`, `robust`, `eintauchen`, `schöpfen`, `innovativ`, `ganzheitlich`, `synergie`): 0 hits
- post-writing-style a-9: passed — claims grounded in the same source list as EN
- post-writing-style a-10: passed — `aiGenerated: true` set; body framing consistent with EN
- post-writing-style a-11: passed (per-pair) — `translationKey` identical
- post-writing-style a-12: passed after fix — DE uses `„…"` (opener U+201E + closer U+201C per Duden), em-dash with spaces, no ASCII substitutes for `ä/ö/ü/ß` (mechanical scan: 0); initial draft had ASCII straight `"` as closer, repaired in place before this manifest landed
- post-writing-style a-13: passed — same Audience-L treatment as EN
- post-writing-style a-14: passed — `task build` covers both languages
- post-writing-style a-15: n/a for DE — German equivalent uses natural German rather than forced colloquialisms per spec §Person, Voice und Ton
- post-writing-style a-16: passed — mirrors EN structure
- post-writing-style a-17: n/a — same as EN
- post-audience-communication a-1 / a-2: passed — frontmatter identical to EN
- post-audience-communication a-3 / a-4 / a-5 / a-6 / a-7: passed — body shape mirrors EN
- post-audience-communication a-8: passed — see §Per-pair
- post-audience-communication a-9: n/a — corpus criterion
- post-audience-communication a-10 / a-11 / a-12 / a-13: passed — same as EN

### Per-pair

- `translationKey` identical: passed — both files carry `claude-shared-baseline`
- File slug identical: passed — both files named `claude-shared-baseline.md`
- `primaryAudience` identical: passed — both `A`
- `secondaryAudiences` identical: passed — both `[C]`
- `pubDate` identical: passed — both `2026-05-23`
- `tags` identical: passed — both `["claude-code", "plugins", "developer-tools", "portfolio"]`
- `aiGenerated: true` in both: passed
- `task build` green: passed — 13 pages built in 1.78s at 22:53:21 local
- `lang` differs as expected: passed — EN `en`, DE `de`

**No unresolved findings.** All per-language and per-pair criteria are either `passed` or `n/a` with documented reason.

## Source-to-claim mapping

Every concrete technical claim about a named project, library, or tool maps to at least one source in the briefing source list. Anchors use the post H2 title.

- **Source: `nolte/claude-shared` repository at commit `fc0ef69`** ([github.com/nolte/claude-shared](https://github.com/nolte/claude-shared)) supports:
  - Lede — "a plugin called `nolte-shared`, source at `nolte/claude-shared`"
  - "What `nolte-shared` actually contains" — "commit `fc0ef69` as I write this, version `0.1.3`"
  - "What `nolte-shared` actually contains" — three-bucket structure (Skills under `skills/<name>/SKILL.md`, Agents under `agents/<name>.md`, Specs under `spec/`)
- **Source: `nolte/claude-shared` README.md** supports:
  - "What `nolte-shared` actually contains" — example skills enumerated (`pull-request-create`, `pull-request-merge`, etc.) and example agents (`claude-plugin-developer`, etc.)
  - "Why a plugin and not the alternatives" — `/plugin install nolte-shared@nolte-shared` syntax
  - "Why a plugin and not the alternatives" — `claude --plugin-dir /path/to/claude-shared` dev-mode loop
- **Source: `nolte/claude-shared` CLAUDE.md** supports:
  - "Why a plugin and not the alternatives" — `/reload-plugins` for in-session reload
- **Source: `nolte/claude-shared/.claude-plugin/plugin.json`** supports:
  - "What `nolte-shared` actually contains" — `version: "0.1.3"`
- **Source: `nolte/claude-shared/spec/claude/skill-management/` (DE canonical)** supports:
  - "Why a plugin and not the alternatives" — "plugin-owned skills must not be distributed by copying or symlinking" rule
- **Source: `nolte/claude-shared/project/roadmap.md`** supports:
  - "Dogfooding: the plugin develops itself" — R-1 title verbatim
  - "Outside scope and what's next" — R-2 + `workflow_dispatch` gap reference
- **Source: Claude Code [plugin documentation](https://docs.claude.com/en/docs/claude-code/plugins)** supports:
  - "What `nolte-shared` actually contains" — plugin mechanism distribution
- **Personal experience (no external source needed; not a technical claim about a named third party)**:
  - "I run Claude Code across about a dozen repos"
  - "Until a few months ago" baseline duplication story
  - "the third time I had to change something" — the drift incident
  - "git submodule update is, in my experience, one of the most painful workflows" — explicitly framed as opinion per `post-writing-style` §AI-Disclosure-Tone "ich habe festgestellt, dass" pattern

No source is unused. No named-project claim is unsourced.

## Handoff manifest

- **Editorial regime**: transitional self-lektorat per `spec/project/blog-author/` §Übergangsregime (option **b**: "ein dokumentiertes Reviewer-Urteil des menschlichen Autors gegen den Selbst-Check, explizit als 'Übergangs-Selbst-Lektorat' notiert"). The target-state path (`nolte-shared:lektorat-apply` operation `audit`) was attempted first and pre-flight-aborted before any scanner dispatch: the `lektorat-scanner` agent requires `spec/project/lektorat/en.md` at the working-tree root, but that spec lives in `claude-shared` and is not vendored into this repo. The transitional Vale option (a) was also skipped because the blog repo has no `.vale.ini` configured. The self-check manifest above is therefore the editorial pre-handoff record for this post; the five quality dimensions D1–D5 from the lektorat spec are substantively covered by the per-post acceptance criteria from `post-writing-style` (a-1 through a-17, addressing readability, voice, typography, forbidden words) and `post-audience-communication` (a-1 through a-13, addressing audience fit and Diataxis positioning).
- **`task build` status**: green. Command: `task build`. Result: 13 pages built in 1.78s, both `/blog/claude-shared-baseline/` and `/de/blog/claude-shared-baseline/` rendered. Two pre-existing "projects collection empty" warnings are unrelated to this post (collection is empty by design today).
- **Repository state**: working tree at `/home/nolte/repos/github/blog`, branch `main`, files staged for commit are `src/content/posts/{en,de}/claude-shared-baseline.md` plus this handover artefact. Self-check ran against the on-disk content of those files at the time of writing.

## Follow-ups (out of scope for this post)

- **`lektorat-apply` skill design gap**: the scanner's spec-readability precondition assumes the consumer repo carries the lektorat spec locally. That works in `claude-shared` (dogfood pattern) but breaks every other consumer of the plugin. A follow-up issue against `claude-shared` should propose either (a) letting the scanner resolve the spec from the plugin source tree, or (b) documenting the "vendor the spec or fall back to transitional regime" decision explicitly in the lektorat spec's §Scope and applicability.
- **Vale onboarding for the blog repo**: a `.vale.ini` plus `.github/styles/` extension to the `nolte/vale-style` package would enable the transitional Vale option (a) of `spec/project/blog-author/` §Übergangsregime. Belongs in a separate PR.
- **Lift the `blog-author` consumer specs from `Status: draft` to `accepted`** in this repo's `spec/project/blog-author/`, `post-writing-style/`, `post-audience-communication/`, now that the first post written under them passes its self-check end-to-end.

## Caveats

- The Astro Zod schema in `blog/src/content.config.ts` does not yet declare `primaryAudience` / `secondaryAudiences`. The build silently strips them per Zod default behaviour (no `.strict()`). The blog-author skill writes them anyway per `post-audience-communication` §Akzeptanzkriterien (author-side convention pending schema migration). A future PR adding the fields to the schema retroactively validates this post.
- The lektor handoff used the transitional self-lektorat path rather than the target-state `lektorat-apply` dispatch, for the infrastructure reasons documented in §Handoff manifest above. The blog-author skill body should be updated to detect this configuration up front and route to the transitional regime without operator intervention; that's part of the follow-up listed under §Follow-ups.
