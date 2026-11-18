import { Fragment, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { ProjectsSection } from '@/components/projects-section';
import { PartnersSection } from '@/components/partners-section';
import { TaxGuideSection } from '@/components/tax-guide-section';
import { TipsSection } from '@/components/tips-section';
import { WebsitesSection } from '@/components/websites-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ContactSection } from '@/components/contact-section';
import { CTASection } from '@/components/cta-section';
import { SectionDivider } from '@/components/section-divider';
import type { HomeSectionId } from '@/config/site';
import { HOME_PAGE } from '@/data/home';
import { ABOUT_SUMMARY } from '@/data/about';
import { SERVICES } from '@/data/services';
import { FEATURED_PROJECTS } from '@/data/projects';
import { PARTNERS } from '@/data/partners';
import { TESTIMONIALS } from '@/data/testimonials';
import { HOME_ACCOUNTING_TIPS } from '@/data/accounting-tips';
import { HOME_TAX_DONTS, HOME_TAX_DOS } from '@/data/tax-guide';
import { HOME_USEFUL_WEBSITES } from '@/data/useful-websites';
import { CONTACT_PAGE } from '@/data/contact';
import { VISIBLE_HOME_SECTIONS } from '@/lib/home-sections';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical({}, '/');

const SECTIONS = new Map<HomeSectionId, () => ReactNode>([
  ['hero', () => <Hero homePage={HOME_PAGE} />],
  ['about', () => <AboutSection about={ABOUT_SUMMARY} />],
  [
    'services',
    () => (
      <ServicesSection
        title={HOME_PAGE.servicesTitle}
        subtitle={HOME_PAGE.servicesSubtitle}
        services={SERVICES}
      />
    ),
  ],
  [
    'projects',
    () => (
      <ProjectsSection
        title={HOME_PAGE.projectsTitle}
        subtitle={HOME_PAGE.projectsSubtitle}
        projects={FEATURED_PROJECTS}
      />
    ),
  ],
  ['partners', () => <PartnersSection title={HOME_PAGE.partnersTitle} partners={PARTNERS} />],
  [
    'tax-guide',
    () => (
      <TaxGuideSection
        title={HOME_PAGE.taxGuideTitle}
        subtitle={HOME_PAGE.taxGuideSubtitle}
        dos={HOME_TAX_DOS}
        donts={HOME_TAX_DONTS}
        seeAllHref="/tax-filing-dos-and-donts"
      />
    ),
  ],
  [
    'tips',
    () => (
      <TipsSection
        title={HOME_PAGE.tipsTitle}
        subtitle={HOME_PAGE.tipsSubtitle}
        tips={HOME_ACCOUNTING_TIPS}
        seeAllHref="/accounting-tips"
      />
    ),
  ],
  [
    'websites',
    () => (
      <WebsitesSection
        title={HOME_PAGE.websitesTitle}
        subtitle={HOME_PAGE.websitesSubtitle}
        websites={HOME_USEFUL_WEBSITES}
        seeAllHref="/useful-websites"
      />
    ),
  ],
  [
    'testimonials',
    () => (
      <TestimonialsSection
        title={HOME_PAGE.testimonialsTitle}
        subtitle={HOME_PAGE.testimonialsSubtitle}
        testimonials={TESTIMONIALS}
      />
    ),
  ],
  ['contact', () => <ContactSection contactPage={CONTACT_PAGE} />],
  ['cta', () => <CTASection homePage={HOME_PAGE} />],
]);

/** Full-bleed bands that sit flush against their neighbours (no divider line). */
const NO_DIVIDER = new Set<HomeSectionId>(['partners', 'cta']);

export default function Home() {
  return (
    <main className="bg-surface-page">
      {VISIBLE_HOME_SECTIONS.map((id, index) => {
        const previous = VISIBLE_HOME_SECTIONS[index - 1];
        const showDivider = previous && !NO_DIVIDER.has(previous) && !NO_DIVIDER.has(id);
        return (
          <Fragment key={id}>
            {showDivider && <SectionDivider />}
            {SECTIONS.get(id)?.()}
          </Fragment>
        );
      })}
    </main>
  );
}
