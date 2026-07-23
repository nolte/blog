# Self-check manifest — self-hosted-rag-on-a-budget

- **Pair**: `src/content/posts/en/self-hosted-rag-on-a-budget.md` +
  `src/content/posts/de/self-hosted-rag-on-a-budget.md`
- **translationKey**: `self-hosted-rag-on-a-budget` (identical both sides)
- **Audience**: `primaryAudience: A` (technical readers), `secondaryAudiences: [B]`
  (portfolio reviewers) — identical both sides
- **AI disclosure**: `aiGenerated: true` set in both files
- **Readability (LIX)**: EN 34.6 (aim ≤ 45), DE 42.5 (aim ≤ 50) — both in corridor
- **Forbidden words**: none present (EN scan clean)
- **Typography (DE)**: 4 `„…"` pairs with U+201E openers / U+201C closers, no stray
  ASCII quotes in prose; spaced em-dashes; `ä/ö/ü/ß` intact
- **du-Form (DE)**: consistent; two impersonal `man` uses rewritten to `du`
- **Build**: `task build` green, 43 pages, both routes emitted
- **Lektorat audit**: `.audits/lektorat/2026-07-23-1100/` — 3 critical + 11 warning
  all fixed; 5 suggestions applied, 2 deferred (advisory), 1 dismissed (false positive)

# Source-to-claim mapping — self-hosted-rag-on-a-budget

Every concrete technical claim traces to a Kamerplanter primary source.

| Claim in post | Source |
|---------------|--------|
| pgvector on PostgreSQL 18, compiled from source, `ai_vector_chunks`, cosine | `docker/vectordb/README.md` |
| Embedding service on ONNX Runtime (CPU), no PyTorch, tokenizer + ONNX model | `docker/embedding-service/README.md` |
| Model tiers e5-small (384) / e5-base (768, default) / e5-large (1024) | `docker/embedding-service/README.md` |
| e5-large → e5-base switch: 2.2 GB / ~2 GB RAM / >15 min build vs 1.5 GB / ~1 GB | `docs/en/adr/006-embedding-modell-e5-base-hybrid-search.md` |
| Yellow-leaves smoke test, retrieval scores 0.7345–0.7909, wrong diagnosis | ADR-006 |
| Hybrid search: vector + BM25 full-text (German stemmer) + RRF formula | ADR-006 |
| Cross-encoder reranking, hybrid(top 20) → rerank(top 5) → LLM, graceful degradation | `docs/en/adr/007-cross-encoder-reranking.md` |
| Reranker as separate ONNX/FastAPI microservice | ADR-007, `docker/reranker-service/` |
| BusyBox init container copies knowledge YAML into shared volume | `docker/knowledge/README.md` |
| Four-level knowledge model; assistant never searches the internet | `docs/en/guides/rag-knowledge-base.md` |
| Edit → deploy → reindex (`/ingest`) → benchmark loop | `docs/en/guides/rag-knowledge-base.md` |
| 100 benchmark questions; topic-match + LLM-as-judge + A/B; exit 0/1 at 70% | `tools/rag-eval/README.md` |
| Failure taxonomy (synonym/generation/retrieval/knowledge) + agent that fixes | `.claude/agents/rag-eval-runner.md` |
| Upload UI for tenant guides not yet implemented; topic-match is coarse | `docs/en/guides/rag-knowledge-base.md` (§"Not yet implemented") |

Repo: https://github.com/nolte/kamerplanter (branch `main` at audit time)

# Handover manifest — self-hosted-rag-on-a-budget

- **Status**: drafted, self-checked, built, lektor-audited. No `critical`/`warning`
  findings open. Not committed, no PR opened (operator's call).
- **Frontmatter**: `draft: false`, `portfolioProject: kamerplanter`,
  `pubDate: 2026-07-23`, tags `[rag, pgvector, self-hosting, llm, embeddings, kamerplanter]`
- **Deferred (optional, future revise)**: two paragraphs run to 5 sentences
  (`en-d1-l137`, `de-d1-l143`) — advisory only, LIX comfortably in corridor.
- **No hero/OG image** supplied; `heroImage` omitted.
- **Next steps**: operator review → `git add` + commit → `nolte-shared:pull-request-create`.
