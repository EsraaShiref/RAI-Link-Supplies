import { Component, inject } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { routeTransitionAnimations } from './core/animations/route-animations';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeTransitionAnimations]
})
export class App {
  // Ensure LanguageService is instantiated at startup to sync lang/dir/localStorage/translations
  private readonly langService = inject(LanguageService);
  private readonly contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
