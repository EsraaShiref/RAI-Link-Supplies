import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './card.component.html'
})
export class CardComponent {
  titleKey = input.required<string>();
  bodyKey = input.required<string>();
  icon = input.required<string>();
  accentColor = input<string>('orange');
}
