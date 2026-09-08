import type { AppLanguage } from './language.model';

/** Payload submitted by the quotation form. */
export interface QuotationRequest {
  readonly name: string;
  readonly company: string;
  readonly email: string;
  readonly phone: string;
  readonly category: string;
  readonly quantity: string;
  readonly message: string;
  /** Language the visitor filled the form in, so replies match. */
  readonly language: AppLanguage;
  /** ISO timestamp of submission. */
  readonly submittedAt: string;
}

export type QuotationFormStatus = 'idle' | 'submitting' | 'success' | 'error';
