# Self-check manifest — hero-images-from-prompt-to-svg

## post-writing-style (EN)
- a-voice (first person, direct, conversational): passed
- a-forbidden-words (leverage/delve/robust/seamless/hype/"in today's"): passed
- a-headings-sentence-case: passed
- a-code-blocks-language-tagged (ts, astro, mermaid): passed
- a-typography-en (`"…"`, em-dash with spaces): passed
- a-readability (sentence length 14–20, paragraph ≤ 4 sentences, FK 7–10): passed
- a-ai-disclosure-flag (`aiGenerated: true`): passed

## post-writing-style (DE)
- a-typography-de (`„…"`, em-dash with spaces, ä/ö/ü/ß, no ss/ae/oe/ue): passed
- a-headings-sentence-case: passed
- a-technical-identifiers-byte-identical: passed
- a-idiom-for-idiom (not word-for-word): passed

## post-audience-communication
- a-1 (primaryAudience declared = A): passed
- a-2 (secondaryAudiences = [C]): passed
- a-A-artefact-first (lede opens on the real repo wiring): passed
- a-named-third-party-fairness (Gemini, Midjourney, vtracer named factually, no claims beyond sources): passed
- a-diataxis (explanation/blend): passed

## Per-pair
- translationKey identical (hero-images-from-prompt-to-svg): passed
- file-slug identical (en/ ↔ de/): passed
- audience fields identical: passed
- aiGenerated set in both: passed
- pubDate / tags identical: passed
- build status: passed (green)

# Source-to-claim mapping — hero-images-from-prompt-to-svg

- nolte/blog @ 873a1b5 `src/content.config.ts` → §"The wiring that already exists", `heroImage: z.string().optional()` claim
- nolte/blog @ 873a1b5 `src/layouts/PostLayout.astro:33` → §"The wiring that already exists", `ogImage={post.data.heroImage}` claim
- nolte/blog @ 873a1b5 `src/layouts/BaseLayout.astro:33` → §"The wiring that already exists", conditional og:image meta-tag claim
- nolte/blog @ 873a1b5 (absence of design/, brand-vocabulary.md, tokens) → §"The prerequisite I hit first", the Phase-0 stop claim
- nolte/claude-shared @ 027427f `agents/graphic-prompt-generator.md` → §"Agent one", prompt-assembly order, design/prompts/ output, Phase-0 brand load, avoidance clause, light/dark re-pull claims
- nolte/claude-shared @ 027427f `agents/png-to-transparent-svg.md` → §"Agent two", fake-transparency detection, alpha=0 rewrite, corner sampling, 30%/70-90% sanity check, never-overwrite-input claims
- https://github.com/visioncortex/vtracer → §"Agent two", vtracer vectorisation step

Unused sources: none.

# Handover manifest — hero-images-from-prompt-to-svg

- Handover route: target-state — `nolte-shared:lektorat-apply` (operation `audit`) over the EN + DE pair.
- Build status: green via `task build` (17 pages built; pre-existing empty-`projects`-collection warning unrelated to this pair).
- Repository state: branch `worktree-post+image-generation` (based on develop tip 873a1b5), uncommitted working tree.
