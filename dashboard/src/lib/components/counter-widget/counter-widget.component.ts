import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  UserService,
  DateRangeService,
  DateRange,
  dateRangeLabel,
  Label,
  SiteSettingsService,
} from '@webui/core';
import { checkAndReturnTranslation } from '@webui/utilities';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { WidgetService } from '../../services';
import { CommonModule } from '@angular/common';
import { RangeButtonComponent } from '../range-button/range-button.component';
import { DashboardWidgetComponent } from '../dashboard-widget/dashboard-widget.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RangeFieldComponent } from '../range-field/range-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '@webui/ui';

type DateParams = {
  started_at_0: string;
  started_at_1: string;
};

@Component({
  standalone: true,
  selector: 'webui-counter-widget',
  templateUrl: './counter-widget.component.html',
  styleUrls: ['./counter-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RangeButtonComponent,
    DashboardWidgetComponent,
    ButtonsModule,
    ReactiveFormsModule,
    FormsModule,
    RangeFieldComponent,
    TranslateModule,
    LoaderComponent,
  ],
  providers: [WidgetService],
})
export class CounterWidgetComponent implements OnInit, OnDestroy {
  data$!: Observable<any>;
  dateParams$: BehaviorSubject<DateParams> = new BehaviorSubject(
    {} as DateParams
  );
  dateRangeTypeControl: FormControl = new FormControl(
    DateRange.ThisMonth.toString()
  );
  dateRange = DateRange;
  dateRangeList = [
    DateRange.LastMonth,
    DateRange.ThisMonth,
    DateRange.ThisWeek,
    DateRange.ThisYear,
    DateRange.Today,
    DateRange.Custom,
  ].map(el => el.toString());
  widgetLabel: Label = {
    key: 'counter',
    value: 'Salary summary',
  };
  rangeForm!: FormGroup;
  hasForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  private controlSubscription!: Subscription;

  loading$ = this.loading.asObservable();

  constructor(
    private widgetService: WidgetService,
    private userService: UserService,
    private dateRangeService: DateRangeService,
    private settingsService: SiteSettingsService,
    private storage: LocalStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const candidateId = this.userService.user?.data.contact.candidate_contact;

    if (!candidateId) {
      return;
    }

    this.data$ = this.dateParams$.pipe(
      switchMap((params: DateParams) =>
        this.widgetService.getCounterWidgetData(candidateId, params).pipe(
          tap(() => this.loading.next(false)),
          map(data => {
            const { activities } = data;

            return {
              ...data,
              activities: activities.map(activity =>
                this.translateActivity(activity)
              ),
            };
          })
        )
      )
    );

    this.rangeForm = this.fb.group(
      this.dateRangeService.getFormDatesByRange(DateRange.ThisMonth.toString())
    );
    this.controlSubscription = this.dateRangeTypeControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(value => {
        this.changeDateRange(value);
      });
  }

  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }

  changeDateRange(type: string) {
    if (type === DateRange.Custom.toString()) {
      this.hasForm$.next(true);
      return;
    }

    this.hasForm$.next(false);
    this.loading.next(true);
    this.rangeForm.patchValue(this.dateRangeService.getFormDatesByRange(type));

    this.dateParams$.next(
      this.getDateParams(this.dateRangeService.getDatesByRange(type))
    );
  }

  isRange(type: DateRange) {
    this.dateRangeTypeControl.value === type;
  }

  getLabel(type: string): Label {
    return dateRangeLabel[type];
  }

  onRangeFormSubmit() {
    const formValue = this.rangeForm.value;

    this.loading.next(true);
    this.dateParams$.next(
      this.getDateParams(this.dateRangeService.parseRange(formValue))
    );
  }

  private getDateParams(config: { from: string; to: string }): DateParams {
    return {
      started_at_0: config.from,
      started_at_1: config.to,
    };
  }

  private translateActivity(activity: { label: string; translations: any[] }) {
    const { label, translations } = activity;
    const { country_code } = this.settingsService.settings;
    const lang = this.storage.retrieve('lang');

    const trans = checkAndReturnTranslation(
      { __str__: label, translations },
      country_code,
      lang
    );

    return {
      ...activity,
      label: trans,
    };
  }
}
