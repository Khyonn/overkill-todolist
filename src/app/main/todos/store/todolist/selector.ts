import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '@shared/store/router-store';
import { featureAdapter } from './state';
import { selectTodosFeature } from '../selectors';

const { selectAll, selectEntities } = featureAdapter.getSelectors(
  createSelector(selectTodosFeature, ({ todoList }) => todoList)
);
const selectUrlTodoId = createSelector(selectRouteParam('todoId'), (todoId) => +todoId);

export const selectTodoList = selectAll;
export const selectPageTodo = createSelector(selectEntities, selectUrlTodoId, (todos, todoId) => todos[todoId]);
