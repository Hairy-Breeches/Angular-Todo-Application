import { createReducer, on } from '@ngrx/store';

import * as AuthActions from '../../auth/store/auth.actions';

export interface State {
  email: string;
  password: string;
  authenticated: boolean;
  authError: string;
  authSuccess: string;
  token: string;
  expirationDuration: number;
}

const initialState: State = {
  email: null,
  password: null,
  authenticated: false,
  authError: null,
  authSuccess: null,
  token: null,
  expirationDuration: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authSuccess, (state, actionState) => {
    return {
      ...state,
      authSuccess: actionState.message,
    };
  }),
  on(AuthActions.authFailed, (state, actionState) => {
    return {
      ...state,
      authError: actionState.message,
    };
  }),
  on(AuthActions.loginSuccess, (state, actionState) => {
    return {
      ...state,
      ...actionState,
    };
  }),
  on(AuthActions.logOut, (state) => {
    return {
      email: null,
      password: null,
      authError: null,
      authSuccess: null,
      authenticated: false,
      token: null,
      expirationDuration: null,
    };
  }),
  on(AuthActions.setAutoAuth, (state, actionState) => {
    return {
      ...state,
      ...actionState,
    };
  }),
  on(AuthActions.clearState, (action, actionState) => {
    return actionState;
  })
);
