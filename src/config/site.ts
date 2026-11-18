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
  | 'testimonials'
  | 'contact'
  | 'cta';

interface NavLink {
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
  colors: {},
  surfaces: { light: {}, dark: {} },
  fonts: {},
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
    'projects',
    'partners',
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
    desktop: [
      { href: '/', label: 'Home' },
      { href: '/#about', label: 'About', section: 'about' },
      { href: '/#services', label: 'Services', section: 'services' },
      { href: '/#projects', label: 'Projects', section: 'projects' },
      { href: '/#testimonials', label: 'Testimonials', section: 'testimonials' },
      { href: '/#contact', label: 'Contact', section: 'contact' },
    ] as NavLink[],
    tablet: [
      { href: '/', label: 'Home' },
      { href: '/#about', label: 'About', section: 'about' },
      { href: '/#services', label: 'Services', section: 'services' },
      { href: '/#projects', label: 'Projects', section: 'projects' },
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
    url: 'https://cal.com/yourusername',
  },

  // ── Chat Button ─────────────────────────────────────────────────────────────
  // One floating chat button on every page, or none: 'none' | 'whatsapp' |
  // 'telegram'. Uses social.whatsapp / social.telegram; hidden if that is empty.
  chat: 'none' as ChatChannel,

  // ── Brand Identity ──────────────────────────────────────────────────────────
  name: 'Brand Name',
  tagline: 'Your tagline here',
  description: 'Your company description goes here.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  // Path under public/, e.g. '/logo.png' — used in navbar, footer, icons and
  // structured data. Empty = no logo yet: the name shows as text.
  logo: '',
  logoAlt: 'Brand Name Logo',
  // Navbar and footer: 'icon' → a square mark in a small box with the name
  // beside it; 'wide' → a wordmark (logo with the name in it) shown alone,
  // 32px high
  logoShape: 'icon' as LogoShape,
  // Optional light version of the logo for the navbar and footer, which sit on
  // the primary color (a dark logo disappears there). Empty = `logo`.
  logoOnPrimary: '',
  // Open Graph locale (e.g. 'en_US', 'am_ET') and <html lang> value
  locale: 'en_US',
  language: 'en',

  // ── Contact Details ─────────────────────────────────────────────────────────
  contact: {
    email: 'hello@example.com',
    phone: '+15555550100', // International format, e.g. '+251911000000'
    address: '123 Main St, City, Country',
    officeHours: 'Mon–Fri, 9:00 AM – 5:00 PM',
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
    telegram: 'yourusername', // Username only, without @ (also used by chat: 'telegram')
    whatsapp: '15555550100', // Number without + or spaces, e.g. '251911000000' (also used by chat: 'whatsapp')
    facebook: 'https://facebook.com/yourusername',
    instagram: 'https://instagram.com/yourusername',
    linkedin: 'https://linkedin.com/company/yourusername',
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
    formKey: 'REPLACE_ME',
  },

  // ── SEO & Open Graph ────────────────────────────────────────────────────────
  seo: {
    titleDefault: 'Brand Name | Your Tagline',
    titleTemplate: '%s | Brand Name',
    metaDescription: 'Your homepage meta description goes here.',
    keywords: [] as string[],
    category: 'business',
    ogTitle: 'Brand Name | Your Tagline',
    ogDescription: 'Your Open Graph description goes here.',
    // '/og-default.png' is generated from the logo, name and tagline. For a custom
    // 1200×630 image, put it in public/ and set its path here, e.g. '/og-image.png'.
    ogImage: '/og-default.png',
    ogImageAlt: 'Brand Name',
  },

  // ── JSON-LD Structured Data ─────────────────────────────────────────────────
  schema: {
    // Any schema.org business type, e.g. 'LocalBusiness', 'GeneralContractor', 'ChildCare'
    type: 'LocalBusiness',
    alternateName: [] as string[],
    slogan: '',
    areaServed: [] as string[],
    priceRange: '',
    knowsAbout: [] as string[],
    availableLanguage: ['English'] as string[],
  },

  // ── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    description: 'Your company description goes here.',
    copyrightEntity: 'Brand Name',
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
    companyFullName: 'Brand Name',
    jurisdiction: 'your jurisdiction',
    courtLocation: 'your city, Country',
    lastUpdated: 'January 2026',
  },
};

export type SiteConfig = typeof siteConfig;
