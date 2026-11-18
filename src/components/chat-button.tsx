/**
 * Floating chat button, shown on every page — one channel only.
 * site.ts → chat: 'whatsapp' | 'telegram' | 'none'. Hidden when 'none' or when
 * that channel's social link (social.whatsapp / social.telegram) is empty.
 * Platform colors are the channel's own identity colors.
 */

import { TelegramIcon, WhatsAppIcon, telegramUrl, whatsappUrl } from '@/components/social-links';
import { siteConfig } from '@/config/site';
import { UI_TEXT } from '@/data/ui';
import { cn } from '@/lib/utils';

const CHANNELS = {
  whatsapp: {
    href: whatsappUrl,
    label: UI_TEXT.chat.whatsapp,
    icon: WhatsAppIcon,
    color: 'bg-[#25d366] hover:bg-[#1ebe5b] text-[#0b2e17]',
    ring: 'bg-[#25d366]',
  },
  telegram: {
    href: telegramUrl,
    label: UI_TEXT.chat.telegram,
    icon: TelegramIcon,
    color: 'bg-[#0088cc] hover:bg-[#0077b3] text-white',
    ring: 'bg-[#0088cc]',
  },
} as const;

export function ChatButton() {
  if (siteConfig.chat === 'none') return;
  const channel = CHANNELS[siteConfig.chat];
  if (!channel.href) return;
  const Icon = channel.icon;

  return (
    <div className="fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6">
      {/* Gentle attention pulse ring — expands outward from the button */}
      <span
        className={cn(
          'absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:hidden',
          channel.ring
        )}
        style={{ animationDuration: '2.5s', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
      />

      <a
        href={channel.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'relative flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-bold shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95',
          channel.color
        )}
        aria-label={channel.label}
      >
        <Icon className="h-[22px] w-[22px] shrink-0" />
        <span>{channel.label}</span>
      </a>
    </div>
  );
}
