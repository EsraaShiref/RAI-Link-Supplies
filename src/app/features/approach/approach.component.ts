import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHeaderBannerComponent } from '../../shared/components/page-header-banner/page-header-banner.component';
import { IconListWithImageComponent, IconListItem } from '../../shared/components/icon-list-with-image/icon-list-with-image.component';
import { StepTimelineComponent } from '../../shared/components/step-timeline/step-timeline.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ProcessStep } from '../../core/models/process-step.model';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [
    PageHeaderBannerComponent,
    IconListWithImageComponent,
    StepTimelineComponent,
    SectionTitleComponent,
    CtaBannerComponent
  ],
  templateUrl: './approach.component.html'
})
export class ApproachComponent implements OnInit {
  private seoService = inject(SeoService);

  // Full 5 Why-Choose-Us Differentiators for IconListWithImageComponent
  whyUsFullList: IconListItem[] = [
    { icon: '💰', titleKey: 'whyus.badge1', bodyKey: 'goals.goal2' },
    { icon: '⚡', titleKey: 'whyus.badge2', bodyKey: 'values.speed.body' },
    { icon: '📦', titleKey: 'whyus.badge3', bodyKey: 'values.reliability.body' },
    { icon: '✅', titleKey: 'whyus.badge4', bodyKey: 'values.quality.body' },
    { icon: '🎯', titleKey: 'whyus.badge5', bodyKey: 'values.flexibility.body' }
  ];

  // 6-step How We Work Process
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
