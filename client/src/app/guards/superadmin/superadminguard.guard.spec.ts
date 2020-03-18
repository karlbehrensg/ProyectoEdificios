import { TestBed, async, inject } from '@angular/core/testing';

import { SuperadminguardGuard } from './superadminguard.guard';

describe('SuperadminguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperadminguardGuard]
    });
  });

  it('should ...', inject([SuperadminguardGuard], (guard: SuperadminguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
