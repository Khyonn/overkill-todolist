import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { TodoHttpService } from '@todos/services/todo-http.service';
import { TodoListEffects } from '@todos/store/todolist/effects';
import { dataLoaded, loadingFailed, startLoading } from '@todos/store/todolist/actions';
import { Todo } from '@shared/business/model/Todo';
import { TodoState } from '@shared/business/model/TodoState';
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
        { provide: TodoHttpService, useValue: jasmine.createSpyObj('TodoHttpService', ['getTodos']) },
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
    it('Should map startLoading to dataLoadedAction', () => {
      const todos = [
        new Todo('Laundry', TodoState.TODO, 1),
        new Todo('Feed the cat', TodoState.TODO, 2),
        new Todo('Do the dishes', TodoState.TODO, 3),
      ];
      const inputAction = startLoading();
      const outputAction = dataLoaded({ todos });

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', { a: inputAction });
        const result$ = cold('-b|', { b: todos });

        todoHttpService.getTodos.and.returnValue(result$);
        expectObservable(todoListEffects.setTodoList$).toBe('--b', { b: outputAction });
      });
    });

    it('Should map startLoading to loadingFailed', () => {
      const inputAction = startLoading();
      const outputAction = loadingFailed();

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', { a: inputAction });
        const result$ = cold<Todo[]>('-#|');

        todoHttpService.getTodos.and.returnValue(result$);
        expectObservable(todoListEffects.setTodoList$).toBe('--b', { b: outputAction });
      });
    });
  });
});
