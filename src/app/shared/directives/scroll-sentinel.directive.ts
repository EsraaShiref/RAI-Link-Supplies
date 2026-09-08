import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

import { ScrollStateService } from '../../core/services/scroll-state.service';

/**
 * Place once at the very top of the document. Reports its own visibility to
 * {@link ScrollStateService} so the header can switch from transparent to solid
 * without a scroll listener.
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
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => this.scrollState.setAtTop(entry.isIntersecting),
        { threshold: 0 },
      );

      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
