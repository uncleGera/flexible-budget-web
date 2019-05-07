import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { SetUpComponent } from './components';
import { SetUpRoutingModule } from './set-up-routing.module';
import { SetUpService } from './shared/set-up.service';

@NgModule({
  imports: [SharedModule, SetUpRoutingModule],
  declarations: [SetUpComponent],
  providers: [SetUpService]
})
export class SetUpModule {}
