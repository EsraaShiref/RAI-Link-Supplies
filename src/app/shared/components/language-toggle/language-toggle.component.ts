import { Component, computed, inject } from '@angular/core';
import { Globe, LucideAngularModule } from 'lucide-angular';

import { TranslationService } from '../../../core/services';

/**
 * Compact single-action language switcher tailored with brand blue and orange colors.
 */
@Component({
  selector: 'app-language-toggle',
  imports: [LucideAngularModule],
  host: { class: 'block' },
  template: `
    <button
  type="button"
  class="inline-flex items-center gap-1.5 rounded-full border border-[#0F172A] bg-[#0F172A] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:border-orange hover:bg-orange hover:text-white"
  [attr.aria-label]="nextLanguageLabel()"
  [attr.title]="nextLanguageLabel()"
  (click)="toggle()"
>
  <lucide-icon [img]="GlobeIcon" [size]="14" aria-hidden="true" />
  <span>{{ isArabic() ? 'EN' : 'عربي' }}</span>
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