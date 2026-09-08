import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronDown, ChevronRight, LucideAngularModule } from 'lucide-angular';

import { TranslationService } from '../../../core/services';

/** Shared page opener: breadcrumb, eyebrow, H1 and an optional lead paragraph. */
@Component({
  selector: 'app-page-header',
  imports: [RouterLink, LucideAngularModule],
  host: { class: 'block' },
  styleUrls: ['./page-header.component.css'],
  template: `
    <section
      class="page-hero"
      [attr.aria-labelledby]="headingId"
    >
      <div class="page-hero__inner shell">
        @if (eyebrowKey()) {
          <p class="hero-badge">
            <span class="hero-badge__dot" aria-hidden="true"></span>
            {{ t(eyebrowKey()) }}
          </p>
        }

        <h1 [id]="headingId" class="hero-title">
          {{ t(headlineKey() || titleKey()) }}
        </h1>

        @if (leadKey()) {
          <p class="hero-subtitle">{{ t(leadKey()) }}</p>
        }

        <div class="hero-divider" aria-hidden="true">
          <span></span>
          <i></i>
          <span></span>
        </div>

        <nav class="hero-breadcrumb" [attr.aria-label]="t('a11y.breadcrumb')">
          <ol>
            <li>
              <a routerLink="/">{{ t('nav.home') }}</a>
            </li>
            <li>
              <lucide-icon
                [img]="ChevronRightIcon"
                [size]="14"
                class="rtl-flip"
                aria-hidden="true"
              />
              <span aria-current="page">{{ t(titleKey()) }}</span>
            </li>
          </ol>
        </nav>

        <span class="hero-scroll-indicator" aria-hidden="true">
          <lucide-icon [img]="ChevronDownIcon" [size]="16" />
        </span>
      </div>
    </section>
  `,
})
export class PageHeaderComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;
  protected readonly ChevronRightIcon = ChevronRight;
  protected readonly ChevronDownIcon = ChevronDown;
  protected readonly headingId = 'page-heading';

  /** Key under `nav.*` — drives both the breadcrumb leaf and the default H1. */
  readonly titleKey = input.required<string>();
  /** Optional richer H1 key when the page has its own headline. */
  readonly headlineKey = input('');
  readonly eyebrowKey = input('');
  readonly leadKey = input('');
}
