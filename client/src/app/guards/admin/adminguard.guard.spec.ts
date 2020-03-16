import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './adminguard.guard';

describe('AdminguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
