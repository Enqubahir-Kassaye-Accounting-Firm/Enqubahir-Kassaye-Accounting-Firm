/**
 * Home Page Content
 * Hero, section headings and call-to-action copy for the homepage.
 */

import type { HomePage } from '@/types/content';

export const HOME_PAGE: HomePage = {
  // *Starred* words use the accent color
  heroTitleLines: ['Your books ready *before* the tax office asks.'],
  heroSubtitle: 'Accounting, tax and audit services in Addis Ababa',
  heroPrimaryButtonText: 'Book a free consultation',
  heroSecondaryButtonText: 'Our Services',
  heroSecondaryButtonUrl: '/#services',
  heroCard: {
    title: 'Monthly filing',
    status: 'Handled for you',
    items: [
      { label: 'VAT declaration', done: true },
      { label: 'Withholding tax', done: true },
      { label: 'Employee income tax', done: true },
      { label: 'Financial statements (IFRS)', done: false },
    ],
    footerPrefix: 'Prepared by',
    footerName: 'Enqubahir Kassaye Teferra',
    footerRole: 'Principal Consultant',
  },

  servicesTitle: 'Our Services',
  servicesSubtitle:
    'From monthly bookkeeping to tax filing, audit, financial reports, payroll and business advice.',
  projectsTitle: '',
  projectsSubtitle: '',
  partnersTitle: 'Our Partners',
  testimonialsTitle: 'What Our Clients Say',
  testimonialsSubtitle: 'Words from business owners and managers who work with us.',
  taxGuideTitle: 'Tax Filing Do’s and Don’ts',
  taxGuideSubtitle: 'Simple rules that keep your tax filings correct and on time.',
  tipsTitle: 'Accounting Tips',
  tipsSubtitle: 'Practical habits that keep your books in good order.',
  websitesTitle: 'Useful Websites',
  websitesSubtitle: 'Official websites for tax, audit and business information in Ethiopia.',

  ctaTitle: 'Book a free consultation',
  ctaSubtitle: 'Tell us about your books, taxes or audit. The first consultation is free.',
  ctaSecondaryButtonText: 'View Services',
  ctaSecondaryButtonUrl: '/#services',
};
