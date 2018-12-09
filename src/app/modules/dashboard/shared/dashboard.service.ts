import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMoneyFlow } from '.';
import { IPeriod } from './period.interface';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  public get(id?: number): Observable<IPeriod[]> {
    return this.http.get<{ periods: IPeriod[] }>(`${environment.apiUrl}/periods`).pipe(map(({ periods }) => periods));
  }

  public createMoneyFlow(dayId: number, moneyFlow: IMoneyFlow): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/money_flows`, {
      money_flow: { ...moneyFlow, day_id: dayId }
    });
  }

  public createPeriodMoneyFlow(periodId: number, moneyFlow: IMoneyFlow): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/period_money_flows`, {
      money_flow: { ...moneyFlow, period_id: periodId }
    });
  }

  public updateMoneyFlow(dayId: number, moneyFlow: IMoneyFlow): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/money_flows/${moneyFlow.id}`, { money_flow: { ...moneyFlow } });
  }

  public updatePeriodMoneyFlow(periodId: number, moneyFlow: IMoneyFlow): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/period_money_flows/${moneyFlow.id}`, { money_flow: { ...moneyFlow } });
  }

  public removeMoneyFlow(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/money_flows/${id}`);
  }

  public removePeriodMoneyFlow(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/period_money_flows/${id}`);
  }
}
