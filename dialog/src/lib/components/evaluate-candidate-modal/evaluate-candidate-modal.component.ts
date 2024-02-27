import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TimeSheet } from '@webui/data';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RatingControlComponent, SpinnerComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../dialog/dialog.component';
import { TimesheetDetailsPreviewComponent } from '../timesheet-details-preview/timesheet-details-preview.component';
import { DIALOG_DATA, DialogRef, Modal, Status } from '@webui/models';
import { GenericFormService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-evaluate-candidate-modal',
  templateUrl: './evaluate-candidate-modal.component.html',
  styleUrls: ['./evaluate-candidate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RatingControlComponent,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponent,
    DialogComponent,
    TimesheetDetailsPreviewComponent,
  ],
})
export class EvaluateCandidateModalComponent
  extends Modal
  implements OnInit, OnDestroy
{
  private destroy: Subject<void> = new Subject<void>();
  // public data: any;
  // public endpoint!: string;
  public timeSheet!: TimeSheet;
  public processing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public formGroup!: FormGroup;

  public get formInvalid(): boolean {
    return !!this.formGroup?.invalid;
  }

  public get destroy$(): Observable<void> {
    return this.destroy.asObservable();
  }

  constructor(
    private service: GenericFormService,
    modal: DialogRef,
    @Inject(DIALOG_DATA) public modalData: { data: any; endpoint: string }
  ) {
    super(modal);
  }

  ngOnInit(): void {
    this.timeSheet = new TimeSheet(this.modalData.data);

    this.formGroup = new FormGroup({
      rating: new FormControl(
        this.timeSheet.evaluation
          ? this.timeSheet.evaluation.evaluation_score
          : 5
      ),
    });
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public evaluate() {
    this.processing$.next(true);

    this.service
      .editForm(this.modalData.endpoint, {
        evaluation_score: this.formGroup.value.rating,
      })
      .pipe(finalize(() => this.processing$.next(false)))
      .subscribe(
        () => this.close(Status.Success),
        (err: any) => console.error(err)
      );
  }
}
