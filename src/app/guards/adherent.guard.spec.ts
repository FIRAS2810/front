import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adherentGuard } from './adherent.guard';

describe('adherentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adherentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
