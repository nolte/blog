---
name: claude-home-assistant
description: Ein Claude-Code-Plugin mit Skills, Agents und zweisprachigen Spezifikationen für die Home-Assistant-Entwicklung — Custom-Integrationen, Lovelace-Karten, Blueprints / Automatisierungen und ESPHome- / Add-on-Arbeit.
repo: https://github.com/nolte/claude-home-assistant
homepage: https://nolte.github.io/claude-home-assistant
tags: ["claude-code", "home-assistant", "developer-tooling", "skills", "agents", "ai"]
lang: de
translationKey: claude-home-assistant
archived: false
order: 2
---

claude-home-assistant ist ein Claude-Code-Plugin, das die Skills, Agents und
Spezifikationen bündelt, mit denen ich Home-Assistant-Artefakte baue. Statt einem
KI-Assistenten immer wieder dieselben HACS-Konventionen und Config-Flow-Muster zu
erklären, steckt dieses Wissen in einem installierbaren Plugin und wird
hinzugezogen, sobald es relevant ist.

## Was du bekommst

- **Skills.** Fokussierte, bei Bedarf abrufbare Workflow-Bausteine, die Claude
  Code passend heranzieht — Config-Flow-Gerüste, Lovelace-Karten-Vorlagen,
  Blueprint-Erstellung, ESPHome-Komponentenmuster und mehr.
- **Agents.** Größere, autonome Helfer für mehrstufige Aufgaben, etwa eine neue
  Integration durchgängig zu verdrahten oder eine Karte gegen eine laufende
  HA-Instanz zu prüfen.
- **Spezifikationen.** Zweisprachige Source-of-Truth-Dokumente unter `spec/`, die
  jeden Skill und Agent steuern.

## Umfang

Das Plugin deckt die vier häufigsten Home-Assistant-Bereiche ab:

- **Custom-Integrationen (Python)** — `custom_components/<domain>/`, Config Flows,
  Coordinators, Entitäten und Tests gegen `pytest-homeassistant-custom-component`.
- **Lovelace-Karten (TypeScript / JavaScript)** — Lit-basierte Custom Cards,
  HACS-konforme Paketierung, Nutzung des `hass`-Objekts und `card-mod`-Muster.
- **Blueprints & Automatisierungen (YAML)** — Automatisierungs- und
  Skript-Blueprints, Jinja-Templates und das `packages/`-Layout.
- **ESPHome / Add-ons** — ESPHome-Custom-Komponenten und Home-Assistant-Add-ons
  (Docker / s6).

## Wie es gebaut ist

Das Plugin installiert sich über den Marketplace-Mechanismus von Claude Code in
selbiges oder läuft lokal mit `claude --plugin-dir .`. Die Automatisierung läuft
über ein `Taskfile.yml` (`task lint`, `task test`, `task docs`), die Dokumentation
ist eine MkDocs-Site, die auf GitHub Pages veröffentlicht wird, und es steht unter
der MIT-Lizenz. Es ist das Werkzeug hinter Projekten wie der
[Kamerplanter Home-Assistant-Integration](https://github.com/nolte/kamerplanter-ha).
