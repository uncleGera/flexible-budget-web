import { AfterViewInit, Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { Subject } from 'rxjs';

import { ITableMoneyFlows, IMoneyFlow } from '../../shared';

@Component({
  selector: 'app-money-flows-table',
  templateUrl: './money-flows.component.html',
  styleUrls: ['./money-flows.component.scss']
})
export class MoneyFlowsTableComponent implements AfterViewInit, OnDestroy {
  @Input()
  public title: string;

  @Input()
  public moneyFlows: ITableMoneyFlows;

  @Output()
  public add: EventEmitter<any> = new EventEmitter();

  @Output()
  public update: EventEmitter<IMoneyFlow> = new EventEmitter();

  public columnsToDisplay = ['description', 'amount'];

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
