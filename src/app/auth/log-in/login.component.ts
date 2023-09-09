import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent implements OnInit {
  storeSubsScription: Subscription;
  authError: string;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((state) => {
      this.authError = state.authError;
    });
  }

  onLogIn(logInForm: NgForm): void {
    if (!logInForm.valid) return;

    this.store.dispatch(
      AuthActions.logIn({
        email: logInForm.value.email,
        password: logInForm.value.password,
      })
    );
  }

  onSwitchingToSignUp(): void {
    this.store.dispatch(
      AuthActions.clearState({
        email: null,
        password: null,
        authenticated: false,
        authError: null,
        authSuccess: null,
        token: null,
        expirationDuration: null,
      })
    );
    this.router.navigate(['sign-up']);
  }
}
