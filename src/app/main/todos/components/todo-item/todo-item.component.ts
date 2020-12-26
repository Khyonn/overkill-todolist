import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '@shared/business-domain/model/Todo';
import { startUpdateTodoState } from '@todos/store/todolist/actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  public todo: Todo;

  public get isDone(): boolean {
    return Todo.isDone(this.todo);
  }

  public onChangeState(isDone: boolean): void {
    this.store.dispatch(startUpdateTodoState({ todoToUpdate: this.todo, isDone }));
  }

  constructor(private store: Store) {}
}
