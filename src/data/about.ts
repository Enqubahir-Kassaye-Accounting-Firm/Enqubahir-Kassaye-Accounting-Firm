/**
 * About Content
 * ABOUT_SUMMARY  → the short About section on the homepage
 * ABOUT_PAGE_SECTIONS → the full /about page
 */

import type { AboutSummary, PageMeta } from '@/types/content';

export const ABOUT_SUMMARY: AboutSummary = {
  title: 'About Your Organization',
  summary: 'Your organization summary goes here. Describe what you do and who you serve.',
  buttonText: 'Discover Our Story',
};

export const ABOUT_PAGE_META: PageMeta = {
  title: 'About Us',
  description: 'Your about page description goes here.',
};

export const ABOUT_PAGE_SECTIONS = {
  whoWeAre: {
    sectionLabel: 'Who we are',
    headline: 'About Your Organization',
    body: 'Your organization description goes here. Describe who you are, what you do, and what makes you different.',
    origin: '[Enter your company origin story here.]',
  },

  whatWeBuild: {
    sectionLabel: 'What we offer',
    headline: 'Your headline for this section goes here.',
    intro:
      'Your introductory paragraph goes here. Explain your approach or philosophy in a few sentences.',
    dimensions: [
      {
        roman: 'I',
        title: 'Pillar One',
        body: 'Description of your first pillar or principle goes here.',
      },
      {
        roman: 'II',
        title: 'Pillar Two',
        body: 'Description of your second pillar or principle goes here.',
      },
      {
        roman: 'III',
        title: 'Pillar Three',
        body: 'Description of your third pillar or principle goes here.',
      },
    ],
  },

  theRealPurpose: {
    sectionLabel: 'The real purpose',
    headline: 'Your purpose headline goes here.',
    body: 'Your purpose description goes here. Explain the deeper reason behind what you do.',
    pullQuote: 'Your pull quote or key message goes here.',
    bodyAfterQuote: 'Your follow-up paragraph goes here.',
  },

  whatWeBelieve: {
    sectionLabel: 'What we believe',
    headline: 'Your beliefs headline goes here.',
    intro: 'Your introductory paragraph about your beliefs and values goes here.',
    beliefs: [
      {
        lead: 'Belief one headline.',
        body: 'Description of your first core belief goes here.',
      },
      {
        lead: 'Belief two headline.',
        body: 'Description of your second core belief goes here.',
      },
      {
        lead: 'Belief three headline.',
        body: 'Description of your third core belief goes here.',
      },
    ],
  },

  whoBuildFor: {
    sectionLabel: 'Who we serve',
    headline: 'Your ideal client headline goes here.',
    body: 'Description of who you serve and what problems you solve goes here.',
    closing: 'Your closing statement goes here.',
  },
} as const;
