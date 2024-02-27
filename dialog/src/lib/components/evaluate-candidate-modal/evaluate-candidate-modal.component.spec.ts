import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateCandidateModalComponent } from './evaluate-candidate-modal.component';

describe('EvaluateCandidateModalComponent', () => {
  let component: EvaluateCandidateModalComponent;
  let fixture: ComponentFixture<EvaluateCandidateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluateCandidateModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
