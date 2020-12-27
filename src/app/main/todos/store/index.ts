import { ActionReducerMap } from '@ngrx/store';
import { State } from './state';
import * as fromTodoList from '@todos/store/todolist';

export { todosFeatureKey } from './selectors';
export { State };

export const todosReducerMap: ActionReducerMap<State> = {
  todoList: fromTodoList.todoListReducer,
};
