import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { User } from '../user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSignUp(signUpform: NgForm): void {
    if (!signUpform.valid) return;

    const user = new User(signUpform.value.email, signUpform.value.password);
    this.authService.signUp(user);
  }

  onSwitchingToLogIn(): void {
    this.router.navigate(['log-in']);
  }
}
