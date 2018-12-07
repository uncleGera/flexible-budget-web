import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Observable, of } from 'rxjs';

@Injectable()
export class SetUpService {
  public save(periods: Moment[]): Observable<any> {
    return of();
  }
}
