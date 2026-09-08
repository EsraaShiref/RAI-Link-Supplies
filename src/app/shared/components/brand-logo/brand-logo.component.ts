import { Component, computed, inject, input } from '@angular/core';

import { TranslationService } from '../../../core/services';

let instanceCounter = 0;

/**
 * The RAI Link Supplies wordmark: heavy navy "RAI", the forward gradient arrow
 * (navy → orange) growing out of the final stroke, and wide-tracked
 * "LINK SUPPLIES" beneath.
 *
 * Rendered as inline SVG rather than an <img> so it costs no extra request,
 * stays crisp at every size, and can recolour per theme. The wordmark uses the
 * document's own webfont, which inline SVG (unlike an external SVG file) can do.
 *
 * TODO(brand-asset): if the client supplies the master logo artwork, replace the
 * <svg> block below with
 *   <img src="assets/images/logo.png" [alt]="t('a11y.logoAlt')" width="…" height="…" />
 * and keep the `variant` input driving which file is used. Nothing outside this
 * component needs to change.
 */
@Component({
  selector: 'app-brand-logo',
  host: { class: 'block' },
  template: `
    <svg
      [attr.viewBox]="viewBox"
      [attr.width]="width()"
      [attr.height]="height()"
      role="img"
      [attr.aria-label]="t('a11y.logoAlt')"
      class="h-auto w-auto"
    >
      <defs>
        <linearGradient [attr.id]="gradientId" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" [attr.stop-color]="arrowStart()" />
          <stop offset="55%" stop-color="#B4482B" />
          <stop offset="100%" stop-color="#F7931E" />
        </linearGradient>
      </defs>

      <!-- Wordmark -->
      <text
        x="0"
        y="54"
        [attr.fill]="wordmarkFill()"
        font-size="56"
        font-weight="800"
        letter-spacing="-1"
        style="font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif"
      >
        RAI
      </text>

      <!-- Forward arrow: shaft emerges from the final stroke of the wordmark -->
      <g [attr.fill]="'url(#' + gradientId + ')'">
        <path d="M104 40 H272 L272 51 H104 Z" />
        <path d="M262 27 L306 45.5 L262 64 L262 52.5 L286 45.5 L262 38.5 Z" />
      </g>

      <!-- Descriptor -->
      <text
        x="2"
        y="82"
        [attr.fill]="descriptorFill()"
        font-size="16"
        font-weight="600"
        letter-spacing="6.2"
        style="font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif"
      >
        LINK SUPPLIES
      </text>
    </svg>
  `,
})
export class BrandLogoComponent {
  private readonly i18n = inject(TranslationService);
  protected readonly t = this.i18n.t;

  /** `onDark` inverts the navy elements so the mark reads on navy/footer bands. */
  readonly variant = input<'default' | 'onDark'>('default');
  readonly width = input(200);

  protected readonly viewBox = '0 0 312 96';
  protected readonly gradientId = `rai-logo-gradient-${instanceCounter++}`;

  protected readonly height = computed(() => Math.round((this.width() * 96) / 312));

  protected readonly wordmarkFill = computed(() =>
    this.variant() === 'onDark' ? '#FFFFFF' : '#0A1C44',
  );

  protected readonly descriptorFill = computed(() =>
    this.variant() === 'onDark' ? '#CBD5E1' : '#1E293B',
  );

  protected readonly arrowStart = computed(() =>
    this.variant() === 'onDark' ? '#FFFFFF' : '#0A1C44',
  );
}
