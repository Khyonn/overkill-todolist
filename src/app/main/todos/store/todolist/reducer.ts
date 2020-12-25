import { createReducer, on } from '@ngrx/store';
import { Todo } from '@shared/business/model/Todo';
import { startLoading, dataLoaded, loadingFailed } from './actions';

export type State = Todo[];

const initialState: State = [];

export const todoListReducer = createReducer(
  initialState,
  on(startLoading, (state) => state),
  on(dataLoaded, (state, { todos }) => todos),
  on(loadingFailed, (state) => state)
);
