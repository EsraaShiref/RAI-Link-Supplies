import { afterNextRender, Component, DestroyRef, inject, output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { TranslationService } from '../../core/services';
import { BrandLogoComponent } from '../../shared/components';

type SplashPhase = 'entering' | 'loading' | 'exiting' | 'done';

const PROGRESS_DELAY_MS = 700;
const PROGRESS_DURATION_MS = 2000;
const MINIMUM_DURATION_MS = PROGRESS_DELAY_MS + PROGRESS_DURATION_MS;
const EXIT_DURATION_MS = 650;
const FRAME_MS = 40;

@Component({
  selector: 'app-splash-screen',
  imports: [BrandLogoComponent],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.css',
  host: {
    class: 'splash-screen',
  },
})
export class SplashScreenComponent {
  private readonly router = inject(Router);
  private readonly i18n = inject(TranslationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly startedAt = performance.now();
  private readonly elapsed = signal(0);
  private readonly firstRenderReady = signal(false);
  private readonly navigationReady = signal(this.router.navigated);
  private readonly exitScheduled = signal(false);

  protected readonly phase = signal<SplashPhase>('entering');
  protected readonly completed = output<void>();
  protected readonly progress = signal(0);
  protected readonly t = this.i18n.t;

  constructor() {
    const navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.navigationReady.set(true);
        this.advance();
      });

    const intervalId = window.setInterval(() => {
      this.elapsed.set(performance.now() - this.startedAt);
      this.advance();
    }, FRAME_MS);

    this.destroyRef.onDestroy(() => {
      navigationSubscription.unsubscribe();
      window.clearInterval(intervalId);
    });

    afterNextRender(() => {
      this.firstRenderReady.set(true);
      if (this.reducedMotion) {
        this.phase.set('done');
        this.progress.set(100);
        queueMicrotask(() => this.completed.emit());
        return;
      }
      this.advance();
    });
  }

  protected isHiddenFromAssistiveTechnology(): boolean {
    return this.phase() === 'exiting' || this.phase() === 'done';
  }

  private advance(): void {
    if (this.reducedMotion || this.phase() === 'done' || this.phase() === 'exiting') {
      return;
    }

    const timeProgress = Math.min(
      100,
      (Math.max(0, this.elapsed() - PROGRESS_DELAY_MS) / PROGRESS_DURATION_MS) * 100,
    );
    const readinessProgress = this.isReady() ? timeProgress : Math.min(85, timeProgress);
    this.progress.set(Math.round(readinessProgress));

    if (this.phase() === 'entering' && this.firstRenderReady()) {
      this.phase.set('loading');
    }

    if (this.isReady() && !this.exitScheduled() && this.elapsed() >= MINIMUM_DURATION_MS) {
      this.exitScheduled.set(true);
      this.progress.set(100);
      this.phase.set('exiting');
      window.setTimeout(() => {
        this.phase.set('done');
        this.completed.emit();
      }, EXIT_DURATION_MS);
    }
  }

  private isReady(): boolean {
    return this.firstRenderReady() && this.navigationReady();
  }
}
