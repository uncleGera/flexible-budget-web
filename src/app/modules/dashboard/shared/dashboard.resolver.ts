import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';

import { FetchPeriods } from '../state/dashboard.actions';

@Injectable()
export class DashboardResolver implements Resolve<any> {
  constructor(private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot) {
    const id = +route.paramMap.get('id');

    return this.store.dispatch(new FetchPeriods(id || null));
  }
}
