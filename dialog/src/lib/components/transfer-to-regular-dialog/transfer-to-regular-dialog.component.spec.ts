import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferToRegularDialogComponent } from './transfer-to-regular-dialog.component';

describe('TransferToRegularDialogComponent', () => {
  let component: TransferToRegularDialogComponent;
  let fixture: ComponentFixture<TransferToRegularDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferToRegularDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferToRegularDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
