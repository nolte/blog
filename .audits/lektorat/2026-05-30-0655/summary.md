# Lektorat audit — my-github-portfolio-by-audience (EN + DE)

Ran at 2026-05-30T06:55:00Z · severity floor `suggestion` · audiences A (primary), B (secondary).
Counts: **0 critical · 8 warning · 11 suggestion · 2 infrastructure**.

## Infrastructure conditions

- `content-mode-missing` (en + de) — the dispatch passed `content_mode: full`, which is not a
  spec D1 corridor value. D1 metric corridor was skipped; structural readability heuristics still
  ran. Closest valid mode for this post is `explanation`. No post-frontmatter change required
  (the consumer schema does not carry `content_mode`); fix the dispatch label on the next run.

## Warning

### EN — D2 comprehensibility
- L23 `MCP` used before expansion → expand to "Model Context Protocol (MCP)" on first use.
- L52 `HACS` used before expansion → gloss as "Home Assistant Community Store (HACS)".

### EN — D3 spelling/grammar
- L74 `Microsoft.Contractions`: "is not" → "isn't" (also a post-writing-style a-15 obligation). **Fix.**
- L17ff `Microsoft.Dashes`: spaced em-dash conflicts with the Vale rule; CLAUDE.md mandates the
  spaced em-dash. **Dismiss — project override.**
- L52 `Microsoft.Quotes`: comma outside the closing quote of a cited repo description.
  Logical quoting of an external string is defensible. **Dismiss — quoting external text.**

### DE — D2 comprehensibility
- L23 `MCP`, L52 `HACS` — same first-use expansion gaps as EN.

### DE — D3 spelling/grammar
- L70 `DOPPELPUNKT_GROSS`: flagged a capital after the colon; auditor refutes — what follows is an
  apposition ("das eine unterstützende Repo …"), not a main clause, so lowercase is correct.
  **Dismiss — false positive.**

## Suggestion (optional)

- EN/DE D1 sentence-length + paragraph-density on the lede, the kamerplanter paragraph, the
  reachy-mini-mcp sentence, and the ratio paragraph — corroborates author self-check a-2.
- EN/DE D2 `REST` first-use gloss for audience B.
- EN D2 ESPHome hidden-prerequisite gloss for audience B.
- EN D3 `Vale.Terms` "esphome" inside a verbatim quote.
- EN D3 `Microsoft.HeadingColons` on the two `:`-bearing section headings — conflicts with the
  CLAUDE.md sentence-case rule; project convention wins.

## Refuted Vale/LanguageTool noise (no findings raised)

`Microsoft.FirstPerson` (25+ hits — first-person voice is a CLAUDE.md mandate), `Vale.Spelling`
on "Reachy"/"dev"/"org's"/"rulesets" (protected nouns / technical vocab), DE `ER_LIES` on "Lies"
(imperative of *lesen*, correct), DE `GERMAN_SPELLER_RULE` on Repo/kebab-case identifiers,
DE `DE_AGREEMENT` on "Pi" (Raspberry Pi product name).

## Disposition (by blog-author Step 7)

- **Fixed in place:** MCP expansion (EN+DE), HACS expansion (EN+DE), "is not"→"isn't" (EN).
  Adopted two cheap suggestions while touching those lines: REST gloss (EN+DE) and shortening
  the reachy-mini-mcp sentence.
- **Dismissed with rationale:** Microsoft.Dashes, Microsoft.Quotes, DOPPELPUNKT_GROSS,
  Microsoft.HeadingColons (all project-convention or false-positive).
- **Deferred (optional):** remaining D1 paragraph-density suggestions — acceptable for an
  explanation-mode post targeting a peer-technical audience.
