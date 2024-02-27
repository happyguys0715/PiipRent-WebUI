import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDetailsPreviewComponent } from './timesheet-details-preview.component';

describe('TimesheetDetailsPreviewComponent', () => {
  let component: TimesheetDetailsPreviewComponent;
  let fixture: ComponentFixture<TimesheetDetailsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimesheetDetailsPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetDetailsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
