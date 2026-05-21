# SAP Fieldglass

*Concise showcase source for `/works/sap-fieldglass`.*

SAP Fieldglass is an enterprise SaaS platform for managing external workers, vendors, and statements of work at scale.

My work focused on a simple tension: hiring managers were a major user group, but many of them did not live in the product every day. Fieldglass had to make the next action obvious without asking them to become power users.

## Reframe

The first asks were narrower: update homepage widgets for SAP UI5, improve Global Search, and refresh worker details. Research pointed to a different opportunity. Search was hard to improve without heavy backend work, and it still did not help users decide what to do next.

I regrouped with the PM and engineering lead and proposed a dashboard direction instead: role-based templates, surfaced work items, worker signals, and actions grounded where the user already was.

## Homepage

I mapped four core personas - Hiring Manager, PMO, Financial Approver, and System Admin - to their top jobs, then translated those jobs into template layouts.

The homepage became a modular SAP UI5 card framework. Customers could start with a best-practice layout and then use a layout manager to tailor the experience by role.

## Worker Management

For hiring managers, I designed a worker dashboard that gathered the information they usually had to hunt for: worker status, pending tasks, key dates, spend signals, and team-level alerts.

The important shift was in-place action. The To-dos area showed what needed attention and kept the work on the dashboard instead of sending users through search or reports.

## Worker Profile

I also redesigned the worker profile overview into scannable cards. Status, spend, work order duration, timesheets, documents, and alerts all became visible in one pass.

The profile page was not trying to be lighter. It was trying to make a dense object legible faster.

## Outcome

The redesigned homepage launched as a modular framework and was adopted by more than 1,000 enterprise customers.

The durable result was a stronger default path: the right work, worker context, and role-specific shortcuts were available before users had to configure anything.

## Reflection

This project taught me to treat technical migrations as leverage. A UI framework update can stay cosmetic, or it can become a chance to change what the product asks of users.

For enterprise software, configuration is not the answer until the default is good. The best defaults carry expertise quietly: the right actions, data, and escape hatches already in the first view.
