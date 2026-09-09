import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DirectionService, TranslationService } from './core/services';
import { FooterComponent, HeaderComponent, SplashScreenComponent } from './layout';
import { WhatsappButtonComponent } from './shared/components';
import { ScrollSentinelDirective } from './shared/directives';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SplashScreenComponent,
    ScrollSentinelDirective,
    WhatsappButtonComponent,
  ],
  host: {
    class: 'relative flex min-h-dvh flex-col',
    '[class.font-ar]': 'isArabic()',
    '[class.font-en]': '!isArabic()',
  },
  template: `
    <a
      href="#main-content"
      class="bg-cta text-cta-fg sr-only z-[60] rounded-full px-5 py-2.5 text-sm font-bold focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
    >
      {{ t('a11y.skipToContent') }}
    </a>

    <!-- Zero-layout marker used by the header to detect "scrolled away from top". -->
    <span
      appScrollSentinel
      class="pointer-events-none absolute inset-x-0 top-0 h-2"
      aria-hidden="true"
    ></span>

    @if (splashVisible()) {
      <app-splash-screen (completed)="dismissSplash()" />
    }

    @if (!splashVisible()) {
      <app-header />
    }

    <app-whatsapp-button />

    <main id="main-content" class="flex-1">
      <router-outlet />
    </main>

    <app-footer />
  `,
})
export class App {
  private readonly i18n = inject(TranslationService);
  private readonly directionService = inject(DirectionService);
  private readonly document = inject(DOCUMENT);

  protected readonly t = this.i18n.t;
  protected readonly isArabic = computed(() => this.i18n.currentLang() === 'ar');
  protected readonly splashVisible = signal(true);

  constructor() {
    // Single owner of the document-level language/direction attributes. The
    // pre-paint script in index.html sets the same values before first paint, so
    // on load this effect is a confirmation rather than a visible change.
    effect(() => {
      const lang = this.i18n.currentLang();
      const root = this.document.documentElement;

      root.lang = lang;
      root.dir = this.directionService.direction();
      root.classList.toggle('font-ar', lang === 'ar');
      root.classList.toggle('font-en', lang === 'en');
    });
  }

  protected dismissSplash(): void {
    this.splashVisible.set(false);
  }
}
