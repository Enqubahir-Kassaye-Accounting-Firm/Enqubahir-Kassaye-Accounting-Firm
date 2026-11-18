/**
 * Accounting Tips
 * Shown on the homepage (the first three) and on /accounting-tips (all).
 * Written for businesses in Ethiopia: no US tools, credit cards or
 * quarterly estimated tax.
 */

import type { AccountingTip, ListPage } from '@/types/content';

export const ACCOUNTING_TIPS_PAGE: ListPage = {
  meta: {
    title: 'Accounting Tips',
    description:
      'Twelve practical accounting habits for businesses in Ethiopia: what to do, why it matters and how to start.',
  },
  eyebrow: 'Accounting tips',
  title: 'Twelve habits that keep your books in good order.',
  description:
    'Each tip says why it matters and how to start. None of them needs special software or a large budget.',
  sectionTitle: 'Accounting Tips',
  sectionSubtitle: 'Practical habits that keep your books in good order.',
};

export const ACCOUNTING_TIPS: AccountingTip[] = [
  {
    title: 'Keep business and personal money apart',
    summary: 'Pay every business expense from a business account, never from your own pocket.',
    why: 'Mixing personal and business transactions makes bookkeeping and tax filing harder, and hides what the business really earns.',
    how: 'Open a separate business bank account. Pay every business expense from it, and pay yourself a set amount.',
  },
  {
    title: 'Keep your books in an accounting system',
    summary: 'Record every transaction in one system, not on loose paper.',
    why: 'Tracking by hand is slow, and it is easy to make mistakes.',
    how: 'Use an accounting system for invoices, expenses and reports. We can set one up for you and teach your staff to use it.',
  },
  {
    title: 'Record every expense, however small',
    summary: 'Small expenses add up, and a missing receipt is a missing figure.',
    why: 'Missing even small expenses gives wrong financial statements and wrong tax figures.',
    how: 'Ask for a receipt every time. Scan or photograph it the same day and record it with its date and purpose.',
  },
  {
    title: 'Update your books every month',
    summary: 'Do not wait for the year end. Close each month while it is fresh.',
    why: 'Falling behind causes cash problems and messy records, and a backlog is costly to clear.',
    how: 'Set a fixed day each month to record transactions, reconcile accounts and review the figures.',
  },
  {
    title: 'Reconcile your bank statement every month',
    summary: 'Match your records to the bank. Differences show errors early.',
    why: 'It shows any difference between your records and the bank, including mistakes and fraud.',
    how: 'Match every line in your books to the bank statement. Find the cause of each difference and correct it.',
  },
  {
    title: 'Invoice promptly and follow up on payments',
    summary: 'Send the invoice when you deliver, and chase it when it is late.',
    why: 'Late payments hurt your cash flow, even when sales are good.',
    how: 'Issue an invoice as soon as you deliver. Write the payment terms on it, such as 15 or 30 days, and call customers whose payment is late.',
  },
  {
    title: 'Watch your cash, not only your profit',
    summary: 'A business can show a profit and still run short of cash.',
    why: 'Profit is not the same as cash. Many businesses get into trouble because they do not manage cash.',
    how: 'Each month, list the money you expect to receive and to pay in the coming months, and compare it with what happened.',
  },
  {
    title: 'Set money aside for taxes',
    summary: 'Put aside tax money each month, so a tax bill is never a surprise.',
    why: 'A tax bill that arrives unplanned can strain the business.',
    how: 'Each month, move the amount for VAT, withholding tax and income tax to a separate account. Your accountant can estimate it.',
  },
  {
    title: 'Read your financial reports every month',
    summary: 'The monthly reports show trends, overspending and room to grow.',
    why: 'Regular review helps you see trends and overspending early, and spot chances to grow.',
    how: 'Each month, read the income statement, balance sheet and cash flow statement. Ask your accountant about any line you do not understand.',
  },
  {
    title: 'Work with an accountant, even part-time',
    summary: 'An accountant gives advice, keeps you compliant and helps with tax planning.',
    why: 'An accountant gives expert advice, helps you stay compliant and helps you plan your taxes.',
    how: 'Agree on monthly bookkeeping, tax filing and a yearly review. The work can be done at the accountant’s office or remotely.',
  },
  {
    title: 'File your records so they can be found',
    summary: 'An audit or tax assessment will ask for old records. Be able to find them.',
    why: 'Auditors and tax officers ask for invoices, receipts and statements from past months and years.',
    how: 'Keep invoices, receipts, contracts, bank statements and payroll records in folders by month. Keep a scanned copy of each paper record.',
  },
  {
    title: 'Keep your registration documents together',
    summary: 'Keep your licence, tax registration and filed returns in one place.',
    why: 'You need them for tax filing, bank requests, audits and tenders, and they are hard to find in a hurry.',
    how: 'Keep your trade licence, tax registration documents and filed tax returns in one folder, on paper and as scans, and update it when something changes.',
  },
];

/** The tips shown on the homepage */
export const HOME_ACCOUNTING_TIPS = ACCOUNTING_TIPS.slice(0, 3);
