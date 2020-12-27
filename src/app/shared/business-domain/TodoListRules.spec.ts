import { Todo } from './model/Todo';
import { TodoState } from './model/TodoState';
import { TodoListRules } from './TodoListRules';

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
});
