import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementDirective } from '../../../directives';
// import { FormElementDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-form-column',
  templateUrl: 'form-column.component.html',
  imports: [CommonModule, forwardRef(() => FormElementDirective)],
})
export class FormColumnComponent {
  public config: any;
  public errors: any;
  public message: any;
  public group: any;

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
