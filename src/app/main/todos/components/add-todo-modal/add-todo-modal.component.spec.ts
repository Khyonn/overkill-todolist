import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { DescribedTodo } from '@shared/business-domain/model/Todo';
import { MaterialModule } from '@shared/modules/material/material.module';
import { createTodo } from '@todos/store/todolist/actions';

import { AddTodoModalComponent } from './add-todo-modal.component';

describe('AddTodoModalComponent', () => {
  let component: AddTodoModalComponent;
  let fixture: ComponentFixture<AddTodoModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AddTodoModalComponent>>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    store = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      declarations: [AddTodoModalComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: Store, useValue: store },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should launch a todo creation', () => {
      const formValue = { title: 'Laundry', description: 'Because you need to be clean' };
      component.form.setValue(formValue);

      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(
        createTodo({ todoToCreate: Object.assign(new DescribedTodo(), formValue) })
      );
    });
  });
  describe('onClickCancel', () => {
    it('should call close', () => {
      component.onClickCancel();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
