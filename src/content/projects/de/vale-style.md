---
name: vale-style
description: Ein Vale-Paket, das Rechtschreibregeln und Vokabulare über meine Projekte hinweg teilt — ein Zip ausliefern, überall einbinden — damit das Prosa-Linting konsistent bleibt, ohne Wortlisten pro Repo zu kopieren.
repo: https://github.com/nolte/vale-style
homepage: https://nolte.github.io/vale-style
tags: ["vale", "prose-linting", "documentation", "developer-tooling", "reusable"]
lang: de
translationKey: vale-style
archived: false
order: 7
---

vale-style ist das Gegenstück zum übrigen geteilten Tooling auf der Ebene des
Prosa-Lintings. [Vale](https://github.com/errata-ai/vale) fängt Tippfehler und
nicht gelistete Terminologie in Markdown ab, aber seine Vokabulare und
Accept-Listen werden gern in jedes Repo kopiert und driften dann auseinander.
Hier sind sie einmal gebündelt und werden als einzelnes Release-Archiv
ausgeliefert, das jedes Projekt per URL einbindet.

## Wie es eingebunden wird

Ein Konsument fügt das Paket seiner `.vale.ini` hinzu und zeigt auf das
`releases/latest`-Archiv, sodass die Referenz nicht von Hand aktualisiert werden
muss:

```ini
StylesPath = styles

Packages = https://github.com/nolte/vale-style/releases/latest/download/nolte-styles.zip

Vocab = technical

[*.md]
BasedOnStyles = Vale, nolte-styles
```

Anschließend zieht `vale sync` das Archiv und `vale .` lintet. Projekte, die
reproduzierbare Builds wollen, pinnen statt `latest` einen konkreten
Release-Tag.

## Was im Archiv steckt

Das Release `nolte-styles.zip` entpackt sich zu einer `.vale.ini`, dem
`nolte-styles`-Platzhalter-Style und den Vokabularen unter
`styles/config/vocabularies/`. Heute werden zwei Vokabulare ausgeliefert:

- **`technical`** — allgemeine projektübergreifende und
  Software-Engineering-Terminologie (Ansible, ESPHome, MkDocs, CI, PRs,
  Dockerfiles, Runbooks, Dogfooding, …).
- **`esphome`** — ESPHome-spezifische Hardware, Pins und YAML-Schlüssel (`GPIO`,
  `baud_rate`, `restore_from_flash`, …).

Zusätzliche Vokabulare aktivierst du, indem du sie in `Vocab` aufführst.

## Wie es gebaut und gesteuert wird

Es gibt keine Versionsdatei — der Bump passiert durch das Schneiden eines
GitHub-Releases, das den Archiv-Workflow auslöst, der `nolte-styles.zip`
anhängt. Die Kurationsregeln für die Vokabulare liegen unter `spec/` als
zweisprachige EN/DE-Specs, die strukturell synchron gehalten werden — dasselbe
Source-of-Truth-Muster, das ich in
[claude-shared](https://github.com/nolte/claude-shared) nutze. Es ist das
Style-Rückgrat hinter den Vale-Checks in den wiederverwendbaren Workflows von
[gh-plumbing](https://github.com/nolte/gh-plumbing).
