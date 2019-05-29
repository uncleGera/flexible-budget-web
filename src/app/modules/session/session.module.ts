import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SessionRoutingModule } from '@app/modules/session/session-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { SignInFormComponent } from './components';
import { SignInPage } from './pages';

@NgModule({
  imports: [CommonModule, SharedModule, SessionRoutingModule],
  declarations: [SignInPage, SignInFormComponent]
})
export class SessionModule {}