import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReadMoreLinkComponent } from '../read-more-link/read-more-link.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

export type ValueIconType = 'reliability' | 'quality' | 'speed' | 'flexibility';

export interface ValueCardItem {
  key: string;
  icon: ValueIconType;
  titleKey: string;
  bodyKey: string;
  route?: string;
}

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [TranslatePipe, ReadMoreLinkComponent, RevealOnScrollDirective],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.css',
})
export class CardGridComponent {
  readonly titleKey = input.required<string>();
  readonly items = input.required<ValueCardItem[]>();
  readonly defaultRoute = input<string>('/about');
}
