import { iconResponse } from '@/lib/brand-images';

// Favicon generated from site.logo at build time (src/lib/brand-images.tsx)
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Icon() {
  return iconResponse(size.width, 40);
}
