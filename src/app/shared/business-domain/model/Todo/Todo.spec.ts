import { TodoState } from '../TodoState';
import { Todo } from './index';

describe('Test class Todo', () => {
  it('Should have empty title and his state should be "TODO"', () => {
    const todo = new Todo();
    expect(todo.id).toBeUndefined();
    expect(todo.title).toBe('');
    expect(todo.state).toBe('TODO');
  });

  it('Should have the given state and its title should be empty', () => {
    const todo = new Todo(undefined, TodoState.DONE);
    expect(todo.id).toBeUndefined();
    expect(todo.title).toBe('');
    expect(todo.state).toBe('DONE');
  });

  it('Should have the given title and his state should be "TODO"', () => {
    const todo = new Todo('Laundry');
    expect(todo.id).toBeUndefined();
    expect(todo.title).toBe('Laundry');
    expect(todo.state).toBe('TODO');
  });

  it('Should have the given title and state', () => {
    const todo = new Todo('Laundry', TodoState.DONE);
    expect(todo.id).toBeUndefined();
    expect(todo.title).toBe('Laundry');
    expect(todo.state).toBe('DONE');
  });

  it('Should have the given title, state and id', () => {
    const todo = new Todo('Laundry', TodoState.DONE, 1);
    expect(todo.id).toBe(1);
    expect(todo.title).toBe('Laundry');
    expect(todo.state).toBe('DONE');
  });

  describe('isDone()', () => {
    it('should not be done', () => {
      expect(Todo.isDone(new Todo('Washing dishes', TodoState.TODO))).toBeFalse();
    });

    it('should be done', () => {
      expect(Todo.isDone(new Todo('Washing dishes', TodoState.DONE))).toBeTrue();
    });
  });
});
