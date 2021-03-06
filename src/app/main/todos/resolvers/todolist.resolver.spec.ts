import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';
import { TodolistResolver } from '@todos/resolvers/todolist.resolver';
import { todosFeatureKey, State } from '@todos/store';

interface FeatureState {
  [todosFeatureKey]: State;
}
describe('TodolistResolver', () => {
  let resolver: TodolistResolver;
  let store: MockStore<FeatureState>;

  beforeEach(() => {
    const initialState: FeatureState = {
      todosFeature: {
        todoList: {
          ids: [],
          entities: {},
        },
      },
    };

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
      store.setState({
        todosFeature: {
          todoList: {
            ids: [1],
            entities: {
              [1]: new Todo('Laundry', TodoState.TODO, 1),
            },
          },
        },
      });
      resolver.resolve().subscribe((value) => {
        expect(value).toBeTrue();
      });
    });
  });
});
