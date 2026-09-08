import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { PROCESS_STEP_ICONS } from '../../../core/content';
import type { ProcessStep } from '../../../core/models';
import { TranslationService } from '../../../core/services';
import { RevealOnScrollDirective } from '../../../shared/directives';

interface TimelineStep extends ProcessStep {
  readonly icon: (typeof PROCESS_STEP_ICONS)[number];
}

/**
 * Six-step process timeline: horizontal on desktop, vertical when stacked.
 *
 * Steps are read straight from `howWeWork.steps`, so the copy and the count are
 * dictionary-driven. Rendered as an ordered list, which conveys sequence to
 * assistive tech without relying on the decorative rail.
 */
@Component({
  selector: 'app-process-timeline',
  imports: [LucideAngularModule, RevealOnScrollDirective],
  host: { class: 'block' },
  template: `
    <ol class="flex flex-col lg:flex-row lg:gap-4">
      @for (step of steps(); track step.number; let index = $index, isLast = $last) {
        <li class="flex gap-5 lg:block lg:flex-1" appReveal [revealDelay]="index * 70">
          <!-- Node + connector rail -->
          <div class="flex flex-col items-center lg:flex-row lg:items-center lg:gap-3">
            <span
              class="border-orange bg-surface text-orange-ink flex size-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold"
            >
              {{ step.number }}
            </span>

            @if (!isLast) {
              <span
                class="bg-brand-gradient-y my-2 w-[2px] flex-1 rounded-full lg:hidden"
                aria-hidden="true"
              ></span>
              <span
                class="bg-brand-gradient hidden h-[2px] flex-1 rounded-full lg:block"
                aria-hidden="true"
              ></span>
            }
          </div>

          <div class="pb-10 lg:mt-6 lg:pb-0 lg:pe-4">
            <span
              class="border-border bg-bg-subtle text-text-muted mb-4 inline-flex size-10 items-center justify-center rounded-xl border"
            >
              <lucide-icon [img]="step.icon" [size]="18" aria-hidden="true" />
            </span>

            <h3 class="text-text text-base font-bold sm:text-lg">{{ step.title }}</h3>
            <p class="text-text-muted mt-2.5 text-sm leading-relaxed">{{ step.body }}</p>
          </div>
        </li>
      }
    </ol>
  `,
})
export class ProcessTimelineComponent {
  private readonly i18n = inject(TranslationService);

  protected readonly steps = computed<readonly TimelineStep[]>(() =>
    this.i18n.tItems<ProcessStep>('howWeWork.steps').map((step, index) => ({
      ...step,
      icon: PROCESS_STEP_ICONS[index % PROCESS_STEP_ICONS.length],
    })),
  );
}
