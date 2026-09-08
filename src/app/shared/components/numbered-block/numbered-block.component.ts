import { Component, input } from '@angular/core';

import type { NumberedItem } from '../../../core/models';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

/**
 * The "01 / 02 / 03" layout used by Our Goals and Who We Serve.
 *
 * Items arrive already translated — callers read them straight out of the
 * dictionary — so no copy is duplicated here. The oversized numerals are
 * decorative (the ordered list already conveys sequence to assistive tech), and
 * each is followed by a gradient rule that reads as a connector rail across
 * columns on desktop and as a section rule when stacked.
 */
@Component({
  selector: 'app-numbered-block',
  imports: [RevealOnScrollDirective],
  host: { class: 'block' },
  template: `
    <ol class="grid gap-10 md:gap-8" [class]="columnClass()">
      @for (item of items(); track item.number; let index = $index) {
        <li appReveal [revealDelay]="index * 80">
          <div class="flex items-center gap-4">
            <span class="text-orange/25 text-4xl leading-none font-extrabold sm:text-5xl" aria-hidden="true">
              {{ item.number }}
            </span>
            <span class="bg-brand-gradient h-px flex-1 rounded-full" aria-hidden="true"></span>
          </div>

          @if (item.title) {
            <h3 class="text-text mt-5 text-lg font-bold sm:text-xl">{{ item.title }}</h3>
          }

          <p class="text-text-muted mt-3 text-sm leading-relaxed sm:text-[0.9375rem]">
            {{ item.body }}
          </p>
        </li>
      }
    </ol>
  `,
})
export class NumberedBlockComponent {
  readonly items = input.required<readonly NumberedItem[]>();

  /** Tailwind grid-column classes; defaults to a three-up desktop layout. */
  readonly columnClass = input('md:grid-cols-3');
}
