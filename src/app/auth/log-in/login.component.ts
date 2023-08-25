import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../user.model';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogIn(logInForm: NgForm): void {
    if (!logInForm.valid) return;

    const user = new User(logInForm.value.email, logInForm.value.password);
    this.authService.logIn(user);
  }

  onSwitchingToSignUp(): void {
    this.router.navigate(['sign-up']);
  }
}
