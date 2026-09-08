import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

import { ThemeService, TranslationService } from '../../../core/services';

/** Sun / moon switch for the colour scheme. */
@Component({
  selector: 'app-theme-toggle',
  imports: [LucideAngularModule],
  host: { class: 'block' },
  template: `
    <button
      type="button"
      class="border-border bg-bg-subtle text-text-muted hover:text-orange-ink hover:border-orange inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-200"
      [attr.aria-label]="label()"
      [attr.aria-pressed]="theme.isDark()"
      [attr.title]="label()"
      (click)="theme.toggle()"
    >
      <lucide-icon [img]="theme.isDark() ? SunIcon : MoonIcon" [size]="17" aria-hidden="true" />
    </button>
  `,
})
export class ThemeToggleComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;
  protected readonly theme = inject(ThemeService);

  protected readonly SunIcon = Sun;
  protected readonly MoonIcon = Moon;

  protected readonly label = computed(() =>
    this.theme.isDark() ? this.t('a11y.switchToLight') : this.t('a11y.switchToDark'),
  );
}
