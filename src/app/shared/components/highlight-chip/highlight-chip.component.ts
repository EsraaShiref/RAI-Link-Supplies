import { Component, inject, input } from '@angular/core';
import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

import { TranslationService } from '../../../core/services';

/**
 * Compact icon + label chip for the Values strip and the Why Choose Us row.
 *
 * Note on spec 1.2: the folder list names a `stat-card`, but none of the
 * approved Section 3 copy contains figures or metrics, and inventing them would
 * breach the "no invented content" rule. This chip fills the same structural
 * role for the label-only content that does exist.
 */
@Component({
  selector: 'app-highlight-chip',
  imports: [LucideAngularModule],
  host: { class: 'block' },
  template: `
    <div
      class="border-border bg-surface hover:border-orange flex items-center gap-3 rounded-full border py-2.5 ps-3 pe-5 transition-colors duration-200"
    >
      <span
        class="bg-brand-gradient inline-flex size-8 shrink-0 items-center justify-center rounded-full text-white"
      >
        <lucide-icon [img]="icon()" [size]="16" [strokeWidth]="2.25" aria-hidden="true" />
      </span>
      <span class="text-text text-sm font-semibold whitespace-nowrap">{{ t(labelKey()) }}</span>
    </div>
  `,
})
export class HighlightChipComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  readonly icon = input.required<LucideIconData>();
  readonly labelKey = input.required<string>();
}
