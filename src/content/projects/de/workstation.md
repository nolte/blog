---
name: workstation
description: Ein chezmoi-Source-Tree, der eine Entwickler-Workstation mit einem einzigen Befehl bereitstellt — asdf-gepinnte CLI-Tools, eine Git-Grundkonfiguration, zsh-Plugins und eine wiederverwendbare Taskfile-Sammlung.
repo: https://github.com/nolte/workstation
homepage: https://nolte.github.io/workstation/
tags: ["chezmoi", "dotfiles", "asdf", "workstation", "developer-tooling", "automation"]
lang: de
translationKey: workstation
archived: false
order: 8
---

workstation ist der chezmoi-Source-Tree, der eine frische Maschine mit einem
einzigen `chezmoi init --apply` in einen bekannten Zustand bringt. Das gelöste
Problem kennt jede Entwicklerin irgendwann: ein neuer Laptop, oder ein neu
aufgesetzter, und stundenlanges Von-Hand-Konfigurieren von Tool-Versionen,
Git-Defaults und Shell-Plugins, das du beim nächsten Mal wieder machen darfst.
Hier liegt dieses Setup einmal, deklarativ, und bleibt über Maschinen hinweg
reproduzierbar und idempotent.

## Was es bereitstellt

Der Source-Tree rendert per [chezmoi](https://www.chezmoi.io/) direkt nach
`$HOME`:

- **Gepinnte CLI-Tools** — Tool-Versionen werden über
  [asdf](https://asdf-vm.com/) gepinnt, damit jede Maschine dieselben Versionen
  auflöst, aktuell gehalten von Renovate. Es ergänzt außerdem
  asdf-Plugin-Repositories, die nicht im offiziellen
  `asdf-vm/asdf-plugins`-Index stehen.
- **Git-Grundkonfiguration** — eine getemplatete `~/.gitconfig` mit sinnvollen
  Defaults (Default-Branch und Konsorten), gefüllt aus Name und E-Mail des
  Operators.
- **zsh-Plugins** — ein Satz Plugins, der die interaktive Shell schneller
  bedienbar macht.
- **Eine wiederverwendbare Taskfile-Sammlung** — der
  [taskfiles](https://github.com/nolte/taskfiles)-Satz, der auf die
  bereitgestellte Maschine geholt wird, um mit den installierten Tools zu
  arbeiten.
- **Ein globaler GitHub-MCP-Server** — er fügt einen `github`-Eintrag in
  `~/.claude.json` ein, damit jedes [Claude Code](https://www.claude.com/product/claude-code)-Projekt
  einen GitHub-[MCP](https://modelcontextprotocol.io/)-Server bekommt. Er liest
  ein Personal Access Token zur Laufzeit aus `GITHUB_MCP_PAT`, sodass kein Secret
  im Repo landet.

## Wie es aufgebaut ist

`.chezmoiroot` verweist chezmoi auf `chezmoi_config/` als Source-Verzeichnis.
Darin wird `dot_tool-versions` zu `~/.tool-versions`, `dot_gitconfig.tmpl`
rendert zu `~/.gitconfig`, `run_onchange_*.sh`-Hooks erledigen das Provisioning
(Plugin-Installation, asdf-Install, Virtualenvs), und `.chezmoiexternal.toml`
zieht externe Quellen wie die zsh-Plugins und die Taskfile-Sammlung herein.
Alles außerhalb von `chezmoi_config/` ist Repository-Tooling und erreicht nie die
Zielmaschinen.

## Wie es zusammenpasst

Es erweitert [gh-plumbing](https://github.com/nolte/gh-plumbing) für die
wiederverwendbaren GitHub-Workflows und Probot-/Renovate-Presets, holt die
[taskfiles](https://github.com/nolte/taskfiles)-Sammlung auf bereitgestellte
Maschinen und lintet die eigene Doku mit
[vale-style](https://github.com/nolte/vale-style). Die Dokumentation ist eine
MkDocs-Site auf GitHub Pages. Es ist früh und für den Eigengebrauch — aktiv
gepflegt für die Linux-Workstation eines einzelnen Operators, weshalb sich
Schnittstellen ohne Vorankündigung ändern können.
