import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgxsModule } from '@ngxs/store';

import { DashboardHeaderComponent, DaysTableComponent, MoneyFlowsTableComponent, MoneyFlowDialogComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages';
import { DashboardResolver, DashboardService } from './shared';
import { DashboardState } from './state';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, NgxsModule.forFeature([DashboardState])],
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    MoneyFlowsTableComponent,
    DaysTableComponent,
    MoneyFlowDialogComponent
  ],
  providers: [DashboardService, DashboardResolver],
  entryComponents: [MoneyFlowDialogComponent]
})
export class DashboardModule {}
