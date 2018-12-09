import { IMoneyFlow } from '../shared';

// Actions
export class FetchPeriods {
  public static readonly type = '[Dashboard] FetchPeriods';
  constructor(public readonly id?: number) {}
}

export class FetchMoneyFlow {
  public static readonly type = '[Dashboard] FetchMoneyFlow';
  constructor(public readonly id: number) {}
}

export class CreateMoneyFlow {
  public static readonly type = '[Dashboard] CreateMoneyFlow';
  constructor(public readonly dayId: number, public readonly moneyFlow: IMoneyFlow) {}
}

export class UpdateMoneyFlow {
  public static readonly type = '[Dashboard] UpdateMoneyFlow';
  constructor(public readonly moneyFlow: IMoneyFlow) {}
}

export class RemoveMoneyFlow {
  public static readonly type = '[Dashboard] FetchMoneyFlow';
  constructor(public readonly id: number) {}
}

export class FetchPeriodMoneyFlow {
  public static readonly type = '[Dashboard] FetchPeriodMoneyFlow';
  constructor(public readonly id: number) {}
}

export class CreatePeriodMoneyFlow {
  public static readonly type = '[Dashboard] CreatePeriodMoneyFlow';
  constructor(public readonly periodId: number, public readonly moneyFlow: IMoneyFlow) {}
}

export class UpdatePeriodMoneyFlow {
  public static readonly type = '[Dashboard] UpdatePeriodMoneyFlow';
  constructor(public readonly moneyFlow: IMoneyFlow) {}
}

export class RemovePeriodMoneyFlow {
  public static readonly type = '[Dashboard] FetchPeriodMoneyFlow';
  constructor(public readonly id: number) {}
}

// Events
export class MoneyFlowOperationSuccess {
  public static readonly type = '[Dashboard] MoneyFlowOperationSuccess';
}
