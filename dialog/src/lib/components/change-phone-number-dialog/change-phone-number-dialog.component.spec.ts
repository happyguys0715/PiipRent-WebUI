import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneNumberDialogComponent } from './change-phone-number-dialog.component';

describe('ChangePhoneNumberDialogComponent', () => {
  let component: ChangePhoneNumberDialogComponent;
  let fixture: ComponentFixture<ChangePhoneNumberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePhoneNumberDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhoneNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
