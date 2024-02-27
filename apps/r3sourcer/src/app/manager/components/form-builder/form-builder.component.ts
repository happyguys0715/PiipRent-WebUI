import {
  Component,
  Input,
  Output,
  EventEmitter,
  // ElementRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';

// import { GenericFormComponent, GenericFormService } from '@webui/dynamic-form';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { CloseButtonComponent } from '@webui/ui';
// import { GenericFormComponent } from '@webui/generic-form';
import { FormBuilderFormComponent } from '../../../components';
import { FormBuilderService, GenericFormService } from '@webui/core';
import { GenericFormComponent } from '@webui/generic-components';
// import { FormBuilderFormComponent } from 'dynamic-form/src/lib/containers/form-builder-form/form-builder-form.component';
import { DialogRef, dialogConfig } from '@webui/models';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  selector: 'webui-form-builder',
  templateUrl: 'form-builder.component.html',
  imports: [
    GenericFormComponent,
    TranslateModule,
    NgIf,
    CloseButtonComponent,
    FormBuilderFormComponent,
  ],
  providers: [FormBuilderService],
})
export class FormBuilderComponent {
  @Input()
  public endpoint!: string;

  @Input()
  public id?: string = '';

  @Input()
  public path!: string;

  @ViewChild('modal')
  public modalTemplate!: TemplateRef<unknown>;

  @Output()
  public str: EventEmitter<any> = new EventEmitter();

  public label!: string;
  public previewLink!: string;
  public data: any;
  public error: any;
  public config: any;
  public modalRef!: DialogRef;

  public links!: any[];
  public domain = location.origin;
  public formLink: string;

  constructor(
    private router: Router,
    private modalService: Dialog,
    private genericFormService: GenericFormService
  ) {
    this.formLink = location.origin + '/registration';
  }

  public eventHandler(event: any) {
    if (event.type === 'sendForm' && event.status === 'success' && !this.id) {
      this.id = event.data.id;
      this.links = event.data.company_links;
      this.label = event.data.__str__;
      if (event.data.groups && !event.data.groups.length) {
        this.data = {
          groups: {
            action: 'add',
            data: {
              fields: [...event.data.model_fields, ...event.data.extra_fields],
            },
          },
          id: {
            action: 'add',
            data: {
              value: event.data.id,
            },
          },
        };
      }
      this.str.emit({
        str: event.data.__str__,
      });
    } else if (
      event.type === 'sendForm' &&
      event.status === 'success' &&
      this.id
    ) {
      this.router.navigate([this.path]);
    }
  }

  public eventForm(e: any) {
    if (e && e.data) {
      this.label = e.data.__str__;
      this.links = e.data.company_links;
      this.data = {
        groups: {
          action: 'add',
          data: {
            fields: [...e.data.model_fields, ...e.data.extra_fields],
            id: e.data.id,
          },
        },
      };
      this.str.emit({
        str: e.data.__str__,
      });
    } else if (e.str) {
      this.str.emit({
        str: e.str,
      });
    }
  }

  public showPreview() {
    this.modalRef = this.modalService.open(
      this.modalTemplate,
      dialogConfig({ size: 'md' })
    );

    return false;
  }

  public setFormConfig(config: any) {
    this.config = config;
  }

  public delete() {
    if (this.id) {
      this.genericFormService.delete(this.endpoint, this.id).subscribe(
        () => {
          this.router.navigate([this.path]);
        },
        (err: any) => (this.error = err)
      );
    }
  }
}
