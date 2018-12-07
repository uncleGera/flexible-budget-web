import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'private',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: './modules/private/private.module#PrivateModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
