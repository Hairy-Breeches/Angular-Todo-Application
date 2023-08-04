import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    OnInit,
  } from '@angular/core';
  
  import { Todo } from '../todo.model';
  import { TodoDataStorageService } from '../todoDataStorage.service';
  
  @Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
  })
  export class TodoListComponent implements OnInit {
    @ViewChild('checkbox') checkboxInput: ElementRef;
    @Input() todoItem: Todo;
    todoChecked: boolean = false;
    url = 'http://localhost:3000/api/todos/';
  
    constructor(
      private todoDataStorageService: TodoDataStorageService
    ) {}
  
    ngOnInit(): void {
      this.todoChecked = this.todoItem.checked
    }
  
    onDeleteTodo(id: string): void {
      this.todoDataStorageService.deleteTodo(id, this.url);
  
    }
  
    onTodoChecked(): void {
      this.todoChecked = this.checkboxInput.nativeElement.checked;
      this.todoDataStorageService.checkTodo(this.url, this.todoChecked, this.todoItem);
    }
  }
  