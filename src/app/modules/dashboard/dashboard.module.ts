import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { EditDialogModule } from '@app/ui/edit-dialog';
import { NgxsModule } from '@ngxs/store';

import { DaysTableComponent, MoneyFlowDialogComponent, MoneyFlowsTableComponent, PeriodInfoComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages';
import { DashboardResolver, MoneyFlowsService, PeriodMoneyFlowsService, PeriodsService } from './shared';
import { DashboardState } from './state';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, NgxsModule.forFeature([DashboardState]), EditDialogModule],
  declarations: [
    DashboardComponent,
    PeriodInfoComponent,
    MoneyFlowsTableComponent,
    DaysTableComponent,
    MoneyFlowDialogComponent
  ],
  providers: [DashboardResolver, PeriodsService, MoneyFlowsService, PeriodMoneyFlowsService],
  entryComponents: [MoneyFlowDialogComponent]
})
export class DashboardModule {}
