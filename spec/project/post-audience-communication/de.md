# Audience-Kommunikation für Posts

Status: draft

## Kontext

Leser: der Post-Autor, Claude Code als KI-Co-Operator, der Posts entwirft und übersetzt, sowie nachgelagerte Review-Skills, die einen Post vor Veröffentlichung gegen diese Spec prüfen.

Diese Spec ist das Pendant zu [`post-writing-style`](../post-writing-style/de.md). Wo `post-writing-style` dem Autor sagt, **wie** geschrieben wird (Voice, Lesbarkeit, Typografie, verbotene Wörter), sagt diese Spec dem Autor, **für wen geschrieben wird und wie ein einzelner Post so geformt ist, dass der richtige Leser zuerst bedient wird, ohne die anderen zu verprellen**.

Das Audience-Artefakt unter [`AUDIENCES.md`](../../../AUDIENCES.md) (per `audience-identify`-Skill aus `spec/project/audience-identification/` erzeugt) listet sieben Audiences für dieses Repository. Fünf davon sind über den Body eines veröffentlichten Blog-Posts erreichbar und damit im Geltungsbereich dieser Spec:

- **A — Technische Leser** (direkt, primär, `user-docs`): Spontan-Leser über Suche, RSS oder den Link eines Peers. Lesen für technische Genauigkeit, funktionierenden Code, „Show your work"-Tiefe — auf EN oder DE.
- **B — Portfolio-Reviewer** (direkt, primär, `user-docs`): HR-Personen, Recruiter, Hiring-Manager, die über CV / LinkedIn kommen. Lesen für ein schnelles Signal über Projekt-Arbeit, Arbeitsweise und Aktivität — auf EN oder DE; Eye-Tracking-Forschung legt den initialen Scan auf 6–7 Sekunden fest.
- **C — Autor als Knowledge-Base-Nutzer** (direkt, primär, `user-docs`): der Autor liest seine eigenen Posts Monate oder Jahre später wieder, um eine Entscheidung oder eine Methode zu rekonstruieren. Toleriert rauere Entwürfe; braucht eine dauerhafte, für das zukünftige Ich kalt lesbare Erklärung.
- **L — In Posts genannte Personen und Projekte** (indirekt, peripher): Dritte, die im Post charakterisiert werden. Erwarten faire, genaue Darstellung und einen Korrektur-Pfad.
- **M — Suchmaschinen und LLM-Crawler** (indirekt, peripher): konsumieren die Seite über `<head>`, Sitemap, RSS, OG-Meta, `robots.txt`. Nicht im Geltungsbereich für Body-Prosa — hier außerhalb des Umfangs.

Zwei weitere Audiences aus `AUDIENCES.md` (D — Autor als Site-Maintainer, E — Claude Code als KI-Co-Operator) konsumieren das Repository, nicht den Blog-Body, und sind für diese Spec außerhalb des Geltungsbereichs.

Das schwere Problem, das diese Spec löst: **ein einzelner Blog-Post kann nicht gleichzeitig maximal für A, B und C optimieren.** A (technischer Peer) will Tiefe; B (Recruiter) will ein Sechs-Sekunden-Signal; C (zukünftiges Ich) will rohe Arbeitsnotizen, die A und B als zu unfertig empfänden. Die bestehende Tech-Comm-Forschung (Carliner, Lannon, gov.uk Content Design, NN/g Progressive Disclosure) konvergiert auf eine Antwort: geschichtetes Schreiben mit deklarierter Primär-Audience pro Post. Genau das kodifiziert diese Spec.

## Ziele

- Vorschreiben, dass jeder Post **genau eine Primär-Audience deklariert**, damit Autor und Claude beim Formen von Lede, Tiefe und Schluss ein unmissverständliches Ziel haben.
- Eine **Audience-spezifische Adressierungs-Rubrik** liefern — für jede von A, B, C — die benennt, worauf zu optimieren ist, was zu vermeiden ist, welches Lede-Muster zu verwenden ist und welche Konflikt-Lösungs-Haltung gilt, wenn Audiences uneins sind.
- **Multi-Audience-Schichtungs-Regeln** liefern, damit ein primär für eine Audience geschriebener Post die anderen über Progressive Disclosure weiterhin bedient (überfliegbares Lede → Body-Tiefe → optionale Drawer / Fußnoten / verlinkte Anhänge).
- **Audience-L-Behandlung** kodifizieren (genannte Dritte): wie sie fair charakterisiert werden, wann Einwilligung nötig ist, wie der Korrektur-Pfad aussieht.
- **Zweisprachige Audience-Symmetrie** festlegen: das EN- und DE-Post-Paar bedient in beiden Sprachen dieselbe Primär-Audience; die Wahl wechselt nicht zwischen den Seiten.
- **Portfolio-Blog-fokussiert bleiben**: die Spec regelt den Body einer Markdown-Datei unter `src/content/posts/{en,de}/`. Header-Metadaten, Sitemap, OG-Card-Inhalt und RSS-Form sind außerhalb des Geltungsbereichs (sie bedienen Audience M und werden anderswo geregelt).

## Nicht-Ziele

- Das **Audience-Artefakt** selbst oder die Audience-Identifikations-Methodik zu definieren — das liegt unter [`AUDIENCES.md`](../../../AUDIENCES.md) und `spec/project/audience-identification/`.
- [`post-writing-style`](../post-writing-style/de.md) zu ersetzen. Die Writing-Style-Spec definiert Voice, Lesbarkeit, Typografie und verbotenes Vokabular unabhängig von der Audience. Diese Spec definiert Audience-Targeting darüber hinaus; die beiden sind so entworfen, dass sie zusammenwirken.
- **Per-Page-Docs-Tracks-Frontmatter** zu definieren. Astro-Post-Frontmatter trägt nicht das `track:`-Feld der MkDocs-seitigen Docs-Audience-Tracks-Spec, weil jeder Blog-Post denselben `user-docs`-Track bedient. Das Audience-Signal dieser Spec lebt in einem separaten Frontmatter-Feld (siehe §Primär-Audience-Deklaration).
- **Content-Auswahl** zu definieren. Welche Projekte, Entscheidungen oder Erfahrungen in einen Post münden, ist eine Roadmap- / Sprint-Frage, keine Audience-Kommunikations-Frage. Sobald ein Thema gewählt ist, definiert diese Spec, für wen der Post ist.
- **SEO / Metadaten für Audience M** zu definieren. Die crawler-zugewandte Oberfläche ist strukturierte Daten-Form, keine Body-Prosa; sie gehört in eine separate Metadaten- oder `robots`-Policy-Spec.
- **Journalistische Redaktionsstandards** zu ersetzen. Der Autor ist kein Journalist; die Spec leiht sich die BBC- / Reuters- / AP-Normen, die für die Darstellung Dritter gelten, mandatiert aber nicht die gesamte redaktionelle Governance jener Häuser.

## Anforderungen

### Primär-Audience-Deklaration

- **MUSS [MUST]** für jeden Post genau eine **Primär-Audience** über ein Frontmatter-Feld `primaryAudience: <A | B | C>` deklarieren. Nur A, B oder C sind gültige Werte für dieses Feld; L ist nie eine Primär-Audience (Audience L ist eine Randbedingung, kein Ziel — siehe §Audience-L-Behandlung), und M ist gemäß §Nicht-Ziele außerhalb des Geltungsbereichs.
- **MUSS [MUST]** eine Sekundär-Audience-Liste über ein Frontmatter-Feld `secondaryAudiences: [<A | B | C>, …]` deklarieren. Die Liste **DARF NICHT [MUST NOT]** den in `primaryAudience` verwendeten Wert enthalten; sie **DARF [MAY]** leer sein (`[]`), wenn der Post absichtlich eng ist.
- **DARF NICHT [MUST NOT]** `primaryAudience` nach der Veröffentlichung rotieren, um einen schlecht laufenden Post umzuwidmen. Das Frontmatter-Feld ist ein Write-Once-Vertrag, der die Post-Form verankert; ein Post, der eine andere Audience bedienen will, ist ein neuer Post unter einem neuen Slug.
- **SOLLTE [SHOULD]** über das Korpus eine Verteilung von **A: rund 50 %, B: rund 20 %, C: rund 30 %** anstreben, gemessen über ein gleitendes Fünf-Post-Fenster. Die Prozentsätze sind die Arbeits-Hypothese des Autors, **keine** Ableitung aus der Kritikalitäts-Hierarchie in `AUDIENCES.md` — jenes Dokument vertagt die Reihenfolge zwischen den primären Direkt-Konsumenten A, B und C ausdrücklich („the relative ordering among them needs real usage data before it can be committed", siehe `AUDIENCES.md` §Open questions). Der Split hier ist daher ein Startwert, der gegen echte Traffic- / Referrer-Daten kalibriert werden muss; Abweichungen sind in jedem einzelnen Post in Ordnung und signalisieren eine Kalibrierungsfrage erst über einen 10-Post-Horizont.
- **DARF [MAY]** einen Post `primaryAudience: C` markieren, auch wenn der Inhalt dauerhaft und teilbar ist; das Feld deklariert, für welchen Leser die Form des Posts optimiert wurde, nicht wer ihn lesen darf.

### Audience-A-Adressierungs-Rubrik (technische Leser)

A ist ein technischer Peer-Leser, der über Suche, einen RSS-Reader oder den Link eines anderen Entwicklers gekommen ist. Die erste Frage des Lesers ist „weiß diese Person, wovon sie spricht" — beantwortet im ersten Absatz. Die zweite Frage ist „kann ich die gezeigte Arbeit kopieren / adaptieren / verifizieren" — beantwortet im Body.

- **MUSS [MUST]** mit dem konkreten Artefakt führen — der Problemstellung, dem fehlschlagenden Fall, dem konkret diskutierten Code, der Versions-Festschreibung. Die ersten 80 Wörter eines A-Posts **DÜRFEN NICHT [MUST NOT]** Hintergrundkontext sein; sie **MÜSSEN [MUST]** die technische Aussage benennen.
- **MUSS [MUST]** das arbeitende Artefakt wörtlich tragen: das Diff, die Befehlsausgabe, die Config, den fehlschlagenden Test, den Screenshot des UI-Zustands — je nachdem, was der Leser zum Reproduzieren bräuchte. Das Artefakt ist nicht eine Illustration des Posts; der Post ist die Erklärung um das Artefakt.
- **MUSS [MUST]** Versionen jedes diskutierten Werkzeugs / jeder Bibliothek / jedes Frameworks benennen (`Astro 5.x`, `Tailwind 4.0`, `Claude Opus 4.7`, `Python 3.12`), damit der Leser die Aussage zeitlich einordnen und entscheiden kann, ob sie noch zu seinem Setup passt.
- **DARF NICHT [MUST NOT]** Audience-B-Vokabular voraussetzen. „MVP", „ROI", „Stakeholder" und „Value Delivery" sind außerhalb des Registers; wenn ein Business-Rahmen wirklich zählt, technisch benennen („wir wollten, dass das in CI ohne bezahlten Hosted-Runner läuft").
- **DARF NICHT [MUST NOT]** zu wenig zeigen, weil „der Leser das schon kennt". Im Zweifel auf die Primärquelle verlinken statt den Verweis zu überspringen; ein A-Leser nutzt die Links, ein B-Leser überspringt sie, keiner zahlt einen Preis.
- **SOLLTE [SHOULD]** mit einem Abschnitt „außerhalb des Umfangs / offene Fragen / was ich als Nächstes machen würde" schließen. Das bedient As Neugier (andere Pfade durch das Problem) und gleichzeitig C (Kontinuität für das zukünftige Ich), ohne B zu kosten, der ohnehin schon weg ist.
- **SOLLTE [SHOULD]** das Erfahrungsniveau früh signalisieren. „Ich hatte X vor diesem Projekt nicht angefasst" setzt die Erwartung des Lesers genauso ehrlich wie „ich habe X seit fünf Jahren in Produktion"; beides ist nützlich für A.

### Audience-B-Adressierungs-Rubrik (Portfolio-Reviewer)

B ist ein Recruiter, Hiring-Manager oder jemand, der das Portfolio des Autors aus einem nicht-technisch-tiefen Winkel evaluiert. Eye-Tracking-Studien legen den initialen Scan auf sechs bis sieben Sekunden; der Post muss **was gebaut wurde, welche Rolle der Autor hatte, und wie aktuell die Arbeit ist** in diesem Fenster signalisieren — sonst geht der Leser.

- **MUSS [MUST]** die ersten 80 Wörter (das in [`post-writing-style`](../post-writing-style/de.md) verlangte Inverted-Pyramid-Lead) so gestalten, dass sie als Sechs-Sekunden-Signal funktionieren: sie **MÜSSEN [MUST]** benennen (a) das Projekt oder das Thema, (b) was getan wurde, (c) die Rolle des Autors in der ersten Person. „Ich habe die Deploy-Pipeline meiner Home-Assistant-Integration so umgebaut, dass sie bei jedem Push grün durchgeht" besteht; „Heute schauen wir uns CI/CD an" fällt durch.
- **MUSS [MUST]** früh einen Ein-Satz „was das in der Praxis bedeutet"-Satz tragen — was sich änderte, was ausgeliefert wurde, was gelernt wurde — in einfacher Sprache formuliert. Audience B parst `kubectl rollout restart` nicht, liest aber „ich habe die Deploy-Zeit von 12 Minuten auf 90 Sekunden gedrückt".
- **MUSS [MUST]** den Post visuell scanbar halten: mindestens zwei H2-Überschriften für jeden Post über 600 Wörter, die erste H2 innerhalb des ersten Bildschirm-Inhalts (≈ 400 Wörter auf einer Desktop-Lesespalte).
- **DARF NICHT [MUST NOT]** vom Leser verlangen, die Code-Blöcke zu lesen. Ein B-Leser überspringt fenced Code. Die umgebende Prosa **MUSS [MUST]** die Botschaft tragen; der Code untermauert sie, ist aber nicht die Botschaft.
- **DARF NICHT [MUST NOT]** mit einer Jargon-Barriere eröffnen („Dieser Post ist über k8s-Operators auf CRD-Basis …"). Der Jargon darf später in den Body kommen, sobald die übergeordnete Aussage gelandet ist.
- **SOLLTE [SHOULD]** das Portfolio-Projekt explizit benennen und auf sein Repository verlinken (oder `/projects/<slug>` für Portfolio-Einträge), damit der B-Leser mit einem Klick vom Post auf die Projekt-Seite springen kann.
- **SOLLTE [SHOULD]** ein Datums-Signal über das Frontmatter-`pubDate` hinaus einbauen — „im Mai 2026" im Lede oder ein Tag wie „laufende Arbeit" / „in Produktion ausgeliefert" —, weil B-Leser, die den Post 2027 lesen, wissen wollen, ob er noch frisch ist.

### Audience-C-Adressierungs-Rubrik (Autor als Knowledge-Base-Nutzer)

C ist der Autor, der seine eigene Arbeit Monate oder Jahre später wiederliest, um eine Entscheidung, eine Methode oder einen Kontext zu rekonstruieren, die aus dem Gedächtnis gefallen sind. C erwartet Dauerhaftigkeit und Selbst-Kohärenz: der Post sollte kalt aufgenommen werden können, ohne das umgebende Gespräch, das ihn produzierte.

- **MUSS [MUST]** das **Warum** jeder im Post beschriebenen Entscheidung dokumentieren, nicht nur das **Was**. „Ich habe mich für `bun` statt `node` entschieden" ohne „weil der Build 4× schneller war und `node_modules` ständig Merge-Konflikte produziert hat" ist für das zukünftige Ich nutzlos.
- **MUSS [MUST]** die **erwogenen und verworfenen Alternativen** benennen, wenn der Post eine nicht-offensichtliche Entscheidung beschreibt. Die Liste „was ich nicht gewählt habe" ist für das zukünftige Ich mindestens so wertvoll wie die Endwahl — das sind die Sackgassen, die der Autor nicht neu erkunden muss.
- **MUSS [MUST]** ein **Glossar oder eine Notiz „was diese Begriffe in diesem Post bedeuten"** tragen, wenn der Post auf Terminologie aufbaut, die sich bis zum Wiederlese-Zeitpunkt verschoben haben kann. Begriff einmal mit einer kurzen Klammer oder einem Link zum Original-RFC / Projekt-README markieren; das zukünftige Ich erinnert sich 2028 nicht zwingend an die 2026-er Bedeutung von „Agent" oder „Skill".
- **DARF [MAY]** rauer sein als ein A- oder B-Post — abgebrochene Gedanken in Klammern, halbfertige Sätze, „TODO: hier zurückkommen"-Marker — vorausgesetzt der Post ist ehrlich als `primaryAudience: C` getaggt. Die rauere Form ist das Feature; sie auf A-Qualität herunterzuschleifen würde die Eigenschaft löschen, die C-Posts im Sinne eines Digital-Garden nützlich macht.
- **MUSS [MUST]** trotzdem die **Verifizierbarkeits-Regel der Writing-Style-Spec** erfüllen: Rauheit ist in der Form erlaubt, nicht in der faktischen Genauigkeit. Ein C-Post, der „Library X tut Y" ohne Quelle behauptet, ist derselbe Verstoß wie ein A-Post, der das tut.
- **SOLLTE [SHOULD]** aggressiv mit anderen Posts zu verwandten Themen quer-verlinkt sein. C-Posts ziehen ihren Wert aus dem verlinkten Graphen; ein isolierter C-Post ist ein weniger nützlicher C-Post.

### Audience-L-Behandlung (genannte Dritte)

Audience L sind alle, die der Post namentlich charakterisiert: Maintainer diskutierter Bibliotheken, kritisierte Projekte, zitierte Personen, verglichene Werkzeuge. Die Fairness-Regeln unten sind nicht verhandelbar, unabhängig davon, welche von A, B oder C die Primär-Audience ist.

- **MUSS [MUST]** jede Charakterisierung einer namentlich genannten Drittpartei auf einer Primärquelle gründen — README des Projekts, öffentlicher Maintainer-Statement, Release-Note, Code-Verweis auf einen festen Revisions-Stand. Kritik ist zulässig; unverifizierte Tatsachenbehauptungen über Verhalten sind es nicht.
- **MUSS [MUST]** den bevorzugten Namen und die Großschreibung der Drittpartei verwenden, wenn bekannt (z. B. `npm` statt `NPM`, `Astro` statt `astro`). Bei Personen die öffentlich verwendete Form.
- **DARF NICHT [MUST NOT]** private Kommunikation (DMs, private E-Mails, geschlossene Issue-Threads, internes Slack) ohne ausdrückliche Einwilligung der Quelle zitieren.
- **DARF NICHT [MUST NOT]** Intentionen einer Drittpartei charakterisieren („sie haben das gemacht, um Nutzer einzusperren") ohne öffentliche Aussage, die die Charakterisierung stützt; Intentions-Aussagen sind in beiden Jurisdiktionen (EN und DE) die rufschädigungs-riskanteste Aussage-Klasse.
- **SOLLTE [SHOULD]** Korrektur-Anfragen über die heute verfügbaren impliziten Kanäle leiten — Issues im öffentlichen Source-Repository und die E-Mail auf der About-Seite —, und diese implizite Form ist der konformitäts-erfüllende Baseline-Zustand für den aktuellen Stand der Spec. Sobald die offene Frage in [`AUDIENCES.md`](../../../AUDIENCES.md) zu einem dedizierten Kontakt- / Korrektur-Kanal entschieden ist, wird diese SOLLTE-Regel zu einer MUSS-Regel hochgestuft, die den deklarierten Kanal benennen **MUSS [MUST]**; die Hochstufung wird als Spec-Revision protokolliert, nicht still editiert. Sinn der Bedingung ist, die Regel heute eindeutig erfüllbar zu halten statt unbestimmt.
- **SOLLTE [SHOULD]** eine Ein-Zeile-Attribution tragen, wenn der Post stark auf der Arbeit oder dem Rahmen eines anderen aufbaut („der Rahmen, X als Y zu sehen, kommt aus <Name>s Post unter <URL>"). Das bedient L (die zitierte Partei fühlt sich gesehen statt vereinnahmt) und A (der Leser lernt, wo er weiterlesen kann).
- **DARF [MAY]** eine konkrete Person lobend benennen; **SOLLTE NICHT [SHOULD NOT]** eine konkrete Person kritisch benennen, wenn die Kritik auf Projekt- oder Codebasis-Ebene ansetzt — das Projekt benennen, auf das öffentliche Artefakt verlinken und den genannten Maintainer den Post finden lassen, wenn er will. Projekt-Ebene-Kritik bleibt leichter fair als Personen-Ebene-Kritik.

### Multi-Audience-Schichtung

Ein einzelner Post bedient mehrere Audiences nur dann, wenn seine **Form** jede Audience die Tiefe selbst wählen lässt, die sie braucht. Die erforderlichen Schichten unten leiten sich aus NN/gs Progressive Disclosure und der Tradition „Writing for multiple audiences" in der technischen Kommunikation ab.

- **MUSS [MUST]** ein **Inverted-Pyramid-Lede** tragen (gefordert durch [`post-writing-style`](../post-writing-style/de.md)), das die Aussage des Posts in ≤ 80 Wörtern an jede Audience liefert. Das Lede ist die geteilte Oberfläche; es **DARF NICHT [MUST NOT]** verlangen, dass A, B oder C weiterlesen, um die Schlagzeile zu extrahieren.
- **MUSS [MUST]** einen **Body tragen, der die Primär-Audience in der Tiefe bedient**. Das Prosa-Register, die Code-Block-Dichte, die Terminologie-Tiefe und die Link-Dichte des Bodys sind auf `primaryAudience` abgestimmt. Quer-verwiesenes Material, das eine Sekundär-Audience interessieren würde, gehört in Escape-Hatch-Links, nicht in den Hauptfluss.
- **SOLLTE [SHOULD]** eine **Escape-Hatch-Schicht** für die wahrscheinlichste Sekundär-Audience tragen. Gängige Muster:
  - Für einen `primaryAudience: A`-Post mit Sekundär B: ein Ein-Zeile-Satz „was das für Nicht-Engineers heißt" früh im Body, und ein Link aus dem Lede heraus auf `/projects/<slug>`.
  - Für einen `primaryAudience: B`-Post mit Sekundär A: ein Abschnitt „Details und Stolpersteine" gegen Ende mit der tieferen technischen Substanz, so geschrieben, dass ein bereits ausgestiegener B-Leser nichts Wichtiges verpasst.
  - Für einen `primaryAudience: C`-Post mit Sekundär A: ein Absatz „falls du zufällig hier gelandet bist, hier ist der Kontext" nahe dem Anfang.
- **DARF [MAY]** ein **kollabierbarer Drawer** (`<details>…</details>`) verwenden, um einen langen Code-Block oder ein Seiten-Argument zu verbergen, das die Primär-Audience nicht braucht, das die Sekundär-Audience aber haben möchte. Drawer **DÜRFEN NICHT [MUST NOT]** verwendet werden, um Inhalte zu verbergen, die die Primär-Audience braucht; das ist „Hide your work" und verletzt die Spec.
- **DARF NICHT [MUST NOT]** über drei Tiefen hinaus schichten (Lede, Body, Escape-Hatch). Eine vierte Schicht („…und wenn du wirklich tief gehen willst …") signalisiert, dass der Post in zwei Posts aufgeteilt werden sollte.

### Diataxis-Positionierung

Das Diataxis-Framework partitioniert Dokumentation in Tutorial, How-to, Reference und Explanation. Blog-Posts auf dieser Site sitzen in zwei der vier Quadranten und bleiben aus den anderen beiden ausdrücklich **heraus**.

- **MUSS [MUST]** jeden Post als **Explanation**, **How-to** oder eine Mischung der beiden positionieren:
  - *Explanation* — der Post erklärt, warum etwas so ist, welcher Trade-off gewählt wurde, was der Autor gelernt hat. Passt sauber zu `primaryAudience: A` oder `primaryAudience: C`.
  - *How-to* — der Post führt durch das Lösen eines konkreten Problems mit einem arbeitenden Artefakt. Passt sauber zu `primaryAudience: A`; selten zu `primaryAudience: B`.
- **DARF NICHT [MUST NOT]** einen Post als **Tutorial** im Diataxis-Sinn strukturieren (eine Lehrreise durch ein Anfänger-Curriculum). Der Blog ist kein Kurs; Tutorial-Inhalt gehört in die Doku des Upstream-Projekts, nicht hierher. Ein Post, der ein Tutorial wäre, sollte entweder eine Explanation dessen werden, was der Autor beim Durcharbeiten des Tutorials lernte, oder ein How-to zu einer spezifischen Hürde.
- **DARF NICHT [MUST NOT]** einen Post als reine **Reference** strukturieren (eine aufgelistete, vollständige API- oder Schema-Beschreibung). Reference gehört in Quellcode-Dokumentation oder eine dedizierte Docs-Site. Ein Post, der Reference-Inhalt wäre, sollte aufgeteilt werden: das Reference-Material lebt, wo es hingehört; der Post erklärt das Warum oder geht durch einen Anwendungsfall.
Die Diataxis-Haltung ist im Lede implizit („so habe ich X zum Laufen gebracht" → How-to; „warum ich X statt Y gewählt habe" → Explanation) und **DARF [MAY]** in der umgebenden Prosa explizit benannt werden, wenn das den Post schärft; ein dediziertes Frontmatter-Feld ist absichtlich **nicht** erforderlich (siehe §Offene Fragen für die vertagte lint-freundliche Variante). Diese Anleitung ist Reviewer-Meta und keine Per-Post-prüfbare Regel — kein Akzeptanzkriterium adressiert sie.

### Konfliktauflösung zwischen Audiences

Wenn die Audiences inkompatible Dinge wollen — A will mehr Tiefe, B will Kürze, C will rohe Notizen — folgt der Post den Regeln unten in dieser Reihenfolge.

- **MUSS [MUST]** zugunsten der deklarierten `primaryAudience` auflösen. Genau der Sinn der Frontmatter-Deklaration ist, dass der Trade-off vorab gemacht wurde; der Post verhandelt ihn nicht Absatz für Absatz neu.
- **DARF NIE [MUST NOT]** **gegen** die Erwartungen von Audience L auflösen. L ist keine Primär-Audience, aber eine **unverletzliche Randbedingung**: ein Post darf für B zu dicht oder für C zu dünn sein, aber er darf **niemals** L unfair charakterisieren, um As Appetit auf scharfe Kritik zu bedienen.
- **SOLLTE [SHOULD]** Sekundär-Audience-Züge in Escape-Hatch-Links auflösen statt in Inline-Akkommodationen. Ein `primaryAudience: A`-Post, der mittendrin in einen B-freundlichen Business-Rahmen abdriftet, verliert As Vertrauen, ohne B zu bedienen; der richtige Zug ist ein einzelner B-zugeschnittener Satz oben und ein Link unten — kein Mittelabschnitt, der beide schlecht bedient.
- **DARF [MAY]** ein einzelnes zugrundeliegendes Thema in zwei Posts aufspalten, jeder mit eigener `primaryAudience`, wenn ein Post beide Audiences nicht ohne Kompromiss bedienen kann. Die beiden Posts verlinken sich quer, teilen Tags und teilen ggf. ein `portfolioProject`. Aufspalten ist die kanonische Antwort auf das wiederkehrende Gefühl „dieser Post will zwei Posts werden".

### Zweisprachige Audience-Symmetrie

- **MUSS [MUST]** `primaryAudience` zwischen EN- und DE-Datei eines Post-Paars identisch halten. Ein Post ist „für A" in beiden Sprachen oder „für C" in beiden Sprachen; das Frontmatter-Feld unterscheidet sich nicht über den `translationKey` hinweg.
- **MUSS [MUST]** `secondaryAudiences` aus demselben Grund identisch zwischen EN und DE halten.
- **MUSS [MUST]** Audience-spezifische Rahmungen idiomatisch übersetzen. Ein B-zugeschnittenes Lede, das ein Jobmarkt-Signal benennt („I shipped this between contracts"), übersetzt sich idiomatisch in eine DE-Formulierung, die dasselbe Recruiter-lesbare Signal trägt — kein Wort-für-Wort-Rendering.
- **DARF [MAY]** Referenzen lokalisieren, die zwischen EN- und DE-Audiences wirklich unterschiedlich sind (z. B. eine Rechtsvorschriften-Referenz), wenn die Lokalisierung ehrlich ist und die zugrundeliegende Aussage unverändert bleibt. Re-Übersetzung **DARF NICHT [MUST NOT]** die Substanz des Posts ändern — nur seine Oberfläche.
- **DARF NICHT [MUST NOT]** das Audience-Ziel eines Posts mittendrin in der Übersetzung umflashen, um eine unausgewogene Korpus-Verteilung „zu reparieren". Korpus-Re-Balancing geschieht auf der Ebene des nächsten Posts, nicht durch nachträgliches Umetikettieren eines bestehenden Paars.

## Akzeptanzkriterien

Ein Post erfüllt diese Spec, wenn **alle** folgenden Punkte gelten. Die Kriterien sind so geschrieben, dass ein Reviewer (der Autor, Claude oder ein zukünftiger Lint-Skill) jeden ohne Mehrdeutigkeit erledigt / nicht erledigt markieren kann.

**Enforcement-Status (offene Frage — siehe §Offene Fragen, „Frontmatter-Schema-Folge").** Die Kriterien `a-1` und `a-2` verweisen auf Frontmatter-Felder (`primaryAudience`, `secondaryAudiences`), die das Astro-Zod-Schema in `src/content.config.ts` noch nicht deklariert. Bis diese Schema-Lücke geschlossen ist, gelten `a-1` und `a-2` für Posts, die nach Erreichen von `status: accepted` dieser Spec verfasst oder aktualisiert werden, und bleiben bis dahin Autoren-seitige Konventionen, die der Build nicht erzwingt. Legacy-Posts vor diesem Übergang sind ausgenommen; Reviewer und Lint-Skills **MÜSSEN [MUST]** das Fehlen dieser Felder auf einem Legacy-Post als außerhalb des Spec-Geltungsbereichs behandeln, nicht als fehlgeschlagenes Kriterium.

- [ ] **a-1** Das Frontmatter deklariert genau eine `primaryAudience` aus `{A, B, C}`.
- [ ] **a-2** Das Frontmatter deklariert eine `secondaryAudiences`-Liste aus `{A, B, C}`, die den Primär-Wert nicht enthält.
- [ ] **a-3** Die ersten 80 Wörter des Bodys liefern die Schlagzeile des Posts in einer Form, die kein Weiterlesen erfordert.
- [ ] **a-4** Tiefe, Terminologie und Code-Block-Dichte des Bodys sind auf die deklarierte `primaryAudience` abgestimmt, nicht mittendrin auf eine Sekundär-Audience umgeschwenkt.
- [ ] **a-5** Wenn der Post eine nicht-leere `secondaryAudiences`-Liste hat, ist mindestens ein expliziter Escape-Hatch (Link, Drawer, Ein-Zeile-Akkommodation) im Post-Body vorhanden und als für diese Audience dienend erkennbar — durch benachbarte Prosa, durch den Anker-Text des Links oder durch den Summary-Text des Drawers.
- [ ] **a-6** Jede namentlich genannte Drittpartei (Audience L) ist auf einem Primärquellen-Zitat gegründet; keine private Kommunikation ist ohne ausdrückliche Einwilligung zitiert; keine Intentions-Behauptung ist ohne stützende öffentliche Aussage gesetzt.
- [ ] **a-7** Der Post passt zu Diataxis Explanation, How-to oder einer Mischung; er ist kein Tutorial im Diataxis-Sinn und keine reine Reference.
- [ ] **a-8** EN-Datei und DE-Datei tragen identische `primaryAudience` und `secondaryAudiences`.
- [ ] **a-9** Kein Post im jüngsten Fünf-Post-Fenster zielt ausschließlich auf `primaryAudience: A`; das Korpus zeigt in jedem gleitenden 10-Post-Fenster mindestens einen B-gezielten und mindestens einen C-gezielten Post (Korpus-Kriterium, im Sprint-Review geprüft, nicht pro Post).
- [ ] **a-10** Wenn Audience-Bedürfnisse im Post kollidieren, geht die Auflösung zugunsten von `primaryAudience` und nie gegen L; der Reviewer kann den konkreten Trade-off ohne Suche benennen.
- [ ] **a-11** Der Post-Body bedient die deklarierte `primaryAudience` gemäß ihrer Rubrik in der Tiefe — konkret:
  - Für `primaryAudience: A`: arbeitendes Artefakt vorhanden (Diff / Output / Config / Screenshot), Versionen benannter Werkzeuge festgeschrieben, „außerhalb des Umfangs / Nächste Schritte"-Abschnitt vorhanden, **Erfahrungsniveau früh signalisiert** („Ich hatte X vor diesem Projekt nicht angefasst" oder „ich habe X seit Jahren in Produktion" — beides ehrlich).
  - Für `primaryAudience: B`: das Lede benennt Projekt + Rolle + Aktualität in einfacher Sprache, der Body ist ohne Parsen der Code-Blöcke lesbar, ein Link auf `/projects/<slug>` oder ein Äquivalent ist vorhanden, **ein Datums-Signal über `pubDate` hinaus** ist vorhanden (ein im Fließtext genannter Monat / Jahr oder ein Tag wie „laufende Arbeit" / „in Produktion ausgeliefert").
  - Für `primaryAudience: C`: das „Warum" jeder Entscheidung ist dokumentiert, die erwogenen Alternativen sind benannt, ein Glossar oder eine Kontext-Notiz ist vorhanden, wo Wiederleser-verwirrende Terminologie erscheint.
- [ ] **a-12** Der Post schichtet nicht über drei Tiefen hinaus (Lede, Body, Escape-Hatch).
- [ ] **a-13** Kein `<details>`-Drawer im Body verbirgt Inhalt, auf den das Argument des Posts für die **Primär**-Audience angewiesen ist; Drawer tragen ausschließlich Material, das eine Sekundär-Audience interessieren könnte, nie Material, das die Primär-Audience braucht.

## Offene Fragen

- **Frontmatter-Schema-Folge.** Diese Spec setzt zwei neue Frontmatter-Felder voraus, `primaryAudience` und `secondaryAudiences`. Das Astro-Content-Collection-Schema im Repo (`src/content.config.ts`) deklariert sie noch nicht. Ihre Aufnahme ist eine nachgelagerte Aufgabe: ein Feature-Item, das das Zod-Schema aktualisiert und entscheidet, ob Legacy-Posts ohne die Felder akzeptiert werden (vermutlich ja, mit Default `primaryAudience: A`). Das bestehende R-4-Roadmap-Item ist auf AI-Disclosure-UX beschränkt und **DARF NICHT [MUST NOT]** still um diese Schema-Änderung erweitert werden; entweder wird R-4 in `project/roadmap.md` explizit erweitert, oder ein neues Geschwister-Roadmap-Item wird für die Audience-Frontmatter angelegt. Bis das geklärt ist, sind die MUSS-Regeln dieser Spec unter §Primär-Audience-Deklaration Autoren-seitige Konventionen, die der Build nicht erzwingt.
- **Per-Post-Audience-Badge-UI.** Das Audience-Signal ist derzeit intern (Frontmatter); ob es auf der gerenderten Seite sichtbar zu machen ist (z. B. ein kleines Tag „für Entwickler" / „für Portfolio-Leser" neben der Post-Header), ist eine UX-Entscheidung, die in ein zukünftiges Feature vertagt wird. Sichtbare Audience-Badges riskieren defensiv gelesen zu werden („ich weiß, dieser Post ist zu technisch für dich") — die Voreinstellung bleibt intern, bis ein realer Leser-Verwirrungs-Fall etwas anderes zeigt.
- **Korpus-Verteilungs-Gate.** Das 50/20/30-A/B/C-Ziel in §Primär-Audience-Deklaration ist eine Inferenz aus der Kritikalität in `AUDIENCES.md` plus realistischer Hobby-Blog-Kadenz. Es hat noch keine Daten-Basis. Nach den ersten 20 Posts **MUSS [MUST]** die Verteilung gegen reale Traffic- / Referrer-Daten geprüft werden; der Zielwert für A muss möglicherweise sinken, wenn der B-Traffic aus LinkedIn deutlich höher ist als erwartet.
- **Formalisierung des Korrektur-Kanals.** §Audience-L-Behandlung stützt sich auf einen impliziten Korrektur-Pfad (öffentliche Repo-Issues + E-Mail auf About-Seite). [`AUDIENCES.md`](../../../AUDIENCES.md) trägt die offene Frage, ob ein dedizierter Kanal deklariert werden soll. Sobald sie entschieden ist, **MUSS [MUST]** diese Spec aktualisiert werden, um den Kanal direkt zu benennen.
- **Audience-L-Schwelle für Einwilligung.** §Audience-L-Behandlung verlangt explizite Einwilligung für Zitate aus privater Kommunikation. Die Schwelle für nicht-private aber persönliche Charakterisierungen (z. B. der Blog-Post eines Maintainers, den der Autor kritisiert) ist „die öffentliche Form verwenden, auf die öffentliche Aussage verlinken". Ob diese Schwelle auf „die Person vor Veröffentlichung benachrichtigen" verhärtet werden muss, ist offen und hängt davon ab, wie oft L-affizierte Posts in der Praxis ausgeliefert werden.
- **Diataxis-Frontmatter-Signal.** §Diataxis-Positionierung deklariert die Haltung als im Lede implizit. Wenn Post-Linting reift, kann ein Frontmatter-Feld `diataxis: explanation | how-to | blend` nützlich werden. Vertagt, bis mindestens ein nachgelagerter Skill oder Audit die Position maschinen-lesbar braucht.

## Referenzen

Audience-Methodik und Content-Design:

- [Content design: planning, writing and managing content — GOV.UK](https://www.gov.uk/guidance/content-design)
- [Content design: writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)
- [Audience Analysis: Primary, Secondary and Hidden Audiences — Writing Commons](https://writingcommons.org/article/audience-analysis-primary-secondary-and-hidden-audiences/)
- [Audience — Howdy or Hello? Technical and Professional Communication](https://odp.library.tamu.edu/howdyorhello/chapter/audience/)
- [The Elements of Content Strategy by Erin Kissane (A Book Apart)](https://elements-of-content-strategy.abookapart.com/)

Dokumentations-Frameworks:

- [Diátaxis — diataxis.fr](https://diataxis.fr/)
- [Start here — Diátaxis in five minutes](https://diataxis.fr/start-here/)
- [Progressive Disclosure — IBM Documentation](https://www.ibm.com/docs/en/technical-content?topic=practices-progressive-disclosure)
- [Progressive Disclosure — I'd Rather Be Writing](https://idratherbewriting.com/ucd-progressive-disclosure/)

Leser-Verhalten:

- [Inverted Pyramid: Writing for Comprehension — NN/G](https://www.nngroup.com/articles/inverted-pyramid/)
- [How to Prevent F-Pattern Scanning — Mailchimp](https://mailchimp.com/resources/f-pattern-scanning/)
- [Ladders Updates Popular Recruiter Eye-Tracking Study — PR Newswire](https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html)
- [Eye tracking study shows recruiters look at resumes for 7 seconds — HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)

Schreiben für Entwickler (Audience A):

- [How to Write for a Developer Audience — Kalyna Marketing](https://kalynamarketing.com/blog/writing-for-developers)
- [Writing for Developers: 5 Best Practices — Firebrand](https://www.firebrand.marketing/deep-dives/writing-for-developers-5-best-practices/)
- [Kalzumeus — Patrick McKenzie's archive](https://www.kalzumeus.com/archive/)
- [Julia Evans — jvns.ca](https://jvns.ca/)

Knowledge-Base- / Zukunfts-Ich-Schreiben (Audience C):

- [Evergreen notes — Andy Matuschak](https://notes.andymatuschak.org/Evergreen_notes)
- [A Brief History & Ethos of the Digital Garden — Maggie Appleton](https://maggieappleton.com/garden-history)
- [The Garden of Maggie Appleton](https://maggieappleton.com/garden/)

Drittparteien-Fairness (Audience L):

- [BBC sets protocol for generative AI content — Broadcast](https://www.broadcastnow.co.uk/production-and-post/bbc-sets-protocol-for-generative-ai-content/5200816.article)
- [Key AI concepts to grasp in a new hybrid journalism era — Reuters Institute](https://reutersinstitute.politics.ox.ac.uk/key-ai-concepts-grasp-new-hybrid-journalism-era-transparency-autonomy-and-authorship)
- [Offering Criticism in Open Source Projects — Jonathan Desrosiers](https://jonathandesrosiers.com/2026/02/offering-criticism-in-open-source-projects/)

Personal-Blog-Prinzipien (Audiences B & C):

- [POSSE — IndieWeb](https://indieweb.org/POSSE)
- [Own your data — IndieWeb](https://indieweb.org/own_your_data)
- [The Promise of Stripe Press — alohomora](https://morgmah.substack.com/p/the-promise-of-stripe-press)
