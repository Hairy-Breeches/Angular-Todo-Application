import { createAction, props } from '@ngrx/store';

import * as fromAuth from '../../auth/store/auth.reducer';

export const signUp = createAction(
  '[Auth] SignUp',
  props<{ email: string; password: string; authError: string }>()
);

export const logIn = createAction(
  '[Auth] LogIn',
  props<{ email: string; password: string }>()
);

export const logOut = createAction('[Auth] log Out');

export const autoAuth = createAction('[Auth] Auto Auth');

export const setAutoAuth = createAction(
  '[Auth] Set Auto Auth',
  props<{ token: string; expirationDuration: number; authenticated: boolean }>()
);

export const loginSuccess = createAction(
  '[Auth] login Success',
  props<{ token: string; expirationDuration: number; authenticated: boolean }>()
);

export const clearState = createAction(
  '[Auth] Cleat State',
  props<fromAuth.State>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ message: string }>()
);

export const authFailed = createAction(
  '[Auth] Auth Fail',
  props<{ message: string }>()
);
