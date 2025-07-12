import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProudctComponent } from './add-proudct.component';

describe('AddProudctComponent', () => {
  let component: AddProudctComponent;
  let fixture: ComponentFixture<AddProudctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProudctComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProudctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
