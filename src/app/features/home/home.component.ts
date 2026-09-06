import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent],
  template: `
    <app-hero />
    <!-- Additional sections will be added in subsequent steps -->
  `,
})
export class HomeComponent {}
