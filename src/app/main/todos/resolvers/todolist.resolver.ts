import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { startLoading } from '../store/todolist/actions';
import { selectTodoList } from '../store/todolist/selector';

@Injectable()
export class TodolistResolver implements Resolve<boolean> {
  constructor(private store: Store) {}

  resolve(): Observable<boolean> {
    this.store.dispatch(startLoading());

    return this.store.select(selectTodoList).pipe(
      take(1),
      map(() => true)
    );
  }
}
