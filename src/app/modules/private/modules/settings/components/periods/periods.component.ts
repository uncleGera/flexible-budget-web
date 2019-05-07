import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ISettingsDay } from '../../shared';
import { SettingsState } from '../../state';

@Component({
  selector: 'app-periods-settings',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class PeriodsSettingsComponent implements OnInit {
  @Select(SettingsState.days)
  public days$: Observable<ISettingsDay[]>;

  public ngOnInit() {
    this.days$.subscribe(); // TODO: remove
  }
}
