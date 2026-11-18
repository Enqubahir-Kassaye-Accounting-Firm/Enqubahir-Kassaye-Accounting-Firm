# Handoff

What the client receives at SOP step 8, how they ask for changes afterwards,
and what the first year covers. Record each item in the project sheet's
**Handoff record**.

## What the client receives

- **The Handoff Guide** (business template, filled per client): what was
  built, their accounts, how changes work, their first year, how to reach us.
- **The Brand Guideline**, as a gift.
- **Passwords, sent separately** (in person or a private message), never in
  the guide or a group chat. The client changes them on first login. We never
  ask for the client's own email password.

| Item           | Record in the project sheet                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| Domain         | Managed by us or the client; registrar; renewal date                                      |
| Hosting        | Vercel or cPanel; managed by us or the client; renewal date                               |
| Source code    | The client repository, tagged `delivered-YYYY-MM-DD`                                      |
| Contact form   | Web3Forms account in the client's email; messages arrive there                            |
| Analytics      | In the client's Google account, if set up                                                 |
| Search Console | In the company Google account; the client added as an owner if they have a Google account |

## Change requests after handoff

- The client sends one message in the project group with every change they
  want.
- Small content updates (text, photos, contact details) are included in the
  first year. Anything else — new pages, features, design changes — is quoted
  first ([`packages.md`](packages.md)).
- The change is made in `site.ts`, `src/data/` or `public/`, redeployed
  ([`deploy.md`](deploy.md)), checked with the **After deploy** list, and
  logged in the project sheet's **Change log after handoff**.

## After the first year

Before the first year ends, agree the next year's plan with the client:
domain, hosting, maintenance and updates, for a yearly fee. Nothing renews
without that agreement.
