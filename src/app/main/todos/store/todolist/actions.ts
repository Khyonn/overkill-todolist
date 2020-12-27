import { createAction, props } from '@ngrx/store';
import { Todo } from '@shared/business-domain/model/Todo';

export const startLoadingList = createAction('[TodoList] Start loading');
export const listDataLoaded = createAction('[TodoList] Data loaded', props<{ todos: Todo[] }>());
export const listLoadingFailed = createAction('[TodoList] Loading failed', props<{ error: string }>());

export const startLoadingTodo = createAction('[TodoList] Start loading todo', props<{ todoId: number }>());
export const todoLoaded = createAction('[TodoList] Todo loaded', props<{ todo: Todo }>());
export const todoLoadingFailed = createAction('[TodoList] Loading todo failed', props<{ error: string }>());

export const startUpdateTodoState = createAction(
  '[TodoList] Start update todo state',
  props<{ todoToUpdate: Todo; isDone: boolean }>()
);
export const todoStateUpdated = createAction('[TodoList] Todo state updated', props<{ updatedTodo: Todo }>());
export const todoStateUpdateFailed = createAction('[TodoList] Todo state update failed', props<{ error: string }>());
