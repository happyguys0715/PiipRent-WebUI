import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface IStep {
  label?: number;
  active: boolean;
}

type StepsPayload = Array<IStep>;

@Component({
  standalone: true,
  selector: 'webui-stepper-indicator',
  templateUrl: './stepper-indicator.component.html',
  styleUrls: ['./stepper-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class StepperIndicatorComponent implements OnInit, OnChanges {
  private steps: BehaviorSubject<StepsPayload> = new BehaviorSubject(
    [] as StepsPayload
  );

  @Input() public currentStep?: number;
  @Input() public stepCount?: number;

  public steps$: Observable<StepsPayload> = this.steps.asObservable();

  public ngOnInit(): void {
    this.generateSteps();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes['currentStep'].isFirstChange()) {
      this.generateSteps();
    }
  }

  public get linearGradient(): { [key: string]: string } {
    const points = [
      '#2196F3 0%',
      `#2196F3 ${
        (100 / (this.stepCount || 1)) * ((this.currentStep || 1) + 1)
      }%`,
      'rgba(40, 163, 252, 0.03) 100%',
    ];

    return {
      background: `linear-gradient(90deg, ${points.join(', ')})`,
    };
  }

  private generateSteps(): void {
    if (!this.stepCount) {
      return;
    }

    const previousValue = this.steps.value;
    let nextValue: StepsPayload = previousValue;

    if (!previousValue.length) {
      nextValue = new Array(this.stepCount).fill('').map((el, index) => ({
        label: el + (index + 1),
        active: index <= (this.currentStep || 0),
      }));
    } else {
      nextValue.forEach(
        (el, index) => (el.active = index <= (this.currentStep || 0))
      );
    }

    this.steps.next(nextValue);
  }
}
