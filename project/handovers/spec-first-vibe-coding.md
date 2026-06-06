# Self-check manifest — spec-first-vibe-coding

Author-side pre-handover self-check. Measured values, not asserted.

## Per-language: EN (`src/content/posts/en/spec-first-vibe-coding.md`)

- readability-lix (a-4a): **passed** — LIX 36.1 (EN aim ≤ 45); avg sentence length 14.5 words
- forbidden-words: **passed** — closed-list scan (leverage/delve/robust/seamless/…) returned no hits
- headings-sentence-case: **passed** — all H2 sentence case
- code-blocks-tagged: **passed** — `markdown`, `python`, `mermaid` fences all tagged
- paragraph-length: **passed** — no paragraph exceeds 4 sentences
- voice-first-person-direct: **passed**
- ai-disclosure-flag: **passed** — `aiGenerated: true`
- grounding (no invented technical facts): **passed** — every named-project/library/tool claim verified against local repos (see source-to-claim mapping)

## Per-language: DE (`src/content/posts/de/spec-first-vibe-coding.md`)

- readability-lix (a-4a): **passed** — LIX 42.3 (DE aim ≤ 50); avg sentence length 14.3 words
- typography (`„…"`, ` — `, ä/ö/ü/ß, identifiers byte-identical): **passed** — German quotes in prose; straight quotes only inside code/identifiers/source-quotes; no ASCII umlaut substitutes in prose
- headings-sentence-case: **passed**
- code-blocks-byte-identical-to-EN: **passed** — Python blocks unchanged; German source quote unchanged
- ai-disclosure-flag: **passed** — `aiGenerated: true`

## Per-pair

- cross-language-binding-key identical: **passed** — `translationKey: spec-first-vibe-coding`
- file-slug identical: **passed** — `spec-first-vibe-coding.md` on both sides
- audience fields identical: **passed** — `primaryAudience: A`, `secondaryAudiences: [C]`
- pubDate / updatedDate / tags / draft identical: **passed**
- build status: **passed** — `task build` green; 17 pages built; both `/blog/spec-first-vibe-coding/` and `/de/blog/spec-first-vibe-coding/` emitted

Note: the `a-1…a-17` / `a-1…a-13` exact criterion-ID mapping from `post-writing-style` and `post-audience-communication` was not transcribed verbatim; this manifest records the checks actually performed grouped by concern. The lektor audit (Step 7) is the authoritative D1–D5 pass.

# Source-to-claim mapping — spec-first-vibe-coding

Every named-project / file / number maps to a primary source.

| Claim in post | Source |
|---|---|
| `kamerplanter` is the shipped implementation, past 293 commits | local repo `nolte/kamerplanter` @ `bdae438`; `git rev-list --count HEAD` = 293; README §title |
| `garden-helper` README "Database for manage our flowers and vegetables" (2023, abandoned) | local dir `garden-helper/README.md` (not a git repo; file-only, last modified 2023-09) |
| `garden-helper-app` Flutter, 3 commits, "work in progress" | local repo `garden-helper-app` @ `d4258c4` (2023-10); README |
| `kamerplanten` FastAPI+ArangoDB scaffold, 22 commits, no Claude | local repo `kamerplanten` @ `53cb2d9` (2026-01-05); `src/backend/pyproject.toml`, `skaffold.yml` |
| "SmartPlant" example project | local repo `kamerplanten-v2` @ `c4bfea5`; README "Beispielprojekt für das SmartPlant-System" |
| `vibe-coding` repo holds specs only (Markdown, Obsidian) | local repo `nolte/vibe-coding` @ `02cc42d`; `docs/kamerplanter/spec/nfr/*`, `.obsidian/` present; empty `README.md` |
| Author field "Business Analyst - Agrotech"; user stories per NFR | `vibe-coding/docs/kamerplanter/spec/nfr/NFR-001…006` frontmatter + §1.1 |
| NFR-006 title + German user-story block (quoted verbatim) | `vibe-coding/docs/kamerplanter/spec/nfr/NFR-006_API-Fehlerbehandlung.md` §1.1 |
| NFR-006 Pydantic `ErrorResponse` schema (German descriptions) | same file, §2.2 |
| `kamerplanter/app/common/error_schemas.py` schema (English descriptions) | local repo `kamerplanter`, file read verbatim |
| NFR-003 mandates English source-code standard | `vibe-coding/docs/kamerplanter/spec/nfr/NFR-003_Code-Standard-Linting.md` title |
| Commits co-authored with Claude Opus 4.6 and 4.7 | `kamerplanter` and `kamerplanter-ha` git trailers `Co-Authored-By: Claude Opus 4.6/4.7 (1M context)` |
| Project carries own `spec/` tree (req, nfr, decisions, design, e2e) | `kamerplanter/spec/` directory listing |
| `kamerplanter-e2e` Selenium suite; `kamerplanter-ha` HA integration | `kamerplanter-e2e` (git worktree of kamerplanter, Selenium); `kamerplanter-ha` @ `242c08f`, `custom_components/kamerplanter/`, README |

Unused briefing sources: `tania-core` (external Go reference project, deliberately excluded — not part of the experiment); `kamerplanter_img` (Gemini asset dir, not cited in this post).

# Handover manifest — spec-first-vibe-coding

- **Handover route**: target-state — dispatch `nolte-shared:lektorat-apply` operation `audit` over the EN+DE pair. (Repo has no `.vale.ini`; per project memory the lektor skips EN D3/D4 as `vale-unavailable`; D1 and DE-D3 run normally.)
- **Build**: green via `task build` (Astro production build, 17 pages, both language pages emitted).
- **Repository state**: worktree `.claude/worktrees/post+vibecoding-experiment`, branch `worktree-post+vibecoding-experiment`; files uncommitted in working tree at handover time.
