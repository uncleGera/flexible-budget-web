import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { NavbarComponent } from './components';
import { PrivateLayoutComponent } from './pages';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  imports: [SharedModule, PrivateRoutingModule],
  declarations: [PrivateLayoutComponent, NavbarComponent]
})
export class PrivateModule {}
