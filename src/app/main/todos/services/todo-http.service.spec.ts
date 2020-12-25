import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoHttpService } from './todo-http.service';

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
        expect(todos).toHaveSize(0);
      });

      const testRequest = httpTestingController.expectOne('assets/mocks/todos.json');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush([]);
    });
  });
});
