/**
 * About Content
 * ABOUT_SUMMARY  → the short About section on the homepage
 * ABOUT_PAGE_SECTIONS → the full /about page
 */

import type { AboutSummary, PageMeta } from '@/types/content';

export const ABOUT_SUMMARY: AboutSummary = {
  title: 'An accounting firm in Bole, Addis Ababa',
  summary:
    'We are AABE-licensed. We keep the books, file the taxes, carry out audits and run payroll for companies, small and medium businesses and non-profits in Addis Ababa.',
  buttonText: 'About the firm',
  factsTitle: 'At a glance',
  facts: [
    { icon: 'badge', label: 'Licence', value: 'Licensed by AABE' },
    { icon: 'person', label: 'Principal consultant', value: 'Enqubahir Kassaye Teferra' },
    {
      icon: 'users',
      label: 'Who we serve',
      value: 'Companies, small and medium businesses and non-profits',
    },
    { icon: 'pin', label: 'Office', value: 'Bole Sub-City, 22 Mazoria, Addis Ababa' },
  ],
};

export const ABOUT_PAGE_META: PageMeta = {
  title: 'About Us',
  description:
    'Enqubahir Kassaye Authorized Accounting Firm is an AABE-licensed accounting firm in Bole, Addis Ababa. Bookkeeping, tax filing, audit, financial reporting and payroll.',
};

export const ABOUT_PAGE_SECTIONS = {
  whoWeAre: {
    sectionLabel: 'Who we are',
    headline: 'About Enqubahir Kassaye Authorized Accounting Firm',
    body: 'An AABE-licensed accounting firm in Bole, Addis Ababa. We keep books, file company income tax, VAT, withholding tax and employee income tax, carry out audits, prepare IFRS and IPSAS statements, run payroll and help with business registration.',
    origin:
      'The firm is led by its principal consultant, Enqubahir Kassaye Teferra. Our office is in Bole Sub-City, 22 Mazoria, Addis Ababa.',
  },

  whatWeBuild: {
    sectionLabel: 'What we do',
    headline: 'Books, taxes and audit in one office.',
    intro:
      'Most businesses need the same three things from an accountant. We cover all three, so your figures stay in one place.',
    dimensions: [
      {
        roman: 'I',
        title: 'Books',
        body: 'We set up the accounting system and keep the books every month. That includes ledgers, bank reconciliation and monthly financial reports, with payroll kept alongside.',
      },
      {
        roman: 'II',
        title: 'Taxes',
        body: 'We calculate and file company income tax, VAT, withholding tax and employee income tax. We also plan ahead and review past filings.',
      },
      {
        roman: 'III',
        title: 'Audit and reports',
        body: 'We carry out audits in line with AABE requirements and prepare balance sheets, income statements and cash flow statements to IFRS or IPSAS.',
      },
    ],
  },

  theRealPurpose: {
    sectionLabel: 'What you can count on',
    headline: 'Records that are ready when they are needed.',
    body: 'Tax dates, audits and bank requests all ask for the same thing: figures that are complete and up to date. Our work is built around that.',
    pullQuote: 'Books kept every month. Taxes filed on time. Statements ready for audit.',
    bodyAfterQuote:
      'If the tax authority assesses your business, our principal consultant, Enqubahir Kassaye Teferra, stands with you during the assessment.',
  },

  whatWeBelieve: {
    sectionLabel: 'How we work',
    headline: 'What you can expect from us.',
    intro: 'Three habits that run through all of our services.',
    beliefs: [
      {
        lead: 'Books kept every month.',
        body: 'Transactions are recorded, accounts are reconciled and a financial report is ready each month, not once a year.',
      },
      {
        lead: 'Taxes filed on time.',
        body: 'VAT, withholding tax and employee income tax are calculated, declared and filed every month, on time.',
      },
      {
        lead: 'Statements ready for audit.',
        body: 'Records are prepared before the auditor asks for them, and backlog years can be cleared first.',
      },
    ],
  },

  whoBuildFor: {
    sectionLabel: 'Who we serve',
    headline: 'Companies, small businesses and non-profits in Addis Ababa.',
    body: 'We work with companies, small and medium businesses and non-profits. We also help people who are starting a business and need it registered and licensed.',
    closing: 'Book a free consultation to talk about your books, taxes or audit.',
  },
} as const;
