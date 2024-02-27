import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isCandidate, isMobile } from '@webui/utilities';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormElementDirective } from '../../../directives';
// import { FormElementDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    forwardRef(() => FormElementDirective),
  ],
})
export class FormGroupComponent implements OnInit {
  public config: any;
  public group!: FormGroup;
  public errors: any;
  public message: any;
  public isMobileDevice = isMobile() && isCandidate();
  translationKey!: string;

  @Output() public event = new EventEmitter();
  @Output() public buttonAction = new EventEmitter();

  get labelText() {
    return this.config.name
      ? this.config.label || ''
      : this.config.label || ' ';
  }

  ngOnInit() {
    this.translationKey = `group.${this.config.translateKey}`;
  }

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonActionHandler(e: any) {
    this.buttonAction.emit(e);
  }
}
