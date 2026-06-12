# Lektorat audit — ai-assisted-test-automation-overview (EN + DE)

Ran at: 2026-06-12T18:35:29Z · severity floor: suggestion

## Infrastructure conditions

- **vale-unavailable** (en): No `.vale.ini` in the repository; Vale v3.14.1 is
  installed but unconfigured. EN D3 (spelling) and Vale-driven D4 (style) were
  skipped for this run. DE D3 ran via LanguageTool HTTP API.

## Findings

### warning

- **DE `src/content/posts/de/…overview.md:67` — D3** — Subject-verb
  disagreement: singular „Die Contract/API-Stufe" paired with plural „sind".
  Rule: lektorat §D3. → **fixed** (restructured to plural subject „Vier Dateien
  bilden die Contract/API-Stufe").
- **DE `…overview.md:67` — D4** — Three consecutive sentences open with „Die".
  Rule: lektorat §D4 (sentence variety). → **fixed** (third opener reworded).

### suggestion

- **EN `…overview.md:22` — D1** — Tier-definition paragraph runs to 7 sentences
  (LIX 38, within the ≤45 corridor). → **adopted** (split into two paragraphs).
- **DE `…overview.md:22` — D1** — Same paragraph, mirrored (LIX 43, within ≤50).
  → **adopted** (split, mirroring EN).
- **DE `…overview.md:45` — D6** — Coinage „absichtswahrend" (calque of
  „intent-preserving"). → **adopted** (reworded to a relative clause).

## Per-severity counts

| Severity | Count | Disposition |
|----------|-------|-------------|
| critical | 0 | — |
| warning  | 2 | both fixed |
| suggestion | 3 | all adopted |

D2 (comprehensibility) and D5 (audience-fit) returned no findings for either file.
