import { TestBed } from '@angular/core/testing';

import { InformerService } from './informer.service';

describe('InformerService', () => {
  let service: InformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
