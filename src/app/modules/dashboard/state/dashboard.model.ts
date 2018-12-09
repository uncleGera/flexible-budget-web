import { IPeriod, IMoneyFlow } from '../shared';

export interface DashboardStateModel {
  period: IPeriod;
  periods: IPeriod[];
  moneyFlow: IMoneyFlow;
}
