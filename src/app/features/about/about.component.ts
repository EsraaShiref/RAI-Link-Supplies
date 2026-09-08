import { Component, computed, inject } from '@angular/core';
import { Compass, LucideAngularModule, Target, Flag, TrendingUp, Award } from 'lucide-angular';

import { BRAND_VALUES } from '../../core/content';
import type { NumberedItem } from '../../core/models';
import { TranslationService } from '../../core/services';
import { CtaBannerComponent } from '../../layout';
import {
  IconCardComponent,
  NetworkVisualComponent,
  PageHeaderComponent,
  SectionHeadingComponent,
} from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';

@Component({
  selector: 'app-about',
  imports: [
    LucideAngularModule,
    IconCardComponent,
    NetworkVisualComponent,
    PageHeaderComponent,
    SectionHeadingComponent,
    RevealOnScrollDirective,
    CtaBannerComponent,
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

    <!-- ─────────────────────────────  Goals (Light Mode Vertical Supply Track)  ───────────────────────────── -->
    <section class="bg-bg-subtle relative overflow-hidden py-20 text-text sm:py-28" aria-labelledby="about-goals-heading">
      
      <!-- Subtle Glowing Background Orbs -->
      <div class="pointer-events-none absolute -top-24 start-1/2 size-96 -translate-x-1/2 rounded-full bg-orange/10 blur-[130px]" aria-hidden="true"></div>

      <div class="shell relative z-10">
        
        <!-- Header -->
        <div class="text-center">
          <app-section-heading
            eyebrowKey="goals.eyebrow"
            titleKey="goals.title"
            headingId="about-goals-heading"
          />
        </div>

        <!-- Vertical Timeline Track Container -->
        <div class="relative mx-auto mt-16 max-w-4xl sm:mt-24">
          
          <!-- Continuous Vertical Line -->
          <div 
            class="absolute top-4 bottom-4 start-6 w-0.5 bg-gradient-to-b from-orange via-orange/30 to-border sm:start-1/2 sm:-translate-x-1/2" 
            aria-hidden="true"
          ></div>

          <!-- Animated Pulse Glowing Dot Moving Down -->
          <div 
            class="animate-track-pulse absolute start-6 size-3 -translate-x-1 rounded-full bg-orange shadow-[0_0_12px_rgba(249,115,22,0.8)] sm:start-1/2 sm:-translate-x-1.5"
            aria-hidden="true"
          ></div>

          <!-- Timeline Items -->
          <div class="space-y-12 sm:space-y-16">
            @for (goal of goals(); track goal.number; let index = $index) {
              <div 
                appReveal 
                [revealDelay]="index * 150"
                class="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center"
                [class.sm:flex-row-reverse]="index % 2 !== 0"
              >
                
                <!-- Center Node / Station Marker -->
                <div class="border-border bg-surface shadow-card absolute start-6 z-20 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-transform duration-300 hover:scale-110 sm:start-1/2">
                  <span class="size-3 animate-ping rounded-full bg-orange/60"></span>
                  <span class="absolute size-2.5 rounded-full bg-orange"></span>
                </div>

                <!-- Light Mode Glass Card -->
                <div class="w-full ps-14 sm:w-1/2 sm:ps-0" [class.sm:pe-12]="index % 2 === 0" [class.sm:ps-12]="index % 2 !== 0">
                  <div class="group border-border/80 bg-surface shadow-card relative rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-2 hover:border-orange/60 hover:shadow-xl hover:shadow-orange/5">
                    
                    <!-- Phase Badge Tag -->
                    <div class="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/10 px-3 py-1 text-xs font-bold tracking-widest text-orange-ink">
                      <span>{{ t('goals.stationLabel') }} 0{{ goal.number }}</span>
                    </div>

                    <!-- Header with Icon & Number -->
                    <div class="mt-4 flex items-center justify-between">
                      <p class="text-3xl font-black text-text/15 transition-colors duration-300 group-hover:text-orange-ink">
                        0{{ goal.number }}
                      </p>
                      
                      <div class="border-border bg-bg-subtle text-orange-ink flex size-12 items-center justify-center rounded-2xl border shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-orange group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange/20">
                        <lucide-icon [img]="goalIcons[index % goalIcons.length]" [size]="22" aria-hidden="true" />
                      </div>
                    </div>

                    <!-- Description -->
                    <p class="text-text-muted mt-4 text-sm leading-relaxed sm:text-base">
                      {{ goal.body }}
                    </p>

                    <!-- Hover Progress Bar -->
                    <div class="bg-bg-subtle mt-6 h-1 w-full overflow-hidden rounded-full">
                      <div class="h-full w-0 bg-orange transition-all duration-500 group-hover:w-full"></div>
                    </div>

                  </div>
                </div>

                <!-- Spacer for Grid Balance on Desktop -->
                <div class="hidden sm:block sm:w-1/2"></div>

              </div>
            }
          </div>

        </div>

      </div>
    </section>

    <app-cta-banner />
  `,
})
export class AboutComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly brandValues = BRAND_VALUES;

  protected readonly goalIcons = [Flag, TrendingUp, Award];

  protected readonly pillars = [
    { id: 'mission', titleKey: 'mission.title', bodyKey: 'mission.body', icon: Target, delay: 0 },
    { id: 'vision', titleKey: 'vision.title', bodyKey: 'vision.body', icon: Compass, delay: 90 },
  ] as const;

  protected readonly goals = computed(() =>
    this.i18n.tItems<NumberedItem>('goals.items'),
  );
}