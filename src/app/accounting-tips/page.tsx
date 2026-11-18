import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { CTASection } from '@/components/cta-section';
import { TipsSection } from '@/components/tips-section';
import { ACCOUNTING_TIPS, ACCOUNTING_TIPS_PAGE } from '@/data/accounting-tips';
import { HOME_PAGE } from '@/data/home';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(ACCOUNTING_TIPS_PAGE.meta, '/accounting-tips');

export default function AccountingTipsPage() {
  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: ACCOUNTING_TIPS_PAGE.meta.title }]}
        eyebrow={ACCOUNTING_TIPS_PAGE.eyebrow}
        title={ACCOUNTING_TIPS_PAGE.title}
        description={ACCOUNTING_TIPS_PAGE.description}
      />

      {/* ── Tips ──────────────────────────────────────────────── */}
      <TipsSection
        title={ACCOUNTING_TIPS_PAGE.sectionTitle}
        subtitle={ACCOUNTING_TIPS_PAGE.sectionSubtitle}
        tips={ACCOUNTING_TIPS}
        detailed
      />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}
