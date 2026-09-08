import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Converts Arabic-Indic and Eastern Arabic-Indic digits to ASCII. */
export function normalizeDigits(value: string): string {
  return value.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (digit) => {
    const code = digit.charCodeAt(0);
    const base = code >= 0x06f0 ? 0x06f0 : 0x0660;
    return String(code - base);
  });
}

const ALLOWED_PHONE_CHARS = /^\+?[\d\s()\-.]+$/;
const MIN_PHONE_DIGITS = 9;
const MAX_PHONE_DIGITS = 15;

/**
 * Tolerant phone validator: accepts an optional leading `+`, spaces, dashes and
 * parentheses, and requires 9–15 digits. That covers Egyptian local format
 * (`010 4388 1766`) and international (`+20 10 4388 1766`) without rejecting
 * other countries, and it accepts Arabic-Indic numerals.
 */
export const phoneValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null => {
  const raw = (control.value ?? '').trim();
  if (!raw) {
    return null; // `Validators.required` owns emptiness.
  }

  const normalized = normalizeDigits(raw);
  if (!ALLOWED_PHONE_CHARS.test(normalized)) {
    return { phone: true };
  }

  const digits = normalized.replace(/\D/g, '').length;
  return digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS ? null : { phone: true };
};
