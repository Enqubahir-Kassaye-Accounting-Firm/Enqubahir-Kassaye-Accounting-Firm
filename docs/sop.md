# SOP — Deposit to handoff

The one path for delivering a Digital Presence website from this template.

- **Starts** when the 50% deposit is paid. **Ends** when the site is live, the
  final 50% is paid and the Handoff Guide is sent.
- **Before the deposit:** a Digital Presence client in Ethiopia confirms the
  Proposal in writing. Bigger packages and international clients sign the
  Service Agreement; the owner may also require it on any risky project.
- **One group per client:** Telegram by default, WhatsApp if the client prefers
  it. Files, links, review lists and approvals all go there.
- **Update the client at each stage:** kickoff done, version 1 ready, revisions
  applied, site live. While waiting on the client, check in once a week.
- **Days are our working days.** While we wait on the client, the clock stops.
- The kickoff questions and the Brand Guideline, Blueprint, Website Review and
  Handoff Guide templates are business documents kept outside this repository.
- In the client repository, `/aksumite-template` starts every new AI session.

| #   | Step                       | Day           | Uses                            |
| --- | -------------------------- | ------------- | ------------------------------- |
| 0   | Start                      | 0             | —                               |
| 1   | Kickoff call               | 0–1           | Kickoff questions               |
| 2   | Research + Brand Guideline | 1–2           | Brand Guideline template        |
| 3   | Blueprint                  | 2             | Blueprint template              |
| 4   | Build version 1            | 3–4           | `/aksumite-template`, checklist |
| 5   | Review                     | 5             | Website Review template         |
| 6   | Revisions (2 rounds)       | 1–2 per round | —                               |
| 7   | Launch                     | 1             | Launch checklist, `deploy.md`   |
| 8   | Handoff                    | same day      | Handoff Guide, `handoff.md`     |

Our time is about 6–8 working days, plus the client's reply time.

## 0. Start

Proposal confirmed in writing (or Service Agreement signed) and deposit
received. Create the group with the client.

## 1. Kickoff call — 15 min

Fill the kickoff questions from research first; on the call confirm those and
ask the rest. Name one decision maker on the client's side. Ask for the logo,
photos and any brochure in the group. Within 24 hours, send a written summary of
what was agreed.

## 2. Research + Brand Guideline — 1–2 days

Research the client's existing presence (Google, social pages, old site,
brochure). Fill the Brand Guideline template from it.

## 3. Blueprint — same day

Fill the Blueprint template from the kickoff answers and research. Save both
documents as PDF. A client who needs only a website may skip step 2; a Blueprint
is always required.

## 4. Build version 1 — 1–2 days

Copy the template folder into a new folder named after the client. Create an
empty private GitHub repository for it. Then, in Claude in that folder:

```text
/aksumite-template
```

It shows its plan, and after your go it sets up the project, asks for the
repository link, builds the site from the client's handover folder and saves
`docs/ask-client.md`. Build any **Custom work** (`AGENTS.md` → Client-specific
pages and sections). A client with no logo yet is fine: the name shows as text
until it arrives. Run `npm run dev` and work
through the **Click-through** part of [`checklist-launch.md`](checklist-launch.md),
then deploy a Vercel preview ([`deploy.md`](deploy.md)).

## 5. Review — 1 day

Walk the client through the preview on Google Meet. Then send the
Website Review (made from `docs/ask-client.md`) in the group. The
client replies within 5 working days, in one message or document.

## 6. Revisions — 2 rounds included

Each reply is one round: apply the whole list in `site.ts`, `src/data/` and
`public/`, redeploy the preview, log the round in the project sheet. A request
outside the package is quoted first ([`packages.md`](packages.md)).

The step ends when the client writes **Approved** in the group. That approval
covers the Privacy and Terms pages: set `reviewed: true` on both in
`src/data/legal.ts`, and log the approval.

## 7. Launch — 1 day

1. Final 50% received. Normally before going live; an exception is the owner's
   call and goes in the project sheet's **Decisions** with the reason.
2. The client's Web3Forms key into `site.contactForm.formKey`; domain set up.
3. [`checklist-launch.md`](checklist-launch.md) top to bottom.
4. Deploy to the domain ([`deploy.md`](deploy.md)), then the **After deploy**
   checks on the live site, including PageSpeed and Search Console.
5. The client confirms the live site in the group. Log it.

## 8. Handoff — same day

`/aksumite-template` writes `handoff-facts.md` in the client's company folder, and
`/aksumite-handoff <Client>` makes the Handoff Guide from it. Send the Guide (and the
Brand Guideline, our gift, if one was made). Passwords go
separately, never in the guide. Record the accounts in the project sheet
([`handoff.md`](handoff.md)) and tag the delivery:

```bash
git tag delivered-YYYY-MM-DD
git push --tags
```

Three to five days later, ask for a testimonial.

## When something does not fit

- A fact the Blueprint has no place for: put it in the project sheet's
  decisions, and tell the template owner so it can become a template roadmap
  item.
- A template bug found while delivering: fix it in the template repository,
  release a new version, and note the version change in the project sheet.
