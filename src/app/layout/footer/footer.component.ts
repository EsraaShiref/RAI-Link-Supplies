import { Component, inject } from '@angular/core';
import { LucideAngularModule, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-angular';

import { OFFICE_MAP_URL } from '../../core/content';
import { TranslationService } from '../../core/services';
import { BrandLogoComponent } from '../../shared/components';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, BrandLogoComponent],
  template: `
    <footer class="bg-footer-bg text-footer-text border-t border-white/10">
      <div class="shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:py-14">
        
        <!-- Brand Section -->
        <div class="flex flex-col items-start sm:col-span-2 lg:col-span-1">
          <!-- Logo with native width to prevent huge white capsule -->
          <app-brand-logo variant="onDark" [width]="160" />
          
          <p class="mt-4 max-w-sm text-sm leading-relaxed opacity-85">
            {{ t('brand.tagline') }}
          </p>
          <span class="bg-brand-gradient mt-5 block h-[3px] w-16 rounded-full" aria-hidden="true"></span>
        </div>

        <!-- Contact Section -->
        <div>
          <h2 class="text-footer-heading text-xs font-bold tracking-wider uppercase">
            {{ t('footer.getInTouch') }}
          </h2>
          <ul class="mt-4 flex flex-col gap-3.5">
            <li class="flex items-start gap-3">
              <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-orange-400">
                <lucide-icon [img]="PhoneIcon" [size]="16" aria-hidden="true" />
              </div>
              <div>
                <span class="block text-[11px] font-medium uppercase opacity-70">
                  {{ t('contact.phoneLabel') }}
                </span>
                <a
                  [href]="phoneHref()"
                  dir="ltr"
                  class="force-ltr hover:text-orange-400 text-sm font-semibold transition-colors"
                >
                  {{ t('contact.phone') }}
                </a>
              </div>
            </li>

            <li class="flex items-start gap-3">
              <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-orange-400">
                <lucide-icon [img]="MailIcon" [size]="16" aria-hidden="true" />
              </div>
              <div>
                <span class="block text-[11px] font-medium uppercase opacity-70">
                  {{ t('contact.emailLabel') }}
                </span>
                <a
                  [href]="'mailto:' + t('contact.email')"
                  dir="ltr"
                  class="force-ltr hover:text-orange-400 text-sm font-semibold break-all transition-colors"
                >
                  {{ t('contact.email') }}
                </a>
              </div>
            </li>

            <li class="flex items-start gap-3">
              <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-orange-400">
                <lucide-icon [img]="MapPinIcon" [size]="16" aria-hidden="true" />
              </div>
              <div>
                <span class="block text-[11px] font-medium uppercase opacity-70">
                  {{ t('contact.addressLabel') }}
                </span>
                <a
                  [href]="mapUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-orange-400 text-sm leading-relaxed transition-colors inline-flex items-center gap-1"
                >
                  {{ t('contact.address') }}
                  <lucide-icon [img]="ArrowIcon" [size]="12" class="opacity-70" />
                </a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Closing CTA Section -->
        <div class="flex flex-col items-start justify-between">
          <div>
            <h2 class="text-footer-heading text-xs font-bold tracking-wider uppercase">
              {{ t('contact.eyebrow') }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed opacity-85">
              {{ t('contact.cta') }}
            </p>
          </div>

          <a
            href="/contact"
            class="bg-cta text-cta-fg mt-5 inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold shadow-md transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            {{ t('contact.form.title') }}
          </a>
        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="border-footer-border border-t bg-black/10 py-4">
        <div class="shell flex flex-col gap-2 text-center text-xs opacity-80 sm:flex-row sm:justify-between sm:text-start">
          <p>
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
  protected readonly ArrowIcon = ArrowUpRight;

  protected readonly phoneHref = () => `tel:${this.t('contact.phone').replace(/\s+/g, '')}`;
}