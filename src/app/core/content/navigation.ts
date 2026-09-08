import type { NavItem } from '../models';

/** Primary navigation, shared by the header, the mobile drawer and the footer. */
export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/services-scope', labelKey: 'nav.servicesScope' },
  { path: '/products', labelKey: 'nav.products' },
  { path: '/partners', labelKey: 'nav.partners' },
  { path: '/contact', labelKey: 'nav.contact' },
] as const;

/** Static map link for the office address in `contact.address`. */
export const OFFICE_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=100+Al-Sayed+Al-Mirghani+Street+Heliopolis+Cairo+Egypt';
