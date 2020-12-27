import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';
import { MaterialModule } from '@shared/modules/material/material.module';
import { State } from '@shared/store/root-state';

import { TodoDetailComponent } from '@todos/components/todo-detail/todo-detail.component';

describe('TodoDetailComponent', () => {
  let store: MockStore<State>;
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async () => {
    const initialState: State = {
      todosFeature: {
        todoList: {
          ids: [],
          entities: {},
        },
      },
      router: {
        state: {
          root: {
            firstChild: {
              params: {},
            },
          },
        },
        navigationId: 1,
      },
    };

    await TestBed.configureTestingModule({
      declarations: [TodoDetailComponent],
      imports: [MaterialModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive todo to display', () => {
    store.setState({
      todosFeature: {
        todoList: {
          ids: [5],
          entities: {
            [5]: new Todo('Laundry', TodoState.TODO, 5),
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
        },
        navigationId: 2,
      },
    });
    fixture.detectChanges();
    expect(component.todo.id).toBe(5);
    expect(fixture.nativeElement.querySelector('mat-card-title').textContent).toContain('Laundry');
  });
});
