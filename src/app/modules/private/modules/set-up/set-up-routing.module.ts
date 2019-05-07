import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetUpComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SetUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetUpRoutingModule {}
