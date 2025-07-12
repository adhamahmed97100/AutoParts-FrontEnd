import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBrandComponent } from './select-brand.component';

describe('SelectBrandComponent', () => {
  let component: SelectBrandComponent;
  let fixture: ComponentFixture<SelectBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
