import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Check, LoaderCircle, LucideAngularModule, Send, TriangleAlert } from 'lucide-angular';

import type { QuotationFormStatus, QuotationRequest } from '../../../core/models';
import { QuotationService, TranslationService } from '../../../core/services';
import { phoneValidator } from '../validators';

type FieldName = 'name' | 'company' | 'email' | 'phone' | 'category' | 'quantity' | 'message';

const OPTIONAL_FIELDS: readonly FieldName[] = ['company', 'quantity'];

@Component({
  selector: 'app-quotation-form',
  imports: [ReactiveFormsModule, LucideAngularModule],
  host: { class: 'block' },
  templateUrl: './quotation-form.component.html',
})
export class QuotationFormComponent {
  private readonly i18n = inject(TranslationService);
  private readonly quotations = inject(QuotationService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly t = this.i18n.t;

  protected readonly SendIcon = Send;
  protected readonly SpinnerIcon = LoaderCircle;
  protected readonly CheckIcon = Check;
  protected readonly AlertIcon = TriangleAlert;

  private readonly successHeading = viewChild<ElementRef<HTMLElement>>('successHeading');
  private readonly formElement = viewChild<ElementRef<HTMLFormElement>>('formElement');

  protected readonly status = signal<QuotationFormStatus>('idle');

  /** Errors stay hidden until a field is touched or the form is submitted. */
  private readonly submitAttempted = signal(false);

  protected readonly form = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    company: this.fb.control(''),
    email: this.fb.control('', [Validators.required, Validators.email]),
    phone: this.fb.control('', [Validators.required, phoneValidator]),
    category: this.fb.control('', [Validators.required]),
    quantity: this.fb.control(''),
    message: this.fb.control('', [Validators.required, Validators.minLength(10)]),
  });

  /**
   * Reactive-forms state is not signal-based, so the group's event stream is
   * bridged into a signal. Every validation expression in the template derives
   * from it, which keeps the UI correct under zoneless change detection.
   */
  private readonly formEvents = toSignal(this.form.events, { initialValue: null });

  protected readonly errors = computed<Partial<Record<FieldName, string>>>(() => {
    this.formEvents();
    this.submitAttempted();

    const messages: Partial<Record<FieldName, string>> = {};
    for (const field of Object.keys(this.form.controls) as FieldName[]) {
      const message = this.messageFor(field);
      if (message) {
        messages[field] = message;
      }
    }
    return messages;
  });

  protected readonly categoryOptions = computed(() =>
    this.i18n.tList('contact.form.categoryOptions'),
  );

  protected readonly isSubmitting = computed(() => this.status() === 'submitting');

  protected fieldId(field: FieldName): string {
    return `quotation-${field}`;
  }

  protected errorId(field: FieldName): string {
    return `quotation-${field}-error`;
  }

  protected hintId(field: FieldName): string {
    return `quotation-${field}-hint`;
  }

  protected isOptional(field: FieldName): boolean {
    return OPTIONAL_FIELDS.includes(field);
  }

  protected describedBy(field: FieldName): string | null {
    const ids = [
      this.errors()[field] ? this.errorId(field) : null,
      this.isOptional(field) ? this.hintId(field) : null,
    ].filter((id): id is string => id !== null);

    return ids.length > 0 ? ids.join(' ') : null;
  }

  protected async submit(): Promise<void> {
    this.submitAttempted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
      return;
    }

    this.status.set('submitting');

    const value = this.form.getRawValue();
    const request: QuotationRequest = {
      ...value,
      name: value.name.trim(),
      company: value.company.trim(),
      email: value.email.trim(),
      phone: value.phone.trim(),
      quantity: value.quantity.trim(),
      message: value.message.trim(),
      language: this.i18n.currentLang(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await this.quotations.submit(request);
      this.status.set('success');
      this.form.reset();
      this.submitAttempted.set(false);
      requestAnimationFrame(() => this.successHeading()?.nativeElement.focus());
    } catch {
      // Input is deliberately preserved so the visitor can retry.
      this.status.set('error');
    }
  }

  private focusFirstInvalid(): void {
    const host = this.formElement()?.nativeElement;
    if (!host) {
      return;
    }

    const firstInvalid = host.querySelector<HTMLElement>('[aria-invalid="true"]');
    firstInvalid?.focus();
  }

  private messageFor(field: FieldName): string | null {
    const control = this.form.controls[field];
    if (control.valid || (!control.touched && !this.submitAttempted())) {
      return null;
    }

    const errors = control.errors ?? {};

    switch (field) {
      case 'name':
        if (errors['required']) return this.t('validation.nameRequired');
        if (errors['minlength']) return this.t('validation.nameMinLength');
        return null;
      case 'email':
        if (errors['required']) return this.t('validation.emailRequired');
        if (errors['email']) return this.t('validation.emailInvalid');
        return null;
      case 'phone':
        if (errors['required']) return this.t('validation.phoneRequired');
        if (errors['phone']) return this.t('validation.phoneInvalid');
        return null;
      case 'category':
        if (errors['required']) return this.t('validation.categoryRequired');
        return null;
      case 'message':
        if (errors['required']) return this.t('validation.messageRequired');
        if (errors['minlength']) return this.t('validation.messageMinLength');
        return null;
      default:
        return null;
    }
  }
}
