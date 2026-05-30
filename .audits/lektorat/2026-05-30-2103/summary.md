# Lektorat audit — hero-images-from-prompt-to-svg

Operation: `audit` (read-only) · ran_at 2026-05-30T21:03:00Z · severity floor `suggestion`
Target: EN + DE post pair · audiences A (primary), C (secondary) · content_mode explanation/blend

Counts: **0 critical · 8 warning · 8 suggestion · 1 infrastructure condition**

## Infrastructure conditions

- `vale-unavailable` (en) — no `.vale.ini` in the worktree or any parent; EN D3 and Vale-driven D4 mechanics skipped. DE D3 ran against the LanguageTool HTTP API (6.9-SNAPSHOT).

## Findings — warning

| id | file | line | dim | rule | sample |
|---|---|---|---|---|---|
| eee6b03a | en | 82 | D4 | person flip | "You end up with a full-canvas checkerboard behind your motif." |
| 668c40c2 | de | 63 | D4 | du/impersonal flip | "…Text, den du in Gemini oder Midjourney einfügst." |
| ad5a83e4 | de | 82 | D4 | du-Anrede flip | "Am Ende hast du ein bildschirmfüllendes Schachbrett…" |
| f426231b | en | 86 | D1 | 47-word sentence | "It reports a diagnosis per file… 70 to 90 percent background…" |
| 21447163 | en | 78 | D1 | 6-sentence paragraph | "This blog has no design tokens…" |
| 93d993b8 | de | 76 | D3 | DOPPELPUNKT_GROSS | "…des konsumierenden Repositorys: ein veröffentlichtes…" |
| 2634d6c2 | de | 43 | D3 | UPPERCASE_SENTENCE_START | "- das, was der Generator ausspuckt…" |
| 1b6d327f | de | 70 | D3 | KOMMA_ZWISCHEN_HAUPT_UND_NEBENSATZ_2 | "…festgehalten selbst wenn er leer ist." |

## Findings — suggestion

| id | file | line | dim | rule | sample |
|---|---|---|---|---|---|
| 6521c185 | de | 40 | D3 | DE_UNPAIRED_QUOTES | „ein Bild bekommen" (straight closing quote) |
| bbbdba91 | de | 78 | D3 | DE_UNPAIRED_QUOTES | „markenkonform" (straight closing quote) |
| 21f4cfee | de | 92 | D3 | DE_UNPAIRED_QUOTES / speller | „Prompt-Dokument auf der Platte" + Wegwerf-Prompt |
| 9552d53a | de | 36 | D3 | GERMAN_SPELLER_RULE | "Social-Unfurl" |
| a361a425 | en | 65 | D4 | active-voice default | "Every prompt is assembled the same way:" |
| 451382a0 | en | 82 | D2 | unexplained abbreviation | "RGB channels" |
| f941d698 | de | 76 | D2 | jargon load | "konsumierenden Repositorys" |
| c5ae6ccb | en | 14 | D1 | opening-paragraph length | double-em-dash sentence in lede |

## Author disposition (blog-author Step 7)

Repaired in place (mechanical / house-rule):
- DE_UNPAIRED_QUOTES ×3 (L40/L78/L92) — straight closing `"` → German `"`; consumer hard rule `„…"`.
- KOMMA_ZWISCHEN_HAUPT_UND_NEBENSATZ_2 (L70) — comma added before "selbst wenn".
- D1 sentence/paragraph splits (EN L86, EN L78) + mirrored in DE for bilingual symmetry.
- D4 person/du flips (EN L82, DE L63/L82) — recast impersonal for register consistency.

Dismissed with rationale:
- DOPPELPUNKT_GROSS (de L76) — colon introduces a noun-phrase apposition (the two brand sources), not a Hauptsatz; lowercase is correct. LanguageTool false positive.
- UPPERCASE_SENTENCE_START (de L43) — both list items continue the colon-introduced sentence; lowercase is intentional and parallel.
- Social-Unfurl / Wegwerf-Prompt / konsumierendes Repository / RGB — on-brand technical register for audience A; loanwords and precise terms kept.
- EN L14 / EN L65 — suggestions; lede em-dash sentence reads cleanly and active-voice line is an isolated, intentional construction.
