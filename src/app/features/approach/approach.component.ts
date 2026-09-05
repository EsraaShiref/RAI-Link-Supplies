import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { StepTimelineComponent } from '../../shared/components/step-timeline/step-timeline.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ProcessStep } from '../../core/models/process-step.model';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [
    TranslatePipe,
    SectionTitleComponent,
    StepTimelineComponent,
    CtaBannerComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './approach.component.html'
})
export class ApproachComponent implements OnInit {
  private seoService = inject(SeoService);

  whyUsCards = [
    { key: 'whyus.badge1', icon: '🏆' },
    { key: 'whyus.badge2', icon: '⚡' },
    { key: 'whyus.badge3', icon: '📦' },
    { key: 'whyus.badge4', icon: '✅' },
    { key: 'whyus.badge5', icon: '🎯' }
  ];

  steps: ProcessStep[] = [
    { number: 1, titleKey: 'howwework.step1.title', bodyKey: 'howwework.step1.body', icon: '📝' },
    { number: 2, titleKey: 'howwework.step2.title', bodyKey: 'howwework.step2.body', icon: '🔍' },
    { number: 3, titleKey: 'howwework.step3.title', bodyKey: 'howwework.step3.body', icon: '💰' },
    { number: 4, titleKey: 'howwework.step4.title', bodyKey: 'howwework.step4.body', icon: '📋' },
    { number: 5, titleKey: 'howwework.step5.title', bodyKey: 'howwework.step5.body', icon: '🚚' },
    { number: 6, titleKey: 'howwework.step6.title', bodyKey: 'howwework.step6.body', icon: '🤝' },
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('approach.pageMeta.title', 'approach.pageMeta.description');
  }
}
