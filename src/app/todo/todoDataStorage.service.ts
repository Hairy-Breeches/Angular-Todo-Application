import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { TodoService } from './todo.service';
import { AuthService } from '../auth/auth.service';

import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoDataStorageService {
  constructor(private http: HttpClient, private todoService: TodoService, private authService: AuthService) { }

  createTodo(url: string, todo: { todo: string }) {
    
    return this.http.post<{
      message: string;
      todo: { checked: boolean; todo: string; __v: number; _id: string };

    }>(url, { ...todo, checked: false });
  }

  fetchTodos(url: string) {
    
    return this.http.get<{
      message: string;
      todos: { _id: string; checked: boolean; todo: string; __v: number }[];

    }>(url);
  }

  deleteTodo(url: string, id: string): void {
    this.http
      .delete<{message: string}>(
        url,
        {
          params: new HttpParams().set('id', id)
        }
      )
      .subscribe({
        next: responseData => {
          this.todoService.deleteTodo(id);
          
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
  }

  checkTodo(url: string, todoChecked: boolean, todoItem: Todo) {
    
    return this.http
      .put(
        url + '/?',
        {
          todoItem: todoItem,
          checked: todoChecked
        },
        {
          params: new HttpParams().set('id', todoItem.id)
        }
      )
      
  }
}
