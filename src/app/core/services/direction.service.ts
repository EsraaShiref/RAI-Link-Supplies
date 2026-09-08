import { computed, inject, Injectable } from '@angular/core';

import type { TextDirection } from '../models';
import { TranslationService } from './translation.service';

/**
 * Writing direction, derived purely from the active language.
 *
 * Layout mirroring is handled by CSS logical properties and Tailwind's
 * RTL-aware utilities (`ms-*`, `pe-*`, `start-*`, `end-*`), so this service
 * exists only for the handful of cases that genuinely need the value in TS:
 * the `dir` attribute, directional icon flipping and slide-in offsets.
 */
@Injectable({ providedIn: 'root' })
export class DirectionService {
  private readonly translation = inject(TranslationService);

  readonly direction = computed<TextDirection>(() =>
    this.translation.currentLang() === 'ar' ? 'rtl' : 'ltr',
  );

  readonly isRtl = computed(() => this.direction() === 'rtl');

  /** `+1` in LTR, `-1` in RTL — for transforms that must follow the inline axis. */
  readonly inlineSign = computed(() => (this.isRtl() ? -1 : 1));
}
