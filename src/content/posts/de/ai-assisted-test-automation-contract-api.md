---
title: "Die Contract-Stufe läuft in Millisekunden — und nie in der CI"
description: "Teil vier der Serie: kamerplanters API-Tests treiben die App in-process, mit gemockter Datenbank — schnell, isoliert, deterministisch, genau wie Unit-Tests. Trotzdem führt die CI sie nie aus, und der Agent verweigert sie aus einer falschen Annahme. Tests, die existieren, aber nie laufen, sind eine eigene Art Schuld."
pubDate: 2026-06-12
lang: de
translationKey: ai-assisted-test-automation-contract-api
tags: ["testing", "claude", "automation", "test-pyramid", "contract-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Hier ein Contract-Test aus `kamerplanter`s Backend:

```python
def _get_client():
    """Create test client, mocking DB connection."""
    with patch("app.main.get_connection"), patch("app.main.ensure_collections"):
        from app.main import app
        return TestClient(app)


class TestVPDCalculation:
    def test_vpd_calculation(self):
        client = _get_client()
        response = client.post(
            "/api/v1/calculations/vpd",
            json={"temp_c": 25.0, "humidity_percent": 60.0, "phase": "vegetative"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "vpd_kpa" in data
        assert "status" in data
        assert "recommendation" in data
```

Sieh dir `_get_client` an. Es patcht die Datenbankverbindung weg und gibt einen FastAPI-`TestClient` zurück. Dieser Client treibt die Anwendung in-process — es gibt keinen Server zu starten, keine Datenbank zu erreichen. Der Test schickt ein POST an einen echten Endpunkt, bekommt eine echte Antwort und nagelt den Antwort-Contract fest: Status 200 und einen Body, der `vpd_kpa`, `status` und `recommendation` trägt.

Das ist Teil vier der Serie. In [Teil drei](/de/blog/ai-assisted-test-automation-integration) war die Integrationsstufe dünn, weil ihre Tests fehlten. Die Contract-Stufe ist aus dem umgekehrten Grund dünn: Die Tests sind genau hier, sie sind billig, und der übliche CI-Job führt sie trotzdem nicht aus. Diese Lücke ist das Thema dieses Beitrags.

## Was ein Contract-Test festnagelt

Ein Contract-Test prüft keine Geschäftslogik — das hat schon ein Unit-Test getan. Er prüft das Versprechen, das ein Endpunkt seinen Aufrufern gibt: Die Route existiert, sie nimmt diese Form an, sie gibt jene Form zurück, und sie scheitert auf definierte Weise.

Die Teststrategie von `kamerplanter` ist da genau. Die API-Stufe muss Response-Schemas gegen die Pydantic-Modelle validieren und muss jeden öffentlichen Endpunkt mit mindestens einem Happy-Path und einem Error-Path abdecken. Der Berechnungstest oben ist der Happy-Path. Der Error-Path ist eine eigene Datei, und sie ist interessanter, als sie klingt:

```python
"""NFR-006: Verify structured error responses and no information leakage."""

FORBIDDEN_PATTERNS = [
    r"ArangoDB", r"Traceback", r'File "/', r"\.py",
    r"localhost:", r"redis://", r"uvicorn", r"FastAPI", r"Pydantic",
]
```

Dieser Test treibt die App in Fehlerzustände und prüft, dass der Antwort-Body keinen dieser Strings enthält. Kein Stacktrace, kein Datenbankname, kein interner Hostname, kein Framework-Fingerabdruck. Es ist ein Contract-Test im strengen Sinn — der Contract lautet: „Ein Fehler sagt dem Aufrufer, was schiefging, ohne einem Angreifer zu sagen, wie das System gebaut ist.“ Genau die Art Versprechen, die man von einem schnellen, wiederholbaren Test festgenagelt haben will und nicht erst in der Produktion entdeckt.

## Diese Tests haben die drei Eigenschaften der Unit-Stufe

In Teil zwei sagte ich, die Unit-Stufe verdiene ihre Autonomie daraus, schnell, isoliert und deterministisch zu sein. Halte die Contract-Tests gegen diese Liste, und sie erfüllen jeden Punkt.

Sie sind schnell — `TestClient` lässt die App im selben Prozess laufen, also gibt es keinen Netzwerk-Roundtrip und keinen Container zu starten. Sie sind isoliert — die Datenbankverbindung ist weggepatcht, die Services sind gemockt, also zeigt ein Fehlschlag auf den Endpunkt, nicht auf die Infrastruktur. Sie sind deterministisch — dieselbe Anfrage, dieselben gemockten Abhängigkeiten, dieselbe Antwort, bei jedem Lauf.

Mit anderen Worten: Nichts an der Natur der Contract-Stufe hindert einen Agenten daran, sie im selben engen Loop zu fahren wie die Unit-Stufe. Die Eigenschaften, die der Unit-Stufe ihre lange Leine einbrachten, sind hier alle ebenfalls da.

## Aber zwei Türen sind zu

Warum also läuft diese Stufe nicht im Autopilot? Weil zwei getrennte Türen vor ihr zu sind, und bei keiner geht es um Kosten.

Die erste Tür ist die CI. Der CI-Job des Backends führt `pytest tests/unit/` aus und sonst nichts. Die API-Tests liegen in `tests/api/`, ein Verzeichnis weiter, und der Pfad-Filter erreicht sie schlicht nie. Sie bestehen lokal und sind für jeden Pull Request unsichtbar.

Die zweite Tür ist der Agent. In Teil zwei listete der `unit-test-runner` die Stufen auf, die er nicht laufen darf, und `tests/api/` stand mit der Begründung „braucht laufenden Server“ darauf. Nur brauchen diese Tests keinen Server — `TestClient` läuft in-process, und die Datenbank ist gemockt. Der Agent überspringt eine Stufe, die er gefahrlos laufen könnte, aus einem Grund, der für die tatsächlichen Tests in diesem Verzeichnis nicht gilt.

Keine der Türen wurde mit Absicht geschlossen. Beide sind veraltete Vorgaben — ein CI-Filter, der früh auf die Unit-Stufe zugeschnitten und nie erweitert wurde, und eine Agent-Regel, geschrieben aus einer vernünftig klingenden Annahme, der die echten Tests inzwischen entwachsen sind.

## Eine heimtückischere Art von dünn

Genau das unterscheidet die Contract-Stufe von der Integrationsstufe und macht sie einen eigenen Beitrag wert. Ein fehlender Test ist ehrlich darin, zu fehlen — `test-pyramid-check` findet eine leere Stufe sofort, und ein Entwickler spürt die Abwesenheit. Ein Test, der existiert, aber nie läuft, ist heimtückischer. Die Datei ist im Repo. Die Abdeckung sieht für jeden vorhanden aus, der den Verzeichnisbaum überfliegt. Der Build ist grün. Und doch ist die Stufe dunkel, weil Grün immer nur hieß „die Unit-Stufe ist durchgelaufen“.

Tests, die existieren, aber nie laufen, sind eine bestimmte Art Schuld. Sie verrotten still — ein Endpunkt ändert sich, der Contract-Test, der das gefangen hätte, wird nie ausgeführt, und der Test driftet aus dem Takt, ohne dass ein Fehlschlag es ankündigt. Wenn jemand `tests/api/` das nächste Mal laufen lässt, ist der Test ebenso wahrscheinlich falsch wie der Code.

## Wofür Claude hier da ist

Auf der Integrationsstufe war Claudes nützliche Rolle, auf Anfrage Test-Gerüste zu bauen, weil die Tests wirklich nicht existierten. Hier existieren die Tests, also ist die Rolle enger und schärfer: auditieren, dann eine einzeilige Verdrahtungs-Korrektur, die ein Mensch absegnet.

`test-pyramid-check` ist genau dafür gebaut. Er fragt nicht nur „hat eine Stufe Tests“ — er fragt, ob die Abdeckung der schnellen Stufe gegatet ist, also tatsächlich in das Gate verdrahtet, das bei jeder Änderung läuft. Eine Stufe voller lokal-grüner Tests, die die CI nie ausführt, ist genau der Befund, den er aufdeckt. Und die Abhilfe ist kein Test-Rewrite — es ist, den CI-Job um `tests/api/` zu erweitern und die Ausschlussliste des Agenten zu korrigieren. Konfiguration, kein Code.

Das ist die ganze Form der KI-Hilfe auf dieser Stufe. Das Audit benennt die dunkle Stufe; der Mensch entscheidet, dass sie laufen soll; die Änderung sind ein paar Zeilen Workflow-YAML. Claude ist gut im Ersten und im Dritten. Die Entscheidung in der Mitte — ist diese Stufe das Gaten wert — bleibt da, wo sie hingehört.

## Der ehrliche Teil

Der stärkste Beleg dafür, dass die Contract-Stufe laufen sollte, ist `kamerplanter`s eigene Strategie. Die Stufentabelle markiert diese Tests nicht als nur-lokal. Sie markiert sie als „lokal und CI“ und setzt ein Ziel von 100 % der öffentlichen Endpunkte, jeder mit einem Happy-Path und einem Error-Path. Das Projekt hat längst entschieden, dass diese Stufe ins Gate gehört. Nur die Verdrahtung hat die Entscheidung nie eingeholt.

Das ist die gewöhnlichste Art von Drift, die es gibt, und die undramatischste zu beheben. Keine neue Infrastruktur, kein Rewrite — ein Pfad, der einer Workflow-Datei hinzugefügt wird, und eine Zeile, die aus der Nicht-laufen-Liste eines Agenten verschwindet. Es brauchte ein Audit, um gesehen zu werden, und einen Menschen, der es absegnet. Keiner der Schritte ist der autonome Fix-Loop, der die Unit-Stufe mühelos wirken ließ, und das ist der rote Faden der Serie: Je weiter du in der Pyramide nach oben gehst, desto mehr verschiebt sich die Aufgabe der KI vom Tun zum Sehen.

## Wie es weitergeht

Der letzte Artikel ist die Spitze der Pyramide: End-to-End. Hier ist `kamerplanter` am stärksten — 70 Testdateien, 58 Page Objects, Screenshots, ein generiertes Protokoll. Hier bekommen auch die sechs Disziplinen aus dem Auftakt endlich ihre volle Behandlung, und Claudes Rolle teilt sich sauber in drei Agenten: einer, der die Suite generiert, einer, der die Suite reviewt, und einer, der die Screenshots des Laufs zurückliest, wie es ein Mensch täte. Der autonome Reparatur-Agent ist hier oben endgültig weg. Was ihn ersetzt, ist die interessanteste Zusammenarbeit der ganzen Serie.
