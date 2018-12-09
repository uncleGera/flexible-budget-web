import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { DashboardService, IPeriod } from '../shared';
import {
  CreateMoneyFlow,
  CreatePeriodMoneyFlow,
  FetchPeriods,
  MoneyFlowOperationSuccess,
  RemoveMoneyFlow,
  RemovePeriodMoneyFlow,
  UpdateMoneyFlow,
  UpdatePeriodMoneyFlow,
  UpdatePeriod
} from './dashboard.actions';
import { DashboardStateModel } from './dashboard.model';

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    period: null,
    periods: [],
    moneyFlow: null
  }
})
export class DashboardState {
  constructor(private dashboardService: DashboardService) {}

  /**
   * Selectors
   */
  @Selector()
  public static period({ periods }: DashboardStateModel) {
    return periods[0];
  }

  @Selector()
  public static days({ periods }: DashboardStateModel) {
    return periods[0].days;
  }

  @Selector()
  public static moneyFlow({ moneyFlow }: DashboardStateModel) {
    return moneyFlow;
  }

  /**
   * Commands
   */
  @Action(FetchPeriods)
  public fetchPeriods(ctx: StateContext<DashboardStateModel>, { id }: FetchPeriods) {
    return this.dashboardService
      .get()
      .pipe(tap((periods: IPeriod[]) => ctx.patchState({ periods, period: periods[0] })));
  }

  @Action(UpdatePeriod)
  public updatePeriod(ctx: StateContext<DashboardStateModel>, { period }: UpdatePeriod) {
    return this.dashboardService
      .updatePeriod(period)
      .pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(CreateMoneyFlow)
  public createMoneyFlow(ctx: StateContext<DashboardStateModel>, { dayId, moneyFlow }: CreateMoneyFlow) {
    return this.dashboardService
      .createMoneyFlow(dayId, moneyFlow)
      .pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(CreatePeriodMoneyFlow)
  public createPeriodMoneyFlow(ctx: StateContext<DashboardStateModel>, { periodId, moneyFlow }: CreatePeriodMoneyFlow) {
    return this.dashboardService
      .createPeriodMoneyFlow(periodId, moneyFlow)
      .pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(UpdateMoneyFlow)
  public updateMoneyFlow(ctx: StateContext<DashboardStateModel>, { moneyFlow }: UpdateMoneyFlow) {
    return this.dashboardService
      .updateMoneyFlow(ctx.getState().period.id, moneyFlow)
      .pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(UpdatePeriodMoneyFlow)
  public updatePeriodMoneyFlow(ctx: StateContext<DashboardStateModel>, { moneyFlow }: UpdatePeriodMoneyFlow) {
    return this.dashboardService
      .updatePeriodMoneyFlow(ctx.getState().period.id, moneyFlow)
      .pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(RemoveMoneyFlow)
  public removeMoneyFlow(ctx: StateContext<DashboardStateModel>, { id }: RemoveMoneyFlow) {
    return this.dashboardService.removeMoneyFlow(id).pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(RemovePeriodMoneyFlow)
  public removePeriodMoneyFlow(ctx: StateContext<DashboardStateModel>, { id }: RemovePeriodMoneyFlow) {
    return this.dashboardService
      .removePeriodMoneyFlow(id)
      .pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  /**
   * Events
   */
  @Action(MoneyFlowOperationSuccess)
  public onMoneyFlowOperationSuccess(ctx: StateContext<DashboardStateModel>) {
    ctx.dispatch(new FetchPeriods());
  }
}
