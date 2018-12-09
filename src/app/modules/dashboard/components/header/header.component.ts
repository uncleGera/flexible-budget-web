import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditDialogService } from '@app/ui/edit-dialog/edit-dialog.service';
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
  SetNextPeriod,
  SetPrevPeriod,
  UpdateMoneyFlow,
  UpdatePeriod,
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

  @Select(DashboardState.hasNextPeriod)
  public hasNextPeriod$: Observable<boolean>;

  @Select(DashboardState.hasPrevPeriod)
  public hasPrevPeriod$: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog, private editDialogService: EditDialogService) {}

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

  public openAccumulationDialog($event: any, period: IPeriod) {
    const data: any = {
      value: period.accumulation,
      placeholder: 'Изменить накопления'
    };

    this.editDialogService.open($event, data);

    this.editDialogService.changes$.subscribe(accumulation => {
      this.store.dispatch(new UpdatePeriod({ id: period.id, accumulation }));
    });
  }

  public nextPeriod() {
    this.store.dispatch(new SetNextPeriod());
  }

  public prevPeriod() {
    this.store.dispatch(new SetPrevPeriod());
  }
}
