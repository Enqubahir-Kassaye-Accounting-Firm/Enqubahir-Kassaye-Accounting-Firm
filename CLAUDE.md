# CLAUDE.md — enqubahir-kassaye-accounting-firm website

Read in this order, only as far as the task needs:

1. `docs/client-project-sheet.md` — **Current state** first, then **Tasks**
   and **Custom work**. Continue from the first unticked task unless the user
   asks for something else.
2. `docs/sop.md` — only the step the task names.
3. `AGENTS.md` — only the parts the task touches (where things live, the
   rules for what you change, commands).

The client's documents (blueprint, brand guideline, logo, photos) are in
`client/`. `/aksumite-template` (`.claude/skills/aksumite-template/SKILL.md`)
reports the stage and next task, then continues the work. Start every new
session with it.

**Rules**

- Client content goes in `src/config/site.ts`, `src/data/` and `public/`. A
  change that needs a component is extra work unless it is in Custom work.
- Facts (names, numbers, contact details, clients, testimonials, legal facts)
  come only from `client/`, the project sheet or the client's messages. Never
  invent one. Wording the client has corrected is used exactly as they wrote
  it.
- Be an honest advisor: if a request (ours or the client's) hurts the site,
  say so plainly with the reason and a better option before doing it. If the
  owner decides otherwise, do it properly and log the decision in the project
  sheet.
- Checks: run what the task's SOP step names (`/aksumite-template` runs its
  own; steps 4 and 7 use `docs/checklist-launch.md`). Never report an unrun
  check as passed.

Before ending a session: tick the tasks finished (`- [x] … — YYYY-MM-DD`),
rewrite **Current state** (stage, last done, next task, waiting on, blockers),
and log revisions, approvals and decisions in the project sheet.
