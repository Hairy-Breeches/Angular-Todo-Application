import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent implements OnInit {
  storeSubsScription: Subscription;
  authError: string;

  constructor(private router: Router, private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
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
    this.router.navigate(['sign-up']);
  }
}
