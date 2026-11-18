/**
 * Interface Text
 * Every label, button, heading and message the template shows that is not
 * client copy. Defaults work for most English sites; translate or adjust per
 * client. Client copy lives in the other files in src/data/.
 */

export const UI_TEXT = {
  breadcrumbHome: 'Home',
  breadcrumbLabel: 'Breadcrumb',

  /** Small uppercase labels above homepage section titles */
  eyebrows: {
    about: 'About Us',
    services: 'Our Services',
    projects: 'Portfolio',
    testimonials: 'Testimonials',
    contact: 'Contact Us',
    taxGuide: 'Tax Filing',
    tips: 'Accounting Tips',
    websites: 'Useful Websites',
  },

  tips: {
    seeAll: 'See all tips',
    whyLabel: 'Why',
    howLabel: 'How',
  },

  taxGuide: {
    seeAll: 'See all do’s and don’ts',
    dosTitle: 'Do this',
    dontsTitle: 'Do not do this',
  },

  websites: {
    seeAll: 'See all websites',
    visit: 'Visit website',
    opensInNewTab: '(opens in a new tab)',
  },

  testimonials: {
    carouselLabel: 'Client testimonials',
    counterLabel: 'Testimonial',
    of: 'of',
    pause: 'Pause the testimonials',
    play: 'Play the testimonials',
    previous: 'Previous testimonial',
    next: 'Next testimonial',
    selectorLabel: 'Show testimonial from',
  },

  services: {
    forPrefix: 'For:',
    cardLinkFallback: 'Learn more',
    detailAboutLabel: 'What this service is',
    detailIncludesLabel: 'What’s included',
    detailIncludesTitle: 'What is included.',
    detailHowToStartLabel: 'How to start',
    detailHowToStartTitle: 'How we work.',
    detailHowToStartFallback:
      'We begin every engagement with a discovery session to understand your requirements, constraints, and goals. From there we scope, plan, and deliver in clearly defined phases.',
    detailHowToStartTaglineFallback: 'Clear scope. Clean build. Confident launch.',
    viewAll: 'View all services',
    notFoundTitle: 'Service Not Found',
  },

  projects: {
    seeAll: 'See All Projects',
    viewProject: 'View Project',
    empty: 'No projects published yet.',
    clientLabel: 'Client:',
    highlights: 'Highlights',
    visitProject: 'Visit Project',
    gallery: 'Gallery',
    viewAll: 'View all projects',
    notFoundTitle: 'Project Not Found',
    notFoundDescription: 'The requested project could not be found.',
  },

  about: {
    breadcrumb: 'About',
    contactButton: 'Contact Us',
  },

  /** Button labels for the actions in site.ts → conversion (hero, CTA, header) */
  conversion: {
    message: 'Free Consultation',
    call: 'Call Us Now',
    booking: 'Book a Call',
    whatsapp: 'Chat on WhatsApp',
    telegram: 'Chat on Telegram',
  },

  contact: {
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    addressLabel: 'Address',
    officeHoursLabel: 'Office Hours',
    directTitle: 'Prefer to call?',
    directDescription: 'Call or message us and we will get back to you as soon as possible.',
    callNow: 'Call us now',
    bookingTitle: 'Prefer to book a call?',
    bookingDescription: 'Pick a time that suits you and we will call you then.',
    bookingButton: 'Book a time',
    whatsappLabel: 'WhatsApp',
    mapTitleSuffix: 'location on Google Maps',
    form: {
      nameLabel: 'Full Name',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@email.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'Enter phone number',
      subjectLabel: 'What can we help you with?',
      subjectPlaceholder: 'Choose one',
      /** Dropdown: general question first, then the services, then other */
      subjectGeneral: 'General question',
      subjectOther: 'Other',
      messageLabel: 'Your Message',
      messagePlaceholder: 'How can we help you?',
      submit: 'Send Message',
      submitting: 'Sending...',
      successTitle: 'Message Sent!',
      sendError:
        'Unable to send your message right now. Please try again later or contact us directly.',
    },
    validation: {
      nameTooShort: 'Name must be at least 2 characters',
      nameTooLong: 'Name too long',
      nameInvalid: 'Name contains invalid characters',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email address',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Invalid phone number',
      subjectRequired: 'Please choose a subject',
      messageTooShort: 'Message must be at least 10 characters',
      messageTooLong: 'Message too long',
    },
  },

  footer: {
    linksHeading: 'Company',
    servicesHeading: 'Services',
    contactHeading: 'Contact',
    getInTouch: 'Get in Touch',
    rightsReserved: 'All rights reserved.',
    /** Agency credit (site.ts → credit): "Built by" + the agency name in bold */
    builtBy: 'Built by',
    creditEmailLabel: 'Email the website builder',
    creditInstagramLabel: 'Website builder on Instagram',
  },

  legal: {
    eyebrow: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    lastUpdated: 'Last updated:',
    onThisPage: 'On this page',
    sectionLabel: 'Section',
    emailButton: 'Email Us',
    /** Shown in place of {email} when site.ts has no contact email */
    emailFallback: 'our contact form',
    contactButton: 'Contact Us',
    /** Filled in for {formProvider} in src/data/legal.ts */
    formProviders: { formspree: 'Formspree', web3forms: 'Web3Forms' },
  },

  notFound: {
    title: 'Oops! This page seems to have wandered off.',
    description: 'Let’s get you back on track.',
    homeButton: 'Take Me Home',
    contactButton: 'Contact Us',
  },

  error: {
    title: 'Something went wrong on our end.',
    description: 'We’re working to fix this. Please try again in a moment.',
    errorIdLabel: 'Error ID:',
    retryButton: 'Try Again',
    homeButton: 'Go Home',
  },

  navbar: {
    toggleMenu: 'Toggle menu',
  },

  theme: {
    label: 'Theme',
    dark: 'Dark',
    light: 'Light',
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
  },

  /** Floating chat button (site.ts → chat) */
  chat: {
    whatsapp: 'Chat on WhatsApp',
    telegram: 'Chat on Telegram',
  },
};
