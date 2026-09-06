import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
import { TextWithCollageComponent } from '../../shared/components/text-with-collage/text-with-collage.component';
import { TwoCardRowComponent, VisionMissionCard } from '../../shared/components/two-card-row/two-card-row.component';
import { CollageBannerComponent } from '../../shared/components/collage-banner/collage-banner.component';
import { NumberedDarkBandComponent, NumberedDarkCardItem } from '../../shared/components/numbered-dark-band/numbered-dark-band.component';
import { IconListWithImageComponent, IconListItem } from '../../shared/components/icon-list-with-image/icon-list-with-image.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { DecorativeOrnamentComponent } from '../../shared/components/decorative-ornament/decorative-ornament.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    TextWithCollageComponent,
    TwoCardRowComponent,
    CollageBannerComponent,
    NumberedDarkBandComponent,
    IconListWithImageComponent,
    CtaBannerComponent,
    DecorativeOrnamentComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

  // Mission & Vision Cards for TwoCardRowComponent
  missionCard: VisionMissionCard = {
    icon: '🎯',
    kickerKey: 'mission.kicker',
    titleKey: 'mission.title',
    bodyKey: 'mission.body',
    route: '/about'
  };

  visionCard: VisionMissionCard = {
    icon: '🔭',
    kickerKey: 'vision.kicker',
    titleKey: 'vision.title',
    bodyKey: 'vision.body',
    route: '/about'
  };

  // 3 Expertise Areas for NumberedDarkBandComponent
  expertiseItems: NumberedDarkCardItem[] = [
    {
      number: '01',
      icon: '📦',
      titleKey: 'expertise.general.title',
      bodyKey: 'expertise.general.body',
      route: '/products'
    },
    {
      number: '02',
      icon: '💻',
      titleKey: 'expertise.it.title',
      bodyKey: 'expertise.it.body',
      route: '/products'
    },
    {
      number: '03',
      icon: '🎯',
      titleKey: 'expertise.specialized.title',
      bodyKey: 'expertise.specialized.body',
      route: '/products'
    }
  ];

  // Condensed Why-Choose-Us (Top 3 differentiators)
  whyUsCondensed: IconListItem[] = [
    { icon: '💰', titleKey: 'whyus.badge1', bodyKey: 'goals.goal2' },
    { icon: '⚡', titleKey: 'whyus.badge2', bodyKey: 'values.speed.body' },
    { icon: '🤝', titleKey: 'whyus.badge3', bodyKey: 'values.reliability.body' }
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('home.pageMeta.title', 'home.pageMeta.description');
  }
}
