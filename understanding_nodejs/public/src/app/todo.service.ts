import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private todosURL = '/api/todos/test';

  constructor (
    private http: Http
  ) {}

  getTodos(): Promise<Todo[]> {
    return this.http.get(this.todosURL)
      .toPromise()
      .then((response) => {
        return response.json() as Todo[];
      }
    );
  }
};
