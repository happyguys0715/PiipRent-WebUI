import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  ViewChild,
  Output,
  forwardRef,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { BasicElementComponent } from '../basic-element/basic-element.component';
import { FormatString } from '@webui/utilities';
// import { GenericFormService } from '../../../services';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
// import { GenericFormComponent } from '../../generic-form/generic-form.component';
import { FormElementDirective } from '../../../directives';
import { GenericFormService } from '@webui/core';
import { GenericFormComponent } from '../../../generic-form/generic-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { dialogConfig } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-form-replace',
  templateUrl: 'form-replace.component.html',
  imports: [
    CommonModule,
    forwardRef(() => FormElementDirective),
    CloseButtonComponent,
    GenericFormComponent,
    TranslateModule,
  ],
})
export class FormReplaceComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy
{
  @ViewChild('modal')
  public modalTemplate: any;

  @Output()
  public override event: EventEmitter<any> = new EventEmitter();

  public override config!: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;
  public label: boolean | undefined;

  public metadata: any;
  public selfGroup: any;

  public modalData: any;
  public modalRef?: any;

  constructor(
    private fb: FormBuilder,
    private gfs: GenericFormService,
    private modal: Dialog
  ) {
    super();
  }

  public ngOnInit() {
    this.metadata = [];
    this.selfGroup = this.fb.group({});
    this.modalData = {};
    this.addControl(this.config, this.fb);
    this.config.data.subscribe((data: any) =>
      this.generateMetadata(this.config.replace_by, data)
    );
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public generateMetadata(array: any[], data: any): void {
    array.forEach(el => {
      const element = Object.keys(el)[0];
      const key = el[element];
      const value = this.getValueByKey(key, data);
      if (value) {
        const format = new FormatString();
        const elConfig = Object.assign(this.config.elements[element]);
        if (elConfig.endpoint) {
          elConfig.endpoint = format.format(elConfig.endpoint, data);
          if (elConfig.query) {
            elConfig.query = format.format(elConfig.query, data);
          }
        }
        if (elConfig.id) {
          elConfig.id = format.format(elConfig.id, data);
        }
        if (elConfig.key) {
          elConfig.value = this.getValueByKey(elConfig.key, data);
        }
        this.metadata.push(elConfig);
      }
    });
  }

  public getValueByKey(key: string, data: any): any {
    const keysArray = key.split('.');
    const firstKey: string = keysArray.shift() as string;
    if (data) {
      if (keysArray.length === 0) {
        return data[firstKey];
      } else if (keysArray.length > 0) {
        const combineKeys = keysArray.join('.');
        return this.getValueByKey(combineKeys, data[firstKey]);
      }
    } else {
      return false;
    }
  }

  public eventHandler(event: any): void {
    let endpoint: string;
    let query: string;

    const action = `${event.action}Action` as keyof FormReplaceComponent;
    if (event.target && event.target === 'form') {
      endpoint = event.endpoint;
      query = event.query;
      this[action](endpoint, query, event.el);
    }
    if (event.type && event.type === 'click') {
      endpoint = event.el.endpoint;
      query = event.el.query;
      this[action](endpoint, query, event.el);
    }
  }

  public addAction(endpoint: string, query?: string, el?: any): void {
    if (query) {
      endpoint += `?${query}`;
    }
    this.modalData = {};
    this.modalData.endpoint = endpoint;
    this.modalData.el = el;
    this.modalRef = this.modal.open(this.modalTemplate, dialogConfig());
  }

  public sendAction(endpoint: string, query: string): void {
    if (query) {
      endpoint += `?${query}`;
      this.gfs.getByQuery(endpoint, query).subscribe((res: any) => {
        this.updateReplace();
      });
    } else {
      return;
    }
  }

  public editAction(endpoint: string, query: string, el: any) {
    this.modalData = {};
    this.modalData.endpoint = endpoint;
    this.modalData.id = el.id;
    this.modalData.el = el;
    this.modalRef = this.modal.open(this.modalTemplate, dialogConfig());
  }

  public deleteAction(endpoint: string, query: string, el: any) {
    this.modalData = {};
    this.modalData.type = 'delete';
    this.modalData.endpoint = endpoint;
    this.modalData.id = el.id;
    this.modalData.el = el;
    this.modalRef = this.modal.open(this.modalTemplate, dialogConfig());
  }

  public deleteElement() {
    this.modalRef?.close();
    this.gfs
      .delete(this.modalData.endpoint, this.modalData.id)
      .subscribe((res: any) => {
        this.updateReplace();
      });
  }

  public formEvent(e: any) {
    if (e.type === 'sendForm' && e.status === 'success') {
      this.modalRef?.close();
      this.updateReplace();
    }
  }

  public updateReplace() {
    this.event.emit({
      type: 'updateData',
      el: this.config,
    });
  }
}
