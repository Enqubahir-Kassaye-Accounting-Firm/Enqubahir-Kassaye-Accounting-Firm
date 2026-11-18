import type { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { LegalPage } from '@/components/legal-page';
import { TERMS_OF_SERVICE } from '@/data/legal';
import { UI_TEXT } from '@/data/ui';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(TERMS_OF_SERVICE.meta, '/terms-of-service');

export default function TermsOfServicePage() {
  return (
    <LegalPage
      document={TERMS_OF_SERVICE}
      heroIcon={Scale}
      otherPage={{ href: '/privacy-policy', label: UI_TEXT.legal.privacyPolicy }}
    />
  );
}
