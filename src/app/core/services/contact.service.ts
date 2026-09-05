import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  submitContact(data: { name: string; email: string; phone?: string; subject?: string; message: string }): Observable<boolean> {
    return of(true).pipe(delay(1500));
  }
}
