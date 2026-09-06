import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHeaderBannerComponent } from '../../shared/components/page-header-banner/page-header-banner.component';
import { TextWithCollageComponent } from '../../shared/components/text-with-collage/text-with-collage.component';
import { TwoCardRowComponent, VisionMissionCard } from '../../shared/components/two-card-row/two-card-row.component';
import { CardGridComponent, GridCardItem } from '../../shared/components/card-grid/card-grid.component';
import { NumberedDarkBandComponent, NumberedDarkCardItem } from '../../shared/components/numbered-dark-band/numbered-dark-band.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    PageHeaderBannerComponent,
    TextWithCollageComponent,
    TwoCardRowComponent,
    CardGridComponent,
    NumberedDarkBandComponent
  ],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  private seoService = inject(SeoService);

  // Key differentiator bullets for About narrative
  aboutBullets = [
    'whyus.badge1',
    'whyus.badge2',
    'whyus.badge3',
    'whyus.badge4',
    'whyus.badge5'
  ];

  // Mission & Vision Cards
  missionCard: VisionMissionCard = {
    icon: '🎯',
    kickerKey: 'mission.kicker',
    titleKey: 'mission.title',
    bodyKey: 'mission.body'
  };

  visionCard: VisionMissionCard = {
    icon: '🔭',
    kickerKey: 'vision.kicker',
    titleKey: 'vision.title',
    bodyKey: 'vision.body'
  };

  // 4 Values for CardGridComponent
  valuesList: GridCardItem[] = [
    { icon: '🤝', titleKey: 'values.reliability.title', bodyKey: 'values.reliability.body' },
    { icon: '✨', titleKey: 'values.quality.title', bodyKey: 'values.quality.body' },
    { icon: '⚡', titleKey: 'values.speed.title', bodyKey: 'values.speed.body' },
    { icon: '🔄', titleKey: 'values.flexibility.title', bodyKey: 'values.flexibility.body' }
  ];

  // 3 Strategic Goals for NumberedDarkBandComponent
  goalsItems: NumberedDarkCardItem[] = [
    {
      number: '01',
      icon: '🎯',
      titleKey: 'values.reliability.title',
      bodyKey: 'goals.goal1'
    },
    {
      number: '02',
      icon: '⚙️',
      titleKey: 'values.speed.title',
      bodyKey: 'goals.goal2'
    },
    {
      number: '03',
      icon: '🌱',
      titleKey: 'values.quality.title',
      bodyKey: 'goals.goal3'
    }
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('about.pageMeta.title', 'about.pageMeta.description');
  }
}
