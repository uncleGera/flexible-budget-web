import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { IMoneyFlow, ITableData } from 'libs/interfaces';
import { Observable } from 'rxjs';

import { IDay } from '../../shared';
import { DashboardState } from '../../state';

@Component({
  selector: 'app-days-table',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysTableComponent implements AfterViewInit {
  @Select(DashboardState.days)
  public days$: Observable<ITableData<IDay>>;

  @Output()
  public add: EventEmitter<number> = new EventEmitter();

  @Output()
  public update: EventEmitter<IMoneyFlow> = new EventEmitter();

  @Output()
  public remove: EventEmitter<number> = new EventEmitter();

  public columnsToDisplay = ['date', 'moneyFlows', 'dailyBudget', 'totalCost', 'balance'];

  public ngAfterViewInit() {}

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
    return { table__cell_warn: value < 0 };
  }
}
