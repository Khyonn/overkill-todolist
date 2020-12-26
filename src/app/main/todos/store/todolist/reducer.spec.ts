import { Action } from '@ngrx/store';
import { Todo } from '@shared/business/model/Todo';
import { dataLoaded, loadingFailed, startLoading } from './actions';
import { State, todoListReducer } from './reducer';

describe('todoListReducer', () => {
  let state: State;
  const dispatch = (action: Action) => {
    state = todoListReducer(state, action);
  };

  beforeEach(() => {
    state = [];
  });

  describe('startLoading', () => {
    it('should not edit the state', () => {
      const oldState = state;

      dispatch(startLoading());
      expect(oldState).toBe(state);
    });
  });

  describe('dataLoaded', () => {
    it('should not edit the state', () => {
      const oldState = state;
      const todos = [new Todo()];

      dispatch(dataLoaded({ todos }));
      expect(oldState).not.toBe(state);
      expect(state).toHaveSize(1);
    });
  });

  describe('loadingFailed', () => {
    it('should not edit the state', () => {
      const oldState = state;

      dispatch(loadingFailed());
      expect(oldState).toBe(state);
    });
  });
});
