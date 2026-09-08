import type { Routes } from '@angular/router';

import type { RouteSeoData } from './core/models';

/**
 * Every feature page is lazily loaded with `loadComponent`, so the initial
 * bundle carries only the shell. `data.seo` holds translation keys rather than
 * literal copy, so titles and descriptions follow the active language.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: {
      seo: {
        titleKey: 'nav.home',
        descriptionKeys: ['hero.subheadline'],
        rootTitle: true,
      } satisfies RouteSeoData,
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    data: {
      seo: {
        titleKey: 'nav.about',
        descriptionKeys: ['about.body'],
      } satisfies RouteSeoData,
    },
  },
  {
    path: 'services-scope',
    loadComponent: () =>
      import('./features/services-scope/services-scope.component').then(
        (m) => m.ServicesScopeComponent,
      ),
    data: {
      seo: {
        titleKey: 'nav.servicesScope',
        descriptionKeys: ['projectScope.body'],
      } satisfies RouteSeoData,
    },
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then((m) => m.ProductsComponent),
    data: {
      seo: {
        titleKey: 'nav.products',
        descriptionKeys: [
          'expertise.items.generalProcurement.body',
          'expertise.items.itElectronics.body',
        ],
      } satisfies RouteSeoData,
    },
  },
  {
    path: 'partners',
    loadComponent: () =>
      import('./features/partners/partners.component').then((m) => m.PartnersComponent),
    data: {
      seo: {
        titleKey: 'nav.partners',
        descriptionKeys: ['partners.points.0', 'partners.points.1'],
      } satisfies RouteSeoData,
    },
  },
  {
    path: 'target-audience',
    loadComponent: () =>
      import('./features/target-audience/target-audience.component').then(
        (m) => m.TargetAudienceComponent,
      ),
    data: {
      seo: {
        titleKey: 'nav.targetAudience',
        descriptionKeys: [
          'targetAudience.items.government.body',
          'targetAudience.items.corporate.body',
        ],
      } satisfies RouteSeoData,
    },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      seo: {
        titleKey: 'nav.contact',
        descriptionKeys: ['contact.cta', 'contact.address'],
      } satisfies RouteSeoData,
    },
  },
  { path: '**', redirectTo: '' },
];
