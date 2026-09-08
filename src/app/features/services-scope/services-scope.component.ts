import { Component, inject } from '@angular/core';
import { LucideAngularModule, Route } from 'lucide-angular';

import { EXPERTISE_AREAS } from '../../core/content';
import { TranslationService } from '../../core/services';
import { CtaBannerComponent } from '../../layout';
import { CardSkeletonComponent, PageHeaderComponent, SectionHeadingComponent } from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';
import { ProcessTimelineComponent } from './components/process-timeline.component';

@Component({
  selector: 'app-services-scope',
  imports: [
    LucideAngularModule,
    CtaBannerComponent,
    CardSkeletonComponent,
    PageHeaderComponent,
    SectionHeadingComponent,
    ProcessTimelineComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-page-header
      titleKey="nav.servicesScope"
      headlineKey="projectScope.title"
      eyebrowKey="projectScope.eyebrow"
    />

    <!-- Project scope -->
    <section class="bg-bg" aria-labelledby="scope-heading">
      <div class="shell py-16 sm:py-20">
        <div
          appReveal
          class="border-border bg-bg-subtle relative overflow-hidden rounded-xl border p-7 sm:p-10 lg:p-12"
        >
          <span class="bg-brand-gradient absolute inset-x-0 top-0 h-[3px]" aria-hidden="true"></span>

          <div class="flex flex-col gap-7 lg:flex-row lg:gap-10">
            <span
              class="bg-brand-gradient inline-flex size-14 shrink-0 items-center justify-center rounded-xl text-white sm:size-16"
            >
              <lucide-icon [img]="RouteIcon" [size]="26" [strokeWidth]="1.75" aria-hidden="true" />
            </span>

            <div>
              <h2 id="scope-heading" class="text-text text-xl font-bold sm:text-2xl">
                {{ t('projectScope.title') }}
              </h2>
              <p class="text-text-muted mt-4 text-sm leading-relaxed sm:text-base lg:text-lg">
                {{ t('projectScope.body') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How we work -->
    <section class="bg-bg-subtle" aria-labelledby="process-heading">
      <div class="shell py-16 sm:py-20">
        <app-section-heading
          eyebrowKey="howWeWork.eyebrow"
          titleKey="howWeWork.title"
          headingId="process-heading"
        />

        @defer (on viewport) {
          <app-process-timeline class="mt-14" />
        } @placeholder {
          <app-card-skeleton
            class="mt-14"
            [count]="3"
            [height]="180"
            columnClass="sm:grid-cols-2 lg:grid-cols-3"
          />
        }
      </div>
    </section>

    <!-- Expertise: alternating rows -->
    <section class="bg-bg" aria-labelledby="expertise-heading">
      <div class="shell py-16 sm:py-20">
        <app-section-heading
          eyebrowKey="expertise.eyebrow"
          titleKey="expertise.title"
          headingId="expertise-heading"
        />

        <div class="mt-14 flex flex-col gap-14 lg:gap-20">
          @for (area of expertiseAreas; track area.id; let index = $index, isEven = $even) {
            <article class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div [appReveal]="isEven ? 'start' : 'end'" [class.lg:order-2]="!isEven">
                <p class="text-orange-ink text-xs font-bold tracking-[0.18em] uppercase">
                  {{ stepLabel(index) }}
                </p>
                <h3 class="text-text mt-3 text-xl font-bold sm:text-2xl">{{ t(area.titleKey) }}</h3>
                <p class="text-text-muted mt-4 text-sm leading-relaxed sm:text-base">
                  {{ t(area.bodyKey) }}
                </p>
              </div>

              <!-- Decorative counterpart: brand geometry, no stock photography -->
              <div
                [appReveal]="isEven ? 'end' : 'start'"
                [class.lg:order-1]="!isEven"
                class="border-border bg-bg-subtle relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-xl border"
                aria-hidden="true"
              >
                <span
                  class="bg-brand-gradient absolute inset-x-0 top-0 h-[3px]"
                  aria-hidden="true"
                ></span>
                <span
                  class="text-orange/15 absolute text-[7rem] leading-none font-extrabold sm:text-[9rem]"
                >
                  {{ stepNumber(index) }}
                </span>
                <span
                  class="bg-brand-gradient relative inline-flex size-20 items-center justify-center rounded-xl text-white shadow-lg sm:size-24"
                >
                  <lucide-icon
                    [img]="area.icon"
                    [size]="34"
                    [strokeWidth]="1.6"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-cta-banner />
  `,
})
export class ServicesScopeComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly RouteIcon = Route;
  protected readonly expertiseAreas = EXPERTISE_AREAS;

  protected stepNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  protected stepLabel(index: number): string {
    return `${this.t('expertise.eyebrow')} · ${this.stepNumber(index)}`;
  }
}
