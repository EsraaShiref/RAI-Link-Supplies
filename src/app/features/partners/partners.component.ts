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
    CtaBannerComponent,
    NetworkVisualComponent,
    PageHeaderComponent,
    SectionHeadingComponent,
    RevealOnScrollDirective,
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

  protected readonly points = computed(() => this.i18n.tList('partners.points'));
}
