import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReadMoreLinkComponent } from '../read-more-link/read-more-link.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { DecorativeOrnamentComponent } from '../decorative-ornament/decorative-ornament.component';

@Component({
  selector: 'app-text-with-collage',
  standalone: true,
  imports: [TranslatePipe, ReadMoreLinkComponent, RevealOnScrollDirective, DecorativeOrnamentComponent],
  template: `
    <section class="relative py-16 md:py-24 overflow-hidden" [class.bg-bg-light]="bgLight()" [class.bg-white]="!bgLight()">
      <app-decorative-ornament [type]="'dots'" [position]="'top-end'" />
      
      <div class="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Text Column -->
          <div 
            appRevealOnScroll
            class="lg:col-span-7 flex flex-col justify-center"
            [class.lg:order-2]="reverse()"
            [class.lg:order-1]="!reverse()">
            
            <span class="text-orange font-bold tracking-wider uppercase text-xs md:text-sm mb-3 block">
              {{ kickerKey() | translate }}
            </span>
            
            <h2 class="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-6">
              {{ titleKey() | translate }}
            </h2>
            
            <div class="space-y-4 text-text-secondary text-base leading-relaxed mb-8">
              <p>{{ bodyKey() | translate }}</p>
              @if (secondaryBodyKey()) {
                <p>{{ secondaryBodyKey()! | translate }}</p>
              }
            </div>

            <!-- Optional Key Points / Bullet Features -->
            @if (bullets().length > 0) {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                @for (bullet of bullets(); track bullet) {
                  <div class="flex items-center gap-3 bg-white/70 p-3 rounded-lg border border-border">
                    <span class="w-6 h-6 rounded-full bg-orange/10 text-orange flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                    <span class="text-sm font-medium text-text-primary">{{ bullet | translate }}</span>
                  </div>
                }
              </div>
            }

            @if (readMoreRoute()) {
              <div>
                <app-read-more-link [route]="readMoreRoute()" [labelKey]="readMoreLabelKey()" />
              </div>
            }
          </div>

          <!-- Layered Collage Composition Column -->
          <div 
            appRevealOnScroll
            [delay]="150"
            class="lg:col-span-5 relative"
            [class.lg:order-1]="reverse()"
            [class.lg:order-2]="!reverse()">
            
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <!-- Primary Main Card in Collage -->
              <div class="relative z-10 bg-navy rounded-2xl p-6 sm:p-8 text-white shadow-2xl border-4 border-white overflow-hidden card-hover">
                <!-- Abstract procurement geometric background -->
                <div class="absolute -top-12 -end-12 w-40 h-40 bg-orange/20 rounded-full blur-2xl pointer-events-none"></div>
                <div class="absolute bottom-0 start-0 w-32 h-32 bg-red-orange/10 rounded-full blur-xl pointer-events-none"></div>

                <div class="relative z-10">
                  <div class="w-14 h-14 rounded-xl bg-orange/20 border border-orange/30 text-orange flex items-center justify-center text-3xl mb-6">
                    {{ icon() }}
                  </div>
                  <h3 class="text-xl sm:text-2xl font-bold mb-3 text-white">
                    {{ collageCardTitleKey() | translate }}
                  </h3>
                  <p class="text-sm text-text-inverse/80 leading-relaxed">
                    {{ collageCardBodyKey() | translate }}
                  </p>
                </div>
              </div>

              <!-- Overlapping Secondary Card (Cutout / floating accent) -->
              <div class="absolute -bottom-6 -start-6 z-20 bg-white rounded-xl p-5 shadow-xl border border-border max-w-[220px] sm:max-w-[260px] animate-float">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-orange text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                    ★
                  </div>
                  <div>
                    <div class="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                      {{ collageBadgeSubKey() | translate }}
                    </div>
                    <div class="text-sm font-bold text-navy">
                      {{ collageBadgeTitleKey() | translate }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Subtle backdrop accent block -->
              <div class="absolute -top-4 -end-4 w-full h-full rounded-2xl bg-orange/15 -z-10 transform rotate-1"></div>
            </div>

          </div>

        </div>
      </div>
    </section>
  `
})
export class TextWithCollageComponent {
  readonly kickerKey = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly bodyKey = input.required<string>();
  readonly secondaryBodyKey = input<string | undefined>(undefined);
  readonly bullets = input<string[]>([]);
  readonly readMoreRoute = input<string | undefined>(undefined);
  readonly readMoreLabelKey = input<string>('common.readMore');
  readonly reverse = input<boolean>(false);
  readonly bgLight = input<boolean>(false);

  // Collage content inputs
  readonly icon = input<string>('📦');
  readonly collageCardTitleKey = input<string>('hero.subtitle');
  readonly collageCardBodyKey = input<string>('mission.body');
  readonly collageBadgeTitleKey = input<string>('approach.badge');
  readonly collageBadgeSubKey = input<string>('approach.badgeSub');
}
