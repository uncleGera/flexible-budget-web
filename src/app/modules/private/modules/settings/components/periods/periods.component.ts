import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ISettingsDay } from '../../shared';
import { SelectDay, SetHoveredDay, SettingsState } from '../../state';

@Component({
  selector: 'app-periods-settings',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class PeriodsSettingsComponent {
  @Select(SettingsState.days)
  public days$: Observable<ISettingsDay[]>;

  constructor(private store: Store) {}

  public dayClassNames(day: ISettingsDay): string[] {
    return [
      'settings__day',
      day.color ? `settings__day_${day.color}` : '',
      day.selected ? 'settings__day_selected' : '',
      day.isFirst ? 'settings__day_first' : '',
      day.isLast ? 'settings__day_last' : '',
      day.hovered ? 'settings__day_hovered' : ''
    ];
  }

  public setHoveredDay(day: number) {
    this.store.dispatch(new SetHoveredDay(day));
  }

  public onDaySelected({ dayNumber }: ISettingsDay) {
    this.store.dispatch(new SelectDay(dayNumber));
  }
}
