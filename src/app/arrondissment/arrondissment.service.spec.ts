import { TestBed } from '@angular/core/testing';

import { ArrondissmentService } from './arrondissment.service';

describe('ArrondissmentService', () => {
  let service: ArrondissmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrondissmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
