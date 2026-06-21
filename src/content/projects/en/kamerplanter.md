---
name: Kamerplanter
description: A self-hosted plant lifecycle management system — seed-to-harvest tracking with a growth-phase state machine, nutrient planning, adaptive care reminders, integrated pest management, a RAG knowledge assistant, and Home Assistant integration.
repo: https://github.com/nolte/kamerplanter
homepage: https://nolte.github.io/kamerplanter/
tags: ["plant-management", "agriculture", "self-hosted", "home-assistant", "fastapi", "react", "gdpr"]
lang: en
translationKey: kamerplanter
archived: false
order: 0
---

Kamerplanter is a self-hosted plant lifecycle management system for indoor and
outdoor growing — covering everything from seed to harvest. It supports
vegetables, herbs, houseplants, and ornamentals, and it adapts to your scale,
whether you keep a few houseplants alive, run a grow tent, plan raised beds, or
share a community garden.

## What it does

- **Master data in one place.** Master data, growth tracking, nutrient plans,
  pest management, and harvest live in a single system instead of scattered
  spreadsheets and notes.
- **Growth phase state machine.** A state machine with GDD (Growing Degree
  Days), VPD (Vapor Pressure Deficit), and photoperiod targets guides each
  plant through its stages. Perennial cycles and crop rotation are built in.
- **Adaptive care reminders.** Care schedules learn from your confirmations,
  adjust to seasons and hemispheres, and cover nine care presets from tropical
  to cactus.
- **Nutrient planning.** Fertilizer mixing with EC budgets, mixing-order safety
  (CalMag before sulfates), flush protocols, and tank management for tap, RO, or
  mixed water sources.
- **Integrated pest management.** Treatment tracking with Karenz safety
  intervals that block premature harvest, plus resistance tracking to avoid
  overusing treatments.
- **Plant recognition.** Photo-based species identification and leaf-disease
  diagnosis, wired into onboarding so you can go from a photo to a full care
  setup quickly. The goal is a self-hosted recognition engine, with the
  Pl@ntNet free tier as a fallback.
- **Knowledge assistant.** A RAG-based assistant with pluggable LLM backends
  (Anthropic, Ollama, OpenAI-compatible) answers plant-care questions grounded
  in your own data.
- **Home Assistant integration.** A custom integration imports sensor data and
  controls actuators, closing the monitoring-to-action loop.

## How it's built

The backend is Python 3.14+ with FastAPI and Celery; the frontend is React 19
with TypeScript, MUI, Redux Toolkit, and Vite. A separate knowledge service
uses pgvector with ONNX embeddings and cross-encoder reranking. Data is split
across ArangoDB (documents and graph), PostgreSQL with pgvector, and TimescaleDB
for time-series, with Redis/Valkey for cache and queue. The system is
multi-tenant with role-based access (admin/grower/viewer), runs self-hosted with
no cloud dependency, and is designed with GDPR retention policies in mind.
Deployment runs on Kubernetes via Helm and Skaffold.

## Built with AI

Kamerplanter is a vibe-coding experiment: the specifications, architecture,
domain models, backend, frontend, Helm charts, E2E tests, and documentation were
developed almost entirely through conversational AI prompting with Claude Code.
