import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <section style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;">
      <h1 style="font-size:2.5rem;font-weight:700;color:#0A1628;">{{ 'ABOUT.TITLE' | translate }}</h1>
    </section>
  `,
})
export class AboutComponent {}
