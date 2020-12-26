import { TodoState } from '../TodoState';

export class Todo {
  constructor(public title = '', public state = TodoState.TODO, public id?: number) {}

  static isDone(todo: Todo): boolean {
    return !!todo && todo.state === TodoState.DONE;
  }
}
