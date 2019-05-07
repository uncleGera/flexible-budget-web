import { IEntity, IMoneyFlow, ITableData } from 'libs/interfaces';

import { IDay } from './day.interface';

export interface IPeriod extends IEntity {
  since: string;
  until: string;
  expenseMoneyFlows: ITableData<IMoneyFlow>;
  days: ITableData<IDay>;
  income: number;
  expense: number;
  dailyBudget: number;
  accumulation: number;
  balance: number;
}
