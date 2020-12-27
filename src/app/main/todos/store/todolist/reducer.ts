import { createReducer, on } from '@ngrx/store';
import { Todo } from '@shared/business-domain/model/Todo';
import {
  startLoadingList,
  listDataLoaded,
  listLoadingFailed,
  startUpdateTodoState,
  todoStateUpdated,
  todoStateUpdateFailed,
} from './actions';
import { State, initialState, featureAdapter } from './state';

const setIsLoading = (state: State): State => ({ ...state, isLoading: true });
const setError = (state: State, { error }: { error: string }): State => ({ ...state, error });
const setNoLoadingOrError = (state: State): State => ({ ...state, isLoading: false, error: null });

export const todoListReducer = createReducer(
  initialState,
  on(startLoadingList, setIsLoading),
  on(listDataLoaded, (state, { todos }) => featureAdapter.addMany(todos, setNoLoadingOrError(state))),
  on(listLoadingFailed, setError),
  on(startUpdateTodoState, setIsLoading),
  on(todoStateUpdated, (state, { updatedTodo }) => {
    state = setNoLoadingOrError(state);
    if (Todo.isDone(updatedTodo)) {
      return {
        ...state,
        ids: [...(state.ids as number[]).filter((id) => id !== updatedTodo.id), updatedTodo.id],
        entities: {
          ...state.entities,
          [updatedTodo.id]: updatedTodo,
        },
      };
    }
    return {
      ...state,
      entities: {
        ...state.entities,
        [updatedTodo.id]: updatedTodo,
      },
    };
  }),
  on(todoStateUpdateFailed, setError)
);
