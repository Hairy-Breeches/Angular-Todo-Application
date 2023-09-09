import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import * as TodoActions from '../../todo/store/todo.actions';
import * as fromApp from '../../store/app.reducer';

import { environment } from 'environments/environment';

import { Todo } from '../todo.model';

const BACKEND_URL = environment.apiUrl + 'todos/';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  addTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.onCreateTodo),
      switchMap((action) => {
        return this.http
          .post<{
            message: string;
            todo: {
              checked: boolean;
              todo: string;
              creator: string;
              __v: number;
              _id: string;
            };
          }>(BACKEND_URL + 'create-todo', {
            todo: action.todo,
            checked: action.checked,
          })
          .pipe(
            map((responseData) => {
              const todo = new Todo(
                responseData.todo.checked,
                responseData.todo._id,
                responseData.todo.todo
              );

              return TodoActions.createTodo(todo);
            }),
            catchError((err) => {
              return of(TodoActions.serverError(err.message));
            })
          );
      })
    )
  );

  fetchTodos = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.fetchTodo),
      switchMap(() => {
        return this.http
          .get<{
            message: string;
            todos: {
              _id: string;
              checked: boolean;
              todo: string;
              __v: number;
            }[];
          }>(BACKEND_URL + 'get-todos')
          .pipe(
            map(
              (responseData: {
                message: string;
                todos: {
                  _id: string;
                  checked: boolean;
                  todo: string;
                  __v: number;
                }[];
              }) => {
                return {
                  message: responseData.message,
                  todos: responseData.todos.map((todo) => {
                    return new Todo(todo.checked, todo._id, todo.todo);
                  }),
                };
              }
            ),
            map((responseData) => {
              return TodoActions.setTodos({ payload: responseData.todos });
            }),
            catchError((err) => {
              return of(TodoActions.serverError(err.message));
            })
          );
      })
    )
  );

  todoChecked = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.onCheckTodo),
      withLatestFrom(this.store.select('todo')),
      switchMap(([action, state]) => {
        const todo: Todo = state.todos.find((todo) => todo.id === action.id);

        return this.http
          .put<{
            message: string;
            todos: {
              _id: string;
              checked: boolean;
              todo: string;
              __v: number;
            }[];
          }>(
            BACKEND_URL + 'todo-check' + '/?',
            {
              todoItem: todo,
              checked: !todo.checked,
            },
            {
              params: new HttpParams().set('id', todo.id),
            }
          )
          .pipe(
            map(() => {
              return TodoActions.checkTodo({ id: action.id });
            }),
            catchError((err) => {
              return of(TodoActions.serverError(err));
            })
          );
      })
    )
  );

  todoDelete = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.onDeleteTodo),
      switchMap((action) => {
        return this.http
          .delete<{ message: string }>(BACKEND_URL + 'todo-delete', {
            params: new HttpParams().set('id', action.id),
          })
          .pipe(
            map(() => {
              return TodoActions.deleteTodo({ id: action.id });
            }),
            catchError((err) => {
              return of(TodoActions.serverError(err));
            })
          );
      })
    )
  );
}
