import { Component, Input } from '@angular/core';
import { EditDialogService } from '@app/ui/edit-dialog/edit-dialog.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { IPeriod } from '../../shared';
import { DashboardState, SetNextPeriod, SetPrevPeriod, UpdatePeriod } from '../../state';

@Component({
  selector: 'app-period-info',
  templateUrl: './period-info.component.html',
  styleUrls: ['./period-info.component.scss']
})
export class PeriodInfoComponent {
  @Select(DashboardState.hasNextPeriod)
  public hasNextPeriod$: Observable<boolean>;

  @Select(DashboardState.hasPrevPeriod)
  public hasPrevPeriod$: Observable<boolean>;

  @Input()
  public period: IPeriod;

  constructor(private store: Store, private editDialogService: EditDialogService) {}

  public openAccumulationDialog($event: any) {
    const data: any = {
      value: this.period.accumulation,
      placeholder: 'Изменить накопления'
    };

    this.editDialogService.open($event, data);

    this.editDialogService.changes$.subscribe(accumulation => {
      this.store.dispatch(new UpdatePeriod({ id: this.period.id, accumulation }));
    });
  }

  public nextPeriod() {
    this.store.dispatch(new SetNextPeriod());
  }

  public prevPeriod() {
    this.store.dispatch(new SetPrevPeriod());
  }
}
