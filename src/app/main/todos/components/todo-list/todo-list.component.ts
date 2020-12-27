import { Component, OnInit } from '@angular/core';
import { selectTodoList } from '@todos/store/todolist/selector';
import { Store } from '@ngrx/store';
import { Todo } from '@shared/business-domain/model/Todo';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoModalComponent } from '../add-todo-modal/add-todo-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todos: Todo[];

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(selectTodoList).subscribe((todos) => (this.todos = todos));
  }

  onClickAdd(): void {
    this.dialog.open(AddTodoModalComponent);
  }
}
