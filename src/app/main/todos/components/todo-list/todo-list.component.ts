import { Component, OnInit } from '@angular/core';
import { selectTodoList } from '@todos/store/todolist/selector';
import { Store } from '@ngrx/store';
import { Todo } from '@shared/business/model/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todos: Todo[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectTodoList).subscribe((todos) => (this.todos = todos));
  }
}
