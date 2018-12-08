import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';

import { IPeriod } from './period.interface';
import { IMoneyFlow } from '.';

const period: IPeriod = {
  id: 1,
  since: moment().toLocaleString(),
  until: moment()
    .day(7)
    .toLocaleString(),
  days: [
    {
      id: 1,
      date: moment()
        .day(1)
        .toLocaleString(),
      moneyFlows: [],
      expenditure: 0,
      dailyBudget: 550 * 1,
      balance: 550 * 1
    },
    {
      id: 2,
      date: moment()
        .day(2)
        .toLocaleString(),
      moneyFlows: [],
      expenditure: 0,
      dailyBudget: 550 * 2,
      balance: 550 * 2
    },
    {
      id: 3,
      date: moment()
        .day(3)
        .toLocaleString(),
      moneyFlows: [],
      expenditure: 0,
      dailyBudget: 550 * 3,
      balance: 550 * 3
    }
  ],
  incomeMoneyFlows: {
    items: [
      {
        id: 1,
        amount: 5000,
        description: 'Зарплата'
      }
    ],
    total: 5000
  },
  expenditureMoneyFlows: {
    items: [],
    total: 0
  },
  income: 10000,
  dailyBudget: 550,
  accumulation: 0
};

@Injectable()
export class DashboardService {
  private period = period;

  public get(id?: number): Observable<IPeriod> {
    return of(this.period);
  }

  public createMoneyFlow(moneyFlow: IMoneyFlow): Observable<any> {
    const days = [...this.period.days];
    days[0] = { ...days[0], moneyFlows: [...days[0].moneyFlows, moneyFlow] };
    this.period = { ...this.period, days };
    return of(true);
  }
}
