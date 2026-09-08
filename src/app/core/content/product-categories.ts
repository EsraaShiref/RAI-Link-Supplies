import {
  Armchair,
  Cable,
  HardHat,
  Monitor,
  Pencil,
  Boxes,
  SprayCan,
} from 'lucide-angular';

import type { ProductCategory } from '../models';

/**
 * The seven supply categories. Structure and icons only — every visible string
 * is a key into `products.categories.*`, so copy stays in the dictionaries.
 */
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    id: 'office',
    titleKey: 'products.categories.office.title',
    bodyKey: 'products.categories.office.body',
    icon: Pencil,
  },
  {
    id: 'furniture',
    titleKey: 'products.categories.furniture.title',
    bodyKey: 'products.categories.furniture.body',
    icon: Armchair,
  },
  {
    id: 'itElectronics',
    titleKey: 'products.categories.itElectronics.title',
    bodyKey: 'products.categories.itElectronics.body',
    icon: Monitor,
  },
  {
    id: 'generalSpecialized',
    titleKey: 'products.categories.generalSpecialized.title',
    bodyKey: 'products.categories.generalSpecialized.body',
    icon: Boxes,
  },
  {
    id: 'cleaningFacility',
    titleKey: 'products.categories.cleaningFacility.title',
    bodyKey: 'products.categories.cleaningFacility.body',
    icon: SprayCan,
  },
  {
    id: 'safetySecurity',
    titleKey: 'products.categories.safetySecurity.title',
    bodyKey: 'products.categories.safetySecurity.body',
    icon: HardHat,
  },
  {
    id: 'electricalTechnical',
    titleKey: 'products.categories.electricalTechnical.title',
    bodyKey: 'products.categories.electricalTechnical.body',
    icon: Cable,
  },
] as const;
