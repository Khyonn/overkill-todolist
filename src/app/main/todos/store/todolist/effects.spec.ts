import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { TodoHttpService } from '@todos/services/todo-http.service';
import { TodoListEffects } from '@todos/store/todolist/effects';
import {
  listDataLoaded,
  listLoadingFailed,
  startLoadingList,
  startUpdateTodoState,
  todoStateUpdated,
  todoStateUpdateFailed,
} from '@todos/store/todolist/actions';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';
import { getTestScheduler } from '@testing/observable';

describe('TodoListEffects', () => {
  let todoListEffects: TodoListEffects;

  let actions$: Observable<Action>;
  let todoHttpService: jasmine.SpyObj<TodoHttpService>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListEffects,
        provideMockActions(() => actions$),
        { provide: TodoHttpService, useValue: jasmine.createSpyObj('TodoHttpService', ['getTodos', 'updateTodo']) },
      ],
    });

    testScheduler = getTestScheduler();
    todoListEffects = TestBed.inject(TodoListEffects);
    todoHttpService = TestBed.inject(TodoHttpService) as jasmine.SpyObj<TodoHttpService>;
  });

  it('should be created', () => {
    expect(todoListEffects).toBeTruthy();
  });

  describe('setTodoList$', () => {
    it('Should map startLoadingList to listDataLoaded', () => {
      const todos = [
        new Todo('Laundry', TodoState.TODO, 1),
        new Todo('Feed the cat', TodoState.TODO, 2),
        new Todo('Do the dishes', TodoState.TODO, 3),
      ];
      const inputAction = startLoadingList();
      const outputAction = listDataLoaded({ todos });

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', { a: inputAction });
        const result$ = cold('-b|', { b: todos });

        todoHttpService.getTodos.and.returnValue(result$);
        expectObservable(todoListEffects.setTodoList$).toBe('--b', { b: outputAction });
      });
    });

    it('Should map startLoadingList to listLoadingFailed', () => {
      const inputAction = startLoadingList();
      const outputAction = listLoadingFailed();

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', { a: inputAction });
        const result$ = cold<Todo[]>('-#|');

        todoHttpService.getTodos.and.returnValue(result$);
        expectObservable(todoListEffects.setTodoList$).toBe('--b', { b: outputAction });
      });
    });
  });

  describe('updateTodo$', () => {
    it('Should map startUpdateTodoState to todoStateUpdated', () => {
      const todoToUpdate = new Todo('Laundry', TodoState.TODO, 1);
      const inputAction = startUpdateTodoState({ todoToUpdate, isDone: true });

      const updatedTodo = new Todo('Laundry', TodoState.DONE, 1);
      const outputAction = todoStateUpdated({ updatedTodo });

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', { a: inputAction });
        const result$ = cold('-b|', { b: updatedTodo });

        todoHttpService.updateTodo.and.returnValue(result$);
        expectObservable(todoListEffects.updateTodo$).toBe('--b', { b: outputAction });
      });
    });

    it('Should map startUpdateTodoState to todoStateUpdated', () => {
      const todoToUpdate = new Todo('Laundry', TodoState.DONE, 1);
      const inputAction = startUpdateTodoState({ todoToUpdate, isDone: false });

      const updatedTodo = new Todo('Laundry', TodoState.TODO, 1);
      const outputAction = todoStateUpdated({ updatedTodo });

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', { a: inputAction });
        const result$ = cold('-b|', { b: updatedTodo });

        todoHttpService.updateTodo.and.returnValue(result$);
        expectObservable(todoListEffects.updateTodo$).toBe('--b', { b: outputAction });
      });
    });

    it('Should map startUpdateTodoState to todoStateUpdateFailed', () => {
      const todoToUpdate = new Todo('Laundry', TodoState.TODO, 1);
      const inputAction = startUpdateTodoState({ todoToUpdate, isDone: true });
      const outputAction = todoStateUpdateFailed();

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', { a: inputAction });
        const result$ = cold<Todo>('-#|');

        todoHttpService.updateTodo.and.returnValue(result$);
        expectObservable(todoListEffects.updateTodo$).toBe('--b', { b: outputAction });
      });
    });
  });
});
