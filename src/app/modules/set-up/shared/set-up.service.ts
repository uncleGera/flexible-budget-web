import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class SetUpService {
  constructor(private http: HttpClient) {}

  public save(periods: Moment[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}/periods`, { periods });
  }
}
