import { TestBed } from '@angular/core/testing';

import { CanActivateCompsGuard } from './can-activate-comps.guard';

describe('CanActivateCompsGuard', () => {
  let guard: CanActivateCompsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateCompsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
