---
name: Kamerplanter
description: Ein selbst gehostetes System für den Pflanzen-Lebenszyklus — von der Aussaat bis zur Ernte, mit Wachstumsphasen-Zustandsautomat, Nährstoffplanung, adaptiven Pflege-Erinnerungen, integriertem Pflanzenschutz, RAG-Wissensassistent und Home-Assistant-Anbindung.
repo: https://github.com/nolte/kamerplanter
homepage: https://nolte.github.io/kamerplanter/
tags: ["plant-management", "agriculture", "self-hosted", "home-assistant", "fastapi", "react", "gdpr"]
lang: de
translationKey: kamerplanter
archived: false
order: 0
---

Kamerplanter ist ein selbst gehostetes System für den gesamten Lebenszyklus
deiner Pflanzen — drinnen wie draußen, von der Aussaat bis zur Ernte. Es deckt
Gemüse, Kräuter, Zimmerpflanzen und Zierpflanzen ab und passt sich deinem
Maßstab an: ob du ein paar Zimmerpflanzen am Leben hältst, ein Grow-Zelt
betreibst, Hochbeete planst oder dir einen Gemeinschaftsgarten teilst.

## Was es kann

- **Stammdaten an einem Ort.** Stammdaten, Wachstumsverfolgung,
  Nährstoffpläne, Pflanzenschutz und Ernte liegen in einem System statt verstreut
  über Tabellen und Notizzettel.
- **Wachstumsphasen-Zustandsautomat.** Ein Zustandsautomat mit Zielwerten für
  GDD (Growing Degree Days), VPD (Vapor Pressure Deficit) und Photoperiode führt
  jede Pflanze durch ihre Phasen. Mehrjährige Zyklen und Fruchtfolge sind
  eingebaut.
- **Adaptive Pflege-Erinnerungen.** Die Pflegepläne lernen aus deinen
  Bestätigungen, passen sich Jahreszeiten und Hemisphären an und decken neun
  Pflege-Voreinstellungen von tropisch bis Kaktus ab.
- **Nährstoffplanung.** Düngermischung mit EC-Budgets, Sicherheit bei der
  Mischreihenfolge (CalMag vor Sulfaten), Spülprotokolle und Tankverwaltung für
  Leitungs-, Osmose- oder Mischwasser.
- **Integrierter Pflanzenschutz.** Behandlungsverfolgung mit
  Karenz-Sicherheitsintervallen, die eine zu frühe Ernte blockieren, plus
  Resistenzverfolgung, damit Behandlungen nicht übermäßig eingesetzt werden.
- **Pflanzenerkennung.** Foto-basierte Arterkennung und Diagnose von
  Blattkrankheiten, ins Onboarding eingebunden, damit du schnell vom Foto zur
  fertigen Pflege-Einrichtung kommst. Ziel ist eine selbst gehostete
  Erkennungs-Engine, mit dem kostenlosen Pl@ntNet-Tarif als Rückfallebene.
- **Wissensassistent.** Ein RAG-basierter Assistent mit austauschbaren
  LLM-Backends (Anthropic, Ollama, OpenAI-kompatibel) beantwortet Fragen zur
  Pflanzenpflege — fundiert auf deinen eigenen Daten.
- **Home-Assistant-Anbindung.** Eine eigene Integration importiert Sensordaten
  und steuert Aktoren und schließt so den Kreis von der Überwachung zur Aktion.

## Wie es gebaut ist

Das Backend ist Python 3.14+ mit FastAPI und Celery; das Frontend ist React 19
mit TypeScript, MUI, Redux Toolkit und Vite. Ein separater Wissensdienst nutzt
pgvector mit ONNX-Embeddings und Cross-Encoder-Reranking. Die Daten verteilen
sich auf ArangoDB (Dokumente und Graph), PostgreSQL mit pgvector und TimescaleDB
für Zeitreihen, mit Redis/Valkey für Cache und Queue. Das System ist
mandantenfähig mit rollenbasiertem Zugriff (admin/grower/viewer), läuft selbst
gehostet ohne Cloud-Abhängigkeit und ist mit Blick auf DSGVO-Aufbewahrungsfristen
gestaltet. Das Deployment läuft auf Kubernetes über Helm und Skaffold.

## Mit KI gebaut

Kamerplanter ist ein Vibe-Coding-Experiment: Spezifikationen, Architektur,
Domänenmodelle, Backend, Frontend, Helm-Charts, E2E-Tests und Dokumentation
sind nahezu vollständig im Gespräch mit Claude Code entstanden.
