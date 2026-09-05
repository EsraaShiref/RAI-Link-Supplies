import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
}
