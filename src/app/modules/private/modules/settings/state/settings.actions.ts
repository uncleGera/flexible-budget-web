import { ISettingsDay } from '../shared';

// Actions
export class FetchPeriod {
  public static readonly type = '[Settings] FetchPeriod';
}

export class SetHover {
  public static readonly type = '[Settings] SetHover';
  constructor(public readonly day: ISettingsDay) {}
}

export class SelectDay {
  public static readonly type = '[Settings] SelectDay';
  constructor(public readonly day: ISettingsDay) {}
}
