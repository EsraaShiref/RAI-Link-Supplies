import {
  Component,
  inject,
  signal,
  HostListener,
  computed,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { LanguageService } from '../../../core/services/language.service';

interface NavLink {
  labelKey: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  animations: [
    trigger('drawerSlide', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed-rtl', style({ transform: 'translateX(100%)' })),
      state('closed-ltr', style({ transform: 'translateX(-100%)' })),
      transition('* <=> *', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')),
    ]),
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease'),
      ]),
      transition(':leave', [animate('200ms ease', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  langService = inject(LanguageService);

  isScrolled = signal(false);
  drawerOpen = signal(false);

  navLinks: NavLink[] = [
    { labelKey: 'NAV.HOME', route: '/' },
    { labelKey: 'NAV.ABOUT', route: '/about' },
    { labelKey: 'NAV.SERVICES', route: '/services' },
    { labelKey: 'NAV.PARTNERS', route: '/partners' },
    { labelKey: 'NAV.CONTACT', route: '/contact' },
  ];

  /** Determines which animation state the drawer is in */
  drawerState = computed(() => {
    if (this.drawerOpen()) return 'open';
    return this.langService.currentLang() === 'ar' ? 'closed-rtl' : 'closed-ltr';
  });

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 80);
  }

  toggleDrawer(): void {
    this.drawerOpen.update((v) => !v);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  toggleLanguage(): void {
    this.langService.toggle();
    this.closeDrawer();
  }
}
