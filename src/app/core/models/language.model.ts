/** Runtime-switchable UI languages. Arabic is the default (spec 1.3). */
export type AppLanguage = 'ar' | 'en';

/** Writing direction derived from {@link AppLanguage}. */
export type TextDirection = 'rtl' | 'ltr';

export const APP_LANGUAGES: readonly AppLanguage[] = ['ar', 'en'] as const;

export const DEFAULT_LANGUAGE: AppLanguage = 'ar';

export function isAppLanguage(value: unknown): value is AppLanguage {
  return value === 'ar' || value === 'en';
}
