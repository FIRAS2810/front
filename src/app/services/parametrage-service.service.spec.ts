import { TestBed } from '@angular/core/testing';

import { ParametrageServiceService } from './parametrage-service.service';

describe('ParametrageServiceService', () => {
  let service: ParametrageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
