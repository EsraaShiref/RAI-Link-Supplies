import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

import { ScrollStateService } from '../../core/services/scroll-state.service';

/**
 * Place once at the very top of the document. Reports its own visibility to
 * {@link ScrollStateService} so the header can switch from transparent to solid
 * without a scroll listener.
 *
 * The sentinel is kept at the document top and we also update from the actual
 * scroll position so the transparent-header state stays in sync on route changes
 * and on browsers where the observer misses the first threshold change.
 */
@Directive({
  selector: '[appScrollSentinel]',
})
export class ScrollSentinelDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollState = inject(ScrollStateService);

  constructor() {
    afterNextRender(() => {
      this.scrollState.updateFromScroll();

      const handleScroll = (): void => {
        this.scrollState.updateFromScroll();
      };

      if (typeof window === 'undefined') {
        return;
      }

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);

      if (typeof IntersectionObserver === 'undefined') {
        this.destroyRef.onDestroy(() => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleScroll);
        });
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => this.scrollState.setAtTop(entry.isIntersecting),
        { threshold: 0, rootMargin: '0px 0px -8px 0px' },
      );

      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      });
    });
  }
}
