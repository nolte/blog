# Blog-author delivery contract — self-hosting-my-smart-home

Slug / translationKey: `self-hosting-my-smart-home`
Pair: `src/content/posts/en/self-hosting-my-smart-home.md` + `src/content/posts/de/self-hosting-my-smart-home.md`
primaryAudience: A (technical readers) · secondaryAudiences: [B] (portfolio reviewers)

## Self-check manifest

### Per-language block — EN

- a-1 / a-2 audience declared: passed (A / [B])
- a-3 voice (first person, conversational, direct): passed
- a-4 forbidden-words list clean (leverage/delve/robust/seamless/…): passed
- a-4a LIX corridor (EN aim ≤ 45): passed (LIX 40)
- a-5 headings sentence-case: passed
- a-6 code blocks language-tagged (yaml, mermaid): passed
- a-7 typography (EN straight quotes, spaced em-dash): passed
- a-8 every named-project/tool claim grounded in a source: passed (see source-to-claim mapping)
- D2 abbreviation glosses for secondary audience B: passed (GitOps, DNS, DRY expanded on first use during lektorat patch)

### Per-language block — DE

- a-1 / a-2 audience fields identical to EN: passed
- a-3 voice mirrors EN (idiom-for-idiom): passed
- a-4 forbidden-words clean: passed
- a-4a LIX corridor (DE aim ≤ 50): passed (LIX 44)
- a-5 headings sentence-case (German noun-capitalisation correct): passed
- a-7 typography (`„…“`, spaced em-dash, ä/ö/ü/ß): passed (closing quotes written as U+201C and verified; no straight-ASCII closings outside code blocks)
- D3 grammar: passed (comma before `weil`-clause; anglicism `hardcodet` de-anglicised during lektorat patch)
- D4 address register (`du`): consistent informal address is the consumer voice contract for blog posts (CLAUDE.md §Tone and voice)

### Per-pair block

- translationKey identical (en/de): passed (`self-hosting-my-smart-home`)
- file slug identical: passed
- audience fields identical: passed (A / [B])
- aiGenerated flag set in both: passed (`true`)
- build command green: passed (`npm run build`, clean rebuild, 27 pages, both post pages rendered, two Mermaid diagrams → SVG via Playwright)
- lektorat applied: `audit` + `patch` — 0 critical, 7 warning, 13 suggestion; all 20 applied, 0 skipped. Audit trail `.audits/lektorat/2026-06-09-1937/` (not committed). Clean re-build green.

## Source-to-claim mapping

Every technical claim is grounded in the three repositories' own READMEs and metadata, read via `gh api` before drafting. The private repo is treated by its GitHub visibility only — no private internals are exposed.

| Post passage (heading · claim) | Source |
|---|---|
| "Three layers…" · esphome-configs (devices) and k8s-home-lab (platform) are public; home-assistant-config is private | `gh repo view` visibility: esphome-configs `PUBLIC`, k8s-home-lab `PUBLIC`, home-assistant-config `PRIVATE` |
| "esphome-configs…" · DRY collection; each `src/*.yaml` is one device composing packages from `src/common/` via `packages:`; base package = Wi-Fi/API/OTA/diagnostics; a new plug ≈ 10 lines | `nolte/esphome-configs` README §Purpose, §Usage, §Structure |
| "esphome-configs…" · devices: Gosund SP111, NOUS A1T, ESP32 cameras, ESP32-S3-BOX-3, Ulanzi TC001, SHT3x-D, multi-point liquid level; custom `somose` external component under `src/my_components/` | `nolte/esphome-configs` README §Purpose, §Structure |
| "esphome-configs…" · secrets from `pass` as env vars at compile time; ESPHome via Docker image; serial flash then OTA | `nolte/esphome-configs` README §Purpose, §Prerequisites, §Compile and flash, §Over-the-air update |
| "k8s-home-lab…" · GitOps: ArgoCD reconciles manifests from SCM, Argo Workflow automates; Talos for the home lab, Kind for dev; services grouped into service sets | `nolte/k8s-home-lab` README §Personal Cluster, §Service Sets, §Project Structure; repo description |
| "k8s-home-lab…" · smart-home service set = Mosquitto (MQTT), zigbee2mqtt (Zigbee gateway), Home Assistant, ESPHome, PiHole, minio; "cloud-less" | `nolte/k8s-home-lab` `docs/service-sets/smart-home.md`; README §Smart Home |
| "home-assistant-config…" · private personal HA configuration (automations, secrets) | `gh repo view nolte/home-assistant-config` visibility `PRIVATE` (internals not read into the post) |

No source is unused. The private repository's contents are not quoted or paraphrased; only its public-facing visibility is referenced. No third party is named without grounding.

## Handover manifest

- **Build status**: green — `npm run build`, clean rebuild, 27 pages, both `/blog/self-hosting-my-smart-home/` and `/de/blog/self-hosting-my-smart-home/` rendered. (An intermittent glob-loader "Duplicate id" warning is a warm-cache artifact; a truly clean rebuild shows none, and exactly one file exists per language.)
- **Lektorat**: `nolte-shared:lektorat-apply` `audit` + `patch` via `lektorat-scanner`. Audit trail `.audits/lektorat/2026-06-09-1937/` (local artifact, not committed). 0 critical · 7 warning · 13 suggestion; all 20 applied.
- **Repository state**: branch `post/self-hosting-my-smart-home` (worktree `.claude/worktrees/post+smart-home`), based on `develop` @ 01450cb (fresh). Commit, PR, and merge are the operator's call.
