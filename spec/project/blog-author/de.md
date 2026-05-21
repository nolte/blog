# Blog-Autor

Status: draft

## Kontext

Leser: der Mensch in der Rolle „Blog-Autor" dieses Repositorys (Audience D in [`AUDIENCES.md`](../../../AUDIENCES.md)), Claude Code als KI-Co-Operator, der Posts entwirft (Audience E), und jeder nachgelagerte Skill oder Agent, der diese Spec als Vertragsdokument für die Generierung oder Prüfung eines Posts konsumiert.

Dieses Repo ist ein zweisprachiger statischer Astro-Blog (siehe `CLAUDE.md`). Posts entstehen interaktiv: der Mensch briefet das Thema, Claude entwirft einen EN-Post, übersetzt ihn ins DE, der Mensch kuratiert. Was dieser Workflow heute **nicht** hat, ist eine explizite Spec für die Rolle „Blog-Autor" selbst — also für die **Eingaben**, die ein Post-Draft braucht, die **Schritte**, in denen ein Post entsteht, und die **Übergabe**, mit der ein Post den Autor verlässt und an einen nachgelagerten Korrekturlese-Layer (den **Lektor** aus [`claude-shared`](https://github.com/nolte/claude-shared) — siehe §Übergabe an den Lektor) geht. Diese Spec füllt diese Lücke.

Drei Geschwister-Specs sind schon vorhanden und werden hier referenziert, nicht dupliziert:

- [`post-writing-style`](../post-writing-style/de.md) regelt Voice, Lesbarkeit, Typografie, verbotene Wörter und KI-Disclosure-Ton — **wie** geschrieben wird.
- [`post-audience-communication`](../post-audience-communication/de.md) regelt Primär-Audience-Deklaration, Audience-Rubriken (A/B/C), Multi-Audience-Schichtung, Diataxis-Positionierung und Audience-L-Behandlung — **für wen** geschrieben wird.
- [`AUDIENCES.md`](../../../AUDIENCES.md) ist das Audience-Artefakt, das beide Geschwister-Specs (und diese Spec) als autoritative Quelle für Audience-Identifier und ihre Erwartungen lesen.

Diese Spec sitzt davor und davor. **Davor**, weil sie das Briefing definiert, ohne das ein post-writing-style-konformer Draft nicht entstehen kann. **Davor**, weil sie den Übergabepunkt zum Lektor definiert, der `post-writing-style` und `post-audience-communication` als Per-Post-Akzeptanzkriterien-Quelle konsumiert. Die Spec ist absichtlich **prozess- und vertragsorientiert** — sie sagt **welche Informationen wann wohin fließen**, nicht **welche Wörter im Body stehen**.

## Ziele

- Eine **geschlossene Liste der Briefing-Pflichteingaben** definieren, die ein Post-Draft braucht, sodass der Autor (Mensch oder ein zukünftiger `blog-author`-Skill) entweder einen vollständigen Draft erzeugt oder eine explizite, dokumentierte Briefing-Lücke ausweist — nie eine Lücke still erfindet.
- Den **Workflow vom Briefing bis zur Lektor-Übergabe** in benannten, sequenziellen Schritten festlegen, sodass eine spätere Skill-Implementierung an exakt denselben Schritten andocken kann, an denen ein Mensch andockt.
- Einen **Pre-Handoff-Selbst-Check** vorschreiben, der die Per-Post-Akzeptanzkriterien aus [`post-writing-style`](../post-writing-style/de.md) und [`post-audience-communication`](../post-audience-communication/de.md) als geschlossene Liste durchgeht, sodass der Lektor mit einem Post startet, der die Geschwister-Spec-Regeln nicht offensichtlich verletzt.
- Den **Übergabe-Vertrag zum Lektor** so formulieren, dass er **tolerant gegen das heutige Übergangsregime** (Lektor noch in Entwicklung) bleibt und gleichzeitig den Endzustand benennt, sobald der Lektor released ist.
- Die **harten DARF-NICHT-Regeln des Autors** an einer Stelle bündeln, abgeleitet aus den Hard-Rules in `CLAUDE.md` und den MUSS-Regeln der beiden Geschwister-Specs — sodass „was darf der Autor nie tun" nicht auf drei Dateien verteilt nachgelesen werden muss.
- Als **Vertragsdokument** für einen späteren `blog-author`-Skill in [`claude-shared`](https://github.com/nolte/claude-shared) dienen — die Spec ist so formuliert, dass eine Skill-Implementierung die Briefing-Inputs als Eingabe-Schema, die Workflow-Schritte als interaktive Phasen und die Akzeptanzkriterien als interne Verifikation 1:1 übernehmen kann.

## Nicht-Ziele

- **Voice, Tonalität, Lesbarkeit, Typografie und verbotene Wörter** zu definieren — das ist abschließend in [`post-writing-style`](../post-writing-style/de.md) geregelt. Diese Spec referenziert die Per-Post-Akzeptanzkriterien jener Spec im Selbst-Check, formuliert sie nicht neu.
- **Audience-Rubriken, Primär-/Sekundär-Audience-Mechanik, Diataxis-Positionierung oder Audience-L-Fairnessregeln** zu definieren — das ist abschließend in [`post-audience-communication`](../post-audience-communication/de.md) geregelt. Diese Spec verlangt die Audience-Deklaration als Briefing-Pflichteingabe und referenziert die Per-Post-Kriterien jener Spec im Selbst-Check.
- **Das Frontmatter-Schema** (Schlüssel-Set, Pflichtfelder, Typen) zu definieren — das deklariert das Astro-Content-Collection-Schema in `src/content.config.ts` plus die Erläuterungen in `CLAUDE.md`. Diese Spec setzt diese Felder voraus und verweist auf sie.
- **Die innere Mechanik des Lektors** (Operationen, Dimensionen, Severity-Klassifikation, JSON-Report-Form) zu definieren — das ist Sache der externen Spec `spec/project/lektorat/` in [`claude-shared`](https://github.com/nolte/claude-shared) (derzeit in Entwicklung, siehe §Übergabe an den Lektor und §Offene Fragen). Diese Spec definiert nur den **Übergabepunkt** aus Autoren-Sicht.
- **PR-Form, Commit-Message-Konventionen, Branching-Modell und Merge-Gates** zu definieren — das gehört in eine künftige Pull-Request-Workflow-Spec, nicht hierher. Diese Spec endet mit der Lektor-Übergabe; was danach kommt, ist anderswo geregelt.
- **Topic-Wahl, Veröffentlichungs-Kadenz und Korpus-Mix** zu definieren — das sind Roadmap- und Sprint-Fragen, geregelt durch `spec/project/roadmap/` und `spec/project/sprint/`. Diese Spec greift, sobald ein Topic gewählt **wurde**.
- **Lint- oder CI-Mechanik** zu definieren, die die Akzeptanzkriterien automatisiert prüft. Die Spec ist heute Reviewer-Urteil; die Verdrahtung in `task check` oder ein nachgelagerter Skill ist offen (siehe §Offene Fragen).

## Anforderungen

### Briefing-Inputs

Ein Post-Draft beginnt mit einem **Briefing**. Die unten gelisteten Pflichtfelder sind die geschlossene Mindestmenge; fehlt eines, **DARF NICHT [MUST NOT]** der Draft starten, bevor die Lücke entweder gefüllt oder als dokumentierte offene Frage im Briefing geführt ist (siehe Unter-Regel „Briefing-Lücken" am Ende dieser Sektion). Die Optional-Felder erweitern den Draft; ihr Fehlen blockiert ihn nicht.

#### Pflichtfelder

- **MUSS [MUST]** **Thema** als ein- bis zweisätzige These benennen, formuliert als das, was der Post **aussagen** wird — nicht als Schlagwort. „Ich beschreibe, wie der `astro:content`-Loader das Frontmatter validiert" besteht; „Astro Content Collections" fällt durch.
- **MUSS [MUST]** **mindestens ein konkret-gegründetes Artefakt** benennen, auf dem der Post aufbaut: einen Repo-Verweis (Repo-Name plus Commit-SHA oder Tag), einen Diff, eine Befehlsausgabe, einen Screenshot, ein README-Zitat oder ein explizites Operator-Briefing. Diese Pflicht setzt die Hard-Rule „Never invent technical facts about projects" aus `CLAUDE.md` an die Eingangsstelle des Workflows — ohne Artefakt darf der Draft nicht starten.
- **MUSS [MUST]** **Primär-Audience** aus `{A, B, C}` benennen, gemäß [`post-audience-communication`](../post-audience-communication/de.md) §Primär-Audience-Deklaration. L ist nie eine Primär-Audience; M ist außerhalb des Geltungsbereichs.
- **MUSS [MUST]** eine **Quellenliste** mit URLs zu Primärquellen führen, gegen die jede konkrete technische Behauptung des Posts verifiziert werden kann (README, Release-Notes, RFC, GitHub-Issue, Source-File, Operator-Briefing-Transkript). Die Liste **DARF [MAY]** im Verlauf des Drafts wachsen; sie **DARF NICHT [MUST NOT]** leer bleiben, wenn der Post **eine einzige** konkrete Aussage über ein benanntes Projekt, eine Bibliothek oder ein Werkzeug trägt.
- **MUSS [MUST]** den **`slug`** in ASCII-Kebab-Case festlegen, abgeleitet aus dem englischen Titel; der Slug ist nach Veröffentlichung stabil. Maximale Länge folgt der `CLAUDE.md`-Regel (≤ 60 Zeichen).
- **MUSS [MUST]** den **`translationKey`** festlegen, der zwischen der EN- und der DE-Datei des Post-Paars geteilt wird (siehe `CLAUDE.md`-Vertrag).

#### Optionalfelder

- **DARF [MAY]** **Sekundär-Audiences** (`secondaryAudiences`) als Liste aus `{A, B, C} \ primaryAudience` angeben. Eine leere Liste signalisiert einen absichtlich engen Post; eine nicht-leere Liste löst die Multi-Audience-Schichtungs-Anforderungen aus [`post-audience-communication`](../post-audience-communication/de.md) §Multi-Audience-Schichtung aus.
- **DARF [MAY]** den **`portfolioProject`-Slug** angeben, wenn der Post an einen Eintrag in der `projects`-Collection bindet; das aktiviert die Cross-Link-Erwartung aus [`post-audience-communication`](../post-audience-communication/de.md) §Audience-B-Adressierungs-Rubrik („Link auf `/projects/<slug>`").
- **DARF [MAY]** eine **Diataxis-Position** (`explanation`, `how-to`, `blend`) als Briefing-Hinweis angeben; das Frontmatter trägt heute **kein** entsprechendes Feld (siehe [`post-audience-communication`](../post-audience-communication/de.md) §Offene Fragen — Diataxis-Frontmatter-Signal), aber die Position prägt Lede und Body-Form und gehört deshalb ins Briefing.

#### Update- vs. Neuanlage-Felder

- **MUSS [MUST]** bei einem **Update** eines bereits veröffentlichten Posts einen **Update-Anlass** im Briefing tragen: ein bis zwei Sätze, was sich geändert hat und warum die Aktualisierung jetzt fällig ist (ein Bug in der Originalbehauptung, ein neues Release der zitierten Bibliothek, ein neues besseres Artefakt). Eine kosmetische Korrektur ohne sachliche Änderung **DARF [MAY]** den Anlass auf „Korrekturlauf nach Lektor-Befund <ID>" oder Äquivalent verkürzen.
- **MUSS [MUST]** beim Update das Frontmatter-Feld **`updatedDate`** auf das ISO-Datum der Aktualisierung setzen, gemäß `CLAUDE.md`-Frontmatter-Konvention. Das Feld **DARF NICHT [MUST NOT]** stillschweigend gesetzt werden, ohne dass der Update-Anlass im Briefing dokumentiert ist.
- **DARF NICHT [MUST NOT]** ein Update den **`slug`** oder den **`translationKey`** ändern; das wäre ein neuer Post unter einer neuen Identität, gemäß [`post-audience-communication`](../post-audience-communication/de.md) §Primär-Audience-Deklaration (Write-Once-Vertrag).

#### Audience-L-Nachweis-Feld

- **MUSS [MUST]**, wenn der geplante Post eine **namentlich genannte Drittpartei** (Audience L) charakterisiert, im Briefing eine **Nachweis-Liste** führen, die für jede Charakterisierung mindestens ein Primärquellen-Zitat trägt (URL plus die zitierte Stelle, wörtlich oder mit Commit-SHA / Revisions-Stand). Das setzt die MUSS aus [`post-audience-communication`](../post-audience-communication/de.md) §Audience-L-Behandlung an die Eingangsstelle des Workflows.
- **MUSS [MUST]** für **Zitate aus privater Kommunikation** (DMs, private E-Mails, geschlossene Issue-Threads, internes Slack) im Briefing eine **Einwilligungs-Notiz** der Quelle tragen — wenigstens als Verweis auf die Stelle, an der die Einwilligung dokumentiert ist (eigene E-Mail-Antwort, geteilter Slack-Thread). Ohne diese Notiz **DARF NICHT [MUST NOT]** das Zitat im Post landen.
- **SOLLTE [SHOULD]** den **bevorzugten Namen und die Großschreibung** der Drittpartei im Briefing festlegen (z. B. `npm` statt `NPM`, `Astro` statt `astro`), damit die Schreibweise nicht beim Draften jedes Mal neu recherchiert wird.

#### Hero- und OG-Bild

- **DARF [MAY]** im Briefing ein **Hero- / OG-Bild** vorgesehen sein, mit Pfad relativ zu `/public/` und einem **beschreibenden Alt-Text-Vorschlag**. Hero-Bilder sind heute **nicht** pflichtig.
- **MUSS [MUST]**, wenn ein Hero- / OG-Bild in den Post aufgenommen wird, der **Alt-Text** beschreiben, **was auf dem Bild zu sehen ist** — nicht die Bildunterschrift wiederholen und nicht „Hero-Bild" oder „Screenshot" lauten (analog zur Screenshot-Alt-Text-Regel aus [`post-writing-style`](../post-writing-style/de.md) §Code, Befehle und andere technische Inhalte).
- **DARF NICHT [MUST NOT]** der Post-Body ein **Hero-Bild als Ersatz** für eine Inverted-Pyramid-Eröffnung verwenden; das Bild ergänzt das Lede, ersetzt es nicht (vgl. [`post-writing-style`](../post-writing-style/de.md) §Struktur und Fluss).
- Hinweis: die übergeordnete **Hero-Bild-Politik** für das Korpus (Pflichten gegenüber Optionalität, einheitlicher Stil, Generierungs-Pipeline) ist noch nicht entschieden; siehe §Offene Fragen.

#### Briefing-Lücken

- **MUSS [MUST]** jede **Briefing-Lücke** explizit dokumentiert sein, bevor der Draft startet — entweder als „offene Frage" im Briefing-Kopf oder als Inline-Marker im späteren Post-Body, der den Lektor zwingt, die Lücke vor Veröffentlichung zu adressieren.
- **DARF NICHT [MUST NOT]** der Autor (Mensch oder Skill) eine Briefing-Lücke **stillschweigend** durch eine plausibel klingende Vermutung füllen; das ist genau der Fehlermodus, den die `CLAUDE.md`-Hard-Rule „Never invent technical facts" ausschließt.

### Workflow

Der Workflow ist eine **lineare Sequenz** mit benannten Schritten. Spätere Schritte setzen frühere voraus; Rücksprünge sind erlaubt, **DARF NICHT [MUST NOT]** aber dazu führen, dass ein späterer Schritt einen früheren still überspringt.

- **MUSS [MUST]** **Schritt 1 — Briefing entgegennehmen und klären**: das Briefing (siehe §Briefing-Inputs) wird gegen die Pflichtfelder geprüft; Lücken werden adressiert oder explizit als offene Fragen festgehalten. Ohne erfülltes Briefing endet der Workflow hier.
- **MUSS [MUST]** **Schritt 2 — EN-Draft schreiben**: der englische Post-Body wird gemäß [`post-writing-style`](../post-writing-style/de.md) und der Audience-Rubrik aus [`post-audience-communication`](../post-audience-communication/de.md) für die im Briefing benannte `primaryAudience` entworfen. Das Frontmatter wird gemäß `CLAUDE.md` ausgefüllt, einschließlich `aiGenerated: true` für KI-entworfene Posts.
- **MUSS [MUST]** **Schritt 3 — Pre-Handoff-Selbst-Check**: der Selbst-Check (siehe §Pre-Handoff-Selbst-Check) wird gegen den EN-Draft und sein Frontmatter ausgeführt; Befunde werden behoben, **bevor** Schritt 4 startet.
- **MUSS [MUST]** **Schritt 4 — DE-Übersetzung schreiben**: der deutsche Post-Body wird unter `src/content/posts/de/<slug>.md` angelegt, mit demselben Dateinamen und demselben `translationKey` wie die EN-Datei, mit identischen Werten für `primaryAudience`, `secondaryAudiences`, `pubDate`, `tags`, `portfolioProject` und `aiGenerated`. Die Übersetzung folgt §Zweisprachige Typografie aus [`post-writing-style`](../post-writing-style/de.md) und §Zweisprachige Audience-Symmetrie aus [`post-audience-communication`](../post-audience-communication/de.md).
- **MUSS [MUST]** **Schritt 5 — Pre-Handoff-Selbst-Check (zweite Hälfte)**: der Selbst-Check wird gegen den DE-Draft und die Paar-Invarianten ausgeführt (siehe §Pre-Handoff-Selbst-Check, Per-Paar-Block).
- **MUSS [MUST]** **Schritt 6 — `task build` lokal ausführen** (oder `task check` als schnellere Variante, gemäß `CLAUDE.md`). Ein Lauf, der nicht grün ist, blockiert die Übergabe an den Lektor; der Autor behebt die Bau-Fehler und wiederholt den Schritt.
- **MUSS [MUST]** **Schritt 7 — Übergabe an den Lektor**, gemäß §Übergabe an den Lektor. Der Autor stellt **keine** eigene Korrekturlese-Mechanik bereit; er liefert einen Post, dessen Eingangsbedingungen die Lektor-Stufe `audit` akzeptiert.
- **SOLLTE [SHOULD]** der Autor zwischen Schritt 2 und Schritt 3 (oder zwischen 4 und 5) den **Draft laut lesen** oder von einem TTS vorlesen lassen, gemäß [`post-writing-style`](../post-writing-style/de.md) §Edit-Durchgang. Dieses Laut-Lesen ist eine Autoren-Pflicht aus jener Spec; diese Spec wiederholt sie hier, damit sie im Workflow sichtbar bleibt.

### Pre-Handoff-Selbst-Check

Der Selbst-Check ist eine **geschlossene, durchgehbare Liste**. Jeder Punkt ist eine Per-Post-Anforderung aus einer Geschwister-Spec oder aus `CLAUDE.md`, die der Autor (Mensch oder ein zukünftiger `blog-author`-Skill) **vor** der Lektor-Übergabe für jede der beiden Sprachfassungen einmal aktiv beantwortet. Der Selbst-Check **ersetzt** den Lektor nicht; er stellt nur sicher, dass der Lektor mit einem Post startet, der die Spec-Regeln nicht offensichtlich verletzt.

#### Per-Sprachfassung (EN und DE getrennt anwenden)

- **MUSS [MUST]** alle **Per-Post-Akzeptanzkriterien** aus [`post-writing-style`](../post-writing-style/de.md) §Akzeptanzkriterien (a-1 bis a-17) durchgegangen sein und keinen unbehobenen Verstoß tragen, soweit das jeweilige Kriterium auf der geprüften Sprachfassung anwendbar ist (z. B. die Flesch-Kincaid-Anforderung a-4 ist heute auf den EN-Body beschränkt — siehe Vorläufig-Klausel jenes Kriteriums).
- **MUSS [MUST]** alle **Per-Post-Akzeptanzkriterien** aus [`post-audience-communication`](../post-audience-communication/de.md) §Akzeptanzkriterien (a-1 bis a-13) durchgegangen sein, mit der Vorbehaltsklausel jener Spec zum Enforcement-Status der Frontmatter-Felder `primaryAudience` und `secondaryAudiences` (a-1 / a-2 sind Autoren-seitige Konventionen, bis das Astro-Zod-Schema sie deklariert).
- **MUSS [MUST]** für **jede konkrete technische Aussage** über ein benanntes Projekt / eine Bibliothek / ein Werkzeug die im Briefing geführte Quellenliste **gegenchecken** — die zitierte Stelle erneut aufrufen, das zitierte README am festgehaltenen Revisions-Stand öffnen oder den zitierten Befehl erneut ausführen (vgl. [`post-writing-style`](../post-writing-style/de.md) §Edit-Durchgang).
- **MUSS [MUST]** für die **Verboten-Wort-Liste** aus [`post-writing-style`](../post-writing-style/de.md) §Verbotene Wörter und Phrasen ein gerichtetes Suche-und-Prüfe in der jeweiligen Sprachfassung durchgeführt haben; jede gefundene Stelle ist entweder ersetzt oder trägt einen dokumentierten Override gemäß jener Spec §Override-Verfahren.

#### Per-Paar (auf das EN + DE-Paar als Ganzes anwenden)

- **MUSS [MUST]** der **`translationKey`** in beiden Dateien **identisch** sein, und der Dateiname-Slug ist in `en/<slug>.md` und `de/<slug>.md` identisch (gemäß `CLAUDE.md`-Slug-Regel).
- **MUSS [MUST]** das Frontmatter-Feld **`primaryAudience`** in beiden Dateien identisch sein; **`secondaryAudiences`** ebenfalls identisch (gemäß [`post-audience-communication`](../post-audience-communication/de.md) §Zweisprachige Audience-Symmetrie).
- **MUSS [MUST]** das Flag **`aiGenerated: true`** in beiden Dateien gesetzt sein, solange der Post KI-entworfen ist (gemäß `CLAUDE.md`-Hard-Rule und [`post-writing-style`](../post-writing-style/de.md) §KI-Disclosure-Ton).
- **MUSS [MUST]** **`task build`** (oder `task check`) lokal gegen den Arbeitsbaum, der beide Dateien enthält, **grün** durchlaufen sein.
- **SOLLTE [SHOULD]** der Autor das EN ↔ DE-Paar einmal im Sprachschalter der lokalen `task dev`-Instanz wechseln, damit ein `translationKey`-Mismatch oder ein stiller Paar-Bruch sichtbar wird (gemäß [`post-writing-style`](../post-writing-style/de.md) §Edit-Durchgang).

### Liefervertrag

Diese Sektion benennt die Artefakte, die **zusätzlich** zum Post-Paar selbst zu liefern sind, damit der Lektor und ein etwaiger nachgelagerter Skill die in §Pre-Handoff-Selbst-Check und §Übergabe an den Lektor formulierten Bedingungen **nachprüfbar** vorfinden — nicht nur attestiert „der Autor hat es geprüft".

Die Pflichtigkeit ist **rollen-bedingt**:

- für den **menschlichen Autor** sind die Artefakte unten **SOLLTE [SHOULD]**, weil ein Mensch die Belege im Kopf zusammenführt und den Selbst-Check kohärent durchgeht;
- für einen **agentischen Autor** (z. B. einen zukünftigen `blog-author`-Skill / -Agent in `claude-shared`) sind sie **MUSS [MUST]**, weil ein Agent ohne explizite Output-Belege nicht von einem nicht-prüfenden Agent zu unterscheiden ist.

Die heute gültige Form aller drei Artefakte ist Markdown-Prosa (handgeschrieben) oder eine schlichte Liste in Commit-Body / PR-Beschreibung. Eine maschinen-lesbare Form (YAML / JSON, mit Schema) ist als Folge-Schritt aufgeschoben (siehe §Offene Fragen — „Briefing und Liefervertrag als YAML-Schema").

#### Selbst-Check-Manifest

- **MUSS [MUST]** (für agentische Autoren; **SOLLTE [SHOULD]** für menschliche Autoren) für jede in §Pre-Handoff-Selbst-Check referenzierte Per-Post-Akzeptanzkriterium-ID aus den Geschwister-Specs eine Status-Zeile liefern, mit einem von genau drei Werten:
  - `passed` — das Kriterium ist eingehalten;
  - `finding: <kurze Begründung>` — das Kriterium ist verletzt, der Befund ist beschrieben;
  - `override: <Verweis auf §Override-Verfahren in post-writing-style oder analoge Begründung>` — der Verstoß ist dokumentiert akzeptiert.
- **MUSS [MUST]** (für agentische Autoren) das Manifest die Per-Sprachfassung- und die Per-Paar-Blöcke aus §Pre-Handoff-Selbst-Check getrennt führen, sodass `task build`-Status, `translationKey`-Identität und Audience-Feld-Identität als eigene Zeilen sichtbar sind.
- **DARF [MAY]** das Manifest in Commit-Body / PR-Beschreibung leben (Markdown-Liste reicht) oder in einer separaten Datei neben dem Post-Paar (z. B. `<slug>.selfcheck.md`); der Pfad ist nicht vorgeschrieben, die **Erreichbarkeit zusammen mit dem Post-Paar im Merge-Commit** ist es.

#### Quellen-zu-Aussage-Mapping

- **MUSS [MUST]** (für agentische Autoren; **SOLLTE [SHOULD]** für menschliche Autoren) jedes Element der Briefing-Quellenliste auf konkrete Post-Stellen abbilden, die die Quelle stützt — minimal in der Form „Quelle <n> stützt Post-Absatz <Anker oder Heading + Satznummer>". Mehrfach-Stützung ist erlaubt; eine ungenutzte Quelle ist ein Befund, kein Verstoß.
- **MUSS [MUST]** (für agentische Autoren) jede **konkrete technische Aussage** über ein benanntes Projekt / eine Bibliothek / ein Werkzeug auf mindestens eine Quelle zeigen; sonst trägt sie einen `finding`-Eintrag im Selbst-Check-Manifest (Verstoß gegen §Verbotene Praktiken des Autors — „Behauptungen ohne Quelle").
- **DARF [MAY]** das Mapping in das Selbst-Check-Manifest integriert werden oder als zweite Liste daneben liegen; getrennte Pflege ist möglich, getrennte Lesbarkeit ist Pflicht.

#### Übergabe-Manifest

- **MUSS [MUST]** (für agentische Autoren; **SOLLTE [SHOULD]** für menschliche Autoren) eine kurze, ein- bis dreizeilige Notiz die folgenden Felder explizit benennen:
  - das **gewählte Übergangs-Regime** gemäß §Übergabe an den Lektor (heute: `prose-vale-curator`, Selbst-Urteil, oder eine Kombination — Zielzustand: Lauf von `lektorat-apply`);
  - den **`task build`-Status** mit dem verwendeten Befehl (`task build` oder `task check`) und dem Ergebnis (`green`);
  - den **Repository-Stand**, gegen den der Selbst-Check lief (Branch-Name plus optional Commit-SHA), damit der Lektor weiß, gegen welchen Zustand er prüft.
- **MUSS [MUST]** das Übergabe-Manifest **mit dem Post-Paar zusammen sichtbar sein** — im Commit-Body, im PR-Body oder als referenzierte Datei. Eine still vorgenommene Übergabe ohne Manifest ist ein Verstoß gegen §Übergabe an den Lektor (Eingangsbedingungen).
- **DARF NICHT [MUST NOT]** das Manifest behaupten, eine Vorgehensweise erfüllt zu haben, die nicht tatsächlich ausgeführt wurde; eine falsche Attestierung ist ein schwererer Verstoß als ein offener `finding`-Eintrag.

### Übergabe an den Lektor

Der **Lektor** ist die nachgelagerte Korrekturlese-Stufe, geregelt durch die externe Spec `spec/project/lektorat/` in [`claude-shared`](https://github.com/nolte/claude-shared). Aus Autoren-Sicht ist der Lektor eine Black Box mit einer Eingangsstufe `audit`; was im Inneren passiert (fünf Dimensionen, Severity-Klassifikation, JSON-Report-Form), ist nicht Gegenstand dieser Spec. Die Übergabe ist ein **Vertragspunkt**: der Autor liefert einen Post, der die Eingangsbedingungen erfüllt, und übergibt die redaktionelle Letzt-Verantwortung an den Lektor.

#### Eingangsbedingungen für die Lektor-Stufe `audit`

- **MUSS [MUST]** das **EN + DE-Post-Paar** vollständig auf Platte vorliegen, beide Dateien mit gültigem Frontmatter, identischem `translationKey`, identischem Slug und identischen Audience-Feldern (siehe §Pre-Handoff-Selbst-Check, Per-Paar).
- **MUSS [MUST]** **`task build`** grün durchgelaufen sein; der Lektor ist kein Build-Reparatur-Werkzeug, und ein Post, der nicht baut, ist nicht übergabe-tauglich.
- **MUSS [MUST]** **`aiGenerated: true`** auf KI-entworfenen Posts gesetzt sein; der Lektor stützt seine Behandlung des Posts auf dieses Flag (vgl. [`post-writing-style`](../post-writing-style/de.md) §KI-Disclosure-Ton).
- **MUSS [MUST]** der **Selbst-Check** (siehe §Pre-Handoff-Selbst-Check) absolviert sein; offene Befunde des Selbst-Checks sind **vor** der Übergabe behoben, nicht **mit** der Übergabe.

#### Aufgaben-Grenze

- **DARF NICHT [MUST NOT]** diese Spec verlangen, dass der Blog-Autor die **innere Mechanik des Lektors** kennt oder reproduziert (Metriken, Schwellenwerte, Dimensions-IDs). Der Autor liefert einen Post; der Lektor liefert Befunde. Die Spec definiert den Übergabe-Punkt, nicht die Lektor-Operation.
- **DARF NICHT [MUST NOT]** der Autor versuchen, **Lektor-Befunde im Voraus zu antizipieren** und dadurch die Spec-Regeln aus den Geschwister-Specs anders auszulegen, als sie geschrieben sind. Der Selbst-Check bedient die geschriebenen Regeln; alles darüber hinaus ist Lektor-Job.

#### Übergangsregime (heute, bis die Lektor-Spec released ist)

- **MUSS [MUST]** der Autor heute mindestens **eine** der folgenden Übergangs-Korrekturlese-Optionen anwenden, bis `lektorat-apply` aus [`claude-shared`](https://github.com/nolte/claude-shared) verfügbar ist:
  - **a)** den `prose-vale-curator`-Agent aus `claude-shared` über die **englische** Sprachfassung laufen lassen (deckt EN-Vale-Mechanik ab; keine DE-Pipeline);
  - **b)** ein dokumentiertes **Reviewer-Urteil** des menschlichen Autors gegen den Selbst-Check (siehe §Pre-Handoff-Selbst-Check), explizit als „Übergangs-Selbst-Lektorat" notiert.
- **MUSS [MUST]** das gewählte Übergangs-Regime im Commit-Body oder in der Pull-Request-Beschreibung benannt sein, damit der Wechsel auf `lektorat-apply` (sobald released) als Spec-Update klar nachvollziehbar wird.
- **DARF NICHT [MUST NOT]** das Übergangsregime als dauerhafter Endzustand interpretiert werden; das Übergangs-Regime ist explizit zeitlich begrenzt und wird durch `lektorat-apply` ersetzt, sobald jener Skill in `claude-shared` als released markiert ist.

#### Zielzustand (sobald `lektorat-apply` released ist)

- **MUSS [MUST]** der Autor nach Schritt 7 die Operation `audit` aus `lektorat-apply` über das EN + DE-Post-Paar laufen lassen.
- **MUSS [MUST]** alle Lektor-Befunde der Severity **`critical`** vor Merge des Post-Paars aufgelöst sein (entweder durch `patch`-Operationen, durch Autoren-Edits oder durch eine im Befund eingebaute „skip-and-record"-Verwerfung mit dokumentierter Begründung).
- **SOLLTE [SHOULD]** der Autor Befunde der Severity **`warning`** adressieren, mit dem Recht zur dokumentierten Verwerfung in Einzelfällen. Befunde der Severity **`suggestion`** sind optional.
- Diese Regeln verlangen, dass die externe `lektorat`-Spec ihren `status` von `draft` auf `accepted` (oder den dort verwendeten Release-Marker) angehoben hat; bis dahin greift das oben definierte Übergangsregime.

### Verbotene Praktiken des Autors

Die folgenden Regeln sind harte **DARF-NICHT-Pflichten** des Autors, gebündelt aus den Hard-Rules in `CLAUDE.md` und aus MUSS-Regeln der beiden Geschwister-Specs. Sie sind hier zu einer Stelle gebracht, damit „was darf der Autor nie tun" nicht über drei Dateien verteilt nachgelesen werden muss; die Geschwister-Specs bleiben die autoritativen Quellen.

- **DARF NICHT [MUST NOT]** eine **konkrete technische Aussage** über ein benanntes Projekt, eine Bibliothek oder ein Werkzeug **ohne Primärquelle** in der Briefing-Quellenliste setzen (Hard-Rule aus `CLAUDE.md`; gespiegelt in [`post-writing-style`](../post-writing-style/de.md) §KI-Disclosure-Ton).
- **DARF NICHT [MUST NOT]** das Frontmatter-Flag **`aiGenerated: true`** auf einem KI-entworfenen Post entfernen oder auf `false` setzen (Hard-Rule aus `CLAUDE.md`).
- **DARF NICHT [MUST NOT]** einen Post als **DE-only** oder **EN-only** veröffentlichen; das Paar ist Pflicht (`CLAUDE.md`-Hard-Rule; gespiegelt in §Briefing-Inputs und §Workflow).
- **DARF NICHT [MUST NOT]** den **`primaryAudience`-Wert** nach Veröffentlichung rotieren, um einen schlecht laufenden Post umzuwidmen ([`post-audience-communication`](../post-audience-communication/de.md) §Primär-Audience-Deklaration — Write-Once-Vertrag).
- **DARF NICHT [MUST NOT]** **private Kommunikation** ohne ausdrückliche, im Briefing-Audience-L-Nachweis-Feld dokumentierte Einwilligung der Quelle zitieren ([`post-audience-communication`](../post-audience-communication/de.md) §Audience-L-Behandlung; gespiegelt in §Briefing-Inputs).
- **DARF NICHT [MUST NOT]** ein Wort aus der **geschlossenen Verboten-Liste** in [`post-writing-style`](../post-writing-style/de.md) §Verbotene Wörter und Phrasen ohne dokumentierten Override in der umgebenden Prosa verwenden.
- **DARF NICHT [MUST NOT]** den **`translationKey`** zwischen EN- und DE-Datei desselben Post-Paars unterscheiden lassen, oder den Slug zwischen den beiden Sprachen abweichen lassen (`CLAUDE.md`-Slug-Regel; gespiegelt in §Pre-Handoff-Selbst-Check).

## Akzeptanzkriterien

Ein Post-Draft erfüllt diese Spec, wenn **alle** Per-Post-Kriterien unten gelten. Jedes Kriterium ist so geschrieben, dass ein Reviewer (der Autor, ein zukünftiger `blog-author`-Skill oder der Lektor selbst) es ohne Mehrdeutigkeit erledigt / nicht erledigt markieren kann.

- [ ] **a-1** Das Briefing trägt **alle Pflichtfelder** aus §Briefing-Inputs (Thema, mindestens ein gegründetes Artefakt, Primär-Audience, Quellenliste, Slug, `translationKey`); fehlende Werte sind als explizite offene Frage im Briefing notiert.
- [ ] **a-2** Wenn der Post genannte Dritte (Audience L) charakterisiert, trägt das Briefing für jede Charakterisierung ein **Primärquellen-Zitat** in der Nachweis-Liste und für jedes Zitat aus privater Kommunikation eine **Einwilligungs-Notiz**.
- [ ] **a-3** Der **EN-Draft entstand vor dem DE-Draft** (Schritt 2 vor Schritt 4); der Workflow-Schritt-Reihenfolge ist eingehalten.
- [ ] **a-4** Der **Pre-Handoff-Selbst-Check** (§Pre-Handoff-Selbst-Check) ist für **beide** Sprachfassungen einzeln plus für das Paar als Ganzes durchgeführt; kein unbehobener Befund verbleibt vor der Lektor-Übergabe.
- [ ] **a-5** **`task build`** (oder `task check`) ist lokal grün auf dem Arbeitsbaum, der beide Dateien enthält.
- [ ] **a-6** Das EN + DE-Paar teilt einen identischen `translationKey` und einen identischen Datei-Slug; `primaryAudience`, `secondaryAudiences`, `pubDate`, `tags`, `portfolioProject` und `aiGenerated` sind zwischen den beiden Dateien identisch.
- [ ] **a-7** Bei einem **Update** eines bereits veröffentlichten Posts ist `updatedDate` gesetzt **und** der Update-Anlass ist im Briefing dokumentiert; `slug` und `translationKey` sind unverändert.
- [ ] **a-8** Wenn der Post ein **Hero- / OG-Bild** trägt, ist der Alt-Text beschreibend (was auf dem Bild zu sehen ist) und wiederholt nicht den Bildtitel; das Bild ersetzt nicht das Lede.
- [ ] **a-9** Die Übergabe an den Lektor erfolgt erst nach Erfüllung der **Eingangsbedingungen für die Stufe `audit`** (§Übergabe an den Lektor); das gewählte Übergangs-Regime (heute) oder der Lauf von `lektorat-apply` (Zielzustand) ist im Commit-Body oder in der Pull-Request-Beschreibung benannt.
- [ ] **a-10** Keine der **harten DARF-NICHT-Regeln** aus §Verbotene Praktiken des Autors ist verletzt; insbesondere ist `aiGenerated: true` gesetzt, ist keine private Kommunikation ohne Einwilligung zitiert, ist kein Wort aus der Verboten-Liste ohne Override verwendet und ist der `primaryAudience`-Wert nicht nach Veröffentlichung rotiert.
- [ ] **a-11** Bei einem **agentischen Autor**: Selbst-Check-Manifest, Quellen-zu-Aussage-Mapping und Übergabe-Manifest sind gemäß §Liefervertrag mit dem Post-Paar im Merge-Commit erreichbar; bei einem **menschlichen Autor** ist mindestens das Übergabe-Manifest sichtbar (Übergangs-Regime, `task build`-Status, Repository-Stand).

## Offene Fragen

- **Operationalisierungs-Skill `blog-author`.** Diese Spec ist als Vertragsdokument für einen späteren `blog-author`-Skill in [`claude-shared`](https://github.com/nolte/claude-shared) angelegt. Der Skill würde die §Briefing-Inputs als Eingabe-Schema übernehmen, die §Workflow-Schritte als interaktive Phasen orchestrieren und den §Pre-Handoff-Selbst-Check als interne Verifikation implementieren. Solange der Skill nicht existiert, ist der Workflow ein Mensch-plus-Claude-Code-Workflow gemäß `CLAUDE.md`. Sobald ein erstes Implementierungs-Item für `blog-author` auf der `claude-shared`-Roadmap landet, **SOLLTE [SHOULD]** diese Spec referenziert werden.
- **Verdrahtung des Lektor-Übergabe-Vertrags.** §Übergabe an den Lektor adressiert zwei Zustände: das heutige Übergangsregime (Selbst-Lektorat plus optional `prose-vale-curator`) und den Zielzustand (Lauf von `lektorat-apply`). Der **Wechsel** zwischen den beiden Zuständen — wer markiert wann den Übergang als vollzogen, ob ein Repo-lokales Flag erforderlich ist, ob ein Spec-Edit den Übergang vollzieht — ist nicht definiert. Vermutlich genügt es, in dieser Spec einen `Status:`-Versionswechsel zu führen, sobald `lektorat-apply` in `claude-shared` released ist; das ist aufgeschoben, bis die `lektorat`-Spec ihren eigenen `status` aus `draft` hebt.
- **Hero-Bild-Politik des Korpus.** §Hero- und OG-Bild lässt Hero-Bilder optional und regelt nur den Alt-Text, wenn eines vorhanden ist. Die übergeordnete Politik (sollen alle Posts ein Hero-Bild haben, gibt es einen Korpus-Stil, soll die Generierung über einen wiederholbaren Pipeline-Schritt laufen) ist nicht entschieden und gehört vermutlich in eine eigene Folge-Spec oder in ein Roadmap-Item. Der Autor des Repos hat in seinem Auto-Memory notiert, dass Hero-Bilder perspektivisch gewünscht sind — bis eine eigene Spec greift, bleibt die Regel hier minimal.
- **Selbst-Check als CI-Gate.** §Pre-Handoff-Selbst-Check ist heute Autoren-Pflicht und Reviewer-Urteil; eine maschinelle Verdrahtung in `task check` oder in einem nachgelagerten Skill, die die Per-Post-Akzeptanzkriterien aus den Geschwister-Specs prüft, ist offen. Eine Teil-Verdrahtung über Vale (für EN-Mechanik) ist über die heute schon empfohlene Übergangs-Option `prose-vale-curator` möglich; eine vollständige Verdrahtung wartet auf den späteren `blog-author`- und / oder `lektorat-apply`-Skill.
- **Briefing und Liefervertrag als YAML-Schema.** §Briefing-Inputs und §Liefervertrag sind heute Prosa mit Pflichtfeld- bzw. Pflicht-Artefakt-Listen. Eine maschinen-lesbare Form für beide Seiten — `project/briefings/<slug>.yml` mit Schema-Validierung als **Eingang**, `project/handovers/<slug>.yml` (oder ein eingebettetes Frontmatter-Sub-Objekt) als **Ausgang** — wäre für einen späteren `blog-author`-Skill bequemer als Prosa und macht den Liefervertrag automatisch prüfbar statt nur attestierbar. Vertagt, bis der Skill in der Planung ist; bis dahin ist die Prosa-Form auf beiden Seiten ausreichend. Wenn die maschinen-lesbare Form eingeführt wird, sind die drei in §Liefervertrag genannten Artefakte (Selbst-Check-Manifest, Quellen-zu-Aussage-Mapping, Übergabe-Manifest) die natürlichen Top-Level-Schemata.
- **Update-vs-Neuanlage-Schwelle.** §Briefing-Inputs unterscheidet zwischen Update (Anlass + `updatedDate`) und Neuanlage (neuer Slug). Die **Schwelle** dazwischen — wie groß muss eine sachliche Änderung sein, um statt eines Updates einen neuen Post zu rechtfertigen — ist Autoren-Urteil und nicht durch ein hartes Kriterium geregelt. Vertagt, bis der erste konkrete Streitfall vorliegt.

## Referenzen

Vorgeschaltete Spec-Quellen (im selben Repo):

- [`post-writing-style/de.md`](../post-writing-style/de.md) — Voice, Lesbarkeit, Typografie, verbotene Wörter, KI-Disclosure-Ton.
- [`post-audience-communication/de.md`](../post-audience-communication/de.md) — Primär-Audience-Deklaration, Audience-Rubriken A/B/C, Multi-Audience-Schichtung, Diataxis, Audience L.
- [`audience-identification/de.md`](../audience-identification/de.md) — Methodik, die das Audience-Artefakt erzeugt.
- [`AUDIENCES.md`](../../../AUDIENCES.md) — Audience-Artefakt für dieses Repo.
- [`CLAUDE.md`](../../../CLAUDE.md) — projektweite Hard-Rules, Post-Anatomie, Slug-Konvention, `task`-Workflow.

Nachgelagerter Lektor (externes Repo):

- [`claude-shared`](https://github.com/nolte/claude-shared) — Plugin-Korpus, in dem die `lektorat`-Spec entsteht und in dem der `prose-vale-curator`-Agent heute lebt. Die `lektorat`-Spec wird derzeit in einem Worktree dieses Repos entwickelt; sobald sie released ist, ist sie die autoritative Quelle für die Lektor-Mechanik, auf die §Übergabe an den Lektor verweist.

Hintergrund zum Workflow-Stil dieser Spec:

- [Diátaxis — diataxis.fr](https://diataxis.fr/) — die in [`post-audience-communication`](../post-audience-communication/de.md) §Diataxis-Positionierung konsumierte Quadranten-Theorie; relevant hier, weil die Diataxis-Position ein optionales Briefing-Feld ist.
- [Inverted Pyramid — Nielsen Norman Group](https://www.nngroup.com/articles/inverted-pyramid/) — die in beiden Geschwister-Specs verlangte Lede-Form; relevant hier, weil der Hero-Image-DARF-NICHT verhindert, dass das Bild die Inverted-Pyramid-Eröffnung ersetzt.
- [Content design: writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) — Inspiration für die Trennung „Eingaben — Prozess — Übergabepunkt", die diese Spec strukturell adoptiert.
