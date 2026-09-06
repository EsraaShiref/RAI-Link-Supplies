import { Component, input } from '@angular/core';

@Component({
  selector: 'app-decorative-ornament',
  standalone: true,
  template: `
    <div [class]="containerClasses()" aria-hidden="true">
      @switch (type()) {
        @case ('rings') {
          <svg class="w-32 h-32 md:w-44 md:h-44 text-navy opacity-10 pointer-events-none" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="25" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="80" cy="80" r="50" stroke="currentColor" stroke-width="1.5" />
            <circle cx="80" cy="80" r="75" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4" />
          </svg>
        }
        @case ('dots') {
          <svg class="w-24 h-24 text-orange opacity-20 pointer-events-none" viewBox="0 0 96 96" fill="currentColor">
            <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2" />
            </pattern>
            <rect width="96" height="96" fill="url(#dot-pattern)" />
          </svg>
        }
        @case ('stripes') {
          <svg class="w-20 h-20 text-orange opacity-25 pointer-events-none" viewBox="0 0 80 80" fill="none">
            <line x1="0" y1="20" x2="20" y2="0" stroke="currentColor" stroke-width="3" />
            <line x1="0" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="3" />
            <line x1="0" y1="60" x2="60" y2="0" stroke="currentColor" stroke-width="3" />
            <line x1="0" y1="80" x2="80" y2="0" stroke="currentColor" stroke-width="3" />
            <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" stroke-width="3" />
            <line x1="40" y1="80" x2="80" y2="40" stroke="currentColor" stroke-width="3" />
            <line x1="60" y1="80" x2="80" y2="60" stroke="currentColor" stroke-width="3" />
          </svg>
        }
      }
    </div>
  `
})
export class DecorativeOrnamentComponent {
  readonly type = input<'rings' | 'dots' | 'stripes'>('rings');
  readonly position = input<'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'>('top-start');

  protected containerClasses(): string {
    const base = 'absolute pointer-events-none select-none z-0';
    switch (this.position()) {
      case 'top-start':
        return `${base} top-4 start-4 -translate-y-2`;
      case 'top-end':
        return `${base} top-4 end-4 -translate-y-2`;
      case 'bottom-start':
        return `${base} bottom-4 start-4 translate-y-2`;
      case 'bottom-end':
        return `${base} bottom-4 end-4 translate-y-2`;
    }
  }
}
