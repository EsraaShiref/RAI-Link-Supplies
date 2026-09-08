import { Component, inject, input } from '@angular/core';
import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

import { TranslationService } from '../../../core/services';

/**
 * The workhorse content card: Values, Expertise and Product categories.
 * Lifts and shifts its border to the brand orange on hover/focus-within.
 */
@Component({
  selector: 'app-icon-card',
  imports: [LucideAngularModule],
  host: { class: 'block h-full' },
  template: `
    <div
      class="group border-border bg-surface shadow-card hover:shadow-card-hover hover:border-orange focus-within:border-orange flex h-full flex-col rounded-xl border p-6 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 sm:p-7"
    >
      <span
        class="border-border bg-bg-subtle text-orange-ink group-hover:border-orange mb-5 inline-flex size-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200"
      >
        <lucide-icon [img]="icon()" [size]="22" [strokeWidth]="2" aria-hidden="true" />
      </span>

      <h3 class="text-text text-base font-bold sm:text-lg">{{ t(titleKey()) }}</h3>

      <p class="text-text-muted mt-2.5 text-sm leading-relaxed sm:text-[0.9375rem]">
        {{ t(bodyKey()) }}
      </p>
    </div>
  `,
})
export class IconCardComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  readonly icon = input.required<LucideIconData>();
  readonly titleKey = input.required<string>();
  readonly bodyKey = input.required<string>();
}
