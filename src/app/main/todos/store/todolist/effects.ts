import { Injectable } from '@angular/core';
import { TodoHttpService } from '@todos/services/todo-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { dataLoaded, loadingFailed, startLoading } from './actions';

@Injectable()
export class TodoListEffects {
  setTodoList$ = createEffect(() =>
    this.action$.pipe(
      ofType(startLoading),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => dataLoaded({ todos })),
          catchError(() => of(loadingFailed()))
        )
      )
    )
  );

  constructor(private action$: Actions, private todoService: TodoHttpService) {}
}
