# AGENTS.md — How this website works

A static business website. Next.js 16 (App Router) + React 19 + TypeScript
(strict) + Tailwind CSS 4, CSS motion, light and dark theme. Every piece of
content is TypeScript data in this repository; pages render at build time.
Deploys to Vercel (`build`) or any static host (`build:static` → `out/`).

**Any AI tool:** read `CLAUDE.md` before any work — it has the rules and
where the current work and its state are recorded. The skills in
`.claude/skills/` and commands in `.claude/commands/` are plain instructions:
in a tool without slash commands, follow the file when asked. To start or
continue a client site, follow `.claude/skills/aksumite-template/SKILL.md`. Use
the `senior-website-engineer` skill for implementation work.

## Where things live

| What                                                                                         | Where                                                                 |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Brand preset + overrides, logo, contact, socials, SEO, legal, form, conversion, hero         | `src/config/site.ts`                                                  |
| Homepage section order / on-off                                                              | `src/config/site.ts` (`homeSections`)                                 |
| Style presets (colors, surfaces, fonts, radius, buttons, spacing), supported fonts           | `src/config/presets.ts`                                               |
| Loaded fonts (written by `fonts:pin` / `fonts:all`); typed env access                        | `src/config/fonts.ts`, `src/config/env.ts`                            |
| Homepage copy (hero, section titles, CTA)                                                    | `src/data/home.ts`                                                    |
| About page and homepage about summary                                                        | `src/data/about.ts`                                                   |
| Services (cards, detail pages, icon, tag colour) and the services page                       | `src/data/services.ts`                                                |
| Projects (list, detail, gallery) and the projects page                                       | `src/data/projects.ts`                                                |
| Testimonials / partner logos / contact section copy                                          | `src/data/testimonials.ts`, `partners.ts`, `contact.ts`               |
| Privacy policy and terms wording (`reviewed` flag)                                           | `src/data/legal.ts`                                                   |
| Interface text: labels, buttons, form, 404/error, footer headings                            | `src/data/ui.ts`                                                      |
| Service icon set, tag colours                                                                | `src/lib/icons.ts`                                                    |
| Conversion buttons, visible homepage sections, canonical URLs, analytics                     | `src/lib/conversion.ts`, `home-sections.ts`, `seo.ts`, `analytics.ts` |
| Shared types                                                                                 | `src/types/content.ts`                                                |
| Pages / routes, sitemap, robots                                                              | `src/app/`                                                            |
| Components                                                                                   | `src/components/`                                                     |
| Favicon, Apple icon, default share image (generated from the logo)                           | `src/app/icon.tsx`, `apple-icon.tsx`, `og-default.png/`               |
| Images, logos                                                                                | `public/`                                                             |
| Security headers: Vercel / Apache (keep the two CSPs in sync)                                | `next.config.ts` / `public/.htaccess`                                 |
| Check and build scripts                                                                      | `scripts/`                                                            |
| Env variables (`NEXT_PUBLIC_SITE_URL`, optional GA ID and Search Console token)              | `.env.example` → `.env.local` (never committed)                       |
| Client documents (blueprint, brand guideline, logo, photos) → site, via `/aksumite-template` | `client/`                                                             |
| Client delivery: SOP, packages, launch checklist, deploy, handoff, project sheet             | `docs/` (start at `docs/sop.md`)                                      |
| Releases and upgrade notes                                                                   | `CHANGELOG.md`                                                        |

**Rule of thumb:** a client's content goes in `src/config/site.ts`,
`src/data/` and `public/`. Rarely anything else.

## Behavior rules

- An empty string in `site.ts` hides the related UI (no `social.whatsapp` →
  no WhatsApp link; no `contact.mapEmbedUrl` → no map; empty `booking.url` →
  no booking anywhere).
- `contactForm.provider` is `'web3forms'` (default) | `'formspree'` |
  `'none'`; `'none'` hides the form. With an empty `formKey` the form still
  shows and sending opens the visitor's email app, addressed to
  `contact.email` (`src/lib/contact-form.ts`). With a key the form posts
  from the browser to the provider, so it works on static hosts. Subject
  dropdown: "General question", the services from `services.ts`, "Other".
- `conversion: { primary, secondary }` (`'message'` | `'call'` | `'booking'` |
  `'whatsapp'` | `'telegram'` | `'none'`) drives the hero's main button
  (label `HOME_PAGE.heroPrimaryButtonText`), the CTA section and the header
  button (`src/lib/conversion.ts`). A primary whose detail is empty falls back
  to `message`. The hero's second button is always `heroSecondaryButton*`.
  Labels: `UI_TEXT.conversion`.
- `chat` is one floating button on every page: `'none'` | `'whatsapp'` |
  `'telegram'`. With `NEXT_PUBLIC_GA_ID`, `form_sent`, `call_click`,
  `booking_click` and `chat_click` are sent to GA.
- Homepage sections render in the order of `homeSections`; removing an id
  hides it. Services, Projects, Testimonials and Partners also hide when
  their data is empty. Nav and footer links with a matching `section` hide
  with them (`src/lib/home-sections.ts`). The footer Services column lists
  the first six services and hides with the services section.
- No client-facing text in `src/components` or `src/app`: labels go in
  `src/data/ui.ts`, client copy in the other `src/data/` files.
- Legal wording ships with `reviewed: false`; `check:placeholders` fails until
  the client (or a lawyer) approves it and it is set to `true`.
- The look comes from `brand.preset` (`corporate` | `warm` | `bold` |
  `minimal`); keys under `brand.colors` / `surfaces` / `fonts` / `shape`
  override it. `brand.surfaces.light` / `.dark` hold page, alternate section,
  card, border, heading, body and muted colors → `bg-surface-page`,
  `bg-surface-section`, `bg-surface-card`, `border-border-default`,
  `text-text-heading`, `text-text-body`, `text-text-muted`, which switch with
  the theme on their own (no `dark:` variant). `theme` is `'both'` (toggle) |
  `'light'` | `'dark'`.
- Values flow → CSS variables in `src/app/layout.tsx` → Tailwind tokens in
  `globals.css`: `bg-brand-primary`, `text-brand-accent`,
  `text-text-on-accent`, `text-on-primary` / `text-text-inverse` (text on
  brand-primary areas, from `brand.colors.onPrimary`; never `text-white`
  there), `rounded-*` (scaled from one radius), buttons
  `rounded-button px-btn-x py-btn-y text-btn`, sections `section-y`,
  `section-y-sm`, `page-header-y`. Do not hard-code brand hex/rgba values,
  radii or section padding in components; tint with
  `color-mix(in srgb, var(--brand-accent) 30%, transparent)`.
- Never style a card, page header or form field inline: use `Card`,
  `PageHeader`, `SectionHeading` and the surface tokens. No `bg-white`,
  `gray-*` or hex surfaces in components; overlays on brand-primary areas use
  `bg-on-primary/5`, `border-on-primary/10`.
- Logo (`site-logo.tsx`, navbar and footer): `logoShape` `'icon'` (24px mark
  in a 32px box, name beside it) | `'wide'` (wordmark alone, 32px high);
  `logoOnPrimary` is an optional light logo for those primary-colored areas.
  An empty `logo` is allowed: the name shows as text, the favicon its first
  letter, the share image the name alone, and `check:content` warns.
- Hero (`hero.tsx`): `hero.layout` is `'gradient'` (default, no photo) |
  `'image'` (full photo under a primary overlay, `hero.overlay` 0–1, text
  centred) | `'split'` (text left on primary, photo right fading in; under
  the text on phones). A photo layout with an empty `hero.image.url` shows the
  gradient. `hero.imagePosition` is the focal point, `hero.caption` an
  optional corner label.
- Footer bottom bar: agency credit (`credit` in `site.ts`; empty `name` hides
  it; client sites keep it as is), copyright, legal links; stacked below `md`.
- Legal pages (`legal-page.tsx`): sticky "On this page" index from `lg`,
  sections split by `SectionDivider`, anchors `#section-1`, `#section-2`, …
- Amharic letters use Noto Sans Ethiopic automatically on any preset
  (`ETHIOPIC_FONT` in `src/config/fonts.ts`); it is not a brand font choice.
- Lines between sections are `SectionDivider`: the theme's neutral
  `border-border-default`, never a brand color.
- Keyboard focus is one global `:focus-visible` outline in `globals.css`. Do
  not add `focus:outline-none` or focus rings in components.
- Form fields: an error is tied to its field (`aria-invalid`,
  `aria-describedby`); required fields carry `required`; results use
  `role="alert"` / `role="status"`. Keep this when adding a field.
- Every page sets its own canonical URL: `withCanonical(meta, '/path')` or
  `pageUrl('/path')` from `src/lib/seo.ts`. Never set `alternates` or
  `openGraph.url` in the root layout.
- Contrast minimums (`npm run check:contrast` after any color change): button
  text on accent ≥ 4.5; text on primary (and primary dark / light) ≥ 4.5;
  accent on primary ≥ 3; accent on the dark page ≥ 3; per theme, card on page
  and section ≥ 1.05 and heading, body and muted text on card, page and
  section ≥ 4.5. A light primary (yellow, pastel) needs a dark `onPrimary`.

## Client-specific pages and sections

Custom work (`docs/packages.md` → Extra work), listed in the project sheet's
**Custom work**. Built only from the shared blocks and tokens above, so the
client's colors, fonts, buttons, header, footer and dark mode follow.

**Relabel first.** A list shaped like services (title, short text, detail
page) — Practice Areas, Treatments, Products — is the services list with new
words: `src/data/services.ts` (page and entries), `HOME_PAGE.servicesTitle` /
`servicesSubtitle`, nav labels in `site.ts`, `UI_TEXT.eyebrows.services` and
`UI_TEXT.services.*`. The URL stays `/services/…`; renaming the route is
custom work. Projects work the same way (Case Studies, Portfolio). No code.

**Add a page** (e.g. `/equipment`):

1. Type in `src/types/content.ts` (the item, plus a page type with `meta:
PageMeta` and the header copy).
2. Data file `src/data/<name>.ts`: page copy and the list, typed, with
   `import type` only (`check:content` loads data files with plain Node,
   which cannot resolve `@/` values). Labels the page needs (eyebrow, button,
   field labels) go in `src/data/ui.ts`.
3. Route `src/app/<name>/page.tsx`: `metadata = withCanonical(PAGE.meta,
'/<name>')`; `<main className="bg-surface-page min-h-screen">` →
   `PageHeader` (breadcrumbs from `PAGE.meta.title`) → `section-y` /
   `section-y-sm` sections with `Container`, `SectionHeading`, `Card` in a
   `grid grid-cols-1 md:…` grid → `CTASection homePage={HOME_PAGE}` (copy
   `src/app/services/page.tsx`).
4. Detail pages, if each item has one: `src/app/<name>/[slug]/page.tsx` with
   `dynamicParams = false` and `generateStaticParams` returning
   `[{ slug: 'none' }]` when the list is empty (the static export fails on a
   dynamic route with no pages), `notFound()` for an unknown slug, and
   `withCanonical(…, '/<name>/<slug>')` (copy `src/app/services/[slug]/`).
5. Nav link in `site.navigation.desktop` (and `tablet` if it fits; the
   footer lists the desktop links on its own): `{ href: '/<name>', label }`,
   or `{ href: '/#<id>', label, section: '<id>' }` when there is also a
   homepage section (add the id first, section step 2).
6. Sitemap: add `/<name>` to `staticRoutes` and the detail pages, if any, in
   `src/app/sitemap.ts` (nothing else adds them).
7. `scripts/check-content.mjs`: import the data and add an entry to
   `contentSchemas` (required text, slugs; `checkUnique` for slugs;
   `checkImage` for images).
8. Images in `public/<name>/`; `images:optimize` does not cover new folders —
   supply them sized (see Images) or add the folder to its `TARGETS`.

**Add a homepage section** (e.g. Equipment on the homepage):

1. Component `src/components/<name>-section.tsx`: a server component;
   `<section id="<id>" className="section-y bg-surface-page">` (or
   `bg-surface-section` to alternate) → `Container` → `SectionHeading`
   (`reveal`, eyebrow from `UI_TEXT.eyebrows`) → `StaggerContainer` grid of
   `StaggerItem` + `Card`; return `null` when the list is empty. Copy
   `services-section.tsx` (it shows at most 6 cards and links to the page).
2. Id: add `'<id>'` to `HomeSectionId` in `src/config/site.ts`, and to
   `homeSections` where it should appear.
3. `src/app/page.tsx`: add `['<id>', () => <NameSection … />]` to `SECTIONS`;
   a full-bleed colored band also goes in `NO_DIVIDER`.
4. `src/lib/home-sections.ts`: add `['<id>', LIST.length > 0]` to
   `HAS_CONTENT` if the section depends on data, so it and its nav link hide
   when the list is empty.
5. Section title / subtitle in `src/data/home.ts`, with the two keys added
   to `HomePage` in `content.ts`. Nav link: page step 5.

Checks afterwards: `check:content`, `check:placeholders`, `validate`,
`build:static`, and the page and section at 390 and 1280 px in light and
dark.

## Images

| Image              | File / key                                    | Supply                                                             |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------ |
| Logo (optional)    | `public/logo.<ext>` (`site.logo`)             | Transparent PNG, JPG or SVG, ≥ 512×512 (icons are drawn from it)   |
| Share image        | generated `/og-default.png`, or `seo.ogImage` | Custom: 1200×630 PNG or JPG, < 300 KB, text in the middle 1000×530 |
| Favicon / Apple    | generated (`icon.tsx`, `apple-icon.tsx`)      | Nothing to supply                                                  |
| Hero photo         | `public/hero/` (`hero.image.url`)             | Landscape JPG / PNG / WebP; ≤ 550 KB after `images:optimize`       |
| Project main image | `public/projects/<slug>/` (`image`)           | 1600×1000 (16:10), < 300 KB                                        |
| Project gallery    | `public/projects/<slug>/` (`gallery[]`)       | 1200×900 (4:3), < 250 KB each                                      |
| Partner logos      | `public/partners/` (`logo`)                   | Transparent PNG or SVG, about 280×80                               |

Static hosts serve images as-is, so `npm run images:optimize` (run by
`/aksumite-template`) writes WebP: hero at most 1920 px plus a `-960.webp` phone
copy (served by `srcset`), projects at most 1600 px, partner logos at most
560×160, and warns when a file is still over its budget. Always fill `alt`.

## Responsive rules

- Supported widths: 360, 390, 768, 1024, 1280, 1536 px. No horizontal scroll
  and no overlapping elements at any of them.
- Text wraps, never overflows: flex/grid children holding text get `min-w-0`;
  long headings use `text-balance wrap-break-word`; no `whitespace-nowrap` on
  client copy. Every grid sets a base column (`grid grid-cols-1 md:…`).
- One exception: the navbar name is one line and truncates; the footer shows
  it in full.
- Only one `next dev` runs per folder; if a CSS change does not show, stop
  the server and delete `.next/dev`.

## Performance and motion

- Server components by default. `'use client'` only for browser state:
  navbar, theme provider and toggle, reveal observer, marquee, contact form
  (and its phone input and lazy loader), conversion tracker, page fade
  (`src/components/page-transition.tsx`) and the error boundary.
- Motion is CSS (`globals.css`): `animate-fade-up`, `animate-drift-*`,
  `animate-glow-pulse`, `animate-page-enter`, `glow-accent`, and
  `ScrollReveal` / `StaggerContainer` / `StaggerItem`; all off under
  `prefers-reduced-motion`. No animation library, no animated blur.
- The contact form chunk loads only when the form is on and the contact
  section is within 800px of the screen; phone flags are self-hosted in
  `public/flags/` (copied on `npm install`, gitignored).

## Commands

```bash
npm run dev                 # dev server
npm run build               # production build (Vercel / next start)
npm run build:static        # static export → out/ (cPanel, any static host)
npm run validate            # type-check + lint + format check
npm run check:placeholders  # leftover template text (exits 1 if found)
npm run check:contrast      # brand color contrast for presets and site.ts
npm run check:content       # empty text, slugs, missing images, colors, links, phones
npm run images:optimize     # hero, project and partner images → sized WebP
npm run fonts:pin           # load only the site's two fonts (fonts:all: every supported font)
npm run format              # Prettier write
```

When to run which check is set in `CLAUDE.md`. CI
(`.github/workflows/ci.yml`) runs `validate`, `check:contrast`,
`check:content` and `build:static` on every push.

## Conventions

- Kebab-case file names, strict TypeScript, no `any`.
- Reuse existing components (`Container`, `Card`, `PageHeader`,
  `SectionHeading`, `PremiumButton`, `ScrollReveal`, `SectionDivider`, …)
  before creating new ones.
- No new dependencies without asking.
- Never commit secrets. Form keys and GA IDs are public identifiers.
