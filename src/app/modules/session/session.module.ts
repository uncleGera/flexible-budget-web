import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SessionRoutingModule } from '@app/modules/session/session-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { SignInFormComponent, SignUpFormComponent } from './components';
import { SignInPage, SignUpPage } from './pages';

@NgModule({
  imports: [CommonModule, SharedModule, SessionRoutingModule],
  declarations: [SignInPage, SignInFormComponent, SignUpPage, SignUpFormComponent]
})
export class SessionModule {}
