import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { NgForm } from '@angular/forms';
import { Todo } from './todo.model';
import { TodoDataStorageService } from './todoDataStorage.service';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  url: string = 'http://localhost:3000/api/todos';
  @ViewChild('form') todoForm: NgForm;
  updatedTodosSubscription: Subscription;

  constructor(
    private todoDataStorageService: TodoDataStorageService,
    private todoService: TodoService,
  ) {}

  ngOnInit() {
    this.todoDataStorageService
      .fetchTodos(this.url)
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
                return { checked: todo.checked, id: todo._id, todo: todo.todo };
              }),
            };
          }
        )
      )
      .subscribe(responseData => {
        this.todoService.setTodos(responseData.todos)
        this.todos = responseData.todos;

      });

    this.updatedTodosSubscription = this.todoService.updatedTodos.subscribe(
      todos => {
        console.log('triggered: ', this.todos)
        this.todos = todos;
        console.log('triggered-after: ', this.todos)
      }
    );
  }

  onLogout(): void {
  }

  onAddTodo(): void {
    const todo = this.todoForm.value;

    this.todoDataStorageService.createTodo(this.url, todo).subscribe(responseData => {
      this.todos.push({id: responseData.todo._id, checked: responseData.todo.checked, todo: responseData.todo.todo})
    });

    this.todoForm.reset();
  }

  ngOnDestroy(): void {
    this.updatedTodosSubscription.unsubscribe();
  }
}
