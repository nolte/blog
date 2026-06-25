---
name: taskfiles
description: Eine kuratierte Sammlung wiederverwendbarer Taskfile-Include-Module, die meine Projekte remote einbinden, damit gängige Befehlssätze — mkdocs, kind, pre-commit, k8s — an einem Ort liegen statt pro Repo kopiert zu werden.
repo: https://github.com/nolte/taskfiles
homepage: https://nolte.github.io/taskfiles
tags: ["go-task", "taskfile", "developer-tooling", "automation", "reusable"]
lang: de
translationKey: taskfiles
archived: false
order: 5
---

taskfiles ist das Gegenstück zu meiner CI-Verrohrung auf der lokalen
Befehlsebene. Während [gh-plumbing](https://github.com/nolte/gh-plumbing) die
GitHub Actions teilt, die in der CI laufen, teilt dieses Repo die
[go-task](https://taskfile.dev)-Befehle, die ich auf meiner eigenen Maschine
ausführe — sodass `task mkdocs:start` oder `task pre-commit:install` sich in
jedem Projekt, das es einbindet, gleich verhält.

## Was es mitbringt

Jedes Modul ist eine einzelne YAML-Datei unter `src/`, und Konsumenten binden es
über Taskfiles
[remote-taskfiles](https://taskfile.dev/experiments/remote-taskfiles/)-Experiment
ein. Es gibt keinen Build-Schritt und kein Laufzeit-Artefakt — die YAML-Dateien
selbst sind das Produkt. Heute deckt es vier Bereiche ab:

- **mkdocs** — `start`, um die Doku lokal zu servieren.
- **kind** — `start`, `destroy`, `recreate` für ein lokales Kubernetes-Cluster.
- **pre-commit** — `install` und `start`.
- **k8s** — `bootstrap` und `install-argocd`.

## Die eine Regel, die es funktionieren lässt

Jeder Task in jedem Modul setzt `dir: '{{.USER_WORKING_DIR}}'`, sodass Befehle im
Arbeitsverzeichnis des Konsumenten-Projekts laufen, niemals in diesem Repository.
Diese eine Konvention ist es, die ein Remote-Include sich verhalten lässt, als
wären die Tasks lokal.

## Einbinden

Ein Konsument richtet eine Basis-Variable auf den Roh-Modulpfad und listet die
Includes:

```yaml
version: '3'

vars:
  TASK_COLLECTION_BASE: https://raw.githubusercontent.com/nolte/taskfiles/main/src

includes:
  mkdocs: "{{.TASK_COLLECTION_BASE}}/taskfile-include-mkdocs.yaml"
  pre-commit: "{{.TASK_COLLECTION_BASE}}/taskfile-include-pre-commit.yaml"
```

Auf `main` zu pinnen ist bequem zum Experimentieren, setzt dich aber dem Drift
aus; für wiederholbares Verhalten pinnst du stattdessen jeden Include auf einen
veröffentlichten Tag. Weil alle Module dieselbe Basis-Adresse teilen, landet ein
Renovate-artiger Bump in einem einzigen Pull Request. Jedes Modul stellt zudem
einen kleinen Satz `vars:`-Defaults bereit, die du pro Include überschreiben
kannst.

Es folgt denselben Portfolio-Konventionen wie der Rest meiner Repos —
Projektstruktur, Branching-Modell, Release-Automatisierung aus
[claude-shared](https://github.com/nolte/claude-shared), CI über gh-plumbing —
und steht unter der MIT-Lizenz.
