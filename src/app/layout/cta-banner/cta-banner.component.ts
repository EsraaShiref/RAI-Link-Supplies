import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

import { TranslationService } from '../../core/services';
import { RevealOnScrollDirective } from '../../shared/directives';

/**
 * Closing call to action. `full` bleeds edge to edge as a section break;
 * `card` renders the same gradient as an inset rounded panel.
 *
 * The gradient used here is the deep variant: the bright brand orange only
 * reaches 3.15:1 against white, which fails AA for body copy, while the deep
 * end clears 4.6:1.
 */
@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink, LucideAngularModule, RevealOnScrollDirective],
  host: { class: 'block' },
  template: `
    <section [class]="variant() === 'card' ? 'shell py-16 sm:py-20' : ''">
      <div
        appReveal
        class="bg-brand-gradient-deep dot-grid relative overflow-hidden text-white"
        [class]="variant() === 'card' ? 'rounded-xl' : ''"
      >
        <div
          class="relative z-10 flex flex-col items-start gap-8 px-6 py-12 sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:px-14"
          [class]="variant() === 'full' ? 'shell' : ''"
        >
          <div class="max-w-2xl">
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ t(titleKey()) }}</h2>
            @if (bodyKey()) {
              <p class="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                {{ t(bodyKey()) }}
              </p>
            }
          </div>

          <a
            [routerLink]="routerLink()"
            class="text-navy inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
          >
            {{ t(ctaKey()) }}
            <lucide-icon [img]="ArrowRightIcon" [size]="17" class="rtl-flip" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class CtaBannerComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;
  protected readonly ArrowRightIcon = ArrowRight;

  readonly titleKey = input('contact.title');
  readonly bodyKey = input('contact.cta');
  readonly ctaKey = input('hero.ctaPrimary');
  readonly routerLink = input('/contact');
  readonly variant = input<'full' | 'card'>('full');
}
