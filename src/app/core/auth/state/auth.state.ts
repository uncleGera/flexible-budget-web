import { MatSnackBar } from '@angular/material';
import { IError, IUser } from '@lib/interfaces';
import { Navigate } from '@ngxs/router-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';
import { CheckSession, Login, LoginFailed, LoginRedirect, LoginSuccess, Logout, RemoveUser } from './auth.actions';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    loading: false
  }
})
export class AuthState implements NgxsOnInit {
  @Selector()
  public static user({ user }: AuthStateModel) {
    return user;
  }

  @Selector()
  public static loading({ loading }: AuthStateModel) {
    return loading;
  }

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  /**
   * Dispatch CheckSession on start
   */
  public ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckSession());
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  public checkSession(ctx: StateContext<AuthStateModel>) {
    const { user } = ctx.getState();

    if (!user) {
      ctx.dispatch(new LoginRedirect());
      return;
    }

    return this.authService.checkSession().pipe(
      catchError(error => {
        ctx.dispatch(new Logout());
        return throwError(error);
      })
    );
  }

  @Action(Login)
  public login(ctx: StateContext<AuthStateModel>, { params }: Login) {
    ctx.patchState({ loading: true });

    return this.authService.login(params).pipe(
      filter(user => !!user),
      tap((user: IUser) => ctx.dispatch(new LoginSuccess(user))),
      catchError((errors: IError[]) => {
        ctx.dispatch(new LoginFailed(errors));
        return throwError(errors);
      })
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>) {
    this.snackBar.open('До свидания!');
    ctx.dispatch([new RemoveUser(), new LoginRedirect()]);
  }

  @Action(RemoveUser)
  public removeUser(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ user: null });
  }

  /**
   * Events
   */
  @Action(LoginRedirect)
  public onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new Navigate(['/auth/sign-in']));
  }

  @Action(LoginSuccess)
  public onLoginSuccess(ctx: StateContext<AuthStateModel>) {
    this.snackBar.open('Добро пожаловать!');
    ctx.dispatch(new Navigate(['/']));
  }

  @Action(LoginSuccess)
  public setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, { user }: LoginSuccess) {
    ctx.patchState({ user, loading: false });
  }

  @Action(LoginFailed)
  public onLoginFailed(ctx: StateContext<AuthStateModel>, { errors }: LoginFailed) {
    this.snackBar.open('Не удалось войти');
    ctx.patchState({ loading: false });
    ctx.dispatch(new RemoveUser());
    return throwError(errors);
  }
}
