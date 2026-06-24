---
name: Kamerplanter Home-Assistant-Integration
description: Eine HACS-Custom-Integration, die das Kamerplanter-Pflanzenmanagement an Home Assistant anbindet — Wachstumsphasen, Nährstoffdosierungen, Tank- und Pflegeverfolgung sowie fünf automatisch registrierte Lovelace-Karten.
repo: https://github.com/nolte/kamerplanter-ha
homepage: https://nolte.github.io/kamerplanter-ha
tags: ["home-assistant", "hacs", "custom-integration", "plant-management", "python", "lovelace"]
lang: de
translationKey: kamerplanter-ha
archived: false
order: 1
---

Die Kamerplanter Home-Assistant-Integration ist die Brücke zwischen dem
[Kamerplanter](https://github.com/nolte/kamerplanter)-Pflanzenmanagement und
Home Assistant. Sie holt deine Pflanzendaten als Entitäten nach HA und stellt
Services bereit, um darauf zu reagieren — so leben Wachstumsverfolgung und Pflege
nicht länger in einem eigenen Tab abseits deiner übrigen Hausautomatisierung.

## Was sie kann

- **Pflanzenüberwachung.** Wachstumsphasen, Tage in der Phase, Vorhersagen zur
  nächsten Phase und Nährstoffplan-Zuordnungen erscheinen als
  Home-Assistant-Entitäten.
- **Nährstoffdosierungen.** Mischverhältnisse pro Kanal (ml/L) kommen als
  Sensor-Attribute mit und lassen sich direkt in Dashboard-Karten einbinden.
- **Tankverwaltung.** Füllvorgänge, Lösungsalter sowie EC-/pH-Verfolgung werden
  über HA-Services gesteuert.
- **Standortüberblick.** Aktive Durchläufe und Pflanzenzahlen pro Zelt, Raum
  oder Beet.
- **Aufgaben- und Pflegeverfolgung.** Eine Todo-Listen-Entität, Zähler für
  überfällige Aufgaben sowie Kalendereinträge für Phasen und Aufgaben, dazu
  Binärsensoren, die handlungsfähige Pflege-Erinnerungen auslösen.
- **Fünf eigene Lovelace-Karten.** Pflanzen-, Misch-, Tank-, Pflege- und
  Zimmerpflanzen-Karte registrieren sich automatisch — kein manuelles Verdrahten
  von Ressourcen.
- **Services.** Tank füllen, Kanal gießen, Pflege bestätigen, Daten aktualisieren
  und Cache leeren, allesamt aus Automatisierungen aufrufbar.

## Wie sie gebaut ist

Die Integration ist in Python geschrieben und als HACS-Custom-Integration für
Home Assistant 2024.1.0+ verpackt. Sie spricht über dessen API mit einem
Kamerplanter-Backend (mit optionalem Light Mode, der den API-Schlüssel
überspringt), und die Abfrageintervalle für Pflanzen, Standorte, Warnungen und
Aufgaben sind jeweils bis zu einem domänenspezifischen Minimum konfigurierbar.
Die mitgelieferten Lovelace-Karten werden mit der Integration ausgeliefert und
automatisch registriert, statt sie separat zu installieren.

## Mit KI gebaut

Wie Kamerplanter selbst wird auch diese Integration mit Claude Code entwickelt:
Das Repository trägt eigene Spezifikationen unter `spec/`, ein `CLAUDE.md`-Briefing,
und die Skills und Agents aus
[claude-home-assistant](https://github.com/nolte/claude-home-assistant) treiben
die tägliche Arbeit an.
