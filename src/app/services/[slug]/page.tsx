import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { SectionHeading } from '@/components/section-heading';
import { cn } from '@/lib/utils';
import { CTASection } from '@/components/cta-section';
import { PremiumButton } from '@/components/premium-button';
import { SERVICES } from '@/data/services';
import { TAG_STYLES } from '@/lib/icons';
import { SectionDivider } from '@/components/section-divider';
import { withCanonical } from '@/lib/seo';
import { HOME_PAGE } from '@/data/home';
import { Check, ArrowLeft } from 'lucide-react';
import { UI_TEXT } from '@/data/ui';

export const dynamicParams = false;

// The static export fails on a dynamic route with no pages, so a site without
// services builds one placeholder that shows the 404 page
export function generateStaticParams() {
  if (SERVICES.length === 0) return [{ slug: 'none' }];
  return SERVICES.map((service) => ({ slug: service.slug }));
}

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return { title: UI_TEXT.services.notFoundTitle };
  }
  return withCanonical(
    { title: service.title, description: service.fullDescription },
    `/services/${slug}`
  );
}

const BODY = 'text-lg leading-relaxed text-text-body';

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const heroTagColor = TAG_STYLES[service.tagStyle ?? 'accent'].hero;

  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: service.title }]}
        align="left"
        badge={
          service.tag && (
            <span
              className={cn(
                'mb-4 inline-block rounded-full border px-3.5 py-1 text-sm font-semibold',
                heroTagColor
              )}
            >
              {service.tag}
            </span>
          )
        }
        title={service.title}
        description={service.heroText || service.description}
      >
        {service.forWho && (
          <p className="text-on-primary/60 mt-3 text-sm font-medium italic">
            {UI_TEXT.services.forPrefix} {service.forWho}
          </p>
        )}
        <div className="mt-8">
          <PremiumButton href="/#contact" variant="primary">
            {service.ctaText}
          </PremiumButton>
        </div>
      </PageHeader>

      {/* ── Full Description ──────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              size="md"
              align="left"
              eyebrow={UI_TEXT.services.detailAboutLabel}
              className="mb-5"
            />
            <Card accent className="p-8 md:p-10">
              <p className={cn(BODY, 'pl-2')}>{service.fullDescription}</p>
            </Card>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ── What's Included ───────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              size="md"
              align="left"
              eyebrow={UI_TEXT.services.detailIncludesLabel}
              title={UI_TEXT.services.detailIncludesTitle}
            />
            <div className="mt-8 space-y-4">
              {service.includes.map((item, index) => (
                <Card key={index} accent interactive className="flex items-start gap-4 px-6 py-5">
                  <div className="bg-brand-accent/10 mt-0.5 flex-shrink-0 rounded-full p-1">
                    <Check className="text-brand-accent-text h-4 w-4" />
                  </div>
                  <p className="text-text-body pl-1 text-base leading-relaxed">{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ── How to Start ──────────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              size="md"
              align="left"
              eyebrow={UI_TEXT.services.detailHowToStartLabel}
              title={UI_TEXT.services.detailHowToStartTitle}
            />
            <p className={cn('mt-4', BODY)}>
              {service.howToStart || UI_TEXT.services.detailHowToStartFallback}
            </p>
            <p className="text-text-muted mt-3 text-base leading-relaxed">
              {service.howToStartTagline || UI_TEXT.services.detailHowToStartTaglineFallback}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PremiumButton href="/#contact" variant="primary">
                {service.ctaText}
              </PremiumButton>
              <Link
                href="/#services"
                className="group text-brand-accent-text hover:text-brand-accent-dark inline-flex items-center gap-2 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {UI_TEXT.services.viewAll}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}
