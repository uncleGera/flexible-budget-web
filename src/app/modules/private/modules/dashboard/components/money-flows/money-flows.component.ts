import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMoneyFlow, ITableData } from 'libs/interfaces';

@Component({
  selector: 'app-money-flows-table',
  templateUrl: './money-flows.component.html',
  styleUrls: ['./money-flows.component.scss']
})
export class MoneyFlowsTableComponent {
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
