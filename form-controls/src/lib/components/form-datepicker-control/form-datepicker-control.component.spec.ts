import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatepickerControlComponent } from './form-datepicker-control.component';

describe('DatepickerComponent', () => {
  let component: FormDatepickerControlComponent;
  let fixture: ComponentFixture<FormDatepickerControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDatepickerControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatepickerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
