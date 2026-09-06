import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReadMoreLinkComponent } from '../read-more-link/read-more-link.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from '../section-title/section-title.component';

export interface VisionMissionCard {
  icon: string;
  kickerKey?: string;
  titleKey: string;
  bodyKey: string;
  route?: string;
}

@Component({
  selector: 'app-two-card-row',
  standalone: true,
  imports: [TranslatePipe, ReadMoreLinkComponent, RevealOnScrollDirective, SectionTitleComponent],
  template: `
    <section class="py-16 md:py-24" [class.bg-bg-light]="bgLight()" [class.bg-white]="!bgLight()">
      <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        @if (sectionTitleKey()) {
          <app-section-title [titleKey]="sectionTitleKey()!" [kickerKey]="sectionKickerKey()" />
        }

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <!-- Card 1 -->
          <div 
            appRevealOnScroll
            class="bg-white rounded-2xl p-8 sm:p-10 border border-border shadow-sm card-hover flex flex-col justify-between relative overflow-hidden">
            <div class="absolute top-0 start-0 w-full h-1.5 bg-gradient-to-r from-orange to-red-orange"></div>
            <div>
              <div class="w-14 h-14 rounded-xl bg-orange/10 text-orange flex items-center justify-center text-3xl mb-6 font-semibold">
                {{ card1().icon }}
              </div>
              @if (card1().kickerKey) {
                <span class="text-xs font-bold uppercase tracking-wider text-orange mb-2 block">
                  {{ card1().kickerKey! | translate }}
                </span>
              }
              <h3 class="text-2xl font-bold text-navy mb-4">
                {{ card1().titleKey | translate }}
              </h3>
              <p class="text-text-secondary text-base leading-relaxed mb-6">
                {{ card1().bodyKey | translate }}
              </p>
            </div>
            @if (card1().route) {
              <div class="pt-4 border-t border-border/60">
                <app-read-more-link [route]="card1().route" />
              </div>
            }
          </div>

          <!-- Card 2 -->
          <div 
            appRevealOnScroll
            [delay]="150"
            class="bg-white rounded-2xl p-8 sm:p-10 border border-border shadow-sm card-hover flex flex-col justify-between relative overflow-hidden">
            <div class="absolute top-0 start-0 w-full h-1.5 bg-gradient-to-r from-navy to-orange"></div>
            <div>
              <div class="w-14 h-14 rounded-xl bg-navy/10 text-navy flex items-center justify-center text-3xl mb-6 font-semibold">
                {{ card2().icon }}
              </div>
              @if (card2().kickerKey) {
                <span class="text-xs font-bold uppercase tracking-wider text-orange mb-2 block">
                  {{ card2().kickerKey! | translate }}
                </span>
              }
              <h3 class="text-2xl font-bold text-navy mb-4">
                {{ card2().titleKey | translate }}
              </h3>
              <p class="text-text-secondary text-base leading-relaxed mb-6">
                {{ card2().bodyKey | translate }}
              </p>
            </div>
            @if (card2().route) {
              <div class="pt-4 border-t border-border/60">
                <app-read-more-link [route]="card2().route" />
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class TwoCardRowComponent {
  readonly card1 = input.required<VisionMissionCard>();
  readonly card2 = input.required<VisionMissionCard>();
  readonly sectionTitleKey = input<string | undefined>(undefined);
  readonly sectionKickerKey = input<string | undefined>(undefined);
  readonly bgLight = input<boolean>(true);
}
