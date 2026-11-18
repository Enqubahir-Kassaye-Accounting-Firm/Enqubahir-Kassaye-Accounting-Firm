/**
 * Legal Page
 * Renders a LegalDocument from src/data/legal.ts (Privacy Policy, Terms of Service).
 * Conditional paragraphs show only when analytics / the contact form are on.
 */

import Link from 'next/link';
import { Mail, MessageSquare, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { SectionDivider } from '@/components/section-divider';
import { env } from '@/config/env';
import { siteConfig } from '@/config/site';
import { UI_TEXT } from '@/data/ui';
import { isContactFormEnabled } from '@/lib/contact-form';
import type { LegalCondition, LegalDocument, LegalParagraph } from '@/types/content';

interface LegalPageProps {
  document: LegalDocument;
  heroIcon: LucideIcon;
  /** The other legal page, linked in the footer note */
  otherPage: { href: string; label: string };
}

const { email } = siteConfig.contact;
const { provider } = siteConfig.contactForm;

const CONDITIONS = new Map<LegalCondition, boolean>([
  ['analytics', Boolean(env.NEXT_PUBLIC_GA_ID)],
  ['noAnalytics', !env.NEXT_PUBLIC_GA_ID],
  ['contactForm', isContactFormEnabled],
]);

const TOKENS = new Map([
  ['{company}', siteConfig.legal.companyFullName],
  ['{jurisdiction}', siteConfig.legal.jurisdiction],
  ['{courtLocation}', siteConfig.legal.courtLocation],
  // eslint-disable-next-line security/detect-object-injection -- provider is a typed union from site.ts
  ['{formProvider}', provider === 'none' ? '' : UI_TEXT.legal.formProviders[provider]],
]);

/** The paragraphs that apply to this site, as plain text */
function visibleText(paragraphs: LegalParagraph[]): string[] {
  return paragraphs.flatMap((paragraph) =>
    typeof paragraph === 'string'
      ? [paragraph]
      : CONDITIONS.get(paragraph.when)
        ? [paragraph.text]
        : []
  );
}

/** 0 → '01', 9 → '10' */
function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

function Paragraph({ text }: { text: string }) {
  const filled = text.replace(
    /\{company\}|\{jurisdiction\}|\{courtLocation\}|\{formProvider\}/g,
    (token) => TOKENS.get(token) ?? token
  );
  const parts = filled.split('{email}');

  return (
    <p className="text-text-body mb-4 text-lg leading-relaxed last:mb-0">
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 &&
            (email ? (
              <a href={`mailto:${email}`} className="text-brand-accent-text hover:underline">
                {email}
              </a>
            ) : (
              <Link href="/#contact" className="text-brand-accent-text hover:underline">
                {UI_TEXT.legal.emailFallback}
              </Link>
            ))}
          {part}
        </span>
      ))}
    </p>
  );
}

export function LegalPage({ document, heroIcon: HeroIcon, otherPage }: LegalPageProps) {
  const { meta, closing } = document;
  const sections = document.sections
    .map((section) => ({ ...section, text: visibleText(section.paragraphs) }))
    .filter((section) => section.text.length > 0);

  return (
    <main className="bg-surface-section min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: meta.title }]}
        eyebrow={UI_TEXT.legal.eyebrow}
        title={meta.title}
        description={meta.description}
      >
        <div className="mt-6 flex items-center justify-center gap-3">
          <HeroIcon className="text-brand-accent-text h-5 w-5" />
          <span className="text-on-primary/60 text-sm">
            {UI_TEXT.legal.lastUpdated} {siteConfig.legal.lastUpdated}
          </span>
        </div>
      </PageHeader>

      {/* Content Sections */}
      <section className="section-y-sm relative">
        <Container>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* Side index: sticky from lg, a plain list above the sections below it */}
            <nav
              aria-label={UI_TEXT.legal.onThisPage}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <h2 className="text-brand-accent-text mb-4 text-sm font-semibold tracking-widest uppercase">
                {UI_TEXT.legal.onThisPage}
              </h2>
              <ol className="border-border-default border-l">
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${index + 1}`}
                      className="text-text-body hover:text-text-heading flex gap-3 py-1.5 pl-4 text-sm transition-colors"
                    >
                      <span className="text-brand-accent-text font-semibold tabular-nums">
                        {sectionNumber(index)}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Sections, separated by divider lines */}
            <div className="min-w-0">
              {sections.map((section, index) => (
                <div key={section.title}>
                  {index > 0 && <SectionDivider />}
                  <section id={`section-${index + 1}`} className={index === 0 ? 'pb-10' : 'py-10'}>
                    <span className="text-brand-accent-text text-xs font-semibold tracking-widest uppercase">
                      {UI_TEXT.legal.sectionLabel} {sectionNumber(index)}
                    </span>
                    <h2 className="text-text-heading mt-2 mb-6 text-xl font-bold md:text-2xl">
                      {section.title}
                    </h2>
                    {section.text.map((paragraph) => (
                      <Paragraph key={paragraph} text={paragraph} />
                    ))}
                  </section>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            {/* Contact CTA */}
            <Card className="mt-16 p-8 text-center md:p-12">
              <HeroIcon className="text-brand-accent-text mx-auto mb-4 h-12 w-12" />
              <h3 className="text-text-heading mb-3 text-2xl font-bold">{closing.title}</h3>
              <p className="text-text-body mx-auto mb-8 max-w-xl">{closing.body}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                {email && (
                  <Link
                    href={`mailto:${email}`}
                    className="bg-brand-accent text-text-on-accent hover:bg-brand-accent/90 rounded-button px-btn-x py-btn-y text-btn inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Mail className="h-4 w-4" />
                    {UI_TEXT.legal.emailButton}
                  </Link>
                )}
                <Link
                  href="/#contact"
                  className="border-brand-accent/40 text-brand-accent-text hover:bg-brand-accent/10 rounded-button px-btn-x py-btn-y text-btn inline-flex items-center gap-2 border font-semibold transition-all duration-300 hover:scale-105"
                >
                  <MessageSquare className="h-4 w-4" />
                  {UI_TEXT.legal.contactButton}
                </Link>
              </div>
            </Card>

            {/* Footer Note */}
            <div className="border-border-default mt-12 border-t pt-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-text-muted text-sm">
                  © {new Date().getFullYear()} {siteConfig.footer.copyrightEntity}.{' '}
                  {UI_TEXT.footer.rightsReserved}
                </p>
                <div className="flex items-center gap-6">
                  <Link
                    href={otherPage.href}
                    className="hover:text-brand-accent-text text-text-muted text-sm transition-colors"
                  >
                    {otherPage.label}
                  </Link>
                  <span className="text-brand-accent-text text-sm">{meta.title}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
