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

/** `values.items.*` — Reliability, Quality, Speed & Agility, Flexibility. */
export const BRAND_VALUES: readonly ValueItem[] = [
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

/** `expertise.items.*` — the three areas where the business concentrates. */
export const EXPERTISE_AREAS: readonly ValueItem[] = [
  {
    id: 'generalProcurement',
    titleKey: 'expertise.items.generalProcurement.title',
    bodyKey: 'expertise.items.generalProcurement.body',
    icon: Boxes,
  },
  {
    id: 'itElectronics',
    titleKey: 'expertise.items.itElectronics.title',
    bodyKey: 'expertise.items.itElectronics.body',
    icon: Cpu,
  },
  {
    id: 'specializedProjects',
    titleKey: 'expertise.items.specializedProjects.title',
    bodyKey: 'expertise.items.specializedProjects.body',
    icon: Layers,
  },
] as const;

/** `whyChooseUs.items.*` — label-only chips, so no body key. */
export const WHY_CHOOSE_US = [
  { id: 'reliableSupply', labelKey: 'whyChooseUs.items.reliableSupply', icon: Truck },
  { id: 'qualityAssurance', labelKey: 'whyChooseUs.items.qualityAssurance', icon: BadgeCheck },
  {
    id: 'competitiveProcurement',
    labelKey: 'whyChooseUs.items.competitiveProcurement',
    icon: Search,
  },
  { id: 'fastResponse', labelKey: 'whyChooseUs.items.fastResponse', icon: Zap },
  { id: 'tailoredSolutions', labelKey: 'whyChooseUs.items.tailoredSolutions', icon: SlidersHorizontal },
] as const;

/** `targetAudience.items.*` — Government, Corporate, Education & Healthcare. */
export const AUDIENCE_SEGMENTS: readonly ValueItem[] = [
  {
    id: 'government',
    titleKey: 'targetAudience.items.government.title',
    bodyKey: 'targetAudience.items.government.body',
    icon: Landmark,
  },
  {
    id: 'corporate',
    titleKey: 'targetAudience.items.corporate.title',
    bodyKey: 'targetAudience.items.corporate.body',
    icon: Building2,
  },
  {
    id: 'education',
    titleKey: 'targetAudience.items.education.title',
    bodyKey: 'targetAudience.items.education.body',
    icon: GraduationCap,
  },
] as const;

/**
 * Icons for the six-step process, in the order the steps appear in
 * `howWeWork.steps`. Kept separate because the step copy itself lives in the
 * dictionaries as an array.
 */
export const PROCESS_STEP_ICONS = [
  ClipboardList,
  FileSpreadsheet,
  Handshake,
  PackageCheck,
  Truck,
  Headset,
] as const;
