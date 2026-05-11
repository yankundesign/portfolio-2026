---
project: CHAI — Control Hub AI Assistant
status: outline (structural beats, no prose yet)
headline_metric: 3% → 18% monthly adoption
supporting_metrics:
  - 86% drop in zero-result searches
  - 14% of total assistant entry points via Smart Search tunnel
collaborator_naming: OFF — site-wide rule; credit by role only
target_length: 600–800 words
last_updated: 2026-04-23
---

# CHAI — structural beats

Skeleton for the new case study. Two goals:

1. Give the layout something real to respond to so we can scaffold the ProjectDetail route in parallel.
2. Surface where the old yankun.one/chai page drifts from the voice rules, so the rewrite doesn't inherit the LinkedIn register.

Beats are the narrative spine, not prose. For each: the move it makes, what's salvageable from the old page, and what needs new writing from Yankun. **Prose is Yankun's** — Claude won't draft it (hard rule in CLAUDE.md).

**Note on collaborators:** No names in the app, anywhere. Site-wide rule (see `.claude/rules/voice.md` and `00-brief/vibe-guideline.md`). Credit by role only — "a researcher," "the Devices BU team," "the PM," "we."

---

## Beat 1 · Opening moment — LOCKED

**The chosen moment:** The week after CHAI v1 launched. Something about what shipped felt broken or thin — not failure, exactly, but enough to make you think *we're solving the wrong problem.*

**Move:** Land concretely. Name the week. Show what you saw in CHAI v1 that bothered you. Don't state the problem abstractly — let the reader stand where you stood.

**Salvage from old page:** Nothing. *"I led the evolution of Webex Control Hub's AI Assistant from a simple help bot into a full conversational layer—adding threaded chats, Smart Search, and AI-powered report analysis—which boosted monthly usage by 120%, proving that thoughtful system-level design can directly drive efficiency and adoption"* is exactly the register the voice doc bans. Cut.

**Raw material from Yankun (2026-04-23):**

- CHAI v1 was just a help-bot *answering* — not actually *helpful* to IT admin users in the context they worked in.
- Usage was low (3% starting adoption).
- The team's instinct after launch was to add more features. Your instinct was the opposite: educate users, build trust.
- Concrete visual locked: **CHAI 1.0 screens** — two states shown. Empty state: "Hi there! I'm the Cisco AI Assistant" with three canned prompts (*How do I add new users?* / *What are the benefits of SSO* / *How do I enable transcription?*). Active state: the user typed *"How do I configure SSO?"* and CHAI returned a seven-step numbered procedure, followed by three more canned follow-ups. Both panels are narrow sidebar chat-bot UIs.
- **Persona:** keep general — "IT admin users." Don't pick a specific archetype.

**Observations on the material:**

- These three observations are the *diagnosis* (help-bot framing, low usage, team's feature-first reflex). The opening moment needs to be the *evidence* — one concrete scene that contained all three, the scene that made you draw the diagnosis in the first place. Scene, then diagnosis. Not diagnosis first.
- The tension between "add more features" and "educate users, build trust" is actually the whole piece's argument in miniature. Worth surfacing this tension explicitly somewhere — possibly here, possibly in the reflection at Beat 8. If it lives in Beat 1, the reader is oriented for everything that follows.
- Your phrasing "just a help-bot" is close to a line. That deadpan register is your voice working.

**Still needs before prose (push on these):**

- *Which* CHAI 1.0 screen? Describe it in one sentence so it can become a concrete editorial plate — what it showed, what an admin typed, what came back. Specificity here is what pays for the whole opener.
- Can you remember a specific team conversation — a roadmap review, a sprint planning, a one-on-one with the PM — where the "add more features" stance was audible? The reader needs a room to stand in, not just a diagnosis.
- "Low usage" — is the 3% adoption number the right thing to name here, or was there a specific session recording or support ticket that made the low usage vivid? Numbers are thin without an image next to them.
- Which admin did CHAI v1 fail? (A sysadmin triaging calls? A meeting host trying to figure out why a meeting dropped? The person responsible for device fleet health?) Naming a persona — even fictionally — grounds the abstract "IT admin users."

**When you're ready to write:** 2–4 sentences. Open on the screen, the conversation, or the user — not on the diagnosis. Let the reader see what you saw and draw the same conclusion you did.

---

## Beat 2 · Context — what Control Hub is, where CHAI started

**Move:** One tight paragraph of setting. Who uses this, what they're trying to do, where CHAI sat when Yankun joined. Names the product without explaining Webex.

**Salvage:** *"CHAI had to work inside an enterprise system where users needed to move quickly, understand technical context, and trust what the assistant was doing before acting on it"* — substance is right, phrasing is corporate. Rewrite.

**Needs from Yankun:** Tighten to 40–60 words. Resist "mandate," "strategic layer," "enterprise system." Say who the admins are and what a bad day in Control Hub looks like.

---

## Beat 3 · The shift — from answering to sense-making

**This is the thesis beat.** The whole piece earns itself here. Every proof that follows hangs on this one move.

**Move:** State the design decision that changed the work. The existing phrase is almost perfect: *"Instead of asking admins to manually scan report data and infer the story themselves, CHAI helped query the data in the report and get the insights for the users."* That lines up with the CLAUDE.md precision rule — CHAI interprets existing dashboards, does not replace them.

**Salvage:** The *Designing for Understanding* framing and that sentence, lightly tightened. Most load-bearing paragraph on the page.

**Raw material from Yankun (2026-04-23):**

- The thesis, in Yankun's words: *"don't just give me the answer, but also explain how you get to this."*
- **Source locked:** a research session, while testing the report analysis feature. An admin user said (or a composite paraphrase from that session captured) this line.

**Observations on the material:**

- That phrase is strong. It's the pull-quote candidate for the whole piece. Short, concrete, in the admin's voice. Keep the phrase verbatim — don't polish it into "designer speak."
- Source is now clean: research session testing report analysis. Attribution line for the pull quote: something like *"— heard in a research session, testing the report analysis feature"* (no names per site rule).
- The phrase is perfectly compatible with the CLAUDE.md precision rule. "Show how you got here" is exactly the move of interpreting existing dashboards rather than replacing them — CHAI exposes its reasoning on the existing data rather than hiding it behind an answer.
- The beat needs a *designer's* frame around the user's quote. This is a case study, not a research report. Move: user's line → what I made of it → what the rest of the piece proves.

**Still needs before prose:**

- A short paragraph (40–80 words) that sets up, quotes, and pivots off the pull quote. Three moves: (1) brief framing of where the line came from, (2) what you decided to do with it, (3) signal the three proofs are three tests of this one idea.
- Optional: a designer-voice companion line for the paragraph. The pull quote is in admin-voice; a complementary sentence in your voice would give the beat a one-two punch.

**When you're ready to write:** The pull quote is already the page's typographic anchor — the paragraph just has to set it up and follow through.

---

## Beat 4 · Proof one — Smart Search (the tunnel move)

**Move:** Show the thesis in the first concrete feature. Smart Search is its clearest version — the tunnel affordance surfaces follow-up questions, admins step into deeper help without leaving flow. Zero-result searches drop 86%. Smart Search becomes 14% of assistant entry points.

**Salvage:** Most of the current Smart Search section. Trim the corporate framing. Numbers are strong.

**Needs from Yankun:** The craft detail — what were the two or three design calls that made the tunnel affordance work? (Progressive disclosure? Preserving query context? Handoff to the full assistant view?) One or two lines on *why* it works, not just *that* it worked.

**Artifact:** Editorial plate — Smart Search UI, likely showing the tunnel state open. Caption: `fig. 01 · smart search with contextual tunnel`.

---

## Beat 5 · Proof two — Report Analysis and Insight-Ready Reports

**Move:** Scale the thesis up one level. Smart Search was a query-level move; Report Analysis is system-level — insights baked into the report-generation flow, so analysis arrives *with* the report rather than being work that happens after. "Fast is a feature" can go; the concept doesn't need the quote.

**Salvage:** The philosophical frame ("helped query the data in the report and get the insights for the users") and the Insight-Ready Reports mechanic (toggle AI Insights or pre-set a prompt; compute in the same job). This is a clean section — keep most of it.

**Needs from Yankun:** A line on how this got built — the same-job computation implies partnership with engineering/data. Credit by role: "the CHAI engineering team," "we," or similar. (No names — site-wide rule.)

**Artifacts:** Two editorial plates — (a) admin pre-setting a custom prompt when kicking off a report, (b) the delivered report with insights in place. Captions: `fig. 02 · report kickoff with AI insights toggle`, `fig. 03 · report delivered with analysis`.

---

## Beat 6 · Proof three — Devices Troubleshooting (the craft-depth moment)

**Move:** The beat where the piece shows deepest technical thinking. Multi-signal embeddings, root-cause clustering, partnership with the Devices BU to embed CHAI directly on device pages. The reader earns a look under the hood.

**Salvage:** The whole section — most specific craft detail in the current piece. Consolidate the duplication (current page shows this section twice under slightly different headers).

**Needs from Yankun:** One or two lines on what was hard. The current version says *what* you did; it would gain from a sentence on the call that didn't work first. What did the first clustering approach miss? What did you have to throw out?

**Artifacts:** Ideally two — (a) the multi-signal embedding visualization (or an abstraction of it), (b) CHAI embedded on a device page with a root-cause cluster. Captions: `fig. 04 · multi-signal embedding clusters`, `fig. 05 · CHAI on the device page`.

---

## Beat 7 · Outcome

**Move:** Land the headline metric — 3% → 18% monthly adoption — but ground it in what it means in lived terms. A number alone is a résumé bullet. A number plus a lived consequence is design work.

**Salvage:** Nothing yet — the current page distributes metrics across sections without a moment where they land as a whole.

**Needs from Yankun:** 2–3 sentences. What does 18% mean for a Webex admin? How many teams are on it now? What did it replace — escalations, spreadsheets, IT tickets, the one person who knew the dashboard? If there's a single representative user quote from research, this is where it goes (quoted anonymously).

---

## Beat 8 · Reflection

**Move:** One considered paragraph. Not three lessons. Not "Embrace the ambiguity and keep Iteration" / "Understand the technology" / "Design a system, not just component" — those are the exact LinkedIn closers the voice doc warns against. Cut all three.

**Salvage:** None of the current closer.

**Needs from Yankun:** One paragraph (60–120 words) on something specific you believe about designing enterprise AI now that you didn't believe a year ago. A position, not a lesson. If it's not ready, park this beat and ship a shorter close — a handoff to credits. Better one real line than three generic ones.

---

## Out of scope for this case study — RESOLVED

- **Meeting & Calling troubleshooting (north-star work).** Cut. Confirmed 2026-04-23. The piece is stronger with three shipped proofs than with three shipped plus one speculative. If the north-star work wants a home later, it can become a journal page ("on troubleshooting ecosystems") accessible from the canvas corner.
- **Named collaborators.** No inline names in this case study. Credit given by role where needed.

---

## Open questions — resolve before writing prose

None. All structural questions resolved. Remaining work is prose.

---

## Resolved (for the record)

- **Opening moment:** Week after CHAI v1 launched. Locked 2026-04-23.
- **Collaborator naming:** None anywhere in the app. Site-wide rule updated 2026-04-23.
- **Meetings/Calling north-star:** Cut from case study. Locked 2026-04-23.
- **120% monthly usage metric:** Cut entirely. 2026-04-23. Metric set is 3% → 18% adoption + 86% no-result drop + 14% entry points.
- **Smart Search metric placement:** Inline in Beat 4 (proof-of-feature). The headline metric lands alone in Beat 7.

---

## Artifact inventory (for the layout to plan around)

- 0× hero image. Piece opens on type.
- 1× Smart Search editorial plate
- 2× Report Analysis editorial plates
- 2× Devices Troubleshooting editorial plates
- Possibly 1× sticky-note-style process artifact per section (optional — lighter hand than full plates)
- No full-bleed header image
