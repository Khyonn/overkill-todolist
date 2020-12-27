import { TodoState } from '@shared/business-domain/model/TodoState';

export class Todo {
  constructor(public title = '', public state = TodoState.TODO, public id?: number) {}

  static isDone(todo: Todo): boolean {
    return !!todo && todo.state === TodoState.DONE;
  }
}
