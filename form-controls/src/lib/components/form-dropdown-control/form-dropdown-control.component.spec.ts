import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDropdownControlComponent } from './form-dropdown-control.component';

describe('DropdownComponent', () => {
  let component: FormDropdownControlComponent;
  let fixture: ComponentFixture<FormDropdownControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDropdownControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropdownControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
