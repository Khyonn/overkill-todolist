import { createFeatureSelector } from '@ngrx/store';
import { State } from './state';

export const todosFeatureKey = 'todosFeature';
export const selectTodosFeature = createFeatureSelector<State>(todosFeatureKey);
