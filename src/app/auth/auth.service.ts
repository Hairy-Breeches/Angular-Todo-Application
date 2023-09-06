import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  timerRef: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setTimer(duration: number) {
    this.timerRef = setTimeout(() => {
      this.store.dispatch(AuthActions.logOut());
    }, duration * 1000);
  }

  clearTimer() {
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
  }
}
