/**
 * Contact Form
 * Client-side form posted to Formspree or Web3Forms (src/lib/contact-form.ts).
 * Loaded by contact-section.tsx only when the form is enabled in site.ts.
 * Two columns from sm up: name | email, phone | subject; message full width.
 */

'use client';

import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledPhoneInput } from '@/components/styled-phone-input';
import { Card } from '@/components/card';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import {
  MESSAGE_MAX_LENGTH,
  contactFormSchema,
  submitContactForm,
  type ContactFormInput,
  type ContactFormValues,
} from '@/lib/contact-form';
import { siteConfig } from '@/config/site';
import type { ContactPage } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface ContactFormProps {
  contactPage: ContactPage;
  /** "What can we help you with?" options: the services, then general and other */
  subjects: string[];
}

export function ContactForm({ contactPage, subjects }: ContactFormProps) {
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: undefined,
      subject: '',
      message: '',
    },
  });
  const message = useWatch({ control, name: 'message' }) ?? '';

  const onSubmit = async (data: ContactFormValues) => {
    // Honeypot: bots fill the hidden field; pretend success without sending
    if (honeypot) {
      setIsSuccess(true);
      return;
    }
    setIsSubmitting(true);
    setError(undefined);

    try {
      await submitContactForm(data);
      trackEvent('form_sent');
      setIsSuccess(true);
      reset();
    } catch {
      setError(UI_TEXT.contact.form.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 md:p-8">
      {/* After sending, only the success message shows */}
      {!isSuccess && (
        <>
          <h3 className="text-text-heading text-xl font-bold md:text-2xl">
            {contactPage.formTitle}
          </h3>
          <p className="text-text-body mt-2 text-sm md:text-base">{contactPage.formDescription}</p>
        </>
      )}

      {isSuccess ? (
        <div
          role="status"
          className="rounded-xl border border-green-500/20 bg-green-500/10 p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* The form (and the focused button) is gone; focus moves here so the result is read */}
          <h4 ref={focusOnMount} tabIndex={-1} className="text-text-heading text-xl font-semibold">
            {UI_TEXT.contact.form.successTitle}
          </h4>
          <p className="text-text-body mt-2">{contactPage.successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
            }}
          />
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-700 dark:text-red-300"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label={UI_TEXT.contact.form.nameLabel}
              htmlFor="contact-name"
              error={errors.name?.message}
            >
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                required
                {...fieldErrorProps('contact-name', errors.name?.message)}
                {...register('name')}
                className={formInputStyles}
                placeholder={UI_TEXT.contact.form.namePlaceholder}
              />
            </FormField>

            <FormField
              label={UI_TEXT.contact.form.emailLabel}
              htmlFor="contact-email"
              error={errors.email?.message}
            >
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                required
                {...fieldErrorProps('contact-email', errors.email?.message)}
                {...register('email')}
                className={formInputStyles}
                placeholder={UI_TEXT.contact.form.emailPlaceholder}
              />
            </FormField>

            <FormField
              label={UI_TEXT.contact.form.phoneLabel}
              htmlFor="contact-phone"
              error={errors.phone?.message}
            >
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <StyledPhoneInput
                    {...field}
                    {...fieldErrorProps('contact-phone', errors.phone?.message)}
                    error={Boolean(errors.phone)}
                    required
                    id="contact-phone"
                    defaultCountry={siteConfig.contact.defaultPhoneCountry}
                    international
                    placeholder={UI_TEXT.contact.form.phonePlaceholder}
                  />
                )}
              />
            </FormField>

            <FormField
              label={UI_TEXT.contact.form.subjectLabel}
              htmlFor="contact-subject"
              error={errors.subject?.message}
            >
              <select
                id="contact-subject"
                required
                {...fieldErrorProps('contact-subject', errors.subject?.message)}
                {...register('subject')}
                className={formInputStyles}
              >
                <option value="" disabled>
                  {UI_TEXT.contact.form.subjectPlaceholder}
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField
            label={UI_TEXT.contact.form.messageLabel}
            htmlFor="contact-message"
            error={errors.message?.message}
          >
            <textarea
              id="contact-message"
              {...register('message')}
              rows={5}
              maxLength={MESSAGE_MAX_LENGTH}
              required
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message
                  ? 'contact-message-error contact-message-count'
                  : 'contact-message-count'
              }
              className={formInputStyles}
              placeholder={UI_TEXT.contact.form.messagePlaceholder}
            />
            <p id="contact-message-count" className="text-text-muted mt-1.5 text-right text-xs">
              {message.length} / {MESSAGE_MAX_LENGTH}
            </p>
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'rounded-button px-btn-x py-btn-y text-btn w-full font-semibold',
              'bg-brand-accent text-text-on-accent',
              'transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-[0_0_30px_color-mix(in_srgb,var(--brand-accent)_30%,transparent)]',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            {isSubmitting ? UI_TEXT.contact.form.submitting : UI_TEXT.contact.form.submit}
          </button>
        </form>
      )}
    </Card>
  );
}

function focusOnMount(element: HTMLElement | null) {
  element?.focus();
}

/** Marks a field invalid and points screen readers at its error text (rendered by FormField) */
function fieldErrorProps(id: string, error?: string) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  };
}

function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-text-heading mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

// Fields sit on the card: page surface, card border, heading text.
// Keyboard focus is the global :focus-visible outline (globals.css).
const formInputStyles = cn(
  'block w-full rounded-lg px-4 py-3.5',
  'bg-surface-page border-border-default border',
  'text-text-heading placeholder:text-text-muted',
  'transition-all duration-200',
  'focus:border-brand-accent/50',
  'hover:border-brand-accent/30'
);
