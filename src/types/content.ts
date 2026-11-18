/**
 * Content Type Definitions
 * Shapes for the content files in src/data/*
 */

import type { ServiceIconName, TagStyle } from '@/lib/icons';

export interface ImageAsset {
  /** Path under /public, e.g. '/projects/villa.jpg' */
  url: string;
  alt: string;
}

export interface Project {
  title: string;
  slug: string;
  client?: string;
  location?: string;
  summary: string;
  description: string;
  image?: ImageAsset;
  gallery?: ImageAsset[];
  tags: string[];
  completedDate?: string;
  /** Optional external link (e.g. a live website or case study) */
  url?: string;
  featured: boolean;
}

export interface Testimonial {
  quote: string;
  clientName: string;
  company: string;
  /** Job title, shown before the company (e.g. 'Managing Director') */
  role?: string;
  /** Short line pulled from the quote, shown large above it in the carousel */
  headline?: string;
}

/** One accounting tip: a short line for the homepage card, why and how for the page */
export interface AccountingTip {
  title: string;
  summary: string;
  why: string;
  how: string;
}

/** One do or don't in the tax filing guide */
export interface TaxGuidePoint {
  title: string;
  text: string;
}

/** An official website with a short description of what it is for */
export interface UsefulWebsite {
  name: string;
  /** Full link (https://…); each one is opened and checked before it goes in */
  url: string;
  description: string;
}

export interface Partner {
  name: string;
  /** Path under /public, e.g. '/partners/acme.png'. Without a logo, the name is shown as text. */
  logo?: string;
  url?: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  heroText?: string;
  howToStart?: string;
  howToStartTagline?: string;
  tag: string;
  /** Tag colour, one of TAG_STYLES in src/lib/icons.ts. Default 'accent'. */
  tagStyle?: TagStyle;
  /** Card icon, one of SERVICE_ICONS in src/lib/icons.ts. Default 'zap'. */
  icon?: ServiceIconName;
  isHighlighted?: boolean;
  forWho: string;
  includes: string[];
  ctaText: string;
}

export interface HomePage {
  /** 1 to 3 lines; each line is shown on its own row */
  heroTitleLines: [string] | [string, string] | [string, string, string];
  heroSubtitle: string;
  /** Label of the hero's main button (its link follows site.ts → conversion.primary); empty = the UI_TEXT.conversion label */
  heroPrimaryButtonText: string;
  /** The hero's second button, always this link (e.g. 'Our Services' → '/#services') */
  heroSecondaryButtonText: string;
  heroSecondaryButtonUrl: string;
  servicesTitle: string;
  servicesSubtitle: string;
  projectsTitle: string;
  projectsSubtitle: string;
  partnersTitle: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  taxGuideTitle: string;
  taxGuideSubtitle: string;
  tipsTitle: string;
  tipsSubtitle: string;
  websitesTitle: string;
  websitesSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  /** CTA buttons follow site.ts → conversion; this link shows when there is no secondary action */
  ctaSecondaryButtonText: string;
  ctaSecondaryButtonUrl: string;
}

/** Browser title and search-result description for a page */
export interface PageMeta {
  title: string;
  description: string;
}

export interface ServicesPage {
  meta: PageMeta;
  eyebrow: string;
  title: string;
  description: string;
  sectionTitle: string;
  sectionSubtitle: string;
}

/** A list page under the header: tips, tax guide, websites */
export interface ListPage {
  meta: PageMeta;
  eyebrow: string;
  title: string;
  description: string;
  sectionTitle: string;
  sectionSubtitle: string;
}

export interface ProjectsPage {
  meta: PageMeta;
  title: string;
}

export interface AboutSummary {
  title: string;
  summary: string;
  buttonText: string;
}

/** When a conditional legal paragraph shows (see src/data/legal.ts) */
export type LegalCondition = 'analytics' | 'noAnalytics' | 'contactForm';

/** Plain text; tokens {company} {jurisdiction} {courtLocation} {formProvider} {email} are filled in. */
export type LegalParagraph = string | { text: string; when: LegalCondition };

export interface LegalSection {
  title: string;
  paragraphs: LegalParagraph[];
}

export interface LegalDocument {
  /** false until the client (and ideally a lawyer) has approved the wording */
  reviewed: boolean;
  meta: PageMeta;
  sections: LegalSection[];
  closing: { title: string; body: string };
}

export interface ContactPage {
  title: string;
  description: string;
  formTitle: string;
  formDescription: string;
  successMessage: string;
}
