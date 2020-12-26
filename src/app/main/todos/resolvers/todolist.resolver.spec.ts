import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState } from '@todos/store/reducer';
import { TodolistResolver } from '@todos/resolvers/todolist.resolver';
import { Todo } from '@shared/business-domain/model/Todo';

describe('TodolistResolver', () => {
  let resolver: TodolistResolver;
  let store: MockStore<AppState>;

  beforeEach(() => {
    const initialState: AppState = { todosFeature: { todoList: [] } };

    TestBed.configureTestingModule({
      providers: [TodolistResolver, provideMockStore({ initialState })],
    });
    resolver = TestBed.inject(TodolistResolver);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should return true when store todoList is set', () => {
      const todoList = [new Todo('Laundry')];

      store.setState({ todosFeature: { todoList } });
      resolver.resolve().subscribe((value) => {
        expect(value).toBeTrue();
      });
    });
  });
});
