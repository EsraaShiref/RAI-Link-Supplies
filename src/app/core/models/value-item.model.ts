import type { LucideIconData } from 'lucide-angular';

/** A card driven entirely by translation keys (Values, Expertise, Products). */
export interface ValueItem {
  readonly id: string;
  readonly titleKey: string;
  readonly bodyKey: string;
  readonly icon: LucideIconData;
}
