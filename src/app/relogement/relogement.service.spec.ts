import { TestBed } from '@angular/core/testing';

import { RelogementService } from './relogement.service';

describe('RelogementService', () => {
  let service: RelogementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelogementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
