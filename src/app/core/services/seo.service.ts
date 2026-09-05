import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private translate = inject(TranslateService);
  private languageService = inject(LanguageService);

  updateMeta(titleKey: string, descriptionKey: string): void {
    this.translate.get([titleKey, descriptionKey]).subscribe(translations => {
      const translatedTitle = translations[titleKey];
      const translatedDescription = translations[descriptionKey];

      this.title.setTitle(translatedTitle);
      
      this.meta.updateTag({ name: 'description', content: translatedDescription });
      this.meta.updateTag({ property: 'og:title', content: translatedTitle });
      this.meta.updateTag({ property: 'og:description', content: translatedDescription });
    });
  }
}
