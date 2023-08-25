import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user.model';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent {
  constructor(private authService: AuthService) {}

  onLogIn(logInForm: NgForm): void {
    if (!logInForm.valid) return;

    const user = new User(logInForm.value.email, logInForm.value.password);
    this.authService.logIn(user);
  }
}
