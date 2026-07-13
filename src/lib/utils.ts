import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const EVENT_DATE = new Date('2026-09-15T09:00:00+05:30')

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  events: 'events',
  timeline: 'timeline',
  sponsors: 'sponsors',
  gallery: 'gallery',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Gallery', href: '#gallery' },
] as const
