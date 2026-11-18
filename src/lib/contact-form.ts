/**
 * Contact Form
 * Validation schema + submission to a third-party form service (Formspree or Web3Forms).
 * Runs entirely in the browser, so it works on Vercel and on static hosting alike.
 * Provider and key are configured in src/config/site.ts → contactForm.
 */

import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { siteConfig } from '@/config/site';
import { UI_TEXT } from '@/data/ui';

const { provider, formKey } = siteConfig.contactForm;
const { validation } = UI_TEXT.contact;

export const isContactFormEnabled = provider !== 'none' && formKey.trim().length > 0;

/** Longest message the form accepts (counter under the message field) */
export const MESSAGE_MAX_LENGTH = 500;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, validation.nameTooShort)
    .max(80, validation.nameTooLong)
    .regex(/^[\p{L}\p{M}\s'.-]+$/u, validation.nameInvalid),
  email: z.string().trim().min(1, validation.emailRequired).email(validation.emailInvalid).max(120),
  phone: z
    .string()
    .optional()
    .transform((value) => (value ?? '').trim())
    .refine((value) => value.length > 0, validation.phoneRequired)
    .refine((value) => value.length === 0 || isValidPhoneNumber(value), validation.phoneInvalid),
  subject: z.string().min(1, validation.subjectRequired),
  message: z
    .string()
    .trim()
    .min(10, validation.messageTooShort)
    .max(MESSAGE_MAX_LENGTH, validation.messageTooLong),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;

export async function submitContactForm(values: ContactFormValues): Promise<void> {
  if (!isContactFormEnabled) throw new Error('Contact form is not configured');

  const subject = `${values.subject} — ${siteConfig.name} website`;

  const request =
    provider === 'web3forms'
      ? {
          url: 'https://api.web3forms.com/submit',
          body: { access_key: formKey, from_name: siteConfig.name, ...values, subject },
        }
      : {
          url: `https://formspree.io/f/${encodeURIComponent(formKey)}`,
          body: { ...values, _subject: subject, _replyto: values.email },
        };

  const response = await fetch(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(request.body),
  });

  const result = (await response.json().catch(() => ({}))) as { success?: boolean };

  if (!response.ok || result.success === false) {
    throw new Error('Form submission failed');
  }
}
