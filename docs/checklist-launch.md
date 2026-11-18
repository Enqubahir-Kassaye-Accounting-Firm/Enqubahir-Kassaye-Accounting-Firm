# Launch checklist

Copy into the project sheet or tick here in the client repository. Used in SOP
step 4 (click-through, before the preview is sent) and step 7. Responsive
behaviour is checked once on the template, so client sites skip width-by-width
sweeps and full browser tests. Speed is measured once, on the live site.

## Fast checks (commands)

- [ ] `/aksumite-template` reports stage 3 (Launch)
- [ ] Logo: the client's real logo is in place, or name-only is the client's
      decision, recorded in the project sheet's **Decisions**
- [ ] `npm run check:placeholders` — no findings (it also flags any file or
      mention left from the template)
- [ ] `npm run check:contrast` — passes
- [ ] `npm run check:content` — passes
- [ ] CI is green on the client repository (GitHub → Actions)
- [ ] `npm run validate` — passes (type-check, lint, format)
- [ ] `.env.local` (and the host's environment, for Vercel) has
      `NEXT_PUBLIC_SITE_URL` set to the real `https://` domain
- [ ] The host's build passes: `npm run build` (Vercel) or
      `npm run build:static` (cPanel / static)

## Click-through (dev server or preview)

On a phone (or 390 px wide) and on a desktop:

- [ ] Every navbar and footer link opens the right page or section; no link to
      a hidden section remains
- [ ] Home: every enabled section shows real content, in the agreed order
- [ ] Every service and project page opens; images load and have alt text
- [ ] Contact details: phone and WhatsApp open the right number, email opens a
      mail to the right address, map shows the right place
- [ ] Social links and the chat button (WhatsApp or Telegram, if on) open
      the client's accounts
- [ ] Contact form (if enabled): a test message arrives at the client's address
- [ ] Light and dark theme both readable
- [ ] Privacy policy and terms show the right company, and `reviewed: true` is set (client approved, SOP step 6)
- [ ] Logo, favicon (browser tab) and business name are correct
- [ ] A wrong URL shows the 404 page

## After deploy (live domain)

- [ ] The site opens on `https://` with and without `www`; `http://` redirects
- [ ] `/sitemap.xml` and `/robots.txt` use the real domain
- [ ] Sharing the home URL (e.g. in Telegram or WhatsApp) shows the right
      title, description and image
- [ ] Contact form sends from the live domain (allowed domain set at the form
      provider)
- [ ] Security headers present (browser dev tools → Network → the page →
      Response headers: `Content-Security-Policy`, `X-Frame-Options`)
- [ ] PageSpeed (pagespeed.web.dev) run once; scores in the project sheet. Below
      75 mobile or 90 desktop: fix the simple things (oversized images), and
      fix anything that comes from the template in the template
- [ ] Search Console: site added to the company Google account and sitemap
      submitted (client added as an owner at handoff if they have a Google
      account; if this cannot be done, note why in the project sheet)
- [ ] Analytics (if set) records a visit
