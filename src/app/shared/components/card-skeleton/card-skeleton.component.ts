import { Component, input } from '@angular/core';

/**
 * Placeholder for `@defer` blocks. Mirrors the rounded-card shape of the real
 * content and reserves its height, so deferred sections cannot cause layout
 * shift. The shimmer uses the brand gradient (spec 2).
 */
@Component({
  selector: 'app-card-skeleton',
  host: { class: 'block', 'aria-hidden': 'true' },
  template: `
    <div class="grid gap-6" [class]="columnClass()">
      @for (placeholder of placeholders(); track $index) {
        <div class="border-border skeleton rounded-xl border p-6" [style.min-height.px]="height()">
          <span class="bg-border block size-12 rounded-xl"></span>
          <span class="bg-border mt-5 block h-4 w-2/3 rounded-full"></span>
          <span class="bg-border mt-3 block h-3 w-full rounded-full"></span>
          <span class="bg-border mt-2 block h-3 w-5/6 rounded-full"></span>
        </div>
      }
    </div>
  `,
})
export class CardSkeletonComponent {
  readonly count = input(3);
  readonly height = input(220);
  readonly columnClass = input('sm:grid-cols-2 lg:grid-cols-3');

  protected readonly placeholders = () => Array.from({ length: this.count() });
}
