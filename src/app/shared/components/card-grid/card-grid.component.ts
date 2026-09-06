import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReadMoreLinkComponent } from '../read-more-link/read-more-link.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { DecorativeOrnamentComponent } from '../decorative-ornament/decorative-ornament.component';

export interface GridCardItem {
  id?: string;
  icon: string;
  titleKey: string;
  bodyKey: string;
  route?: string;
  tagKey?: string;
}

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [TranslatePipe, ReadMoreLinkComponent, RevealOnScrollDirective, SectionTitleComponent, DecorativeOrnamentComponent],
  template: `
    <section class="relative py-16 md:py-24" [class.bg-bg-light]="bgLight()" [class.bg-white]="!bgLight()">
      <app-decorative-ornament [type]="'stripes'" [position]="'top-start'" />

      <div class="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <!-- Section Header -->
        @if (titleKey()) {
          <app-section-title [titleKey]="titleKey()!" [kickerKey]="kickerKey()" />
        }

        <!-- Cards Grid -->
        <div [class]="gridColumnsClass()">
          @for (card of items(); track card.titleKey; let i = $index) {
            <div 
              appRevealOnScroll
              [delay]="(i % 4) * 80"
              class="group bg-white rounded-2xl p-6 sm:p-8 border border-border hover:border-orange shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover relative overflow-hidden">
              
              <!-- Accent top line on hover -->
              <div class="absolute top-0 start-0 w-full h-1 bg-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                <!-- Icon in geometric circular badge -->
                <div class="w-14 h-14 rounded-2xl bg-bg-light group-hover:bg-orange/10 text-navy group-hover:text-orange flex items-center justify-center text-3xl mb-6 transition-colors duration-300">
                  {{ card.icon }}
                </div>

                <!-- Title -->
                <h3 class="text-xl font-bold text-navy mb-3 group-hover:text-orange transition-colors">
                  {{ card.titleKey | translate }}
                </h3>

                <!-- Body -->
                <p class="text-text-secondary text-sm leading-relaxed mb-6">
                  {{ card.bodyKey | translate }}
                </p>
              </div>

              <!-- Micro-CTA Read More -->
              <div class="pt-4 border-t border-border/50 flex items-center justify-between">
                <app-read-more-link [route]="card.route || defaultRoute()" />
              </div>

            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class CardGridComponent {
  readonly titleKey = input<string | undefined>(undefined);
  readonly kickerKey = input<string | undefined>(undefined);
  readonly items = input.required<GridCardItem[]>();
  readonly columns = input<number>(4);
  readonly bgLight = input<boolean>(false);
  readonly defaultRoute = input<string | undefined>(undefined);

  protected gridColumnsClass(): string {
    switch (this.columns()) {
      case 3:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8';
      case 2:
        return 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8';
      case 4:
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8';
    }
  }
}
