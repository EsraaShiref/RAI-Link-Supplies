import { inject, Injectable } from '@angular/core';
import { TitleStrategy, type ActivatedRouteSnapshot, type RouterStateSnapshot } from '@angular/router';

import type { RouteSeoData } from '../models';
import { SeoService } from './seo.service';

/**
 * Bridges the router to {@link SeoService}. Runs after every navigation and
 * hands the deepest matched route's `data.seo` to the SEO effect, which owns
 * the actual `Title`/`Meta` writes so they can also react to language changes.
 */
@Injectable({ providedIn: 'root' })
export class BrandTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.seo.setRouteSeo(deepestSeo(snapshot.root));
  }
}

function deepestSeo(route: ActivatedRouteSnapshot): RouteSeoData | null {
  let current: ActivatedRouteSnapshot | undefined = route;
  let found: RouteSeoData | null = null;

  while (current) {
    const seo = current.data['seo'] as RouteSeoData | undefined;
    if (seo) {
      found = seo;
    }
    current = current.firstChild ?? undefined;
  }

  return found;
}
