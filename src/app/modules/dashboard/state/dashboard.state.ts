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
  SetNextPeriod,
  SetPrevPeriod,
  UpdateMoneyFlow,
  UpdatePeriod,
  UpdatePeriodMoneyFlow
} from './dashboard.actions';
import { DashboardStateModel } from './dashboard.model';

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    currentPeriodIndex: 0,
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
  public static period({ periods, currentPeriodIndex }: DashboardStateModel) {
    return periods[currentPeriodIndex];
  }

  @Selector()
  public static days({ periods, currentPeriodIndex }: DashboardStateModel) {
    return periods[currentPeriodIndex].days;
  }

  @Selector()
  public static hasNextPeriod({ periods, currentPeriodIndex }: DashboardStateModel) {
    return !!periods[currentPeriodIndex + 1];
  }

  @Selector()
  public static hasPrevPeriod({ periods, currentPeriodIndex }: DashboardStateModel) {
    return !!periods[currentPeriodIndex - 1];
  }

  /**
   * Commands
   */
  @Action(FetchPeriods)
  public fetchPeriods(ctx: StateContext<DashboardStateModel>, { id }: FetchPeriods) {
    return this.dashboardService.get().pipe(tap((periods: IPeriod[]) => ctx.patchState({ periods })));
  }

  @Action(UpdatePeriod)
  public updatePeriod(ctx: StateContext<DashboardStateModel>, { period }: UpdatePeriod) {
    return this.dashboardService.updatePeriod(period).pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(SetNextPeriod)
  public setNextPeriod(ctx: StateContext<DashboardStateModel>) {
    ctx.patchState({ currentPeriodIndex: ctx.getState().currentPeriodIndex + 1 });
  }

  @Action(SetPrevPeriod)
  public setPrevPeriod(ctx: StateContext<DashboardStateModel>) {
    ctx.patchState({ currentPeriodIndex: ctx.getState().currentPeriodIndex - 1 });
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
    const { periods, currentPeriodIndex } = ctx.getState();
    return this.dashboardService
      .updateMoneyFlow(periods[currentPeriodIndex].id, moneyFlow)
      .pipe(tap(() => ctx.dispatch(new MoneyFlowOperationSuccess())));
  }

  @Action(UpdatePeriodMoneyFlow)
  public updatePeriodMoneyFlow(ctx: StateContext<DashboardStateModel>, { moneyFlow }: UpdatePeriodMoneyFlow) {
    const { periods, currentPeriodIndex } = ctx.getState();
    return this.dashboardService
      .updatePeriodMoneyFlow(periods[currentPeriodIndex].id, moneyFlow)
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
