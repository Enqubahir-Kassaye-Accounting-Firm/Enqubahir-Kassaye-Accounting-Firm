/**
 * Tax Filing Do's and Don'ts
 * Shown on the homepage (the first three of each) and on
 * /tax-filing-dos-and-donts (all). The tax authority is named Ministry of
 * Revenues (the firm's current website still says ERCA).
 */

import type { ListPage, TaxGuidePoint } from '@/types/content';

export const TAX_GUIDE_PAGE: ListPage = {
  meta: {
    title: 'Tax Filing Do’s and Don’ts',
    description:
      'Ten things to do and ten things to avoid when you file taxes in Ethiopia, from keeping records to meeting the monthly deadline.',
  },
  eyebrow: 'Tax filing',
  title: 'Ten things to do and ten to avoid when you file.',
  description:
    'Most filing problems come from the same few mistakes. Use this list before each monthly filing.',
  sectionTitle: 'Tax Filing Do’s and Don’ts',
  sectionSubtitle: 'Simple rules that keep your tax filings correct and on time.',
};

export const TAX_DOS: TaxGuidePoint[] = [
  {
    title: 'Keep accurate records',
    text: 'Keep detailed, organized records of all sales, expenses and transactions, so every filing is accurate.',
  },
  {
    title: 'File on time',
    text: 'Submit your monthly tax returns before the deadline to avoid penalties and interest.',
  },
  {
    title: 'Seek professional advice',
    text: 'Talk to a tax professional or accountant, especially when your transactions are complex.',
  },
  {
    title: 'Understand the tax rules',
    text: 'Stay informed about Ethiopian tax laws, rates and requirements, so you stay compliant.',
  },
  {
    title: 'Use official tax forms',
    text: 'Always use the official, up-to-date forms provided by the Ministry of Revenues.',
  },
  {
    title: 'Verify your calculations',
    text: 'Check your tax calculations before you submit. Errors can lead to penalties or an audit.',
  },
  {
    title: 'Pay taxes electronically',
    text: 'Use the Ministry of Revenues’ online portals or approved electronic payment methods. They are faster and more secure.',
  },
  {
    title: 'Keep tax payment receipts',
    text: 'Keep proof of every tax payment for future reference and for audits.',
  },
  {
    title: 'Stay updated on tax changes',
    text: 'Check Ministry of Revenues notices regularly for changes in tax laws or procedures.',
  },
  {
    title: 'Plan ahead',
    text: 'Set money aside each month, so you have the cash to cover your tax liabilities.',
  },
];

export const TAX_DONTS: TaxGuidePoint[] = [
  {
    title: 'Don’t delay filing',
    text: 'Late filing attracts penalties and interest. Do not postpone your submissions.',
  },
  {
    title: 'Don’t underreport income',
    text: 'Report all of your income accurately. Underreporting can lead to legal penalties and audits.',
  },
  {
    title: 'Don’t mix personal and business finances',
    text: 'Keep separate bank accounts and records for the business. It makes tax filing simpler.',
  },
  {
    title: 'Don’t ignore tax deadlines',
    text: 'Never miss the monthly deadline. Late submissions can result in fines.',
  },
  {
    title: 'Don’t use unofficial forms or methods',
    text: 'Avoid forms or methods that the Ministry of Revenues has not approved.',
  },
  {
    title: 'Don’t overlook tax deductions',
    text: 'Claim every deduction you are entitled to. It reduces your taxable income legally.',
  },
  {
    title: 'Don’t share sensitive tax information',
    text: 'Protect your tax identification numbers and financial data from unauthorized access.',
  },
  {
    title: 'Don’t rely on memory',
    text: 'Prepare your returns from documented records, not from what you remember.',
  },
  {
    title: 'Don’t skip reconciliation',
    text: 'Reconcile your accounts with your tax filings regularly, to catch differences early.',
  },
  {
    title: 'Don’t ignore Ministry of Revenues updates',
    text: 'Official notices and updates can create new obligations. Missing them can leave you non-compliant.',
  },
];

/** The points shown on the homepage, three of each */
export const HOME_TAX_DOS = TAX_DOS.slice(0, 3);
export const HOME_TAX_DONTS = TAX_DONTS.slice(0, 3);
