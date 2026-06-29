# Project 1 Outline - Control Hub AI Assistant

Audience: hiring manager interview / portfolio panel  
Target length: 12-15 minutes  
Project: Control Hub AI Assistant (CHAI)  
Role: Product Designer, sole design lead

## How I Want This To Sound

Normal and direct. More like explaining the work to another designer or product leader, not giving a keynote.

Use simple words. Say what happened, what I tried, what I changed, and why it mattered.

The main point:

> CHAI started as a help bot. It became useful when we stopped making admins figure out how to use the assistant, and started putting the right AI help into the places where admins were already working.

## The Shape Of The Story

This should not feel like a feature tour. The middle of the story is about design exploration and design decisions:

1. CHAI 1.0 -> 2.0: I explored making the chat itself better.
2. Roadmap: as CHAI expanded from Find -> Understand -> Fix, routing became the main design problem.
3. CHAI 2.0 -> 3.0: I changed the welcome and routing model so users could understand what CHAI could do.
4. Contextual AI: I moved from one assistant destination to meeting users where they were.
5. Pattern evolution: the report pattern grew from one-row context, to report-wide questions, to dashboard questions, to AI-generated reports.

Smart Search, Reports, and Devices are examples of those decisions in real workflows.

## Slide Plan

| Time | Slide | What I need to say | Visual |
|---:|---|---|---|
| 0:00-0:30 | 1. Control Hub AI Assistant | Quick intro: what CHAI is, where it lives, and my role. | CHAI hero screenshot |
| 0:30-1:20 | 2. First, What Is Control Hub? | Explain Control Hub before showing the problem. Admins configure services, monitor usage, troubleshoot devices, and keep Webex running. The hard part is the amount of information. | Control Hub overview |
| 1:20-2:20 | 3. The Week After Launch | Emphasize the problem: weekly adoption was only 3%. Most admins tried CHAI once and never came back. CHAI answered questions, but it was not useful enough in context. | CHAI v1 empty state + answer state, 3% metric |
| 2:20-3:15 | 4. Exploration 1: Make The Chat Better? | Show 1.0 -> 2.0. I improved the chat experience: prompts, threads, answer layout, and the basic assistant flow. Helpful, but not enough. | CHAI 1.0 / 2.0 comparison |
| 3:15-4:15 | 5. Roadmap: Find, Understand, Fix | As we planned more features, CHAI was no longer just a help bot. The challenge became: how do we scale capabilities without making admins understand the assistant's internal routing? | Roadmap visual: Find -> Understand -> Fix |
| 4:15-5:25 | 6. Decision 1: Turn Routing Into Skills | Show 2.0 -> 3.0. The roadmap needed routing, but users should not have to understand routing. I changed the model from `@Add context` to Skills, so users could choose what they wanted CHAI to help with. | CHAI 2.0 / 3.0 skill-based welcome and routing |
| 5:25-6:15 | 7. Exploration 2: One Assistant Or Many Entry Points? | Explore where CHAI should live: global assistant, page triggers, inline prompts, search, report rows, dashboards. | Entry point exploration / annotated flows |
| 6:15-7:10 | 8. Decision 2: Meet The User Where They Are | Land the idea of Contextual AI. CHAI should show up where the product already has context: search, reports, dashboards, workspaces, and devices. | Contextual AI map across Control Hub |
| 7:10-8:05 | 9. Example 1: Smart Search | Search was where admins already went when they were lost. The decision was to preserve the query and hand off into CHAI with context. | Smart Search tunnel |
| 8:05-9:05 | 10. Example 2: Reports | Show report design exploration, then land on the sparkle on each report row. Start small: one report as context, one clear entry point. | Report row exploration + sparkle entry point |
| 9:05-10:00 | 11. Pattern Evolution: From Sparkle To Ask AI | Because of the first technical constraint, CHAI could only use one report as context at a time. Then we improved it: users could ask questions across reports, so we added `Ask AI` on the report page. Then we extended the same pattern to analytics dashboards. | Report sparkle -> Ask AI on Reports -> Ask AI on Dashboards |
| 10:00-10:55 | 12. AI-Generated Reports | This is the workflow leap: instead of Generate Report -> Check Data -> Ask AI for insights, users could ask CHAI to generate a custom report with the insights they needed. | Custom report prompt + generated report with insights |
| 10:55-11:55 | 13. Example 3: Apply The Pattern To Workspace And Device | Apply the contextual pattern to troubleshooting. CHAI stays close to the workspace/device page so the evidence stays visible. | Device troubleshooting + workspace insight |
| 11:55-13:05 | 14. What Changed | Adoption grew from 3% to 18%. Zero-result searches dropped 86%. Smart Search became 14% of assistant entry points. The bigger point: people used CHAI inside real work moments. | Metric slide |
| 13:05-14:05 | 15. My Takeaway | A blank chat box is not enough for enterprise software. The assistant needs context, clear skills, visible reasoning, and ways for admins to stay in control. | One simple takeaway |
| 14:05-15:00 | 16. Bridge To Agentic Work | CHAI helped admins understand what was happening. The next project asks what happens when AI starts helping with action, planning, and approvals. | Control Hub Agentic preview |

## Talk Track

### 1. Control Hub AI Assistant

Say:

> I will start with Control Hub AI Assistant, or CHAI. It is an AI assistant inside Webex Control Hub. I was the design lead on this work, covering the assistant experience, the entry points, the skill model, and how CHAI showed up across different admin workflows.

Keep this short. Do not over-explain the team yet.

### 2. First, What Is Control Hub?

Say:

> Before I show CHAI, I need to explain Control Hub. Control Hub is the admin console for Webex. It is where admins configure services, look at usage, manage devices, troubleshoot issues, and keep everything running.

Then:

> The problem is not that there is no information. The problem is that there is a lot of information. On a bad day, an admin is looking at dashboards, settings, reports, device status, and alerts, and trying to figure out what actually matters.

Point to:

- The left navigation.
- The number of product areas.
- Analytics and monitoring.
- Devices and workspaces.

Plain line to remember:

> Their problem was density, not lack of information.

### 3. The Week After Launch

Say:

> The first version of CHAI launched as a help bot. The week after launch, the adoption number was low: around 3% weekly adoption. Most admins tried it once and never came back.

Then:

> That was the interesting part, because CHAI was not giving terrible answers. It could answer something like, "How do I configure SSO?" and give a step-by-step response. But it still felt separate from the work. The admin had to stop, open CHAI, figure out what to ask, and connect the answer back to whatever they were doing.

The point of this slide:

- CHAI v1 answered questions.
- Weekly adoption was low.
- Most admins did not build a habit around it.
- It relied too much on the user knowing the right prompt.
- It felt like help content beside the product, not help inside the product.

Plain line:

> It was correct enough to try once, but not useful enough to come back to.

### 4. Exploration 1: Make The Chat Better?

Say:

> The first exploration was the obvious one: can we make the chat better?

Show:

- Better empty state.
- Better suggested prompts.
- Thread history.
- Cleaner answer layout.
- More consistent assistant behavior.

Say:

> These changes mattered. They made CHAI feel more usable. But they also showed me the limit of improving the chat panel. Even with a better conversation, admins still had to know when to open it and what to ask.

Plain line:

> Better chat was useful, but it was not the full answer.

### 5. Roadmap: Find, Understand, Fix

Say:

> As we planned the next versions of CHAI, it was not just one help bot anymore. The roadmap was moving across three jobs: help admins find things, help them understand what is happening, and eventually help them fix problems.

Then:

> That is where routing became the real design problem. A help question, a search question, a report question, a data question, and a workspace troubleshooting question all need different context and different tools. If CHAI routes the question wrong, the answer can be generic or inaccurate.

Frame the challenge:

> So the question became: how might we scale CHAI's capabilities without making admins understand the assistant's internal routing?

What this slide should explain:

- CHAI was expanding from one assistant into multiple capabilities.
- Each capability needed different context and tools.
- The technical constraint was real: better answers depended on better context.
- The user problem was different: admins should not have to manage routing manually.

Plain line:

> The assistant was getting more powerful, but also harder to explain.

### 6. Decision 1: Turn Routing Into Skills

Say:

> After we had the Find, Understand, Fix roadmap, the next design problem was how to make those capabilities usable. Under the hood, each type of work needed different context and different tools. Search, report analysis, data questions, workspace issues, and troubleshooting could not all be handled the same way.

Then:

> The early version exposed that routing too directly. Users had to do something like `@Add context` to tell CHAI what it should use. That made sense technically, but it was not how admins thought about their work. They were not thinking, "I need to set assistant context." They were thinking, "I need help with this report," or "I need to understand this workspace issue."

Decision:

> So I changed the model from context-setting to Skills. Instead of asking users to route the assistant, CHAI showed what it could help with. When a user selected a skill, the welcome page changed: the intro text, suggested prompts, and next steps all became relevant to that skill.

How I would show it:

- Before: `@Add context` asks the user to understand the assistant's backend need.
- After: Skills explain the capability in user language.
- Skill selection sets the right context behind the scenes.
- The welcome page becomes dynamic based on the selected skill.
- Suggested prompts teach users what CHAI can do in that mode.

Why it mattered:

- It educated users without a tutorial.
- It made CHAI's capabilities easier to scan.
- It helped route users to the right context without asking them to manage context.
- It supported better tool use, data access, and answer accuracy.

Plain line:

> I turned a technical routing problem into a user-facing skill model.

### 7. Exploration 2: One Assistant Or Many Entry Points?

Say:

> Once the skill model was clearer, the next question was where CHAI should show up. We explored a few directions: one global assistant, page-level triggers, inline prompts, search-triggered prompts, and small AI entry points near the thing the admin was looking at.

What I was comparing:

- Global chat is easy to explain, but too disconnected.
- Page-level triggers are more relevant, but can become noisy.
- Inline prompts are helpful, but need to be scoped carefully.
- Search-triggered entry points fit an existing behavior.
- Report and dashboard entry points can start with stronger context.

Plain line:

> The question became: how much context can the product give CHAI before the admin has to type anything?

### 8. Decision 2: Meet The User Where They Are

Say:

> The decision was to meet users where they already were. If someone is searching, CHAI should understand the search. If someone is looking at a report, CHAI should understand the report. If someone is troubleshooting a workspace or device, CHAI should stay close to that evidence.

Then:

> That is what I mean by contextual AI here. Not a big abstract idea. Just this: the assistant should use the context the product already has, so the user does not have to explain everything from scratch.

Plain line:

> The entry point should already carry context.

### 9. Example 1: Smart Search

Say:

> Smart Search is the clearest example of meeting the user where they are. When admins did not know where something lived, they already went to search. So instead of asking them to open CHAI, I put CHAI into that moment.

Then:

> The key design choice was the handoff. If the admin searched for something and needed more help, we showed useful follow-up questions right there. When they clicked one, CHAI opened with the search context still attached.

Call out:

- The query was preserved.
- The follow-up questions were tied to the search.
- The assistant opened with context.
- Search stopped being a dead end.

Metrics:

- 86% drop in zero-result searches.
- 14% of total assistant entry points came from Smart Search.

Plain line:

> Smart Search worked because it fit into behavior admins already had.

### 10. Example 2: Reports

Say:

> Reports were the next place to apply the same idea. At first, we explored a few ways to let admins ask CHAI about report data: a general chat entry, a report-level button, a side panel, and a small sparkle directly on each report row.

Decision:

> We landed on the sparkle on each report row because it was specific. It told the admin: CHAI is going to use this report as context.

Why it worked:

- The entry point was close to the object.
- The context was obvious.
- The user did not need to explain which report they meant.
- CHAI could start with scoped questions and answers.

Plain line:

> The sparkle worked because it made the context visible.

### 11. Pattern Evolution: From Sparkle To Ask AI

Say:

> The first report pattern had a technical constraint: CHAI could use one report as context at a time. That was useful, but it was also limited. Admins often wanted to ask broader questions across reports.

Then:

> As the capability improved, the pattern evolved. We added `Ask AI` on the report page so users could ask questions across their reports. Then we extended the same pattern to analytics dashboards, where admins could ask questions about dashboard data and trends.

Show the pattern evolution:

- Report row sparkle: one report as context.
- `Ask AI` on Reports: questions across reports.
- `Ask AI` on Analytics Dashboards: questions about dashboard data and trends.

Plain line:

> The pattern grew as the system got better at handling context.

### 12. AI-Generated Reports

Say:

> AI-generated reports were the next step in that same workflow. The old flow was: generate a report, check the data, then ask CHAI what the report means.

Then:

> I wanted to flip that. Instead of starting with a form and ending with analysis, the admin could start with the question they actually had. CHAI could help generate a custom report with the metrics, filters, and insights they needed.

Decision:

> The important design choice was to keep the output reviewable. CHAI could generate the report, but the admin still needed to see what metrics, filters, schedule, and layout were selected before trusting it.

Plain line:

> We moved from "make a report, then ask for insight" to "ask for the insight, then generate the report around it."

### 13. Example 3: Apply The Pattern To Workspace And Device

Say:

> After search and reports, the same pattern applied to workspace and device troubleshooting. The question is rarely just, "What is wrong?" An admin needs to know what changed, who is affected, and whether this is one device, one room, or a bigger pattern.

Then:

> So I kept CHAI attached to the workspace or device page. That way, the evidence stayed visible. CHAI could summarize what the signals suggested, explain the impact, and suggest what to try next.

Call out:

- The assistant did not open as a generic chat.
- It stayed close to the workspace or device context.
- The admin could still see the evidence.
- The response focused on impact and next action.

Plain line:

> For troubleshooting, context is part of the answer.

### 14. What Changed

Say:

> The headline number is adoption. Adoption moved from 3% to 18%. Smart Search also reduced zero-result searches by 86%, and became 14% of total assistant entry points.

Then:

> But the more important thing is where people were using CHAI. They were not just opening a chatbot from a menu. They were entering from real moments of friction: a failed search, a report they needed to understand, a dashboard with a trend they wanted to explain, or a device issue they needed to troubleshoot.

Plain line:

> CHAI became useful when it stopped feeling like a separate destination.

### 15. My Takeaway

Say:

> My takeaway from this project is pretty simple: a blank chat box is not enough for enterprise software. In a product like Control Hub, the assistant needs to know where it is. It needs to show what it can do. It needs to show what it is using. And it needs to let the admin stay in control.

Then:

> I do not think good enterprise AI should feel magical. I think it should feel understandable enough that someone can act on it.

Keep this human. Do not turn it into three generic lessons.

### 16. Bridge To Agentic Work

Say:

> That leads into the second project. CHAI was mostly about helping admins understand what was happening. The agentic work asks the next question: if AI can understand the context, how should it help plan work, ask for approval, take steps, and show what changed afterward?

Bridge line:

> Project 1 is about understanding. Project 2 is about action.

## Simple Slide Titles

1. Control Hub AI Assistant
2. First, what is Control Hub?
3. The week after launch
4. Can we make the chat better?
5. Find, understand, fix
6. Turn routing into skills
7. One assistant or many entry points?
8. Meet the user where they are
9. Smart Search
10. Reports
11. From sparkle to Ask AI
12. AI-generated reports
13. Workspace and devices
14. What changed
15. My takeaway
16. From understanding to action

## Visuals I Need

- CHAI hero screenshot.
- Control Hub overview screenshot.
- CHAI v1 empty and answer states.
- Low-adoption metric: 3% weekly adoption.
- CHAI 1.0 / 2.0 comparison.
- CHAI roadmap: Find -> Understand -> Fix.
- CHAI 2.0 / 3.0 skill-based welcome and routing.
- `@Add context` exploration or before state.
- Skills-based welcome page with relevant suggested prompts.
- Entry point exploration or annotated flows.
- Contextual AI map across Search, Reports, Analytics, Workspace, and Devices.
- Smart Search tunnel.
- Report row sparkle exploration and final design.
- Report sparkle -> Ask AI on Reports -> Ask AI on Dashboards.
- AI-generated report prompt and generated report with insights.
- Device troubleshooting and workspace insight.
- Metrics slide.
- Agentic preview.

## Things To Fill In Later

- Confirm whether the adoption metric should be described as weekly, monthly, or both.
- A real screenshot or mock of `@Add context`.
- A clean visual of the Skills welcome page and skill-based suggested prompts.
- One before/after showing the report sparkle pattern evolving into `Ask AI`.
- One screenshot for AI-generated custom reports with insights.
- One sentence about how this contextual pattern carried into the Agentic project.
