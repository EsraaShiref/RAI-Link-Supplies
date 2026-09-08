import { Component, inject, input } from '@angular/core';

import { TranslationService } from '../../../core/services';

/**
 * Eyebrow + heading pair used to open every section.
 * Centred by default; `[centered]="false"` switches to logical-start alignment.
 */
@Component({
  selector: 'app-section-heading',
  host: { class: 'block' },
  template: `
    <div [class]="centered() ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-start'">
      @if (eyebrowKey()) {
        <p
          class="text-orange-ink text-xs font-bold tracking-[0.18em] uppercase sm:text-sm"
          [class.justify-center]="centered()"
        >
          {{ t(eyebrowKey()) }}
        </p>
      }

      <h2
        [id]="headingId() || null"
        class="text-text mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2.125rem]"
      >
        {{ t(titleKey()) }}
      </h2>

      <span
        class="bg-brand-gradient mt-4 block h-[3px] w-16 rounded-full"
        [class.mx-auto]="centered()"
        aria-hidden="true"
      ></span>
    </div>
  `,
})
export class SectionHeadingComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  readonly eyebrowKey = input('');
  readonly titleKey = input.required<string>();
  readonly centered = input(true);

  /** Optional id so a section can point `aria-labelledby` at this heading. */
  readonly headingId = input('');
}
