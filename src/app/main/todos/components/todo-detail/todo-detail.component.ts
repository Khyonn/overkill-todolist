import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DescribedTodo } from '@shared/business-domain/model/Todo';
import { State } from '@shared/store/root-state';
import { selectPageTodo } from '@todos/store/todolist/selector';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  public todo: DescribedTodo;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.select(selectPageTodo).subscribe((todo) => {
      this.todo = todo;
    });
  }
}
