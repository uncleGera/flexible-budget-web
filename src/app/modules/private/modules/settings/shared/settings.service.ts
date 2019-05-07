import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {
  constructor(private http: HttpClient) {}

  public save(periods: Moment[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}/periods`, { periods });
  }
}
