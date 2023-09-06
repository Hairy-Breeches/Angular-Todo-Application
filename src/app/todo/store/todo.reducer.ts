import { createReducer, on } from '@ngrx/store';

import * as TodoActions from '../../todo/store/todo.actions';

export interface State {
  todos: {
    todo: string;
    checked: boolean;
    id: string;
  }[];
}

const initialState: State = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.createTodo, (state, actionState) => {
    let stateCopy = structuredClone(state);

    stateCopy.todos.push(actionState);

    return stateCopy;
  }),
  on(TodoActions.deleteTodo, (state, actionState) => {
    const stateCopy = structuredClone(state);

    stateCopy.todos = stateCopy.todos.filter((todo) => {
      return actionState.id != todo.id;
    });

    return stateCopy;
  }),
  on(TodoActions.checkTodo, (state, actionState) => {
    const stateCopy = structuredClone(state);

    stateCopy.todos.map((todo) => {
      if (todo.id === actionState.id) todo.checked = !todo.checked;
    });

    return stateCopy;
  }),
  on(TodoActions.setTodos, (state, actionState) => {
    const stateCopy = structuredClone(state);
    stateCopy.todos = actionState.payload;

    return stateCopy;
  }),
  on(TodoActions.authenticationError, (state, actionState) => {
    return { ...state };
  })
);
