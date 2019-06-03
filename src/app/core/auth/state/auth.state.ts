import { MatSnackBar } from '@angular/material';
import { IError, IUser } from '@lib/interfaces';
import { Navigate } from '@ngxs/router-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';
import {
  CheckSession,
  Logout,
  RemoveUser,
  SignIn,
  SignInFailed,
  SignInRedirect,
  SignInSuccess,
  SignUp
} from './auth.actions';
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
      ctx.dispatch(new SignInRedirect());
      return;
    }

    return this.authService.checkSession().pipe(
      catchError(error => {
        ctx.dispatch(new Logout());
        return throwError(error);
      })
    );
  }

  @Action(SignIn)
  public signIn(ctx: StateContext<AuthStateModel>, { params }: SignIn) {
    ctx.patchState({ loading: true });

    return this.authService.login(params).pipe(
      filter(user => !!user),
      tap((user: IUser) => ctx.dispatch(new SignInSuccess(user))),
      catchError((errors: IError[]) => {
        ctx.dispatch(new SignInFailed(errors));
        return throwError(errors);
      })
    );
  }

  @Action(SignUp)
  public signUp(ctx: StateContext<AuthStateModel>, { params }: SignUp) {
    ctx.patchState({ loading: true });

    return this.authService.login(params).pipe(
      filter(user => !!user),
      tap((user: IUser) => ctx.dispatch(new SignInSuccess(user))),
      catchError((errors: IError[]) => {
        this.snackBar.open('Не удалось зарегистрироваться');
        ctx.patchState({ loading: false });
        return throwError(errors);
      })
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>) {
    this.snackBar.open('До свидания!');
    ctx.dispatch([new RemoveUser(), new SignInRedirect()]);
  }

  @Action(RemoveUser)
  public removeUser(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ user: null });
  }

  /**
   * Events
   */
  @Action(SignInRedirect)
  public onSignInRedirect(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new Navigate(['/auth/sign-in']));
  }

  @Action(SignInSuccess)
  public onSignInSuccess(ctx: StateContext<AuthStateModel>) {
    this.snackBar.open('Добро пожаловать!');
    ctx.dispatch(new Navigate(['/']));
  }

  @Action(SignInSuccess)
  public setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, { user }: SignInSuccess) {
    ctx.patchState({ user, loading: false });
  }

  @Action(SignInFailed)
  public onSignInFailed(ctx: StateContext<AuthStateModel>, { errors }: SignInFailed) {
    this.snackBar.open('Не удалось войти');
    ctx.patchState({ loading: false });
    ctx.dispatch(new RemoveUser());
    return throwError(errors);
  }
}
