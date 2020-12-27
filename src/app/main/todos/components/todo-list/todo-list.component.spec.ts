import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';

import { MaterialModule } from '@shared/modules/material/material.module';

import { TodoItemComponent } from '@todos/components/todo-item/todo-item.component';
import { TodoListComponent } from '@todos/components/todo-list/todo-list.component';
import { todosFeatureKey, State } from '@todos/store';
import { AddTodoModalComponent } from '../add-todo-modal/add-todo-modal.component';

interface FeatureState {
  [todosFeatureKey]: State;
}
describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<FeatureState>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const initialState: FeatureState = {
      todosFeature: {
        todoList: {
          ids: [],
          entities: {},
        },
      },
    };
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoItemComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes([])],
      providers: [provideMockStore({ initialState }), { provide: MatDialog, useValue: dialog }],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('todos subscription', () => {
    it('should subscribe to todoList updates', () => {
      expect(component.todos).toHaveSize(0);
      expect(fixture.nativeElement.querySelectorAll('app-todo-item')).toHaveSize(0);

      store.setState({
        todosFeature: { todoList: { ids: [1], entities: { [1]: new Todo('Laundry', TodoState.TODO, 1) } } },
      });
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('app-todo-item')).toHaveSize(1);
      expect(fixture.nativeElement.querySelector('app-todo-item#todo_1')).toBeDefined();
    });
  });

  describe('onClickAdd', () => {
    it('should open AddTodoModalComponent', () => {
      component.onClickAdd();
      expect(dialog.open).toHaveBeenCalledWith(AddTodoModalComponent);
    });
  });
});
