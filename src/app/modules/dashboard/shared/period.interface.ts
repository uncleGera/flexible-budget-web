import { IEntity, ITableData } from 'libs/models';

import { IDay } from './day.interface';
import { IMoneyFlow } from './money-flow.interface';

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
