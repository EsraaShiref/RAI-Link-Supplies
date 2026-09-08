import { Component, computed, inject } from '@angular/core';
import { Check, LucideAngularModule } from 'lucide-angular';

import { TranslationService } from '../../core/services';
import { CtaBannerComponent } from '../../layout';
import {
  NetworkVisualComponent,
  PageHeaderComponent,
  SectionHeadingComponent,
} from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';

@Component({
  selector: 'app-partners',
  imports: [
    LucideAngularModule,
    NetworkVisualComponent,
    PageHeaderComponent,
    SectionHeadingComponent,
    RevealOnScrollDirective,
    CtaBannerComponent,
  ],
  template: `
    <app-page-header
      titleKey="nav.partners"
      headlineKey="partners.title"
      eyebrowKey="partners.eyebrow"
    />

    <section class="bg-bg" aria-labelledby="partners-heading">
      <div class="shell grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
        <div appReveal="start">
          <h2 id="partners-heading" class="sr-only">{{ t('partners.title') }}</h2>

          <ul class="flex flex-col gap-6">
            @for (point of points(); track $index; let index = $index) {
              <li class="flex items-start gap-4" appReveal [revealDelay]="index * 80">
                <span
                  class="bg-brand-gradient mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-white"
                >
                  <lucide-icon [img]="CheckIcon" [size]="15" [strokeWidth]="3" aria-hidden="true" />
                </span>
                <p class="text-text-muted text-sm leading-relaxed sm:text-base">{{ point }}</p>
              </li>
            }
          </ul>
        </div>

        <app-network-visual appReveal="end" />
      </div>
    </section>

    <!-- Supplier logo strip -->
    <section class="bg-bg-subtle" aria-labelledby="partners-logos-heading">
      <div class="shell py-16 sm:py-20">
        <app-section-heading
          eyebrowKey="partners.eyebrow"
          titleKey="partners.title"
          headingId="partners-logos-heading"
        />

        <ul class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          @for (slot of logoSlots; track slot) {
            <li
              class="border-border bg-surface flex h-24 items-center justify-center rounded-xl border border-dashed grayscale"
            >
              <span class="text-text-muted px-3 text-center text-[0.6875rem] leading-tight">
                {{ t('a11y.supplierLogoPlaceholder') }}
              </span>
            </li>
          }
        </ul>

        <p class="text-text-muted mt-6 text-center text-xs sm:text-sm">
          {{ t('seo.partnersPlaceholderNote') }}
        </p>
      </div>
    </section>

    <section class="bg-bg" aria-labelledby="audience-heading">
      <div class="shell py-16 sm:py-20">
        <app-section-heading
          eyebrowKey="targetAudience.eyebrow"
          titleKey="targetAudience.title"
          headingId="audience-heading"
        />

        <div class="mt-14 flex flex-col gap-16 sm:gap-20 lg:gap-28">
          @for (audience of audienceSections; track audience.id; let index = $index) {
            <article class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div
                [revealDelay]="index * 100"
                [appReveal]="index % 2 === 0 ? 'start' : 'end'"
                [class.lg:order-2]="index % 2 === 0"
              >
                <p class="text-orange-ink text-xs font-bold tracking-[0.16em] uppercase">
                  {{ audience.number }}
                </p>
                <h3 class="text-text mt-3 text-2xl font-extrabold sm:text-3xl">
                  {{ t(audience.titleKey) }}
                </h3>
                <p class="text-text-muted mt-5 max-w-xl text-sm leading-relaxed sm:text-base">
                  {{ t(audience.bodyKey) }}
                </p>
              </div>

              <div
                [revealDelay]="index * 100 + 80"
                [appReveal]="index % 2 === 0 ? 'end' : 'start'"
                [class.lg:order-1]="index % 2 === 0"
                class="border-border bg-bg-subtle overflow-hidden rounded-xl border"
              >
                <img
                  [src]="audience.image"
                  [alt]="t(audience.titleKey)"
                  class="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-cta-banner />
  `,
})
export class PartnersComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly CheckIcon = Check;

  /**
   * Six dashed placeholders. Deliberately empty and clearly labelled — inventing
   * supplier marks would misrepresent real commercial relationships.
   */
  protected readonly logoSlots = [1, 2, 3, 4, 5, 6] as const;

  protected readonly audienceSections = [
    {
      id: 'government',
      number: '01',
      titleKey: 'targetAudience.items.government.title',
      bodyKey: 'targetAudience.items.government.body',
      image: 'assets/images/Government%20%26%20Public%20Sector.jpg',
    },
    {
      id: 'corporate',
      number: '02',
      titleKey: 'targetAudience.items.corporate.title',
      bodyKey: 'targetAudience.items.corporate.body',
      image: 'assets/images/Corporate%20%26%20Private%20Enterprise.jpg',
    },
    {
      id: 'education',
      number: '03',
      titleKey: 'targetAudience.items.education.title',
      bodyKey: 'targetAudience.items.education.body',
      image: 'assets/images/Educational%20%26%20Healthcare%20Institutions.jpg',
    },
  ] as const;

  protected readonly points = computed(() => this.i18n.tList('partners.points'));
}
