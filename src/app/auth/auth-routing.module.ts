import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LogInComponent } from './log-in/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const authRoutes: Route[] = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
