import { TestBed } from '@angular/core/testing';

import { ExpertGuard } from './expert.guard';

describe('ExpertGuard', () => {
  let guard: ExpertGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExpertGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
