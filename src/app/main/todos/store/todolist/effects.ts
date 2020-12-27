import { Injectable } from '@angular/core';
import { TodoHttpService } from '@todos/services/todo-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import {
  listDataLoaded,
  listLoadingFailed,
  startLoadingList,
  startLoadingTodo,
  todoLoaded,
  todoLoadingFailed,
  startUpdateTodoState,
  todoStateUpdated,
  todoStateUpdateFailed,
  createTodo,
  todoCreated,
  todoCreationFailed,
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
          catchError(() => of(listLoadingFailed({ error: 'Failed to load todos' })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(startUpdateTodoState),
      mergeMap(({ todoToUpdate, isDone }) => {
        const todo = { ...todoToUpdate, state: isDone ? TodoState.DONE : TodoState.TODO };

        return this.todoService.updateTodo(todo).pipe(
          map((updatedTodo) => todoStateUpdated({ updatedTodo })),
          catchError(() => of(todoStateUpdateFailed({ error: 'Failed to update todo' })))
        );
      })
    )
  );

  loadTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(startLoadingTodo),
      mergeMap(({ todoId }) => {
        return this.todoService.getTodo(todoId).pipe(
          map((todo) => todoLoaded({ todo })),
          catchError(() => of(todoLoadingFailed({ error: 'Failed to retrieve todo' })))
        );
      })
    )
  );

  createTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(createTodo),
      mergeMap(({ todoToCreate }) => {
        return this.todoService.createTodo(todoToCreate).pipe(
          map((createdTodo) => todoCreated({ createdTodo })),
          catchError(() => of(todoCreationFailed({ error: 'Failed to create todo' })))
        );
      })
    )
  );

  constructor(private action$: Actions, private todoService: TodoHttpService) {}
}
