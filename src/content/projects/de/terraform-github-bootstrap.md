---
name: terraform-github-bootstrap
description: Verwaltet Teile meines GitHub-Accounts als Terraform — das Repository-Inventar und die modernen Repository-Rulesets — als bewusste Ergänzung zu den Probot-verwalteten Einstellungen in gh-plumbing.
repo: https://github.com/nolte/terraform-github-bootstrap
tags: ["terraform", "github", "infrastructure-as-code", "iac", "automation"]
lang: de
translationKey: terraform-github-bootstrap
archived: false
order: 6
---

terraform-github-bootstrap besitzt einen Teil meiner GitHub-Konfiguration als
Code, über den
[`integrations/github`](https://registry.terraform.io/providers/integrations/github/latest/docs)-Terraform-Provider.
Der Geltungsbereich ist bewusst eng: welche Repositories existieren
(Beschreibung, Topics, Sichtbarkeit, die Flags `has_issues` / `has_wiki`) und die
per-Repo-Repository-Rulesets, die GitHubs moderne Variante der Branch-Protection
sind.

`nolte` ist ein persönlicher Benutzer-Account, keine Organisation — daher sind
reine Organisations-Belange wie Org-Einstellungen, Teams oder
organisationsweite Rulesets außerhalb des Geltungsbereichs. Sollte der Account je
zu einer Organisation migrieren, lassen sie sich in einem separaten Root-Modul
ergänzen, ohne das Bestehende zu stören.

## Warum zwei Systeme, nicht eins

Dieses Repo ist eine bewusste Ergänzung zu
[gh-plumbing](https://github.com/nolte/gh-plumbing), und die Aufteilung ist der
interessante Teil:

- **Terraform hier** besitzt Repository-Inventar und Repository-Rulesets.
- **Probot in gh-plumbing** besitzt per-Repo-Einstellungen, Labels,
  Merge-Strategie und die klassische Branch-Protection über das `_extends` der
  Settings-App.

Damit sich die beiden nicht um dieselben Felder streiten, nutzt die
`github_repository`-Ressource `ignore_changes` für alles, was Probot besitzt —
Merge-Strategien, `delete_branch_on_merge`, Auto-Merge. Jedes Werkzeug bleibt die
alleinige Source of Truth für seinen eigenen Ausschnitt.

## Wie es läuft

Der Alltagsbetrieb läuft über go-task: `task tf:fmt`, `task tf:validate`,
`task tf:plan` und das menschlich freigegebene `task tf:apply`. Bestehende
Repositories werden vor dem ersten Apply eines nach dem anderen per
`terraform import` adoptiert, sodass Terraform das Vorhandene anpasst, statt zu
versuchen, es neu zu erstellen. Das State-Backend ist vorerst lokal.

Es gibt zudem ein `portfolio-app`-Modul, das die GitHub App aus gh-plumbing
umhüllt. Weil es keine API gibt, um eine GitHub App zu erstellen oder ihren
privaten Schlüssel zu generieren, hat dieser Teil ein dokumentiertes manuelles
Runbook — App registrieren, Schlüssel generieren, installieren und die
Credentials in `gopass` ablegen, sodass Terraform sie per `TF_VAR_*` liest, ohne
dass etwas die tfvars berührt.

## Status

Bootstrap / Pre-MVP: lokaler State, noch kein CI-Gate auf `tf:plan`, und das
Inventar beginnt damit, dieses Repo selbst zu dogfooden, bevor es einen Import
nach dem anderen wächst. Es wurde mit
[claude-shared](https://github.com/nolte/claude-shared) gerüstet.
