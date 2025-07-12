import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAndRevenueComponent } from './sale-and-revenue.component';

describe('SaleAndRevenueComponent', () => {
  let component: SaleAndRevenueComponent;
  let fixture: ComponentFixture<SaleAndRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAndRevenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleAndRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
