import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ProductCategory } from '../../core/models/product-category.model';
import { ExpertiseArea } from '../../core/models/expertise-area.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TranslatePipe,
    SectionTitleComponent,
    CardComponent,
    CtaBannerComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  private seoService = inject(SeoService);

  expertiseAreas: ExpertiseArea[] = [
    { id: 'general', titleKey: 'expertise.general.title', bodyKey: 'expertise.general.body', icon: '📦' },
    { id: 'it', titleKey: 'expertise.it.title', bodyKey: 'expertise.it.body', icon: '💻' },
    { id: 'specialized', titleKey: 'expertise.specialized.title', bodyKey: 'expertise.specialized.body', icon: '🎯' }
  ];

  products: ProductCategory[] = [
    { id: 'office', titleKey: 'products.office.title', bodyKey: 'products.office.body', icon: '📋' },
    { id: 'furniture', titleKey: 'products.furniture.title', bodyKey: 'products.furniture.body', icon: '🪑' },
    { id: 'it', titleKey: 'products.it.title', bodyKey: 'products.it.body', icon: '💻' },
    { id: 'electrical', titleKey: 'products.electrical.title', bodyKey: 'products.electrical.body', icon: '⚡' },
    { id: 'cleaning', titleKey: 'products.cleaning.title', bodyKey: 'products.cleaning.body', icon: '🧹' },
    { id: 'safety', titleKey: 'products.safety.title', bodyKey: 'products.safety.body', icon: '🛡️' },
    { id: 'general', titleKey: 'products.general.title', bodyKey: 'products.general.body', icon: '📦' }
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('products.pageMeta.title', 'products.pageMeta.description');
  }
}
