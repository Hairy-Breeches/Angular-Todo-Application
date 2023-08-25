import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LogInComponent } from './log-in/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [AuthRoutingModule, FormsModule, CommonModule],
})
export class AuthModule {}
