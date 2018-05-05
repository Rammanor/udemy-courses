import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service.js';

@Component({
  selector: 'my-app',
  template: `
  <h1>NodeTodo</h1>
  <ul>
    <li *ngFor="let todo of todos">
      {{todo.todo}} - {{todo.is_done}}
    </li>
  </ul>`,
  providers: [ TodoService ]
})
export class AppComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().then((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }
}
