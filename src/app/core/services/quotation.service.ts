import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { QuotationRequest } from '../models';

/**
 * TODO(backend): point `QUOTATION_ENDPOINT` at the real integration before
 * launch. The form is fully wired — swap this constant for whichever the client
 * chooses and delete the simulated branch below:
 *
 *   1. Own API      — POST JSON to e.g. `https://api.railinksupplies.com/quotations`
 *   2. Form service — Formspree / Web3Forms / Basin endpoint (same JSON POST)
 *   3. Serverless   — Netlify / Vercel function that relays to
 *                     `info@railinksupplies.com`
 *
 * Until then the service simulates a successful round-trip so the loading,
 * success and error states are exercisable end to end.
 */
const QUOTATION_ENDPOINT: string | null = null;

const SIMULATED_LATENCY_MS = 900;

@Injectable({ providedIn: 'root' })
export class QuotationService {
  private readonly http = inject(HttpClient);

  async submit(request: QuotationRequest): Promise<void> {
    if (!QUOTATION_ENDPOINT) {
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
      return;
    }

    await firstValueFrom(this.http.post<void>(QUOTATION_ENDPOINT, request));
  }
}
