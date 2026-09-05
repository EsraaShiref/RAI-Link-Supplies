import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() delay: number = 0;

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

    el.classList.add('reveal-hidden');

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${this.delay}ms`;
          el.classList.remove('reveal-hidden');
          el.classList.add('reveal-visible');
          
          if (this.observer) {
            this.observer.unobserve(el);
          }
        }
      });
    }, {
      threshold: 0.2
    });

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
