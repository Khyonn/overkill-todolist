import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '@shared/modules/material/material.module';
import { State } from '@shared/store/root-state';
import { TodoDetailComponent } from '@todos/components/todo-detail/todo-detail.component';

import { TodoDetailPageComponent } from '@todos/pages/todo-detail-page/todo-detail-page.component';

describe('TodoDetailPageComponent', () => {
  let component: TodoDetailPageComponent;
  let fixture: ComponentFixture<TodoDetailPageComponent>;

  beforeEach(async () => {
    const initialState: State = {
      todosFeature: {
        todoList: {
          ids: [],
          entities: {},
        },
      },
      router: null,
    };

    await TestBed.configureTestingModule({
      declarations: [TodoDetailPageComponent, TodoDetailComponent],
      imports: [MaterialModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
