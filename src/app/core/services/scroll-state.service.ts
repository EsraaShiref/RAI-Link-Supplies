import { computed, Injectable, signal } from '@angular/core';

/**
 * Tracks whether the page has scrolled away from the very top. Fed by
 * {@link ScrollSentinelDirective}, which uses a single IntersectionObserver on a
 * zero-impact element at the document top — no scroll-event polling.
 */
@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private readonly atTop = signal(true);

  readonly isScrolled = computed(() => !this.atTop());

  setAtTop(atTop: boolean): void {
    this.atTop.set(atTop);
  }

  updateFromScroll(): void {
    this.setAtTop(typeof window === 'undefined' || window.scrollY <= 8);
  }
}
