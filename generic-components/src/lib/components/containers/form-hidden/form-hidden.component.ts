import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormElementDirective } from '../../../directives';
// import { FormElementDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-form-hidden',
  templateUrl: 'form-hidden.component.html',
  imports: [CommonModule, forwardRef(() => FormElementDirective)],
})
export class FormHiddenComponent {
  public config: any;
  public group!: FormGroup;
  public errors: any;
  public message: any;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonActionHandler(e: any) {
    this.buttonAction.emit(e);
  }
}
