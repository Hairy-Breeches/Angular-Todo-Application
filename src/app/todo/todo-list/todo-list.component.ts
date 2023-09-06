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

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  onDeleteTodo(): void {
    this.store.dispatch(TodoActions.deleteTodo({ id: this.todoItem.id }));
  }

  onTodoChecked(): void {
    this.store.dispatch(TodoActions.checkTodo({ id: this.todoItem.id }));
  }
}
