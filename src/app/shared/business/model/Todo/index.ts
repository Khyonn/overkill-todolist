import { TodoState } from '../TodoState';

export class Todo {
  constructor(public title = '', public state = TodoState.TODO, public id?: number) {}
}
