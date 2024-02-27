import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { isCandidate, isMobile } from '@webui/utilities';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormElementDirective } from '../../../directives';
// import { FormElementDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-form-row',
  templateUrl: 'form-row.component.html',
  styleUrls: ['./form-row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    TranslateModule,
    forwardRef(() => FormElementDirective),
  ],
})
export class FormRowComponent implements OnInit {
  public config: any;
  public group!: FormGroup;
  public errors: any;
  public message: any;
  public className: any;
  public formId!: number;
  public formData!: BehaviorSubject<any>;

  public isMobileDevice = isMobile() && isCandidate();
  public isHidden = false;
  label = '';

  private subscriptions: Subscription[] = [];

  @Input()
  public last!: boolean;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  public ngOnInit() {
    if (!this.config.editForm && this.config.label) {
      this.config.label = this.config.label.includes('{')
        ? ''
        : this.config.label;
    }

    this.className = this.config.className || 'form-row-items';

    this.checkChildrenOnReadOnlyProperty();
    this.checkFormData();
    this.label = this.config.translateKey
      ? `group.${this.config.translateKey}`
      : this.config.label;
  }

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonActionHandler(e: any) {
    this.buttonAction.emit(e);
  }

  public checkFormData() {
    if (this.config.formData) {
      const subscription = this.config.formData.subscribe((value: any) => {
        const { data } = value;

        this.checkIsHidden(data);
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkChildrenOnReadOnlyProperty() {
    if (!this.config.editForm) {
      this.config.children.forEach((column: any) => {
        if (column.children && column.children.length) {
          const count = column.children.length;
          let hiddenFields = 0;

          column.children.forEach((field: any) => {
            if (
              field.read_only &&
              (field.type === 'input' || field.type === 'related')
            ) {
              hiddenFields += 1;
            }
          });
          if (count === hiddenFields) {
            column.hidden = true;
          }
        }
      });
    }
  }

  private checkIsHidden(data: any): boolean | void {
    if (!this.config.isHidden) {
      return false;
    }

    this.isHidden = this.config.isHidden(data);
  }
}
