import * as fromRouter from '@ngrx/router-store';
import * as fromTodos from '@todos/store';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  [fromTodos.todosFeatureKey]?: fromTodos.State;
}
