import { TestBed } from '@angular/core/testing';

import { CompatibilityCommendService } from './compatibility-commend.service';

describe('CompatibilityCommendService', () => {
  let service: CompatibilityCommendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompatibilityCommendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
