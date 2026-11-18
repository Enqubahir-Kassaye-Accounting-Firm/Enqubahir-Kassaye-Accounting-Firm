/**
 * Useful Websites
 * Official links only. Shown on the homepage (the first four) and on
 * /useful-websites (all). Each link was opened and checked on 2026-11-18.
 * Not included: the business registration portal (business.gov.et), whose
 * security certificate did not match its address when checked.
 */

import type { ListPage, UsefulWebsite } from '@/types/content';

export const USEFUL_WEBSITES_PAGE: ListPage = {
  meta: {
    title: 'Useful Websites',
    description:
      'Official websites for tax, accounting and audit rules, public finance and investment in Ethiopia.',
  },
  eyebrow: 'Useful websites',
  title: 'Official websites every business owner should know.',
  description:
    'Tax notices, accounting and audit rules, public finance and investment information, each from its own official site.',
  sectionTitle: 'Useful Websites',
  sectionSubtitle: 'Official websites for tax, audit and business information in Ethiopia.',
};

export const USEFUL_WEBSITES: UsefulWebsite[] = [
  {
    name: 'Ministry of Revenues',
    url: 'https://www.mor.gov.et/',
    description: 'The federal tax authority. Check it for tax notices, forms and updates.',
  },
  {
    name: 'Accounting and Auditing Board of Ethiopia (AABE)',
    url: 'https://aabe.gov.et/',
    description: 'The board that licenses and regulates accounting and audit work in Ethiopia.',
  },
  {
    name: 'Ministry of Finance',
    url: 'https://www.mofed.gov.et/',
    description: 'Government finance policy, the budget and public finance announcements.',
  },
  {
    name: 'Ethiopian Investment Commission',
    url: 'https://investethiopia.gov.et/',
    description: 'Investment permits, licensing and information for investors.',
  },
];

/** The websites shown on the homepage */
export const HOME_USEFUL_WEBSITES = USEFUL_WEBSITES.slice(0, 4);
