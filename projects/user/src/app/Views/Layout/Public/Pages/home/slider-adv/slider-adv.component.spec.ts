import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderAdvComponent } from './slider-adv.component';

describe('SliderAdvComponent', () => {
  let component: SliderAdvComponent;
  let fixture: ComponentFixture<SliderAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderAdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
