import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReadMoreLinkComponent } from '../read-more-link/read-more-link.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

export interface CardItem {
  titleKey: string;
  bodyKey: string;
  route?: string;
  badgeKey?: string;
}

@Component({
  selector: 'app-two-card-row',
  standalone: true,
  imports: [TranslatePipe, ReadMoreLinkComponent, RevealOnScrollDirective],
  templateUrl: './two-card-row.component.html',
  styleUrl: './two-card-row.component.css',
})
export class TwoCardRowComponent {
  readonly card1 = input.required<CardItem>();
  readonly card2 = input.required<CardItem>();
  readonly bgLight = input<boolean>(true);
}
