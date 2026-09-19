# Ebb

**A macOS app that helps you actually do the thing you sat down to do.**

Designer · macOS · [[ dates ]] · [[ team size — say it once, here ]]

> Anything in `[[ double brackets ]]` is a blank for you to fill. Anything in a
> `▣ VISUAL` block is an image slot — the description is what to put there and why.

---

## 1. It started as my own problem

I'd sit down at 2pm to build something. At 6pm I'd still have the file open, untouched, and somewhere in between I'd been on X, then Discord, then a tab I don't remember opening. The bad part wasn't the lost time. It was not knowing when it turned.

I wasn't trying to find a gap in the market. I wanted a tool that fixed my Tuesday afternoon.

▣ **VISUAL 1 — Your own bad week**
*A screenshot of your real usage data from a genuinely bad week, before Ebb. Don't recreate it in Figma, don't clean it up. The ugliness is what makes the rest of the case study believable.*
*Caption: "My actual week. This is the screen that started it."*

---

## 2. The idea is small

Set a goal for the day. Click once. The distracting stuff turns off, music turns on, and when you're done you can see what you made.

That's the whole product. I spent more time deciding what *not* to put in it than what to put in.

The things I left out, on purpose:

- No streaks. A streak turns one sick day into a reason to quit.
- No score to optimise. The number is there to be looked at, not chased.
- No setup wizard. If configuring it feels like work, you'll configure it once and never open it again.

▣ **VISUAL 2 — The whole product in four frames**
*Goal → click → blocked → what you made. Four screens in a row, no arrows, no annotations, no callouts. If the strip needs explaining, the product isn't as simple as the paragraph claims.*

---

## 3. How it works

**Tides** are the goal. You set a daily or weekly target sized to a real day, not an aspirational one — three focused hours, not eight. It's the only thing you configure regularly, and it takes about four seconds.

**Focus profiles** are the setup you do once. Coding, studying, writing — each one holds its own block list, so the question "what should I block right now" never comes up again. [[ one line: how you kept this from becoming a settings screen ]]

**A session** starts with one click. From there it's automatic: distracting apps and sites go dark, Spotify starts, the timer runs in the menu bar. Nothing asks you anything.

**Afterwards** the session comes back to you as something you did — time created, what you were in, how it compares to your Tide.

The part I care about most: after that first click, there's no willpower anywhere in the loop. Willpower is the thing that was failing in the first place. Designing a focus app that needs more of it is a joke.

▣ **VISUAL 3 — The loop, running**
*A 10-second screen recording of the real thing: click, apps dim, music starts, timer appears in the menu bar. Silent, looping. Timing and easing sell craft in a way that stills can't.*

▣ **VISUAL 4 — The loop, diagrammed**
*Five nodes, one line. Mark clearly which steps need the user and which happen on their own — that contrast is the argument of this whole section, so make it visible at a glance.*

▣ **VISUAL 5 — Profile setup**
*One screen of focus profile configuration. Shown once, briefly, to prove that setup isn't homework.*

---

## 4. The bit that made it click

Early on, the tracking screen was just a list of apps and hours. Accurate. Completely useless. I'd look at it, feel vaguely bad, and close it.

The fix was realising that time isn't good or bad — it's **creating** or **consuming**. 2h 25m in Cursor and 1h 15m in Instagram are not the same hour, and pretending they are is why every screen-time report feels like a scolding.

Once the split existed, the same data stopped being an accusation and became something I'd actually open. Everything else in the app is downstream of that one call.

[[ optional, and worth it if true: the moment you noticed this — a note, a user comment, a screen you hated ]]

It's an opinionated call, and it's sometimes wrong. [[ one line: what happens when the classification is wrong and how a user fixes it ]]

▣ **VISUAL 6 — Same data, twice** *(the most important image in the piece)*
*Left: a plain screen-time list. Right: the same numbers split into Creating and Consuming. Identical data, opposite feeling. Build this one carefully — if a reader remembers one image from the case study, it should be this.*

---

## 5. The screen nobody wants to see

The block screen has a harder job than anything else in the app. It talks to someone who is actively annoyed at it — usually me, at 3pm, reaching for the thing I just asked it to take away.

Too stern and it's a parent. Too cute and it's insulting. [[ name the tone you landed on ]]

[[ the version that didn't work, and what happened when you tried it ]]

I also left the override easy. One [[ click / step ]] and you're through. That's deliberate — a lock you can't open makes you resent the app, and the point of the friction isn't to stop you, it's to make the moment conscious. [[ your reasoning here, in your own words ]]

▣ **VISUAL 7 — The block screen, full-bleed**
*Big. Uncropped. This is the second image people will remember.*

▣ **VISUAL 8 — Copy variants**
*Four versions of the block message in a row, with a one-line verdict under each. The rejected ones do more persuading than the shipped one.*

---

## 6. I built most of it with AI

I skipped clickable prototypes almost entirely and went straight to running code. That sounds like a shortcut, and partly it was — but the real reason is that this product lives in its timing. How long the apps take to dim, when the music comes in, how the timer settles into the menu bar. You can't feel any of that in a prototype. You can feel all of it in a build.

Where it helped: [[ e.g. getting a working version of a screen in minutes so I could throw it away by lunch ]]

Where it was wrong, consistently:

- Layouts that were competent and completely characterless
- Motion timing that was technically fine and felt like nothing
- Copy that read like a productivity brochure — every block message came out sounding like LinkedIn

[[ add the specific one that annoyed you most ]]

None of that is a complaint. It's the actual division of labour: AI made production cheap, which meant the scarce input became knowing what was worth keeping. Creating-vs-consuming didn't come out of a prompt. Neither did the decision to leave streaks out.

▣ **VISUAL 9 — Prompt → first output → shipped**
*Three panels side by side. Annotate the delta between panel two and panel three — that gap is the entire point of the section.*

▣ **VISUAL 10 — "AI did / I decided"**
*A blunt two-column table. No hedging, no diplomatic phrasing. Expect to be asked about it in an interview, and write it so that's a conversation you'd enjoy.*

---

## 7. Other people had the same Tuesday

[[ your real numbers — users, sessions, retention, whatever you can defend if someone asks where it came from. Leave out anything you can't source. ]]

I built it to fix my own afternoon, so the thing I didn't expect was [[ the moment you realised it wasn't just yours — a message, a review, a Discord thread ]].

**What didn't work:** [[ name a real feature that flopped, and your honest read on why ]]

**What I'd do differently:** [[ two or three sentences, plainly ]]

**What's next:** [[ the open problem, and how you'd find out if you're right ]]

---

## Notes for building this out

- **Visual budget:** 10 slots above, three of them in motion (3, and ideally two more from 7 and 9). If a section can't earn a visual, it probably can't earn its place.
- **Length target:** about four minutes. If a section grows a second argument, it's either two sections or it's zero.
- **Read it aloud** before publishing. Anything you wouldn't say to a friend, cut it.
- **Write section 7 first.** You can't open well until you know how it ends.
- **Say your scope once, at the top.** Team size and what you owned. Ambiguity about ownership is the quiet reason strong case studies get discounted.
