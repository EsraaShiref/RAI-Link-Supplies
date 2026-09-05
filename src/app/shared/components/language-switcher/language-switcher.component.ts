import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [],
  templateUrl: './language-switcher.component.html'
})
export class LanguageSwitcherComponent {
  languageService = inject(LanguageService);

  toggleLanguage() {
    const current = this.languageService.currentLang();
    this.languageService.setLanguage(current === 'ar' ? 'en' : 'ar');
  }
}
