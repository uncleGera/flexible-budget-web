import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';

import { IDay, IMoneyFlow } from '../../shared';
import { DashboardState } from '../../state';
import { ITableData } from 'libs/models';

@Component({
  selector: 'app-days-table',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysTableComponent implements AfterViewInit, OnDestroy {
  @Select(DashboardState.days)
  public days$: Observable<ITableData<IDay>>;

  @Output()
  public add: EventEmitter<number> = new EventEmitter();

  @Output()
  public update: EventEmitter<IMoneyFlow> = new EventEmitter();

  @Output()
  public remove: EventEmitter<number> = new EventEmitter();

  public columnsToDisplay = ['date', 'moneyFlows', 'dailyBudget', 'totalCost', 'balance'];

  private $unsubscribe: Subject<any> = new Subject();

  constructor(private store: Store, private actions: Actions) {}

  public ngAfterViewInit() {}

  public ngOnDestroy() {
    this.$unsubscribe.next();
  }

  public addMoneyFlow(dayId: number) {
    this.add.emit(dayId);
  }

  public updateMoneyFlow(moneyFlow: IMoneyFlow) {
    this.update.emit(moneyFlow);
  }

  public removeMoneyFlow(id: number) {
    this.remove.emit(id);
  }

  public tableCellClassName(value: number): { [name: string]: boolean } {
    return { 'table__cell_warn': value < 0 };
  }
}
