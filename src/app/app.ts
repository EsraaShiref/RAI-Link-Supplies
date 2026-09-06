import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `],
})
export class App implements OnInit {
  // Inject so it initializes eagerly (sets lang + dir on startup)
  private langService = inject(LanguageService);

  ngOnInit(): void {}
}
