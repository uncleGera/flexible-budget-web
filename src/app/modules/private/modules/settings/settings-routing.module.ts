import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeriodsSettingsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: PeriodsSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
