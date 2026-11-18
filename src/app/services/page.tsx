import { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { CTASection } from '@/components/cta-section';
import { ServicesSection } from '@/components/services-section';
import { SERVICES, SERVICES_PAGE } from '@/data/services';
import { HOME_PAGE } from '@/data/home';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(SERVICES_PAGE.meta, '/services');

export default function ServicesPage() {
  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: SERVICES_PAGE.meta.title }]}
        eyebrow={SERVICES_PAGE.eyebrow}
        title={SERVICES_PAGE.title}
        description={SERVICES_PAGE.description}
      />

      {/* ── Services Grid ─────────────────────────────────────── */}
      <ServicesSection
        title={SERVICES_PAGE.sectionTitle}
        subtitle={SERVICES_PAGE.sectionSubtitle}
        services={SERVICES}
      />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}
