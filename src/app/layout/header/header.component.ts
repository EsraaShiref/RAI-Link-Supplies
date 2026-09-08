import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ArrowRight, LucideAngularModule, Menu, X } from 'lucide-angular';

import { NAV_ITEMS } from '../../core/content';
import { ScrollStateService, TranslationService } from '../../core/services';
import {
  BrandLogoComponent,
  LanguageToggleComponent,
  ThemeToggleComponent,
} from '../../shared/components';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    BrandLogoComponent,
    LanguageToggleComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly i18n = inject(TranslationService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly scrollState = inject(ScrollStateService);

  protected readonly t = this.i18n.t;
  protected readonly navItems = NAV_ITEMS;

  protected readonly MenuIcon = Menu;
  protected readonly CloseIcon = X;
  protected readonly ArrowRightIcon = ArrowRight;

  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  protected readonly drawerOpen = signal(false);

  /** Re-evaluated on every completed navigation. */
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    { initialValue: null },
  );

  protected readonly isHome = computed(() => {
    this.navigationEnd();
    return this.router.url === '/' || this.router.url.startsWith('/?');
  });

  /** Keep the navbar in its solid branded treatment at the top of the page and
   * after scrolling, matching the provided design reference rather than a
   * transparent hero overlay. */
  protected readonly isTransparent = computed(() => false);

  constructor() {
    // Keep the header state synchronized both on scroll and after navigation,
    // because the transparent hero state is visually tied to the top-of-page
    // boundary rather than just to a router URL.
    effect(() => {
      this.router.url;
      this.scrollState.updateFromScroll();
    });

    // Close the drawer on navigation and restore page scrolling.
    effect(() => {
      this.navigationEnd();
      this.drawerOpen.set(false);
    });

    // The header stays transparent only while we are still at the top of the Home
    // hero; the sentinel updates `scrollState.isScrolled()` as soon as the page
    // moves beyond the ~8px threshold on any route.
    effect(() => {
      this.scrollState.isScrolled();
    });

    effect(() => {
      const open = this.drawerOpen();
      this.document.body.style.overflow = open ? 'hidden' : '';

      if (open) {
        // Move focus into the drawer once it is on screen.
        requestAnimationFrame(() => this.closeButton()?.nativeElement.focus());
      }
    });
  }

  protected toggleDrawer(): void {
    this.drawerOpen.update((open) => !open);
  }

  protected closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.drawerOpen()) {
      event.preventDefault();
      this.closeDrawer();
    }
  }
}
