import { IMoneyFlow } from 'libs/interfaces';

export interface ISettingsPeriod {
  startDay: number;
  endDay?: number;
  color: string;
  income: IMoneyFlow[];
  expense: IMoneyFlow[];
}
