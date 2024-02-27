import { Injectable } from '@angular/core';
import { EventService, EventType } from '@webui/core';
import { filter, Subject, takeUntil } from 'rxjs';
import {
  DialogConfig,
  DialogRef,
  DialogType,
  dialogConfig,
} from '@webui/models';
import {
  ApproveTimesheetModalComponent,
  ApproveWorksheetModalComponent,
  ChangeEmailDialogComponent,
  ChangePhoneNumberDialogComponent,
  ConfirmDialogComponent,
  DeleteToolDialogComponent,
  EmailPreviewComponent,
  EvaluateCandidateModalComponent,
  EvaluateModalComponent,
  FillinMapComponent,
  RentToolDialogComponent,
  SignatureModalComponent,
  SubmissionModalComponent,
  TrackingModalComponent,
  TransferToRegularDialogComponent,
} from '../components';
// import { PassTestModalComponent } from '@webui/application-test';
import { Dialog } from '@angular/cdk/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

const dialogMap = new Map<DialogType, unknown>();

dialogMap.set(DialogType.ChangeEmail, ChangeEmailDialogComponent);
dialogMap.set(DialogType.ChangePhoneNumber, ChangePhoneNumberDialogComponent);
dialogMap.set(DialogType.ConfirmAction, ConfirmDialogComponent);
dialogMap.set(
  DialogType.TransferToRegularCompany,
  TransferToRegularDialogComponent
);

dialogMap.set(DialogType.ApproveTimesheet, ApproveTimesheetModalComponent);
dialogMap.set(DialogType.Evaluate, EvaluateModalComponent);
dialogMap.set(DialogType.EvaluateCandidate, EvaluateCandidateModalComponent);
dialogMap.set(DialogType.Submission, SubmissionModalComponent);
dialogMap.set(DialogType.ApproveWorksheet, ApproveWorksheetModalComponent);
dialogMap.set(DialogType.Tracking, TrackingModalComponent);
dialogMap.set(DialogType.FillInMap, FillinMapComponent);
dialogMap.set(DialogType.Signature, SignatureModalComponent);
dialogMap.set(DialogType.EmailPreview, EmailPreviewComponent);
dialogMap.set(DialogType.DeleteTool, DeleteToolDialogComponent);
dialogMap.set(DialogType.RentTool, RentToolDialogComponent);

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _destroy = new Subject<void>();

  constructor(
    private modalService: Dialog,
    private eventService: EventService,
    private readonly sso: ScrollStrategyOptions
  ) {}

  public open(content: any, options: DialogConfig): DialogRef {
    return this.modalService.open(content, {
      ...dialogConfig({ size: options['size'] }),
      ...options,
    });
  }

  public init() {
    this.subscribeOnEvent();
  }

  public destroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private subscribeOnEvent() {
    this.eventService.event$
      .pipe(
        takeUntil(this._destroy),
        filter(event => event === EventType.OpenDialog)
      )
      .subscribe(() => {
        const {
          type,
          onInit,
          content = {},
          dialog,
          options = {},
        } = this.eventService.payload;

        const dialogRef = this.open(
          type === DialogType.CustomDialog ? dialog : dialogMap.get(type),
          {
            size: 'sm',
            ...options,
          }
        );

        // if (dialogRef.componentInstance) {
        //   dialogRef.componentInstance.payload = content;
        // }

        if (onInit) {
          onInit(dialogRef);
        }
      });
  }
}
