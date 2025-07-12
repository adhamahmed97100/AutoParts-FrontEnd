import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarComponent } from './brand-car.component';

describe('BrandCarComponent', () => {
  let component: BrandCarComponent;
  let fixture: ComponentFixture<BrandCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
