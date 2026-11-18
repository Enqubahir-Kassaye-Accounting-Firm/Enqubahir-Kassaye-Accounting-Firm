import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { CTASection } from '@/components/cta-section';
import { WebsitesSection } from '@/components/websites-section';
import { USEFUL_WEBSITES, USEFUL_WEBSITES_PAGE } from '@/data/useful-websites';
import { HOME_PAGE } from '@/data/home';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(USEFUL_WEBSITES_PAGE.meta, '/useful-websites');

export default function UsefulWebsitesPage() {
  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: USEFUL_WEBSITES_PAGE.meta.title }]}
        eyebrow={USEFUL_WEBSITES_PAGE.eyebrow}
        title={USEFUL_WEBSITES_PAGE.title}
        description={USEFUL_WEBSITES_PAGE.description}
      />

      {/* ── Websites ──────────────────────────────────────────── */}
      <WebsitesSection
        title={USEFUL_WEBSITES_PAGE.sectionTitle}
        subtitle={USEFUL_WEBSITES_PAGE.sectionSubtitle}
        websites={USEFUL_WEBSITES}
      />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}
