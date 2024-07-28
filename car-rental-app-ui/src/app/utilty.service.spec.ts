import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utilty.service';

describe('UtiltyService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
