import { Component, Input } from '@angular/core';
import { Todo } from '@shared/business/model/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  public todo: Todo;
}
