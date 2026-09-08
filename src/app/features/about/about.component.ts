import { Component, computed, inject } from '@angular/core';
import { Compass, LucideAngularModule, Target } from 'lucide-angular';

import { BRAND_VALUES } from '../../core/content';
import type { NumberedItem } from '../../core/models';
import { TranslationService } from '../../core/services';
import { CtaBannerComponent } from '../../layout';
import {
  IconCardComponent,
  NetworkVisualComponent,
  NumberedBlockComponent,
  PageHeaderComponent,
  SectionHeadingComponent,
} from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';

@Component({
  selector: 'app-about',
  imports: [
    LucideAngularModule,
    CtaBannerComponent,
    IconCardComponent,
    NetworkVisualComponent,
    NumberedBlockComponent,
    PageHeaderComponent,
    SectionHeadingComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-page-header
      titleKey="nav.about"
      headlineKey="about.title"
      eyebrowKey="about.eyebrow"
    />

    <!-- Full about copy + supporting visual -->
    <section class="bg-bg" aria-labelledby="about-body-heading">
      <div class="shell grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div appReveal="start">
          <h2 id="about-body-heading" class="sr-only">{{ t('about.title') }}</h2>
          <p class="text-text-muted text-sm leading-relaxed sm:text-base lg:text-lg">
            {{ t('about.body') }}
          </p>
        </div>

        <app-network-visual appReveal="end" />
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="bg-bg-subtle" aria-labelledby="about-purpose-heading">
      <div class="shell py-16 sm:py-20">
        <h2 id="about-purpose-heading" class="sr-only">
          {{ t('mission.title') }} — {{ t('vision.title') }}
        </h2>

        <div class="grid gap-6 md:grid-cols-2">
          @for (pillar of pillars; track pillar.id) {
            <article
              appReveal
              [revealDelay]="pillar.delay"
              class="border-border bg-surface shadow-card relative flex flex-col overflow-hidden rounded-xl border p-7 sm:p-9"
            >
              <span class="bg-brand-gradient absolute inset-x-0 top-0 h-[3px]" aria-hidden="true"></span>

              <span
                class="border-border bg-bg-subtle text-orange-ink inline-flex size-12 items-center justify-center rounded-xl border"
              >
                <lucide-icon [img]="pillar.icon" [size]="22" aria-hidden="true" />
              </span>

              <h3 class="text-text mt-5 text-xl font-bold sm:text-2xl">{{ t(pillar.titleKey) }}</h3>
              <p class="text-text-muted mt-3 text-sm leading-relaxed sm:text-base">
                {{ t(pillar.bodyKey) }}
              </p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-bg" aria-labelledby="about-values-heading">
      <div class="shell py-16 sm:py-20">
        <app-section-heading
          eyebrowKey="values.eyebrow"
          titleKey="values.title"
          headingId="about-values-heading"
        />

        <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (value of brandValues; track value.id; let index = $index) {
            <li appReveal [revealDelay]="index * 70">
              <app-icon-card
                [icon]="value.icon"
                [titleKey]="value.titleKey"
                [bodyKey]="value.bodyKey"
              />
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- Goals -->
    <section class="bg-bg-subtle" aria-labelledby="about-goals-heading">
      <div class="shell py-16 sm:py-20">
        <app-section-heading
          eyebrowKey="goals.eyebrow"
          titleKey="goals.title"
          headingId="about-goals-heading"
        />

        <app-numbered-block class="mt-12" [items]="goals()" />
      </div>
    </section>

    <!-- <app-cta-banner /> -->
  `,
})
export class AboutComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly brandValues = BRAND_VALUES;

  protected readonly pillars = [
    { id: 'mission', titleKey: 'mission.title', bodyKey: 'mission.body', icon: Target, delay: 0 },
    { id: 'vision', titleKey: 'vision.title', bodyKey: 'vision.body', icon: Compass, delay: 90 },
  ] as const;

  protected readonly goals = computed(() =>
    this.i18n.tItems<NumberedItem>('goals.items'),
  );
}
