import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { IMoneyFlow, ITableData } from 'libs/interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-money-flows-table',
  templateUrl: './money-flows.component.html',
  styleUrls: ['./money-flows.component.scss']
})
export class MoneyFlowsTableComponent implements AfterViewInit, OnDestroy {
  @Input()
  public title: string;

  @Input()
  public moneyFlows: ITableData<IMoneyFlow>;

  @Output()
  public add: EventEmitter<any> = new EventEmitter();

  @Output()
  public update: EventEmitter<IMoneyFlow> = new EventEmitter();

  @Output()
  public remove: EventEmitter<number> = new EventEmitter();

  public columnsToDisplay = ['description', 'amount', 'actions'];

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

  public removeMoneyFlow(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.remove.emit(id);
  }
}
