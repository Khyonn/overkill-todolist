import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from '@shared/business/model/Todo';
import { TodoState } from '@shared/business/model/TodoState';

import { MaterialModule } from '@shared/modules/material/material.module';

import { TodoItemComponent } from '@todos/components/todo-item/todo-item.component';
import { TodoListComponent } from '@todos/components/todo-list/todo-list.component';
import { AppState } from '@todos/store/reducer';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    const initialState: AppState = { todosFeature: { todoList: [] } };

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoItemComponent],
      imports: [MaterialModule],
      providers: [provideMockStore({ initialState })],
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

      store.setState({ todosFeature: { todoList: [new Todo('Laundry', TodoState.TODO, 1)] } });
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('app-todo-item')).toHaveSize(1);
      expect(fixture.nativeElement.querySelector('app-todo-item#todo_1')).toBeDefined();
    });
  });
});
