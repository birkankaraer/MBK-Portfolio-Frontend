import { TestBed } from '@angular/core/testing';

import { HireusService } from './hireus.service';

describe('HireusService', () => {
  let service: HireusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HireusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
