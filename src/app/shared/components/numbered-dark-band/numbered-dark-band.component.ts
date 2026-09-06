import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { DecorativeOrnamentComponent } from '../decorative-ornament/decorative-ornament.component';

export interface NumberedDarkCardItem {
  number: string;
  icon?: string;
  titleKey: string;
  bodyKey: string;
  route?: string;
}

@Component({
  selector: 'app-numbered-dark-band',
  standalone: true,
  imports: [TranslatePipe, RouterLink, RevealOnScrollDirective, DecorativeOrnamentComponent],
  template: `
    <section class="relative bg-navy py-16 md:py-24 text-text-inverse overflow-hidden border-t-4 border-orange">
      <!-- Background ornamentation -->
      <app-decorative-ornament [type]="'rings'" [position]="'top-start'" />
      <app-decorative-ornament [type]="'stripes'" [position]="'bottom-end'" />

      <div class="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16" appRevealOnScroll>
          @if (kickerKey()) {
            <span class="text-orange font-bold uppercase tracking-wider text-xs md:text-sm mb-3 block">
              {{ kickerKey()! | translate }}
            </span>
          }
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ titleKey() | translate }}
          </h2>
          <div class="w-20 h-1 bg-orange mx-auto rounded-full"></div>
        </div>

        <!-- 3-Column Numbered Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          @for (item of items(); track item.number; let i = $index) {
            <div 
              appRevealOnScroll
              [delay]="i * 120"
              class="group relative bg-white/5 hover:bg-white/10 border border-white/15 hover:border-orange rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between shadow-xl">
              
              <div>
                <!-- Top Row: Number badge + Icon -->
                <div class="flex items-center justify-between mb-6">
                  <span class="font-heading-en text-4xl sm:text-5xl font-black text-orange/30 group-hover:text-orange transition-colors">
                    {{ item.number }}
                  </span>
                  @if (item.icon) {
                    <div class="w-12 h-12 rounded-xl bg-white/10 text-orange flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {{ item.icon }}
                    </div>
                  }
                </div>

                <!-- Title -->
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-orange transition-colors">
                  {{ item.titleKey | translate }}
                </h3>

                <!-- Body -->
                <p class="text-text-inverse/70 text-sm leading-relaxed mb-8">
                  {{ item.bodyKey | translate }}
                </p>
              </div>

              <!-- Overlapping Circular Orange Arrow Button (RTL logical placement: inset-inline-end) -->
              @if (item.route) {
                <a 
                  [routerLink]="item.route"
                  class="absolute -bottom-5 end-6 w-11 h-11 rounded-full bg-orange hover:bg-red-orange text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon-flip-rtl">
                    <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                  </svg>
                </a>
              } @else {
                <div class="absolute -bottom-5 end-6 w-11 h-11 rounded-full bg-orange text-white flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon-flip-rtl">
                    <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                  </svg>
                </div>
              }

            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class NumberedDarkBandComponent {
  readonly kickerKey = input<string | undefined>(undefined);
  readonly titleKey = input.required<string>();
  readonly items = input.required<NumberedDarkCardItem[]>();
}
