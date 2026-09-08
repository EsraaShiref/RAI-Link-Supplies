import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, isDevMode, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import {
  APP_LANGUAGES,
  DEFAULT_LANGUAGE,
  isAppLanguage,
  type AppLanguage,
  type TranslationKey,
  type TranslationNode,
  type TranslationValue,
} from '../models';

const LANG_STORAGE_KEY = 'rai-lang';

type DictionaryMap = Record<AppLanguage, TranslationNode>;

/**
 * Runtime translation store.
 *
 * Both dictionaries are fetched once during app initialisation and held in
 * memory, so switching language is synchronous and cannot flash untranslated
 * copy. `t()` reads the `currentLang` signal, which means every template
 * expression that calls it re-renders automatically on language change — no
 * pipe, subscription or manual change detection required.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly http = inject(HttpClient);

  private readonly dictionaries = signal<DictionaryMap>({ ar: {}, en: {} });

  /** Active language. Seeded from storage so it matches the pre-paint script. */
  readonly currentLang = signal<AppLanguage>(readStoredLanguage());

  /** The dictionary for the active language. */
  private readonly activeDictionary = computed<TranslationNode>(
    () => this.dictionaries()[this.currentLang()],
  );

  readonly isArabic = computed(() => this.currentLang() === 'ar');

  /**
   * Resolve a dot-delimited key to a string.
   * Arrow function so it can be aliased in components (`protected readonly t =
   * this.i18n.t`) and used as `{{ t('about.title') }}` in templates.
   */
  readonly t = (key: TranslationKey): string => {
    const value = resolve(this.activeDictionary(), key);
    if (typeof value === 'string') {
      return value;
    }
    if (isDevMode()) {
      console.warn(`[i18n] Missing or non-string translation for key "${key}"`);
    }
    return key;
  };

  /** Resolve a key that points at an array of strings (e.g. `partners.points`). */
  readonly tList = (key: TranslationKey): readonly string[] => {
    const value = resolve(this.activeDictionary(), key);
    if (Array.isArray(value) && value.every((entry) => typeof entry === 'string')) {
      return value as readonly string[];
    }
    if (isDevMode()) {
      console.warn(`[i18n] Key "${key}" does not resolve to a string array`);
    }
    return [];
  };

  /**
   * Resolve a key that points at an array of objects (e.g. `howWeWork.steps`).
   * The caller asserts the element shape; dictionaries are authored alongside
   * the models so the two stay in step.
   */
  readonly tItems = <T>(key: TranslationKey): readonly T[] => {
    const value = resolve(this.activeDictionary(), key);
    if (Array.isArray(value)) {
      return value as readonly T[];
    }
    if (isDevMode()) {
      console.warn(`[i18n] Key "${key}" does not resolve to an array`);
    }
    return [];
  };

  /** Fetch every dictionary. Called once from `provideAppInitializer`. */
  async load(): Promise<void> {
    const entries = await Promise.all(
      APP_LANGUAGES.map(async (lang) => {
        const node = await firstValueFrom(
          this.http.get<TranslationNode>(`assets/i18n/${lang}.json`),
        );
        return [lang, node] as const;
      }),
    );

    this.dictionaries.set(Object.fromEntries(entries) as DictionaryMap);
  }

  setLang(lang: AppLanguage): void {
    if (lang === this.currentLang()) {
      return;
    }
    this.currentLang.set(lang);
    persistLanguage(lang);
  }

  toggleLang(): void {
    this.setLang(this.currentLang() === 'ar' ? 'en' : 'ar');
  }
}

function resolve(node: TranslationNode, key: TranslationKey): TranslationValue | undefined {
  let current: TranslationValue | undefined = node;

  for (const segment of key.split('.')) {
    if (current === undefined || typeof current === 'string') {
      return undefined;
    }
    current = Array.isArray(current)
      ? current[Number(segment)]
      : (current as TranslationNode)[segment];
  }

  return current;
}

function readStoredLanguage(): AppLanguage {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return isAppLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function persistLanguage(lang: AppLanguage): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — language still applies for this session */
  }
}
