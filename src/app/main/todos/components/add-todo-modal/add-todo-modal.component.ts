import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DescribedTodo } from '@shared/business-domain/model/Todo/DescribedTodo';
import { State } from '@shared/store/root-state';
import { createTodo } from '@todos/store/todolist/actions';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss'],
})
export class AddTodoModalComponent {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTodoModalComponent>,
    private store: Store<State>
  ) {}

  public form: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control(''),
  });

  onSubmit(): void {
    const todoToCreate = Object.assign(new DescribedTodo(), this.form.value as DescribedTodo);

    this.store.dispatch(createTodo({ todoToCreate }));
    this.dialogRef.close();
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }
}
