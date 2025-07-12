import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRatesComponent } from './products-rates.component';

describe('ProductsRatesComponent', () => {
  let component: ProductsRatesComponent;
  let fixture: ComponentFixture<ProductsRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsRatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
