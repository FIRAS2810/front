import { TestBed } from '@angular/core/testing';

import { DemissionServiceService } from './demission-service.service';

describe('DemissionServiceService', () => {
  let service: DemissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
