import { IMoneyFlow } from '@lib/interfaces';

export interface ISettingsPeriod {
  startDay: number;
  endDay?: number;
  income: IMoneyFlow[];
  expense: IMoneyFlow[];
}
