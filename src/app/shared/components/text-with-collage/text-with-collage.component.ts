import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-text-with-collage',
  standalone: true,
  imports: [RouterLink, TranslatePipe, RevealOnScrollDirective],
  templateUrl: './text-with-collage.component.html',
  styleUrl: './text-with-collage.component.css',
})
export class TextWithCollageComponent {
  readonly kickerKey = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly bodyKey = input.required<string>();
  readonly readMoreRoute = input<string | undefined>(undefined);
  readonly readMoreLabelKey = input<string>('COMMON.LEARN_MORE');
  readonly reverse = input<boolean>(false);
}
