import { ISessionParams } from '@app/modules/session/shared';
import { IError, IUser } from '@lib/interfaces';

// Actions
export class SignIn {
  public static readonly type = '[Auth] SignIn';
  constructor(public readonly params: ISessionParams) {}
}

export class SignUp {
  public static readonly type = '[Auth] SignUp';
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
export class SignInRedirect {
  public static readonly type = '[Auth] SignInRedirect';
}

export class SignInSuccess {
  public static readonly type = '[Auth] SignInSuccess';
  constructor(public readonly user: IUser) {}
}

export class SignInFailed {
  public static readonly type = '[Auth] SignInFailed';
  constructor(public readonly errors: IError[]) {}
}
