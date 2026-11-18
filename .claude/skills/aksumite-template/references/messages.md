# Client messages and the Website Review

Read only when a message is due or Biniam asks for one. `SKILL.md`'s rules still apply.

You draft. Biniam reads and sends. Never contact a client yourself. Tick a line under **Messages** in the sheet (`- [x] … — YYYY-MM-DD`) only when Biniam says it was sent, then show nothing more for that line.

## How messages sound

Written as Biniam, to the **Decision maker** in the sheet, in their group. Warm and short, a few lines at most, with one clear thing to do. Use the exact links and dates from the sheet. Say only what is true right now. English by default. Amharic if Biniam asks, and Biniam checks all Amharic. Keep the greeting and sign-off below; write the middle for this client.

## The messages

**Version 1**

> Hey [Name] 👋 Your website's first version is ready: [Preview URL]
>
> Take a look, and let's go through it together on a short Google Meet. What day and time suits you?
>
> Have a great day! 🙌

**Website Review** goes in the group after the review call. See below.

> Hey [Name] 👋 Thanks for your time today. Here's the Website Review we talked about. Please send everything back here by [Reply by], as one message or one document.
>
> Have a great day! 🙌

**Revisions applied**, once per round

> Hey [Name] 👋 Your changes are done: [Preview URL]
>
> Please check them and send anything else here by [date]. If you're happy with it, just write **Approved**. That also covers the Privacy and Terms pages.

Round 2 is the last included round, so say so. Do not ask for **Approved** if the client still owes facts from the Website Review; ask for those instead.

**Site live**

> Hey [Name] 🙌 Your website is live: [Live URL]
>
> Please open it and confirm everything looks right.

**Handoff**, once `aksumite-handoff` has made the Guide

> Hey [Name] 👋 Here's your Handoff Guide, with everything about your website in one place. [If a Brand Guideline was made: We've also prepared your Brand Guideline, as our gift to you.] Login details come separately.

Passwords never go in this message or the group.

**Testimonial request**, 3 to 5 days after the handoff

> Hey [Name] 👋 Hope the new website is treating you well! Would you write us a few lines about working with us? It would mean a lot.

Biniam may attach `<root>\4 Delivery\Templates\DA - Testimonial Samples - Short (General, EN+AM).pdf` or `<root>\2 Marketing\Ready to Send\DA - How to Leave a Google Review.pdf`. Ask which, if any.

**Weekly check-in**, when waiting on the client

> Hey [Name] 👋 Hope your week is going well! Just checking in on [the one thing we are waiting for]. Let me know if anything's holding it up.

## The Website Review

Only after the review call, unless Biniam says to send it sooner. Make it once. It needs Windows and Word; elsewhere, stop at the text and tell Biniam.

1. Write `<client folder>\Working\review-text.md` from `docs/ask-client.md`:

```
Business name:
Date: <Month D, YYYY>
Preview link:
Reply by: <5 working days after sending>
Group: <Telegram or WhatsApp>
Pages: <the site's real pages, separated by commas>
Structure: <what we left out that they may expect, in a few words>
Name: Biniam

## What we need
- <Topic>: <exactly what, and why>

## Please check
- <Page or topic>: <quote what we wrote; give both options when sources disagree>
```

Only questions about this site, in plain words, one line each where possible. Name the page and quote what we wrote. No question the Blueprint already answers. Missing facts go under **What we need**, drafted text under **Please check**. The client must not see "to confirm", source notes or our internal words.

2. Show Biniam the text and wait for approval.
3. Fill it, then look at the PDF:

```
powershell -NoProfile -ExecutionPolicy Bypass -File "<skill>/scripts/fill-review.ps1" -Action fill -Template "<root>\4 Delivery\Templates\DA - Client Requirement Gathering.docx" -Doc "<client folder>\Working\<Client> - Website Review.docx" -Text "<client folder>\Working\review-text.md"
powershell -NoProfile -ExecutionPolicy Bypass -File "<skill>/scripts/fill-review.ps1" -Action pdf -Doc "<client folder>\Working\<Client> - Website Review.docx" -Out "<client folder>\Working\<Client> - Website Review.pdf"
```

`<skill>` is this skill's folder. The script writes nothing if something is missing, and never overwrites a file. To redo one, add `-Replace`, which keeps the old file under a dated name; if Biniam edited the Word file, warn that those edits will not carry over.

4. Ask Biniam to open the Word file and confirm. Copy the PDF to `Sent to Client` only when Biniam says so.
5. Draft the message above. When Biniam says it was sent, tick the line, set **Waiting on** to the client's reply, and tick task 5 if the review call was held.

When the client replies, apply the answers, and remove them from `docs/ask-client.md`.
