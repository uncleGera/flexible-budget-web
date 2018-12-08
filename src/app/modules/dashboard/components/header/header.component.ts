import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { IPeriod, IMoneyFlow } from '../../shared';
import { DashboardState, FetchPeriod } from '../../state';
import { MatDialog } from '@angular/material';
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

  public addIncome() {
    this.dialog.open(MoneyFlowDialogComponent, { data: { isIncome: true } });
  }

  public addExpenditure() {
    this.dialog.open(MoneyFlowDialogComponent, { data: {} });
  }

  public updateIncome(moneyFlow: IMoneyFlow) {
    this.dialog.open(MoneyFlowDialogComponent, { data: { isIncome: true } });
  }

  public updateExpenditure(moneyFlow: IMoneyFlow) {
    this.dialog.open(MoneyFlowDialogComponent, { data: {} });
  }
}
