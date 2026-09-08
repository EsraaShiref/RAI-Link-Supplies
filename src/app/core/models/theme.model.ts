/** Colour scheme. Light is the default (spec 1.4). */
export type AppTheme = 'light' | 'dark';

export const DEFAULT_THEME: AppTheme = 'light';

export function isAppTheme(value: unknown): value is AppTheme {
  return value === 'light' || value === 'dark';
}
