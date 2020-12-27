import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoHttpService, mockBackEnd } from '@todos/services/todo-http.service';
import { DescribedTodo, Todo } from '@shared/business-domain/model/Todo';
import { TodoState } from '@shared/business-domain/model/TodoState';

describe('TodoHttpService', () => {
  let todoHttp: TodoHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoHttpService],
    });
    todoHttp = TestBed.inject(TodoHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
    mockBackEnd.clear();
  });

  it('should be created', () => {
    expect(todoHttp).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should call "assets/mocks/todos.json"', () => {
      todoHttp.getTodos().subscribe((todos) => {
        expect(todos).toHaveSize(1);
      });

      const testRequest = httpTestingController.expectOne('assets/mocks/todos.json');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush([new Todo('Laundry')]);
    });
  });

  describe('updateTodo', () => {
    it('should call back-end to update todo (it doesnt really...)', () => {
      todoHttp.updateTodo(new Todo('Laundry')).subscribe((todo) => {
        expect(todo.title).toBe('Laundry');
      });
    });
  });

  describe('getTodo', () => {
    it('should call back-end to get one todo (it doesnt really...)', () => {
      mockBackEnd.set(1, new Todo('Laundry', TodoState.DONE, 1));

      todoHttp.getTodo(1).subscribe((todo) => {
        expect(todo.title).toBe('Laundry');
      });
    });
  });

  describe('createTodo', () => {
    it('should call back-end to create todo (it doesnt really...)', () => {
      const todoToCreate = new DescribedTodo('Laundry', TodoState.TODO, undefined, 'Need to wash clothes');

      todoHttp.createTodo(todoToCreate).subscribe((createdTodo) => {
        expect(createdTodo).toEqual({ ...todoToCreate, id: 1 });
      });
    });
  });
});
