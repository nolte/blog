---
title: "Eine selbst gehostete Pflanzen-KI, die ehrlich bleibt: pgvector, kleine Modelle und ein Benchmark"
description: "Der Assistent von Kamerplanter läuft auf meiner eigenen Hardware, mit wenig RAM, ganz ohne Cloud. So erdet ein pgvector-Speicher zusammen mit zwei kleinen ONNX-Diensten die Antworten, so verbessere ich sie Benchmark-Lauf für Benchmark-Lauf — und so weiß ich, wann sie wirklich stimmen."
pubDate: 2026-07-23
lang: de
translationKey: self-hosted-rag-on-a-budget
tags: ["rag", "pgvector", "self-hosting", "llm", "embeddings", "kamerplanter"]
draft: false
portfolioProject: kamerplanter
aiGenerated: true
primaryAudience: A
secondaryAudiences: [B]
---

Ich wollte, dass meine Pflanzen-App Fragen zu *meinen* Pflanzen beantwortet.
Nicht zu Pflanzen im Allgemeinen — sondern zu der Tomate in der dritten
Blütewoche, bei EC 1,2 (elektrische Leitfähigkeit) und pH 5,8, die ich vor zwei
Tagen gedüngt habe. Ein
allgemeiner Chatbot kann das nicht. Er hat meinen Anbau nie gesehen.

Also zieht sich [Kamerplanter](https://github.com/nolte/kamerplanter) seinen
eigenen Assistenten heran. Er läuft auf Hardware, die mir gehört, mit einem
RAM-Budget, das du bescheiden nennen würdest, und kommt ohne jede Cloud aus. In
diesem Beitrag geht es um drei Dinge, die das möglich gemacht haben: eine
Vektordatenbank aufzusetzen, den ganzen Stack kleinzuhalten und — der Teil, der
mir am wichtigsten ist — zu beweisen, dass die Antworten stimmen, bevor ich ihnen
vertraue.

## Warum Erdung statt größerem Modell

Ein Sprachmodell, das nur aus seinem Training antwortet, versagt auf zwei Arten.
Es erfindet Fakten, die plausibel klingen. Und es hat keine Ahnung, was meine
konkrete Pflanze gerade tut.

Die Lösung heißt Retrieval-Augmented Generation, kurz RAG. Bevor das Modell ein
Wort schreibt, durchsucht das System einen geprüften Speicher nach passendem Text
und reicht ihn als Kontext weiter. Das Modell denkt dann über Fakten nach, die es
bekommen hat, statt aus dem Gedächtnis zu raten.

Das verändert die Fragestellung. Ich brauche kein riesiges Modell. Ich brauche gutes
Retrieval und ein kleines Modell, das Anweisungen folgt. Beim Retrieval wird das
Ressourcen-Budget wirklich ausgegeben — und daran entscheidet sich ein
selbst gehosteter Aufbau.

## Den Vektorspeicher aufsetzen

Der Speicher ist [pgvector](https://github.com/pgvector/pgvector) auf PostgreSQL
18. Schlichtes Postgres, eine Erweiterung, im Image aus dem Quellcode gebaut, die
Build-Werkzeuge danach wieder entfernt. Die Vektoren liegen in einer Tabelle
namens `ai_vector_chunks`. Die Ähnlichkeit ist Kosinus-Distanz. Nichts Exotisches.

Aus Text werden Vektoren in einem eigenen Embedding-Dienst. Er läuft auf ONNX
Runtime auf der CPU — kein PyTorch, keine GPU. Das Image bringt einen Tokenizer
und ein ONNX-Modell mit, sonst nichts. Das hält ihn leicht genug, um neben allem
anderen auf einer Maschine zu sitzen.

Das Wissen selbst ist eine Sammlung von YAML-Dateien. Ein winziger
BusyBox-Init-Container kopiert sie beim Pod-Start in ein geteiltes Volume, damit
der Dienst immer die Version liest, die mit dem Deployment ausgeliefert wurde. Das
Wissen ist kuratiert, versioniert und im besten Sinne langweilig.

Das Retrieval schöpft aus vier Ebenen. Zwei werden vektorisiert und durchsucht:
globale Stammdaten zu Arten und Phasen sowie 31 thematische Leitfäden, von
Gärtnern geschrieben. Zwei werden bei jeder Anfrage frisch eingespielt: der
aktuelle Zustand deines Anbaus und deine eigene Pflegehistorie. Die Vektoren
tragen das allgemeine Wissen; der Laufzeit-Kontext macht die Antwort zu deiner.

## Der ganze Sinn ist, klein zu bleiben

Hier wurde das Budget konkret. Das erste funktionierende Embedding-Modell war
`multilingual-e5-large` mit 1024 Dimensionen. Es funktionierte. Es war aber auch
ein 2,2-GB-Download, trieb die Docker-Builds über fünfzehn Minuten und wollte rund
2 GB RAM allein für die Inferenz.

Für eine Wissensbasis aus wenigen hundert Chunks ist das ein schlechter Handel.
Also stieg das Projekt auf `multilingual-e5-base` mit 768 Dimensionen um —
festgehalten in einem Architecture Decision Record ([ADR-006][adr6]): die halbe
Vektor-Auflösung, etwa der halbe RAM, ein
1,5-GB-Image. Der Qualitätsunterschied zwischen 768 und 1024 Dimensionen war den
Preis in dieser Größenordnung nicht wert.

Der Embedding-Dienst behält das größere Modell weiter als Build-Ziel, und
unterhalb der Voreinstellung eine 384-Dimensionen-Variante `small` für Maschinen
mit noch knapperem Speicher. Der Punkt ist nicht, dass größer schlecht ist.
Entscheidend ist: Du wählst das kleinste Modell, das deine Retrieval-Qualität sich
leisten kann — und was sie sich leisten kann, weißt du erst, wenn du es misst.

## Die Antworten Lauf für Lauf besser machen

Die erste Version war nicht gut. In einem Smoke-Test stellte ich die klassische
Frage:

> Meine unteren Blätter werden gelb, die oberen sind noch grün. Was fehlt?

Die richtige Antwort ist ein Stickstoffmangel. Der Retriever brachte den
Stickstoff-Chunk überhaupt nicht nach oben. Das kam stattdessen zurück:

| Rang | Chunk | Score |
|------|-------|-------|
| 1 | Karenzzeit vor der Ernte | 0,7909 |
| 2 | Topping und FIM | 0,7867 |
| 3 | Saatgut-Vorbehandlung | 0,7380 |
| 4 | Blüte bei Gemüse | 0,7346 |
| 5 | Grauschimmel erkennen | 0,7345 |

Jeder Score liegt zwischen 0,73 und 0,79. Es gibt kein echtes Signal — das Modell
quetschte jeden Pflegetext in dieselbe winzige Ecke des Vektorraums. Das
Sprachmodell bekam Müll als Kontext und diagnostizierte selbstbewusst den falschen
Nährstoff.

Zwei Änderungen reparierten das Retrieval, und beide lohnt es sich zu klauen.

**Hybride Suche.** Reine Vektorsuche ist fragil, wenn das Modell einen Fachbegriff
schlecht kodiert. Also fährt der Speicher zusätzlich eine PostgreSQL-Volltextsuche
mit deutschem Stemmer und verschmilzt die beiden Ranglisten per Reciprocal Rank
Fusion:

```text
RRF_score = 0.5 / (60 + vector_rank) + 0.5 / (60 + text_rank)
```

Die Vektorseite findet, was dasselbe bedeutet. Die Stichwortseite fängt das exakte
Wort „Stickstoff“, wenn die Vektoren es verpassen. Ein Chunk, der in beiden gut
rankt, gewinnt. RRF hat kaum Stellschrauben — genau deshalb mag ich es.

**Cross-Encoder-Reranking.** Hybride Suche ist gut im Recall, aber schludrig in
der Präzision — ein Stichworttreffer ohne echte Relevanz rutscht trotzdem in den
Kontext. Also ordnet eine zweite, optionale Stufe die Vorauswahl neu
([ADR-007][adr7]):

```text
Anfrage → Hybride Suche (Top 20) → Cross-Encoder-Rerank (Top 5) → LLM
```

Der Reranker ist ein eigener kleiner ONNX-Dienst, das Pendant zum
Embedding-Dienst. Ist er nicht deployt, läuft die Pipeline nur mit hybrider
Suche und antwortet trotzdem. Dieser saubere Rückfall ist bei einem kleinen
Aufbau wichtig: Die teure Stufe ist eine Wahl, keine harte Abhängigkeit.

Mit gut zusammengestelltem Kontext ändert sich die Beispielantwort völlig. Statt
auf Kalium zu tippen, liest der Assistent den aktuellen EC von 1,2, merkt an, dass
es die dritte Blütewoche ist, und erklärt, dass etwas Gelb an den unteren Blättern
hier normal ist — flaggt aber trotzdem den niedrigen EC. Diese Antwort ist nur
möglich, weil das Retrieval ihm die richtigen Fakten gereicht hat.

Die Schleife, um all das zu verbessern, ist bewusst kurz und manuell. Eine
Wissens-YAML bearbeiten. Neu deployen, damit die Datei im Container ankommt. Eine
Neuindizierung anstoßen, die jeden Chunk neu in pgvector einbettet. Dann den
Benchmark laufen lassen und schauen, ob sich der Score bewegt hat.

## Wissen, wann es wirklich stimmt

Ein Assistent, der selbstbewusst klingt, ist leicht. Einer, dem ich vertraue,
musste einen Benchmark bestehen.

Es gibt 100 kuratierte Fragen samt den Themen, die jede Antwort abdecken soll. Ein
eigenständiges Werkzeug schickt jede Frage durch die echte Pipeline —
Embedding-Dienst, pgvector, lokales LLM — und bewertet das Ergebnis. Es misst auf
drei Arten: Passt der geholte Kontext zu den erwarteten Themen? Beurteilt ein
zweites Modell die fachliche Richtigkeit? Und hat eine Änderung die vorige Basis
in einem A/B-Lauf geschlagen?

Das Werkzeug ist dort bewusst grob, wo es zählt. Es schreibt einen JSON-Report und
endet mit Code 0 oberhalb einer 70-%-Bestehensgrenze und mit 1 darunter, also
passt es direkt in eine CI-Pipeline (Continuous Integration):

```json
{
  "model": "gemma3:4b",
  "total_score": 0.785,
  "pass": true,
  "min_pass_score": 0.70,
  "questions_evaluated": 100
}
```

Der Bestehens-Score ist aber nicht das Spannende. Die Fehlschläge sind es. Jede
gescheiterte Frage wird einer von wenigen Ursachen zugeordnet, denn jede Ursache
hat einen anderen Fix:

- **Synonym-Lücke** — die Antwort war richtig, nur die Bewertung erkannte die
  Formulierung nicht. Repariere die Bewertung, nicht das Wissen.
- **Generierungs-Fehler** — der richtige Chunk war im Kontext, das Modell nutzte
  ihn aber nicht. Repariere den Prompt oder das Modell.
- **Retrieval-Fehler** — der Chunk existiert, wurde aber nicht geholt. Repariere
  die Embeddings oder das Chunking.
- **Wissens-Lücke** — der Fakt fehlt ganz. Schreibe einen neuen Chunk.

Diese Einordnung ist der ganze Trick. „Der Benchmark ist gefallen“ ist nichts, wo
du ansetzen kannst. „Sechs Fragen scheiterten am Retrieval in der Kategorie
Düngung“, sagt mir genau, was als Nächstes anzufassen ist. Ein Agent lässt den
Benchmark laufen, sortiert jeden Fehlschlag in diese Schubladen, repariert die
billigen selbst und reicht die teuren — die echten Wissens-Lücken — an einen
zweiten Agenten weiter, der den fehlenden Inhalt schreibt. Danach läuft der
Benchmark erneut, um zu bestätigen, dass der Fix hält.

Eine Entwurfsentscheidung trägt das Ganze: Der Assistent durchsucht nie das
Internet. Jede Antwort kommt aus der lokalen Wissensbasis und deinen eigenen
Daten. Das ist eine bewusste Wahl für den Datenschutz und gegen Halluzinationen —
und sie ist nur haltbar, weil der Benchmark das lokale Wissen ehrlich hält.

## Was das wirklich bringt

Keines der Einzelteile ist neu. pgvector ist pgvector. Hybride Suche und
Cross-Encoder-Reranking stehen im Lehrbuch. Kleine ONNX-Modelle auf der CPU sind
ein bekannter Kniff.

Wert zu notieren finde ich die Form des Ganzen. Eine geerdete, persönliche KI
braucht kein Rechenzentrum. Sie braucht einen kleinen Vektorspeicher, Modelle in
der Größe, die das Retrieval nachweislich benötigt, und einen Benchmark, der aus
„fühlt sich besser an“ eine Zahl und eine Kategorie macht. Die Modelle werden
weiter kleiner und besser. Die Schleife — messen, einordnen, reparieren, neu
messen — ist der Teil, der bleibt.

Es gibt hier ehrliche offene Baustellen. Es gibt noch keine Oberfläche, über die
ein Mandant eigene Leitfäden hochlädt. Die Themen-Bewertung des Benchmarks ist
gröber, als mir lieb ist. Aber die Antworten sind geerdet, die Fehlschläge sind
lesbar, und das Ganze passt auf Hardware, die mir schon gehört. Für eine
individuelle KI ist das genau der Handel, den ich wollte.

[adr6]: https://github.com/nolte/kamerplanter/blob/main/docs/en/adr/006-embedding-modell-e5-base-hybrid-search.md
[adr7]: https://github.com/nolte/kamerplanter/blob/main/docs/en/adr/007-cross-encoder-reranking.md
