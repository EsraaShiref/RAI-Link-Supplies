import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { AUDIENCE_SEGMENTS } from '../../core/content';
import type { NumberedItem } from '../../core/models';
import { TranslationService } from '../../core/services';
import {
  NumberedBlockComponent,
  PageHeaderComponent,
  SectionHeadingComponent,
} from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';

@Component({
  selector: 'app-target-audience',
  imports: [
    LucideAngularModule,
    NumberedBlockComponent,
    PageHeaderComponent,
    SectionHeadingComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-page-header
      titleKey="nav.targetAudience"
      headlineKey="targetAudience.title"
      eyebrowKey="targetAudience.eyebrow"
    />

    <section class="bg-bg" aria-labelledby="audience-heading">
      <div class="shell py-16 sm:py-20">
        <app-section-heading
          eyebrowKey="targetAudience.eyebrow"
          titleKey="targetAudience.title"
          headingId="audience-heading"
        />

        <app-numbered-block class="mt-14" [items]="segments()" />
      </div>
    </section>

    <!-- Sector icons, reinforcing the three segments above -->
    <section class="bg-bg-subtle">
      <div class="shell py-14 sm:py-16">
        <ul class="grid gap-6 md:grid-cols-3">
          @for (segment of audienceSegments; track segment.id; let index = $index) {
            <li
              appReveal
              [revealDelay]="index * 80"
              class="mobile-card-glint border-border bg-surface shadow-card flex items-center gap-4 rounded-xl border p-6"
            >
              <span
                class="bg-brand-gradient inline-flex size-12 shrink-0 items-center justify-center rounded-xl text-white"
              >
                <lucide-icon [img]="segment.icon" [size]="22" aria-hidden="true" />
              </span>
              <span class="text-text text-sm font-bold sm:text-[0.9375rem]">
                {{ t(segment.titleKey) }}
              </span>
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- <app-cta-banner /> -->
  `,
})
export class TargetAudienceComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly audienceSegments = AUDIENCE_SEGMENTS;

  /** `targetAudience.items` is keyed, so it is mapped into ordered blocks here. */
  protected readonly segments = computed<readonly NumberedItem[]>(() =>
    AUDIENCE_SEGMENTS.map((segment) => ({
      number: this.t(`targetAudience.items.${segment.id}.number`),
      title: this.t(segment.titleKey),
      body: this.t(segment.bodyKey),
    })),
  );
}
