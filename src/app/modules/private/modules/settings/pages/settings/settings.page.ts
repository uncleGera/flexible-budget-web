import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ISettingsDay, ISettingsPeriod } from '../../shared';
import { SelectDay, SelectPeriod, SetHover, SettingsState } from '../../state';

@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements AfterViewInit, OnDestroy {
  @Select(SettingsState.days)
  public days$: Observable<ISettingsDay[]>;

  @Select(SettingsState.selectedPeriod)
  public selectedPeriod$: Observable<ISettingsPeriod>;

  @ViewChild('sidebar')
  public sidebar: MatSidenav;

  constructor(private store: Store) {}

  public ngAfterViewInit() {
    this.selectedPeriod$
      .pipe(
        filter(() => !!this.sidebar),
        untilDestroyed(this)
      )
      .subscribe(selectedPeriod => {
        if (!this.sidebar.opened && selectedPeriod) {
          this.sidebar.open();
        } else if (this.sidebar.opened && !selectedPeriod) {
          this.sidebar.close();
        }
      });
  }

  public ngOnDestroy() {}

  public closeSidebar() {
    this.sidebar.close();
    this.store.dispatch(new SelectPeriod(null));
  }

  public setHover(day: ISettingsDay) {
    this.store.dispatch(new SetHover(day));
  }

  public onDaySelected(day: ISettingsDay) {
    this.store.dispatch(new SelectDay(day));
  }
}
