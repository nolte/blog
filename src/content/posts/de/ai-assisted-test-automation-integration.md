---
title: "Auf der Integrationsstufe endet die Leine des Agenten"
description: "Teil drei der Serie: Mach die Datenbank echt, und die drei Eigenschaften der Unit-Stufe brechen auf einmal. Warum auf der Integrationsstufe kein autonomer Agent lebt, wofür Claude stattdessen taugt und warum kamerplanters dünnste Stufe eine Entscheidung ist und kein Versäumnis."
pubDate: 2026-06-12
lang: de
translationKey: ai-assisted-test-automation-integration
tags: ["testing", "claude", "automation", "test-pyramid", "integration-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Hier die gesamte Integrationsstufe von `kamerplanter`s Backend. Kein Ausschnitt — das Ganze, eine Datei mit 46 Zeilen:

```python
ARANGO_AVAILABLE = False
try:
    client = ArangoClient(hosts="http://localhost:8529")
    client.db("_system", username="root", password="rootpassword").version()
    ARANGO_AVAILABLE = True
    client.close()
except Exception:
    pass


@pytest.mark.skipif(not ARANGO_AVAILABLE, reason="ArangoDB not available")
class TestArangoSetup:
    def test_collections_created(self):
        ...
```

Lies die Schutzbedingung oben genau, denn sie ist die Geschichte dieses ganzen Beitrags. Der Test versucht, ein echtes ArangoDB unter `localhost:8529` zu erreichen. Gelingt das nicht, bleibt `ARANGO_AVAILABLE` auf `False`, und die ganze Testklasse überspringt sich selbst. In der CI — wo keine Datenbank läuft — tut dieser Test nichts. Er meldet sich als übersprungen, und der Build wird grün.

Das ist Teil drei der Serie. [Teil zwei](/de/blog/ai-assisted-test-automation-unit) handelte von der Unit-Stufe, auf der ich einen Claude-Agenten einen autonomen Fix-Loop fahren lasse. Ich schloss mit dem Versprechen zu zeigen, was mit der Leine des Agenten passiert, wenn die Abhängigkeit echt wird. Das ist dieser Beitrag, und die kurze Antwort lautet: Die Leine endet hier.

## Was bricht, wenn die Abhängigkeit echt wird

Die Unit-Stufe verdiente ihre Autonomie aus drei Eigenschaften: Sie war schnell, isoliert und deterministisch. Mach die Datenbank echt, und alle drei brechen auf einmal.

Sie hört auf, schnell zu sein. Ein Test, der mit ArangoDB redet, muss sich verbinden, Collections anlegen, Daten schreiben und alles wieder abräumen. Sekunden, keine Millisekunden. Sie hört auf, isoliert zu sein — der Test hängt jetzt an einem laufenden Dienst, der da sein kann oder nicht, und genau dafür existiert die `skipif`-Schutzbedingung. Und sie hört auf, in der entscheidenden Weise deterministisch zu sein: Das Ergebnis hängt von externem Zustand ab, also bedeutet ein roter Lauf nicht mehr sauber „der Code ist kaputtgegangen“. Er kann auch bedeuten „der Container lief nicht“.

Der Komfort der Unit-Stufe kam daher, dass sie nie etwas Echtes berührte. Die Integrationsstufe existiert gerade, um etwas Echtes zu berühren. Das ist ihre Aufgabe, und zugleich der Grund, warum keine der Bequemlichkeiten der Unit-Stufe die Reise übersteht.

## Warum hier kein Agent lebt

In Teil zwei weigerte sich der Agent `unit-test-runner`, diese Stufe zu laufen. Seine Anweisung ist eindeutig: `tests/integration/` nicht ausführen, weil es einen ArangoDB-Container braucht und zu langsam ist. Diese Weigerung ist kein Mangel, den man beheben müsste. Sie ist die richtige Grenze.

Ein autonomer Fix-Loop braucht die drei Eigenschaften, um zu funktionieren. Er lässt die Suite laufen, liest einen Fehlschlag, wendet eine Muster-Korrektur an und läuft erneut — viele Male, schnell, im Vertrauen darauf, dass ein Umschlag von Rot auf Grün echtes Signal ist. Richte diesen Loop auf eine Suite, die sich selbst überspringt, wenn die Abhängigkeit fehlt, und er lernt nichts; richte ihn auf eine Suite, die eine echte Datenbank braucht, und jede Iteration kostet Setup-Zeit und kann aus Gründen scheitern, die mit dem Code nichts zu tun haben. Der Loop, der die Unit-Stufe produktiv machte, wird hier zu Rauschen.

Die Leine wird auf dieser Stufe also nicht nur kürzer. Sie kommt ganz ab, weil es nichts gibt, woran man sie sicher befestigen könnte. Der Agent, der repariert, hat die falsche Form für eine Stufe, auf der „reparieren“ selten ein einzeiliger Test-Edit ist und „schnell“ verschwunden ist.

## Die Spec sagt das eine, das Repo tut das andere

Hier kommt der Teil, den ich am ehrlichsten und am nützlichsten finde. `kamerplanter` hat eine geschriebene Teststrategie. Ihre Regel für die Integrationsstufe ist eine harte Anforderung: Integrationstests **müssen** testcontainers für ArangoDB und Redis nutzen — keine In-Memory-Fakes — und müssen mindestens 70 % der kritischen Service- und Engine-Pfade abdecken.

Sieh dir jetzt die tatsächliche Datei wieder an. Sie nutzt kein testcontainers. Stattdessen verbindet sie sich mit einer Datenbank, die du von Hand mit `docker compose up arangodb` starten sollst, und schützt sich mit einem `skipif`, sodass sie verschwindet, wenn diese Datenbank fehlt. Getestet wird genau eine Sache: dass die Collections und der Graph angelegt werden. Eine Datei, gegen ein geschriebenes Ziel von 70 % kritischer-Pfad-Abdeckung mit verwalteten Containern.

Das ist ein `MUSS`, das das Repo nicht erfüllt. Ich zeige dir das nicht, um eine Sünde zu beichten — ich zeige es dir, weil es der Normalzustand eines echten Projekts ist und weil es genau die Art Lücke ist, die eine Testpyramide sichtbar machen soll. Die Spec formulierte einen Anspruch. Das Repo traf eine andere Wette. Der Abstand zwischen beiden ist Information, keine Schande.

## Wofür Claude auf dieser Stufe wirklich da ist

Wenn der Agent, der repariert, hier nicht hingehört — was tut Claude auf einer Stufe wie dieser? Die ehrliche Antwort: Es hört auf, ein Fix-Loop zu sein, und wird zum Auditor und zum Gerüstbauer, beides auf Anfrage statt im Autopilot.

Die Auditor-Rolle ist der Skill `test-pyramid-check` aus dem geteilten Plugin. Er liest die Stufen eines Features und meldet, welche vorhanden, welche dünn und welche gar nicht da sind — und eine Stufe, die existiert, sich aber in der CI selbst überspringt, ist genau das, wofür er gebaut ist. Er behebt die Lücke nicht. Er benennt sie, damit ein Mensch entscheiden kann.

Die Gerüstbauer-Rolle ist dieselbe Pipeline aus dem Auftakt — `test-case-extractor` leitet Fälle ab, ein Generator macht Tests daraus —, aber nur dann auf Integrationsszenarien gerichtet, wenn du zuerst die Infrastruktur zugesagt hast, um sie laufen zu lassen. Dieses „wenn“ ist der ganze Punkt. Claude kann dir eine testcontainers-gestützte Integrations-Suite schreiben. Es kann nicht für dich entscheiden, ob die kritischen Pfade die CI-Minuten, die Container-Startzeit und die Wartung wert sind. Diese Entscheidung gehört dir, und das soll auch so sein.

## Der ehrliche Teil: die dünnste Stufe ist eine Wette, kein Versäumnis

Im Auftakt sagte ich, die Pyramide von `kamerplanter` steht schief, und das ist die Stufe, auf der sie am dünnsten ist. Man könnte das leicht als Faulheit lesen. Ich will stattdessen dafür argumentieren, dass es eine vertretbare Wette ist.

Integrationstests sind die teure Mitte der Pyramide. Sie kosten echte Infrastruktur in der CI, sie sind langsamer als Unit-Tests, und sie sind flackriger als die Stufe darunter und — gut gemacht — die Stufe darüber. `kamerplanter` legte seine Zuversicht über die kritischen Pfade woanders hin: in die End-to-End-Stufe (E2E), wo ein echter Browser ein echtes Backend durch echte Nutzerpfade treibt. Das sind 70 Testdateien Abdeckung oben gegen eine überspringbare Datei in der Mitte. Es ist eine umgekehrte Form gegenüber dem Lehrbuch-Diagramm, und für dieses Projekt ist es ein bewusster Tausch, kein Zufall.

Der Wert davon, es aufzuschreiben — und eines Werkzeugs, das es auditiert —, ist, dass die Wette sichtbar bleibt. Eine dünne Integrationsstufe, die du gewählt hast, ist eine Strategie. Eine dünne Integrationsstufe, die du vergessen hast, ist ein Risiko. Der einzige Unterschied ist, ob jemand aufgeschrieben hat, welche von beiden es ist.

## Wie es weitergeht

Die nächste Stufe ist Contract/API: die Endpunkte, getestet mit `httpx` gegen die Anwendung. `kamerplanter` hat dort vier Dateien — mehr als die Integrationsstufe — und teilt doch ihr Kernproblem in anderer Form. Die Tests existieren, sie sind billig auszuführen, und der übliche CI-Job führt sie trotzdem nicht aus. Die Integrationsstufe ist dünn, weil die Tests fehlen. Die Contract-Stufe ist dünn, weil die Tests da, aber nicht verdrahtet sind. Dieser Unterschied, und was Claude gegen beides tun kann, ist der nächste Beitrag.
