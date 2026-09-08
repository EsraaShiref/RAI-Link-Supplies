import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

/** Direction the element travels from as it reveals. */
export type RevealFrom = 'up' | 'start' | 'end';

/**
 * Fade + slide reveal on scroll-into-view (spec 2: 150–250ms, ease-out, no
 * elastic easing). Uses a single IntersectionObserver per element and
 * disconnects after the first reveal, so there is no ongoing scroll cost.
 *
 * Honours `prefers-reduced-motion` through CSS, and elements are visible by
 * default for anyone without IntersectionObserver support.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal-start]': 'appReveal() === "start"',
    '[class.reveal-end]': 'appReveal() === "end"',
    '[class.reveal-in]': 'revealed()',
  },
})
export class RevealOnScrollDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly appReveal = input<RevealFrom, RevealFrom | ''>('up', {
    // Allows the bare attribute form `<div appReveal>` to mean "slide up".
    transform: (value) => value || 'up',
  });

  /** Stagger, in milliseconds, applied via the `--reveal-delay` custom property. */
  readonly revealDelay = input(0, { transform: numberAttribute });

  protected readonly revealed = signal(false);

  constructor() {
    afterNextRender(() => {
      const host = this.element.nativeElement;

      const delay = this.revealDelay();
      if (delay > 0) {
        host.style.setProperty('--reveal-delay', `${delay}ms`);
      }

      if (typeof IntersectionObserver === 'undefined') {
        this.revealed.set(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.revealed.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );

      observer.observe(host);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
