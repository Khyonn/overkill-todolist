import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoListRules } from '@shared/business-domain/TodoListRules';

export const featureAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo) => todo.id,
  sortComparer: TodoListRules.todoListSorter,
});

export interface State extends EntityState<Todo> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null,
});
