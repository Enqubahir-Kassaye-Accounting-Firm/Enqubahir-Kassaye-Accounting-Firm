# Deploy

Two targets. The host comes from the project sheet. Previews are always on
Vercel, even when the live site will be on cPanel. Either way, set
`NEXT_PUBLIC_SITE_URL` to the real domain (`https://example.com`, no trailing
slash) before the production build: the sitemap, robots, canonical and Open
Graph URLs are built from it.

| Target               | Build                  | Headers from                          | Contact form        |
| -------------------- | ---------------------- | ------------------------------------- | ------------------- |
| Vercel               | `npm run build`        | `next.config.ts`                      | Formspree/Web3Forms |
| cPanel / static host | `npm run build:static` | `public/.htaccess` (copied to `out/`) | Formspree/Web3Forms |

## Vercel

1. Push the client repository to GitHub (private).
2. In Vercel: **Add New → Project**, import the repository. Framework: Next.js;
   keep the default build command and output.
3. **Settings → Environment Variables** (Production and Preview):
   `NEXT_PUBLIC_SITE_URL`, and if used `NEXT_PUBLIC_GA_ID`,
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. `.env.local` is not committed, so
   Vercel does not see it.
4. Deploy. Until launch, the project's `*.vercel.app` address is the preview
   for SOP step 4 (set `NEXT_PUBLIC_SITE_URL` to it); every push to `main`
   updates it.
5. **Settings → Domains**: add the domain and `www`; set the DNS records Vercel
   shows at the domain's registrar. Vercel issues HTTPS automatically.
6. Redeploy after changing an environment variable.

Account: create the Vercel project in the account agreed in the project sheet
(client-owned, or ours with a transfer at handoff — see
[`handoff.md`](handoff.md)).

## cPanel (or any static host)

1. Set the values in `.env.local`, then build:

   ```bash
   npm run build:static
   ```

   The `out/` folder is the whole site: plain HTML, CSS, JS and images, with
   `about/index.html`-style folders so clean URLs work without rewrites.

2. Check `out/.htaccess` exists (copied from `public/.htaccess`).
3. In cPanel **File Manager**, open `public_html` (or the domain's document
   root), remove the old files, and upload the **contents** of `out/` (zip it,
   upload, then **Extract**). Show hidden files to see `.htaccess`.
4. In cPanel **SSL/TLS Status**, run AutoSSL for the domain and `www` so HTTPS
   works; the `.htaccess` then redirects `http://` to `https://`.

### `public/.htaccess`

Apache (cPanel) only; other static hosts ignore it — set the same headers in
their panel or `_headers` file. It:

- redirects `http://` to `https://`;
- serves `404.html` for unknown URLs;
- sets the same security headers as `next.config.ts` (keep the two
  Content-Security-Policy lines in sync when either changes);
- caches `/_next/static/` for a year (the files are content-hashed) and HTML
  not at all, so updates show at once;
- compresses text files.

It does not force `www` or non-`www`; add that only if the client asks.

## After any deploy

Run the **After deploy** part of [`checklist-launch.md`](checklist-launch.md).
At the form provider, set the allowed domain to the live domain.
