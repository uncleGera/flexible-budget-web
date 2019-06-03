import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInPage, SignUpPage } from './pages';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInPage
  },
  {
    path: 'sign-up',
    component: SignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule {}
