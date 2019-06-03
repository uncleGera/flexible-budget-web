import { Component } from '@angular/core';
import { SignIn } from '@app/core/auth/state/auth.actions';
import { AuthState } from '@app/core/auth/state/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ISessionParams } from '../../shared';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html'
})
export class SignUpPage {
  @Select(AuthState.loading)
  public loading$: Observable<boolean>;

  constructor(private store: Store) {}

  public onSubmit(params: ISessionParams) {
    this.store.dispatch(new SignIn(params));
  }
}
