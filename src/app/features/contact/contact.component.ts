import { Component, inject } from '@angular/core';
import { LucideAngularModule, Mail, MapPin, Phone } from 'lucide-angular';

import { OFFICE_MAP_URL } from '../../core/content';
import { TranslationService } from '../../core/services';
import { PageHeaderComponent } from '../../shared/components';
import { RevealOnScrollDirective } from '../../shared/directives';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';

@Component({
  selector: 'app-contact',
  imports: [
    LucideAngularModule,
    PageHeaderComponent,
    QuotationFormComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <app-page-header
      titleKey="nav.contact"
      headlineKey="contact.title"
      eyebrowKey="contact.eyebrow"
      leadKey="contact.cta"
    />

    <section class="bg-bg" aria-labelledby="contact-heading">
      <div class="shell py-16 sm:py-20">
        <h2 id="contact-heading" class="sr-only">{{ t('contact.title') }}</h2>

        <div class="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <!-- Form on the logical start side -->
          <app-quotation-form appReveal="start" />

          <!-- Contact details on the logical end side -->
          <div appReveal="end" class="flex flex-col gap-6">
            <div class="border-border bg-bg-subtle rounded-xl border p-6 sm:p-8">
              <h3 class="text-text text-lg font-bold sm:text-xl">{{ t('contact.eyebrow') }}</h3>

              <ul class="mt-6 flex flex-col gap-6">
                <li class="flex items-start gap-4">
                  <span
                    class="bg-brand-gradient inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
                  >
                    <lucide-icon [img]="PhoneIcon" [size]="19" aria-hidden="true" />
                  </span>
                  <div class="min-w-0">
                    <span class="text-text-muted block text-xs font-bold tracking-wide uppercase">
                      {{ t('contact.phoneLabel') }}
                    </span>
                    <a
                      [href]="phoneHref()"
                      dir="ltr"
                      class="force-ltr text-text hover:text-orange-ink mt-1 block text-sm font-semibold transition-colors sm:text-base"
                    >
                      {{ t('contact.phone') }}
                    </a>
                  </div>
                </li>

                <li class="flex items-start gap-4">
                  <span
                    class="bg-brand-gradient inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
                  >
                    <lucide-icon [img]="MailIcon" [size]="19" aria-hidden="true" />
                  </span>
                  <div class="min-w-0">
                    <span class="text-text-muted block text-xs font-bold tracking-wide uppercase">
                      {{ t('contact.emailLabel') }}
                    </span>
                    <a
                      [href]="'mailto:' + t('contact.email')"
                      dir="ltr"
                      class="force-ltr text-text hover:text-orange-ink mt-1 block text-sm font-semibold break-all transition-colors sm:text-base"
                    >
                      {{ t('contact.email') }}
                    </a>
                  </div>
                </li>

                <li class="flex items-start gap-4">
                  <span
                    class="bg-brand-gradient inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
                  >
                    <lucide-icon [img]="MapPinIcon" [size]="19" aria-hidden="true" />
                  </span>
                  <div class="min-w-0">
                    <span class="text-text-muted block text-xs font-bold tracking-wide uppercase">
                      {{ t('contact.addressLabel') }}
                    </span>
                    <p class="text-text mt-1 text-sm leading-relaxed sm:text-base">
                      {{ t('contact.address') }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Static map: an <iframe> embed would add a third-party request and
                 a cookie banner obligation, so this links out instead. -->
            <a
              [href]="mapUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group border-border bg-navy dot-grid hover:border-orange relative flex min-h-56 flex-1 items-center justify-center overflow-hidden rounded-xl border text-white transition-colors"
              [attr.aria-label]="t('a11y.openInMaps')"
            >
              <span class="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
                <span
                  class="bg-brand-gradient inline-flex size-14 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105"
                >
                  <lucide-icon [img]="MapPinIcon" [size]="24" aria-hidden="true" />
                </span>
                <span class="text-sm font-semibold">{{ t('a11y.mapPlaceholder') }}</span>
                <span class="text-xs text-white/70 underline underline-offset-4">
                  {{ t('a11y.openInMaps') }}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly mapUrl = OFFICE_MAP_URL;

  protected readonly PhoneIcon = Phone;
  protected readonly MailIcon = Mail;
  protected readonly MapPinIcon = MapPin;

  protected readonly phoneHref = () => `tel:${this.t('contact.phone').replace(/\s+/g, '')}`;
}
