import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import * as AuthActions from '../../auth/store/auth.actions';

import { environment } from 'environments/environment';

import { User } from '../user.model';

import { AuthService } from '../auth.service';

const BACKEND_URL = environment.apiUrl + 'user/';

@Injectable()
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  signUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((action) => {
        const user = new User(action.email, action.password);

        return this.http
          .post<{ message: string }>(BACKEND_URL + 'sign-up', user)
          .pipe(
            map((responseData) => {
              return AuthActions.authSuccess(responseData);
            }),
            catchError((err: HttpErrorResponse) => {
              return of(AuthActions.authFailed(err.error));
            })
          );
      })
    )
  );

  logIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      switchMap((action) => {
        const user = new User(action.email, action.password);

        return this.http
          .post<{ message: string; token: string; expiresIn: number }>(
            BACKEND_URL + 'log-in',
            user
          )
          .pipe(
            map((responseData) => {
              this.authService.setTimer(responseData.expiresIn);

              return AuthActions.loginSuccess({
                token: responseData.token,
                expirationDuration: responseData.expiresIn,
                authenticated: true,
              });
            }),
            catchError((err: HttpErrorResponse) => {
              console.log(err);
              return of(AuthActions.authFailed(err.error));
            })
          );
      })
    )
  );

  localStorage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map((action) => {
          localStorage.setItem('token', action.token);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + action.expirationDuration * 1000
          );
          localStorage.setItem('expiresIn', expirationDate.toISOString());
        })
      ),
    {
      dispatch: false,
    }
  );

  loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(() => {
          this.router.navigate(['todos']);
        })
      ),
    {
      dispatch: false,
    }
  );

  logOut = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logOut),
        map(() => {
          this.authService.clearTimer();

          localStorage.removeItem('token');
          localStorage.removeItem('expiresIn');

          this.router.navigate(['log-in']);
        })
      ),
    {
      dispatch: false,
    }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoAuth),
      map(() => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expiresIn'));

        if (!token && !expirationDate) return { type: 'DUMMY' };

        const now = new Date();
        const expiresInDuration = expirationDate.getTime() - now.getTime();

        if (expiresInDuration > 0) {
          return AuthActions.setAutoAuth({
            token: token,
            expirationDuration: expiresInDuration,
            authenticated: true,
          });
        } else {
          return { type: 'DUMMY!' };
        }
      })
    )
  );
}
