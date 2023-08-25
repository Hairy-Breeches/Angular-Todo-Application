import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Todo } from '../todo.model';
import { TodoDataStorageService } from '../todoDataStorage.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  @ViewChild('checkbox') checkboxInput: ElementRef;
  @Input() todoItem: Todo;
  todoChecked: boolean = false;

  constructor(private todoDataStorageService: TodoDataStorageService) {}

  ngOnInit(): void {
    this.todoChecked = this.todoItem.checked;
  }

  onDeleteTodo(id: string): void {
    this.todoDataStorageService.deleteTodo(id);
  }

  onTodoChecked(): void {
    this.todoDataStorageService
      .checkTodo(!this.todoChecked, this.todoItem)
      .subscribe({
        next: () => {
          this.todoChecked = this.checkboxInput.nativeElement.checked;
          this.todoDataStorageService.checkTodo(
            this.todoChecked,
            this.todoItem
          );
        },
        error: (err) => {
          console.log('Error: ', err.message);
        },
      });
  }
}
