import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { Todo } from './todo.model';

import { TodoDataStorageService } from './todoDataStorage.service';
import { TodoService } from './todo.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  @ViewChild('form') todoForm: NgForm;
  updatedTodosSubscription: Subscription;

  constructor(
    private todoDataStorageService: TodoDataStorageService,
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.todoDataStorageService
      .fetchTodos()
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
        )
      )
      .subscribe({
        next: (responseData) => {
          this.todoService.setTodos(responseData.todos);
          this.todos = this.todoService.getTodos();
        },
        error: (err) => {
          console.log('Error: ', err.message);
        },
      });

    this.updatedTodosSubscription = this.todoService.updatedTodos.subscribe(
      (todos) => {
        this.todos = todos;
      }
    );
  }

  onLogout(): void {
    this.authService.logOut();
  }

  onAddTodo(): void {
    const todo = this.todoForm.value;

    this.todoDataStorageService.createTodo(todo).subscribe({
      next: (responseData) => {
        const todo = new Todo(
          responseData.todo.checked,
          responseData.todo._id,
          responseData.todo.todo
        );

        this.todoService.addTodo(todo);
        this.todos = this.todoService.getTodos();
      },
      error: (err) => {
        console.log('Error: ', err.message);
      },
    });

    this.todoForm.reset();
  }

  ngOnDestroy(): void {
    this.updatedTodosSubscription.unsubscribe();
  }
}
