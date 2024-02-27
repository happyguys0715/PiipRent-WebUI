import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CollapseElement } from '@webui/metadata';

// import { IFormElement } from '../../interfaces';
// import { Form } from '../../models';
// import { FormService } from '../../services';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormElementDirective } from '../../../directives';
import { Form, IFormElement } from '@webui/models';
import { FormService } from '@webui/core';
// import { FormElementDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-form-collapse',
  templateUrl: './form-collapse.component.html',
  styleUrls: ['./form-collapse.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    forwardRef(() => FormElementDirective),
  ],
})
export class FormCollapseComponent implements OnInit {
  public config!: CollapseElement & IFormElement;
  public group!: FormGroup;
  public errors: any;
  public message: any;

  isCollapsed!: boolean;
  translationKey!: string;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  constructor(private formService: FormService) {}

  public ngOnInit() {
    const { collapsed, isCollapsed, translateKey } = this.config;
    this.translationKey = `group.${translateKey}`;

    if (isCollapsed && this.formService) {
      const form: Form = this.formService.getForm(this.config.formId);

      if (form) {
        this.isCollapsed = isCollapsed(form.initialData);
      }
    } else {
      this.isCollapsed = collapsed;
    }

    this.updateAdditionalData();
  }

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonActionHandler(e: any) {
    this.buttonAction.emit(e);
  }

  public updateIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;

    this.updateAdditionalData();
  }

  private updateAdditionalData() {
    const key = `${this.config.translateKey}_collapsed`;

    this.formService
      .getForm(this.config.formId)
      .updateAdditionalData(key, this.isCollapsed);
  }
}
