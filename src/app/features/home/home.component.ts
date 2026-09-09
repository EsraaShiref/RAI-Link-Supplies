import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, ShieldCheck, Truck, LucideAngularModule,ArrowLeft } from 'lucide-angular';
import {
  AUDIENCE_SEGMENTS,
  BRAND_VALUES,
  EXPERTISE_AREAS,
  PRODUCT_CATEGORIES,
  WHY_CHOOSE_US,
} from '../../core/content';
import { TranslationService } from '../../core/services';
import { CtaBannerComponent } from '../../layout';
import { CardSkeletonComponent } from '../../shared/components/card-skeleton/card-skeleton.component';
import { IconCardComponent } from '../../shared/components/icon-card/icon-card.component';
import { NetworkVisualComponent } from '../../shared/components/network-visual/network-visual.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SupplyVisualComponent } from '../../shared/components/supply-visual/supply-visual.component';
import { RevealOnScrollDirective } from '../../shared/directives';
import { firstSentences } from '../../shared/utils/text';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideAngularModule,
    CardSkeletonComponent,
    IconCardComponent,
    NetworkVisualComponent,
    SectionHeadingComponent,
    RevealOnScrollDirective,
    SupplyVisualComponent,
    CtaBannerComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly ArrowRightIcon = ArrowRight;
  protected readonly ArrowLeftIcon = ArrowLeft;
  protected readonly ShieldCheckIcon = ShieldCheck;
  protected readonly TruckIcon = Truck;

  protected readonly expertiseAreas = EXPERTISE_AREAS;
  protected readonly brandValues = BRAND_VALUES;
  protected readonly whyChooseUs = WHY_CHOOSE_US;
  protected readonly productCategories = PRODUCT_CATEGORIES;
  protected readonly audienceSegments = AUDIENCE_SEGMENTS;

  /** Snapshot of the About copy; the full text lives on `/about`. */
  protected readonly aboutSnapshot = computed(() => firstSentences(this.t('about.body'), 2));
  protected readonly audienceSections = [
    {
      id: 'government',
      number: '01',
      titleKey: 'targetAudience.items.government.title',
      bodyKey: 'targetAudience.items.government.body',
      image: 'assets/images/Government%20%26%20Public%20Sector.jpg',
    },
    {
      id: 'corporate',
      number: '02',
      titleKey: 'targetAudience.items.corporate.title',
      bodyKey: 'targetAudience.items.corporate.body',
      image: 'assets/images/Corporate%20%26%20Private%20Enterprise.jpg',
    },
    {
      id: 'education',
      number: '03',
      titleKey: 'targetAudience.items.education.title',
      bodyKey: 'targetAudience.items.education.body',
      image: 'assets/images/Educational%20%26%20Healthcare%20Institutions.jpg',
    },
  ] as const;
}