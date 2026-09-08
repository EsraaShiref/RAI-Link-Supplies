import type { LucideIconData } from 'lucide-angular';

/** One of the seven supply categories rendered on Home and Products. */
export interface ProductCategory {
  /** Key under `products.categories.*` in the translation dictionaries. */
  readonly id:
    | 'office'
    | 'furniture'
    | 'itElectronics'
    | 'generalSpecialized'
    | 'cleaningFacility'
    | 'safetySecurity'
    | 'electricalTechnical';
  readonly titleKey: string;
  readonly bodyKey: string;
  readonly icon: LucideIconData;
}
