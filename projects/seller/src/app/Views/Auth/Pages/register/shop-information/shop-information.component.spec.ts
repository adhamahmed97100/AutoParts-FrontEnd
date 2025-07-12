import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInformationComponent } from './shop-information.component';

describe('ShopInformationComponent', () => {
  let component: ShopInformationComponent;
  let fixture: ComponentFixture<ShopInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
