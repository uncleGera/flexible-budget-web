import { Selector, State } from '@ngxs/store';

import { ISettingsDay, SettingsService } from '../shared';
import { SettingsStateModel } from './settings.model';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    periods: []
  }
})
export class SettingsState {
  constructor(private settingsService: SettingsService) {}

  /**
   * Selectors
   */
  @Selector()
  public static days({ periods }: SettingsStateModel): ISettingsDay[] {
    let days: ISettingsDay[] = [];

    if (!periods.length) {
      for (let i = 1; i < 32; i++) {
        days = [...days, { dayNumber: i }];
      }
    }
    console.log(days);
    return days;
  }
}
