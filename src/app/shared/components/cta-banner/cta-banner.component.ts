import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [TranslatePipe, RouterLink, RevealOnScrollDirective],
  templateUrl: './cta-banner.component.html'
})
export class CtaBannerComponent {
  messageKey = input.required<string>();
  buttonLabelKey = input.required<string>();
  route = input.required<string>();
}
