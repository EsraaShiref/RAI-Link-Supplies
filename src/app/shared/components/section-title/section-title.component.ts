import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './section-title.component.html'
})
export class SectionTitleComponent {
  titleKey = input.required<string>();
  kickerKey = input<string>();
}
