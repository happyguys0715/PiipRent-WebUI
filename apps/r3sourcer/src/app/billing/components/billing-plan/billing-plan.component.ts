import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService, EventType, UserService } from '@webui/core';
import {
  BillingSubscription,
  DialogRef,
  DialogType,
  Plan,
  Status,
} from '@webui/models';
import { Time } from '@webui/time';
import { BehaviorSubject, finalize } from 'rxjs';
import { BillingService } from '../../services';
import { CommonModule } from '@angular/common';
import {
  CloseButtonComponent,
  FaIconComponent,
  SpinnerComponent,
} from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormatPipe } from '@webui/shared';

@Component({
  standalone: true,
  selector: 'webui-billing-plan',
  templateUrl: 'billing-plan.component.html',
  styleUrls: ['./billing-plan.component.scss'],
  imports: [
    CommonModule,
    FaIconComponent,
    TranslateModule,
    DateFormatPipe,
    CloseButtonComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
})
export class BillingPlanComponent implements OnInit, OnChanges, OnDestroy {
  private _saving = new BehaviorSubject<boolean>(false);

  types!: Record<string, string>;

  @Input() public currentPlan?: BillingSubscription;
  @Input() public workerCount!: number;
  @Input() public plans!: Plan[];
  @Input() public currency = 'USD';
  @Input() public cardInformation?: {
    payment_information_submited: true;
    card_number_last4: null | string;
  };
  @Input() hasSubscriptions = false;

  @ViewChild('subscription') public modal!: ElementRef;

  @Output() public cancelingPlan = new EventEmitter();

  @Output() changed = new EventEmitter<'create' | 'update'>();

  private _planControl = new FormControl<any>(null);
  public dialogRef?: DialogRef;

  saving$ = this._saving.asObservable();
  workerCountControl = new FormControl(5, [Validators.min(1)]);

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    this.workerCountControl.patchValue(this.workerCount);
  }

  get hasSelectedPlan() {
    if (!this.currentPlan) {
      return this._planControl.value;
    }

    return (
      this._planControl.value?.id !== this.currentPlan?.subscription_type ||
      this.currentPlan?.worker_count !== this.workerCountControl.value
    );
  }

  get hasAttachedCC() {
    return this.cardInformation?.payment_information_submited;
  }

  get trialExpires() {
    const expires = Time.parse(this.userService.user?.data.end_trial_date);

    return expires.format();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['plans'] && changes['plans'].currentValue) {
      this._planControl.patchValue(
        this.plans?.find(
          plan => plan.id === this.currentPlan?.subscription_type
        )
      );
    }

    this.types = {};

    if (this.plans) {
      for (const plan of this.plans) {
        const key = plan.id as number;

        this.types[key] = plan.type as string;
      }
    }
  }

  public ngOnDestroy() {
    this.dialogRef?.close();
  }

  public updatePlan(plan: any) {
    this._saving.next(true);
    this.billingService
      .setPlan(plan)
      .pipe(finalize(() => this._saving.next(false)))
      .subscribe(() => {
        this.dialogRef?.close();
        this.changed.emit(plan.changed ? 'update' : 'create');
      });
  }

  public planPay(plan: Plan): number {
    const start: number =
      plan.start_range_price_annual || plan.start_range_price_monthly;

    const workers = this.workerCountControl.value as number;

    const price =
      start +
      (workers - plan.start_range) * (plan.step_change_val * plan.procent);

    return workers > plan.start_range ? Math.round(price) : start;
  }

  public planPayYear(plan: Plan): number {
    const price = this.planPay(plan);

    return Math.round(price * 12);
  }

  public selectPlan(plan: Plan) {
    this._planControl.patchValue(plan);
  }

  public checkActivePlan(plan: Plan) {
    const selectedPlan = this._planControl.value;

    return selectedPlan
      ? selectedPlan.id === plan.id
      : this.currentPlan?.subscription_type === plan.id;
  }

  public setPlan() {
    if (this.cardInformation?.payment_information_submited) {
      this.openModal();
    }
  }

  public changePlan() {
    this.openModal();
  }

  public cancelPlan() {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.ConfirmAction,
      onInit: (dialogRef: DialogRef) => (this.dialogRef = dialogRef),
      options: {
        data: {
          message: 'message.delete_subscription',
          accept: 'delete',
          decline: 'action.cancel',
        },
      },
    });

    this.dialogRef?.closed.subscribe(status => {
      if (status === Status.Accept) {
        this.cancelingPlan.emit();
      }
    });
  }

  public openModal() {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.CustomDialog,
      onInit: (dialogRef: any) => (this.dialogRef = dialogRef),
      dialog: this.modal,
      options: {
        size: 'sm',
      },
    });
  }

  savePlan() {
    const plan = this._planControl.value;

    const body = {
      type: plan.type,
      worker_count: this.workerCountControl.value,
      price:
        plan.type === 'monthly' ? this.planPay(plan) : this.planPayYear(plan),
      changed: this.currentPlan,
    };

    this.updatePlan(body);
  }
}
