import { TestBed } from '@angular/core/testing';

import { OrderCommendService } from './order-commend.service';

describe('OrderCommendService', () => {
  let service: OrderCommendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderCommendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
