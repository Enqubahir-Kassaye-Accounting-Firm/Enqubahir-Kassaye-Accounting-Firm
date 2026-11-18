import { iconResponse } from '@/lib/brand-images';

// Apple touch icon generated from site.logo at build time; iOS rounds the corners itself
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return iconResponse(size.width, 0);
}
