import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInlineComponent } from './form-inline.component';

describe('FormInlineComponent', () => {
  let component: FormInlineComponent;
  let fixture: ComponentFixture<FormInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInlineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
