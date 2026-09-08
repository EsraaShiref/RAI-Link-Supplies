import { effect, inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import type { AppLanguage, RouteSeoData } from '../models';
import { TranslationService } from './translation.service';

const MAX_DESCRIPTION_LENGTH = 158;

const OG_LOCALES: Record<AppLanguage, string> = {
  ar: 'ar_EG',
  en: 'en_US',
};

/**
 * Language-aware document metadata.
 *
 * The router pushes the active route's translation keys in via
 * {@link setRouteSeo}; a single effect then resolves them through
 * `TranslationService`, so the title and description update both on navigation
 * and on language change without duplicating copy outside the dictionaries.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(TranslationService);

  private readonly routeSeo = signal<RouteSeoData | null>(null);

  constructor() {
    effect(() => {
      const seo = this.routeSeo();
      if (!seo) {
        return;
      }

      const lang = this.i18n.currentLang();
      const brand = this.i18n.t('brand.name');
      const title = seo.rootTitle
        ? `${brand} — ${this.i18n.t('brand.tagline')}`
        : `${this.i18n.t(seo.titleKey)} | ${brand}`;

      const description = truncate(
        seo.descriptionKeys.map((key) => this.i18n.t(key)).join(' '),
        MAX_DESCRIPTION_LENGTH,
      );

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:site_name', content: brand });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:locale', content: OG_LOCALES[lang] });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    });
  }

  setRouteSeo(seo: RouteSeoData | null): void {
    this.routeSeo.set(seo);
  }
}

function truncate(text: string, max: number): string {
  const collapsed = text.replace(/\s+/g, ' ').trim();
  if (collapsed.length <= max) {
    return collapsed;
  }

  const clipped = collapsed.slice(0, max);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}
