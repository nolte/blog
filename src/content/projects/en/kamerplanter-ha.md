---
name: Kamerplanter Home Assistant Integration
description: A HACS custom integration that wires the Kamerplanter plant management system into Home Assistant — growth phases, nutrient dosages, tank and care tracking, plus five auto-registered Lovelace cards.
repo: https://github.com/nolte/kamerplanter-ha
homepage: https://nolte.github.io/kamerplanter-ha
tags: ["home-assistant", "hacs", "custom-integration", "plant-management", "python", "lovelace"]
lang: en
translationKey: kamerplanter-ha
archived: false
order: 1
---

Kamerplanter Home Assistant Integration is the bridge between the
[Kamerplanter](https://github.com/nolte/kamerplanter) plant management system and
Home Assistant. It pulls your plant data into HA as entities and exposes services
to act on it, so growth tracking and care no longer live in a separate tab from
the rest of your home automation.

## What it does

- **Plant monitoring.** Growth phases, days in phase, next-phase predictions, and
  nutrient plan assignments surface as Home Assistant entities.
- **Nutrient dosages.** Per-channel mixing ratios (ml/L) ride along as sensor
  attributes, ready to drop into dashboard cards.
- **Tank management.** Fill events, solution age, and EC/pH tracking are driven
  through HA services.
- **Location overview.** Active runs and plant counts per tent, room, or bed.
- **Task and care tracking.** A todo-list entity, overdue counts, and calendar
  events for phases and tasks, plus binary sensors that fire actionable care
  reminders.
- **Five custom Lovelace cards.** Plant, mix, tank, care, and houseplant cards
  register themselves automatically — no manual resource wiring.
- **Services.** Fill tank, water channel, confirm care, refresh data, and clear
  cache, all callable from automations.

## How it's built

The integration is Python, packaged as a HACS custom integration for Home
Assistant 2024.1.0+. It talks to a Kamerplanter backend over its API (with an
optional Light Mode that skips the API key), and polling intervals for plants,
locations, alerts, and tasks are each configurable down to per-domain minimums.
The bundled Lovelace cards are shipped and auto-registered with the integration
rather than installed separately.

## Built with AI

Like Kamerplanter itself, this integration is developed with Claude Code: the
repository carries its own specifications under `spec/`, a `CLAUDE.md` briefing,
and the skills and agents from
[claude-home-assistant](https://github.com/nolte/claude-home-assistant) drive
the day-to-day authoring.
