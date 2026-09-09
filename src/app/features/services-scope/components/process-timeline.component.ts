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
 * Creative Vertical Zig-Zag timeline with connecting spine and alternating cards.
 */
@Component({
  selector: 'app-process-timeline',
  imports: [LucideAngularModule, RevealOnScrollDirective],
  host: { class: 'block relative' },
  styleUrl: './process-timeline.component.css',
  template: `
    <div class="relative mx-auto max-w-5xl px-4">
      
      <!-- Continuous Central Connecting Line (Desktop Only) - UNTOUCHED -->
      <div 
        class="bg-brand-gradient-y absolute inset-y-8 start-1/2 hidden w-[3px] -translate-x-1/2 rounded-full opacity-40 lg:block rtl:translate-x-1/2" 
        aria-hidden="true"
      ></div>

      <!-- Timeline Steps Container -->
      <ol class="relative flex flex-col gap-8 lg:gap-16">
        @for (step of steps(); track step.number; let index = $index, isEven = $even) {
          <li 
            class="relative flex flex-col lg:flex-row lg:items-center"
            [class.lg:flex-row-reverse]="!isEven"
            appReveal 
            [revealDelay]="index * 80"
          >
            <!-- Content Card (50% width on Desktop) -->
            <div class="w-full lg:w-[calc(50%-2.5rem)]">
              <div 
                class="mobile-card-glint border-border bg-bg-subtle group relative rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/50 hover:shadow-xl hover:shadow-orange/5 sm:p-7"
              >
                <!-- Top Accent Gradient on Hover -->
                <span 
                  class="bg-brand-gradient absolute inset-x-0 top-0 h-[3px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
                  aria-hidden="true"
                ></span>

                <!-- Header Row (Mobile Step Badge + Icon + Title) -->
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 sm:gap-4">
                    <!-- Step Icon -->
                    <span 
                      class="border-border bg-bg text-orange-ink flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 group-hover:bg-orange group-hover:text-white sm:size-12"
                    >
                      <lucide-icon [img]="step.icon" [size]="22" aria-hidden="true" />
                    </span>

                    <!-- Title -->
                    <h3 class="text-text text-lg font-bold transition-colors group-hover:text-orange-ink sm:text-xl">
                      {{ step.title }}
                    </h3>
                  </div>

                  <!-- MOBILE ONLY: Clean Step Badge inside the Card -->
                  <span class="border-orange/30 bg-orange/10 text-orange-ink flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-black lg:hidden">
                    {{ step.number }}
                  </span>
                </div>

                <!-- Body Copy -->
                <p class="text-text-muted mt-4 text-sm leading-relaxed sm:text-base">
                  {{ step.body }}
                </p>
              </div>
            </div>

            <span class="timeline-mobile-connector" aria-hidden="true"></span>

            <!-- Central Number Node Anchor (Desktop Only) - EXACT ORIGINAL DESIGN -->
            <div class="hidden my-4 items-center justify-center lg:flex lg:my-0 lg:w-20">
              <span
                class="border-orange bg-bg text-orange-ink relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 text-base font-extrabold shadow-md shadow-orange/10 transition-transform duration-300 hover:scale-110"
              >
                {{ step.number }}
              </span>
            </div>

            <!-- Empty Spacer (Balances the opposite side in desktop layout) - UNTOUCHED -->
            <div class="hidden w-full lg:block lg:w-[calc(50%-2.5rem)]"></div>
          </li>
        }
      </ol>
    </div>
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