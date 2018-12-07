import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateLayoutComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: '../set-up/set-up.module#SetUpModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {}
