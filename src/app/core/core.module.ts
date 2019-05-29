import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { environment } from '@env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';

import { AuthService } from './auth/shared/auth.service';
import { AuthState } from './auth/state/auth.state';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({ key: 'auth' }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
      maxAge: 10
    }),
    NgxsRouterPluginModule.forRoot()
  ],
  providers: [AuthService]
})
export class CoreModule {}
