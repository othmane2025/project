import { TestBed } from '@angular/core/testing';

import { CommuniquerService } from './communiquer.service';

describe('CommuniquerService', () => {
  let service: CommuniquerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommuniquerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
