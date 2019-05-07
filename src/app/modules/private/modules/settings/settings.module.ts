import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgxsModule } from '@ngxs/store';

import { PeriodsSettingsComponent } from './components';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsService } from './shared';
import { SettingsState } from './state';

@NgModule({
  imports: [SharedModule, SettingsRoutingModule, NgxsModule.forFeature([SettingsState])],
  declarations: [PeriodsSettingsComponent],
  providers: [SettingsService]
})
export class SettingsModule {}
