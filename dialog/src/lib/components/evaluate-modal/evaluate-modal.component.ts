import { Component, Inject } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from '@webui/ui';
import { FormsModule } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { DIALOG_DATA, DialogRef, Modal, Status } from '@webui/models';
import { GenericFormService } from '@webui/core';
import { GenericFormComponent } from '@webui/generic-components';
import { MetadataService } from '@webui/metadata';

export type EvaluateModalConfig = {
  signature?: boolean;
  evaluate?: boolean;
  label: {
    picture?: string;
    contactAvatar: string;
    name: string;
  };
  endpoint: string;
  edit: boolean;
  extendData: { [key: string]: any };
  data: { [key: string]: any };
};

@Component({
  standalone: true,
  selector: 'webui-evaluate-modal',
  templateUrl: './evaluate-modal.component.html',
  styleUrls: ['./evaluate-modal.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    SpinnerComponent,
    NgbRatingModule,
    FormsModule,
    BaseModalComponent,
    GenericFormComponent,
  ],
  providers: [GenericFormService, MetadataService],
})
export class EvaluateModalComponent extends Modal {
  // config!: EvaluateModalConfig;
  saveProcess?: boolean;
  approveEndpoint?: string | null;

  get config() {
    return this.modalData.config;
  }

  constructor(
    modal: DialogRef,
    private genericFormService: GenericFormService,
    @Inject(DIALOG_DATA) public modalData: { config: EvaluateModalConfig }
  ) {
    super(modal);
  }

  public formEvent(e: any) {
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }

    if (e.type === 'sendForm' && e.status === 'success') {
      if (this.approveEndpoint) {
        this.genericFormService
          .editForm(this.approveEndpoint, {})
          .subscribe(() => {
            this.close(Status.Success);
            this.approveEndpoint = null;
          });
      } else {
        this.close(Status.Success);
      }
    }
  }

  public errorEvent() {
    this.saveProcess = false;
  }

  public sendEvaluateData(endpoint: string, data: any) {
    this.saveProcess = true;

    this.genericFormService
      .editForm(endpoint, data)
      .pipe(finalize(() => (this.saveProcess = false)))
      .subscribe(() => {
        this.formEvent({
          type: 'sendForm',
          status: 'success',
        });
      });
  }
}
