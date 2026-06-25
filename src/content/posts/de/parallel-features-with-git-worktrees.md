---
title: "Zwei Features, ein Checkout und das Chaos dazwischen"
description: "Wer für parallele Features einfach den Branch im Checkout wechselt, zerstört still und leise seinen Arbeitsbaum. Git-Worktrees geben jedem Feature eine eigene Arbeitskopie — hier ist die Gefahr, die sie beseitigen, und die Konventionen, die sie sicher halten."
pubDate: 2026-06-25
lang: de
translationKey: parallel-features-with-git-worktrees
tags: ["git", "worktrees", "claude-code", "workflow", "developer-tools"]
draft: false
portfolioProject: claude-shared
aiGenerated: true
primaryAudience: A
secondaryAudiences: [C]
---

Diese Situation trifft mich fast jede Woche. Auf `feat/mermaid-diagrams` läuft ein langer Build. Während der vor sich hin rechnet, will ich einen völlig unabhängigen Spec-Entwurf auf `feat/parallel-working-copies` anfangen.

Ein Repository, ein Checkout, zwei Features, die nichts miteinander zu tun haben. Also tue ich das Naheliegende: `git switch feat/parallel-working-copies` und lostippen.

Genau dieses Naheliegende ist der Fehler. In diesem Post geht es darum, warum — und um das Git-Feature, das den Fehler überflüssig macht.

## Die Gefahr sind nicht die Merge-Konflikte

Wenn man vor der parallelen Entwicklung zweier Features warnt, meint man meist Merge-Konflikte. Aber Merge-Konflikte kann Git gut — das ist eine Sache von `git merge` oder `git rebase` und löst sich gleich auf, egal ob die Arbeit nebeneinander lief oder nicht. Der eigentliche Schaden entsteht früher, und er entsteht lautlos.

Ein einzelner Checkout hält zu jedem Zeitpunkt genau einen Branch. In dem Moment, in dem ich im Checkout den Branch wechsle, ist der Arbeitsbaum des Branches, den ich gerade verlassen habe, weg — nicht aus der History, aber von meiner Platte. Konkret:

- **Uncommittete Änderungen kollidieren.** Alles, was ich auf dem pausierten Branch noch nicht committet hatte, blockiert entweder den Wechsel oder landet auf einem Stash-Stapel, den ich später auf den *richtigen* Branch zurückspielen muss. Spielst du ihn auf den falschen, hast du die halbfertige Änderung von Feature B über den Commit von Feature A geschmiert.
- **Build-Ausgaben werden ungültig.** Die Artefakte auf der Platte gehören jetzt zu einem anderen Branch. Der nächste Build ist ein Kaltstart, und jedes inkrementelle Werkzeug wirft seinen Cache weg.
- **IDE-Indizes laufen heiß.** Language-Server indizieren neu, Watcher scannen erneut, und alles, was den aktuellen Zustand gecacht hatte, muss ihn neu aufbauen.
- **Werkzeuge, die das Arbeitsverzeichnis festgehalten haben, starten neu.** Das ist die Stelle, die mich bei KI-Assistenten (künstliche Intelligenz) am härtesten trifft: Eine Claude-Code-Session, die Kontext über die Dateien vor sich aufgebaut hatte, zeigt jetzt auf einen anderen Baum und muss von vorn anfangen.

Nichts davon erscheint als Fehler. Es erscheint als Reibung, als vergessener Stash, als zwanzig Minuten „warum baut das gerade neu“, als Commit, der still und leise eine Zeile mitträgt, die nicht dorthin gehört. Der Preis paralleler Features in einem Checkout ist nicht der Konflikt am Ende — es ist die langsame Korruption des Zustands auf dem Weg dahin.

## Was ein Worktree wirklich ist

`git worktree` löst die Annahme auf, dass ein Repository gleich einem Arbeitsbaum ist. Es legt einen zweiten Arbeitsbaum an, der dieselbe `.git`-Objektdatenbank teilt, aber einen eigenen Index, eigene Arbeitsdateien und ein eigenes `HEAD` hat.

```bash
git fetch origin develop
git worktree add -b feat/parallel-working-copies \
  ~/repos/.worktrees/blog/parallel-working-copies origin/develop
```

Das ist kein Clone. Es gibt einen Objektspeicher, also keine duplizierte History und keine zusätzlichen Remotes, die synchron gehalten werden müssen. Aber die beiden Branches liegen jetzt in zwei Verzeichnissen, die nie die Dateien des anderen anfassen. Der Build auf `feat/mermaid-diagrams` behält seine Artefakte; der Spec-Entwurf bekommt einen sauberen Baum; jede Claude-Code-Session bleibt an ihr eigenes Verzeichnis gebunden. Die Kollision, die ich oben beschrieben habe, kann schlicht nicht passieren, weil es nichts gibt, womit sie kollidieren könnte.

## Die Konventionen, die es vor Drift bewahren

Ein achtlos genutzter Worktree entwickelt eigene Fehlermodi, deshalb leben die Regeln über meine Repositories hinweg in einer Spec — [`spec/project/parallel-working-copies/`](https://github.com/nolte/claude-shared/blob/develop/spec/project/parallel-working-copies/de.md) im Plugin [`claude-shared`](https://github.com/nolte/claude-shared). Ein paar der tragenden:

- **Der primäre Checkout bleibt immer auf `develop`.** Dort werden keine Features gebaut — er ist die Startrampe, von der jeder Feature-Worktree abzweigt, und der stabile Ort für Integrationsarbeit wie Rebases und Release-Inspektion. Selbst wenn nur ein Feature in Arbeit ist, bekommt es seinen eigenen Worktree. Ein einziger Wechsel im Checkout zerstört die Startrampen-Rolle.
- **Worktrees liegen außerhalb des primären Checkouts.** Sie wandern unter eine konfigurierbare Wurzel (`${NOLTE_WORKTREE_ROOT:-~/repos/.worktrees}/<repo>/<slug>/` — eine optionale Shell-Variable, die auf `~/repos/.worktrees` zurückfällt, wenn sie nicht gesetzt ist), nie verschachtelt im Repo — und ausdrücklich nie in `.claude/`, das die Plugin-Werkzeuge komplett neu schreiben können. Einen verschachtelten Worktree hinter einem `.gitignore`-Eintrag zu verstecken, ist ebenfalls verboten: Drift, die du in `git status` nicht siehst, ist Drift, die sich anhäuft.
- **Ein Branch pro Worktree — und einen Branch bewegst du nur aus dem Worktree heraus, dem er gehört.** Einen Branch von woanders mit `git branch -f` umzuhängen, zieht die Ref unter ihrem Arbeitsbaum weg — der dann die neuen Dateien als uncommittete „Änderungen“ anzeigt, die er nie gemacht hat. Die Lösung ist, Merge oder Rebase aus dem Worktree heraus zu fahren: `git -C <worktree> merge origin/develop`.
- **Ein Plan landet auf der Platte, bevor die Arbeit es tut.** Jeder Worktree bekommt eine `.resume/<slug>/plan.md` — Ziel, aktueller Stand, die tragende Entscheidung, die geordneten Schritte — geschrieben, bevor die substanzielle Arbeit beginnt. Sie steht in `.gitignore`, konkurriert also nie mit dem echten Diff um die Review-Aufmerksamkeit, bedeutet aber, dass eine abgestürzte oder unterbrochene Session von einem bekannten Punkt aus wieder geöffnet werden kann, statt aus einer halbfertigen Änderung rekonstruiert zu werden.

Eine dieser Regeln bleibt nicht der Disziplin überlassen. Ein Pre-Commit-Hook, `guard-primary-checkout`, blockiert jeden Commit im primären Checkout, solange dieser nicht auf `develop` steht, und bleibt in verlinkten Worktrees untätig. Der Rest der Spec ist dokumentarisch — durch Praxis durchgesetzt —, aber der häufigste Ausrutscher, Feature-Arbeit direkt in den primären Checkout zu committen, wird mechanisch abgefangen.

## Den Start automatisieren

Das alles jedes Mal von Hand aufzusetzen, würde garantieren, dass ich Abkürzungen nehme. Deshalb ist der Erstellungsweg ein einziges Kommando, `task worktree:add -- <branch> [slug]`, das die Wurzel auflöst, von `origin/develop` abzweigt, den primären Checkout unangetastet lässt und den `.resume/<slug>/plan.md`-Stub anlegt.

Darüber sitzt ein Claude-Code-Skill, `working-copy-start`. Ich sage ihm, dass ich `feat/whatever` anfangen will, und es legt den Worktree an, führt mich durch das Befüllen des Plan-Stubs und übergibt dann, sodass die eigentliche Arbeit in einer frischen Top-Level-Session passiert, die aus dem Worktree gestartet wird — was wichtig ist, weil nur das Transkript einer Top-Level-Session eigenständig mit `claude --resume` wieder aufgenommen werden kann. Das Skill hält bewusst bei der Übergabe an: Es bereitet die Bühne, es macht nicht die Feature-Arbeit.

## Reintegrieren und aufräumen

Das Ende eines Worktree-Lebens ist unspektakulär, und genau das ist der Punkt. Der Branch wird gepusht und der PR geöffnet, genau wie aus einem primären Checkout — daran ist nichts worktree-spezifisch. Zwei Dinge sind aber erwähnenswert:

- **Das Quality-Gate läuft im Worktree.** Ein grünes Gate in einem anderen Worktree ist kein Beleg für dieses hier; jeder hat seinen eigenen Arbeitsbaum, also beweist sich jeder selbst.
- **Die PR-Mechanik sind eigene Skills.** `pull-request-create` formt aus dem Branch einen konformen PR; `pull-request-merge` fährt das Pre-Merge-Review, vergibt Labels und stößt den Squash-Merge auf `develop` an. Der Worktree ist nur der Ort, an dem der Branch zufällig lag.

Beim Aufräumen zählt eine Regel mehr als der Rest: niemals einen Worktree mit `rm -rf` löschen. Das Verzeichnis zu löschen lässt Gits Buchführung zurück, und der Worktree bleibt für immer als „missing“-Eintrag hängen. Räum ihn ordentlich ab:

```bash
git worktree remove ~/repos/.worktrees/blog/parallel-working-copies
git branch -d feat/parallel-working-copies   # -D, wenn er squash-gemergt wurde
git worktree prune                            # alte Verwaltungseinträge einsammeln
```

Der primäre Checkout ist der eine Worktree, den du nie entfernst — er ist die Wurzel, an die die anderen verlinkt sind, keine wegwerfbare Kopie.

## Die Gestalt der Sache

Parallele Feature-Arbeit bedeutete früher einen vorsichtigen Tanz aus Stashes und die leise Sorge, den falschen zurückzuspielen. Worktrees machen daraus etwas Langweiliges: Jedes Feature hat ein Verzeichnis, die Verzeichnisse sehen einander nicht, der primäre Checkout sitzt auf `develop` und wartet. Die Spec und das Skill `working-copy-start` gibt es, damit die langweilige Variante zugleich die einfache ist — damit der Weg des geringsten Widerstands der ist, der den Zustand unterwegs nicht korrumpiert.
