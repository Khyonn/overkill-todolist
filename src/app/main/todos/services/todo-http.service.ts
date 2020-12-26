import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '@shared/business-domain/model/Todo';
import { Observable, of } from 'rxjs';

@Injectable()
export class TodoHttpService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('assets/mocks/todos.json');
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return of({ ...todo });
  }
}
