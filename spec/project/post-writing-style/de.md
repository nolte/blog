# Post-Schreibstil

Status: draft

## Kontext

Leser: der Post-Autor (im Wechsel handschreibend und KI-Entwürfe kuratierend, Audience D in [`AUDIENCES.md`](../../../AUDIENCES.md)) und Claude Code als KI-Co-Operator, der EN-Posts entwirft und anschließend ins DE übersetzt — und gleichzeitig die Laufzeitumgebung für jeden zukünftigen Post-Lint- oder Review-Skill, der gegen diese Spec geschrieben wird (Audience E).

Dieser Blog ist eine zweisprachige (EN kanonisch, DE Übersetzung) statische Astro-Seite, die drei primäre Direkt-Konsument-Audiences aus [`AUDIENCES.md`](../../../AUDIENCES.md) bedient — durchreisende technische Leser (A), Portfolio-Reviewer aus CV / LinkedIn (B) und den Autor, der seine eigenen Posts als Wissensdatenbank wiederliest (C) — plus eine periphere indirekte Audience, deren Behandlung nicht optional ist: in Posts namentlich genannte Personen und Projekte (L). Posts werden interaktiv mit KI entworfen, vor Veröffentlichung von Hand kuratiert und mit `aiGenerated: true` markiert. Das Repo erklärt in `CLAUDE.md` bereits eine kurze Voice-Regelliste (Ich-Form, dialogisch, keine Hype-Wörter, sentence-case Überschriften, Code-Blöcke mit Sprachkennzeichnung). Diese Spec **erweitert und operationalisiert** diese Regeln um forschungsgestützte Schwellenwerte, ein explizites Verboten-Wort-Inventar, zweisprachige Typografie-Konventionen und Lifecycle-Gates, gegen die ein Lint oder ein menschlicher Reviewer prüfen kann.

Stilentscheidungen auf diesem Blog haben eine zweite Ebene: weil Posts von einem LLM entworfen werden, ist KI-Tell-Vokabular (`delve`, `tapestry`, `leverage`, `robust`, `seamless`) der dominante Fehlermodus — nicht die Formalitäts-Drift, die für Corporate-Blogs typisch ist. Die Spec lehnt sich aus diesem Grund stark in die KI-Tell-Unterdrückung und in „Show your work"-Muster, die ein generisches LLM schwer fälschen kann — beides dient direkt dem Anspruch des Autors auf belegte, quellenzitierte, aus Projekten abgeleitete Posts.

## Ziele

- Eine einzige Wahrheitsquelle für **Voice, Ton, Struktur, Formatierung, Lesbarkeit und Typografie** über jedes Post-Paar (EN + DE) etablieren, damit die zweisprachige Oberfläche intern konsistent bleibt und der Autor sich auf Claude verlassen kann, gegen einen stabilen Vertrag zu entwerfen.
- **Messbare Schwellenwerte** festlegen (Satzlängen-Durchschnitt, Absatzlänge, Flesch-Kincaid-Klassenstufenziel, Aktiv-Stimm-Quote, Heading-Tiefe), damit Stilkonformität reviewbar wird statt eine Geschmacksfrage zu bleiben.
- Eine **geschlossene Verboten-Wörter-Liste** in dieser Spec führen, abgeleitet aus dokumentierten KI-Tells, Plain-Language-Forschung und der bestehenden Regelliste des Autors, damit Ergänzungen und Streichungen prüfbar bleiben statt pro Post erfunden zu werden.
- **KI-Disclosure-Ton** vorschreiben — wie ein Post die Tatsache, KI-entworfen zu sein, formuliert — getrennt vom bestehenden `aiGenerated`-Frontmatter-Flag, damit Text-Signal und Struktur-Signal aufeinander abgestimmt bleiben.
- **Zweisprachige Typografie-Regeln** kodifizieren (Anführungszeichen, Gedankenstrich, ß / Umlaute, Bewahrung technischer Identifier), damit das EN ↔ DE-Paar auf beiden Seiten typografisch idiomatisch ist statt eine wörtliche Transliteration zu sein.
- **Portfolio-Blog-fokussiert bleiben**: jede Anforderung gilt für eine Markdown-Datei unter `src/content/posts/{en,de}/` und für nichts anderes. Projekt-READMEs, ADRs, Spec-Dateien und PR-Beschreibungen sind außerhalb des Geltungsbereichs.

## Nicht-Ziele

- Festzulegen, **welche Themen** ein Post behandeln soll, **welche Projekte** zu bloggen sind oder **wie oft** zu veröffentlichen ist — das gehört zur Roadmap- und Sprint-Ebene, geregelt durch `spec/project/roadmap/` und `spec/project/sprint/`.
- Die **Audience-Analyse** selbst zu definieren. Audiences und ihre Kritikalität gehören zu [`AUDIENCES.md`](../../../AUDIENCES.md) über `spec/project/audience-identification/`. Die Geschwister-Spec [`post-audience-communication`](../post-audience-communication/de.md) definiert, **wie** in einem einzelnen Post auf diese Audiences eingegangen wird; diese Spec definiert, **wie** geschrieben wird, unabhängig davon, welche Audience ein gegebener Post bevorzugt.
- Das **Frontmatter-Schema** zu definieren. Frontmatter-Form ist in `CLAUDE.md` deklariert und durch das Astro-Content-Collection-Schema erzwungen. Diese Spec setzt diese Felder voraus und verweist auf sie.
- **SEO-Metadaten, Sitemap, OG-Bilder, RSS-Form oder die LLM-Crawler-Haltung** zu definieren. Diese bedienen Audience M (Suchmaschinen und LLM-Trainer) und sind anderswo geregelt.
- **MkDocs- / Docs-Tracks-Specs** zu ersetzen. Diese regeln Inhalte einer Docs-Site mit Audience-Tracks; diese Spec regelt das Blog-Korpus, wo jeder Post denselben `user-docs`-Track bedient.
- **Review-Workflow / Merge-Gates** zu definieren. Der PR-Review-Prozess gehört zu einer Pull-Request-Workflow-Spec, nicht hierher. Diese Spec definiert, wie der Post selbst aussehen muss, nicht, wie er auf `main` kommt.

## Anforderungen

### Person, Voice und Ton

- **MUSS [MUST]** in der ersten Person Singular schreiben („ich"). Plural „wir" ist nur dann erlaubt, wenn der Post explizit für eine tatsächlich existierende Zusammenarbeit mehrerer Personen spricht — nie als Corporate-Plural, der eine Einzelstimme maskiert.
- **MUSS [MUST]** den Post auf den vier NN/g-Ton-Dimensionen (Humor, Formalität, Respekt, Enthusiasmus) verorten als: ernst mit gelegentlich trockenen Akzenten, locker, respektvoll, sachlich. Enthusiasmus-Schübe sind erlaubt, wenn etwas den Autor wirklich überrascht hat; ein anhaltend enthusiastisches Register ist **DARF NICHT [MUST NOT]**.
- **MUSS [MUST]** sich lesen wie ein wissendes Gegenüber, das mit einem Gegenüber spricht — nicht wie Dokumentation, nicht wie ein Corporate-Post, nicht wie ein Tutorial, das mit „In der heutigen schnelllebigen Zeit …" beginnt. „Show the thinking, not just the conclusion": wenn eine Entscheidung schwer war, **MUSS [MUST]** der Post sagen, was sie schwer gemacht hat, bevor er sagt, was gewählt wurde.
- **MUSS [MUST]** in EN-Posts Kontraktionen bevorzugen (`it's`, `you'll`, `don't`, `I've`); das Ausschreiben von Kontraktionen liest sich corporate oder LLM-default und gilt als Stilverstoß. Das DE-Gegenstück verwendet natürliche deutsche Entsprechungen — keine erzwungenen Kolloquialismen.
- **DARF NICHT [MUST NOT]** mit einem Aufhänger eröffnen, der das Thema oder den Leser schmeichelt („In einer Zeit rasanten Wandels …", „Entwickler weltweit stehen vor …"). Eröffnung erfolgt auf einem konkreten Artefakt (ein Code-Fragment, ein Screenshot, eine Ein-Satz-These, eine spezifische Frage, die der Post beantwortet).
- **SOLLTE [SHOULD]** Humor trocken und selten halten. Selbst-ironische Einwürfe auf Kosten des Autors sind in Ordnung; die Behandlung von Witzen über namentlich genannte Dritte wird ausschließlich von [§Audience-L-Schutz](#audience-l-schutz) geregelt — dieser Abschnitt wiederholt die Regel nicht.

### Lesbarkeits-Schwellenwerte

- **MUSS [MUST]** die durchschnittliche Satzlänge im Post-Body zwischen **14 und 20 Wörtern** halten (American-Press-Institute-Verständnisdaten: ≥ 90 % bei 14 Wörtern, fällt oberhalb 25 stark ab). Einzelne Sätze **DÜRFEN [MAY]** 30 Wörter überschreiten, wenn ein langer Satz Rhythmus oder Präzision dient, aber nie zwei in Folge.
- **MUSS [MUST]** Body-Absätze auf **höchstens 4 Sätze** beschränken (gov.uk-Forschung: Menschen lesen 20–28 % des Texts einer Seite; lange Absätze verstärken den Abbruch). Ein-Satz-Absätze sind ausdrücklich erlaubt, wenn sie einen Taktschlag tragen.
- **MUSS [MUST]** Flesch-Kincaid Grade Level zwischen **7 und 10** für den EN-Body anzielen (Code-Blöcke und Frontmatter ausgenommen). Posts unter 7 lesen sich kindlich; über 10 verliert man Audience B (überfliegende Portfolio-Reviewer).
- **MUSS [MUST]** Aktiv-Stimme bevorzugen. Die Faustregel des Autors: wenn das grammatische Subjekt eines Passiv-Satzes fehlt oder „durch das System / durch das Framework / durch den Benutzer" lautet, in Aktiv umschreiben. Passiv ist akzeptabel, wenn der Akteur wirklich unbekannt ist oder das Objekt das Thema ist und der Akteur Nebensache.
- **SOLLTE [SHOULD]** eine gemessene Aktiv-Quote von ≥ 70 % über den Post-Body anstreben. Die Quote ist ein Ziel, kein hartes Gate, weil manche technischen Beschreibungen im Passiv natürlicher klingen (z. B. „Der Request wird mit HMAC-SHA256 signiert").

### Struktur und Fluss

- **MUSS [MUST]** mit einer Inverted-Pyramid-Eröffnung führen: der erste Absatz **MUSS [MUST]** die These, den Umfang oder die Frage des Posts in ≤ 80 Wörtern konkret machen, damit ein F-Pattern-Skimmer entscheiden kann, ob er weiterliest.
- **MUSS [MUST]** eine scanbare Subhead-Hierarchie tragen. Jeder Post über 600 Wörter **MUSS [MUST]** mindestens zwei H2-Unterüberschriften haben; jede Sektion über etwa 400 Wörter **SOLLTE [SHOULD]** mindestens eine H3 tragen.
- **DARF NICHT [MUST NOT]** einen „TL;DR"-Block als Ersatz für eine Inverted-Pyramid-Eröffnung verwenden. Wenn ein TL;DR wirklich die richtige Form ist (z. B. ein langer technischer Post mit mehrstufigem Argument), **DARF [MAY]** er als erster Block unter dem H1 erscheinen, **MUSS [MUST]** sich aber weiterhin als ein Absatz lesen und **DARF NICHT [MUST NOT]** ein Bullet-Dump sein.
- **MUSS [MUST]** „die Arbeit zeigen": wenn der Post ein Ergebnis behauptet (ein Refactor, eine Entscheidung, eine Messung), **MUSS [MUST]** er mindestens eines davon tragen — (a) das Diff, (b) die Befehlsausgabe, (c) den Screenshot oder (d) ein wörtliches Zitat / einen Verweis. Unbelegte Ergebnis-Behauptungen sind ein Verstoß, weil sie genau der Fehlermodus sind, den dieser Blog laut der Hard-Rule „Never invent technical facts" in `CLAUDE.md` ausdrücklich ablehnt.
- **SOLLTE [SHOULD]** mit einer kurzen Coda schließen, die benennt, worüber der Autor unsicher ist, was bewusst außerhalb des Umfangs liegt oder was ein Folge-Post abdecken würde. Das bedient Audience C (das zukünftige Ich) mehr als A oder B, kostet A / B aber nichts, weil es kurz ist.

### Überschriften

- **MUSS [MUST]** für jede Überschrift (H1 bis H6) **Sentence Case** verwenden. Erstes Wort groß, Eigennamen groß, der Rest klein. Das deckt sich mit der bestehenden `CLAUDE.md`-Regel und mit Google Material, Apple HIG und Microsoft Fluent.
- **MUSS [MUST]** genau eine H1 pro Post tragen — den Post-Titel — geliefert vom Frontmatter-Feld `title` über das Layout. Das Body-Markdown **DARF NICHT [MUST NOT]** eine zusätzliche H1 deklarieren.
- **MUSS [MUST]** Überschriften sequentiell verschachteln. H1 wird von H2 gefolgt (nie H3). H2 darf von H2 oder H3 gefolgt werden, nie H4. Stufen-Sprünge nach unten verletzen WCAG 1.3.1 (Heading-Order). Stufen-Sprünge nach oben (z. B. H3 schließt zurück auf H2) sind erlaubt.
- **MUSS [MUST]** den Heading-Text beschreibend zum Sektions-Inhalt halten, nicht süßlich. „Eine State-Bibliothek wählen" ist eine gültige Überschrift; „Die Reise beginnt" ist es nicht.
- **SOLLTE [SHOULD]** Überschriften unter 60 Zeichen halten, damit sie im seiteninternen Inhaltsverzeichnis und in der OG-Card-Ableitung sauber rendern.

### Code, Befehle und andere technische Inhalte

- **MUSS [MUST]** auf jedem fenced Code-Block einen Sprach-Identifier deklarieren. Die Liste akzeptierter Identifier richtet sich nach der Shiki-Konfiguration der Astro-Content-Pipeline; gängige sind `ts`, `tsx`, `js`, `jsx`, `astro`, `bash`, `zsh`, `json`, `yaml`, `toml`, `html`, `css`, `md`, `mdx`, `diff`, `python`, `go`, `rust`. Für reine Ausgabe (keine Syntax zum Highlighten) `text` verwenden statt den Identifier leer zu lassen.
- **MUSS [MUST]** einzelne Code-Zeilen wo vernünftig möglich ≤ 100 Zeichen halten. Längere Zeilen für den Post-Kontext umbrechen oder refaktorieren, selbst wenn die Originalquelle sie länger hat; die Originalstelle in der umgebenden Prosa zitieren.
- **MUSS [MUST]** Code-Blöcke von umgebender Prosa durch eine Leerzeile auf jeder Seite trennen.
- **MUSS [MUST]** in der umgebenden Prosa beschreiben, was der Code tut — **vor** dem Block (Setup) und **nach** dem Block, wenn die Ausgabe zählt (Interpretation). Code-Blöcke sind nie das ganze Argument; sie stützen es.
- **SOLLTE [SHOULD]** Inline-Code (einzelne Backticks) für kurze Identifier, Dateipfade, CLI-Flags und Konfig-Key-Verweise im laufenden Text verwenden. Kursiv- / Fett-Formatierung **DARF NICHT [MUST NOT]** als Ersatz für Code-Formatierung auf Identifiern verwendet werden.
- **DARF NICHT [MUST NOT]** Screenshots von Code als Ersatz für fenced Code-Blöcke verwenden — Screenshots sind nicht durchsuchbar, für Screen-Reader unzugänglich und brechen Copy-Paste. Screenshots sind nur für UI-Zustände erlaubt, die anders nicht vermittelt werden können (ein Styling-Ergebnis, ein Layout, ein Diagramm).
- **SOLLTE [SHOULD]** Screenshots in der Markdown-Bild-Syntax mit beschreibendem Alt-Text versehen. Der Text **DARF NICHT [MUST NOT]** die Bildunterschrift wiederholen oder „Screenshot" lauten — er **MUSS [MUST]** beschreiben, was auf dem Bild zu sehen ist, damit Screen-Reader-Nutzer die Information bekommen.

### Links

- **MUSS [MUST]** Link-Text so verfassen, dass das Ziel allein aus dem Text klar wird (WCAG 2.4.4 Link Purpose, Level A). „[die Astro-Content-Collection-Dokumentation]" besteht; „[hier klicken]" oder „[hier]" fällt durch.
- **MUSS [MUST]** auf die **Primärquelle** statt auf einen Aggregator verlinken. Der W3C-Entwurf, das GitHub-Issue, das Originalpaper, das Upstream-README — nicht ein Kommentar oder eine Content-Farm-Zusammenfassung.
- **MUSS [MUST]** für externe Links absolute URLs verwenden. Interne Cross-Post-Links **MÜSSEN [MUST]** die relative Slug-basierte URL des Astro-Routers verwenden (kein hartcodiertes `https://…` auf eigene Inhalte).
- **SOLLTE [SHOULD]** sparsam verlinken — jeder Link ist ein Kontextwechsel für den Leser. Ein Link verdient seinen Platz durch Präzisionsgewinn (Begriffsdefinition, Primärquellen-Zitat, Deep-Dive-Eskapsule), nicht reflexhaft.
- **DARF NICHT [MUST NOT]** externe Links per Default in einem neuen Tab öffnen. Erzwungenes `target="_blank"` verletzt Nutzer-Selbstbestimmung; wenn ein Link wirklich neu öffnen muss (z. B. unterbricht einen langen Workflow), in der Prosa sagen.

### KI-Disclosure-Ton

- **MUSS [MUST]** das `aiGenerated: true`-Frontmatter-Flag auf jedem KI-entworfenen Post gesetzt halten; das Löschen dieses Flags ist laut `CLAUDE.md` verboten und wird hier als Stil-Invariante wiederholt, weil der **textuelle Ton** davon abhängt, dass das Flag ehrlich ist. Das Flag zu entfernen und den Ton unverändert zu lassen, würde die Audiences A, B und L täuschen.
- **DARF NICHT [MUST NOT]** den Post in eine entschuldigende Rahmung um die KI-Entstehung wickeln („Das wurde mit Claude geschrieben, bitte Nachsicht …"). Audiences A und B erwarten, dass KI-entworfener Inhalt denselben Standard wie hand-geschriebener Inhalt erfüllt. Die Disclosure ist strukturell — heute über das `aiGenerated: true`-Frontmatter-Flag; sobald das Roadmap-Item R-4 (derzeit `status: proposed`) ausgeliefert ist, zusätzlich über das sichtbare Per-Post-AI-Disclosure-Badge mit Link auf die About-Seiten-Erklärung. Das MUSS [MUST] greift heute auf dem Frontmatter-Flag; die Badge-Hälfte der Disclosure wird verifizierbar, sobald R-4 den `status: done` erreicht (siehe §Offene Fragen).
- **DARF NICHT [MUST NOT]** behaupten, der Post sei hand-geschrieben, wenn er KI-entworfen ist — auch nicht indirekt über Ich-Form-Erinnerungsrahmen („als ich mich hinsetzte, um das zu schreiben …"), die implizieren, dass die Tastenanschläge vom Autor stammten. Akzeptabel: Ich-Form-Rahmen über Entscheidungen, Meinungen und Überprüfungen, die der Autor tatsächlich gemacht hat.
- **MUSS [MUST]** jede konkrete technische Aussage (ein Projekt tut X, eine Bibliothek verhält sich Y, ein Werkzeug gibt Z aus) auf einer verifizierbaren Quelle gründen — Quellcode, README, Release-Notes, Befehlsausgabe oder ein explizites Briefing des Nutzers — gemäß der Hard-Rule in `CLAUDE.md`. Wo die Aussage die eigene Meinung oder Erfahrung des Autors ist, **SOLLTE [SHOULD]** das mit Formulierungen wie „Ich habe festgestellt, dass …", „in meiner Nutzung von X …" signalisiert werden statt sie als externe Tatsache zu setzen.
- **SOLLTE [SHOULD]** den Rahmen „KI-entworfen, hand-kuratiert" als Arbeitsweise positionieren, nicht als Novität. Der Blog als Ganzes erklärt den Workflow über die About-Seite (gemäß Roadmap-Item R-4); einzelne Posts müssen den Workflow nicht neu erklären.

### Zweisprachige Typografie

- **MUSS [MUST]** jeden **technischen Identifier** (Funktionsname, Dateipfad, CLI-Flag, Paketname, Env-Var, Branch-Name, Error-String, Frontmatter-Schlüssel) zwischen EN und DE unverändert lassen. Die Übersetzung operiert nur auf der natürlichen Prosa.
- **MUSS [MUST]** in **EN-Posts** gerade ASCII-Anführungszeichen `"…"` verwenden (die Astro-Markdown-Pipeline curlt sie absichtlich nicht — die Rendering-Konvention ist plain ASCII, passend zur bestehenden `CLAUDE.md`-Regel). Einfache Anführungszeichen `'…'` für verschachtelte Fälle oder Kontraktionen.
- **MUSS [MUST]** in **DE-Posts** deutsche Anführungszeichen `„…"` verwenden (Neunundzwanzig-unten-Öffner, Sechsundsechzig-oben-Schließer, gemäß Duden). Guillemets `»…«` sind als stilistische Ausnahme für eine Sache erlaubt (visuell abgesetzte Blockzitate), **DÜRFEN [MAY]** aber nicht mit `„…"` im selben Post gemischt werden.
- **MUSS [MUST]** den Gedankenstrich mit umgebenden Spatien — so — in **EN und DE** verwenden (passt zur bestehenden Regel in `CLAUDE.md` und zur Duden-Konvention „Gedankenstrich mit Spatien"). Der Halbgeviertstrich `–` ist für numerische Bereiche reserviert (`Seite 12–15`, `2020–2024`); nie als Gedanken-Trennzeichen.
- **MUSS [MUST]** in DE-Posts korrekte deutsche Diakritika verwenden: `ä` `ö` `ü` `ß`. ASCII-Ersatz (`ae`, `oe`, `ue`, `ss`) sind im Post-Body **DARF NICHT [MUST NOT]**. Slug-Felder **MÜSSEN [MUST]** den EN-Slug behalten (laut `CLAUDE.md`-Slug-Regel), damit URLs unabhängig von der Body-Sprache ASCII bleiben.
- **DARF NICHT [MUST NOT]** ein EN-Idiom („low-hanging fruit", „back-of-the-envelope", „the elephant in the room") Wort für Wort ins DE übertragen; der Übersetzer wählt eine deutsche Entsprechung oder formuliert den Satz um. Die Gegenrichtung ist symmetrisch: ein seltenes DE-Idiom auf der DE-Seite wird auf der EN-Seite umgeschrieben statt wörtlich übersetzt.
- **SOLLTE [SHOULD]** so übersetzen, dass der Post sich liest, als wäre er ursprünglich in der Zielsprache geschrieben — Satzrhythmus, Absatz-Takte und kulturelle Verweise angepasst, nicht nur Vokabular getauscht.
- **MUSS [MUST]** die **`translationKey`-Invariante** halten: EN-Datei und DE-Datei teilen einen `translationKey` und einen Dateinamen-Slug, gemäß bestehendem `CLAUDE.md`-Vertrag. Stil-Verstöße auf einer Seite, die von der Sprache abhängen (z. B. eine DE-spezifische `„`-Platzierung), **DÜRFEN NICHT [MUST NOT]** als Änderungen auf die andere Seite propagieren.

### Verbotene Wörter und Phrasen

Dies ist die **geschlossene Liste** von Wörtern und Phrasen, die ohne ausdrückliche Override-Begründung **DARF NICHT [MUST NOT]** im Post-Body erscheinen. Inline-Code, direkte Zitate und Eigennamen von Produkten (z. B. eine Bibliothek, die tatsächlich `Seamless.js` heißt) sind ausgenommen; alles andere ist in Reichweite.

#### Hype-Wörter (bestehende `CLAUDE.md`-Liste, übernommen)

- `leverage` (verwende „use" / „nutzen")
- `delve` (verwende „go into", „look at", „dig into" / „eintauchen", „anschauen", „durchgehen")
- `robust` (verwende eine konkrete Eigenschaft — „verarbeitet ungültige Eingabe ohne Crash", „getestet über X Fälle")
- `seamless` (löschen oder durch das ersetzen, was wirklich passiert: „kein manueller Schritt", „ein einziger Befehl")

#### KI-Tell-Ergänzungen (forschungsabgeleitet; in §Referenzen mehrfach belegt)

- `utilize` (verwende „use" / „nutzen")
- `harness` (verwende „use" / „nutzen", „tap" / „anzapfen")
- `streamline` (verwende eine konkrete Beschreibung — „überspringt den Dry-Run-Schritt", „halbiert die Round-Trips")
- `underscore` (verwende „highlights", „shows" / „zeigt"; oder zu einem Substantiv umbauen)
- `pivotal` (verwende „central" / „zentral", „important" / „wichtig")
- `cutting-edge` (löschen; oder die konkrete Version / Fähigkeit benennen)
- `innovative` (löschen; die Neuigkeit konkret beschreiben)
- `tapestry`, `realm`, `landscape`, `synergy`, `testament`, `underpinnings` (löschen; den Satz neu schreiben)
- `It's worth noting that…`, `It is important to note that…`, `In conclusion`, `In summary` (Verpackung löschen; den eigentlichen Punkt behalten)
- `In today's fast-paced …`, `In an era of …`, `As we navigate the …` (löschen; auf der konkreten These eröffnen)
- `Whether you're a … or a …` (audience-schmeichelnde Verpackung weglassen)

#### Corporate-Speak / Sales-Register

- `synergies`, `holistic`, `best-in-class`, `world-class`, `industry-leading`, `enterprise-grade`, `mission-critical`, `next-gen`
- `unlocks`, `empowers`, `accelerates`, `transforms`, `revolutionises`, `disrupts` (als transitive Verben über Technik)

#### LLM-Betonungs-Tics

- Sätze, die beginnen mit „**It's** [Adjektiv] **that**…" oder „**It is** [Adjektiv] **to**…" — in eine direkte Aussage umbauen.
- Sätze, die enden mit „…and that's a **good thing** / **bad thing**." — in die spezifische Begründung umbauen.

#### Override-Verfahren

- Ein konkretes Wort auf der geschlossenen Liste **DARF [MAY]** in einem einzelnen Post behalten werden, wenn ein dokumentierter Grund vorliegt (wörtliches Zitat, benanntes Produkt, klar als solche gerahmte ironische Verwendung). Der Post-Body **MUSS [MUST]** den Override in der umgebenden Prosa sichtbar machen („…die Doku nennt das eine ‚seamless'-Integration, was …") statt die Liste still zu verletzen.

#### Listen-Pflege

Die obige Liste ist der maßgebliche Bestand der Spec. Änderungen an ihr sind keine Per-Post-Ereignisse; sie sind Spec-Ebene-Änderungen, geregelt durch die untenstehenden Regeln.

- **MUSS [MUST]** im Spec-Diff für jede **Ergänzung** in einer Teilliste (Hype-Wörter, KI-Tell-Ergänzungen, Corporate-Speak, LLM-Betonungs-Tics) ein Quellen-Zitat tragen. Zulässige Quellen sind dokumentierte KI-Tell-Kataloge, Plain-Language-Style-Guides oder ein erfasster Vorfall auf diesem Blog, in dem das Wort einen bekannten Fehler-Modus erzeugte; das Zitat gehört in die Commit-Message der Ergänzung, nicht zwingend in den Spec-Body.
- **MUSS [MUST]** im Spec-Diff für jede **Streichung** aus einer Teilliste eine Ein-Zeile-Begründung tragen (z. B. „Wort ist in den neutralen Alltagsgebrauch übergegangen; per 2026-Qx von der Liste genommen").
- **MUSS [MUST]** die gesamte Liste bei jedem Übergang einer Claude-Modellfamilie (z. B. Claude 4.x → 5.x) re-reviewen; der Re-Review wird als Continuous-Improvement-Eintrag oder dedizierter Commit dokumentiert, nicht still abgehakt.
- **SOLLTE [SHOULD]** die Liste implizit über die `Status:`-Zeile der Spec plus Git-Historie versionieren — kein `version:`-Feld wird hinzugefügt; das Audit-Log lebt in `git log -- spec/project/post-writing-style/`.

### Edit-Durchgang (vor Veröffentlichung)

Die Anforderungen in diesem Abschnitt regeln die **Pre-Publish-Verantwortung des Autors** an einer Arbeitskopie des Posts. Ein nachgelagerter Lint-Skill oder automatisierter Reviewer **DARF [MAY]** die Punkte prüfen, die ein entsprechendes Akzeptanzkriterium tragen (siehe §Akzeptanzkriterien — `a-2`, `a-3`, `a-4`, `a-9`, `a-14`, `a-15`, `a-16`); die übrigen Punkte dieses Abschnitts sind Autoren-Pflichten, die kein heutiges Werkzeug verifizieren kann und die der Ausschluss „Review-Workflow / Merge-Gates" unter §Nicht-Ziele nicht zu einem CI-Gate erhebt.

- **MUSS [MUST]** den Post vor der Veröffentlichung laut lesen — oder von einem TTS vorlesen lassen. Sätze, über die der Autor stolpert, sind zu lang oder enthalten versteckte Passiv-Konstruktionen; das Laut-Lesen fängt beides.
- **MUSS [MUST]** jede konkrete Behauptung über ein Projekt / eine Bibliothek / ein Werkzeug gegen die zitierte Quelle verifizieren (gemäß `CLAUDE.md`). Den zitierten Befehl neu ausführen, die zitierte Datei am zitierten Stand öffnen oder das README wörtlich zitieren sind die kanonischen Verifikationen.
- **MUSS [MUST]** `task build` (oder `task check`) vor Veröffentlichung ausführen, gemäß `CLAUDE.md`-Workflow-Regel. Ein Post, der nicht baut, wird nicht ausgeliefert.
- **SOLLTE [SHOULD]** einen Absatz löschen, bei dem der Autor zögert — die meisten Blog-Posts lesen sich nach diesem Streichen straffer als die Alternative. (Strunk- / Zinsser-Prinzip, pro Post angewandt.)
- **SOLLTE [SHOULD]** vor dem Merge prüfen, dass EN- und DE-Datei in `task dev` gegen den aktiven Sprachschalter rendern. Ein `translationKey`-Mismatch ist ein stiller Bruch, den der Build nicht in jedem Fall fängt.

### Audience-L-Schutz

- **MUSS [MUST]** jede Charakterisierung eines Drittprojekts / einer Drittperson / eines Drittwerkzeugs auf einem Primärquellen-Zitat gründen (README des Projekts, öffentliche Aussage eines Maintainers, Code-Verweis, Release-Note). Kritik ist erlaubt; rufschädigende Aussagen über unverifiziertes Verhalten sind es nicht.
- **MUSS [MUST]** einen Korrektur-Pfad anbieten. Der aktuelle Pfad ist implizit (das Source-Repo ist öffentlich, die E-Mail steht auf der About-Seite); wenn die offene Frage in [`AUDIENCES.md`](../../../AUDIENCES.md) nach einem dedizierten Kontakt- / Korrektur-Kanal entschieden ist, **MUSS [MUST]** dieser Abschnitt aktualisiert werden, um den konkreten Kanal zu benennen.
- **DARF NICHT [MUST NOT]** private Kommunikation (Slack-DMs, private E-Mails, geschlossene Issue-Threads) ohne ausdrückliche Einwilligung der Quelle zitieren.
- **SOLLTE [SHOULD]** den vom Projekt selbst bevorzugten Namen und die Großschreibung verwenden (z. B. `npm` statt `NPM`, `Astro` statt `astro`). Bei Personen die öffentlich verwendete Form benutzen.

## Akzeptanzkriterien

Ein Post erfüllt diese Spec, wenn **alle** Per-Post-Kriterien unten gelten. Die Spec-Ebene-Kriterien (`a-18` und folgende) werden gegen das Spec-Korpus und seine Git-Historie geprüft, nicht pro Post; sie werden bei Spec-Änderungen reviewt. Jedes Kriterium ist so geschrieben, dass ein Reviewer (der Autor, Claude oder ein zukünftiger Lint-Skill) es ohne Mehrdeutigkeit erledigt / nicht erledigt markieren kann.

### Per-Post-Kriterien

- [ ] **a-1** Der Body öffnet mit einem Inverted-Pyramid-Lead-Absatz (≤ 80 Wörter), der die These, den Umfang oder die Frage des Posts benennt.
- [ ] **a-2** Die durchschnittliche Satzlänge im Body liegt zwischen 14 und 20 Wörtern; keine zwei aufeinanderfolgenden Sätze überschreiten 30 Wörter.
- [ ] **a-3** Kein Body-Absatz überschreitet 4 Sätze (Bullet-Listen sind für diese Regel keine Absätze).
- [ ] **a-4** Flesch-Kincaid Grade Level auf dem EN-Body (Code-Blöcke ausgenommen) liegt zwischen 7 und 10. **Vorläufig**: bis der `textstat`-oder-äquivalente Lint-Hook ausgeliefert ist (siehe §Offene Fragen), ist die Prüfung Reviewer-Urteil, und der 7–10-Schwellenwert selbst kann nach den ersten 10 EN-Posts rekalibriert werden. Der DE-Body ist von diesem Kriterium ausgenommen, bis ein DE-spezifisches Lesbarkeitsziel definiert ist (siehe §Offene Fragen).
- [ ] **a-5** Jeder fenced Code-Block deklariert einen unterstützten Sprach-Identifier.
- [ ] **a-6** Jeder Link-Text beschreibt sein Ziel allein (besteht WCAG 2.4.4).
- [ ] **a-7** Überschriften sind durchgängig Sentence Case; der Body deklariert keine zweite H1; Heading-Level werden nach unten nicht übersprungen.
- [ ] **a-8** Kein Wort und keine Phrase aus der geschlossenen Verboten-Liste erscheint im Body ohne dokumentierten Override in der umgebenden Prosa.
- [ ] **a-9** Jede konkrete technische Aussage über ein benanntes Projekt / eine Bibliothek / ein Werkzeug zitiert eine verifizierbare Quelle.
- [ ] **a-10** Das Flag `aiGenerated: true` ist im Frontmatter vorhanden; der Body widerspricht der Wahrheit des Flags nicht über „ich habe mich hingesetzt und das selbst geschrieben"-Rahmen.
- [ ] **a-11** EN-Datei und DE-Datei teilen denselben `translationKey` und denselben Datei-Slug; beide rendern unter `task dev`.
- [ ] **a-12** DE-Post verwendet `„…"`-Anführungszeichen, Gedankenstrich mit umgebenden Spatien und `ä` / `ö` / `ü` / `ß` (kein ASCII-Ersatz). EN-Post verwendet ASCII `"…"` und Gedankenstrich mit Spatien.
- [ ] **a-13** Jede Charakterisierung einer namentlich genannten Drittpartei (Audience L) trägt ein Primärquellen-Zitat; private Kommunikation wird nicht ohne ausdrückliche Einwilligung zitiert.
- [ ] **a-14** `task build` läuft auf dem Arbeitsbaum, der beide Dateien enthält, erfolgreich durch.
- [ ] **a-15** Der EN-Body verwendet in der laufenden Prosa Kontraktionen (`it's`, `you'll`, `don't`, `I've`, `we're`); ausgeschriebene Formen erscheinen nur in direkten Zitaten, Code-Blöcken oder dort, wo eine Kontraktion echte Mehrdeutigkeit erzeugen würde.
- [ ] **a-16** Wenn der Post eine nicht-offensichtliche Entscheidung beschreibt, benennt der Body, was die Entscheidung schwer machte, **bevor** er die gewählte Option benennt (das „Show the thinking"-MUSS in §Person, Voice und Ton).
- [ ] **a-17** Die Badge-Hälfte des strukturellen AI-Disclosure-MUSS in §KI-Disclosure-Ton ist von der Per-Post-Verifikation ausgenommen, bis das Roadmap-Item R-4 den `status: done` erreicht; das `aiGenerated: true`-Frontmatter-Flag, von `a-10` abgedeckt, ist der heute in Kraft befindliche Teil dieses MUSS.

### Spec-Ebene-Kriterien

Geprüft gegen `git log -- spec/project/post-writing-style/`, nicht gegen einzelne Posts. Diese Kriterien gehören zum Untersektion §Verbotene Wörter und Phrasen — §Listen-Pflege.

- [ ] **a-18** Jede Ergänzung in einer Teilliste unter §Verbotene Wörter und Phrasen trägt ein Quellen-Zitat im Spec-Diff oder in der Commit-Message, die die Ergänzung einführt.
- [ ] **a-19** Jede Streichung aus einer Teilliste unter §Verbotene Wörter und Phrasen trägt eine Ein-Zeile-Begründung im Spec-Diff oder in der Commit-Message, die die Streichung einführt.
- [ ] **a-20** Eine Re-Review-Aufzeichnung für die §Verbotene-Wörter-Liste existiert bei jedem Claude-Modellfamilien-Übergang (z. B. 4.x → 5.x) und ist in `git log` identifizierbar — entweder als Commit-Message-Tag (z. B. `forbidden-list re-review`) oder als dedizierter Continuous-Improvement-Eintrag.

## Offene Fragen

- **Quantitatives Lesbarkeits-Gate.** §Lesbarkeits-Schwellenwerte verankert Flesch-Kincaid 7–10 als Ziel. Ein Lint-Hook, der die FK-Stufe pro Post misst, ist noch nicht gebaut. Bis dahin ist das Gate Reviewer-Urteil; ein zukünftiges Feature-Item sollte `textstat` (oder ein Äquivalent) in `task check` verdrahten. Der Schwellenwert selbst kann eine Neukalibrierung brauchen, sobald über die ersten 10 Posts echte Messungen vorliegen.
- **DE-seitiges Lesbarkeitsziel.** Flesch-Kincaid ist auf Englisch kalibriert. Das deutsche Pendant ist die Wiener Sachtextformel oder das Amstad-adjustierte Flesch. Diese Spec verankert mangels Daten keinen DE-spezifischen Schwellenwert; der Reviewer stützt sich für DE-Posts allein auf §Person, Voice und Ton plus §Zweisprachige Typografie. Eine Folge-Revision **SOLLTE [SHOULD]** ein DE-spezifisches Lesbarkeitsziel ergänzen, sobald mindestens 5 DE-Posts zur Kalibrierung vorhanden sind.
- **Pflege der Verboten-Liste.** Die geschlossene Liste unter §Verbotene Wörter ist forschungsabgeleitet zum Zeitpunkt `Status: draft`. Neue KI-Tell-Tics tauchen auf, wenn Claude-Versionen und Prompt-Muster sich ändern. Die Liste **MUSS [MUST]** bei jedem Modellfamilien-Übergang (z. B. Claude 4.x → 5.x) re-reviewt werden; der Mechanismus dieses Re-Reviews ist hier nicht definiert und sollte von einem nachgelagerten Skill oder einem Continuous-Improvement-Eintrag aufgegriffen werden.
- **Override-Verfahrens-Formalismus.** §Override-Verfahren erlaubt aktuell eine Inline-Prosa-Begründung für ein verbotenes Wort. Ein strikterer Mechanismus — Frontmatter-Feld `style_overrides: ["seamless"]` mit Begründung — würde Overrides im Diff prüfbar machen statt in Prosa zu verstecken. Vertagt bis der dritte dokumentierte Override-Fall zeigt, dass der Prosa-Mechanismus nicht skaliert.
- **AI-Disclosure-Badge-Verdrahtung.** R-4 verlangt ein Per-Post-Badge mit Link auf eine About-Seiten-Erklärung. Der Text-Inhalt des Badges (z. B. „KI-entworfen, hand-kuratiert") ist selbst eine Stilentscheidung, die diese Spec berührt; sobald das Badge ausgeliefert ist, **SOLLTE [SHOULD]** sein Wortlaut hier unter §KI-Disclosure-Ton reflektiert sein.

## Referenzen

Voice und Ton:

- [The Four Dimensions of Tone of Voice — NN/G](https://www.nngroup.com/articles/tone-of-voice-dimensions/)
- [Voice and tone — Google developer documentation style guide](https://developers.google.com/style/tone)
- [Active voice — Google developer documentation style guide](https://developers.google.com/style/voice)
- [Voice and Tone — Mailchimp Content Style Guide](https://styleguide.mailchimp.com/voice-and-tone/)
- [Top 10 tips for Microsoft style and voice — Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice)
- [Microsoft's brand voice; above all, simple and human — Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/brand-voice-above-all-simple-human)

Plain Language und Lesbarkeit:

- [Federal Plain Language Guidelines (plainlanguage.gov)](https://www.plainlanguage.gov/howto/guidelines/FederalPLGuidelines/FederalPLGuidelines.pdf)
- [Top 10 Principles for Plain Language — National Archives](https://www.archives.gov/open/plain-writing/10-principles.html)
- [Flesch–Kincaid readability tests — Wikipedia](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests)
- [Sentence length — Readability guidelines](http://readabilityguidelines.wikidot.com/sentence-length)
- [Improve the readability of your technical documentation with Flesch (ClickHelp)](https://clickhelp.com/clickhelp-technical-writing-blog/improve-the-readability-of-your-technical-documentation-with-flesch/)

Struktur und Fluss:

- [Inverted Pyramid: Writing for Comprehension — NN/G](https://www.nngroup.com/articles/inverted-pyramid/)
- [Content design: writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)
- [How to Prevent F-Pattern Scanning — Mailchimp](https://mailchimp.com/resources/f-pattern-scanning/)

Überschriften und Barrierefreiheit:

- [Title Case vs. Sentence Case — Grammarly](https://www.grammarly.com/blog/sentences/title-case-sentence-case/)
- [G141: Organizing a page using headings — W3C WCAG Techniques](https://www.w3.org/TR/WCAG20-TECHS/G141.html)
- [Understanding Success Criterion 2.4.4: Link Purpose (In Context) — W3C WAI](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)
- [Headings — W3C Web Accessibility Initiative tutorial](https://www.w3.org/WAI/tutorials/page-structure/headings/)

Code- und Markdown-Konventionen:

- [Markdown best practices — Microsoft Learn (PowerShell contributor guide)](https://learn.microsoft.com/en-us/powershell/scripting/community/contributing/general-markdown)
- [Fenced Code Blocks — Python-Markdown documentation](https://python-markdown.github.io/extensions/fenced_code_blocks/)

KI-Tells und Verboten-Wörter:

- [Don't Write Like AI: Red Flag Words — Blake Stockton](https://www.blakestockton.com/red-flag-words/)
- ["I'd like to delve into how AI is fostering changes in writing" — Mere Sophistry](https://meresophistry.substack.com/p/id-like-to-delve-into-how-ai-is-fostering)
- [How to Spot AI Writing Tells — Olivia Cal](https://www.oliviacal.com/post/ai-writing-tells)

KI-Inhalts-Disclosure-Normen:

- [BBC sets protocol for generative AI content — Broadcast](https://www.broadcastnow.co.uk/production-and-post/bbc-sets-protocol-for-generative-ai-content/5200816.article)
- [7 things you need to know about the BBC's AI guidance — Broadcast](https://www.broadcastnow.co.uk/production-and-post/7-things-you-need-to-know-about-the-bbcs-ai-guidance/5200901.article)
- [Key AI concepts to grasp in a new hybrid journalism era — Reuters Institute](https://reutersinstitute.politics.ox.ac.uk/key-ai-concepts-grasp-new-hybrid-journalism-era-transparency-autonomy-and-authorship)

Deutsche Typografie:

- [Duden — Anführungszeichen](https://www.duden.de/sprachwissen/rechtschreibregeln/anfuehrungszeichen)
- [Wikipedia:Typografie — Anführungszeichen und Gedankenstrich](https://de.wikipedia.org/wiki/Wikipedia:Typografie)

„Show your work"-Beispiel-Blogs:

- [Kalzumeus — Patrick McKenzie's archive](https://www.kalzumeus.com/archive/)
- [Julia Evans — jvns.ca](https://jvns.ca/)
