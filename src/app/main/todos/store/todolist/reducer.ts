import { createReducer, on } from '@ngrx/store';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoListRules } from '@shared/business-domain/TodoListRules';
import {
  startLoadingList,
  listDataLoaded,
  listLoadingFailed,
  startUpdateTodoState,
  todoStateUpdated,
  todoStateUpdateFailed,
} from './actions';

export type State = Todo[];

const initialState: State = [];

const doNotEditState = (state: State) => state;

export const todoListReducer = createReducer(
  initialState,
  on(startLoadingList, doNotEditState),
  on(listDataLoaded, (state, { todos }) => [...todos].sort(TodoListRules.todoListSorter)),
  on(listLoadingFailed, doNotEditState),
  on(startUpdateTodoState, doNotEditState),
  on(todoStateUpdated, (state, { updatedTodo }) => {
    if (Todo.isDone(updatedTodo)) {
      return TodoListRules.changeTodoToDone(state, updatedTodo.id);
    }
    return state.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
  }),
  on(todoStateUpdateFailed, doNotEditState)
);
