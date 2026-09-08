import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

import {
  AUDIENCE_SEGMENTS,
  BRAND_VALUES,
  EXPERTISE_AREAS,
  PRODUCT_CATEGORIES,
  WHY_CHOOSE_US,
} from '../../core/content';
import { TranslationService } from '../../core/services';
import { CtaBannerComponent } from '../../layout';
import {
  BrandArrowComponent,
  CardSkeletonComponent,
  HighlightChipComponent,
  IconCardComponent,
  NetworkVisualComponent,
  SectionHeadingComponent,
} from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';
import { firstSentences } from '../../shared/utils/text';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideAngularModule,
    CtaBannerComponent,
    BrandArrowComponent,
    CardSkeletonComponent,
    HighlightChipComponent,
    IconCardComponent,
    NetworkVisualComponent,
    SectionHeadingComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly ArrowRightIcon = ArrowRight;

  protected readonly expertiseAreas = EXPERTISE_AREAS;
  protected readonly brandValues = BRAND_VALUES;
  protected readonly whyChooseUs = WHY_CHOOSE_US;
  protected readonly productCategories = PRODUCT_CATEGORIES;
  protected readonly audienceSegments = AUDIENCE_SEGMENTS;

  /** Snapshot of the About copy; the full text lives on `/about`. */
  protected readonly aboutSnapshot = computed(() => firstSentences(this.t('about.body'), 2));
}
