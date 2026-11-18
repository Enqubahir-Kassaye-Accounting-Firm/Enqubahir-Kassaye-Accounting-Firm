/**
 * Site Logo
 * The logo in the navbar and footer links, which both sit on the primary
 * color. site.ts → logoShape: 'icon' = a square mark in a small box with the
 * name beside it; 'wide' = a wordmark alone (the name is in its alt text).
 * site.ts → logoOnPrimary, when set, replaces the logo here. No logo yet: the
 * name alone, as text.
 */

import Image from 'next/image';
import { siteConfig } from '@/config/site';

const src = siteConfig.logoOnPrimary || siteConfig.logo;

export function SiteLogo({ nameClassName }: { nameClassName?: string }) {
  if (!src) return <span className={nameClassName}>{siteConfig.name}</span>;

  if (siteConfig.logoShape === 'wide') {
    return (
      <Image
        src={src}
        alt={siteConfig.logoAlt}
        width={192}
        height={32}
        className="h-8 w-auto max-w-40 object-contain object-left sm:max-w-48"
      />
    );
  }

  return (
    <>
      {/* A light tile, so a dark logo stays visible on the primary color */}
      <div className="bg-on-primary flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={siteConfig.logoAlt}
          width={40}
          height={40}
          className="h-full w-full object-contain"
        />
      </div>
      <span className={nameClassName}>{siteConfig.name}</span>
    </>
  );
}
