import { IMoneyFlow } from '../shared';

// Actions
export class FetchPeriod {
  public static readonly type = '[Dashboard] FetchPeriod';
  constructor(public readonly id?: number) {}
}

export class FetchMoneyFlow {
  public static readonly type = '[Dashboard] FetchMoneyFlow';
  constructor(public readonly id: number) {}
}

export class CreateMoneyFlow {
  public static readonly type = '[Dashboard] CreateMoneyFlow';
  constructor(public readonly moneyFlow: IMoneyFlow, public readonly isIncome: boolean) {}
}

export class UpdateMoneyFlow {
  public static readonly type = '[Dashboard] UpdateMoneyFlow';
  constructor(public readonly moneyFlow: IMoneyFlow, public readonly isIncome: boolean) {}
}

export class RemoveMoneyFlow {
  public static readonly type = '[Dashboard] FetchMoneyFlow';
  constructor(public readonly id: number) {}
}

// Events
export class MoneyFlowOperationSuccess {
  public static readonly type = '[Dashboard] MoneyFlowOperationSuccess';
}
