# Post audience communication

Status: draft

## Context

Readers: the post author, Claude Code as AI co-operator drafting and translating posts, and downstream review skills that may check a post against this spec before publish.

This spec is the companion to [`post-writing-style`](../post-writing-style/en.md). Where `post-writing-style` tells the author **how to write** (voice, readability, typography, forbidden words), this spec tells the author **whom to write for, and how to shape a single post so the right reader is served first without alienating the others**.

The audience artefact at [`AUDIENCES.md`](../../../AUDIENCES.md) (produced via the `audience-identify` skill per `spec/project/audience-identification/`) lists seven audiences for this repository. Five of them are reachable through the body of a published blog post and therefore in scope for this spec:

- **A — Technical readers** (direct, primary, `user-docs`): drop-ins via search, RSS, or a peer's link. Read for technical accuracy, working code, "show your work" depth, in either EN or DE.
- **B — Portfolio reviewers** (direct, primary, `user-docs`): HR, recruiters, hiring managers arriving from CV / LinkedIn. Read for a fast signal of project work, working style, and activity, in either EN or DE; eye-tracking research pegs the initial scan at 6–7 seconds.
- **C — Author as knowledge-base user** (direct, primary, `user-docs`): the author re-reading his own posts to remember a decision or recover a method. Tolerates rougher drafts; needs durable, future-self-readable explanation.
- **L — People and projects named in posts** (indirect, peripheral): third parties characterised in a post. Expects fair, accurate portrayal and a correction path.
- **M — Search engines and LLM crawlers** (indirect, peripheral): consume the page through `<head>`, sitemap, RSS, OG meta, `robots.txt`. Not in scope for body prose — out of scope here.

Two other audiences from `AUDIENCES.md` (D — author as site maintainer, E — Claude Code as AI co-operator) consume the repository, not the blog body, and are out of scope for this spec.

The hard problem this spec solves: **a single blog post cannot maximally optimise for A, B, and C simultaneously.** A (peer technical reader) wants depth; B (recruiter) wants a six-second signal; C (future-self) wants raw working notes that A and B would find too rough. Existing technical-communication research (Carliner, Lannon, gov.uk Content Design, NN/g progressive disclosure) converges on a single answer: layered writing with a declared primary audience per post. That answer is what this spec codifies.

## Goals

- Mandate that every post **declares exactly one primary audience** so the author and Claude have an unambiguous target when shaping the lede, the depth, and the closing.
- Provide a **per-audience addressing rubric** — for each of A, B, C — that names what to optimise for, what to avoid, the lede pattern, and the conflict-resolution stance when audiences disagree.
- Provide **multi-audience layering rules** so a post written primarily for one audience still serves the others through progressive disclosure (skim-able lede → body depth → optional drawer / footnote / linked appendix).
- Codify **Audience-L treatment** (named third parties): how to characterise them fairly, when permission is required, what the correction path is.
- Pin **bilingual audience symmetry**: the EN and DE post pair serves the same primary audience in both languages; the choice does not flip between sides.
- Stay **portfolio-blog-scoped**: the spec governs the body of a markdown post under `src/content/posts/{en,de}/`. Header metadata, sitemap, OG card content, and RSS shape are out of scope (those serve audience M and are governed elsewhere).

## Non-Goals

- Defining the **audience artefact** itself or the audience-identification methodology — that lives in [`AUDIENCES.md`](../../../AUDIENCES.md) and `spec/project/audience-identification/`.
- Replacing [`post-writing-style`](../post-writing-style/en.md). The writing-style spec defines voice, readability, typography, and forbidden vocabulary regardless of audience. This spec defines audience targeting on top of that; the two are designed to compose.
- Defining **per-page docs-tracks frontmatter**. Astro post frontmatter does not carry the docs-audience-tracks `track:` field that the MkDocs-side spec uses, because every blog post serves the same `user-docs` track. The audience signal in this spec lives in a separate frontmatter field (see §Primary-audience declaration).
- Defining **content selection**. Which projects, decisions, or experiences make it into a post is a roadmap / sprint concern, not an audience-communication concern. Once a topic is chosen, this spec defines whom the post is for.
- Defining **SEO / metadata for audience M**. The crawler-facing surface is structured-data shape, not body prose; it belongs in a separate metadata or robots-policy spec.
- Substituting **journalistic editorial standards**. The author is not a journalist; the spec borrows the BBC / Reuters / AP norms that apply to third-party portrayal but does not mandate the full editorial governance those organisations carry.

## Requirements

### Primary-audience declaration

- **MUST** declare exactly one **primary audience** for every post via a frontmatter field `primaryAudience: <A | B | C>`. Only A, B, or C are valid values for this field; L is never a primary audience (Audience L is a constraint, not a target — see §Audience-L treatment) and M is out of scope per §Non-Goals.
- **MUST** declare a secondary-audience list via a frontmatter field `secondaryAudiences: [<A | B | C>, …]`. The list **MUST NOT** contain the value used in `primaryAudience`; it **MAY** be empty (`[]`) when the post is intentionally narrow.
- **MUST NOT** rotate `primaryAudience` after publish to retarget an underperforming post. The frontmatter field is a write-once contract that anchors the post's shape; a post that wants to serve a different audience is a new post under a new slug.
- **SHOULD** target the distribution **A: roughly 50 %, B: roughly 20 %, C: roughly 30 %** across the corpus, measured at a five-post rolling window. The percentages are the author's working hypothesis, **not** a derivation from `AUDIENCES.md`'s criticality ranking — that file explicitly defers the ranking between primary direct consumers A, B, and C ("the relative ordering among them needs real usage data before it can be committed", see `AUDIENCES.md` §Open questions). The split here is therefore a starting point to be calibrated against actual traffic / referrer data; deviations are fine in any single post and signal a calibration question only over a 10-post horizon.
- **MAY** mark a post `primaryAudience: C` even when content is durable and shareable; the field declares which reader the post's shape was optimised for, not who is allowed to read it.

### Audience-A addressing rubric (technical readers)

A is a peer technical reader who arrived via search, an RSS reader, or a link from another developer. The reader's first question is "does this person know what they're talking about", answered in the first paragraph. The reader's second question is "can I copy / adapt / verify the work shown here", answered in the body.

- **MUST** lead with the concrete artefact — the problem statement, the failing case, the actual code under discussion, the version pin. The first 80 words of an A-post **MUST NOT** be background context; they **MUST** name the technical claim.
- **MUST** carry the working artefact verbatim: the diff, the command output, the config, the failing test, the screenshot of the UI state — whichever is what the reader would need to reproduce. The artefact is not an illustration of the post; the post is the explanation around the artefact.
- **MUST** name versions of every tool / library / framework discussed (`Astro 5.x`, `Tailwind 4.0`, `Claude Opus 4.7`, `Python 3.12`) so the reader can date-anchor the claim and decide if it still applies to their setup.
- **MUST NOT** assume audience-B vocabulary. "MVP", "ROI", "stakeholder", and "value delivery" are out of register; if a business framing genuinely matters, name it in technical terms ("we wanted this to run in CI without paying for a hosted runner").
- **MUST NOT** under-show because "the reader already knows that". When in doubt, link to the primary source rather than skipping the reference; an A-reader uses the links, a B-reader skips them, neither pays a price.
- **SHOULD** close with an "out of scope / open questions / what I would do next" section. This serves A's curiosity (other paths through the problem) and serves C (future-self continuity) at the same time, at no cost to B who has already left.
- **SHOULD** signal expertise level early. "I had not touched X before this project" sets the reader's expectations as accurately as "I have shipped X in production for five years"; both are honest and both are useful to A.

### Audience-B addressing rubric (portfolio reviewers)

B is a recruiter, hiring manager, or someone evaluating the author's portfolio from a non-technical-deep angle. Eye-tracking studies put the initial scan at six to seven seconds; the post has to signal **what was built, what role the author played, and how recent the work is** in that window or the reader leaves.

- **MUST** make the first 80 words (the inverted-pyramid lead required by [`post-writing-style`](../post-writing-style/en.md)) work as a six-second signal: it **MUST** name (a) the project or topic, (b) what was done, and (c) the author's first-person role. "I rewrote the deploy pipeline of my Home Assistant integration to ship green every push" passes; "Today we'll explore CI/CD" fails.
- **MUST** carry a one-line "what this means in practice" sentence early — what changed, what shipped, what was learned — phrased in plain language. Audience B does not parse `kubectl rollout restart` but reads "I cut deploy time from 12 minutes to 90 seconds".
- **MUST** keep the post visually scannable: at least two H2 headings on any post over 600 words, the first H2 within the first viewport's worth of text (≈ 400 words on a desktop reading column).
- **MUST NOT** require the reader to read the code blocks. A B-reader skips fenced code. The surrounding prose **MUST** carry the message; the code substantiates it but is not the message.
- **MUST NOT** open with a jargon barrier ("This post is about k8s operators built on CRDs…"). The jargon may come in the body once the broader claim has landed.
- **SHOULD** name the portfolio project explicitly and link to its repository (or `/projects/<slug>` for portfolio entries) so the B-reader can pivot from the post to the project page in one click.
- **SHOULD** include a date signal beyond the frontmatter `pubDate` — "in May 2026" in the lede, or a tag like "ongoing work" / "shipped to production" — because B-readers reading a post in 2027 want to know it's still recent.

### Audience-C addressing rubric (author as knowledge-base user)

C is the author re-reading his own work months or years later to recover a decision, a method, or a piece of context that has fallen out of memory. C's expectation is durability and self-coherence: the post should pick up cold, without the surrounding conversation that produced it.

- **MUST** record the **why** of every decision the post describes, not only the **what**. "I went with `bun` over `node`" without "because the build was 4× faster and `node_modules` had been a constant source of merge conflicts" is useless to future-self.
- **MUST** name the **alternatives considered and rejected** when the post describes a non-obvious choice. The list of "what I didn't pick" is at least as valuable for future-self as the final pick — those are the cul-de-sacs the author won't have to re-explore.
- **MUST** carry a **glossary or "what these terms mean in this post" note** when the post relies on terminology that may have shifted by re-reading time. Tag the term once with a short parenthetical or a link to the original RFC / project README; future-self does not necessarily remember the in-2026 meaning of "agent" or "skill" by 2028.
- **MAY** be rougher than an A-targeted or B-targeted post — broken thoughts in brackets, half-finished sentences left in, "TODO: come back to this" markers — provided the post is honestly tagged `primaryAudience: C`. The rough form is the feature; sanding it down to A-grade would erase the property that makes C-posts useful in the digital-garden sense.
- **MUST** still meet the **writing-style spec's verifiable-claim rule**: roughness is allowed in form, not in factual accuracy. A C-post that says "library X does Y" with no source is the same violation as an A-post that does it.
- **SHOULD** be cross-linked aggressively to other posts on related topics. C-posts derive their value from the linked graph; an isolated C-post is a less useful C-post.

### Audience-L treatment (named third parties)

Audience L is everyone the post characterises by name: maintainers of libraries discussed, projects the author critiques, people quoted, tools compared. The fairness rules below are non-negotiable regardless of which of A, B, or C is the primary audience.

- **MUST** ground every characterisation of a named third party in a primary source — the project's README, the maintainer's public statement, a release note, a code reference at a pinned revision. Critique is permitted; unverified factual claims about behaviour are not.
- **MUST** use the third party's preferred name and capitalisation when known (e.g., `npm` not `NPM`, `Astro` not `astro`). For people, the publicly used form.
- **MUST NOT** quote private communications (DMs, private email, closed-issue threads, internal Slack) without explicit permission of the source.
- **MUST NOT** characterise a third party's intent ("they did this because they wanted to lock users in") without a public statement supporting the characterisation; intent claims are the highest-libel-risk class of statement in either jurisdiction (EN-speaking and DE-speaking).
- **SHOULD** route correction requests through the implicit channels available today — public source repository issues and the email on the About page — and the implicit-channel form is the compliant baseline for the current state of the spec. When the open question in [`AUDIENCES.md`](../../../AUDIENCES.md) about a dedicated contact / correction channel resolves, this SHOULD is promoted to a MUST that **MUST** name the declared channel; the promotion is recorded as a spec revision, not a silent edit. The intent of this conditional is to keep the rule unambiguously compliant today rather than indeterminate.
- **SHOULD** carry a one-line attribution when the post leans heavily on someone else's work or framing ("the framing of X as Y comes from <name>'s post at <url>"). This serves L (the cited party feels seen rather than appropriated) and A (the reader learns where to follow up).
- **MAY** name a specific person in praise; **SHOULD NOT** name a specific person in critique when the critique is at the project or codebase level — name the project, link to the public artefact, and let the named maintainer come find the post if they want. Project-level critique is easier to keep fair than person-level critique.

### Multi-audience layering

A single post serves multiple audiences only when its **shape** lets each audience self-select the depth they need. The required layers below derive from NN/g progressive disclosure and the "writing for multiple audiences" tradition in technical communication.

- **MUST** carry an **inverted-pyramid lede** (required by [`post-writing-style`](../post-writing-style/en.md)) that delivers the post's claim to every audience in ≤ 80 words. The lede is the shared surface; it **MUST NOT** require any of A, B, or C to keep reading to extract the headline.
- **MUST** carry a **body that depth-serves the primary audience**. The body's prose register, code-block density, terminology depth, and link density are tuned for `primaryAudience`. Cross-referenced material that would interest a secondary audience belongs in escape-hatch links, not in the main flow.
- **SHOULD** carry an **escape-hatch layer** for the most likely secondary audience. Common patterns:
  - For a `primaryAudience: A` post with secondary B: a one-line "what this means for non-engineers" sentence early in the body, and a link out from the lede to `/projects/<slug>`.
  - For a `primaryAudience: B` post with secondary A: a "details and pitfalls" section toward the end with the deeper technical material, written so a B-reader who has already left does not miss anything important.
  - For a `primaryAudience: C` post with secondary A: a "if you got here by accident, here's the context" paragraph near the top.
- **MAY** use a **collapsible drawer** (`<details>…</details>`) to hide a long code block or a side argument that the primary audience does not need but the secondary audience might. Drawers **MUST NOT** be used to bury content the primary audience does need; that is "hide your work" and violates the spec.
- **MUST NOT** layer beyond three depths (lede, body, escape-hatch). Adding a fourth layer ("…and if you really want to go deep…") signals that the post should be split into two posts.

### Diataxis positioning

The Diataxis framework partitions documentation into Tutorial, How-to, Reference, and Explanation. Blog posts on this site sit in two of those four quadrants and explicitly **stay out of** the other two.

- **MUST** position every post as **Explanation**, **How-to**, or a blend of the two:
  - *Explanation* — the post explains why something is the way it is, what trade-off was chosen, what the author learned. Maps cleanly to `primaryAudience: A` or `primaryAudience: C`.
  - *How-to* — the post walks through solving a specific problem with a working artefact. Maps cleanly to `primaryAudience: A`; rarely `primaryAudience: B`.
- **MUST NOT** structure a post as **Tutorial** in the Diataxis sense (a teaching journey through a beginner curriculum). The blog is not a course; tutorial content belongs to upstream project documentation, not here. A post that would be a tutorial should be either an Explanation of what the author learned by working through the tutorial, or a How-to addressing a specific snag.
- **MUST NOT** structure a post as pure **Reference** (an enumerated, complete API or schema description). Reference belongs in source-code documentation or a dedicated docs site. A post that would be reference content should be split: the reference material lives where it belongs; the post explains the why or walks through a use case.
The Diataxis stance is implicit in the lede ("here's how I made X work" → How-to; "here's why I picked X over Y" → Explanation) and **MAY** be stated explicitly in surrounding prose when doing so sharpens the post; a dedicated frontmatter field is intentionally **not** required (see §Open questions for the deferred lint-friendly variant). This guidance is reviewer-meta and is not a checkable per-post rule — no Acceptance Criterion targets it.

### Conflict resolution between audiences

When the audiences want incompatible things — A wants more depth, B wants brevity, C wants raw notes — the post follows the rules below in order.

- **MUST** resolve in favour of the declared `primaryAudience`. The whole point of the frontmatter declaration is that the trade-off has been made up front; the post does not negotiate it paragraph by paragraph.
- **MUST** never resolve **against** Audience L's expectations. L is not a primary audience but is an **inviolable constraint**: a post is allowed to be too dense for B or too sparse for C, but it is **never** allowed to characterise L unfairly to serve A's appetite for sharp critique.
- **SHOULD** resolve secondary-audience pulls into escape-hatch links rather than inline accommodations. A `primaryAudience: A` post that drifts into B-friendly business framing in the middle loses A's trust without serving B; the right move is a single B-targeted sentence at the top and a link out at the bottom, not a middle paragraph that serves neither.
- **MAY** split a single underlying topic into two posts, each with its own `primaryAudience`, when one post cannot serve both audiences without compromising both. The two posts cross-link, share tags, and may share a `portfolioProject`. Splitting is the canonical answer to the recurring "this post wants to be two posts" feeling.

### Bilingual audience symmetry

- **MUST** keep `primaryAudience` identical between the EN file and the DE file of a post pair. A post is "for A" in both languages or "for C" in both languages; the frontmatter field does not differ across the `translationKey`.
- **MUST** keep `secondaryAudiences` identical between EN and DE for the same reason.
- **MUST** translate audience-specific framings idiomatically. A B-targeted lede that names a job-market signal ("I shipped this between contracts") translates idiomatically to a DE phrasing that carries the same recruiter-readable signal, not a word-for-word rendering.
- **MAY** localise references that genuinely differ between EN- and DE-speaking audiences (e.g., a legal-citation reference) when the localisation is honest and the underlying claim is unchanged. Re-translation **MUST NOT** change the post's substance — only its surface.
- **MUST NOT** flip a post's audience target to "fix" an unbalanced corpus distribution mid-translation. Corpus-level rebalancing happens at the next-post level, not by retconning an existing pair.

## Acceptance criteria

A post conforms to this spec when **all** of the following hold. The criteria are written so a reviewer (the author, Claude, or a future lint skill) can mark each one done / not done without ambiguity.

**Enforcement status (open question — see §Open questions, "Frontmatter schema impact").** Criteria `a-1` and `a-2` reference frontmatter fields (`primaryAudience`, `secondaryAudiences`) that the Astro Zod schema in `src/content.config.ts` does not yet declare. Until that schema gap is closed, `a-1` and `a-2` apply to posts authored or updated after this spec reaches `status: accepted`, and remain author-side conventions that the build will not enforce. Legacy posts pre-dating that transition are exempt; reviewers and lint skills **MUST** treat the absence of these fields on a legacy post as outside the spec's scope rather than as a failed criterion.

- [ ] **a-1** Frontmatter declares exactly one `primaryAudience` from `{A, B, C}`.
- [ ] **a-2** Frontmatter declares a `secondaryAudiences` list from `{A, B, C}` that does not contain the primary value.
- [ ] **a-3** The first 80 words of the body deliver the post's headline in a form that does not require keeping reading.
- [ ] **a-4** The body's depth, terminology, and code-block density are tuned for the declared `primaryAudience`, not split mid-post to serve a secondary audience.
- [ ] **a-5** When the post has a non-empty `secondaryAudiences` list, at least one explicit escape-hatch (link, drawer, one-line accommodation) is present in the post body and identifiable as serving that audience — by adjacent prose, by the link's anchor text, or by the drawer's summary text.
- [ ] **a-6** Every named third party (audience L) is grounded in a primary-source citation; no private communication is quoted without explicit permission; no intent claim is asserted without a public statement supporting it.
- [ ] **a-7** The post fits Diataxis Explanation, How-to, or a blend; it is not a Tutorial in the Diataxis sense and not pure Reference.
- [ ] **a-8** The EN file and the DE file carry identical `primaryAudience` and `secondaryAudiences`.
- [ ] **a-9** No post in the recent five-post window targets `primaryAudience: A` exclusively; the corpus shows at least one B-targeted and at least one C-targeted post in any rolling 10-post window (corpus-level criterion, checked at sprint review, not per post).
- [ ] **a-10** When audience needs collide in the post, the resolution favours `primaryAudience` and never against L; the reviewer can name the specific trade-off without hunting.
- [ ] **a-11** Post body depth-serves the declared `primaryAudience` per its rubric — concretely:
  - For `primaryAudience: A`: working artefact present (diff / output / config / screenshot), versions of named tools pinned, "out of scope / next" section present, **expertise level signalled early** ("I had not touched X before this project" or "I have shipped X in production for years" — either way, honest).
  - For `primaryAudience: B`: lede names project + role + recency in plain language, body readable without parsing code blocks, link to `/projects/<slug>` or equivalent, **date signal present beyond `pubDate`** (an in-prose month / year, or a tag like "ongoing work" / "shipped to production").
  - For `primaryAudience: C`: "why" of every decision recorded, alternatives considered named, glossary or context note present where re-reader-confusing terminology appears.
- [ ] **a-12** The post does not layer beyond three depths (lede, body, escape-hatch).
- [ ] **a-13** No `<details>` collapsible drawer in the body holds content the post's argument relies on for the **primary** audience; drawers carry only material a secondary audience might want, never material the primary audience requires.

## Open questions

- **Frontmatter schema impact.** This spec assumes two new frontmatter fields, `primaryAudience` and `secondaryAudiences`. The Astro content collection schema in the repo (`src/content.config.ts`) does not yet declare them. Adding them is a downstream task: a feature item that updates the Zod schema and decides whether legacy posts without the fields are accepted (probably yes, defaulting to `primaryAudience: A`). The existing R-4 roadmap item is scoped to AI-disclosure UX only and **MUST NOT** be silently extended to carry this schema change; either R-4 is explicitly broadened in `project/roadmap.md` to include the audience frontmatter, or a new sibling roadmap item is added for it. Until that resolves, this spec's MUSTs at §Primary-audience declaration are author-side conventions that the build will not enforce.
- **Per-post audience badge UI.** The audience signal is currently internal-only (frontmatter); whether to surface it on the rendered page (e.g., a small "for developers" / "for portfolio readers" tag near the post header) is a UX decision deferred to a future feature. Visible audience badges would risk being read as defensive ("I know this post is too technical for you") — the default is to keep it internal until a real reader-confusion case shows otherwise.
- **Corpus distribution gate.** The 50/20/30 A/B/C target in §Primary-audience declaration is an inference from `AUDIENCES.md` criticality plus realistic hobby-blog cadence. It has no data backing yet. After the first 20 posts ship, the distribution **MUST** be re-checked against actual traffic / referrer data; the target may need to drop A's share if B-traffic from LinkedIn is materially higher than expected.
- **Correction-channel formalism.** §Audience-L treatment leans on an implicit correction path (public repo issues + About-page email). [`AUDIENCES.md`](../../../AUDIENCES.md) carries the open question of whether to declare a dedicated channel. Once that resolves, this spec **MUST** be updated to name the channel directly.
- **Audience-L threshold for permission.** §Audience-L treatment requires explicit permission for private-communication quotes. The threshold for non-private but personal characterisations (e.g., a maintainer's blog post the author critiques) is "use the public form, link to the public statement". Whether that threshold needs hardening to "notify the person before publish" is open and depends on how often L-affected posts ship in practice.
- **Diataxis frontmatter signal.** §Diataxis positioning declares the stance is implicit in the lede. If post linting matures, a frontmatter field `diataxis: explanation | how-to | blend` may become useful. Deferred until at least one downstream skill or audit needs to read the position machine-readably.

## References

Audience methodology and content design:

- [Content design: planning, writing and managing content — GOV.UK](https://www.gov.uk/guidance/content-design)
- [Content design: writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)
- [Audience Analysis: Primary, Secondary and Hidden Audiences — Writing Commons](https://writingcommons.org/article/audience-analysis-primary-secondary-and-hidden-audiences/)
- [Audience — Howdy or Hello? Technical and Professional Communication](https://odp.library.tamu.edu/howdyorhello/chapter/audience/)
- [The Elements of Content Strategy by Erin Kissane (A Book Apart)](https://elements-of-content-strategy.abookapart.com/)

Documentation frameworks:

- [Diátaxis — diataxis.fr](https://diataxis.fr/)
- [Start here — Diátaxis in five minutes](https://diataxis.fr/start-here/)
- [Progressive Disclosure — IBM Documentation](https://www.ibm.com/docs/en/technical-content?topic=practices-progressive-disclosure)
- [Progressive Disclosure — I'd Rather Be Writing](https://idratherbewriting.com/ucd-progressive-disclosure/)

Reader behaviour:

- [Inverted Pyramid: Writing for Comprehension — NN/G](https://www.nngroup.com/articles/inverted-pyramid/)
- [How to Prevent F-Pattern Scanning — Mailchimp](https://mailchimp.com/resources/f-pattern-scanning/)
- [Ladders Updates Popular Recruiter Eye-Tracking Study — PR Newswire](https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html)
- [Eye tracking study shows recruiters look at resumes for 7 seconds — HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)

Writing for developers (audience A):

- [How to Write for a Developer Audience — Kalyna Marketing](https://kalynamarketing.com/blog/writing-for-developers)
- [Writing for Developers: 5 Best Practices — Firebrand](https://www.firebrand.marketing/deep-dives/writing-for-developers-5-best-practices/)
- [Kalzumeus — Patrick McKenzie's archive](https://www.kalzumeus.com/archive/)
- [Julia Evans — jvns.ca](https://jvns.ca/)

Knowledge-base / future-self writing (audience C):

- [Evergreen notes — Andy Matuschak](https://notes.andymatuschak.org/Evergreen_notes)
- [A Brief History & Ethos of the Digital Garden — Maggie Appleton](https://maggieappleton.com/garden-history)
- [The Garden of Maggie Appleton](https://maggieappleton.com/garden/)

Third-party fairness (audience L):

- [BBC sets protocol for generative AI content — Broadcast](https://www.broadcastnow.co.uk/production-and-post/bbc-sets-protocol-for-generative-ai-content/5200816.article)
- [Key AI concepts to grasp in a new hybrid journalism era — Reuters Institute](https://reutersinstitute.politics.ox.ac.uk/key-ai-concepts-grasp-new-hybrid-journalism-era-transparency-autonomy-and-authorship)
- [Offering Criticism in Open Source Projects — Jonathan Desrosiers](https://jonathandesrosiers.com/2026/02/offering-criticism-in-open-source-projects/)

Personal-blog principles (audiences B & C):

- [POSSE — IndieWeb](https://indieweb.org/POSSE)
- [Own your data — IndieWeb](https://indieweb.org/own_your_data)
- [The Promise of Stripe Press — alohomora](https://morgmah.substack.com/p/the-promise-of-stripe-press)
