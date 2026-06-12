---
title: "End-to-End: drei Agenten und eine Wand voller Screenshots"
description: "Das Serienfinale: Die E2E-Stufe ist die, auf der kamerplanter am stärksten ist, und auf der Claudes Rolle sich in drei abgegrenzte Agenten teilt — generieren, reviewen und die Screenshots wie ein Mensch zurücklesen. Die sechs Disziplinen in voller Länge, und warum eine starke Stufe eine auditierbare ist und keine grüne."
pubDate: 2026-06-12
lang: de
translationKey: ai-assisted-test-automation-e2e
tags: ["testing", "claude", "automation", "test-pyramid", "e2e-tests"]
draft: false
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Jeder End-to-End-Test in `kamerplanter` beginnt mit einem Block wie diesem, oben in der Datei:

```text
Spec-TC Mapping (test TC → spec/e2e-testcases/TC-REQ-002.md):
  TC-REQ-002-001  →  TC-002-001  Site-Liste laden (Empty State / Titel)
  TC-REQ-002-005  →  TC-002-005  Site erstellen — Dialog öffnen
  TC-REQ-002-006  →  TC-002-006  Site erstellen — Pflichtfeld Name leer
  TC-REQ-002-009  →  (kein Spec-TC)  Sortierung per Spaltenklick
  TC-REQ-002-011  →  TC-002-004  Klick auf Site-Zeile navigiert zur Detailseite
```

Das ist die Standort-Testdatei, und sie bildet 27 Browser-Tests auf die Anforderungsfälle ab, die sie verifizieren. Manche bilden sauber ab; ein paar sind als `(kein Spec-TC)` markiert, weil der Test etwas abdeckt, das der Spec-Fall nicht hatte. Das ist die Spitze der Pyramide, und hier ist `kamerplanter` am stärksten — 70 Testdateien, 58 Page Objects, Screenshots an jedem Checkpoint, ein generiertes Protokoll. Hier ändert sich auch Claudes Rolle am meisten.

Das ist der letzte Beitrag der Serie. [Der Auftakt](/de/blog/ai-assisted-test-automation-overview) versprach die sechs E2E-Disziplinen in voller Länge, und die vier Stufen seither haben die Leine des Agenten jeweils verkürzt: autonom auf Unit, ganz ab auf Integration und nur-auditierend auf Contract. Hier oben ist die Leine weg, und drei Agenten treten an ihre Stelle.

## Die sechs Disziplinen sind das eigentliche Produkt

Der Auftakt machte eine Behauptung über allen anderen: Der wiederverwendbare Teil der Testautomatisierung ist nicht der Testcode, sondern die Disziplin, die eine Suite vertrauenswürdig hält. Nirgends ist das klarer als bei E2E, denn ein Browser-Test ohne Disziplin ist das flackrigste, langsamste, am wenigsten vertrauenswürdige Artefakt im ganzen Codebestand.

Die geteilte Spec formuliert die Disziplin als sechs Regeln, framework-neutral, jede einzelne ein `MUSS`:

- **Page Objects** — jede UI-Interaktion läuft über ein Page Object; ein Test ruft nie direkt die Element-Suche des Treibers auf.
- **Deterministisches Warten** — keine festen Sleeps; jedes Warten ist eine Bedingung (Präsenz, Sichtbarkeit, Klickbarkeit, URL-Wechsel, Ladeindikator verschwunden).
- **Locator-Strategie** — eine Robustheits-Hierarchie, das Stabilste zuerst: `data-testid` → Element-ID → Rolle/semantisch → CSS → XPath zuletzt, positionsbasiertes XPath verboten.
- **Screenshot-Checkpoints** — mindestens ein Screenshot pro Test, an den Standardpunkten (Seitenaufbau, vor einer Aktion, danach, jeder Fehlerzustand), benannt nach TC-ID.
- **Test-Protokoll** — ein Lauf kann ein maschinell erzeugtes Markdown-Protokoll ausgeben, mit Metadaten, einer Bestanden/Fehlgeschlagen/Übersprungen-Übersicht und der Abdeckung je Anforderung.
- **Spec-Rückverfolgbarkeit** — jeder Test nennt die TC-ID und die Anforderung, die er verifiziert, im eigenen Docstring.

Die Spec achtet darauf zu sagen, dass diese Disziplin der bindende Kern ist, ausgedrückt gegen Fähigkeiten, die jeder Browser-Stack bietet — navigieren, lokalisieren, warten, handeln, aufnehmen. Selenium plus pytest ist das Referenzprofil, kein Zwang. Die Disziplin reist mit; die Bibliothek ist Klebstoff.

## Disziplin, die man im Code lesen kann

Was `kamerplanter` zu einem guten Beispiel macht, ist, dass die Disziplinen nicht bloß angestrebt sind — sie sind in den Dateien sichtbar. Das Basis-Page-Object trägt das Warte-Vokabular, das die Spec verlangt:

```python
def wait_for_element_clickable(self, locator, timeout=DEFAULT_TIMEOUT):
    return WebDriverWait(self.driver, timeout).until(
        EC.element_to_be_clickable(locator)
    )

def wait_for_loading_complete(self, timeout=DEFAULT_TIMEOUT):
    """Wait until all [data-testid='loading-skeleton'] elements disappear."""
```

Zwei Disziplinen in einem Ausschnitt. Das Warten ist eine Bedingung, nie ein Sleep — und die Ladeprüfung hängt an einem `data-testid`, der Spitze der Locator-Hierarchie. Die eine Stelle, an der ein Sleep erlaubt ist, taucht in der Standort-Testdatei als ein einziger ehrlicher Import auf:

```python
import time  # kept for debounce waits
```

Dieser Kommentar ist die Ausnahmeklausel der Spec, wörtlich gemacht: Ein fester Sleep darf vorkommen, aber nur für ein echtes zeitbasiertes Anliegen — hier eine Such-Entprellung von 0,3 Sekunden — und er muss einen begründenden Kommentar tragen. Der Docstring derselben Datei buchstabiert den Vertrag aus, an den sie sich hält: nur Page Objects, `WebDriverWait` bevorzugt, Screenshots bei Seitenaufbau / vor / nach / Fehler, beschreibende Assertions. Die Disziplin steht neben den Tests geschrieben, die ihr folgen.

Ein Lauf macht daraus eine Prüfspur. Das Protokoll ist eine echte Markdown-Datei mit einem Metadaten-Kopf — Zeitstempel, Commit, Branch, Betriebssystem, Browser, Gerät, Python-Version —, einer Bestanden/Fehlgeschlagen/Übersprungen-Tabelle und einer Abdeckungszählung je Anforderung. Es ist über ein `--generate-protocol`-Flag opt-in und landet in einem git-ignorierten, mit Zeitstempel versehenen Ordner, sodass Protokolle sich als Historie ansammeln, ohne das Repo zu verschmutzen.

## Drei Agenten, je eine Aufgabe

Auf der Unit-Stufe tat ein Agent alles: laufen, fixen, erneut laufen. Die E2E-Stufe zerlegt diese eine Aufgabe in drei, weil kein Teil davon gefahrlos im Autopilot zu tun ist.

`e2e-test-generator` legt die Suite aus den Testfällen an. Er schreibt Page Objects, Testmodule, Fixtures und die Protokoll-Verdrahtung — und seine Grenzen sind scharf. Er schreibt nur in das E2E-Verzeichnis, er fügt der Anwendung nie ein `data-testid` hinzu (das ist Anwendungsarbeit, stattdessen als Vorbedingung gelistet), und er nutzt die Shell nur, um Tests einzusammeln, nie, um die volle Browser-Suite zu fahren.

`e2e-test-reviewer` benotet eine bestehende Suite gegen die sechs Disziplinen und nimmt minimale Korrekturen vor, die die Absicht der Tests wahren. Er belegt jeden Befund mit Datei und Zeile. Entscheidend: Er repariert, statt neu zu erzeugen — eine Suite, die abgedriftet ist, bekommt chirurgische Korrekturen, kein Rewrite, das die menschliche Urteilskraft wegwerfen würde, die schon in den Tests steckt.

Die Aufteilung ist wichtig, weil Erzeugen und Reviewen entgegengesetzte Instinkte verlangen. Ein Generator ist konstruktiv und produziert bereitwillig neuen Code; ein Reviewer ist konservativ und sollte so wenig wie möglich ändern. Beides in einen Agenten zu falten, verwischt diese Linie. Sie getrennt zu halten heißt, dass jeder die richtige Art von vorsichtig sein kann.

## Der Agent, der Bilder anschaut

Der dritte Agent ist der, den ich in der ganzen Serie am interessantesten finde. `e2e-result-reviewer` führt nichts aus und editiert nichts. Er liest die Ausgabe eines fertigen Laufs — die Screenshots, als Bilder, und das Protokoll — und reviewt sie so, wie es ein menschlicher Prüfer täte.

Er schaut auf einen Screenshot und prüft das Layout, die geforderten Elemente, den angezeigten Zustand, die Sprache, die Fehler- und Validierungszustände — gegen die Anforderungs- und UI-Specs, die das Projekt deklariert. Dann meldet er Befunde nach Priorität geordnet, jeder geknüpft an die TC-ID und die Anforderung, die er betrifft. Er ist von Bauart read-only: Er kann die Suite nicht erneut laufen lassen, um einen Befund verschwinden zu lassen, und er kann keinen Test heimlich anpassen, damit er zu einem falschen Screenshot passt. Seine einzige Ausgabe ist Urteil.

Das ist der sauberste Ausdruck des Serienbogens. Am Fuß der Pyramide fixt Claude Code in einem schnellen Loop. An der Spitze schaut Claude auf eine Wand voller Screenshots und sagt dir, welche falsch sind. Die Arbeit wanderte vom Tun zum Sehen, genau wie der Contract-Beitrag vorhersagte, und das Sehen ist jetzt wörtlich.

## Der ehrliche Teil: stark ist nicht dasselbe wie grün

Das ist die Stufe, auf der `kamerplanter` am stärksten ist, und trotzdem darf ich dir kein perfektes Bild zeigen. Ein echtes Protokoll der Suite verzeichnet neun Tests, sechs bestanden, drei fehlgeschlagen — eine Erfolgsquote von 66,7 % auf diesem Lauf. Mehrere Tests quer durch die Suite tragen einen ausdrücklichen Skip: `Site list uses accordion cards — no DataTable search`, weil die UI auf eine andere Komponente umgezogen ist und der Test ehrlich geparkt statt heimlich gelöscht wurde. Und eine Handvoll Tests verweisen auf `(kein Spec-TC)`, was heißt: Sie verifizieren etwas Echtes, das noch kein Anforderungsfall abdeckt.

Nichts davon ist ein Versagen der Stufe. Es ist die Stufe bei der Arbeit. Ein begründeter Skip mit geschriebenem Grund ist Disziplin, keine Schuld — die Spec verlangt genau das statt eines stillen frühen Ausstiegs. Ein roter Lauf, in einem Protokoll festgehalten, ist nützlicher als ein grüner Lauf ohne Spur. Der Sinn der Disziplinen war nie, dass die Suite immer besteht; er war, jeden Lauf lesbar zu machen — sodass ein Fehlschlag dir sagt, was brach, ein Skip dir sagt, warum, und ein Screenshot dir den Zustand zeigt, mit der TC-ID auf seinem Dateinamen. Eine starke E2E-Stufe ist eine auditierbare, keine grüne.

## Die Form der ganzen Serie

Fünf Stufen, eine Idee. Das wiederverwendbare Ding in der Testautomatisierung ist die Disziplin, und die Disziplin ist das, was einen Agenten auf jeder Höhe in der richtigen Form helfen lässt.

Auf der Unit-Stufe ist die Disziplin Isolation, und Isolation verdient einen autonomen Fix-Loop. Bei Integration wird die Abhängigkeit echt, die Disziplin wird Ehrlichkeit über Kosten, und der Agent tritt zurück zu Auditor und Gerüstbauer. Auf der Contract-Stufe ist die Disziplin Verdrahtung — die Tests laufen lassen, die du schon hast — und die Aufgabe des Agenten ist, die dunkle Stufe zu sehen und zu benennen. An der Spitze ist die Disziplin die sechs Regeln, die eine Browser-Suite vertrauenswürdig halten, und der Agent teilt sich in drei: einer baut, einer reviewt den Bau, einer liest das Ergebnis.

Die Leine wurde kürzer, je langsamer die Stufen wurden, und das war nie ein Mangel, den man beheben müsste. Es war das System, das wie vorgesehen arbeitet. Ein Agent soll frei laufen, wo freies Laufen sicher ist, und das Steuer dort zurückgeben, wo es das nicht ist. Was vom Fuß der Pyramide bis zur Spitze konstant bleibt, ist nicht die Automatisierung. Es ist die Disziplin — aufgeschrieben, von einer Spec durchgesetzt und angewandt durch die jeweils passende Form von Hilfe, die die Stufe wirklich will. Das ist die ganze Serie, und das ist es, was die Hilfe wertvoll macht.
