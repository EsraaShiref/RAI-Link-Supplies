/**
 * Shape of a loaded translation dictionary (`public/assets/i18n/{lang}.json`).
 * Values are strings, nested objects, or arrays of either.
 */
export type TranslationValue = string | TranslationNode | readonly TranslationValue[];

export interface TranslationNode {
  readonly [key: string]: TranslationValue;
}

/** A dot-delimited path into a dictionary, e.g. `about.title`, `goals.items.0.body`. */
export type TranslationKey = string;
