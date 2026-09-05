import { Component, input, signal, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * StatCounterComponent
 * Reusable animated counter component left ready-to-wire until client provides verified stats/certifications.
 * Per Section 1.6 & 8 of the project specifications.
 */
@Component({
  selector: 'app-stat-counter',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="text-center p-6 bg-white rounded-xl border border-border card-hover">
      <div class="text-4xl lg:text-5xl font-bold text-orange mb-2 font-heading-en">
        {{ currentDisplay() }}{{ suffix() }}
      </div>
      <p class="text-text-secondary text-sm md:text-base font-medium">
        {{ labelKey() | translate }}
      </p>
    </div>
  `
})
export class StatCounterComponent implements OnInit, OnDestroy {
  readonly value = input.required<number>();
  readonly labelKey = input.required<string>();
  readonly suffix = input<string>('+');
  readonly duration = input<number>(2000);

  protected readonly currentDisplay = signal<number>(0);
  private observer?: IntersectionObserver;
  private el = inject(ElementRef);

  ngOnInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.animateCounter();
          this.observer?.disconnect();
        }
      }, { threshold: 0.2 });

      this.observer.observe(this.el.nativeElement);
    } else {
      this.currentDisplay.set(this.value());
    }
  }

  private animateCounter(): void {
    const target = this.value();
    const duration = this.duration();
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      this.currentDisplay.set(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        this.currentDisplay.set(target);
      }
    };

    requestAnimationFrame(update);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
