import { IPeriod, IMoneyFlow } from '../shared';

export interface DashboardStateModel {
  periods: IPeriod[];
  currentPeriodIndex: number;
  moneyFlow: IMoneyFlow;
}
