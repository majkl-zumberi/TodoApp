import {TestBed} from '@angular/core/testing';

import {httpCommunicationsService} from './http-communications.service';

describe('HttpComunicationService', () => {
  let service: httpCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(httpCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
