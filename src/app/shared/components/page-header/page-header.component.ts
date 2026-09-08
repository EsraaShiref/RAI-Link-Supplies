import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

import { TranslationService } from '../../../core/services';

/** Shared page opener: breadcrumb, eyebrow, H1 and an optional lead paragraph. */
@Component({
  selector: 'app-page-header',
  imports: [RouterLink, LucideAngularModule],
  host: { class: 'block' },
  template: `
    <section
      class="bg-navy dot-grid relative overflow-hidden text-white"
      [attr.aria-labelledby]="headingId"
    >
      <div class="shell relative z-10 py-12 sm:py-16 lg:py-20">
        <nav [attr.aria-label]="t('a11y.breadcrumb')">
          <ol class="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
            <li>
              <a
                routerLink="/"
                class="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {{ t('nav.home') }}
              </a>
            </li>
            <li class="flex items-center gap-1.5">
              <lucide-icon
                [img]="ChevronRightIcon"
                [size]="14"
                class="rtl-flip text-white/45"
                aria-hidden="true"
              />
              <span class="font-semibold text-white" aria-current="page">
                {{ t(titleKey()) }}
              </span>
            </li>
          </ol>
        </nav>

        @if (eyebrowKey()) {
          <p class="mt-8 text-xs font-bold tracking-[0.18em] text-white/70 uppercase sm:text-sm">
            {{ t(eyebrowKey()) }}
          </p>
        }

        <h1
          [id]="headingId"
          class="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]"
        >
          {{ t(headlineKey() || titleKey()) }}
        </h1>

        @if (leadKey()) {
          <p class="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            {{ t(leadKey()) }}
          </p>
        }

        <span class="bg-brand-gradient mt-8 block h-[3px] w-24 rounded-full" aria-hidden="true"></span>
      </div>
    </section>
  `,
})
export class PageHeaderComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;
  protected readonly ChevronRightIcon = ChevronRight;
  protected readonly headingId = 'page-heading';

  /** Key under `nav.*` — drives both the breadcrumb leaf and the default H1. */
  readonly titleKey = input.required<string>();
  /** Optional richer H1 key when the page has its own headline. */
  readonly headlineKey = input('');
  readonly eyebrowKey = input('');
  readonly leadKey = input('');
}
