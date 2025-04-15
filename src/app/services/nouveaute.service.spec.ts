import { TestBed } from '@angular/core/testing';

import { NouveauteService } from './nouveaute.service';

describe('NouveauteService', () => {
  let service: NouveauteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NouveauteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
