import { Component, computed, inject } from '@angular/core';

import { TranslationService } from '../../../core/services';

/**
 * "EN / عربي" pill switch. Renders as a radio group so screen readers announce
 * both options and which one is active, rather than a nameless toggle.
 */
@Component({
  selector: 'app-language-toggle',
  host: { class: 'block' },
  template: `
    <div
      class="border-border bg-bg-subtle inline-flex items-center rounded-full border p-0.5"
      role="radiogroup"
      [attr.aria-label]="t('common.language')"
    >
      <button
        type="button"
        role="radio"
        [attr.aria-checked]="!isArabic()"
        [attr.aria-label]="t('a11y.switchToEnglish')"
        [class]="isArabic() ? inactiveClass : activeClass"
        (click)="select('en')"
      >
        EN
      </button>
      <button
        type="button"
        role="radio"
        [attr.aria-checked]="isArabic()"
        [attr.aria-label]="t('a11y.switchToArabic')"
        [class]="isArabic() ? activeClass : inactiveClass"
        (click)="select('ar')"
      >
        عربي
      </button>
    </div>
  `,
})
export class LanguageToggleComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly isArabic = computed(() => this.i18n.currentLang() === 'ar');

  private static readonly BASE =
    'rounded-full px-3 py-1 text-xs font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange';

  protected readonly activeClass = `${LanguageToggleComponent.BASE} bg-navy text-white dark:bg-orange dark:text-navy`;
  protected readonly inactiveClass = `${LanguageToggleComponent.BASE} text-text-muted hover:text-text`;

  protected select(lang: 'ar' | 'en'): void {
    this.i18n.setLang(lang);
  }
}
