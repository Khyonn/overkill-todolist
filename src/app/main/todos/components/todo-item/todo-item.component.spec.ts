import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';
import { MaterialModule } from '@shared/modules/material/material.module';

import { TodoItemComponent } from '@todos/components/todo-item/todo-item.component';
import { startUpdateTodoState } from '@todos/store/todolist/actions';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [MaterialModule],
      providers: [{ provide: Store, useValue: jasmine.createSpyObj('Store', ['dispatch']) }],
    }).compileComponents();
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.childElementCount).toBeFalsy();
  });

  it('should update title when updating given todo', () => {
    component.todo = new Todo('Laundry');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.todo-title').textContent).toBe('Laundry');
  });

  it('should display todo crossed out if it is done', () => {
    component.todo = new Todo('Laundry');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.todo-title').classList.contains('crossed-out')).toBeFalse();

    component.todo = new Todo('Laundry', TodoState.DONE);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.todo-title').classList.contains('crossed-out')).toBeTrue();
  });

  describe('onChangeState', () => {
    it('should dispatch startUpdateTodoState', () => {
      component.todo = new Todo('Laundry', TodoState.TODO, 1);
      component.onChangeState(true);
      expect(store.dispatch).toHaveBeenCalledWith(startUpdateTodoState({ todoToUpdate: component.todo, isDone: true }));
    });
  });
});
