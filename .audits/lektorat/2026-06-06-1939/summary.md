# Lektorat audit — spec-first-vibe-coding (EN + DE)

Ran at: 2026-06-06T19:39:00Z · Operation: audit · Severity floor: suggestion

Counts: critical 0 · warning 0 · suggestion 11 · inventory 1

## Infrastructure conditions

- **vale-unavailable** (EN): no `.vale.ini` in the repository → EN D3 (spelling) and D4 (style) skipped for the EN file. Expected for this repo; DE D3/D4 ran against the LanguageTool HTTP API.

## Findings (severity: suggestion)

### D1 Readability — paragraph length

LIX in corridor for both files (EN 36.1 ≤ 45, DE 42.3 ≤ 50). The scanner's heuristic floor is 3 sentences/paragraph; `post-writing-style` permits ≤ 4. Paragraphs above 4 were split; 4-sentence paragraphs were kept.

| File | Line | Sentences | Resolution |
|---|---|---|---|
| en | 25 | 6 | addressed — split before rhetorical questions |
| en | 31 | 5 | addressed — split before NFR-006 example |
| en | 80 | 5 | addressed — split after commit-count |
| en | 109 | 4 | kept — within ≤4 corridor |
| de | 25 | 7 | addressed — split before rhetorical questions |
| de | 80 | 5 | addressed — split after commit-count |
| de | 31 | 4 | addressed — split for pair-symmetry with EN |
| de | 109 | 4 | kept — within ≤4 corridor |

### D3 Grammar (DE)

| Line | Finding | Resolution |
|---|---|---|
| 31 | "Stories" → "Storys" (Duden 2024) | kept — "User Stories" is the established agile term, treated as protected identifier |
| 40 | "Stories" → "Storys" | kept — same |
| 74 | optional comma before "ohne dass" after dash | kept — construction is grammatically defensible |

## Author disposition

All findings are `suggestion` (optional per blog-author Step 7). The five real ≤4-sentence-corridor violations were addressed in the draft; the rest were consciously kept with the notes above. No `critical`/`warning` findings → post pair is handover-ready.
