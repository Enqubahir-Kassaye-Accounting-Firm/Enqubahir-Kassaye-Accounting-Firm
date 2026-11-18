import { ogImageResponse } from '@/lib/brand-images';

// Default share image (/og-default.png), generated from the logo, name and tagline.
// site.seo.ogImage points here unless the client supplies their own image.
export const dynamic = 'force-static';

export function GET() {
  return ogImageResponse();
}
