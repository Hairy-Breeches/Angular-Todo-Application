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
    
    constructor(
      private todoDataStorageService: TodoDataStorageService
    ) {}
  
    ngOnInit(): void {
      this.todoChecked = this.todoItem.checked
    }
  
    onDeleteTodo(id: string): void {
      const url = 'http://localhost:3000/api/todos/delete-todo';
  

      this.todoDataStorageService.deleteTodo(id, url);
  
    }
  
    onTodoChecked(): void {
      const url = 'http://localhost:3000/api/todos/todo-check';
      
      this.todoDataStorageService.checkTodo(url, !this.todoChecked, this.todoItem)
      .subscribe({
        next: ()  => {

          this.todoChecked = this.checkboxInput.nativeElement.checked;  
          this.todoDataStorageService.checkTodo(url, this.todoChecked, this.todoItem);
        },
        error: err => {

          console.log('Error: ', err.message);
        },
      });
    }
  }
  