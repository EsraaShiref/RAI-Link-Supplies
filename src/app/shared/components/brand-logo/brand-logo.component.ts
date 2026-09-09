import { Component, computed, inject, input } from '@angular/core';

import { TranslationService } from '../../../core/services';

/**
 * The master logo artwork is a flat PNG wordmark. We keep the image-based
 * rendering here so the one approved asset stays authoritative and the width API
 * still works unchanged at every call site.
 *
 * We chose the subtle white rounded-pill backdrop approach when the header is
 * transparent over the navy hero: it keeps the navy wordmark legible without a
 * second on-dark asset export.
 */
@Component({
  selector: 'app-brand-logo',
  host: { class: 'block' },
  template: `
    <div
      class="inline-flex max-w-full items-center justify-center"
      [class.bg-white/95]="variant() === 'onDark'"
      [class.rounded-lg]="variant() === 'onDark'"
      [class.px-3]="variant() === 'onDark'"
      [class.py-1.5]="variant() === 'onDark'"
    >
      <img
        [src]="logoSrc()"
        [attr.alt]="t('a11y.logoAlt')"
        [style.width.px]="width()"
        [class]="'h-auto w-auto ' + imageClass()"
      />
    </div>
  `,
})
export class BrandLogoComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  readonly variant = input<'default' | 'onDark'>('default');
  readonly width = input(200);
  readonly imageClass = input('');

  protected readonly logoSrc = computed(() => `assets/images/logo.png`);
}
