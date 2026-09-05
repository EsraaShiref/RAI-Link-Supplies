import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    TranslatePipe,
    SectionTitleComponent,
    CardComponent,
    CtaBannerComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './partners.component.html'
})
export class PartnersComponent implements OnInit {
  private seoService = inject(SeoService);

  audiences = [
    { titleKey: 'audience.government.title', bodyKey: 'audience.government.body', icon: '🏛️' },
    { titleKey: 'audience.corporate.title', bodyKey: 'audience.corporate.body', icon: '🏢' },
    { titleKey: 'audience.education.title', bodyKey: 'audience.education.body', icon: '🏥' }
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('partners.pageMeta.title', 'partners.pageMeta.description');
  }
}
