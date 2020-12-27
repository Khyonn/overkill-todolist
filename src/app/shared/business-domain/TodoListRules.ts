import { Todo } from './model/Todo';
import { TodoState } from './model/TodoState';

export class TodoListRules {
  static todoListSorter(todoA: Todo, todoB: Todo): number {
    if (Todo.isDone(todoA) !== Todo.isDone(todoB)) {
      return Todo.isDone(todoA) ? 1 : -1; // 1 => after, -1 before
    }
    return 0;
  }
}
