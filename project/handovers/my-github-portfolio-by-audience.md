# Handover — my-github-portfolio-by-audience

Delivery-contract artefacts for the EN+DE post pair, written by `nolte-shared:blog-author`.
Run date: 2026-05-30. Branch: `worktree-post+github-portfolio`.

## Self-check manifest

Status per acceptance-criterion ID. `passed`, `finding: <reason>`, or `override: <reference>`.

### post-writing-style (EN-scoped where noted)

- a-1 (lede ≤ 80 words, names claim/question): passed — lede is ~73 words, closes on "who is it actually for?"
- a-2 (avg sentence length 14–20; no two consecutive > 30): finding: a few explanatory sentences run long (opening sentence ~38 words); no two consecutive exceed 30. Deferred to lektor D1 readability.
- a-3 (no paragraph > 4 sentences): passed.
- a-4 (Flesch–Kincaid 7–10, reviewer judgement): finding: likely upper edge (~9–11) given compound sentences. Deferred to lektor D1.
- a-5 (fenced blocks declare a language): passed — single `mermaid` block tagged.
- a-6 (link text self-describing): passed — "why it's one plugin" describes destination.
- a-7 (sentence-case headings, single H1, no level skips): passed.
- a-8 (no forbidden words without override): passed — grep against the closed list returned none.
- a-9 (technical claims cite a verifiable source): passed — every project claim maps to its repo URL (see mapping below).
- a-10 (AI-disclosure flag present; body doesn't contradict): passed — `aiGenerated: true` in both files; no hand-wrote-it-myself framing.
- a-11 (same translationKey + slug; both render on dev server): passed — `my-github-portfolio-by-audience` both sides; build rendered both routes.
- a-12 (DE typography `„…"`, em-dash w/ spaces, ä/ö/ü/ß; EN ASCII `"…"`): passed.
- a-13 (named third parties cited; no unpermitted private quotes): passed — Pollen Robotics / Hugging Face named only via the public SDK; no private quotes.
- a-14 (build command succeeds on the pair): passed — `task build` green (15 pages).
- a-15 (EN prose uses contractions): passed — it's / don't / you're / isn't / doesn't throughout.
- a-16 (show-the-thinking: name the hard part before the choice): passed — the §test names the blur before fixing the test on intent.
- a-17 (badge): n/a — consumer satisfies disclosure via `aiGenerated` flag (a-10).
- a-18 / a-19 / a-20 (forbidden-list maintenance): n/a — no edits to the forbidden list in this run.

### post-audience-communication

- a-1 (exactly one primaryAudience from {A,B,C}): passed — `primaryAudience: A`.
- a-2 (secondaryAudiences from same set, excludes primary): passed — `secondaryAudiences: [B]`.
- a-3 (first 80 words deliver the headline): passed — the two-pile split + "who is it for" land in the lede.
- a-4 (depth tuned for primaryAudience A, not split mid-post): passed — artefact-first, repo-grounded, "show your work" close; no mid-post pivot to B.
- a-5 (escape-hatch for secondary audience B): passed — the closing paragraph offers the reviewer-facing "read the five products for *what*, the fourteen supporting for *how*" hatch.
- a-6 (named third party grounded, no private quotes, no unsupported intent): passed.
- a-7 (Diátaxis Explanation/How-to/blend, not Tutorial/Reference): passed — Explanation.
- a-8 (EN+DE identical audience fields): passed.
- a-9 (corpus-level, checked at sprint review): n/a per-post.
- a-10 (collision favours primary, never against L): passed — no collision present.
- a-11 (depth-serves primaryAudience rubric): passed — A rubric (artefact-first, depth over surface).
- a-12 (no layering beyond lede/body/escape-hatch): passed.
- a-13 (no drawer holds primary-required content): passed — no `<details>` drawers used.

### Per-pair block

- translationKey identical (EN/DE): passed — `my-github-portfolio-by-audience`.
- filename slug identical: passed.
- audience fields identical: passed — A primary, [B] secondary both sides.
- AI-disclosure flag set in both: passed.
- build status: passed — `task build` green.

## Source-to-claim mapping

Every named-project claim points at its repository (primary source), confirmed against
the live `gh repo list nolte` snapshot of 2026-05-30 (description / topics / primaryLanguage).

| Claim (heading → passage) | Source |
| --- | --- |
| Snapshot is the active, non-archived, non-fork set (lede) | `gh repo list nolte` snapshot 2026-05-30 |
| kamerplanter = plant-lifecycle system, FastAPI/React/Helm/K8s (§products) | https://github.com/nolte/kamerplanter |
| kamerplanter-ha = HACS Home Assistant integration (§products) | https://github.com/nolte/kamerplanter-ha |
| reachy-mini-app = behavior package on the Pollen/HF `reachy_mini` SDK (§products) | https://github.com/nolte/reachy-mini-app |
| reachy-mini-mcp = MCP server, REST around the Pollen daemon (§products) | https://github.com/nolte/reachy-mini-mcp |
| esphome-configs = reusable ESPHome parts, iot/smart-home (§products) | https://github.com/nolte/esphome-configs |
| claude-shared = cross-repo Claude Code baseline (§supporting) | https://github.com/nolte/claude-shared · /blog/claude-shared-baseline |
| claude-home-assistant = HA dev skills (§supporting) | https://github.com/nolte/claude-home-assistant |
| claude-reachy-mini = robot dev skills, dance-to-music + HA tie-in (§supporting) | https://github.com/nolte/claude-reachy-mini |
| vale-style = shared Vale vocabulary (§supporting) | https://github.com/nolte/vale-style |
| taskfiles = reusable Taskfile includes (§supporting) | https://github.com/nolte/taskfiles |
| cookiecutter-gh-project = repo template w/ workflows (§supporting) | https://github.com/nolte/cookiecutter-gh-project |
| terraform-github-bootstrap = org settings/teams/rulesets in TF (§supporting) | https://github.com/nolte/terraform-github-bootstrap |
| gh-plumbing = project-level GitHub plumbing (§supporting) | https://github.com/nolte/gh-plumbing |
| k8s-home-lab = K8s home lab, Kind/Talos, ArgoCD/Argo Workflows (§supporting) | https://github.com/nolte/k8s-home-lab |
| ansible-reachy-mini-bootstrap = provisions the robot's Pi over WiFi (§supporting) | https://github.com/nolte/ansible-reachy-mini-bootstrap |
| workstation = local dev-machine config (§supporting) | https://github.com/nolte/workstation |
| blog = this site, the shop window (§supporting) | https://github.com/nolte/blog |

No unused sources. Every source maps to at least one passage.

## Handover manifest

- Route: target-state — dispatched `nolte-shared:lektorat-apply` operation `audit` over the EN+DE
  pair. Audit trail: `.audits/lektorat/2026-05-30-0655/`. Result: 0 critical, 8 warning,
  11 suggestion, 2 infrastructure.
- Build: `task build` — green (15 pages, both post routes rendered). A transient `.astro`-cache
  "duplicate id" warning cleared after `task clean`; the empty-`projects`-collection warning is
  pre-existing and unrelated to this pair.
- Repository state: worktree branch `worktree-post+github-portfolio`, uncommitted working tree
  (post pair + this handover file + `.audits/`). No commit SHA yet; staging/commit is the operator's call.

## Lektor disposition

- **Fixed in place (warnings):** MCP first-use expansion (EN+DE), HACS → "Home Assistant Community
  Store" gloss (EN+DE), "is not" → "isn't" (EN a-15). Adopted two cheap suggestions on the same
  lines: REST → "(HTTP/JSON)" gloss (EN+DE) and split the over-long reachy-mini-mcp sentence.
- **Dismissed with rationale (warnings/suggestions):** `Microsoft.Dashes` (CLAUDE.md mandates the
  spaced em-dash), `Microsoft.Quotes` (logical quoting of an external repo description),
  `DOPPELPUNKT_GROSS` DE L70 (apposition, not a main clause — false positive),
  `Microsoft.HeadingColons` (CLAUDE.md sentence-case heading rule wins).
- **Deferred (suggestions):** remaining D1 paragraph-density notes — acceptable for an
  explanation-mode post aimed at a peer-technical audience.
- **content_mode note:** the audit dispatch labelled the pair `content_mode: full`, which is not a
  spec corridor value; closest valid mode is `explanation`. Cosmetic (the consumer schema carries
  no `content_mode` field); fix the dispatch label on any future re-audit.
