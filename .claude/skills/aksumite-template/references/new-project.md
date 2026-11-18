# New project: setup and version 1

Read only when `SKILL.md` sends you here. Its rules still apply.

## Show the plan first

Find the client's folder by matching this project's folder name under `5 Clients`. If it is unclear, ask. Check the handover folder, then show Biniam in a few lines:

- Client name, slug (kebab-case, from the name) and this project's path
- Blueprint: found or missing. Brand Guideline: found, or skipped
- Logo: found, or none yet (the name shows as text until it arrives)
- Photos: how many
- Any Word file newer than its `.md` (see below)
- Anything under **Missing** in the Blueprint's section 5. Those items block version 1, so ask how to handle each one
- What you will do: the setup and build steps below

**The Blueprint is required.** If there is no `blueprint.md` in the handover folder, ask Biniam for it and stop. Nothing is built by guessing. If only `blueprint.pdf` is there, say so and ask for the `.md`; use the PDF only if Biniam says to, because it costs more to read.

**Stale check.** `blueprint.md` and `brand.md` are the text the Word files were made from. If `<Client> - Project Blueprint.docx` or `<Client> - Brand Guideline.docx` in `Working` is newer than its `.md`, warn Biniam: edits made in Word are not in the `.md`, so the site would be built from old text. Ask before continuing.

Wait for Biniam to say go.

## Set up

Check once more that the path does not contain `Aksumite Templates`. Then:

1. If a `.git` folder exists, delete it. This removes only this copy's link to the template's history. Then `git init -b main`.
2. `npm ci`
3. `npm run client:init -- <slug>`. It removes what only the template needs and fills the slug and version in the sheet.
4. Copy the handover folder's contents into `client/`.
5. Fill **Project** in the sheet with what is known: client, package, host. Leave the rest empty.
6. Ask Biniam once whether tasks 0 and 1 are done (agreement, deposit and group; kickoff call). Tick what Biniam confirms. Tick task 3. For task 2, tick it if `client/brand.md` exists, otherwise write `- [x] 2. Brand Guideline — skipped — YYYY-MM-DD`. Skipped counts as done.
7. Commit: `Start <client> from template <version>`.
8. Ask Biniam for the link to the empty private GitHub repository. Biniam creates it; never create one yourself. Save it as **GitHub repository** and commit, then `git remote add origin <link>`. If `git ls-remote origin` shows it is not empty, stop and ask. **Safe push**.

If setup stops partway, check which of these steps are already true, and do only the rest. Step 1 never runs again once `scripts/client-init.mjs` is gone.

## Build version 1

Run each step only if its line in the sheet's **Build progress** is unticked. Tick it (`- [x] … — YYYY-MM-DD`) and commit straight away when it finishes, so closing a tab loses at most the step in progress. Version 1 is finished only when every line is ticked.

**Before the first unticked step, read in this order and no more:**

- `client/blueprint.md`, all of it
- `client/brand.md`, if present: only logo use, color, typography and voice
- The files that step fills: `src/config/site.ts`; `src/data/` (`home.ts`, `about.ts`, `services.ts`, `projects.ts`, `testimonials.ts`, `partners.ts`, `contact.ts`) and `src/types/content.ts`. Search `src/config/presets.ts` for the preset names and `SUPPORTED_FONTS`, and `src/lib/icons.ts` for the `SERVICE_ICONS` and `TAG_STYLES` names, rather than reading them whole

Their comments and types say what each key is for. Do not read components, `ui.ts` or `legal.ts`.

**What goes where:**

- **Blueprint words to values.** Hero: Gradient → `gradient`, Full photo → `image`, Split → `split`. Theme: Light and dark → `both`, Light only → `light`, Dark only → `dark`. Leave out the `(client)` and `(research: …)` source notes; they never appear on the site.
- **First-draft copy is allowed.** Headlines, intros, service descriptions and About text may be written from the Blueprint's facts, in the Brand Guideline's voice. List every drafted block in `docs/ask-client.md`.
- **Testimonials, projects, partners, team.** Only what the documents give, with name and company for a testimonial. None → an empty list, and the section hides.
- **Brand.** Pick the preset closest to the direction. Write into `brand.colors`, `brand.surfaces` and `brand.fonts` only values that differ from it. Fonts must be in `SUPPORTED_FONTS`; a guideline font that is not → the closest one, reported. A light primary needs a dark `onPrimary`.
- **Hero photo.** A photo layout needs a landscape photo from `client/photos/`, otherwise use `gradient` and report it.
- **Contact form.** `provider: 'web3forms'` with `formKey: ''`. The form stays hidden until the client's own key arrives at launch. Use `''` for anything not given: empty values hide their UI.
- **Legal.** `site.legal` from the Blueprint; `lastUpdated` is this month; `reviewed` stays `false`.
- **Extra pages or sections.** Build nothing yet. Add each to **Custom work** in the sheet: `- [ ] <name>: <page / section> — quote <ref>`.
- **Site details.** If the documents do not give the registered name, jurisdiction and court location, second main action, chat button (WhatsApp / Telegram / none), booking link, map location or languages, put each in `docs/ask-client.md`.

**The steps:**

1. **Images.** See **Logo and photos** in `SKILL.md`. Then `npm run images:optimize` and use the `.webp` paths it prints. Write alt text from what each photo shows.
2. **`src/config/site.ts`.**
3. **`src/data/`.** Replace every template sample.
4. **`.env.local`.** Copy `.env.example` if it is missing. `NEXT_PUBLIC_SITE_URL` from the Blueprint's domain, if known. Keep other lines.
5. **Fonts and format.** `npm run fonts:pin`, then `npx prettier --write src/config src/data`.
6. **Checks.** `npm run check:contrast`, `npm run check:content`, `npm run check:placeholders`, `npm run validate`, `npm run build:static`. Keep only each command's last 15 lines, or its failures, because long output costs allowance. Fix what you caused and rerun. `check:placeholders` keeps listing the legal wording until the client approves it; that is expected.
7. **Ask the client list.** Finish `docs/ask-client.md`.
8. **Push and report.** **Safe push**, then update **Current state**: set **Waiting on** to the click-through and preview. Task 4 is ticked only once the preview is sent.

**Report** in short sections: **Built** (one line per area), **Ask the client** (the file's path and how many items), **Checks** (the real results), **For launch** (env vars for the host, the client's Web3Forms key, legal approval, anything reported above).

## `docs/ask-client.md`

```
# <Client> - Ask the client

## Missing facts
- <page>: <what we need, and why>

## Drafted text to confirm
- <page / section>: <what we wrote without the client's words>
```
