import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoHttpService } from '@todos/services/todo-http.service';
import { Todo } from '@shared/business-domain/model/Todo';
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
    it('should call back-end to update todo (it doesnt really...)', () => {
      todoHttp.getTodos().subscribe(() => {});

      const testRequest = httpTestingController.expectOne('assets/mocks/todos.json');
      testRequest.flush([new Todo('Laundry', TodoState.DONE, 1)]);
      todoHttp.getTodo(1).subscribe((todo) => {
        expect(todo.title).toBe('Laundry');
      });
    });
  });
});
