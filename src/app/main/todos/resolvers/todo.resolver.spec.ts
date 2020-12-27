import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';
import { TodoResolver } from '@todos/resolvers/todo.resolver';
import { State } from '@shared/store/root-state';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('TodoResolver', () => {
  let resolver: TodoResolver;
  let store: MockStore<State>;

  beforeEach(() => {
    const initialState: State = {
      todosFeature: {
        todoList: {
          ids: [],
          entities: {},
        },
      },
      router: null,
    };

    TestBed.configureTestingModule({
      providers: [TodoResolver, provideMockStore({ initialState })],
    });
    resolver = TestBed.inject(TodoResolver);
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
        router: {
          state: {
            root: {
              firstChild: {
                params: { todoId: '5' },
              },
            },
            url: '/5',
          },
          navigationId: 1,
        },
      });

      const routeSnapshot = ({ params: { todoId: '5' } } as unknown) as ActivatedRouteSnapshot;
      resolver.resolve(routeSnapshot).subscribe((value) => {
        expect(value).toBeTrue();
      });
    });
  });
});
