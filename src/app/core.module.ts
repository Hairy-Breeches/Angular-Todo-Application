import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthInterceptor } from './auth/auth.interceptor';

import { AuthGuard } from './route.guards';

@NgModule({
  providers: [
    { useClass: AuthInterceptor, multi: true, provide: HTTP_INTERCEPTORS },
    AuthGuard,
  ],
})
export class CoreModule {}
