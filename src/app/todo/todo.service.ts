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
    console.log('newTodo: ', newTodo)

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
    console.log('todos-before: ', this.todos)
    this.todos = this.todos.filter(todo => todo.id !== id);
    console.log('todos: ', this.todos)

    this.updatedTodos.next(this.todos.slice());
  }
}
