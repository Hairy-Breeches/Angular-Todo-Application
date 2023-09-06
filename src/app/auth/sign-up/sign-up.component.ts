import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../auth/store/auth.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  authError: string = null;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((state) => {
      this.authError = state.authError;
    });
  }

  onSignUp(signUpform: NgForm): void {
    if (!signUpform.valid) return;

    this.store.dispatch(
      AuthActions.signUp({
        email: signUpform.value.email,
        password: signUpform.value.password,
        authError: null,
      })
    );
  }

  onSwitchingToLogIn(): void {
    this.router.navigate(['log-in']);
  }
}
