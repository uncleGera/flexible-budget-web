import { IMoneyFlow } from './money-flow.interface';
import { IEntity } from 'libs/models';

export interface IDay extends IEntity {
  date: string;
  moneyFlows: IMoneyFlow[];
  expense: number;
  dailyBudget: number;
  balance: number;
}
