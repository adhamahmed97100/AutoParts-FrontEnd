import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentProductComponent } from './managment-product.component';

describe('ManagmentProductComponent', () => {
  let component: ManagmentProductComponent;
  let fixture: ComponentFixture<ManagmentProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagmentProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagmentProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
