import { ISettingsPeriod, ISettingsDay } from '../shared';

export interface SettingsStateModel {
  periods: ISettingsPeriod[];
  days: ISettingsDay[];
}
