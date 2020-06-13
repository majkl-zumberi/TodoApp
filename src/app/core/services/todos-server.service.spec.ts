import { TestBed } from '@angular/core/testing';

import { TodosServerService } from './todos-server.service';

describe('TodosServerService', () => {
  let service: TodosServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
