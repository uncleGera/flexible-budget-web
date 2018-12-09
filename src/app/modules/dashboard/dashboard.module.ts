import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { EditDialogModule } from '@app/ui/edit-dialog';
import { NgxsModule } from '@ngxs/store';

import {
  DashboardHeaderComponent,
  DaysTableComponent,
  MoneyFlowDialogComponent,
  MoneyFlowsTableComponent
} from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages';
import { DashboardResolver, DashboardService } from './shared';
import { DashboardState } from './state';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, NgxsModule.forFeature([DashboardState]), EditDialogModule],
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
