import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAgremntComponent } from './confirm-agremnt.component';

describe('ConfirmAgremntComponent', () => {
  let component: ConfirmAgremntComponent;
  let fixture: ComponentFixture<ConfirmAgremntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAgremntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAgremntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
