import { TestBed } from '@angular/core/testing';

import { CategoryQuereisService } from './category-quereis.service';

describe('CategoryQuereisService', () => {
  let service: CategoryQuereisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryQuereisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
