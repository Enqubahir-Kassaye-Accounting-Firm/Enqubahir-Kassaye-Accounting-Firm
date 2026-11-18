/**
 * Icon Sets and Tag Styles
 * SERVICE_ICONS and TAG_STYLES: the options for `icon` and `tagStyle` in src/data/services.ts.
 * Icons are from lucide-react (https://lucide.dev); add one here to make it available.
 */

import {
  BarChart3,
  Briefcase,
  Camera,
  Car,
  Cloud,
  Code,
  Compass,
  GraduationCap,
  Hammer,
  HeartPulse,
  House,
  Layers,
  Leaf,
  Megaphone,
  Palette,
  Scale,
  Server,
  ShieldCheck,
  Truck,
  Users,
  Utensils,
  Globe,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const SERVICE_ICONS = {
  briefcase: Briefcase,
  camera: Camera,
  car: Car,
  chart: BarChart3,
  cloud: Cloud,
  code: Code,
  compass: Compass,
  education: GraduationCap,
  globe: Globe,
  hammer: Hammer,
  health: HeartPulse,
  home: House,
  layers: Layers,
  leaf: Leaf,
  legal: Scale,
  megaphone: Megaphone,
  palette: Palette,
  server: Server,
  shield: ShieldCheck,
  truck: Truck,
  users: Users,
  utensils: Utensils,
  wrench: Wrench,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type ServiceIconName = keyof typeof SERVICE_ICONS;

/** Card tag colours. `accent` follows the brand; the rest are fixed hues. */
export const TAG_STYLES = {
  accent: {
    card: 'bg-brand-accent/15 text-brand-accent-text dark:bg-brand-accent/20 dark:text-brand-accent-text',
    hero: 'border-brand-accent/60 bg-brand-accent/15 text-text-inverse',
  },
  blue: {
    card: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    hero: 'border-blue-400/40 bg-blue-400/15 text-blue-300',
  },
  emerald: {
    card: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    hero: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
  },
  purple: {
    card: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    hero: 'border-purple-400/40 bg-purple-400/15 text-purple-300',
  },
  orange: {
    card: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    hero: 'border-orange-400/40 bg-orange-400/15 text-orange-300',
  },
  slate: {
    card: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    hero: 'border-slate-400/40 bg-slate-400/15 text-slate-300',
  },
} as const;

export type TagStyle = keyof typeof TAG_STYLES;
