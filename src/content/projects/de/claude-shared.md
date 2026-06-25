---
name: claude-shared
description: Ein Plugin-Monorepo aus wiederverwendbaren Claude-Code-Skills, -Agents und zweisprachigen Spezifikationen, das ich über mein ganzes Portfolio teile — eine Quelle für die Review-Gewohnheiten, Workflows und Konventionen, die sonst jedes Repo dupliziert.
repo: https://github.com/nolte/claude-shared
homepage: https://nolte.github.io/claude-shared
tags: ["claude-code", "developer-tooling", "skills", "agents", "specifications", "ai"]
lang: de
translationKey: claude-shared
archived: false
order: 3
---

claude-shared ist das Fundament, auf dem mein übriges Claude-Code-Tooling
aufbaut. Ich nutze Claude Code über rund ein Dutzend Repositories hinweg, und die
Workflows, die es braucht — Pull-Request-Konventionen, Review-Gewohnheiten,
Spec-Erstellung, Dokumentationsstruktur — lagen früher dupliziert in jeder
`CLAUDE.md` der einzelnen Repos. Das ist auseinandergedriftet. Hier lebt
stattdessen die gemeinsame Grundlage.

## Was es mitbringt

Es ist ein Plugin-Monorepo mit drei Plugins:

- **`nolte-shared`** — das gemeinsame Delivery-Lifecycle-Bündel: Spec-Erstellung,
  Pull-Request-Workflow, Dokumentationsgerüste, Audits und die
  Konventionen für parallele Arbeitskopien.
- **`nolte-media`** — Bilderzeugung und Medienverarbeitung.
- **`nolte-engineering`** — Fähigkeiten für Implementierung, Tests und Code-Audits
  in Code-Repositories.

Nach der Installation ist jeder Skill als `/<plugin>:<name>` aufrufbar — zum
Beispiel `/nolte-shared:spec` oder `/nolte-shared:working-copy-start`.

## Die drei Bausteine

- **Skills.** Fokussierte, bei Bedarf abrufbare Workflow-Bausteine, die über das
  `Skill`-Werkzeug von Claude Code aufgerufen werden — einen Worktree anlegen,
  einen spec-konformen Pull Request öffnen, Prosa lektorieren, Release-Notes
  kuratieren.
- **Agents.** Spezialisierte Sub-Agents mit fokussiertem Werkzeugzugriff —
  Reviewer, Explorer, Planer —, die von Skills oder direkt dispatcht werden, wenn
  der Aufrufer weiß, welchen er braucht.
- **Spezifikationen.** Zweisprachige Source-of-Truth-Dokumente unter `spec/`, die
  jeden Skill und Agent steuern, sodass das Verhalten in einer geschriebenen
  Regel gegründet ist statt in einem Prompt, der driftet.

## Wie es gebaut ist

Die Automatisierung läuft über ein `Taskfile.yml` (`task lint`, `task test`,
`task docs`), die Dokumentation ist eine MkDocs-Site, die auf GitHub Pages
veröffentlicht wird, und es steht unter der MIT-Lizenz. Es ist die
Werkzeugschicht hinter Projekten wie
[claude-home-assistant](https://github.com/nolte/claude-home-assistant) und hinter
den Workflows, über die ich in diesem Blog schreibe.
