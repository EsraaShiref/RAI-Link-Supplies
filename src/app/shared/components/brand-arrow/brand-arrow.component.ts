import { Component } from '@angular/core';

/**
 * Decorative hero graphic: the logo's forward arrow motif enlarged into a set of
 * gradient speed bars with a slow looping sweep (spec 2 motion: 4–6s, no
 * elastic easing). Purely presentational, so it is hidden from assistive tech.
 */
@Component({
  selector: 'app-brand-arrow',
  host: { class: 'block', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 560 320" class="h-auto w-full" focusable="false">
      <defs>
        <linearGradient id="rai-arrow-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#16295E" stop-opacity="0.25" />
          <stop offset="45%" stop-color="#3A4E8F" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#FF8A3D" />
        </linearGradient>
        <linearGradient id="rai-arrow-node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#FF8A3D" />
        </linearGradient>
      </defs>

      <!-- Supplier-network nodes feeding the arrow -->
      <g stroke="url(#rai-arrow-node)" stroke-width="1.5" fill="none" opacity="0.55">
        <path d="M40 96 L112 160 L40 224" />
        <path d="M40 160 L112 160" />
      </g>
      <g fill="url(#rai-arrow-node)">
        <circle cx="40" cy="96" r="6" />
        <circle cx="40" cy="160" r="6" />
        <circle cx="40" cy="224" r="6" />
      </g>

      <!-- Speed bars -->
      <g fill="url(#rai-arrow-gradient)">
        <rect
          class="arrow-sweep"
          style="animation-delay: 0ms"
          x="112"
          y="106"
          width="286"
          height="14"
          rx="7"
          opacity="0.5"
        />
        <rect
          class="arrow-sweep"
          style="animation-delay: 320ms"
          x="112"
          y="146"
          width="368"
          height="28"
          rx="14"
        />
        <rect
          class="arrow-sweep"
          style="animation-delay: 640ms"
          x="112"
          y="200"
          width="240"
          height="14"
          rx="7"
          opacity="0.5"
        />
      </g>

      <!-- Arrowhead -->
      <path
        class="arrow-sweep"
        style="animation-delay: 320ms"
        d="M452 116 L536 160 L452 204 L452 174 L494 160 L452 146 Z"
        fill="url(#rai-arrow-gradient)"
      />
    </svg>
  `,
})
export class BrandArrowComponent {}
