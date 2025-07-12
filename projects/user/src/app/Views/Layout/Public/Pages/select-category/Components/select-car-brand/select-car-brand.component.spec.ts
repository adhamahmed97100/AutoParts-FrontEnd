import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCarBrandComponent } from './select-car-brand.component';

describe('SelectCarBrandComponent', () => {
  let component: SelectCarBrandComponent;
  let fixture: ComponentFixture<SelectCarBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCarBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
