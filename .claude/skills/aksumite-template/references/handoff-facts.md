# Handoff facts

Read only at SOP step 8. Write everything the Handoff Guide needs into one file, so the `aksumite-handoff` skill can make the Guide from that file alone, without opening this project.

Save it as `<client folder>\Working\handoff-facts.md`. If it already exists, show Biniam what would change and ask first.

Take each fact from the sheet (**Project**, **Handoff record**, **Decisions**), `src/config/site.ts` and `src/data/`. Never guess. A fact you cannot find says `To confirm`, and goes under **To confirm** too. Then ask Biniam for those, one at a time.

**Never write a password in this file.** Name the logins only. Passwords go to the client separately.

```
# <Client> - handoff facts
Client:
Project: <the project's name>
Type: Website
Package: Digital Presence
Live URL:
Date live:
Language:
Group: <Telegram or WhatsApp>
Decision maker:
Brand Guideline made: <Yes, with its PDF's path, or No>

## What was built
- <Page or feature>: <one line on what it does for this client>

## Domain
Managed by: <Digital Aksumite or Client>
Domain:
Registrar:
Login URL:
Username:
Renewal date:

## Hosting
Managed by: <Digital Aksumite or Client>
Provider:
Control panel URL:
Username:
Renewal date:

## Contact form
Provider: Web3Forms
Messages go to: <email>

## Other accounts
Analytics:
Search Console:
Source code: <repository and delivered tag>

## Logins to send separately
- <what the login is for, with no password>

## To confirm
- <anything still unknown>
```

Write `Not used` for a fact that does not apply. List every page and any custom work under **What was built**, in plain words a client understands, with facts rather than praise.

Then tell Biniam the file is ready, and that the next step is `/aksumite-handoff <Client>` in a new tab.
