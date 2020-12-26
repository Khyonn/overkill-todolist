import { Action } from '@ngrx/store';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';
import {
  listDataLoaded,
  listLoadingFailed,
  startLoadingList,
  startUpdateTodoState,
  todoStateUpdated,
  todoStateUpdateFailed,
} from './actions';
import { State, todoListReducer } from './reducer';

describe('todoListReducer', () => {
  let state: State;
  let expectStateDidntChange: () => void;
  const dispatch = (action: Action) => {
    state = todoListReducer(state, action);
  };

  beforeEach(() => {
    state = [];

    const oldState = state;
    expectStateDidntChange = () => expect(oldState).toBe(state);
  });

  describe('startLoadingList', () => {
    it('should not edit the state', () => {
      dispatch(startLoadingList());
      expectStateDidntChange();
    });
  });

  describe('listDataLoaded', () => {
    it('should change the state to given todos', () => {
      const oldState = state;
      const todos = [new Todo('Laundry', TodoState.DONE), new Todo('Feed cats')];

      dispatch(listDataLoaded({ todos }));
      expect(oldState).not.toBe(state);
      expect(state.map((todo) => todo.title)).toEqual(['Feed cats', 'Laundry']);
    });
  });

  describe('listLoadingFailed', () => {
    it('should not edit the state', () => {
      dispatch(listLoadingFailed());
      expectStateDidntChange();
    });
  });

  describe('startUpdateTodoState', () => {
    it('should not edit the state', () => {
      dispatch(startUpdateTodoState({ isDone: false, todoToUpdate: null }));
      expectStateDidntChange();
    });
  });

  describe('todoStateUpdated', () => {
    it('should edit first todo to DONE and place it to the bottom', () => {
      // init
      const todos = [
        new Todo('Laundry', TodoState.TODO, 1),
        new Todo('Feed cats', TodoState.DONE, 2),
        new Todo('Wash dishes', TodoState.TODO, 3),
      ];
      state = todos;

      // update
      dispatch(todoStateUpdated({ updatedTodo: { ...todos[0], state: TodoState.DONE } }));
      expect(state.map((t) => t.id)).toEqual([2, 3, 1]);
      expect(state[state.length - 1].state).toBe(TodoState.DONE);
    });

    it('should edit second todo to TODO but not change the place', () => {
      // init
      const todos = [
        new Todo('Laundry', TodoState.TODO, 1),
        new Todo('Feed cats', TodoState.DONE, 2),
        new Todo('Wash dishes', TodoState.TODO, 3),
      ];
      state = todos;

      // update
      dispatch(todoStateUpdated({ updatedTodo: { ...todos[1], state: TodoState.TODO } }));
      expect(state.map((t) => t.id)).toEqual([1, 2, 3]);
      expect(state[1].state).toBe(TodoState.TODO);
    });
  });

  describe('todoStateUpdateFailed', () => {
    it('should not edit the state', () => {
      dispatch(todoStateUpdateFailed());
      expectStateDidntChange();
    });
  });
});
