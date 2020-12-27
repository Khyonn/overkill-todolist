import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from '@shared/modules/material/material.module';
import { TodoItemComponent } from '@todos/components/todo-item/todo-item.component';

import { TodoListComponent } from '@todos/components/todo-list/todo-list.component';
import { TodoPageComponent } from '@todos/pages/todo-page/todo-page.component';
import { todosFeatureKey, State } from '@todos/store';

interface FeatureState {
  [todosFeatureKey]: State;
}
describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;

  beforeEach(async () => {
    const initialState: FeatureState = { todosFeature: { todoList: { ids: [], entities: {} } } };

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoItemComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes([])],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
