import { IMoneyFlow } from './money-flow.interface';
import { IEntity } from 'libs/models/entity.interface';

export interface IDay extends IEntity {
  date: string;
  moneyFlows: IMoneyFlow[];
  expenditure: number;
  dailyBudget: number;
  balance: number;
}
