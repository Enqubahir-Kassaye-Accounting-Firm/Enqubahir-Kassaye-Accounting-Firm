# Client Project Sheet — [Client name]

The client's task list and state, kept at `docs/client-project-sheet.md` in the
client repository (filled by `npm run client:init`, SOP step 4). Site content
comes from the documents in `client/`; this sheet holds the agreement, tasks,
decisions and approvals.

Every session starts at **Current state** and, before ending, ticks the tasks it
finished (`- [x] … — YYYY-MM-DD`) and rewrites Current state.

## Current state

- **Stage:** 1. Prepare
- **Last done:** Version 1 polished (logo, favicon, two-line name, hero card, contact form with email fallback, share image) and pushed to GitHub — 2026-11-18
- **Next task:** Vercel preview and click-through (task 4), then send the link
- **Waiting on:** nothing from the client; Biniam to approve the Vercel preview
- **Blockers:** none. Tasks 0 and 1 stay unticked: surprise build, no agreement or kickoff yet.

## Project

| Field                      | Value                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------- |
| Client                     | Enqubahir Kassaye Authorized Accounting Firm                                           |
| Client slug                | enqubahir-kassaye-accounting-firm                                                      |
| Package                    | Digital Presence (surprise build)                                                      |
| Template version (tag)     | v1.6.0                                                                                 |
| Deposit paid (date)        |                                                                                        |
| Group (Telegram/WhatsApp)  |                                                                                        |
| Decision maker             |                                                                                        |
| GitHub repository          | https://github.com/Enqubahir-Kassaye-Accounting-Firm/Enqubahir-Kassaye-Accounting-Firm |
| Logins stored at           |                                                                                        |
| PageSpeed (mobile/desktop) |                                                                                        |
| Host (Vercel / cPanel)     | Vercel                                                                                 |
| Preview URL                |                                                                                        |
| Live URL                   |                                                                                        |
| Final payment (date)       |                                                                                        |

## Tasks

One per [`sop.md`](sop.md) step; the step has the details. The stage is the
first group with an unticked task.

**Stage 1 — Prepare**

- [ ] 0. Proposal confirmed in writing or agreement signed; deposit paid; group
     created
- [ ] 1. Kickoff call done, summary sent; logo and photos received or requested
- [x] 2. Brand Guideline done (or `skipped`, which counts as done) — 2026-11-18
- [x] 3. Blueprint done — 2026-11-18

**Stage 2 — Build and review**

- [ ] 4. Version 1 built (`/aksumite-template`), click-through done, preview sent
- [x] Custom work below built and ticked (skip if none) — 2026-11-18
- [ ] 5. Review call held, Website Review sent
- [ ] 6. Revisions applied (logged below); client wrote **Approved**; legal
     `reviewed: true`

**Stage 3 — Launch**

- [ ] 7. Final payment, form key, launch checklist (PageSpeed, Search Console),
     live; client confirmed
- [ ] 8. Handoff Guide (and Brand Guideline, if made) sent, accounts recorded,
     `delivered-*` tag; testimonial asked

## Build progress

Version 1, saved as it is built. It is finished only when every line is ticked.
A ticked line is never generated again, so the client's corrections are safe.

- [x] Images placed and optimized — 2026-11-18
- [x] `src/config/site.ts` filled — 2026-11-18
- [x] `src/data/` filled — 2026-11-18
- [x] `.env.local` set — 2026-11-18
- [x] Fonts pinned and files formatted — 2026-11-18
- [x] Checks pass — 2026-11-18
- [x] `docs/ask-client.md` saved — 2026-11-18
- [x] Pushed and reported — 2026-11-18

## Messages

Each is offered once, when its moment arrives, and ticked when it has been sent.

- [ ] Version 1
- [ ] Website Review
- [ ] Revisions applied, round 1
- [ ] Revisions applied, round 2
- [ ] Site live
- [ ] Handoff
- [ ] Testimonial request
- Last check-in: —

## Custom work

Agreed extra work beyond the package ([`packages.md`](packages.md) → Extra
work): one line each, with the quote reference, e.g.
`- [ ] Equipment page + homepage section — quote Q-012`.

Surprise build: shown to the client on a Vercel link before kickoff, no quote reference.

- [x] Partners strip (homepage band after Services, footer link only) — quote none, surprise build — 2026-11-18
- [x] Accounting Tips page + homepage section — quote none, surprise build — 2026-11-18
- [x] Tax Filing Do's & Don'ts page + homepage section — quote none, surprise build — 2026-11-18
- [x] Useful Websites page + homepage section — quote none, surprise build — 2026-11-18
- [x] Testimonials carousel (Mekan PLC style) — quote none, surprise build — 2026-11-18

## Approvals and revisions

| Date | What                   | By  | Note |
| ---- | ---------------------- | --- | ---- |
|      | Revision round 1       |     |      |
|      | Revision round 2       |     |      |
|      | Approved (incl. legal) |     |      |
|      | Live site confirmed    |     |      |

## Decisions

Anything agreed that the Blueprint or package does not show (extra work quoted,
a declined request, a value outside an allowed list).

| Date       | Decision                                                                                                         | Reason                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 2026-11-18 | Contact form shows without a Web3Forms key; sending opens the visitor's email app addressed to the company email | Biniam wants the form visible in the surprise build; real delivery needs the client's own key |
| 2026-11-18 | Navbar links go to homepage sections; each section's button opens the full page                                  | Biniam's direction                                                                            |
| 2026-11-18 | Hero headline, card and two-line logo name follow Biniam's mockups                                               | Biniam's direction; wording to confirm with the client                                        |

## Handoff record

| Item                     | Managed by / account | Renews | Done (date) |
| ------------------------ | -------------------- | ------ | ----------- |
| Domain                   |                      |        |             |
| Hosting                  |                      |        |             |
| Source code              |                      | —      |             |
| Contact form (Web3Forms) |                      | —      |             |
| Analytics                |                      | —      |             |
| Search Console           |                      | —      |             |

## Change log after handoff

| Date | Request | Included / quoted | Deployed |
| ---- | ------- | ----------------- | -------- |
|      |         |                   |          |
