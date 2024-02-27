import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImageUploadControlComponent } from './form-image-upload-control.component';

describe('FormImageUploadControlComponent', () => {
  let component: FormImageUploadControlComponent;
  let fixture: ComponentFixture<FormImageUploadControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormImageUploadControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImageUploadControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
