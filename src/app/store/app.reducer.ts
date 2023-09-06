import { ActionReducerMap } from '@ngrx/store';

import * as fromTodo from '../todo/store/todo.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  todo: fromTodo.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  todo: fromTodo.todoReducer,
  auth: fromAuth.authReducer,
};
