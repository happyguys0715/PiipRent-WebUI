import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { StepperIndicatorComponent } from '../stepper-indicator/stepper-indicator.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  imports: [CommonModule, StepperIndicatorComponent],
})
export class StepperComponent extends CdkStepper {
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
