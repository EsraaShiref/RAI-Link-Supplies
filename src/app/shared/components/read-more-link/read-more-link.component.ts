import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-read-more-link',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    @if (route()) {
      <a
        [routerLink]="route()"
        class="group inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors duration-200"
      >
        <span>{{ labelKey() | translate }}</span>
        <span
          class="inline-block transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 icon-flip-rtl"
          aria-hidden="true"
        >
          <!-- Arrow Right SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </a>
    } @else if (externalHref()) {
      <a
        [href]="externalHref()"
        target="_blank"
        rel="noopener noreferrer"
        class="group inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors duration-200"
      >
        <span>{{ labelKey() | translate }}</span>
        <span
          class="inline-block transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 icon-flip-rtl"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </a>
    } @else {
      <span class="group inline-flex items-center gap-2 text-sm font-bold text-brand-orange">
        <span>{{ labelKey() | translate }}</span>
        <span class="inline-block icon-flip-rtl" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </span>
    }
  `,
})
export class ReadMoreLinkComponent {
  readonly labelKey = input<string>('COMMON.LEARN_MORE');
  readonly route = input<string | undefined>(undefined);
  readonly externalHref = input<string | undefined>(undefined);
}
