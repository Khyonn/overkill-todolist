import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo, DescribedTodo } from '@shared/business-domain/model/Todo';
import { Observable, of } from 'rxjs';
import { tap, throwIfEmpty } from 'rxjs/operators';

export const mockBackEnd = new Map<number, Todo>();

@Injectable()
export class TodoHttpService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('assets/mocks/todos.json').pipe(
      tap((todos) => {
        todos.forEach((todo) => mockBackEnd.set(todo.id, { ...todo }));
      })
    );
  }

  getTodo(id: number): Observable<DescribedTodo> {
    return of(mockBackEnd.get(id)).pipe(throwIfEmpty());
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return of(mockBackEnd.set(todo.id, { ...todo }).get(todo.id));
  }

  createTodo(todo: DescribedTodo): Observable<DescribedTodo> {
    const id = Math.max(0, ...mockBackEnd.keys()) + 1;
    return of(mockBackEnd.set(id, { ...todo, id }).get(id));
  }
}
