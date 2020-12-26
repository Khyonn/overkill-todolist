import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo } from '@shared/business/model/Todo';

import { TodoItemComponent } from '@todos/components/todo-item/todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    }).compileComponents();
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
});
