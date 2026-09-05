import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ProductCategory } from '../../core/models/product-category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    SectionTitleComponent,
    CardComponent,
    CtaBannerComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

  products: ProductCategory[] = [
    { id: 'office', titleKey: 'products.office.title', bodyKey: 'products.office.body', icon: '📋' },
    { id: 'furniture', titleKey: 'products.furniture.title', bodyKey: 'products.furniture.body', icon: '🪑' },
    { id: 'it', titleKey: 'products.it.title', bodyKey: 'products.it.body', icon: '💻' },
    { id: 'electrical', titleKey: 'products.electrical.title', bodyKey: 'products.electrical.body', icon: '⚡' }
  ];

  whyUsBadges = [
    'whyus.badge1',
    'whyus.badge2',
    'whyus.badge3',
    'whyus.badge4',
    'whyus.badge5'
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('home.pageMeta.title', 'home.pageMeta.description');
  }
}
