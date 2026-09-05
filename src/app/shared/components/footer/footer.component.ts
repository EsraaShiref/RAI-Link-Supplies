import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SocialLink } from '../../../core/models/social-link.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  socialLinks = signal<SocialLink[]>([]);
}
