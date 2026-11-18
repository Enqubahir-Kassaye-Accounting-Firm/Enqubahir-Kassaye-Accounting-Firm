/**
 * Contact Section
 * Form on the left; on the right the heading, then either the contact people
 * (site.ts → contact.people) or the company email, phone, address and office
 * hours, then socials, the "prefer to call?" and "book a call" cards. Map below.
 * Everything is driven by src/config/site.ts — empty values are hidden.
 */

import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { LazyContactForm } from '@/components/lazy-contact-form';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionHeading } from '@/components/section-heading';
import {
  SocialLinks,
  TelegramIcon,
  WhatsAppIcon,
  telegramUrl,
  whatsappUrl,
} from '@/components/social-links';
import { cn } from '@/lib/utils';
import { isContactFormEnabled } from '@/lib/contact-form';
import { siteConfig, type ContactPerson } from '@/config/site';
import { SERVICES } from '@/data/services';
import type { ContactPage } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface ContactSectionProps {
  contactPage: ContactPage;
}

const { email, phone, address, officeHours, mapEmbedUrl, people } = siteConfig.contact;
const bookingUrl = siteConfig.booking.url;

/** Dropdown options: general question, one per service, then other */
const subjects = [
  UI_TEXT.contact.form.subjectGeneral,
  ...SERVICES.map((service) => service.title),
  UI_TEXT.contact.form.subjectOther,
];

export function ContactSection({ contactPage }: ContactSectionProps) {
  const hasDirectChannels = Boolean(phone || whatsappUrl || telegramUrl);
  const formOrMap = isContactFormEnabled ? (
    <LazyContactForm contactPage={contactPage} subjects={subjects} />
  ) : mapEmbedUrl ? (
    <MapEmbed />
  ) : undefined;

  return (
    <section id="contact" className="section-y bg-surface-page">
      <Container>
        <div
          className={cn(
            'grid grid-cols-1 gap-10 md:gap-12',
            formOrMap ? 'lg:grid-cols-2' : 'mx-auto max-w-xl'
          )}
        >
          {formOrMap && <ScrollReveal>{formOrMap}</ScrollReveal>}

          {/* Contact details */}
          <ScrollReveal delay={0.2}>
            <div className={cn('flex flex-col', formOrMap && 'lg:pl-8')}>
              <SectionHeading
                align={formOrMap ? 'left' : 'center'}
                eyebrow={UI_TEXT.eyebrows.contact}
                title={contactPage.title}
                text={contactPage.description}
              />

              {people.length > 0 ? (
                <div className="mt-8 space-y-4 md:mt-10">
                  {people.map((person) => (
                    <PersonItem key={person.name} person={person} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 space-y-4 md:mt-10">
                  {phone && (
                    <ContactItem
                      icon={PhoneIcon}
                      label={UI_TEXT.contact.phoneLabel}
                      value={phone}
                      href={`tel:${phone}`}
                    />
                  )}
                  {email && (
                    <ContactItem
                      icon={EmailIcon}
                      label={UI_TEXT.contact.emailLabel}
                      value={email}
                      href={`mailto:${email}`}
                    />
                  )}
                  {address && (
                    <ContactItem
                      icon={LocationIcon}
                      label={UI_TEXT.contact.addressLabel}
                      value={address}
                    />
                  )}
                  {officeHours && (
                    <ContactItem
                      icon={ClockIcon}
                      label={UI_TEXT.contact.officeHoursLabel}
                      value={officeHours}
                    />
                  )}
                </div>
              )}

              <SocialLinks
                className="mt-8 md:mt-10"
                linkClassName="text-text-muted hover:text-brand-accent-text"
                iconClassName="h-6 w-6"
              />

              {/* Direct channels */}
              {hasDirectChannels && (
                <Card className="mt-8 p-5 md:mt-10 md:p-6">
                  <h3 className="text-text-heading text-base font-semibold md:text-lg">
                    {UI_TEXT.contact.directTitle}
                  </h3>
                  <p className="text-text-body mt-2 text-sm">{UI_TEXT.contact.directDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    {phone && (
                      <QuickLink
                        href={`tel:${phone}`}
                        icon={PhoneIcon}
                        label={UI_TEXT.contact.callNow}
                      />
                    )}
                    {whatsappUrl && (
                      <QuickLink
                        href={whatsappUrl}
                        icon={WhatsAppIcon}
                        label={UI_TEXT.contact.whatsappLabel}
                        external
                      />
                    )}
                    {telegramUrl && (
                      <QuickLink href={telegramUrl} icon={TelegramIcon} label="Telegram" external />
                    )}
                  </div>
                </Card>
              )}

              {/* Booking */}
              {bookingUrl && (
                <Card className={cn('mt-8 p-5 md:p-6', hasDirectChannels ? 'mt-4' : 'md:mt-10')}>
                  <h3 className="text-text-heading text-base font-semibold md:text-lg">
                    {UI_TEXT.contact.bookingTitle}
                  </h3>
                  <p className="text-text-body mt-2 text-sm">
                    {UI_TEXT.contact.bookingDescription}
                  </p>
                  <div className="mt-4">
                    <QuickLink
                      href={bookingUrl}
                      icon={CalendarIcon}
                      label={UI_TEXT.contact.bookingButton}
                      external
                    />
                  </div>
                </Card>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Map below the grid when the form takes the left column */}
        {isContactFormEnabled && mapEmbedUrl && (
          <ScrollReveal delay={0.1}>
            <div className="mt-12 md:mt-16">
              <MapEmbed className="aspect-[16/9] md:aspect-[21/9]" />
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}

function PersonItem({ person }: { person: ContactPerson }) {
  const personWhatsapp = person.whatsapp
    ? `https://wa.me/${person.whatsapp.replace(/\D/g, '')}`
    : '';

  return (
    <Card className="p-5 md:p-6">
      <p className="text-brand-accent-text text-sm font-semibold tracking-widest break-words uppercase">
        {person.role ? `${person.role} – ${person.name}` : person.name}
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {person.email && (
          <DetailLink href={`mailto:${person.email}`} icon={EmailIcon} label={person.email} />
        )}
        {person.phone && (
          <DetailLink href={`tel:${person.phone}`} icon={PhoneIcon} label={person.phone} />
        )}
        {personWhatsapp && (
          <DetailLink
            href={personWhatsapp}
            icon={WhatsAppIcon}
            label={UI_TEXT.contact.whatsappLabel}
            external
          />
        )}
      </div>
    </Card>
  );
}

function MapEmbed({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'border-border-default bg-surface-card h-full min-h-[320px] w-full overflow-hidden rounded-xl border',
        className
      )}
    >
      <iframe
        src={mapEmbedUrl}
        title={`${siteConfig.name} ${UI_TEXT.contact.mapTitleSuffix}`}
        className="h-full min-h-[320px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <Card interactive={Boolean(href)} className="flex items-center gap-4 p-5">
      <div className="bg-brand-accent/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-brand-accent-text h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-text-muted text-sm">{label}</p>
        <p className="text-text-heading text-lg font-medium break-words">{value}</p>
      </div>
    </Card>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

/** One row in a contact person card: icon + link in heading color */
function DetailLink({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-text-heading hover:text-brand-accent-text inline-flex min-w-0 items-center gap-3 [overflow-wrap:anywhere] transition-colors"
    >
      <Icon className="text-text-muted h-4 w-4 shrink-0" />
      {label}
    </a>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-brand-accent-text hover:text-brand-accent-dark inline-flex min-w-0 items-center text-sm [overflow-wrap:anywhere] transition-colors md:text-base"
    >
      <Icon className="mr-2 h-4 w-4 shrink-0" />
      {label}
    </a>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
