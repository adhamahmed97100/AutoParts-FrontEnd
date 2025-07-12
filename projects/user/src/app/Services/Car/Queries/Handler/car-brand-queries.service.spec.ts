import { TestBed } from '@angular/core/testing';

import { CarBrandQueriesService } from './car-brand-queries.service';

describe('CarBrandQueriesService', () => {
  let service: CarBrandQueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarBrandQueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
