import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ISettingsPeriod } from './period.interface';

@Injectable()
export class SettingsService {
  constructor(private http: HttpClient) {}

  public getPeriods(): Observable<ISettingsPeriod[]> {
    return of([]);
  }
}
