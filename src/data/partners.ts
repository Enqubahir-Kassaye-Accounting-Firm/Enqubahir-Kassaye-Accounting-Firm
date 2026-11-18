/**
 * Trusted Partners / Clients
 * Shown as a scrolling logo strip after Services.
 * Version 1 uses made-up neutral logos (public/partners/) so the client can see
 * where his real partners will go. They are not real businesses: replace them
 * with real logos, or empty the list to hide the strip.
 */

import type { Partner } from '@/types/content';

export const PARTNERS: Partner[] = [
  { name: 'Northfield', logo: '/partners/northfield.svg' },
  { name: 'Lumen Group', logo: '/partners/lumen-group.svg' },
  { name: 'Kora & Co', logo: '/partners/kora-co.svg' },
  { name: 'Meridian', logo: '/partners/meridian.svg' },
  { name: 'Bluepeak', logo: '/partners/bluepeak.svg' },
  { name: 'Harbor Point', logo: '/partners/harbor-point.svg' },
  { name: 'Sable', logo: '/partners/sable.svg' },
  { name: 'Vertex Holdings', logo: '/partners/vertex-holdings.svg' },
  { name: 'Orbit', logo: '/partners/orbit.svg' },
  { name: 'Alder Works', logo: '/partners/alder-works.svg' },
  { name: 'Tessera', logo: '/partners/tessera.svg' },
  { name: 'Granite Row', logo: '/partners/granite-row.svg' },
];
