import { ISettingsPeriod, ISettingsDay } from '../shared';

export interface SettingsStateModel {
  periods: ISettingsPeriod[];
  selectedPeriod: ISettingsPeriod;
  days: ISettingsDay[];
}
