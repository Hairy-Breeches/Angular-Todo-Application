import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';

import { Todo } from '../todo.model';

export const onCreateTodo = createAction(
  '[Todo] On Create Todo',
  props<Todo>()
);

export const createTodo = createAction('[Todo] Create Todo', props<Todo>());

export const onDeleteTodo = createAction(
  '[Todo] On Delete Todo',
  props<{ id: string }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);

export const onCheckTodo = createAction(
  '[Todo] On Check todo',
  props<{ id: string }>()
);

export const checkTodo = createAction(
  '[Todo] Check Todo',
  props<{ id: string }>()
);

export const setTodos = createAction(
  '[Todo] Set Todo',
  props<{ payload: Todo[] }>()
);

export const fetchTodo = createAction('[Todo] Fetch Todo');

export const serverError = createAction(
  '[Todo] Authentication Error',
  props<{ message: string }>()
);
