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
    description:
      'Accounting and bookkeeping, audit, tax filing, IFRS and IPSAS reporting, payroll and business advisory in Addis Ababa.',
  },
  eyebrow: 'What we offer',
  title: 'Six services for your books, taxes and audit.',
  description:
    'Each service is run by the same office, so your bookkeeping, tax filings, payroll and statements match.',
  sectionTitle: 'Our Services',
  sectionSubtitle:
    'From monthly bookkeeping to tax filing, audit, financial reports, payroll and business advice.',
};

const HOW_TO_START =
  'Book a free consultation. Tell us about your business and what you need, and we will tell you how we can help.';

export const SERVICES: Service[] = [
  {
    title: 'Accounting & Bookkeeping',
    slug: 'accounting-bookkeeping',
    tag: 'Monthly',
    tagStyle: 'accent',
    icon: 'chart',
    forWho: 'Businesses that need their books kept every month',
    description:
      'We set up the accounting system and keep the books every month, so the figures are ready when tax or audit time comes.',
    heroText:
      'We set up the accounting system and keep the books every month, at our office or remotely.',
    fullDescription:
      'Good books are the base of everything else: tax filing, audit and financial reports all start from them. We set up your accounting system and internal controls, then record your transactions, keep the ledgers and reconcile your bank accounts every month. You receive monthly financial reports, so you always know where the business stands. We can work from our office or remotely.',
    includes: [
      'Accounting system and internal controls setup',
      'Monthly bookkeeping and ledgers',
      'Bank reconciliation',
      'Monthly financial reports',
      'Office or remote service',
    ],
    howToStart: HOW_TO_START,
    howToStartTagline: 'Books kept every month.',
    ctaText: 'Learn more',
  },
  {
    title: 'Audit Services',
    slug: 'audit-services',
    tag: 'Audit',
    tagStyle: 'accent',
    icon: 'shield',
    forWho: 'Companies that need a statutory audit or must prepare for one',
    description:
      'We audit financial records and internal controls in line with AABE requirements, and clear backlogs before the audit.',
    heroText:
      'Statutory audit in line with AABE requirements, and the preparation that comes before it.',
    fullDescription:
      'An audit goes faster when the records are ready. We carry out statutory audits of financial records and internal controls in line with AABE requirements. If your books are behind, we prepare them first: we clear backlog years and review your records and internal controls, so the audit starts from complete figures. We also carry out internal audits and risk assessments.',
    includes: [
      'Statutory audit',
      'Pre-audit preparation',
      'Clearing backlog years',
      'Internal audit and risk assessment',
      'Review of records and internal controls',
    ],
    howToStart: HOW_TO_START,
    howToStartTagline: 'Statements ready for audit.',
    ctaText: 'Learn more',
  },
  {
    title: 'Tax Consultancy & Filing',
    slug: 'tax-consultancy-filing',
    tag: 'Tax',
    tagStyle: 'accent',
    icon: 'legal',
    forWho: 'Businesses that file VAT, withholding tax and employee income tax every month',
    description:
      'We calculate, declare and file your taxes on time, and stand with you during tax authority assessments.',
    heroText:
      'Company income tax, VAT, withholding tax and employee income tax, calculated and filed on time.',
    fullDescription:
      'We calculate and file the company income tax, and every month we handle your VAT, withholding tax and employee income tax. We help you plan ahead and review your past filings. If the tax authority assesses your business, the principal consultant stands with you during the assessment.',
    includes: [
      'Company income tax calculation and filing',
      'Monthly VAT, withholding tax and employee income tax',
      'Tax planning',
      'Review of past filings',
      'Representation during tax assessments',
    ],
    howToStart: HOW_TO_START,
    howToStartTagline: 'Taxes filed on time.',
    ctaText: 'Learn more',
  },
  {
    title: 'Financial Reporting (IFRS & IPSAS)',
    slug: 'financial-reporting-ifrs-ipsas',
    tag: 'Reporting',
    tagStyle: 'accent',
    icon: 'layers',
    forWho: 'Companies and non-profits that must present financial statements to a standard',
    description:
      'We prepare the balance sheet, income statement and cash flow statement to IFRS or IPSAS.',
    heroText: 'Balance sheet, income statement and cash flow statement, to IFRS or IPSAS.',
    fullDescription:
      'Companies and non-profits often have to present their financial statements to a recognised standard. We prepare the balance sheet, the income statement and the cash flow statement to IFRS for companies, and to IPSAS where it is required.',
    includes: [
      'Balance sheet',
      'Income statement',
      'Cash flow statement',
      'IFRS statements for companies',
      'IPSAS statements where required',
    ],
    howToStart: HOW_TO_START,
    howToStartTagline: 'Statements to the standard you need.',
    ctaText: 'Learn more',
  },
  {
    title: 'Payroll Management',
    slug: 'payroll-management',
    tag: 'Payroll',
    tagStyle: 'accent',
    icon: 'users',
    forWho: 'Employers with staff on payroll',
    description:
      'We run the monthly payroll, and calculate and file the employee income tax with it.',
    heroText: 'Monthly payroll, with the employee income tax calculated and filed.',
    fullDescription:
      'Payroll and tax belong together. We process your payroll every month, calculate the employee income tax and file it. The payroll records are kept with your books, so your statements and tax filings match.',
    includes: [
      'Monthly payroll processing',
      'Employee income tax calculation and filing',
      'Payroll records kept with the books',
    ],
    howToStart: HOW_TO_START,
    howToStartTagline: 'Payroll and tax in one place.',
    ctaText: 'Learn more',
  },
  {
    title: 'Business Advisory',
    slug: 'business-advisory',
    tag: 'Advisory',
    tagStyle: 'accent',
    icon: 'compass',
    forWho: 'People starting a business and companies planning a change',
    description:
      'We help register and license a business, and advise on investment, feasibility and restructuring.',
    heroText:
      'Business registration and licensing, and advice on investment, feasibility and restructuring.',
    fullDescription:
      'If you are starting a business or changing how the company is set up, we help with the steps and the figures. We register and license your business, advise on investment, prepare financial feasibility studies and support company restructuring. We can also set up accounting software for you.',
    includes: [
      'Business registration and licensing',
      'Investment advice',
      'Financial feasibility studies',
      'Company restructuring',
      'Accounting software setup',
    ],
    howToStart: HOW_TO_START,
    howToStartTagline: 'From first step to first set of books.',
    ctaText: 'Learn more',
  },
];
