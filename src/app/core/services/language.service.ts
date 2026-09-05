import { Injectable, computed, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);

  readonly currentLang = signal<'ar' | 'en'>('ar');
  readonly isRtl = computed(() => this.currentLang() === 'ar');

  constructor() {
    const savedLang = localStorage.getItem('rai-lang') as 'ar' | 'en';
    const initialLang = savedLang || 'ar';
    this.setLanguage(initialLang);
  }

  setLanguage(lang: 'ar' | 'en'): void {
    this.currentLang.set(lang);
    localStorage.setItem('rai-lang', lang);
    
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    this.translate.use(lang);
  }
}
