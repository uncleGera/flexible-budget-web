import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';

import { FetchPeriods } from '../state/dashboard.actions';

@Injectable()
export class DashboardResolver implements Resolve<any> {
  constructor(private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.store.dispatch(new FetchPeriods());
  }
}
