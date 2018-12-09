import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IMoneyFlow, IPeriod } from '../../shared';
import {
  CreateMoneyFlow,
  CreatePeriodMoneyFlow,
  DashboardState,
  RemoveMoneyFlow,
  RemovePeriodMoneyFlow,
  UpdateMoneyFlow,
  UpdatePeriodMoneyFlow
} from '../../state';
import { MoneyFlowDialogComponent } from '../money-flow-dialog/money-flow-dialog.component';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DashboardHeaderComponent {
  @Select(DashboardState.period)
  public period$: Observable<IPeriod>;

  constructor(private store: Store, private dialog: MatDialog) {}

  public addMoneyFlow(dayId: number) {
    const dialog = this.dialog.open(MoneyFlowDialogComponent, { data: { kind: 'expense' } });
    dialog
      .afterClosed()
      .pipe(filter(moneyFlow => !!moneyFlow))
      .subscribe(moneyFlow => this.store.dispatch(new CreateMoneyFlow(dayId, moneyFlow)));
  }

  public updateMoneyFlow(moneyFlow: IMoneyFlow) {
    const dialog = this.dialog.open(MoneyFlowDialogComponent, { data: moneyFlow });
    dialog
      .afterClosed()
      .pipe(filter(updatedMoneyFlow => !!updatedMoneyFlow))
      .subscribe(updatedMoneyFlow => this.store.dispatch(new UpdateMoneyFlow(updatedMoneyFlow)));
  }

  public removeMoneyFlow(id: number) {
    this.store.dispatch(new RemoveMoneyFlow(id));
  }

  public addPeriodMoneyFlow(periodId: number, kind: string) {
    const dialog = this.dialog.open(MoneyFlowDialogComponent, { data: { kind } });
    dialog
      .afterClosed()
      .pipe(filter(moneyFlow => !!moneyFlow))
      .subscribe(moneyFlow => this.store.dispatch(new CreatePeriodMoneyFlow(periodId, moneyFlow)));
  }

  public updatePeriodMoneyFlow(moneyFlow: IMoneyFlow) {
    const dialog = this.dialog.open(MoneyFlowDialogComponent, { data: moneyFlow });
    dialog
      .afterClosed()
      .pipe(filter(updatedMoneyFlow => !!updatedMoneyFlow))
      .subscribe(updatedMoneyFlow => this.store.dispatch(new UpdatePeriodMoneyFlow(updatedMoneyFlow)));
  }

  public removePeriodMoneyFlow(id: number) {
    this.store.dispatch(new RemovePeriodMoneyFlow(id));
  }
}
