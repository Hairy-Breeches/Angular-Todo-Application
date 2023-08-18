import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: Todo[] = [];
  updatedTodos = new Subject<Todo[]>();

  addTodo(todo: {
    checked: boolean;
    todo: string;
    _id: string;
    __v: number;
  }): void {
    const newTodo = new Todo(todo.checked, todo._id, todo.todo);

    this.todos.push(newTodo);
    this.updatedTodos.next(this.todos.slice());
  }

  getTodos(): Todo[] {

    return this.todos.slice();
  }

  setTodos(todos: Todo[]): void {
    this.todos = todos;
    
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.updatedTodos.next(this.todos.slice());

  }
}
