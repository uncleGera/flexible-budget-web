import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ISettingsDay } from '../../shared';
import { SelectDay, SetHover, SettingsState } from '../../state';

@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
  @Select(SettingsState.days)
  public days$: Observable<ISettingsDay[]>;

  constructor(private store: Store) {}

  public setHover(day: ISettingsDay) {
    this.store.dispatch(new SetHover(day));
  }

  public onDaySelected(day: ISettingsDay) {
    this.store.dispatch(new SelectDay(day));
  }
}
