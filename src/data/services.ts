/**
 * Services
 * Shown on the homepage, /services and /services/[slug].
 * `icon` and `tagStyle` choose from the sets in src/lib/icons.ts.
 */

import type { Service, ServicesPage } from '@/types/content';

/** The /services page. `meta.title` is also its breadcrumb label. */
export const SERVICES_PAGE: ServicesPage = {
  meta: {
    title: 'Our Services',
    description: 'Your services page description goes here.',
  },
  eyebrow: 'What we offer',
  title: 'Your services page title goes here.',
  description: 'Your services page description goes here.',
  sectionTitle: 'Our Services',
  sectionSubtitle: 'Your services section description goes here.',
};

export const SERVICES: Service[] = [
  {
    title: 'Service One',
    slug: 'service-one',
    tag: 'Primary',
    tagStyle: 'accent',
    icon: 'layers',
    isHighlighted: true,
    forWho: 'Describe your ideal client here',
    description:
      'Description of your first service goes here. Explain what you offer and the value it delivers.',
    heroText: 'Your hero text for this service goes here.',
    fullDescription:
      'Full description of your service goes here. Provide detailed information about what clients receive, your process, and the outcomes they can expect.',
    includes: [
      'Feature or deliverable one',
      'Feature or deliverable two',
      'Feature or deliverable three',
      'Feature or deliverable four',
      'Feature or deliverable five',
    ],
    howToStart: 'Describe how clients begin working with you. What is the first step?',
    howToStartTagline: 'Your tagline for the engagement process goes here.',
    ctaText: 'Get Started',
  },
  {
    title: 'Service Two',
    slug: 'service-two',
    tag: 'Secondary',
    tagStyle: 'blue',
    icon: 'cloud',
    forWho: 'Describe your ideal client here',
    description:
      'Description of your second service goes here. Explain what you offer and the value it delivers.',
    heroText: 'Your hero text for this service goes here.',
    fullDescription:
      'Full description of your service goes here. Provide detailed information about what clients receive, your process, and the outcomes they can expect.',
    includes: [
      'Feature or deliverable one',
      'Feature or deliverable two',
      'Feature or deliverable three',
      'Feature or deliverable four',
      'Feature or deliverable five',
    ],
    howToStart: 'Describe how clients begin working with you. What is the first step?',
    howToStartTagline: 'Your tagline for the engagement process goes here.',
    ctaText: 'Get Started',
  },
  {
    title: 'Service Three',
    slug: 'service-three',
    tag: 'Strategy',
    tagStyle: 'emerald',
    icon: 'compass',
    forWho: 'Describe your ideal client here',
    description:
      'Description of your third service goes here. Explain what you offer and the value it delivers.',
    heroText: 'Your hero text for this service goes here.',
    fullDescription:
      'Full description of your service goes here. Provide detailed information about what clients receive, your process, and the outcomes they can expect.',
    includes: [
      'Feature or deliverable one',
      'Feature or deliverable two',
      'Feature or deliverable three',
      'Feature or deliverable four',
      'Feature or deliverable five',
    ],
    howToStart: 'Describe how clients begin working with you. What is the first step?',
    howToStartTagline: 'Your tagline for the engagement process goes here.',
    ctaText: 'Get Started',
  },
  {
    title: 'Service Four',
    slug: 'service-four',
    tag: 'Creative',
    tagStyle: 'purple',
    icon: 'palette',
    forWho: 'Describe your ideal client here',
    description:
      'Description of your fourth service goes here. Explain what you offer and the value it delivers.',
    heroText: 'Your hero text for this service goes here.',
    fullDescription:
      'Full description of your service goes here. Provide detailed information about what clients receive, your process, and the outcomes they can expect.',
    includes: [
      'Feature or deliverable one',
      'Feature or deliverable two',
      'Feature or deliverable three',
      'Feature or deliverable four',
      'Feature or deliverable five',
    ],
    howToStart: 'Describe how clients begin working with you. What is the first step?',
    howToStartTagline: 'Your tagline for the engagement process goes here.',
    ctaText: 'Get Started',
  },
  {
    title: 'Service Five',
    slug: 'service-five',
    tag: 'Support',
    tagStyle: 'orange',
    icon: 'globe',
    forWho: 'Describe your ideal client here',
    description:
      'Description of your fifth service goes here. Explain what you offer and the value it delivers.',
    heroText: 'Your hero text for this service goes here.',
    fullDescription:
      'Full description of your service goes here. Provide detailed information about what clients receive, your process, and the outcomes they can expect.',
    includes: [
      'Feature or deliverable one',
      'Feature or deliverable two',
      'Feature or deliverable three',
      'Feature or deliverable four',
      'Feature or deliverable five',
    ],
    howToStart: 'Describe how clients begin working with you. What is the first step?',
    howToStartTagline: 'Your tagline for the engagement process goes here.',
    ctaText: 'Get Started',
  },
  {
    title: 'Service Six',
    slug: 'service-six',
    tag: 'Custom',
    tagStyle: 'slate',
    icon: 'server',
    forWho: 'Describe your ideal client here',
    description:
      'Description of your sixth service goes here. Explain what you offer and the value it delivers.',
    heroText: 'Your hero text for this service goes here.',
    fullDescription:
      'Full description of your service goes here. Provide detailed information about what clients receive, your process, and the outcomes they can expect.',
    includes: [
      'Feature or deliverable one',
      'Feature or deliverable two',
      'Feature or deliverable three',
      'Feature or deliverable four',
      'Feature or deliverable five',
    ],
    howToStart: 'Describe how clients begin working with you. What is the first step?',
    howToStartTagline: 'Your tagline for the engagement process goes here.',
    ctaText: 'Get Started',
  },
];
