import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReadMoreLinkComponent } from '../read-more-link/read-more-link.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { DecorativeOrnamentComponent } from '../decorative-ornament/decorative-ornament.component';

export interface IconListItem {
  icon: string;
  titleKey: string;
  bodyKey: string;
}

@Component({
  selector: 'app-icon-list-with-image',
  standalone: true,
  imports: [TranslatePipe, ReadMoreLinkComponent, RevealOnScrollDirective, DecorativeOrnamentComponent],
  template: `
    <section class="relative py-16 md:py-24 overflow-hidden" [class.bg-bg-light]="bgLight()" [class.bg-white]="!bgLight()">
      <app-decorative-ornament [type]="'rings'" [position]="'bottom-start'" />

      <div class="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Visual Collage & Badge Overlay Column -->
          <div 
            appRevealOnScroll
            class="lg:col-span-5 relative"
            [class.lg:order-2]="reverse()"
            [class.lg:order-1]="!reverse()">
            
            <div class="relative mx-auto max-w-md">
              <!-- Central Graphic Box -->
              <div class="relative z-10 bg-gradient-to-br from-navy via-navy to-charcoal rounded-3xl p-8 sm:p-10 text-white shadow-2xl border-4 border-white overflow-hidden">
                <div class="absolute -top-10 -end-10 w-36 h-36 bg-orange/20 rounded-full blur-2xl"></div>
                <div class="w-16 h-16 rounded-2xl bg-orange text-white flex items-center justify-center text-3xl font-bold mb-6 shadow-md">
                  ⚖️
                </div>
                <h3 class="text-2xl font-bold mb-3 text-white">
                  {{ collageTitleKey() | translate }}
                </h3>
                <p class="text-sm text-text-inverse/80 leading-relaxed mb-6">
                  {{ collageBodyKey() | translate }}
                </p>

                <div class="pt-4 border-t border-white/20 flex items-center gap-2 text-xs font-semibold text-orange">
                  <span>✓</span>
                  <span>{{ badgeSubKey() | translate }}</span>
                </div>
              </div>

              <!-- Overlapping Circular Badge (Logical positioning) -->
              <div class="absolute -top-6 -end-6 z-20 w-28 h-28 rounded-full bg-orange text-white p-3 shadow-xl border-4 border-white flex flex-col items-center justify-center text-center animate-pop-in">
                <span class="text-xl">🏆</span>
                <span class="text-xs font-black uppercase leading-tight mt-1">
                  {{ badgeTextKey() | translate }}
                </span>
              </div>

              <!-- Decorative frame shadow behind -->
              <div class="absolute -bottom-4 -start-4 w-full h-full rounded-3xl bg-orange/20 -z-10 transform -rotate-2"></div>
            </div>

          </div>

          <!-- Vertical Icon List Column -->
          <div 
            appRevealOnScroll
            [delay]="150"
            class="lg:col-span-7"
            [class.lg:order-1]="reverse()"
            [class.lg:order-2]="!reverse()">
            
            @if (kickerKey()) {
              <span class="text-orange font-bold uppercase tracking-wider text-xs md:text-sm mb-3 block">
                {{ kickerKey()! | translate }}
              </span>
            }

            <h2 class="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-8">
              {{ titleKey() | translate }}
            </h2>

            <!-- The List of Items -->
            <div class="space-y-6">
              @for (item of items(); track item.titleKey; let i = $index) {
                <div class="flex items-start gap-4 sm:gap-5 p-4 rounded-xl bg-white hover:bg-bg-navy-tint/50 border border-border transition-all duration-200 shadow-xs">
                  <div class="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center text-2xl shrink-0 font-bold">
                    {{ item.icon }}
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-navy mb-1">
                      {{ item.titleKey | translate }}
                    </h3>
                    <p class="text-sm text-text-secondary leading-relaxed">
                      {{ item.bodyKey | translate }}
                    </p>
                  </div>
                </div>
              }
            </div>

            @if (readMoreRoute()) {
              <div class="mt-8">
                <app-read-more-link [route]="readMoreRoute()" [labelKey]="readMoreLabelKey()" />
              </div>
            }

          </div>

        </div>
      </div>
    </section>
  `
})
export class IconListWithImageComponent {
  readonly kickerKey = input<string | undefined>(undefined);
  readonly titleKey = input.required<string>();
  readonly items = input.required<IconListItem[]>();
  readonly reverse = input<boolean>(false);
  readonly bgLight = input<boolean>(false);

  readonly collageTitleKey = input<string>('whyus.title');
  readonly collageBodyKey = input<string>('about.body');
  readonly badgeTextKey = input<string>('approach.badge');
  readonly badgeSubKey = input<string>('approach.badgeSub');
  readonly readMoreRoute = input<string | undefined>(undefined);
  readonly readMoreLabelKey = input<string>('common.readMore');
}
