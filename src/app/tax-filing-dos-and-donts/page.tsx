import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { CTASection } from '@/components/cta-section';
import { TaxGuideSection } from '@/components/tax-guide-section';
import { TAX_DONTS, TAX_DOS, TAX_GUIDE_PAGE } from '@/data/tax-guide';
import { HOME_PAGE } from '@/data/home';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(TAX_GUIDE_PAGE.meta, '/tax-filing-dos-and-donts');

export default function TaxFilingDosAndDontsPage() {
  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: TAX_GUIDE_PAGE.meta.title }]}
        eyebrow={TAX_GUIDE_PAGE.eyebrow}
        title={TAX_GUIDE_PAGE.title}
        description={TAX_GUIDE_PAGE.description}
      />

      {/* ── Do's and don'ts ───────────────────────────────────── */}
      <TaxGuideSection
        title={TAX_GUIDE_PAGE.sectionTitle}
        subtitle={TAX_GUIDE_PAGE.sectionSubtitle}
        dos={TAX_DOS}
        donts={TAX_DONTS}
      />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}
