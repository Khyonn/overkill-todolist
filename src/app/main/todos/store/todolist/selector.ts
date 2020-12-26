import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodosFeature from '../reducer';

const selectState = createFeatureSelector<fromTodosFeature.TodosFeatureState>(fromTodosFeature.todosFeatureKey);

export const selectTodoList = createSelector(selectState, (state) => [...state.todoList]);
