import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    TranslatePipe,
    SectionTitleComponent,
    CardComponent,
    CtaBannerComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  private seoService = inject(SeoService);

  values = [
    { titleKey: 'values.reliability.title', bodyKey: 'values.reliability.body', icon: '🤝' },
    { titleKey: 'values.quality.title', bodyKey: 'values.quality.body', icon: '✨' },
    { titleKey: 'values.speed.title', bodyKey: 'values.speed.body', icon: '⚡' },
    { titleKey: 'values.flexibility.title', bodyKey: 'values.flexibility.body', icon: '🔄' }
  ];

  goals = [
    'goals.goal1',
    'goals.goal2',
    'goals.goal3'
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('about.pageMeta.title', 'about.pageMeta.description');
  }
}
