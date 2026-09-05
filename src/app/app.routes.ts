import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), data: { animation: 'home' } },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent), data: { animation: 'about' } },
  { path: 'approach', loadComponent: () => import('./features/approach/approach.component').then(m => m.ApproachComponent), data: { animation: 'approach' } },
  { path: 'products', loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent), data: { animation: 'products' } },
  { path: 'partners', loadComponent: () => import('./features/partners/partners.component').then(m => m.PartnersComponent), data: { animation: 'partners' } },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent), data: { animation: 'contact' } },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent), data: { animation: 'notfound' } },
];
