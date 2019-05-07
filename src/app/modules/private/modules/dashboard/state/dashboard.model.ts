import { IMoneyFlow } from 'libs/interfaces';

import { IPeriod } from '../shared';

export interface DashboardStateModel {
  periods: IPeriod[];
  currentPeriodIndex: number;
  moneyFlow: IMoneyFlow;
}
