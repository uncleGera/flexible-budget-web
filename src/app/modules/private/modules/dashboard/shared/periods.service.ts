import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPeriod } from './period.interface';

@Injectable()
export class PeriodsService {
  constructor(private http: HttpClient) {}

  public get(): Observable<IPeriod[]> {
    return this.http.get<{ periods: IPeriod[] }>(`${environment.apiUrl}/periods`).pipe(map(({ periods }) => periods));
  }

  public update(period: IPeriod): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/periods/${period.id}`, { period });
  }
}
