import { TestBed } from '@angular/core/testing';

import { ReclamationServiceService } from './reclamation-service.service';

describe('ReclamationServiceService', () => {
  let service: ReclamationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
