import { IMoneyFlow } from '@lib/interfaces';

import { IPeriod } from '../shared';

export interface DashboardStateModel {
  periods: IPeriod[];
  currentPeriodIndex: number;
  moneyFlow: IMoneyFlow;
}
