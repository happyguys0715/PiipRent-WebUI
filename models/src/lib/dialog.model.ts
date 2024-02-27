import { DialogRef as CdkDialogRef } from '@angular/cdk/dialog';

export { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

export enum DialogType {
  ChangeEmail,
  ChangePhoneNumber,
  ConfirmAction,
  CustomDialog,
  TransferToRegularCompany,
  EvaluateCandidate,
  Evaluate,
  ApproveTimesheet,
  Tracking,
  Signature,
  FillInMap,
  Submission,
  ApproveWorksheet,
  EmailPreview,
  DeleteTool,
  RentTool,
}

import { Endpoints } from './endpoint.model';

export enum Reason {
  Cancel,
}

export enum Status {
  Success,
  Accept,
  Error,
}

const dialogSizes = {
  sm: 460,
  md: 960,
  lg: 1200,
};

export type DialogConfig = {
  size: 'lg' | 'md' | 'sm';
  windowClass?: string;
};

export const dialogConfig = (config: DialogConfig = { size: 'lg' }) => {
  const maxWidth = dialogSizes[config.size];

  return {
    maxWidth,
    minWidth: 320,
    width: '100%',
    panelClass: config.windowClass || '',
    maxHeight: '90vh',
  };
};

export class Modal {
  modal: CdkDialogRef;

  constructor(modal: CdkDialogRef) {
    this.modal = modal;
  }

  dismiss(reason?: Reason) {
    this.modal.close(reason);
  }

  close(status?: Status, result?: unknown): void {
    this.modal.close({
      status,
      result,
    });
  }
}

export const smallModalEndpoints = [
  Endpoints.SkillRateCoefficient,
  Endpoints.CandidateTag,
  Endpoints.CandidateFormalities,
  Endpoints.JobOffer,
  Endpoints.TimesheetRates,
  Endpoints.PriceListRate,
];
