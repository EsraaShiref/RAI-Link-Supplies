import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type RevealAnimationDirection = 'up' | 'start' | 'end';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() delay: number = 0;
  @Input() direction: RevealAnimationDirection = 'up';

  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = this.elementRef.nativeElement as HTMLElement;

    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const hiddenClass =
      this.direction === 'start'
        ? 'reveal-hidden-start'
        : this.direction === 'end'
          ? 'reveal-hidden-end'
          : 'reveal-hidden';

    el.classList.add(hiddenClass);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${this.delay}ms`;
            el.classList.remove(hiddenClass);
            el.classList.add('reveal-visible');

            if (this.observer) {
              this.observer.unobserve(el);
            }
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
