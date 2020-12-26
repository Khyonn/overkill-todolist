import { createAction, props } from '@ngrx/store';
import { Todo } from '@shared/business/model/Todo';

export const startLoading = createAction('[TodoList] Start loading');
export const dataLoaded = createAction('[TodoList] Data loaded', props<{ todos: Todo[] }>());
export const loadingFailed = createAction('[TodoList] Loading failed');
