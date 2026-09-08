import {
  BadgeCheck,
  Boxes,
  Building2,
  ClipboardList,
  Cpu,
  FileSpreadsheet,
  GraduationCap,
  Handshake,
  Headset,
  Landmark,
  Layers,
  PackageCheck,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  Zap,
} from 'lucide-angular';

import type { ValueItem } from '../models';

/** Extended ValueItem interface to support image asset paths optionally */
export interface ContentItem extends ValueItem {
  readonly image?: string;
}

/** `values.items.*` — Reliability, Quality, Speed & Agility, Flexibility. */
export const BRAND_VALUES: readonly ContentItem[] = [
  {
    id: 'reliability',
    titleKey: 'values.items.reliability.title',
    bodyKey: 'values.items.reliability.body',
    icon: ShieldCheck,
  },
  {
    id: 'quality',
    titleKey: 'values.items.quality.title',
    bodyKey: 'values.items.quality.body',
    icon: BadgeCheck,
  },
  {
    id: 'speedAgility',
    titleKey: 'values.items.speedAgility.title',
    bodyKey: 'values.items.speedAgility.body',
    icon: Zap,
  },
  {
    id: 'flexibility',
    titleKey: 'values.items.flexibility.title',
    bodyKey: 'values.items.flexibility.body',
    icon: SlidersHorizontal,
  },
] as const;

/** `expertise.items.*` — mapped with image assets from public/assets/images. */
export const EXPERTISE_AREAS: readonly ContentItem[] = [
  {
    id: 'generalProcurement',
    titleKey: 'expertise.items.generalProcurement.title',
    bodyKey: 'expertise.items.generalProcurement.body',
    icon: Boxes,
    image: 'assets/images/General Procurement & Supplies.jpg',
  },
  {
    id: 'itElectronics',
    titleKey: 'expertise.items.itElectronics.title',
    bodyKey: 'expertise.items.itElectronics.body',
    icon: Cpu,
    image: 'assets/images/IT, Electronics & Equipment.jpg',
  },
  {
    id: 'specializedProjects',
    titleKey: 'expertise.items.specializedProjects.title',
    bodyKey: 'expertise.items.specializedProjects.body',
    icon: Layers,
    image: 'assets/images/Specialized & Project Procurement.jpg',
  },
] as const;

/** `whyChooseUs.items.*` — all five items carry a title and supporting body. */
export const WHY_CHOOSE_US: readonly ContentItem[] = [
  {
    id: 'reliableSupply',
    titleKey: 'whyChooseUs.items.reliableSupply.title',
    bodyKey: 'whyChooseUs.items.reliableSupply.body',
    icon: Truck,
  },
  {
    id: 'qualityAssurance',
    titleKey: 'whyChooseUs.items.qualityAssurance.title',
    bodyKey: 'whyChooseUs.items.qualityAssurance.body',
    icon: BadgeCheck,
  },
  {
    id: 'competitiveProcurement',
    titleKey: 'whyChooseUs.items.competitiveProcurement.title',
    bodyKey: 'whyChooseUs.items.competitiveProcurement.body',
    icon: Search,
  },
  {
    id: 'fastResponse',
    titleKey: 'whyChooseUs.items.fastResponse.title',
    bodyKey: 'whyChooseUs.items.fastResponse.body',
    icon: Zap,
  },
  {
    id: 'tailoredSolutions',
    titleKey: 'whyChooseUs.items.tailoredSolutions.title',
    bodyKey: 'whyChooseUs.items.tailoredSolutions.body',
    icon: SlidersHorizontal,
  },
] as const;

/** `targetAudience.items.*` — Government, Corporate, Education & Healthcare. */
export const AUDIENCE_SEGMENTS: readonly ContentItem[] = [
  {
    id: 'government',
    titleKey: 'targetAudience.items.government.title',
    bodyKey: 'targetAudience.items.government.body',
    icon: Landmark,
    image: 'assets/images/Government & Public Sector.jpg',
  },
  {
    id: 'corporate',
    titleKey: 'targetAudience.items.corporate.title',
    bodyKey: 'targetAudience.items.corporate.body',
    icon: Building2,
    image: 'assets/images/Corporate & Private Enterprise.jpg',
  },
  {
    id: 'education',
    titleKey: 'targetAudience.items.education.title',
    bodyKey: 'targetAudience.items.education.body',
    icon: GraduationCap,
    image: 'assets/images/Educational & Healthcare Institutions.jpg',
  },
] as const;

/** Icons for the six-step process */
export const PROCESS_STEP_ICONS = [
  ClipboardList,
  FileSpreadsheet,
  Handshake,
  PackageCheck,
  Truck,
  Headset,
] as const;