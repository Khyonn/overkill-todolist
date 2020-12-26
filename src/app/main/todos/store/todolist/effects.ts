import { Injectable } from '@angular/core';
import { TodoHttpService } from '@todos/services/todo-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  listDataLoaded,
  listLoadingFailed,
  startLoadingList,
  startUpdateTodoState,
  todoStateUpdated,
  todoStateUpdateFailed,
} from './actions';
import { TodoState } from '@shared/business-domain/model/TodoState';

@Injectable()
export class TodoListEffects {
  setTodoList$ = createEffect(() =>
    this.action$.pipe(
      ofType(startLoadingList),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => listDataLoaded({ todos })),
          catchError(() => of(listLoadingFailed()))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(startUpdateTodoState),
      mergeMap(({ todoToUpdate, isDone }) =>
        this.todoService.updateTodo({ ...todoToUpdate, state: isDone ? TodoState.DONE : TodoState.TODO }).pipe(
          map((updatedTodo) => todoStateUpdated({ updatedTodo })),
          catchError(() => of(todoStateUpdateFailed()))
        )
      )
    )
  );

  constructor(private action$: Actions, private todoService: TodoHttpService) {}
}
