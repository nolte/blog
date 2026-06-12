# Lektorat audit — ai-assisted-test-automation-unit (EN + DE)

Ran at: 2026-06-12T19:05:32Z · severity floor: suggestion

## Infrastructure conditions

- **vale-unavailable** (en): No `.vale.ini`; Vale v3.14.1 installed but
  unconfigured. EN D3/D4 (Vale mechanics) skipped. DE D3 ran via LanguageTool.

## Findings

### warning

- **DE `…unit.md:63` — D3** — Missing space before `%` at three points
  (DIN 5008 / EINHEIT_LEERZEICHEN). → **fixed** (`80 %` / `75 %` / `85 %`).
- **DE `…unit.md:43` — D6** — „still" used for „silently" (unidiomatic
  collocation). → **fixed** („stillschweigend").
- **DE `…unit.md:45` — D6** — Same „still"-for-„silently" issue. → **fixed**
  („heimlich", varied to avoid repetition).

## Per-severity counts

| Severity | Count | Disposition |
|----------|-------|-------------|
| critical | 0 | — |
| warning  | 3 | all fixed |
| suggestion | 0 | — |

D1 readability green (EN LIX 37, DE LIX 42). D2, D4, D5 returned no findings.
