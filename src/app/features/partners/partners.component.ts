import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHeaderBannerComponent } from '../../shared/components/page-header-banner/page-header-banner.component';
import { TextWithCollageComponent } from '../../shared/components/text-with-collage/text-with-collage.component';
import { CardGridComponent, GridCardItem } from '../../shared/components/card-grid/card-grid.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    PageHeaderBannerComponent,
    TextWithCollageComponent,
    CardGridComponent,
    CtaBannerComponent
  ],
  templateUrl: './partners.component.html'
})
export class PartnersComponent implements OnInit {
  private seoService = inject(SeoService);

  // Audience highlights
  partnerBullets = [
    'audience.government.title',
    'audience.corporate.title',
    'audience.education.title'
  ];

  // 3 Target Audience segments for 3-column CardGridComponent
  audiencesList: GridCardItem[] = [
    { icon: '🏛️', titleKey: 'audience.government.title', bodyKey: 'audience.government.body', route: '/contact' },
    { icon: '🏢', titleKey: 'audience.corporate.title', bodyKey: 'audience.corporate.body', route: '/contact' },
    { icon: '🏥', titleKey: 'audience.education.title', bodyKey: 'audience.education.body', route: '/contact' }
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('partners.pageMeta.title', 'partners.pageMeta.description');
  }
}
