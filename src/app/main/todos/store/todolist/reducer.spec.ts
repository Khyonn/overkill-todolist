import { Action } from '@ngrx/store';
import { DescribedTodo, Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';
import {
  createTodo,
  listDataLoaded,
  listLoadingFailed,
  startLoadingList,
  startUpdateTodoState,
  todoCreated,
  todoCreationFailed,
  todoStateUpdated,
  todoStateUpdateFailed,
} from './actions';
import { State } from './state';
import { todoListReducer } from './reducer';

describe('todoListReducer', () => {
  let state: State;
  const dispatch = (action: Action) => {
    state = todoListReducer(state, action);
  };

  beforeEach(() => {
    state = todoListReducer(undefined, { type: 'init' });
  });

  describe('startLoadingList', () => {
    it('should not edit the state', () => {
      dispatch(startLoadingList());
      expect(state.isLoading).toBe(true);
    });
  });

  describe('listDataLoaded', () => {
    it('should change the state to given todos', () => {
      const oldState = state;
      const todos = [new Todo('Laundry', TodoState.DONE, 1), new Todo('Feed cats', TodoState.TODO, 2)];

      dispatch(listDataLoaded({ todos }));
      expect(oldState).not.toBe(state);
      expect(state.ids).toEqual([2, 1]);
    });
  });

  describe('listLoadingFailed', () => {
    it('should not edit the state', () => {
      dispatch(listLoadingFailed({ error: 'oops' }));
      expect(state.error).toBe('oops');
    });
  });

  describe('startUpdateTodoState', () => {
    it('should not edit the state', () => {
      dispatch(startUpdateTodoState({ isDone: false, todoToUpdate: null }));
      expect(state.isLoading).toBe(true);
    });
  });

  describe('todoStateUpdated', () => {
    it('should edit first todo to DONE and place it to the bottom', () => {
      state = {
        ids: [1, 2, 3],
        entities: {
          [1]: new Todo('Laundry', TodoState.TODO, 1),
          [2]: new Todo('Feed cats', TodoState.DONE, 2),
          [3]: new Todo('Wash dishes', TodoState.TODO, 3),
        },
      };
      const updatedTodo = { ...state.entities[1], state: TodoState.DONE };

      // update
      dispatch(todoStateUpdated({ updatedTodo }));
      expect(state.ids).toEqual([2, 3, 1]);
      expect(state.entities[1].state).toBe(TodoState.DONE);
    });

    it('should edit second todo to TODO but not change the place', () => {
      // init
      state = {
        ids: [1, 2, 3],
        entities: {
          [1]: new Todo('Laundry', TodoState.TODO, 1),
          [2]: new Todo('Feed cats', TodoState.TODO, 2),
          [3]: new Todo('Wash dishes', TodoState.DONE, 3),
        },
      };
      const updatedTodo = { ...state.entities[3], state: TodoState.TODO };

      // update
      dispatch(todoStateUpdated({ updatedTodo }));
      expect(state.ids).toEqual([1, 2, 3]);
      expect(state.entities[3].state).toBe(TodoState.TODO);
    });
  });

  describe('todoStateUpdateFailed', () => {
    it('should not edit the state', () => {
      dispatch(todoStateUpdateFailed({ error: 'oops' }));
      expect(state.error).toBe('oops');
    });
  });

  describe('createTodo', () => {
    it('should set is loading', () => {
      dispatch(createTodo({ todoToCreate: null }));
      expect(state.isLoading).toBe(true);
    });
  });

  describe('createTodo', () => {
    it('should not add an error to the state', () => {
      dispatch(todoCreationFailed({ error: 'oops' }));
      expect(state.error).toBe('oops');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('createTodo', () => {
    it('should not add an error to the state', () => {
      state = { entities: {}, ids: [] };
      const createdTodo = new DescribedTodo('Laundry', TodoState.TODO, 1, 'Need to wash clothes');
      dispatch(todoCreated({ createdTodo }));
      expect(state.entities[1]).toBe(createdTodo);
      expect(state.isLoading).toBe(false);
      expect(state.ids[0]).toBe(1);
    });
  });
});
