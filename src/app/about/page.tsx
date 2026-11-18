import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { SectionHeading } from '@/components/section-heading';
import { CTASection } from '@/components/cta-section';
import { PremiumButton } from '@/components/premium-button';
import { HOME_PAGE } from '@/data/home';
import { ABOUT_PAGE_META, ABOUT_PAGE_SECTIONS } from '@/data/about';
import { UI_TEXT } from '@/data/ui';
import { SectionDivider } from '@/components/section-divider';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(ABOUT_PAGE_META, '/about');

const BODY = 'text-lg leading-relaxed text-text-body';

export default function AboutPage() {
  const { whoWeAre, whatWeBuild, theRealPurpose, whatWeBelieve, whoBuildFor } = ABOUT_PAGE_SECTIONS;

  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: UI_TEXT.about.breadcrumb }]}
        eyebrow={whoWeAre.sectionLabel}
        title={whoWeAre.headline}
        description={whoWeAre.body}
      />

      {/* ── Origin Story ─────────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Card accent className="p-8 md:p-10">
              <p className={`${BODY} pl-2`}>{whoWeAre.origin}</p>
            </Card>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ── What We Build ─────────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <SectionHeading
            size="md"
            eyebrow={whatWeBuild.sectionLabel}
            title={whatWeBuild.headline}
            text={whatWeBuild.intro}
            className="mx-auto max-w-3xl"
          />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {whatWeBuild.dimensions.map((dim) => (
              <Card key={dim.roman} accent interactive className="p-8">
                <p className="text-brand-accent-text mb-2 pl-2 font-mono text-xs font-semibold tracking-widest uppercase">
                  {dim.roman}
                </p>
                <h3 className="text-text-heading mb-3 pl-2 text-xl font-bold">{dim.title}</h3>
                <p className="text-text-body pl-2 leading-relaxed">{dim.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ── The Real Purpose ──────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              size="md"
              eyebrow={theRealPurpose.sectionLabel}
              title={theRealPurpose.headline}
              className="mb-6"
            />
            <p className={`mt-5 ${BODY}`}>{theRealPurpose.body}</p>
            <Card as="blockquote" accent className="my-8 p-8 md:p-10">
              <p className="text-text-heading pl-2 text-xl leading-relaxed font-medium italic md:text-2xl">
                &ldquo;{theRealPurpose.pullQuote}&rdquo;
              </p>
            </Card>
            <p className={BODY}>{theRealPurpose.bodyAfterQuote}</p>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ── What We Believe ───────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <SectionHeading
            size="md"
            eyebrow={whatWeBelieve.sectionLabel}
            title={whatWeBelieve.headline}
            text={whatWeBelieve.intro}
            className="mx-auto max-w-3xl"
          />
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {whatWeBelieve.beliefs.map((belief, index) => (
              <Card key={index} accent interactive className="p-7">
                <p className="text-text-heading pl-2 text-lg font-bold">{belief.lead}</p>
                <p className="text-text-body mt-2 pl-2 leading-relaxed">{belief.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ── Who We Build For ──────────────────────────────────── */}
      <section className="section-y-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              size="md"
              eyebrow={whoBuildFor.sectionLabel}
              title={whoBuildFor.headline}
              className="mb-6"
            />
            <p className={`mt-5 ${BODY}`}>{whoBuildFor.body}</p>
            <p className="text-text-heading mt-4 text-lg font-medium">{whoBuildFor.closing}</p>
            <div className="mt-10">
              <PremiumButton href="/#contact" variant="primary">
                {UI_TEXT.about.contactButton}
              </PremiumButton>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}
