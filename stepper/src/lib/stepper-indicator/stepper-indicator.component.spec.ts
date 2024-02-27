import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperIndicatorComponent } from './stepper-indicator.component';

describe('StepperIndicatorComponent', () => {
  let component: StepperIndicatorComponent;
  let fixture: ComponentFixture<StepperIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperIndicatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
