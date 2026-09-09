import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

import { TranslationService } from '../../core/services';
import { RevealOnScrollDirective } from '../../shared/directives';

/**
 * Tasweeqar-inspired Centered CTA Banner Card for RAI Link Supplies.
 */
@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink, LucideAngularModule, RevealOnScrollDirective],
  host: { class: 'block' },
  template: `
    <section class="shell py-16 sm:py-20">
      <div
        appReveal
        class="bg-navy relative overflow-hidden rounded-2xl border border-white/10 px-6 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20 lg:px-16"
      >
        <!-- Subtle Glow Effect in the Center -->
        <div 
          class="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-[120px]" 
          aria-hidden="true"
        ></div>

        <div class="relative z-10 mx-auto max-w-3xl">
          <!-- Main Title -->
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {{ t(titleKey()) }}
          </h2>

          <!-- Subtitle / Body Copy -->
          @if (bodyKey()) {
            <p class="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
              {{ t(bodyKey()) }}
            </p>
          }

          <!-- Centered CTA Action Button -->
          <div class="mt-8 flex justify-center">
            <a
              [routerLink]="routerLink()"
              class="bg-cta text-cta-fg inline-flex items-center gap-3 rounded-xl px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {{ t(ctaKey()) }}
              <lucide-icon [img]="ArrowRightIcon" [size]="18" class="transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-90"  />
            </a>
          </div>
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
  readonly variant = input<'full' | 'card'>('card');
}