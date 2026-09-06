import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHeaderBannerComponent } from '../../shared/components/page-header-banner/page-header-banner.component';
import { TextWithCollageComponent } from '../../shared/components/text-with-collage/text-with-collage.component';
import { NumberedDarkBandComponent, NumberedDarkCardItem } from '../../shared/components/numbered-dark-band/numbered-dark-band.component';
import { CardGridComponent, GridCardItem } from '../../shared/components/card-grid/card-grid.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PageHeaderBannerComponent,
    TextWithCollageComponent,
    NumberedDarkBandComponent,
    CardGridComponent
  ],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  private seoService = inject(SeoService);

  // Scope feature highlights
  scopeBullets = [
    'products.office.title',
    'products.it.title',
    'products.electrical.title',
    'products.safety.title'
  ];

  // 3 Expertise Areas for NumberedDarkBandComponent (consistent with Home)
  expertiseItems: NumberedDarkCardItem[] = [
    {
      number: '01',
      icon: '📦',
      titleKey: 'expertise.general.title',
      bodyKey: 'expertise.general.body'
    },
    {
      number: '02',
      icon: '💻',
      titleKey: 'expertise.it.title',
      bodyKey: 'expertise.it.body'
    },
    {
      number: '03',
      icon: '🎯',
      titleKey: 'expertise.specialized.title',
      bodyKey: 'expertise.specialized.body'
    }
  ];

  // 7 Product Categories for CardGridComponent
  productCategories: GridCardItem[] = [
    { icon: '📋', titleKey: 'products.office.title', bodyKey: 'products.office.body' },
    { icon: '🪑', titleKey: 'products.furniture.title', bodyKey: 'products.furniture.body' },
    { icon: '💻', titleKey: 'products.it.title', bodyKey: 'products.it.body' },
    { icon: '⚡', titleKey: 'products.electrical.title', bodyKey: 'products.electrical.body' },
    { icon: '🧹', titleKey: 'products.cleaning.title', bodyKey: 'products.cleaning.body' },
    { icon: '🛡️', titleKey: 'products.safety.title', bodyKey: 'products.safety.body' },
    { icon: '📦', titleKey: 'products.general.title', bodyKey: 'products.general.body' }
  ];

  ngOnInit(): void {
    this.seoService.updateMeta('products.pageMeta.title', 'products.pageMeta.description');
  }
}
