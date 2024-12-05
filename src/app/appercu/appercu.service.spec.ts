import { TestBed } from '@angular/core/testing';

import { AppercuService } from './appercu.service';

describe('AppercuService', () => {
  let service: AppercuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppercuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
