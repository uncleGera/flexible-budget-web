import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { IMoneyFlow } from '.';

@Injectable()
export class MoneyFlowsService {
  constructor(private http: HttpClient) {}

  public create(dayId: number, moneyFlow: IMoneyFlow): Observable<any> {
    moneyFlow = { ...moneyFlow, day_id: dayId };
    return this.http.post<any>(`${environment.apiUrl}/money_flows`, { moneyFlow });
  }

  public update(moneyFlow: IMoneyFlow): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/money_flows/${moneyFlow.id}`, { moneyFlow });
  }

  public remove(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/money_flows/${id}`);
  }
}
