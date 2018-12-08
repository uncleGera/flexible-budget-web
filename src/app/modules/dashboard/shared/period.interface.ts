import { IEntity } from 'libs/models/entity.interface';
import { IMoneyFlow } from './money-flow.interface';
import { IDay } from './day.interface';

export interface IPeriod extends IEntity {
  since: string;
  until: string;
  incomeMoneyFlows: ITableMoneyFlows;
  expenditureMoneyFlows: ITableMoneyFlows;
  days: IDay[];
  income: number;
  dailyBudget: number;
  accumulation: number;
}

export interface ITableMoneyFlows {
  items: IMoneyFlow[];
  total: number;
}
