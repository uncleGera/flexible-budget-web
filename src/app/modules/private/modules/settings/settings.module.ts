import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgxsModule } from '@ngxs/store';

import { PeriodsCalendarComponent } from './components';
import { SettingsPage } from './pages';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsService } from './shared';
import { SettingsState } from './state';

@NgModule({
  imports: [SharedModule, SettingsRoutingModule, NgxsModule.forFeature([SettingsState])],
  declarations: [SettingsPage, PeriodsCalendarComponent],
  providers: [SettingsService]
})
export class SettingsModule {}
