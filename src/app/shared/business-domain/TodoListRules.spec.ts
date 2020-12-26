import { Todo } from './model/Todo';
import { TodoState } from './model/TodoState';
import { TodoListRules } from './TodoListRules';

class TodoListAsserter {
  private static byId = (id: number) => (todo: Todo) => todo.id === id;

  static shouldBeAtTheBottomOfTheList(todoId: number, todoList: Todo[]): void {
    const index = todoList.findIndex(this.byId(todoId));

    if (index !== -1) {
      expect(index).toBe(todoList.length - 1);
    }
  }
}

describe('TodoListRules', () => {
  const title = (todo: Todo) => todo.title;
  describe('todoListSorter', () => {
    it('Should sort todos by their state (done should be placed after the other)', () => {
      const todos = [
        new Todo('Laundry', TodoState.DONE),
        new Todo('Feed the cats', TodoState.TODO),
        new Todo('Wash hands', TodoState.DONE),
        new Todo('Clap your hands', TodoState.TODO),
        new Todo('Another one bites the dust', TodoState.DONE),
      ];

      expect(todos.sort(TodoListRules.todoListSorter).map(title)).toEqual([
        'Feed the cats',
        'Clap your hands',
        'Laundry',
        'Wash hands',
        'Another one bites the dust',
      ]);
    });
  });

  describe('changeTodoToDone', () => {
    it('should place todo at the end of the list', () => {
      const input = [
        new Todo('Feed the cats', TodoState.TODO, 1),
        new Todo('Laundry', TodoState.DONE, 2),
        new Todo('Clap your hands', TodoState.TODO, 3),
        new Todo('Wash hands', TodoState.DONE, 4),
      ];

      // Should work with an existing id
      let output = TodoListRules.changeTodoToDone(input, 1);
      TodoListAsserter.shouldBeAtTheBottomOfTheList(1, output);
      // Should also work with an id that is not present in the list
      output = TodoListRules.changeTodoToDone(input, 7);
      TodoListAsserter.shouldBeAtTheBottomOfTheList(7, output);
    });
  });
});
