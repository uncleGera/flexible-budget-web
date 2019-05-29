import { ISessionParams } from '@app/modules/session/shared';
import { IError, IUser } from '@lib/interfaces';

// Actions
export class Login {
  public static readonly type = '[Auth] Login';
  constructor(public readonly params: ISessionParams) {}
}

export class Logout {
  public static readonly type = '[Auth] Logout';
}

export class CheckSession {
  public static readonly type = '[Auth] CheckSession';
}

export class RemoveUser {
  public static readonly type = '[Auth] RemoveUser';
}

// Events
export class LoginRedirect {
  public static readonly type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  public static readonly type = '[Auth] LoginSuccess';
  constructor(public readonly user: IUser) {}
}

export class LoginFailed {
  public static readonly type = '[Auth] LoginFailed';
  constructor(public readonly errors: IError[]) {}
}
