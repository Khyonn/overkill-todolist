import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '@shared/store/root-state';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { startLoadingTodo } from '../store/todolist/actions';
import { selectPageTodo } from '../store/todolist/selector';

@Injectable()
export class TodoResolver implements Resolve<boolean> {
  constructor(private store: Store<State>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(startLoadingTodo({ todoId: +route.params.todoId }));

    return this.store.select(selectPageTodo).pipe(
      take(1),
      map(() => true)
    );
  }
}
