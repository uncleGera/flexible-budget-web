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
        loadChildren: './modules/set-up/set-up.module#SetUpModule'
      },
      {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule'
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {}
