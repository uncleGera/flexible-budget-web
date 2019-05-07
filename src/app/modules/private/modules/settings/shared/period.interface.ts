import { IMoneyFlow } from 'libs/interfaces';

export interface ISettingsPeriod {
  startDay: number;
  endDay: number;
  income: IMoneyFlow[];
  expense: IMoneyFlow[];
}
