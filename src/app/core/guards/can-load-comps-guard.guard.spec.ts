import { TestBed } from '@angular/core/testing';

import { CanLoadCompsGuard } from './can-load-comps-guard.guard';

describe('CanLoadCompsGuard', () => {
  let guard: CanLoadCompsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadCompsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
