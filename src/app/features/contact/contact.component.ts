import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ContactService } from '../../core/services/contact.service';
import { PageHeaderBannerComponent } from '../../shared/components/page-header-banner/page-header-banner.component';
import { DecorativeOrnamentComponent } from '../../shared/components/decorative-ornament/decorative-ornament.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    RevealOnScrollDirective,
    PageHeaderBannerComponent,
    DecorativeOrnamentComponent
  ],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);
  private contactService = inject(ContactService);

  contactForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.seoService.updateMeta('contact.pageMeta.title', 'contact.pageMeta.description');
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    
    this.contactService.submitContact(this.contactForm.value).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.isSuccess.set(false);
  }
}
