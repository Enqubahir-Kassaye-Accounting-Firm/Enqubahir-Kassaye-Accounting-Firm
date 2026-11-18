/**
 * Lazy Contact Form
 * Splits the form (react-hook-form, zod, phone-input library) into its own
 * chunk and downloads it only when the contact section comes near the screen,
 * so pages that are never scrolled that far load no form code at all. Until
 * then an empty block of about the form's height holds its place.
 * Renders only when the contact form is enabled in site.ts.
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type ComponentProps } from 'react';

const ContactForm = dynamic(() =>
  import('@/components/contact-form').then((module) => module.ContactForm)
);

type ContactFormProps = ComponentProps<typeof import('@/components/contact-form').ContactForm>;

/** How far before reaching the screen the form starts to download */
const LOAD_MARGIN = '800px 0px';

export function LazyContactForm(props: ContactFormProps) {
  const placeholder = useRef<HTMLDivElement>(null);
  const [nearScreen, setNearScreen] = useState(false);

  useEffect(() => {
    const element = placeholder.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearScreen(true);
          observer.disconnect();
        }
      },
      { rootMargin: LOAD_MARGIN }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (nearScreen) return <ContactForm {...props} />;
  return <div ref={placeholder} className="min-h-[40rem]" aria-hidden="true" />;
}
