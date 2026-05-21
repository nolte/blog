# Blog author

Status: draft

## Context

Readers: the human in the "blog author" role for this repository (audience D in [`AUDIENCES.md`](../../../AUDIENCES.md)), Claude Code as the AI co-operator who drafts posts (audience E), and any downstream skill or agent that consumes this spec as the contract document for generating or checking a post.

This repo is a bilingual static Astro blog (see `CLAUDE.md`). Posts are produced interactively: the human briefs the topic, Claude drafts an EN post, translates it into DE, the human curates. What this workflow does **not** have today is an explicit spec for the "blog author" role itself — that is, for the **inputs** a post draft needs, the **steps** in which a post takes shape, and the **handover** by which a post leaves the author and reaches a downstream copy-editing layer (the **editor** ("Lektor") from [`claude-shared`](https://github.com/nolte/claude-shared) — see §Handover to the editor). This spec fills that gap.

Three sibling specs already exist and are referenced here, not duplicated:

- [`post-writing-style`](../post-writing-style/en.md) governs voice, readability, typography, forbidden words, and AI-disclosure tone — **how** to write.
- [`post-audience-communication`](../post-audience-communication/en.md) governs primary-audience declaration, audience rubrics (A/B/C), multi-audience layering, Diátaxis positioning, and audience-L handling — **for whom** to write.
- [`AUDIENCES.md`](../../../AUDIENCES.md) is the audience artifact that both sibling specs (and this spec) read as the authoritative source for audience identifiers and their expectations.

This spec sits before and before. **Before**, because it defines the briefing without which a post-writing-style-conformant draft cannot exist. **Before**, because it defines the handover point to the editor, who consumes `post-writing-style` and `post-audience-communication` as the source of per-post acceptance criteria. The spec is deliberately **process- and contract-oriented** — it says **which information flows when and where**, not **which words live in the body**.

## Goals

- Define a **closed list of mandatory briefing inputs** that a post draft needs, so the author (a human or a future `blog-author` skill) either produces a complete draft or surfaces an explicit, documented briefing gap — never silently invents a gap.
- Lay out the **workflow from briefing to editor handover** in named, sequential steps, so a later skill implementation can attach at exactly the same steps a human attaches to.
- Mandate a **pre-handover self-check** that walks the per-post acceptance criteria from [`post-writing-style`](../post-writing-style/en.md) and [`post-audience-communication`](../post-audience-communication/en.md) as a closed list, so the editor starts with a post that does not obviously violate the sibling-spec rules.
- Phrase the **handover contract to the editor** so it is **tolerant of the current transition regime** (the editor is still under development) while naming the end state once the editor is released.
- Bundle the **author's hard MUST-NOT rules** in one place, derived from the hard rules in `CLAUDE.md` and the MUST rules of the two sibling specs — so "what must the author never do" doesn't have to be reconstructed across three files.
- Serve as the **contract document** for a later `blog-author` skill in [`claude-shared`](https://github.com/nolte/claude-shared) — the spec is phrased so a skill implementation can adopt the briefing inputs as its input schema, the workflow steps as its interactive phases, and the acceptance criteria as its internal verification one-to-one.

## Non-goals

- Defining **voice, tone, readability, typography, and forbidden words** — that is exhaustively covered by [`post-writing-style`](../post-writing-style/en.md). This spec references that spec's per-post acceptance criteria in the self-check; it does not restate them.
- Defining **audience rubrics, primary/secondary audience mechanics, Diátaxis positioning, or audience-L fairness rules** — that is exhaustively covered by [`post-audience-communication`](../post-audience-communication/en.md). This spec demands the audience declaration as a mandatory briefing input and references that spec's per-post criteria in the self-check.
- Defining **the frontmatter schema** (key set, required fields, types) — that is declared by the Astro content-collection schema in `src/content.config.ts` plus the notes in `CLAUDE.md`. This spec presupposes those fields and points to them.
- Defining **the internal mechanics of the editor** (operations, dimensions, severity classification, JSON report shape) — that belongs to the external spec `spec/project/lektorat/` in [`claude-shared`](https://github.com/nolte/claude-shared) (currently under development, see §Handover to the editor and §Open questions). This spec defines only the **handover point** from the author's side.
- Defining **PR shape, commit-message conventions, branching model, or merge gates** — that belongs in a future pull-request workflow spec, not here. This spec ends at the editor handover; what follows is governed elsewhere.
- Defining **topic choice, publishing cadence, or corpus mix** — those are roadmap and sprint questions governed by `spec/project/roadmap/` and `spec/project/sprint/`. This spec applies once a topic has been chosen.
- Defining **lint or CI mechanics** that automate the acceptance criteria. The spec is reviewer judgement today; wiring it into `task check` or a downstream skill is open (see §Open questions).

## Requirements

### Briefing inputs

A post draft starts with a **briefing**. The mandatory fields listed below are the closed minimum set; if one is missing, the draft **MUST NOT [MUST NOT]** start before the gap is either filled or recorded as a documented open question in the briefing (see the "briefing gaps" sub-rule at the end of this section). The optional fields extend the draft; their absence does not block it.

#### Mandatory fields

- **MUST [MUST]** name a **topic** as a one- or two-sentence thesis, phrased as what the post will **state** — not as a keyword. "I describe how the `astro:content` loader validates the frontmatter" passes; "Astro Content Collections" fails.
- **MUST [MUST]** name **at least one concretely grounded artifact** the post is built on: a repo reference (repo name plus commit SHA or tag), a diff, a command output, a screenshot, a README quote, or an explicit operator briefing. This requirement places the hard rule "Never invent technical facts about projects" from `CLAUDE.md` at the workflow entry point — without an artifact, the draft must not start.
- **MUST [MUST]** name a **primary audience** from `{A, B, C}`, per [`post-audience-communication`](../post-audience-communication/en.md) §Primary audience declaration. L is never a primary audience; M is out of scope.
- **MUST [MUST]** maintain a **sources list** of URLs to primary sources against which every concrete technical claim in the post can be verified (README, release notes, RFC, GitHub issue, source file, operator briefing transcript). The list **MAY [MAY]** grow as the draft develops; it **MUST NOT [MUST NOT]** stay empty if the post carries **a single** concrete claim about a named project, library, or tool.
- **MUST [MUST]** set the **`slug`** in ASCII kebab case, derived from the English title; the slug is stable after publication. Maximum length follows the `CLAUDE.md` rule (≤ 60 characters).
- **MUST [MUST]** set the **`translationKey`** shared between the EN and DE files of the post pair (per the `CLAUDE.md` contract).

#### Optional fields

- **MAY [MAY]** declare **secondary audiences** (`secondaryAudiences`) as a list from `{A, B, C} \ primaryAudience`. An empty list signals a deliberately narrow post; a non-empty list triggers the multi-audience-layering requirements from [`post-audience-communication`](../post-audience-communication/en.md) §Multi-audience layering.
- **MAY [MAY]** declare a **`portfolioProject` slug** if the post binds to an entry in the `projects` collection; this enables the cross-link expectation from [`post-audience-communication`](../post-audience-communication/en.md) §Audience B addressing rubric ("link to `/projects/<slug>`").
- **MAY [MAY]** declare a **Diátaxis position** (`explanation`, `how-to`, `blend`) as a briefing hint; the frontmatter today carries **no** such field (see [`post-audience-communication`](../post-audience-communication/en.md) §Open questions — Diátaxis frontmatter signal), but the position shapes the lede and body form and therefore belongs in the briefing.

#### Update vs. new-post fields

- **MUST [MUST]** carry an **update reason** in the briefing when revising an already-published post: one or two sentences on what has changed and why the update is due now (a bug in the original claim, a new release of the cited library, a better artifact). A cosmetic correction without factual change **MAY [MAY]** shorten the reason to "correction pass after editor finding `<id>`" or equivalent.
- **MUST [MUST]** set the frontmatter field **`updatedDate`** to the ISO date of the update, per the `CLAUDE.md` frontmatter convention. The field **MUST NOT [MUST NOT]** be set silently without the update reason being documented in the briefing.
- **MUST NOT [MUST NOT]** an update change the **`slug`** or the **`translationKey`**; that would be a new post under a new identity, per [`post-audience-communication`](../post-audience-communication/en.md) §Primary audience declaration (write-once contract).

#### Audience-L evidence field

- **MUST [MUST]** carry, when the planned post characterises a **named third party** (audience L), an **evidence list** in the briefing with at least one primary-source citation for every characterisation (URL plus the cited passage, verbatim or with commit SHA / revision pin). This places the MUST from [`post-audience-communication`](../post-audience-communication/en.md) §Audience-L handling at the workflow entry point.
- **MUST [MUST]** carry, for **quotations from private communication** (DMs, private email, closed issue threads, internal Slack), a **consent note** from the source in the briefing — at minimum as a reference to where the consent is recorded (own email reply, shared Slack thread). Without that note the quote **MUST NOT [MUST NOT]** land in the post.
- **SHOULD [SHOULD]** record the **preferred name and capitalisation** of the third party in the briefing (e.g. `npm` instead of `NPM`, `Astro` instead of `astro`), so the spelling is not re-researched on every draft.

#### Hero and OG image

- **MAY [MAY]** plan a **hero / OG image** in the briefing, with a path relative to `/public/` and a **descriptive alt-text proposal**. Hero images are **not** mandatory today.
- **MUST [MUST]** describe, when a hero / OG image is included in the post, **what is visible in the image** in the alt text — not repeat the caption, and not read "hero image" or "screenshot" (analogous to the screenshot alt-text rule from [`post-writing-style`](../post-writing-style/en.md) §Code, commands, and other technical content).
- **MUST NOT [MUST NOT]** the post body use a **hero image as a substitute** for an inverted-pyramid lede; the image complements the lede, it does not replace it (cf. [`post-writing-style`](../post-writing-style/en.md) §Structure and flow).
- Note: the broader **hero-image policy** for the corpus (mandatory vs. optional, uniform style, generation pipeline) is not decided; see §Open questions.

#### Briefing gaps

- **MUST [MUST]** any **briefing gap** be documented explicitly before the draft starts — either as an "open question" in the briefing header, or as an inline marker in the later post body that forces the editor to address the gap before publication.
- **MUST NOT [MUST NOT]** the author (human or skill) fill a briefing gap **silently** with a plausible-sounding guess; that is exactly the failure mode the `CLAUDE.md` hard rule "Never invent technical facts" rules out.

### Workflow

The workflow is a **linear sequence** of named steps. Later steps presuppose earlier ones; jumping back is allowed, but **MUST NOT [MUST NOT]** result in a later step silently skipping an earlier one.

- **MUST [MUST]** **Step 1 — receive and clarify the briefing**: the briefing (see §Briefing inputs) is checked against the mandatory fields; gaps are addressed or recorded as explicit open questions. Without a satisfied briefing, the workflow ends here.
- **MUST [MUST]** **Step 2 — write the EN draft**: the English post body is drafted per [`post-writing-style`](../post-writing-style/en.md) and the audience rubric from [`post-audience-communication`](../post-audience-communication/en.md) for the `primaryAudience` named in the briefing. The frontmatter is filled per `CLAUDE.md`, including `aiGenerated: true` for AI-drafted posts.
- **MUST [MUST]** **Step 3 — pre-handover self-check**: the self-check (see §Pre-handover self-check) runs against the EN draft and its frontmatter; findings are fixed **before** step 4 starts.
- **MUST [MUST]** **Step 4 — write the DE translation**: the German post body is created at `src/content/posts/de/<slug>.md`, with the same filename and the same `translationKey` as the EN file, and identical values for `primaryAudience`, `secondaryAudiences`, `pubDate`, `tags`, `portfolioProject`, and `aiGenerated`. The translation follows §Bilingual typography from [`post-writing-style`](../post-writing-style/en.md) and §Bilingual audience symmetry from [`post-audience-communication`](../post-audience-communication/en.md).
- **MUST [MUST]** **Step 5 — pre-handover self-check (second half)**: the self-check runs against the DE draft and the pair invariants (see §Pre-handover self-check, per-pair block).
- **MUST [MUST]** **Step 6 — run `task build` locally** (or `task check` as the faster variant, per `CLAUDE.md`). A non-green run blocks the editor handover; the author fixes the build errors and repeats the step.
- **MUST [MUST]** **Step 7 — handover to the editor**, per §Handover to the editor. The author provides **no** own copy-editing mechanics; he hands over a post whose entry conditions the editor's `audit` stage accepts.
- **SHOULD [SHOULD]** the author, between steps 2 and 3 (or between 4 and 5), **read the draft aloud** or have TTS read it, per [`post-writing-style`](../post-writing-style/en.md) §Edit pass. This read-aloud is an author duty in that spec; this spec restates it here so it stays visible in the workflow.

### Pre-handover self-check

The self-check is a **closed, walkable list**. Each item is a per-post requirement from a sibling spec or from `CLAUDE.md` that the author (human or a future `blog-author` skill) actively answers **once** for each of the two language files before editor handover. The self-check **does not replace** the editor; it merely ensures the editor starts with a post that does not obviously violate the spec rules.

#### Per language file (apply separately for EN and DE)

- **MUST [MUST]** have walked **every per-post acceptance criterion** from [`post-writing-style`](../post-writing-style/en.md) §Acceptance criteria (a-1 through a-17) and carry no unresolved violation, in so far as the criterion applies to the language file under review (e.g. the Flesch–Kincaid requirement a-4 is today scoped to the EN body — see that criterion's provisional clause).
- **MUST [MUST]** have walked **every per-post acceptance criterion** from [`post-audience-communication`](../post-audience-communication/en.md) §Acceptance criteria (a-1 through a-13), under the enforcement-status caveat of that spec for the frontmatter fields `primaryAudience` and `secondaryAudiences` (a-1 / a-2 are author-side conventions until the Astro Zod schema declares them).
- **MUST [MUST]** **cross-check every concrete technical claim** about a named project, library, or tool against the sources list kept in the briefing — re-open the cited passage, re-open the cited README at the pinned revision, or re-run the cited command (cf. [`post-writing-style`](../post-writing-style/en.md) §Edit pass).
- **MUST [MUST]** have run a directed search-and-check for the **forbidden-word list** from [`post-writing-style`](../post-writing-style/en.md) §Forbidden words and phrases on the language file under review; every hit is either replaced or carries a documented override per that spec's §Override procedure.

#### Per pair (apply to the EN + DE pair as a whole)

- **MUST [MUST]** the **`translationKey`** be **identical** in both files, and the filename slug is identical in `en/<slug>.md` and `de/<slug>.md` (per the `CLAUDE.md` slug rule).
- **MUST [MUST]** the frontmatter field **`primaryAudience`** be identical in both files; **`secondaryAudiences`** also identical (per [`post-audience-communication`](../post-audience-communication/en.md) §Bilingual audience symmetry).
- **MUST [MUST]** the flag **`aiGenerated: true`** be set in both files as long as the post is AI-drafted (per the `CLAUDE.md` hard rule and [`post-writing-style`](../post-writing-style/en.md) §AI-disclosure tone).
- **MUST [MUST]** **`task build`** (or `task check`) run green locally against the working tree that contains both files.
- **SHOULD [SHOULD]** the author flip the EN ↔ DE pair once via the language switcher in the local `task dev` instance, so a `translationKey` mismatch or a silent pair break becomes visible (per [`post-writing-style`](../post-writing-style/en.md) §Edit pass).

### Delivery contract

This section names the artifacts to be delivered **in addition** to the post pair itself, so that the editor and any downstream skill find the conditions formulated in §Pre-handover self-check and §Handover to the editor **verifiable** — not merely attested as "the author has checked".

The obligation is **role-conditional**:

- for the **human author**, the artifacts below are **SHOULD [SHOULD]**, because a human assembles the evidence in their head and walks the self-check coherently;
- for an **agentic author** (e.g. a future `blog-author` skill / agent in `claude-shared`), they are **MUST [MUST]**, because an agent without explicit output evidence cannot be distinguished from a non-checking agent.

The form valid today for all three artifacts is Markdown prose (hand-written) or a plain list in the commit body / PR description. A machine-readable form (YAML / JSON, with schema) is deferred as a follow-on step (see §Open questions — "Briefing and delivery contract as YAML schema").

#### Self-check manifest

- **MUST [MUST]** (for agentic authors; **SHOULD [SHOULD]** for human authors) deliver a status line for every per-post acceptance-criterion ID from the sibling specs that §Pre-handover self-check references, with one of exactly three values:
  - `passed` — the criterion is satisfied;
  - `finding: <short reason>` — the criterion is violated, the finding is described;
  - `override: <reference to §Override procedure in post-writing-style or an analogous justification>` — the violation is documented and accepted.
- **MUST [MUST]** (for agentic authors) keep the per-language-file and the per-pair blocks from §Pre-handover self-check separate in the manifest, so that `task build` status, `translationKey` identity, and audience-field identity are visible as their own lines.
- **MAY [MAY]** the manifest live in the commit body / PR description (a Markdown list is sufficient) or in a separate file beside the post pair (e.g. `<slug>.selfcheck.md`); the path is not prescribed, but **reachability together with the post pair in the merge commit** is.

#### Sources-to-claim mapping

- **MUST [MUST]** (for agentic authors; **SHOULD [SHOULD]** for human authors) map every entry of the briefing's sources list to the concrete post passages it supports — minimally in the form "source <n> supports post paragraph <anchor or heading + sentence number>". Multi-source support is allowed; an unused source is a finding, not a violation.
- **MUST [MUST]** (for agentic authors) every **concrete technical claim** about a named project / library / tool point at at least one source; otherwise it carries a `finding` entry in the self-check manifest (violation of §Forbidden practices for the author — "claims without sources").
- **MAY [MAY]** the mapping be integrated into the self-check manifest or sit beside it as a second list; separate maintenance is allowed, separate readability is mandatory.

#### Handover manifest

- **MUST [MUST]** (for agentic authors; **SHOULD [SHOULD]** for human authors) a short one- to three-line note name the following fields explicitly:
  - the **chosen transition regime** per §Handover to the editor (today: `prose-vale-curator`, self-judgement, or a combination — target state: a run of `lektorat-apply`);
  - the **`task build` status** with the command used (`task build` or `task check`) and the result (`green`);
  - the **repository state** the self-check ran against (branch name plus optional commit SHA), so the editor knows which state it is checking against.
- **MUST [MUST]** the handover manifest be **visible together with the post pair** — in the commit body, in the PR body, or as a referenced file. A handover done silently without a manifest is a violation of §Handover to the editor (entry conditions).
- **MUST NOT [MUST NOT]** the manifest claim that a procedure was carried out that was not actually executed; a false attestation is a heavier violation than an open `finding` entry.

### Handover to the editor

The **editor** is the downstream copy-editing stage governed by the external spec `spec/project/lektorat/` in [`claude-shared`](https://github.com/nolte/claude-shared). From the author's perspective, the editor is a black box with an `audit` entry stage; what happens inside (five dimensions, severity classification, JSON report shape) is out of scope for this spec. The handover is a **contract point**: the author hands over a post that meets the entry conditions and hands over editorial final responsibility to the editor.

#### Entry conditions for the editor's `audit` stage

- **MUST [MUST]** the **EN + DE post pair** be present on disk in full, both files with valid frontmatter, identical `translationKey`, identical slug, and identical audience fields (see §Pre-handover self-check, per pair).
- **MUST [MUST]** **`task build`** have run green; the editor is not a build-repair tool, and a post that does not build is not handover-ready.
- **MUST [MUST]** **`aiGenerated: true`** be set on AI-drafted posts; the editor bases its treatment of the post on this flag (cf. [`post-writing-style`](../post-writing-style/en.md) §AI-disclosure tone).
- **MUST [MUST]** the **self-check** (see §Pre-handover self-check) be completed; open self-check findings are resolved **before** the handover, not **with** the handover.

#### Task boundary

- **MUST NOT [MUST NOT]** this spec demand that the blog author know or reproduce the **internal mechanics of the editor** (metrics, thresholds, dimension IDs). The author hands over a post; the editor returns findings. The spec defines the handover point, not the editor operation.
- **MUST NOT [MUST NOT]** the author attempt to **anticipate editor findings in advance** and thereby re-interpret the sibling-spec rules differently than they are written. The self-check serves the written rules; anything beyond is the editor's job.

#### Transition regime (today, until the editor spec is released)

- **MUST [MUST]** the author today apply at least **one** of the following transitional copy-edit options, until `lektorat-apply` from [`claude-shared`](https://github.com/nolte/claude-shared) is available:
  - **a)** run the `prose-vale-curator` agent from `claude-shared` over the **English** language file (covers EN Vale mechanics; no DE pipeline);
  - **b)** a documented **reviewer judgement** by the human author against the self-check (see §Pre-handover self-check), explicitly noted as "transitional self copy-edit".
- **MUST [MUST]** the chosen transition regime be named in the commit body or in the pull-request description, so the eventual switch to `lektorat-apply` (once released) is traceable as a spec update.
- **MUST NOT [MUST NOT]** the transition regime be interpreted as a permanent end state; the transition is explicitly time-bounded and is replaced by `lektorat-apply` once that skill is marked released in `claude-shared`.

#### Target state (once `lektorat-apply` is released)

- **MUST [MUST]** the author, after step 7, run the `audit` operation from `lektorat-apply` over the EN + DE post pair.
- **MUST [MUST]** every editor finding of severity **`critical`** be resolved before the post pair is merged (via `patch` operations, via author edits, or via the finding's built-in "skip-and-record" dismissal with a documented reason).
- **SHOULD [SHOULD]** the author address findings of severity **`warning`**, with the right to a documented dismissal in individual cases. Findings of severity **`suggestion`** are optional.
- These rules presuppose that the external `lektorat` spec has lifted its `status` from `draft` to `accepted` (or the release marker used there); until then, the transition regime defined above applies.

### Forbidden practices for the author

The following rules are the author's hard **MUST-NOT obligations**, bundled from the hard rules in `CLAUDE.md` and from MUST rules of the two sibling specs. They are gathered in one place so "what must the author never do" doesn't have to be reconstructed across three files; the sibling specs remain the authoritative sources.

- **MUST NOT [MUST NOT]** set a **concrete technical claim** about a named project, library, or tool **without a primary source** in the briefing sources list (hard rule from `CLAUDE.md`; mirrored in [`post-writing-style`](../post-writing-style/en.md) §AI-disclosure tone).
- **MUST NOT [MUST NOT]** remove the frontmatter flag **`aiGenerated: true`** on an AI-drafted post or set it to `false` (hard rule from `CLAUDE.md`).
- **MUST NOT [MUST NOT]** publish a post as **DE-only** or **EN-only**; the pair is mandatory (`CLAUDE.md` hard rule; mirrored in §Briefing inputs and §Workflow).
- **MUST NOT [MUST NOT]** rotate the **`primaryAudience` value** after publication to repurpose an underperforming post ([`post-audience-communication`](../post-audience-communication/en.md) §Primary audience declaration — write-once contract).
- **MUST NOT [MUST NOT]** quote **private communication** without explicit consent from the source, documented in the briefing's audience-L evidence field ([`post-audience-communication`](../post-audience-communication/en.md) §Audience-L handling; mirrored in §Briefing inputs).
- **MUST NOT [MUST NOT]** use a word from the **closed forbidden list** in [`post-writing-style`](../post-writing-style/en.md) §Forbidden words and phrases without a documented override in the surrounding prose.
- **MUST NOT [MUST NOT]** let the **`translationKey`** differ between the EN and DE files of the same post pair, or let the slug differ between the two languages (`CLAUDE.md` slug rule; mirrored in §Pre-handover self-check).

## Acceptance criteria

A post draft satisfies this spec if **all** per-post criteria below hold. Each criterion is phrased so a reviewer (the author, a future `blog-author` skill, or the editor itself) can mark it done / not done without ambiguity.

- [ ] **a-1** The briefing carries **all mandatory fields** from §Briefing inputs (topic, at least one grounded artifact, primary audience, sources list, slug, `translationKey`); missing values are recorded as explicit open questions in the briefing.
- [ ] **a-2** When the post characterises named third parties (audience L), the briefing carries a **primary-source citation** for every characterisation in the evidence list and a **consent note** for every quotation from private communication.
- [ ] **a-3** The **EN draft was produced before the DE draft** (step 2 before step 4); the workflow step order is honoured.
- [ ] **a-4** The **pre-handover self-check** (§Pre-handover self-check) has been completed for **both** language files separately plus the pair as a whole; no unresolved finding remains before editor handover.
- [ ] **a-5** **`task build`** (or `task check`) runs green locally on the working tree that contains both files.
- [ ] **a-6** The EN + DE pair shares an identical `translationKey` and an identical filename slug; `primaryAudience`, `secondaryAudiences`, `pubDate`, `tags`, `portfolioProject`, and `aiGenerated` are identical between the two files.
- [ ] **a-7** On an **update** to an already-published post, `updatedDate` is set **and** the update reason is documented in the briefing; `slug` and `translationKey` are unchanged.
- [ ] **a-8** When the post carries a **hero / OG image**, the alt text is descriptive (what is visible in the image) and does not repeat the image caption; the image does not substitute for the lede.
- [ ] **a-9** The editor handover happens only after the **entry conditions for the `audit` stage** (§Handover to the editor) are satisfied; the chosen transition regime (today) or the run of `lektorat-apply` (target state) is named in the commit body or the pull-request description.
- [ ] **a-10** None of the **hard MUST-NOT rules** from §Forbidden practices for the author is violated; in particular, `aiGenerated: true` is set, no private communication is quoted without consent, no word from the forbidden list is used without override, and the `primaryAudience` value has not been rotated after publication.
- [ ] **a-11** For an **agentic author**: the self-check manifest, the sources-to-claim mapping, and the handover manifest are reachable per §Delivery contract together with the post pair in the merge commit; for a **human author**, at least the handover manifest is visible (transition regime, `task build` status, repository state).

## Open questions

- **Operationalising `blog-author` skill.** This spec is set up as a contract document for a later `blog-author` skill in [`claude-shared`](https://github.com/nolte/claude-shared). The skill would adopt the §Briefing inputs as its input schema, orchestrate the §Workflow steps as its interactive phases, and implement the §Pre-handover self-check as its internal verification. As long as the skill does not exist, the workflow is a human-plus-Claude-Code workflow per `CLAUDE.md`. Once a first implementation item for `blog-author` lands on the `claude-shared` roadmap, this spec **SHOULD [SHOULD]** be referenced.
- **Wiring the editor handover contract.** §Handover to the editor addresses two states: today's transition regime (self copy-edit plus optional `prose-vale-curator`) and the target state (run of `lektorat-apply`). The **switch** between the two states — who marks when the transition is complete, whether a repo-local flag is required, whether a spec edit performs the switch — is not defined. Presumably a `Status:` version bump in this spec is sufficient once `lektorat-apply` is released in `claude-shared`; deferred until the `lektorat` spec lifts its own `status` from `draft`.
- **Hero-image corpus policy.** §Hero and OG image leaves hero images optional and governs only the alt text when one is present. The broader policy (should every post carry a hero image, is there a corpus-wide style, should generation run through a repeatable pipeline step) is undecided and probably belongs in a follow-on spec or a roadmap item. The repository author has noted in his auto-memory that hero images are desired in the longer term — until a dedicated spec applies, the rule here stays minimal.
- **Self-check as a CI gate.** §Pre-handover self-check is author duty and reviewer judgement today; a machine wiring into `task check` or into a downstream skill that checks the per-post acceptance criteria from the sibling specs is open. A partial wiring via Vale (for EN mechanics) is possible via the transition option `prose-vale-curator` already recommended today; a full wiring waits for the later `blog-author` and / or `lektorat-apply` skill.
- **Briefing and delivery contract as YAML schema.** §Briefing inputs and §Delivery contract are prose today, with mandatory-field and mandatory-artifact lists respectively. A machine-readable form for both sides — `project/briefings/<slug>.yml` with schema validation as **input**, `project/handovers/<slug>.yml` (or an embedded frontmatter sub-object) as **output** — would be more convenient for a later `blog-author` skill than prose and would make the delivery contract automatically checkable rather than just attestable. Deferred until the skill is on the planning surface; the prose form is sufficient on both sides until then. When the machine-readable form is introduced, the three artifacts named in §Delivery contract (self-check manifest, sources-to-claim mapping, handover manifest) are the natural top-level schemas.
- **Update-vs-new-post threshold.** §Briefing inputs distinguishes between update (reason + `updatedDate`) and new post (new slug). The **threshold** between the two — how large a factual change must be to justify a new post instead of an update — is author judgement and is not governed by a hard criterion. Deferred until the first concrete contested case appears.

## References

Upstream spec sources (in the same repository):

- [`post-writing-style/en.md`](../post-writing-style/en.md) — voice, readability, typography, forbidden words, AI-disclosure tone.
- [`post-audience-communication/en.md`](../post-audience-communication/en.md) — primary-audience declaration, audience rubrics A/B/C, multi-audience layering, Diátaxis, audience L.
- [`audience-identification/en.md`](../audience-identification/en.md) — methodology that produces the audience artifact.
- [`AUDIENCES.md`](../../../AUDIENCES.md) — audience artifact for this repository.
- [`CLAUDE.md`](../../../CLAUDE.md) — project-wide hard rules, post anatomy, slug convention, `task` workflow.

Downstream editor (external repository):

- [`claude-shared`](https://github.com/nolte/claude-shared) — the plugin corpus where the `lektorat` spec is taking shape and where the `prose-vale-curator` agent lives today. The `lektorat` spec is currently being developed in a worktree of that repository; once released, it is the authoritative source for the editor mechanics that §Handover to the editor points at.

Background for the workflow style of this spec:

- [Diátaxis — diataxis.fr](https://diataxis.fr/) — the quadrant theory consumed by [`post-audience-communication`](../post-audience-communication/en.md) §Diátaxis positioning; relevant here because the Diátaxis position is an optional briefing field.
- [Inverted Pyramid — Nielsen Norman Group](https://www.nngroup.com/articles/inverted-pyramid/) — the lede form required by both sibling specs; relevant here because the hero-image MUST-NOT prevents the image from substituting the inverted-pyramid lede.
- [Content design: writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) — inspiration for the "inputs — process — handover point" separation this spec adopts structurally.
