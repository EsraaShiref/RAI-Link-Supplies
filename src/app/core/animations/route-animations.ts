import { animate, query, style, transition, trigger } from '@angular/animations';

export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', style({ opacity: 0, transform: 'translateY(12px)' }), { optional: true }),
    query(':leave', [
      animate('150ms ease', style({ opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);
