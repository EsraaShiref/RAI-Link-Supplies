import { Injectable, signal, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'ar' | 'en';

const STORAGE_KEY = 'rai-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);

  /** Reactive signal for current language */
  readonly currentLang = signal<Lang>('ar');

  constructor() {
    // Initialize from storage or default to Arabic
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    const initial: Lang = saved === 'en' ? 'en' : 'ar';

    this.translate.use(initial);
    this.currentLang.set(initial);
    this.applyDirection(initial);

    // Keep DOM in sync whenever the signal changes
    effect(() => {
      const lang = this.currentLang();
      this.translate.use(lang);
      this.applyDirection(lang);
      localStorage.setItem(STORAGE_KEY, lang);
    });
  }

  toggle(): void {
    const next: Lang = this.currentLang() === 'ar' ? 'en' : 'ar';
    this.currentLang.set(next);
  }

  private applyDirection(lang: Lang): void {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }
}
