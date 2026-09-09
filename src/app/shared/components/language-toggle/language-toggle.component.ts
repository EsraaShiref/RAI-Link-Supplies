import { Component, computed, inject } from '@angular/core';
import { Globe, LucideAngularModule } from 'lucide-angular';

import { TranslationService } from '../../../core/services';

/**
 * Compact single-action language switcher tailored with brand colors.
 */
@Component({
  selector: 'app-language-toggle',
  imports: [LucideAngularModule],
  host: { class: 'block' },
  template: `
    <button
      type="button"
      class="group border-border bg-surface text-text hover:border-orange hover:bg-orange hover:text-white inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200 shadow-sm"
      [attr.aria-label]="nextLanguageLabel()"
      [attr.title]="nextLanguageLabel()"
      (click)="toggle()"
    >
      <lucide-icon [img]="GlobeIcon" [size]="14" class="text-orange transition-transform duration-300 group-hover:rotate-45 group-hover:text-white" aria-hidden="true" />
      <span class="tracking-wider uppercase">{{ isArabic() ? 'EN' : 'عربي' }}</span>
    </button>
  `,
})
export class LanguageToggleComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly isArabic = computed(() => this.i18n.currentLang() === 'ar');
  protected readonly GlobeIcon = Globe;

  protected readonly nextLanguageLabel = computed(() =>
    this.isArabic() ? this.t('a11y.switchToEnglish') : this.t('a11y.switchToArabic'),
  );

  protected toggle(): void {
    this.i18n.setLang(this.isArabic() ? 'en' : 'ar');
  }
}