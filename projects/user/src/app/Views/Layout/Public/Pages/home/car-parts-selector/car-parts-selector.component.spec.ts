import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartsSelectorComponent } from './car-parts-selector.component';

describe('CarPartsSelectorComponent', () => {
  let component: CarPartsSelectorComponent;
  let fixture: ComponentFixture<CarPartsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPartsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
