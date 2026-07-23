---
title: "A self-hosted plant AI that stays honest: pgvector, small models, and a benchmark"
description: "Kamerplanter's assistant runs on my own hardware, on modest RAM, with no cloud. Here is how a pgvector store and two small ONNX services ground its answers, how I improve them one benchmark run at a time, and how I know when it is actually right."
pubDate: 2026-07-23
lang: en
translationKey: self-hosted-rag-on-a-budget
tags: ["rag", "pgvector", "self-hosting", "llm", "embeddings", "kamerplanter"]
draft: false
portfolioProject: kamerplanter
aiGenerated: true
primaryAudience: A
secondaryAudiences: [B]
---

I wanted my plant app to answer questions about *my* plants. Not plants in
general — the tomato in week three of flowering, sitting at EC 1.2 (electrical
conductivity) and pH 5.8, that I fed two days ago. A general chatbot cannot do that. It has never seen my
grow.

So [Kamerplanter](https://github.com/nolte/kamerplanter) grows its own
assistant. It runs on hardware I own, on a RAM budget you would call modest, and
it never calls a cloud. This post is about three things that made that possible:
standing up a vector database, keeping the whole stack small, and — the part I
care about most — proving the answers are right before I trust them.

## Why grounding, not a bigger model

A language model answering from its training alone fails in two ways. It invents
facts that sound plausible. And it has no idea what my specific plant is doing
right now.

The fix is Retrieval-Augmented Generation, or RAG. Before the model writes a
word, the system searches a trusted store for relevant text and hands it over as
context. The model then reasons over facts it was given, instead of guessing
from memory.

That reframes the problem. I do not need a huge model. I need good retrieval and
a small model that follows instructions. Good retrieval is where the resource
budget actually gets spent — and where a self-hosted setup lives or dies.

## Standing up the vector store

The store is [pgvector](https://github.com/pgvector/pgvector) on PostgreSQL 18.
Plain Postgres, one extension, compiled from source in the image, with the build
tools purged afterwards. Vectors live in a table called `ai_vector_chunks`.
Similarity is cosine distance. Nothing exotic.

Text becomes vectors in a separate embedding service. It runs on ONNX Runtime on
the CPU — no PyTorch, no GPU. The image ships a tokenizer and an ONNX model and
nothing else. That keeps it light enough to sit next to everything else on one
box.

The knowledge itself is a set of YAML files. A tiny BusyBox init container copies
them into a shared volume at pod startup, so the service always reads the version
that shipped with the deployment. The knowledge is curated, versioned, and boring
in the best way.

Retrieval draws on four levels. Two are vectorised and searched: global master
data about species and phases, and 31 thematic guides written by growers. Two are
injected fresh on every request: the live state of your grow, and your own care
history. The vectors carry the general knowledge; the runtime context makes the
answer yours.

## The whole point is to stay small

Here is where the budget got concrete. The first working embedding model was
`multilingual-e5-large` at 1024 dimensions. It worked. It was also a 2.2 GB
download, pushed Docker builds past fifteen minutes, and wanted around 2 GB of
RAM just to run inference.

For a knowledge base of a few hundred chunks, that is a bad trade. So the project
stepped down to `multilingual-e5-base` at 768 dimensions — recorded in an
Architecture Decision Record ([ADR-006][adr6]): half
the vector resolution, roughly half the RAM, a 1.5 GB image. The quality gap
between 768 and 1024 dimensions did not justify the cost at this scale.

The embedding service still keeps the larger model as a build target, and a
384-dimension `small` variant below the default, for machines even tighter on
memory. The point is not that bigger is bad. The point is that you pick the
smallest model your retrieval quality can afford — and you only know what it can
afford once you measure it.

## Making the answers better, one run at a time

The first version was not good. During a smoke test I asked the classic question:

> My lower leaves are turning yellow, the upper ones are still green. What is
> missing?

The correct answer is a nitrogen deficiency. The retriever never surfaced the
nitrogen chunk at all. Here is what it returned instead:

| Rank | Chunk | Score |
|------|-------|-------|
| 1 | Pre-harvest safety interval | 0.7909 |
| 2 | Topping and FIM | 0.7867 |
| 3 | Seed pre-treatment | 0.7380 |
| 4 | Flowering in vegetables | 0.7346 |
| 5 | Gray mold detection | 0.7345 |

Every score sits between 0.73 and 0.79. There is no real signal — the model
crushed every plant-care text into the same tiny corner of the vector space. The
language model got junk context and confidently diagnosed the wrong nutrient.

Two changes fixed the retrieval, and both are worth stealing.

**Hybrid search.** Pure vector search is fragile when the model does not encode a
domain term well. So the store also runs a PostgreSQL full-text search with a
German stemmer, and fuses the two rankings with Reciprocal Rank Fusion:

```text
RRF_score = 0.5 / (60 + vector_rank) + 0.5 / (60 + text_rank)
```

The vector side finds things that mean the same. The keyword side catches the
exact word "Stickstoff" when the vectors miss it. A chunk that ranks well in both
wins. RRF has almost no knobs to tune, which is exactly why I like it.

**Cross-encoder reranking.** Hybrid search is good at recall but sloppy on
precision — a keyword match with no real relevance can still slip into the
context. So a second, optional stage reorders the shortlist ([ADR-007][adr7]):

```text
Query → Hybrid search (top 20) → Cross-encoder rerank (top 5) → LLM
```

The reranker is its own small ONNX service, mirroring the embedding one. If it is
not deployed, the pipeline runs hybrid-search-only and still answers. That
graceful fallback matters on a small setup: the expensive stage is a choice, not
a hard dependency.

With good context assembled, the example answer changes completely. Instead of
guessing potassium, the assistant reads the live EC of 1.2, notes it is week
three of flowering, and explains that some lower-leaf yellowing is normal here
while still flagging the low EC. That answer is only possible because retrieval
handed it the right facts.

The loop to improve all this is short and manual by design. Edit a knowledge YAML
file. Redeploy so the file reaches the container. Trigger a reindex, which
re-embeds every chunk into pgvector. Then run the benchmark and see if the score
moved.

## Knowing when it is actually right

An assistant that sounds confident is easy. One I can trust took a benchmark.

There are 100 curated questions with the topics each answer should cover. A
standalone tool runs every question through the real pipeline — embedding
service, pgvector, local LLM — and scores the result. It grades three ways: does
the retrieved context match the expected topics, does a second model act as
judge on factual accuracy, and did a change beat the previous baseline in an A/B
run.

The tool is deliberately blunt where it counts. It writes a JSON report and exits
with code 0 above a 70% pass mark and 1 below it, so it drops straight into a CI
pipeline:

```json
{
  "model": "gemma3:4b",
  "total_score": 0.785,
  "pass": true,
  "min_pass_score": 0.70,
  "questions_evaluated": 100
}
```

A pass score is not the interesting part, though. The failures are. Every failed
question gets classified into one of a small set of causes, because each cause
has a different fix:

- **Synonym gap** — the answer was right, the scorer just did not recognise the
  wording. Fix the scorer, not the knowledge.
- **Generation miss** — the right chunk was in context, but the model did not use
  it. Fix the prompt or the model.
- **Retrieval miss** — the chunk exists but did not get retrieved. Fix embeddings
  or chunking.
- **Knowledge gap** — the fact is missing entirely. Write a new chunk.

That taxonomy is the whole trick. "The benchmark dropped" is not actionable. "Six
questions failed on retrieval miss in the fertilisation category" tells me exactly
what to touch next. An agent runs the benchmark, sorts every failure into these
buckets, fixes the cheap ones itself, and hands the expensive ones — the genuine
knowledge gaps — to a second agent that writes the missing content. Then it
re-runs the benchmark to confirm the fix held.

One design decision underpins all of it: the assistant never searches the
internet. Every answer comes from the local knowledge base and your own data.
That is a deliberate choice for privacy and against hallucination — and it is
only defensible because the benchmark keeps the local knowledge honest.

## What this actually buys

None of the individual pieces are novel. pgvector is pgvector. Hybrid search and
cross-encoder reranking are textbook. Small ONNX models on CPU are a known trick.

What I find worth writing down is the shape of the whole thing. A grounded,
personal AI does not need a data centre. It needs a small vector store, models
sized to what your retrieval can prove it needs, and a benchmark that turns "feels
better" into a number and a category. The models will keep getting smaller and
better. The loop — measure, classify, fix, re-measure — is the part that lasts.

There is honest unfinished work here. There is no UI yet for a tenant to upload
their own guides. The benchmark's topic-match scoring is coarser than I would
like. But the answers are grounded, the failures are legible, and the whole thing
fits on hardware I already own. For an individual AI, that is the trade I wanted.

[adr6]: https://github.com/nolte/kamerplanter/blob/main/docs/en/adr/006-embedding-modell-e5-base-hybrid-search.md
[adr7]: https://github.com/nolte/kamerplanter/blob/main/docs/en/adr/007-cross-encoder-reranking.md
