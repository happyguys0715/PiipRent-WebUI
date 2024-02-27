import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioSwitchComponent } from './form-radio-switch.component';

describe('FormRadioSwitchComponent', () => {
  let component: FormRadioSwitchComponent;
  let fixture: ComponentFixture<FormRadioSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRadioSwitchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRadioSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
