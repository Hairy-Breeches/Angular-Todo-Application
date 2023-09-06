import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as TodoActions from '../todo/store/todo.actions';
import * as AuthAction from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';

import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  @ViewChild('form') todoForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(TodoActions.fetchTodo());
    this.store.select('todo').subscribe((todos) => (this.todos = todos.todos));
  }

  onLogout(): void {
    this.store.dispatch(AuthAction.logOut());
  }

  onAddTodo(): void {
    const todo = this.todoForm.value.todo;

    this.store.dispatch(
      TodoActions.createTodo({ todo: todo, id: null, checked: false })
    );

    this.todoForm.reset();
  }
}
