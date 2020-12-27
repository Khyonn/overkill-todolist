import { TodoState } from '../TodoState';
import { Todo } from './Todo';

export class DescribedTodo extends Todo {
  constructor(title?: string, state?: TodoState, id?: number, public description?: string) {
    super(title, state, id);
  }
}
