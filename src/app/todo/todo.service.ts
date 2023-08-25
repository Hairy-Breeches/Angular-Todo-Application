import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: Todo[] = [];
  updatedTodos = new Subject<Todo[]>();

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.updatedTodos.next(this.todos.slice());
  }

  getTodos(): Todo[] {
    return this.todos.slice();
  }

  setTodos(todos: Todo[]): void {
    this.todos = todos;
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updatedTodos.next(this.todos.slice());
  }
}
