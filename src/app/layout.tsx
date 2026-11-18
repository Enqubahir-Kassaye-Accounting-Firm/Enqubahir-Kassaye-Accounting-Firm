import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { OrganizationSchema } from '@/components/organization-schema';
import { ChatButton } from '@/components/chat-button';
import { ConversionTracker } from '@/components/conversion-tracker';
import { RevealObserver } from '@/components/reveal-observer';
import { PageTransition } from '@/components/page-transition';
import { env, siteUrl } from '@/config/env';
import { siteConfig } from '@/config/site';
import { brandCssVariables, resolveBrand, surfaceCssVariables } from '@/config/presets';
import { ETHIOPIC_FONT, FONT_FAMILIES } from '@/config/fonts';
import { visibleLinks } from '@/lib/home-sections';
import './globals.css';

const brandTheme = resolveBrand(siteConfig.brand);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.seo.titleDefault,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.metaDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  // No canonical or og:url here: every page would inherit the homepage's.
  // Each page sets its own canonical (src/lib/seo.ts).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Favicon and Apple icon come from src/app/icon.tsx and apple-icon.tsx (generated from the logo)
  openGraph: {
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    images: [siteConfig.seo.ogImage],
    creator: siteConfig.social.xHandle || undefined,
  },
  verification: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: siteConfig.seo.category,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var mode = '${siteConfig.theme}';
                try {
                  var stored = localStorage.getItem('app-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = mode === 'both' ? stored === 'dark' || (!stored && prefersDark) : mode === 'dark';
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {
                  document.documentElement.classList.toggle('dark', mode === 'dark');
                }
                if ('IntersectionObserver' in window) {
                  document.documentElement.classList.add('reveal-ready');
                }
              })()
            `,
          }}
        />
        <style>{`
          :root {
            ${brandCssVariables(brandTheme)}
            ${surfaceCssVariables(brandTheme.surfaces.light)}
            --brand-font-body: ${FONT_FAMILIES[brandTheme.fonts.body]};
            --brand-font-heading: ${FONT_FAMILIES[brandTheme.fonts.heading]};
            --brand-font-ethiopic: ${ETHIOPIC_FONT};
          }
          html.dark {
            ${surfaceCssVariables(brandTheme.surfaces.dark)}
          }
        `}</style>
      </head>
      <body className="font-sans antialiased">
        {env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <OrganizationSchema siteUrl={siteUrl} />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar
              links={visibleLinks(siteConfig.navigation.desktop)}
              tabletLinks={visibleLinks(siteConfig.navigation.tablet)}
            />
            <div className="flex-1">
              <PageTransition>{children}</PageTransition>
            </div>
            <Footer />
          </div>
          <ChatButton />
          {env.NEXT_PUBLIC_GA_ID && <ConversionTracker />}
          <RevealObserver />
        </ThemeProvider>
      </body>
    </html>
  );
}
