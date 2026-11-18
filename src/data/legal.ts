/**
 * Legal Pages — Privacy Policy and Terms of Service
 *
 * ⚠ TEMPLATE WORDING, not legal advice. Written to be neutral and complete for
 * a typical small business website, so it can usually be published as it is.
 * The client (or their lawyer) still approves it, then set `reviewed: true`;
 * adjust a paragraph only if the client's practices differ.
 * `npm run check:placeholders` reports every document not yet reviewed.
 *
 * Tokens in paragraphs are filled from src/config/site.ts:
 *   {company}        legal.companyFullName
 *   {jurisdiction}   legal.jurisdiction
 *   {courtLocation}  legal.courtLocation
 *   {formProvider}   the contact form service (contactForm.provider)
 *   {email}          contact.email, rendered as a mailto link
 * A paragraph written as { text, when } shows only when that is true:
 *   'analytics'    NEXT_PUBLIC_GA_ID is set (Google Analytics is on)
 *   'noAnalytics'  NEXT_PUBLIC_GA_ID is not set
 *   'contactForm'  the contact form is on (provider and formKey set)
 * The "Last updated" date is legal.lastUpdated in site.ts.
 */

import type { LegalDocument } from '@/types/content';

export const PRIVACY_POLICY: LegalDocument = {
  reviewed: false,
  meta: {
    title: 'Privacy Policy',
    description:
      'What personal information we collect, why we collect it, and how we look after it — in plain language.',
  },
  sections: [
    {
      title: 'Who we are',
      paragraphs: [
        '{company} operates this website. This policy explains what personal information we collect when you visit the website or contact us, how we use it, and the choices you have.',
      ],
    },
    {
      title: 'What we collect',
      paragraphs: [
        'We collect the information you choose to give us — for example your name, email address, phone number and message when you contact us by email, by phone or through this website.',
        {
          when: 'contactForm',
          text: 'Messages sent through the contact form on this website are delivered to us by {formProvider}, a form service that processes what you enter only to pass it on to us.',
        },
        {
          when: 'analytics',
          text: 'We use Google Analytics to understand how visitors use this website, such as which pages are viewed and how long a visit lasts. Google Analytics uses cookies and collects technical information such as your browser, device and approximate location. We see this information only as totals, not to identify you.',
        },
        {
          when: 'noAnalytics',
          text: 'This website does not use analytics or advertising cookies, and we do not track you across other websites.',
        },
        'Like most websites, our hosting provider keeps standard server logs — such as IP address, browser type and the time of a visit — for security and to keep the website running.',
      ],
    },
    {
      title: 'How we use it',
      paragraphs: [
        'We use your information to answer your questions, to provide the products or services you ask for, and to keep in touch with you about them. We do not sell your personal information. We share it only with service providers who help us run our business — such as our hosting and email providers — or when the law requires it.',
      ],
    },
    {
      title: 'How long we keep it',
      paragraphs: [
        'We keep your information only for as long as we need it for the purposes above, or for as long as the law requires — for example for accounting or tax records. When we no longer need it, we delete it.',
      ],
    },
    {
      title: 'How we protect it',
      paragraphs: [
        'We take reasonable steps to protect your information, such as encrypted connections (HTTPS) and limiting who can access it. No way of sending or storing data is completely secure, but we work to keep your information safe.',
      ],
    },
    {
      title: 'Where your data goes',
      paragraphs: [
        'Some of the service providers we use may store or process information in other countries. When that happens, we choose providers that protect your information with appropriate safeguards.',
      ],
    },
    {
      title: 'Children',
      paragraphs: [
        'This website is not meant for children, and we do not knowingly collect personal information from them. If you believe a child has given us personal information, contact us and we will delete it.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        'Depending on where you live, you may have the right to see the personal information we hold about you, to have it corrected or deleted, and to object to how we use it. To make a request, email us at {email}. We will respond within a reasonable time and as the law requires.',
      ],
    },
    {
      title: 'Changes to this policy',
      paragraphs: [
        'We may update this policy from time to time. The date at the top of this page shows when it was last changed.',
      ],
    },
    {
      title: 'Questions',
      paragraphs: [
        'If you have a question about this policy or about your information, email us at {email}.',
      ],
    },
  ],
  closing: {
    title: 'Questions About Your Privacy?',
    body: 'If anything in this policy is unclear, get in touch. We are happy to explain how we handle your information.',
  },
};

export const TERMS_OF_SERVICE: LegalDocument = {
  reviewed: false,
  meta: {
    title: 'Terms of Service',
    description:
      'The terms for using this website. Written to be understood — please read them once.',
  },
  sections: [
    {
      title: 'About these terms',
      paragraphs: [
        'These terms apply to your use of this website, which is operated by {company}. By using the website you agree to them. If you do not agree, please do not use the website.',
      ],
    },
    {
      title: 'Our products and services',
      paragraphs: [
        'The information on this website describes what {company} offers. It is general information, not an offer or a contract. Prices, availability and the details of any product or service are confirmed with you directly — for example in a quote, an order confirmation or a written agreement — and those terms apply to that purchase.',
      ],
    },
    {
      title: 'Using this website',
      paragraphs: [
        'You may use this website for lawful purposes only. Please do not misuse it — for example by trying to gain unauthorised access, interfering with how it works, or sending spam or harmful content through its forms.',
      ],
    },
    {
      title: 'Content and ownership',
      paragraphs: [
        'The text, images, logos and other content on this website belong to {company} or are used with permission. You may view and share pages for personal, non-commercial use, but you may not copy, change or reuse the content for other purposes without our written permission.',
      ],
    },
    {
      title: 'Accuracy of information',
      paragraphs: [
        'We try to keep the information on this website accurate and up to date, but it may sometimes contain errors or be out of date. We may change or remove content at any time without notice.',
      ],
    },
    {
      title: 'Links to other websites',
      paragraphs: [
        'This website may link to websites run by others. We are not responsible for their content or for how they handle your information.',
      ],
    },
    {
      title: 'Privacy',
      paragraphs: ['How we handle personal information is explained in our Privacy Policy.'],
    },
    {
      title: 'Disclaimer',
      paragraphs: [
        'This website and its content are provided "as is". As far as the law allows, we make no promise that the website will always be available or free of errors.',
      ],
    },
    {
      title: 'Limitation of liability',
      paragraphs: [
        'As far as the law allows, {company} is not liable for any indirect or consequential loss arising from your use of, or inability to use, this website. Nothing in these terms limits any rights you have under consumer protection law that cannot be excluded.',
      ],
    },
    {
      title: 'Changes to these terms',
      paragraphs: [
        'We may update these terms from time to time. The date at the top of this page shows when they were last changed. If you keep using the website after a change, the updated terms apply.',
      ],
    },
    {
      title: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of {jurisdiction}. Any disputes will be handled by the courts of {courtLocation}.',
      ],
    },
    {
      title: 'Questions',
      paragraphs: ['If you have a question about these terms, email us at {email}.'],
    },
  ],
  closing: {
    title: 'Questions About Our Terms?',
    body: 'If anything here is unclear, get in touch and we will be glad to explain.',
  },
};
