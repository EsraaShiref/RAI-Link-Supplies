import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-header-banner',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <section class="relative bg-navy py-16 md:py-24 text-center overflow-hidden border-b-4 border-orange">
      <!-- Ambient overlay gradients -->
      <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/70 z-0 pointer-events-none"></div>
      
      <!-- Subtle procurement geometry background grid -->
      <div class="absolute inset-0 opacity-5 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-header" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-header)" />
        </svg>
      </div>

      <!-- Content -->
      <div class="container relative z-10 mx-auto px-4 max-w-5xl">
        <!-- Breadcrumb / kicker -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange font-semibold text-xs tracking-wider uppercase mb-4 animate-fade-up">
          <a routerLink="/" class="hover:text-white transition-colors">{{ 'nav.home' | translate }}</a>
          <span class="text-white/40">/</span>
          <span>{{ kickerKey() | translate }}</span>
        </div>

        <!-- Headline -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-text-inverse tracking-tight animate-fade-up" style="animation-delay: 100ms">
          {{ titleKey() | translate }}
        </h1>

        <!-- Optional Subtitle -->
        @if (subtitleKey()) {
          <p class="mt-4 text-sm sm:text-base text-text-inverse/70 max-w-2xl mx-auto leading-relaxed animate-fade-up" style="animation-delay: 200ms">
            {{ subtitleKey()! | translate }}
          </p>
        }
      </div>
    </section>
  `
})
export class PageHeaderBannerComponent {
  readonly titleKey = input.required<string>();
  readonly kickerKey = input.required<string>();
  readonly subtitleKey = input<string | undefined>(undefined);
}
