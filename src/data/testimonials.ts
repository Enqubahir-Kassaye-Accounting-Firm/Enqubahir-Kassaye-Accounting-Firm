/**
 * Testimonials
 * Shown on the homepage as a carousel. Use real client quotes only.
 * `headline` is a short line pulled from the quote itself.
 * Version 1 uses the quotes from the firm's current website; the client
 * confirms them (and permission to name each person) before launch.
 */

import type { Testimonial } from '@/types/content';

export const TESTIMONIALS: Testimonial[] = [
  {
    clientName: 'Daniel Mekonnen',
    role: 'Managing Director',
    company: 'Addis Trading PLC',
    headline: 'Saved us thousands in compliance costs',
    quote:
      'Working with Enqubahir Kassaye Authorized Accounting Firm transformed our business. Their tax consultancy saved us thousands in compliance costs, and their team is incredibly responsive. Highly recommended!',
  },
  {
    clientName: 'Selamawit Abebe',
    role: 'Owner',
    company: 'Selam Boutique',
    headline: 'Trustworthy and professional',
    quote:
      'As a small business owner, I was overwhelmed by bookkeeping and tax filings. This firm not only streamlined our accounting but also provided strategic advice that helped us grow. Trustworthy and professional!',
  },
  {
    clientName: 'Tewodros Kassahun',
    role: 'CFO',
    company: 'GreenPath Agro-Industry',
    headline: 'Thorough, transparent, and on time',
    quote:
      'The audit services we received were thorough, transparent, and delivered on time. Enqubahir Kassaye Authorized Accounting Firm team identified financial risks we hadn’t noticed, proving their expertise.',
  },
  {
    clientName: 'Meron Girma',
    role: 'HR & Finance Manager',
    company: 'TechSolutions Ethiopia',
    headline: 'Their attention to detail is unmatched',
    quote:
      'Their attention to detail is unmatched. From payroll to annual filings, they handle everything with precision. Our financial operations have never been smoother.',
  },
  {
    clientName: 'Yohannes Assefa',
    role: 'CEO',
    company: 'Zenith Construction',
    headline: 'None compare to the personalized service',
    quote:
      'I’ve used many accounting firms, but none compare to the personalized service here. They treat my business like their own, offering proactive solutions.',
  },
  {
    clientName: 'Eyerusalem Tesfaye',
    role: 'Co-Founder',
    company: 'Shega Innovations',
    headline: 'A game-changer for our startup',
    quote:
      'Enqubahir Kassaye Authorized Accounting Firm’s advisory services were a game-changer for our startup. Their insights on tax optimization and financial planning were invaluable.',
  },
  {
    clientName: 'Alemitu Kebede',
    role: 'Finance Director',
    company: 'Nile Manufacturing',
    headline: 'A true partner',
    quote:
      'Ethical, reliable, and exceptionally knowledgeable. They resolved a long-standing tax dispute with the authorities in our favor. A true partner!',
  },
  {
    clientName: 'Kibrom Gebre',
    role: 'Operations Manager',
    company: 'BlueStar Logistics',
    headline: 'Saving us time and reducing errors',
    quote:
      'Switching to this firm was the best decision we made. Their team modernized our accounting systems, saving us time and reducing errors.',
  },
  {
    clientName: 'Hawi Demissie',
    role: 'Entrepreneur',
    company: 'Café Addis',
    headline: 'Always ahead of deadlines',
    quote:
      'Professional, courteous, and always ahead of deadlines. They make complex tax laws easy to understand and implement.',
  },
  {
    clientName: 'Fitsum Lemma',
    role: 'Director',
    company: 'Lemma Family Holdings',
    headline: 'Never a single compliance issue',
    quote:
      'Outstanding integrity and competence. They’ve managed our family’s business accounting for years, and we’ve never had a single compliance issue.',
  },
];
