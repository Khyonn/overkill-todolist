import { ActionReducerMap } from '@ngrx/store';

import * as fromTodoList from './todolist/reducer';

export const todosFeatureKey = 'todosFeature';

export interface TodosFeatureState {
  todoList: fromTodoList.State;
}

export const todosFeatureReducer: ActionReducerMap<TodosFeatureState> = {
  todoList: fromTodoList.todoListReducer,
};

export interface AppState {
  [todosFeatureKey]: TodosFeatureState;
}
