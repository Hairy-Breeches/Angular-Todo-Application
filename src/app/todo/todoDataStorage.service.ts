import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { TodoService } from './todo.service';

import { Todo } from './todo.model';

import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + 'todos/';

@Injectable({ providedIn: 'root' })
export class TodoDataStorageService {
  constructor(private http: HttpClient, private todoService: TodoService) {}

  createTodo(todo: { todo: string }) {
    return this.http.post<{
      message: string;
      todo: {
        checked: boolean;
        todo: string;
        creator: string;
        __v: number;
        _id: string;
      };
    }>(BACKEND_URL + 'create-todo', { ...todo, checked: false });
  }

  fetchTodos() {
    return this.http.get<{
      message: string;
      todos: { _id: string; checked: boolean; todo: string; __v: number }[];
    }>(BACKEND_URL + 'get-todos');
  }

  deleteTodo(id: string): void {
    this.http
      .delete<{ message: string }>(BACKEND_URL + 'todo-delete', {
        params: new HttpParams().set('id', id),
      })
      .subscribe({
        next: () => {
          this.todoService.deleteTodo(id);
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
  }

  checkTodo(todoChecked: boolean, todoItem: Todo) {
    return this.http.put(
      BACKEND_URL + 'todo-check' + '/?',
      {
        todoItem: todoItem,
        checked: todoChecked,
      },
      {
        params: new HttpParams().set('id', todoItem.id),
      }
    );
  }
}
