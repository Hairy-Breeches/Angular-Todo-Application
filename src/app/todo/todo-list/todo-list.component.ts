import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/../../store/app.reducer';

import * as TodoActions from '../../todo/store/todo.actions';

import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  @Input() todoItem: Todo;
  id: number;
  error: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('todo').subscribe((state) => {
      this.error = this.error;
    });
  }

  onDeleteTodo(): void {
    this.store.dispatch(TodoActions.onDeleteTodo({ id: this.todoItem.id }));
  }

  onTodoChecked(): void {
    this.store.dispatch(TodoActions.onCheckTodo({ id: this.todoItem.id }));
  }
}
