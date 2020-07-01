import { TestBed } from '@angular/core/testing';

import { CanloadloginGuard } from './canloadlogin.guard';

describe('CanloadloginGuard', () => {
  let guard: CanloadloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanloadloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
