# Lektorat audit summary

- Operation: `audit` (read-only)
- Repository: blog
- Ran at: 2026-06-06T17:19:45Z
- Target set: `src/content/posts/en/how-lektorat-audits-my-docs.md`, `src/content/posts/de/how-lektorat-audits-my-docs.md`
- Severity floor: suggestion
- Counts: 0 critical · 5 warning · 9 suggestion · 1 infrastructure

## Infrastructure conditions

- **vale-unavailable** (en, repository-wide): Vale 3.14.1 is installed but no `.vale.ini` / `.vale/`
  config exists in this repo; EN D3/D4 Vale mechanics were skipped. D1 (LIX), D2 (heuristic),
  D4 (active-voice / consistency heuristics) and DE D3 (LanguageTool HTTP) ran normally.

## Warning

### src/content/posts/de/how-lektorat-audits-my-docs.md

- **D3** `FALSCHES_ANFUEHRUNGSZEICHEN` (L56): opening `„` paired with ASCII closing `"` instead of
  typographic `“`. Evidence: `„ein Redakteur, der still umschreiben kann, was er findet" ist …`.
  Resolution: use `“` as closer (and capitalise quoted opener). Audience: A.
- **D3** `FALSCHES_ANFUEHRUNGSZEICHEN` (L60): two quoted phrases close with ASCII `"`. Evidence:
  `„lektoriere diesen Post" oder „prüfe die Docs auf Lesbarkeit" aus`. Resolution: close with `“`. Audience: A.
- **D3** `FALSCHES_ANFUEHRUNGSZEICHEN` (L64): quoted phrase closes with ASCII `"`. Evidence:
  `einen deutschen Satz zu „reparieren", …`. Resolution: close with `“`. Audience: A.
- **D4** `DE-address-form` (L17): informal `du`-address (`dir`) on an explanation-mode page; spec
  expects impersonal voice. Evidence: `Falls dir das Plugin noch nichts sagt:`. Audience: A.
- **D4** `DE-address-form` (L66): second `du`-address (`dich`). Evidence: `bevor er dich erreichte`.
  Audience: A.

## Suggestion

### src/content/posts/de/how-lektorat-audits-my-docs.md

- **D1** `paragraph-length-heuristic` (L15): opening paragraph ~4 sentences; consider splitting. Audience: A, C.
- **D1** `paragraph-length-heuristic` (L56): ~4 sentences, long embedded quote; dominant lever ASL. Audience: A, C.
- **D2** `unexplained-jargon` (L15): `Register-Drift` used without a gloss on first use. Audience: A.

### src/content/posts/en/how-lektorat-audits-my-docs.md

- **D1** `paragraph-length-heuristic` (L15): opening paragraph ~4 sentences; consider splitting. Audience: A, C.
- **D1** `paragraph-length-heuristic` (L31): ~4 sentences across LIX/Vale/LanguageTool; dominant lever LWP. Audience: A, C.
- **D1** `paragraph-length-heuristic` (L56): ~4 sentences, embedded quote + mechanism. Audience: A, C.
- **D1** `paragraph-length-heuristic` (L78): closing paragraph ~4 sentences; long third sentence drives ASL. Audience: A, C.
- **D2** `unexplained-jargon` (L15): `register drift` used without a gloss on first use. Audience: A.
- **D2** `unexplained-jargon` (L39): `unified diff` used without a gloss on first use. Audience: A.

## Next step

`patch` for interactive per-finding fixes, or `revise` for a full-artefact rewrite. This run was a
blog-author Step 7 handover gate; warnings dispositioned in `project/handovers/how-lektorat-audits-my-docs.md`.
