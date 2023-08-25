import { NgModule } from '@angular/core';

import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [TodoComponent, TodoListComponent],
  imports: [TodoRoutingModule, FormsModule, CommonModule],
})
export class TodoModule {}
