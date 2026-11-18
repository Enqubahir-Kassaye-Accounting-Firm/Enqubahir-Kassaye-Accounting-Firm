/**
 * Site Configuration — the primary file to edit for every new client.
 * Brand identity, contact details, social links, SEO and the contact form live here.
 * Page copy lives in src/data/*.
 *
 * Rule of thumb: an empty string hides the related UI (no phone → no phone row,
 * no booking.url → no booking card, no map → no map, etc.).
 *
 * The template ships with placeholder contact details, form key, booking link
 * and social links so every part of the site is visible. Replace each one with
 * the client's value or '' to hide it; `npm run check:placeholders` lists any
 * placeholder left.
 */

import type { BrandSettings } from './presets';

export type ContactFormProvider = 'none' | 'formspree' | 'web3forms';

/** What a visitor is asked to do; see `conversion` below. */
export type ConversionAction = 'message' | 'call' | 'booking' | 'whatsapp' | 'telegram' | 'none';

export type ChatChannel = 'none' | 'whatsapp' | 'telegram';

/** How the logo shows in the navbar and footer; see `logoShape` below. */
export type LogoShape = 'icon' | 'wide';

/** Homepage hero look; see `hero` below. */
export type HeroLayout = 'gradient' | 'image' | 'split';

export interface ContactPerson {
  name: string;
  role: string;
  email: string;
  /** International format, e.g. '+251911000000' */
  phone: string;
  /** Number without + or spaces, e.g. '251911000000'; empty = no WhatsApp link */
  whatsapp: string;
}

export type HomeSectionId =
  | 'hero'
  | 'about'
  | 'services'
  | 'projects'
  | 'partners'
  | 'tax-guide'
  | 'tips'
  | 'websites'
  | 'testimonials'
  | 'contact'
  | 'cta';

export interface NavLink {
  href: string;
  label: string;
  /** Homepage section this link points to; the link hides when that section is hidden. */
  section?: HomeSectionId;
}

// ── Brand Look ────────────────────────────────────────────────────────────────
// One line picks the look: 'corporate' | 'warm' | 'bold' | 'minimal'
// (defined in src/config/presets.ts). Add a key below to override just that
// value, e.g. colors: { accent: '#d4a017' } or shape: { button: 'pill' }.
// Fonts must be one of SUPPORTED_FONTS in presets.ts.
// surfaces: page, card and text colors from the client's brand guideline, per
// theme — keys page, section (alternate section background), card, border,
// heading, body, muted. Anything left out comes from the preset (light heading
// = the primary color), e.g. dark: { page: '#111111', card: '#1a1a1a' }.
// colors.onPrimary is the text on the primary color (hero, navbar, page
// headers, CTA, footer): white by default; a light primary (yellow, pastel,
// cream) needs a dark one, e.g. colors: { primary: '#f5c400', onPrimary: '#111111' }.
// After changing colors, run `npm run check:contrast`.
const brand: BrandSettings = {
  preset: 'corporate',
  colors: {
    primary: '#173F2E',
    primaryDark: '#0E2A1E',
    primaryLight: '#2A5A44',
    accent: '#D9AE55',
    accentDark: '#8A6618',
    onAccent: '#1A1608',
    onPrimary: '#FFFFFF',
  },
  // Page, card, border and text colors are the template's neutral ones
  surfaces: { light: {}, dark: {} },
  fonts: { heading: 'Manrope', body: 'Inter' },
  shape: {},
};

export type ThemeMode = 'light' | 'dark' | 'both';

export const siteConfig = {
  brand,

  // 'both'  → follows the visitor's system setting, with a light/dark toggle
  // 'light' or 'dark' → the site always uses that theme; the toggle is hidden
  theme: 'both' as ThemeMode,

  // ── Homepage Sections ───────────────────────────────────────────────────────
  // The order here is the order on the homepage. Remove an id to hide that
  // section; nav and footer links pointing at it hide too. Projects, partners,
  // testimonials and services also hide on their own when their data is empty.
  homeSections: [
    'hero',
    'about',
    'services',
    'partners',
    'tax-guide',
    'tips',
    'websites',
    'testimonials',
    'contact',
    'cta',
  ] as HomeSectionId[],

  // ── Hero Layout ─────────────────────────────────────────────────────────────
  // 'gradient' → animated gradient on the primary color, no photo (default;
  //              for clients without a good photo)
  // 'image'    → one full-width photo behind the hero under a primary-color
  //              overlay; title, subtitle and buttons centred
  // 'split'    → text on the primary color on the left, the photo on the right
  //              fading into it; on phones the photo sits under the text
  // 'image' and 'split' need image.url (a photo in public/hero/, ~1920 px wide
  // after `npm run images:optimize`); without it the gradient shows.
  hero: {
    layout: 'gradient' as HeroLayout,
    image: { url: '', alt: '' },
    // Focal point (CSS object-position) so narrow screens keep the right part
    // of the photo, e.g. 'center', '30% 50%', 'right bottom'
    imagePosition: 'center',
    // How strongly the primary color covers the photo in 'image' (0–1). Text
    // stays readable on any photo when `npm run check:contrast` passes.
    overlay: 0.7,
    // Small label in a corner of the photo, e.g. 'On site in the Afar region';
    // empty hides it
    caption: '',
  },

  // ── Navigation ──────────────────────────────────────────────────────────────
  // One source of truth for nav links across desktop, tablet, mobile and footer
  // (the footer lists the desktop links except Home).
  navigation: {
    // Every link goes to its section on the homepage; the section's own
    // "See all" button opens the full page.
    desktop: [
      { href: '/', label: 'Home' },
      { href: '/#about', label: 'About', section: 'about' },
      { href: '/#services', label: 'Services', section: 'services' },
      { href: '/#tips', label: 'Accounting Tips', section: 'tips' },
      { href: '/#tax-guide', label: 'Do’s & Don’ts', section: 'tax-guide' },
      { href: '/#websites', label: 'Websites', section: 'websites' },
    ] as NavLink[],
    tablet: [
      { href: '/', label: 'Home' },
      { href: '/#about', label: 'About', section: 'about' },
      { href: '/#services', label: 'Services', section: 'services' },
    ] as NavLink[],
    // The header button is the primary conversion action (see `conversion`)
  },

  // ── Conversion ──────────────────────────────────────────────────────────────
  // What visitors are asked to do. The hero's main button, the closing CTA
  // section and the header button follow it (the hero's second button is
  // always HOME_PAGE.heroSecondaryButton*). Actions: 'message' (contact form /
  // section), 'call' (contact.phone), 'booking' (booking.url), 'whatsapp' /
  // 'telegram' (social links), 'none'. An action whose detail is empty is
  // skipped: a
  // missing primary falls back to 'message', a missing secondary shows the
  // CTA's own secondary link (HOME_PAGE.ctaSecondaryButton*).
  // Default: message first, call second. Consultants, clinics, lawyers who live
  // in a calendar: primary 'booking', secondary 'message'.
  // Button labels: UI_TEXT.conversion in src/data/ui.ts; the hero's main button
  // can have its own (HOME_PAGE.heroPrimaryButtonText, e.g. 'Contact Us').
  conversion: {
    primary: 'message' as ConversionAction,
    secondary: 'call' as ConversionAction,
  },

  // ── Booking ─────────────────────────────────────────────────────────────────
  // Any booking page link: Cal.com, Calendly, a Google Calendar appointment page.
  // Empty = no booking anywhere. When set, the contact section shows a "book a
  // call" card and 'booking' can be a conversion action. Link only — no
  // embedded calendar script. No tool yet: Google Calendar booking page for
  // Gmail users, otherwise Cal.com.
  booking: {
    url: '',
  },

  // ── Chat Button ─────────────────────────────────────────────────────────────
  // One floating chat button on every page, or none: 'none' | 'whatsapp' |
  // 'telegram'. Uses social.whatsapp / social.telegram; hidden if that is empty.
  chat: 'none' as ChatChannel,

  // ── Brand Identity ──────────────────────────────────────────────────────────
  name: 'Enqubahir Kassaye Authorized Accounting Firm',
  // Navbar and footer show the name in two lines: nameShort in bold, nameSub
  // small in the accent color under it. Leave nameSub empty for one line.
  nameShort: 'Enqubahir Kassaye',
  nameSub: 'Authorized Accounting Firm',
  tagline: 'Accounting, tax and audit services in Addis Ababa',
  description:
    'An AABE-licensed accounting firm in Bole, Addis Ababa. We keep books, file taxes, carry out audits, prepare IFRS and IPSAS statements, run payroll and help with business registration.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  // Path under public/, e.g. '/logo.png' — used in navbar, footer, icons and
  // structured data. Empty = no logo yet: the name shows as text.
  logo: '/logo.png',
  logoAlt: 'Enqubahir Kassaye Authorized Accounting Firm logo',
  // Navbar and footer: 'icon' → a square mark in a small box with the name
  // beside it; 'wide' → a wordmark (logo with the name in it) shown alone,
  // 32px high
  logoShape: 'icon' as LogoShape,
  // Optional light version of the logo for the navbar and footer, which sit on
  // the primary color (a dark logo disappears there). Empty = `logo`.
  logoOnPrimary: '',
  // Open Graph locale (e.g. 'en_US', 'am_ET') and <html lang> value
  locale: 'en_ET',
  language: 'en',

  // ── Contact Details ─────────────────────────────────────────────────────────
  contact: {
    email: 'info@enqubahirkassaye.com',
    phone: '+251911475606', // International format, e.g. '+251911000000'
    address: 'Bole Sub-City, 22 Mazoria, Addis Ababa, Ethiopia',
    officeHours: 'Mon–Fri 8:00 AM – 6:00 PM · Sat 8:00 AM – 12:00 PM · Sun closed',
    // Google Maps → Share → Embed a map → copy only the src="..." URL
    mapEmbedUrl: '',
    // Default country for the phone field in the contact form (ISO code)
    defaultPhoneCountry: 'ET',
    // Contact people shown in the contact section instead of the single
    // company email / phone / address / office hours. Empty = company details.
    // e.g. { name: 'Hana Tesfaye', role: 'Sales', email: 'hana@client.com',
    //        phone: '+251911000000', whatsapp: '251911000000' }
    people: [] as ContactPerson[],
  },

  // ── Social Links ────────────────────────────────────────────────────────────
  // Leave any value empty to hide it.
  social: {
    telegram: '', // Username only, without @ (also used by chat: 'telegram')
    whatsapp: '', // Number without + or spaces, e.g. '251911000000' (also used by chat: 'whatsapp')
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
    x: '',
    xHandle: '', // e.g. '@brand' — used for Twitter/X cards
  },

  // ── Contact Form ────────────────────────────────────────────────────────────
  // 'web3forms' → default. formKey is the access key from https://web3forms.com
  //               (free, sends to the client's email, works on static hosting)
  // 'formspree' → formKey is the form ID from https://formspree.io (e.g. 'xyzabcde')
  // 'none'      → form hidden, only contact details/socials/map are shown
  // The form also stays hidden while formKey is empty. The template's
  // placeholder key shows the form, but sending fails until a real key is set.
  // "What can we help you with?" lists "General question", every service, then
  // "Other" (labels in UI_TEXT.contact.form).
  contactForm: {
    provider: 'web3forms' as ContactFormProvider,
    formKey: '', // The client's own Web3Forms key arrives at launch; until then, sending opens the visitor's email app
  },

  // ── SEO & Open Graph ────────────────────────────────────────────────────────
  seo: {
    titleDefault: 'Enqubahir Kassaye Accounting Firm | Addis Ababa',
    titleTemplate: '%s | Enqubahir Kassaye Accounting Firm',
    metaDescription:
      'AABE-licensed accounting firm in Bole, Addis Ababa. Bookkeeping, tax filing, audit, IFRS and IPSAS reports and payroll. Book a free consultation.',
    keywords: [] as string[],
    category: 'business',
    ogTitle: 'Enqubahir Kassaye Accounting Firm | Addis Ababa',
    ogDescription:
      'Your books in order. Your taxes filed on time. Accounting, tax and audit services in Addis Ababa.',
    // '/og-default.png' is generated from the logo, name and tagline. For a custom
    // 1200×630 image, put it in public/ and set its path here, e.g. '/og-image.png'.
    ogImage: '/og-default.png',
    ogImageAlt: 'Enqubahir Kassaye Authorized Accounting Firm',
  },

  // ── JSON-LD Structured Data ─────────────────────────────────────────────────
  schema: {
    // Any schema.org business type, e.g. 'LocalBusiness', 'GeneralContractor', 'ChildCare'
    type: 'AccountingService',
    alternateName: [] as string[],
    slogan: 'Your books in order. Your taxes filed on time.',
    areaServed: ['Addis Ababa'] as string[],
    priceRange: '',
    knowsAbout: [
      'Bookkeeping',
      'Tax filing',
      'Audit',
      'IFRS',
      'IPSAS',
      'Payroll',
      'Business advisory',
    ] as string[],
    availableLanguage: ['English'] as string[],
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    description:
      'AABE-licensed accounting firm in Bole, Addis Ababa. Bookkeeping, tax filing, audit, financial reporting, payroll and business advice.',
    copyrightEntity: 'Enqubahir Kassaye Authorized Accounting Firm',
    // Footer links that are not in the navbar; they hide with their homepage section
    extraLinks: [{ href: '/#partners', label: 'Our Partners', section: 'partners' }] as NavLink[],
  },

  // ── Agency Credit ───────────────────────────────────────────────────────────
  // "Built by …" at the bottom left of the footer, with email and Instagram
  // icons. Leave as is on client sites. Empty name hides the credit; an empty
  // email or instagram hides that icon.
  credit: {
    name: 'Digital Aksumite',
    url: 'https://digitalaksumite.com',
    email: 'hello@digitalaksumite.com',
    instagram: 'https://instagram.com/digitalaksumite',
  },

  // ── Legal Pages ─────────────────────────────────────────────────────────────
  legal: {
    companyFullName: 'Enqubahir Kassaye Authorized Accounting Firm',
    jurisdiction: 'Ethiopia',
    courtLocation: 'Addis Ababa, Ethiopia',
    lastUpdated: 'November 2026',
  },
};

export type SiteConfig = typeof siteConfig;
