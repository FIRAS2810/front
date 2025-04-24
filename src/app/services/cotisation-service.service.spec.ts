import { TestBed } from '@angular/core/testing';

import { CotisationServiceService } from './cotisation-service.service';

describe('CotisationServiceService', () => {
  let service: CotisationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotisationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
