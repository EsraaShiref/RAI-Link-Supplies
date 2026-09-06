import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(28px)' }),
          stagger(150, [
            animate(
              '600ms cubic-bezier(0.4, 0, 0.2, 1)',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
