import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { LegalPage } from '@/components/legal-page';
import { PRIVACY_POLICY } from '@/data/legal';
import { UI_TEXT } from '@/data/ui';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(PRIVACY_POLICY.meta, '/privacy-policy');

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      document={PRIVACY_POLICY}
      heroIcon={ShieldCheck}
      otherPage={{ href: '/terms-of-service', label: UI_TEXT.legal.termsOfService }}
    />
  );
}
