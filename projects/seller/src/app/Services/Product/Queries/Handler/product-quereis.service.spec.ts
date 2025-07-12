import { TestBed } from '@angular/core/testing';

import { ProductQuereisService } from './product-quereis.service';

describe('ProductQuereisService', () => {
  let service: ProductQuereisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductQuereisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
