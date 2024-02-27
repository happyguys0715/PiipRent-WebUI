import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWorksheetModalComponent } from './approve-worksheet-modal.component';

describe('ApproveWorksheetModalComponent', () => {
  let component: ApproveWorksheetModalComponent;
  let fixture: ComponentFixture<ApproveWorksheetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveWorksheetModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveWorksheetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
