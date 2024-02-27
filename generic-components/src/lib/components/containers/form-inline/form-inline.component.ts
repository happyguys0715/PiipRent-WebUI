import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormElementDirective } from '../../../directives';

@Component({
  standalone: true,
  selector: 'webui-form-inline',
  templateUrl: './form-inline.component.html',
  styleUrls: ['./form-inline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, forwardRef(() => FormElementDirective)],
})
export class FormInlineComponent {
  public config: any;
  public group!: FormGroup;
  public errors: any;
  public message: any;
  public className: any;
  public formId!: number;
  public formData!: BehaviorSubject<any>;

  @Output()
  public event = new EventEmitter<any>();

  @Output()
  public buttonAction = new EventEmitter<any>();

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonActionHandler(e: any) {
    this.buttonAction.emit(e);
  }
}
