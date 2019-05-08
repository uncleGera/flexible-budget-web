// Actions
export class FetchPeriod {
  public static readonly type = '[Settings] FetchPeriod';
}

export class SetHoveredDay {
  public static readonly type = '[Settings] SetHoveredDay';
  constructor(public readonly hoveredDay: number) {}
}

export class SelectDay {
  public static readonly type = '[Settings] SelectDay';
  constructor(public readonly day: number) {}
}
