import { Component, inject } from '@angular/core';
import { LucideAngularModule, Mail, MapPin, Phone } from 'lucide-angular';

import { OFFICE_MAP_URL } from '../../core/content';
import { TranslationService } from '../../core/services';
import { BrandLogoComponent } from '../../shared/components';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, BrandLogoComponent],
  template: `
    <footer class="bg-footer-bg text-footer-text">
      <div class="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:py-16">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <app-brand-logo variant="onDark" [width]="176" />
          <p class="mt-5 max-w-xs text-sm leading-relaxed">{{ t('brand.tagline') }}</p>
          <span class="bg-brand-gradient mt-6 block h-[3px] w-20 rounded-full" aria-hidden="true"></span>
        </div>

        <!-- Contact -->
        <div>
          <h2 class="text-footer-heading text-sm font-bold tracking-wide uppercase">
            {{ t('footer.getInTouch') }}
          </h2>
          <ul class="mt-5 flex flex-col gap-4">
            <li class="flex items-start gap-3">
              <lucide-icon
                [img]="PhoneIcon"
                [size]="17"
                class="text-orange-light mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <span class="block text-xs tracking-wide uppercase opacity-70">
                  {{ t('contact.phoneLabel') }}
                </span>
                <a
                  [href]="phoneHref()"
                  dir="ltr"
                  class="force-ltr hover:text-orange-light text-sm font-semibold transition-colors"
                >
                  {{ t('contact.phone') }}
                </a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <lucide-icon
                [img]="MailIcon"
                [size]="17"
                class="text-orange-light mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <span class="block text-xs tracking-wide uppercase opacity-70">
                  {{ t('contact.emailLabel') }}
                </span>
                <a
                  [href]="'mailto:' + t('contact.email')"
                  dir="ltr"
                  class="force-ltr hover:text-orange-light text-sm font-semibold break-all transition-colors"
                >
                  {{ t('contact.email') }}
                </a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <lucide-icon
                [img]="MapPinIcon"
                [size]="17"
                class="text-orange-light mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <span class="block text-xs tracking-wide uppercase opacity-70">
                  {{ t('contact.addressLabel') }}
                </span>
                <a
                  [href]="mapUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-orange-light text-sm leading-relaxed transition-colors"
                >
                  {{ t('contact.address') }}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Closing call to action -->
        <div>
          <h2 class="text-footer-heading text-sm font-bold tracking-wide uppercase">
            {{ t('contact.eyebrow') }}
          </h2>
          <p class="mt-5 text-sm leading-relaxed">{{ t('contact.cta') }}</p>
          <a
            href="/contact"
            class="bg-cta text-cta-fg mt-5 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-bold transition-[filter] duration-200 hover:brightness-110"
          >
            {{ t('contact.form.title') }}
          </a>
        </div>
      </div>

      <div class="border-footer-border border-t">
        <div class="shell py-5">
          <p class="text-xs sm:text-sm">
            © <span class="force-ltr">{{ currentYear }}</span> {{ t('brand.name') }} —
            {{ t('footer.rightsReserved') }}
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  protected readonly mapUrl = OFFICE_MAP_URL;
  protected readonly currentYear = new Date().getFullYear();

  protected readonly PhoneIcon = Phone;
  protected readonly MailIcon = Mail;
  protected readonly MapPinIcon = MapPin;

  protected readonly phoneHref = () => `tel:${this.t('contact.phone').replace(/\s+/g, '')}`;
}
