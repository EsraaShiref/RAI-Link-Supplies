import { Component, computed, inject, signal } from '@angular/core';
import { LucideAngularModule, Search, X } from 'lucide-angular';

import { PRODUCT_CATEGORIES } from '../../core/content';
import { TranslationService } from '../../core/services';
import { CtaBannerComponent } from '../../layout';
import {
  CardSkeletonComponent,
  IconCardComponent,
  PageHeaderComponent,
} from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';

@Component({
  selector: 'app-products',
  imports: [
    LucideAngularModule,
    CtaBannerComponent,
    CardSkeletonComponent,
    IconCardComponent,
    PageHeaderComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-page-header
      titleKey="nav.products"
      headlineKey="products.title"
      eyebrowKey="products.eyebrow"
    />

    <section class="bg-bg" aria-labelledby="products-heading">
      <div class="shell py-16 sm:py-20">
        <h2 id="products-heading" class="sr-only">{{ t('products.title') }}</h2>

        <!-- Client-side filter over the translated category titles -->
        <div class="mx-auto max-w-md">
          <label [for]="searchId" class="sr-only">{{ t('a11y.searchProducts') }}</label>
          <div class="relative">
            <lucide-icon
              [img]="SearchIcon"
              [size]="17"
              class="text-text-muted pointer-events-none absolute inset-y-0 start-4 my-auto"
              aria-hidden="true"
            />
            <input
              [id]="searchId"
              type="search"
              autocomplete="off"
              [value]="query()"
              (input)="onQuery($event)"
              [placeholder]="t('a11y.searchProducts')"
              class="border-border bg-surface text-text placeholder:text-text-muted focus:border-orange w-full rounded-full border py-3 ps-12 pe-12 text-sm transition-colors outline-none"
            />
            @if (query()) {
              <button
                type="button"
                class="text-text-muted hover:text-orange-ink absolute inset-y-0 end-3 my-auto inline-flex size-8 items-center justify-center rounded-full transition-colors"
                [attr.aria-label]="t('a11y.clearSearch')"
                (click)="clearQuery()"
              >
                <lucide-icon [img]="CloseIcon" [size]="16" aria-hidden="true" />
              </button>
            }
          </div>
        </div>

        @defer (on viewport) {
          @if (filtered().length > 0) {
            <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              @for (category of filtered(); track category.id; let index = $index) {
                <li appReveal [revealDelay]="index * 55">
                  <app-icon-card
                    [icon]="category.icon"
                    [titleKey]="category.titleKey"
                    [bodyKey]="category.bodyKey"
                  />
                </li>
              }
            </ul>
          } @else {
            <p class="text-text-muted mt-12 text-center text-sm" role="status">
              {{ t('a11y.noResults') }}
            </p>
          }
        } @placeholder {
          <app-card-skeleton
            class="mt-12"
            [count]="4"
            columnClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        }
      </div>
    </section>

    <app-cta-banner
      titleKey="contact.title"
      bodyKey="contact.cta"
      ctaKey="contact.form.title"
      routerLink="/contact"
    />
  `,
})
export class ProductsComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly SearchIcon = Search;
  protected readonly CloseIcon = X;
  protected readonly searchId = 'product-search';

  protected readonly query = signal('');

  protected readonly filtered = computed(() => {
    const needle = this.query().trim().toLocaleLowerCase();
    if (!needle) {
      return PRODUCT_CATEGORIES;
    }

    return PRODUCT_CATEGORIES.filter((category) => {
      const haystack = `${this.t(category.titleKey)} ${this.t(category.bodyKey)}`;
      return haystack.toLocaleLowerCase().includes(needle);
    });
  });

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected clearQuery(): void {
    this.query.set('');
  }
}
