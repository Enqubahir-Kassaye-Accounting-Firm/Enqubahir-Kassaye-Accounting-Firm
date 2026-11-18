/**
 * Page URLs for canonical tags and the sitemap.
 * Every page sets its own canonical (the root layout sets none, or every page
 * would inherit the homepage's). The static export serves pages with a
 * trailing slash (next.config.ts), so its URLs end in '/' too.
 */

import type { Metadata } from 'next';
import { siteUrl } from '@/config/env';

const trailingSlash = process.env.STATIC_EXPORT === 'true';

/** Absolute URL of a page, e.g. pageUrl('/about') → 'https://example.com/about/' on a static host */
export function pageUrl(path: string): string {
  if (path === '/') return `${siteUrl}/`;
  return `${siteUrl}${path}${trailingSlash ? '/' : ''}`;
}

/** Page metadata plus the page's own canonical URL */
export function withCanonical(meta: Metadata, path: string): Metadata {
  return { ...meta, alternates: { canonical: pageUrl(path) } };
}
