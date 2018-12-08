import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { IPeriod, DashboardService } from '../shared';
import { FetchPeriod, CreateMoneyFlow, MoneyFlowOperationSuccess } from './dashboard.actions';
import { DashboardStateModel } from './dashboard.model';

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    period: null,
    moneyFlow: null
  }
})
export class DashboardState {
  constructor(private dashboardService: DashboardService) {}

  /**
   * Selectors
   */
  @Selector()
  public static period({ period }: DashboardStateModel) {
    return period;
  }

  @Selector()
  public static days({ period }: DashboardStateModel) {
    return period.days;
  }

  @Selector()
  public static totalExpenses({ period }: DashboardStateModel) {
    return 0;
  }

  @Selector()
  public static moneyFlow({ moneyFlow }: DashboardStateModel) {
    return moneyFlow;
  }

  /**
   * Commands
   */
  @Action(FetchPeriod)
  public fetchPeriod(ctx: StateContext<DashboardStateModel>, { id }: FetchPeriod) {
    return this.dashboardService.get().pipe(tap((period: IPeriod) => ctx.patchState({ period })));
  }

  @Action(CreateMoneyFlow)
  public createMoneyFlow(ctx: StateContext<DashboardStateModel>, { moneyFlow, isIncome }: CreateMoneyFlow) {
    return this.dashboardService.createMoneyFlow(moneyFlow).pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  /**
   * Events
   */
}
