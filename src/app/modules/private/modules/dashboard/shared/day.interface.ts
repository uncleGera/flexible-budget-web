import { IEntity, IMoneyFlow } from '@lib/interfaces';

export interface IDay extends IEntity {
  date: string;
  moneyFlows: IMoneyFlow[];
  expense: number;
  dailyBudget: number;
  balance: number;
}
