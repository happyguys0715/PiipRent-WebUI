import { Component, Inject, OnInit } from '@angular/core';
import { Timesheet, TimesheetModel } from '@webui/data';
import { isMobile } from '@webui/utilities';
import {
  EvaluateFieldComponent,
  SignatureComponent,
  SpinnerComponent,
  UserAvatarComponent,
} from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormatPipe } from '@webui/shared';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef, Modal, Status } from '@webui/models';
import { BaseModalComponent } from '../base-modal/base-modal.component';

export type ApproveTimesheetModalConfig = {
  evaluateEvent(e: any, closeModal: () => any): any;
  sendSignature(submitButton?: any): any;

  endpoint: string;
  evaluateEndpoint: string;
  evaluated: boolean;
  timesheet: {
    date: string;
    started_at: string;
    break: string;
    ended_at: string;
    shift_start_end: string;
    break_start_and: string;
    unformated_date: string;
    total: string;
  };
  form: any;
  signature: {
    endpoint: string;
    value: string;
  };
  label: {
    avatar: { origin: string; thumb: string };
    fullName: string;
  };
  data: {
    evaluation_score: string;
  };
  signatureStep: boolean;
  approve: boolean;
};

@Component({
  standalone: true,
  selector: 'webui-approve-timesheet-modal',
  templateUrl: './approve-timesheet-modal.component.html',
  styleUrls: ['./approve-timesheet-modal.component.scss'],
  imports: [
    CommonModule,
    UserAvatarComponent,
    TranslateModule,
    BaseModalComponent,
    DateFormatPipe,
    EvaluateFieldComponent,
    SpinnerComponent,
    SignatureComponent,
  ],
})
export class ApproveTimesheetModalComponent extends Modal implements OnInit {
  // config!: ApproveTimesheetModalConfig;
  saveProcess?: boolean;

  // timesheet!: Timesheet;
  model!: TimesheetModel;

  isMobile = isMobile;

  get config() {
    return this.modalData.config;
  }

  constructor(
    modal: DialogRef,
    @Inject(DIALOG_DATA)
    public modalData: {
      config: ApproveTimesheetModalConfig;
      timesheet: Timesheet;
    }
  ) {
    super(modal);
  }

  ngOnInit() {
    this.model = new TimesheetModel(this.modalData.timesheet);
  }

  public formEvent(e: any) {
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }

    if (e.type === 'sendForm' && e.status === 'success') {
      this.close(Status.Success);
    }
  }

  public errorEvent() {
    this.saveProcess = false;
  }

  public updateSignature(signature: string) {
    this.config.signature.value = signature;
  }
}
