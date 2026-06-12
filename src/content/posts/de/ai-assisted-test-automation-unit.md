---
title: "Warum Claude bei Unit-Tests die längste Leine bekommt"
description: "Teil zwei der Testautomatisierungs-Serie: Die Unit-Stufe ist schnell, isoliert und deterministisch — genau deshalb kann ein autonomer Claude-Agent sie in einer Schleife ausführen und reparieren, während ein quality-gate-Skill nur meldet."
pubDate: 2026-06-12
lang: de
translationKey: ai-assisted-test-automation-unit
tags: ["testing", "claude", "automation", "test-pyramid", "unit-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Hier ein Unit-Test aus dem Frontend von `kamerplanter`, vollständig:

```ts
it('setPage updates page and offset', () => {
  const { result } = renderHook(() => usePagination(10));
  act(() => result.current.setPage(2));
  expect(result.current.page).toBe(2);
  expect(result.current.offset).toBe(20);
});
```

Keine Datenbank. Kein Server. Kein Browser. Er rendert einen Hook, ruft eine Funktion auf und prüft zwei Zahlen. Er läuft in Millisekunden und gibt jedes Mal dieselbe Antwort. Ein Claude-Agent kann diesen Test ausführen, ihn nach einem Refactoring scheitern sehen, ihn reparieren und erneut ausführen — und das, ohne mir eine einzige Frage zu stellen.

Diese Autonomie ist der ganze Sinn der Unit-Stufe, und um sie geht es hier. Das ist Teil zwei der Serie; [der Auftakt](/de/blog/ai-assisted-test-automation-overview) legt die Pyramide und die Pipeline dar. Hier will ich zeigen, warum die schnelle Stufe die eine ist, auf der ich einen Agenten unbeaufsichtigt laufen lasse — und wo ich selbst dort die Grenze ziehe.

## Drei Eigenschaften, die Autonomie verdienen

Die Unit-Stufe hat drei Eigenschaften, die den Stufen darüber fehlen: Sie ist schnell, isoliert und deterministisch.

Schnell heißt, ein voller Lauf ist in Sekunden fertig, also kann ein Agent die Suite in einer Sitzung viele Male ausführen. Isoliert heißt, jeder Test übt eine Einheit mit gemockten Abhängigkeiten aus, also zeigt ein Fehlschlag auf genau eine Stelle. Deterministisch heißt, dieselbe Eingabe ergibt dasselbe Ergebnis, also ist ein Umschlag von Grün auf Rot eine echte Regression und kein Flackern.

Diese drei Eigenschaften machen einen autonomen Fix-Loop erst sicher. `kamerplanter` bringt einen projekteigenen Agenten mit, `unit-test-runner`, der genau das tut. Er ist bewusst auf Claude Haiku festgelegt — seine Aufgabe ist es, einen Fehlschlag nach Muster einzuordnen (ein Import-Fehler, eine geänderte Assertion, ein veralteter Mock) und die naheliegende Korrektur anzuwenden, und das ist Mustererkennung, kein tiefes Reasoning. Er fährt die statische Analyse, lässt pytest und vitest laufen, liest jeden Fehlschlag, repariert den Test und läuft erneut, bis die Suite grün ist.

Der Loop hat harte Grenzen, damit er sich nicht festfährt. Ein einzelner Testlauf, der 120 Sekunden überschreitet, wird abgebrochen. Nach drei Fix-Durchläufen, die noch Fehler übrig lassen, hält der Agent an und meldet, was bleibt. Und er versucht nie denselben Fix zweimal — half eine Korrektur nicht, ist das ein Befund, kein erneuter Versuch.

## Die Grenze, die der Agent nicht überschreitet

Ein autonomer Agent, der Code editiert, ist nur sicher, wenn seine Reichweite begrenzt ist. Beim `unit-test-runner` ist die Grenze scharf: Er editiert ausschließlich Test-Dateien. Backend-Tests unter `src/backend/tests/`, Frontend-Tests unter `src/frontend/src/test/` und die `*.test.tsx`-Dateien — sonst nichts. Produktionscode unter `app/` oder im Frontend-`src/` ist tabu.

Diese Grenze folgt aus einer Regel, die es wert ist, für sich zu stehen: Ein fehlschlagender Test ist ein Signal, kein Ärgernis. Wenn ein Test scheitert, entscheidet der Agent zuerst, ob der Test veraltet oder der Code falsch ist. Hat der Code einen offensichtlichen Bug, flickt der Agent ihn nicht stillschweigend, damit der Test grün wird. Er hält einen `[PROD-FIX]`-Befund fest und lässt den Produktionscode unangetastet — für einen Menschen oder den Feature-Entwickler. Die zugehörige Gegenregel ist genauso wichtig: einen fehlschlagenden Test nie löschen, nur um auf Grün zu kommen.

Das ist die Disziplin, die die Autonomie vertrauenswürdig macht. Der Agent darf gerade deshalb schnell sein, weil er den getesteten Code nicht erreichen kann. Das Schlimmste, was er anrichten kann, ist eine falsche Test-Assertion — die das nächste Review fängt — und nicht, das Produkt heimlich an eine kaputte Erwartung zu biegen.

## Zwei Werkzeuge auf zwei Höhen

Die Unit-Stufe wird von zwei verschiedenen Dingen bedient, und ihr Unterschied ist das klarste Beispiel für die Trennung von Skill und Agent in der ganzen Serie.

`unit-test-runner` ist ein Agent. Er läuft tief im Implementieren-dann-Testen-Loop, repariert Testcode an Ort und Stelle und gibt ein einziges Urteil zurück: merge-bereit oder nicht. Er kann parallel zur Feature-Arbeit laufen und die Suite grün halten, während ein Feature landet.

`quality-gate` ist ein Skill aus dem geteilten Plugin. Sein Mandat ist breiter und flacher: die Lint-, Typecheck- und Test-Schritte des Projekts parallel ausführen und dann genau auflisten, was fehlschlug — in einer Tabelle aus `Check / Status / Runner / Details`. Er bevorzugt die `task`-Ziele des Projekts, damit dessen Ignore-Listen das Sagen behalten. Er hält feste Timeouts ein — zwei Minuten fürs Linting, fünf für den Typecheck, zehn für die Tests.

Der entscheidende Unterschied: `quality-gate` repariert nie etwas. Er legt Fehlschläge offen, damit der Aufrufer vor einem Commit, einem PR oder einem Release triagieren kann. Das eine Werkzeug repariert im Loop, das andere meldet am Tor. Der Agent hat die längere Leine, weil sein Geltungsbereich eng ist und seine Edits umkehrbarer Testcode sind; der Skill hat gar keine Leine, weil seine Aufgabe ist, die Wahrheit über das ganze Repo zu sagen, nicht es zu ändern.

## Was „isoliert“ dir wirklich bringt

Isolation ist das Wort, das auf dieser Stufe die Hauptarbeit leistet, und es lohnt sich, konkret zu werden, wie sie erreicht wird.

Der Frontend-Test oben stellt nie eine Netzwerkanfrage. Das vitest-Setup von `kamerplanter` startet vor der Suite einen Mock Service Worker und setzt dessen Handler nach jedem Test zurück. Die Komponente glaubt, mit dem Backend zu reden; sie redet mit einem Mock. Genau das hält einen „Unit“-Test einer datengetriebenen Komponente schnell und deterministisch — die eine echte Abhängigkeit, die ihn langsam und flackrig machen würde, das Netzwerk, wird an der Grenze ersetzt.

Isolation ist auch das, was ein Coverage-Ziel überhaupt sinnvoll macht. Die Teststrategie von `kamerplanter` legt Schwellen fest: mindestens 80 % Line- und 75 % Branch-Coverage gesamt und mindestens 85 % Line-Coverage für die Geschäftslogik-Schicht unter `services/` und `engines/`. Die geteilte Spec wählt diese Zahlen nicht für dich — sie legt die Regel fest, dass es eine solche Schwelle geben und dass sie geprüft werden muss. Der Agent erfindet das Ziel nicht; er arbeitet gegen das, das das Projekt deklariert.

## Der ehrliche Teil: das ist die stärkste Stufe

Im Auftakt habe ich versprochen, dass jeder Stufen-Artikel sagt, wo das Beispiel stark und wo es dünn ist. Die Unit-Stufe ist die, auf der `kamerplanter` am stärksten ist. Das Backend trägt seine Unit-Tests unter `src/backend/tests/unit/`, das Frontend seine Komponenten- und Hook-Tests unter `src/frontend/src/test/`. Beide laufen bei jedem Pull Request — der Backend-CI-Job führt `pytest tests/unit/` bei jeder Änderung unter `src/backend` aus, und der Frontend-Job lässt vitest genauso laufen.

Das ist die breite Basis der Pyramide, richtig gemacht: Die billigsten, schnellsten Tests laufen am häufigsten, bei jeder Änderung, mit einem Agenten, der sie zwischen menschlichen Reviews grün hält. Auf der nächsten Stufe ist dieser Komfort zu Ende.

## Wie es weitergeht

Der nächste Artikel ist die Integrationsstufe — kritische Pfade mit echten Abhängigkeiten, wo die Datenbank nicht mehr gemockt wird. Diese eine Änderung bricht alle drei Eigenschaften, auf die sich diese Stufe verlässt: Die Tests werden langsamer, sie sind nicht mehr perfekt isoliert und nicht mehr perfekt deterministisch. Sieh zu, was mit der Leine des Agenten passiert, wenn die Abhängigkeit echt wird. In `kamerplanter` ist die ehrliche Antwort, dass die Stufe fast verschwindet — und der nächste Beitrag handelt davon, warum.
