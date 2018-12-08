import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';

import { IDay, IMoneyFlow } from '../../shared';
import { DashboardState } from '../../state';

@Component({
  selector: 'app-days-table',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysTableComponent implements AfterViewInit, OnDestroy {
  @Select(DashboardState.days)
  public days$: Observable<IDay[]>;

  @Select(DashboardState.totalExpenses)
  public total$: Observable<number>;

  @Output()
  public add: EventEmitter<any> = new EventEmitter();

  @Output()
  public update: EventEmitter<IMoneyFlow> = new EventEmitter();

  public columnsToDisplay = ['date', 'moneyFlows', 'dailyBudget', 'totalCost', 'balance', 'actions'];

  private $unsubscribe: Subject<any> = new Subject();

  constructor(private store: Store, private actions: Actions) {}

  public ngAfterViewInit() {}

  public ngOnDestroy() {
    this.$unsubscribe.next();
  }

  public addMoneyFlow() {
    this.add.emit();
  }

  public updateMoneyFlow(moneyFlow: IMoneyFlow) {
    this.update.emit(moneyFlow);
  }
}
