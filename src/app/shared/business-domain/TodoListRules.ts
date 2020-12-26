import { Todo } from './model/Todo';
import { TodoState } from './model/TodoState';

export class TodoListRules {
  static todoListSorter(todoA: Todo, todoB: Todo): number {
    if (Todo.isDone(todoA) !== Todo.isDone(todoB)) {
      return Todo.isDone(todoA) ? 1 : -1; // 1 => after, -1 before
    }
    return 0;
  }

  static changeTodoToDone(todos: Todo[], doneTodoId: number): Todo[] {
    const doneTodo = todos.find((todo) => !Todo.isDone(todo) && todo.id === doneTodoId);

    if (doneTodo) {
      const newTodo: Todo = { ...doneTodo, state: TodoState.DONE };
      const newTodos = [...todos, newTodo];

      newTodos.splice(todos.indexOf(doneTodo), 1);
      return newTodos;
    }
    return todos;
  }
}
