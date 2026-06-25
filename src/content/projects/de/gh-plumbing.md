---
name: gh-plumbing
description: Zentralisierte, wiederverwendbare GitHub-Actions-Workflows und gemeinsame GitHub-App-Konfigurationen, damit die Repos in meinem Portfolio aufhören, CI/CD-Boilerplate zu duplizieren.
repo: https://github.com/nolte/gh-plumbing
homepage: https://nolte.github.io/gh-plumbing
tags: ["github-actions", "ci-cd", "reusable-workflows", "probot", "automation", "developer-tooling"]
lang: de
translationKey: gh-plumbing
archived: false
order: 4
---

gh-plumbing ist der Ort, an dem die CI/CD-Verrohrung für mein Portfolio liegt,
damit sie nicht in jedes Repo kopiert wird. Das gelöste Problem ist das
langweilige: Ein Dutzend Projekte braucht dieselbe Release-Pipeline, dieselben
Linting-Gates, denselben Docs-Build — und diese Logik von Hand über Repos hinweg
synchron zu halten, ist ein aussichtsloses Spiel. Also liegt sie hier einmal, und
die nachgelagerten Projekte rufen sie auf.

## Wiederverwendbare Workflows

Das Herz des Repos ist eine Reihe von `reusable-*`-GitHub-Actions-Workflows, die
andere Repositories per `workflow_call` aufrufen. Sie decken den Lebenszyklus ab,
auf den ich immer wieder stoße:

- **Bauen und Testen** — statische pre-commit-Checks, Python-Coverage mit
  `pytest-cov`, Node.js-Coverage mit Vitest oder Jest, jeweils mit optionalem
  `fail-under`-Gate, das in die Job-Zusammenfassung gerendert wird.
- **Container** — ein schnelles Lint-and-dry-build für PR-Feedback (`hadolint`
  plus ein buildx-Build ohne Push) und ein Multi-Arch-Publish-Schritt in eine
  konfigurierbare OCI-Registry.
- **Releases** — release-drafter für das Changelog, ein Publish-Schritt, der
  einen Entwurf zu einem veröffentlichten Release befördert, und ein
  Fast-Forward von `master` auf den neuesten Tag.
- **Docs** — `mkdocs build --strict`, damit kaputte Links den PR scheitern
  lassen, plus Build und Veröffentlichung auf GitHub Pages (und dasselbe für
  Sphinx).
- **Security und Supply Chain** — Trivy-Scans, Dependency-Review und der
  chain-bench-CIS-Benchmark.

Es gibt mehr — Ansible-Galaxy-Publishing, Molecule-Szenarien, HACS-Validierung
für Home-Assistant-Integrationen, Vale-Rechtschreibprüfung — jeweils ein dünner
Wrapper um eine bekannte Action, gepinnt und geteilt.

## Gemeinsame Probot-Konfiguration

Über die Workflows hinaus trägt das Repo einen gemeinsamen Satz von
Probot-App-Konfigurationen — `settings`, `boring-cyborg`, `stale` und das
Renovate-Preset —, den nachgelagerte Repos per `_extends` einbinden. So bleiben
Repository-Einstellungen, Branch-Protection und PR-Labelling konsistent, ohne
überall neu deklariert zu werden.

## Wie es zusammenpasst

Es bildet ein Gespann mit [taskfiles](https://github.com/nolte/taskfiles) für die
lokalen Befehlssätze und wird ergänzt durch
[terraform-github-bootstrap](https://github.com/nolte/terraform-github-bootstrap),
das das Repository-Inventar und die Rulesets besitzt, die Probot nicht abdeckt.
Lokales Workflow-Testen läuft über [nektos/act](https://github.com/nektos/act),
und die Doku ist eine MkDocs-Site auf GitHub Pages.
