import { TestBed } from '@angular/core/testing';

import { RaisonService } from './raison.service';

describe('RaisonService', () => {
  let service: RaisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
