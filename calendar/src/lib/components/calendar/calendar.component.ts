import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  Subscription,
} from 'rxjs';
import { forEachObjIndexed, uniq } from 'ramda';

import {
  Calendar,
  CalendarDataService,
  CalendarService,
  SelectDateService,
} from '../../services';
import {
  checkAndReturnTranslation,
  FormatString,
  getFulfilledStatus,
  getRoleId,
  getStorageLang,
  isCandidate,
  isClient,
  isManager,
} from '@webui/utilities';
import { filters } from './calendar-filters.meta';

import {
  EventService,
  EventType,
  FilterService,
  SiteSettingsService,
  TranslateHelperService,
  UserService,
} from '@webui/core';
import {
  dialogConfig,
  DialogRef,
  Endpoints,
  ITranslationPayload,
} from '@webui/models';
import { finalize } from 'rxjs/operators';
import { DateRange, filterDateFormat, Moment, Time } from '@webui/time';
import { IDateRange, Status } from '../../models';
import {
  CheckboxComponent,
  CloseButtonComponent,
  DatepickerComponent,
  FaIconComponent,
  LoaderComponent,
  OverlayDropdownComponent,
  SpinnerComponent,
  TooltipDirective,
} from '@webui/ui';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ApiTranslatePipe, SubscriptionRequiredDirective } from '@webui/shared';
import {
  CalendarTooltipDirective,
  SelectDateDirective,
} from '../../directives';
import {
  FilterHeaderComponent,
  FilterRelatedComponent,
  GenericFormComponent,
} from '@webui/generic-components';
import { Dialog } from '@angular/cdk/dialog';

type StatusFilter = {
  type: Status;
  color: string;
  label: string;
};

@Component({
  standalone: true,
  selector: 'webui-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    OverlayDropdownComponent,
    FaIconComponent,
    DatepickerComponent,
    LoaderComponent,
    SubscriptionRequiredDirective,
    FormsModule,
    CheckboxComponent,
    SelectDateDirective,
    CloseButtonComponent,
    CalendarTooltipDirective,
    RouterModule,
    SpinnerComponent,
    ButtonsModule,
    FilterRelatedComponent,
    FilterHeaderComponent,
    GenericFormComponent,
    TooltipDirective,
    ApiTranslatePipe,
  ],
  providers: [
    CalendarService,
    CalendarDataService,
    SelectDateService,
    FilterService,
  ],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private _loading = new BehaviorSubject<boolean>(false);
  public range = DateRange;
  public currentRange!: FormControl;
  public rangeTitle!: string;
  public calendarData?: { header: string[]; body: any[] | any; date: string };
  public shifts: any;
  public filters = filters;
  public calendarTimes!: any[];

  private langSubscription!: Subscription;

  public shiftStatus: Record<Status, { color: string; key: string }> = {
    [Status.Unfilled]: { color: 'bg-danger', key: 'cancelled' },
    [Status.FullFilled]: { color: 'bg-success', key: 'accepted' },
    [Status.Pending]: { color: 'bg-warning', key: 'undefined' },
    [Status.Open]: { color: 'bg-primary', key: '' },
    [Status.Filled]: { color: 'bg-warning', key: '' },
    [Status.Approved]: { color: 'bg-success', key: '' },
  };

  public statusFilter: Record<'shifts' | 'timesheets', StatusFilter[]> = {
    shifts: [
      { type: Status.Unfilled, color: 'danger', label: 'Unfulfilled' },
      { type: Status.FullFilled, color: 'success', label: 'Fulfilled' },
      { type: Status.Pending, color: 'warning', label: 'Pending' },
    ],

    timesheets: [
      { type: Status.Open, color: 'primary', label: 'Open' },
      { type: Status.Filled, color: 'warning', label: 'Filled' },
      { type: Status.Approved, color: 'success', label: 'Approved' },
    ],
  };

  public statusFilterData!: StatusFilter[];

  public calendarType!: Calendar;

  // Filter values
  public client?: string;
  public candidate?: string;

  public activeShift?: string;
  private extendForm!: unknown;
  private currentRangeType!: DateRange;

  get extendFormInvalid() {
    if (!this.extendForm) {
      return false;
    }

    return (this.extendForm as any).disableSaveButton;
  }

  @ViewChild(DatepickerComponent)
  public datepicker!: ElementRef;

  @ViewChild('modal')
  public modal!: TemplateRef<any>;

  public status = {
    hideAutocomplete: true,
    displayValue(data: Record<number, boolean>): number {
      return Object.keys(data).filter((key: string) => data[parseInt(key)])
        .length;
    },
    data: {} as Record<number, boolean>,
  };
  public currentDate!: Moment;
  public customRange?: IDateRange;
  public modalInfo: any;
  public saveProcess!: boolean;
  jobChecking = false;
  public availability = [];
  public selectedTime!: string;

  public timesheetCounter = [
    {
      type: Status.FullFilled,
      count: 0,
      cssClass: 'text-success',
      text: 'Filled shifts',
    },
    {
      type: Status.Unfilled,
      count: 0,
      cssClass: 'text-danger',
      text: 'Unfilled shifts',
    },
    {
      type: Status.Pending,
      count: 0,
      cssClass: 'text-warning',
      text: 'Pending shifts',
    },
    {
      type: Status.Open,
      count: 0,
      cssClass: 'text-primary',
      text: 'Open',
    },
    {
      type: Status.Filled,
      count: 0,
      cssClass: 'text-warning',
      text: 'Filled',
    },
    {
      type: Status.Approved,
      count: 0,
      cssClass: 'text-success',
      text: 'Approved',
    },
  ];
  isManager = isManager;
  isClient = isClient;
  loading$: Observable<boolean> = this._loading.asObservable();

  public modalRef!: DialogRef;
  private lastData: any;
  private subscriptions!: Subscription[];

  tooltipRef?: TooltipDirective;

  constructor(
    private calendar: CalendarService,
    private data: CalendarDataService,
    private modalService: Dialog,
    private router: Router,
    private userService: UserService,
    private selectDateService: SelectDateService,
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private siteSettings: SiteSettingsService,
    private translate: TranslateHelperService
  ) {}

  get isMonthRange() {
    return this.currentRange.value === DateRange.Month;
  }

  get isWeekRange() {
    return this.currentRange.value === DateRange.Week;
  }

  get isDayRange() {
    return this.currentRange.value === DateRange.Day;
  }

  get rangeForDropdown() {
    if (this.currentRange.value === DateRange.Month) {
      return DateRange.Year;
    }

    return this.currentRange.value;
  }

  get hasSelectedDates() {
    return this.selectDateService.hasSelectedDates();
  }

  get hasActions() {
    return this.calendarType === 0 || this.canClientCreateJob();
  }

  get canCreateJob() {
    return (
      (this.isManager() || this.canClientCreateJob()) &&
      this.hasSelectedDates &&
      this.calendarData
    );
  }

  get role(): string {
    return this.userService.user?.currentRole.name || '';
  }

  ngOnInit() {
    this.currentDate = this.calendar.getToday();
    this.currentRange = new FormControl('');
    this.calendarTimes = this.calendar.calculateTimes();

    if (isCandidate()) {
      this.calendarType = Calendar.Candidate;
      this.statusFilterData = this.statusFilter.timesheets;
      this.statusFilterData.forEach(status => {
        this.status.data[status.type] = true;
      });
    }

    if (isClient()) {
      this.calendarType = Calendar.Client;
      this.statusFilterData = this.statusFilter.shifts;
    }

    if (isManager()) {
      this.calendarType = Calendar.Manager;
      this.statusFilterData = this.statusFilter.shifts;
    }

    this.statusFilterData.forEach(status => {
      this.status.data[status.type] = true;
    });

    const activeStatuses = this.statusFilterData.map(el => el.type);
    this.timesheetCounter = this.timesheetCounter.filter(
      el => activeStatuses.indexOf(el.type) > -1
    );

    const rangeSubscription = this.currentRange.valueChanges.subscribe(
      (value: DateRange) => {
        if (this.currentRangeType === value) {
          return;
        }

        this.calendarData = undefined;
        this.currentRangeType = value;
        this.currentDate = this.calendar.getToday();
        this.selectedTime = '07:00';
        this.selectDateService.clear();
        this.changeCalendar(value);
      }
    );

    const eventSubscription = this.eventService.event$.subscribe(event => {
      if (event === EventType.RefreshCalendar) {
        this.calendarData = undefined;
        this.activeShift = undefined;

        this.changeCalendar();
      }
    });

    this.langSubscription = this.translate.langChange$.subscribe(() => {
      this.updateCalendar(this.currentDate, this.currentRange.value);
    });

    this.subscriptions = [
      rangeSubscription,
      eventSubscription,
      this.langSubscription,
    ];

    this.currentRange.patchValue(DateRange.Month);
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeRange(increment: boolean) {
    this.customRange = undefined;
    const rangeType = this.currentRange.value;
    this.currentDate = this.updateDate(this.currentDate, rangeType, increment);
    this.selectDateService.clear();
    this.changeCalendar(rangeType);

    if (this.activeShift) {
      this.eventService.emit(EventType.CalendarJobSelected, null);
    }
  }

  setDate(date: any) {
    // this.showCalendarDropdown = false;

    if (date.start) {
      this.customRange = date;
      this.currentDate = date.start;
    } else {
      this.currentDate = date;
      this.customRange = undefined;
    }

    this.changeCalendar(this.currentRange.value);
  }

  changeQuery(event: {
    key: 'candidate' | 'client';
    value: { key: string; label: string }[];
  }) {
    this[event.key] = event.value ? event.value[0]?.key : undefined;

    this.changeCalendar();
  }

  updateLayers() {
    if (this.calendarType === Calendar.Candidate) {
      this.prepareTimesheetsData(this.lastData[0], this.lastData[1]);
      this.shifts.push(...this.availability);
    } else {
      this.prepareShiftsData(this.lastData);
    }

    this.updateCalendar(this.currentDate, this.currentRange.value);
  }

  getColor(status: Status): string {
    return this.shiftStatus[status].color;
  }

  getStatus(status: Status): string {
    return this.shiftStatus[status].key;
  }

  public extendJob(data: any) {
    const formatString = new FormatString();

    this.modalInfo = {
      type: 'form',
      endpoint: `/hr/jobs/${data.shift.date.job.id}/extend/`,
      mode: 'edit',
      edit: true,
      data: {
        default_shift_starting_time: {
          action: 'add',
          data: {
            value: formatString.format(
              '{shift.date.job.default_shift_starting_time}',
              data
            ),
          },
        },
        skill: {
          action: 'add',
          data: {
            value: formatString.format('{shift.date.job.position.id}', data),
          },
        },
        job: {
          action: 'add',
          data: {
            value: formatString.format('{shift.date.job.id}', data),
          },
        },
      },
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({
        size: 'md',
        windowClass: 'extend-modal',
      })
    );
  }

  public fillInJob(data: any) {
    const prefix = isManager() ? 'mn' : 'cl';

    this.router.navigateByUrl(
      `/${prefix}/hr/jobs/${data.shift.date.job.id}/fillin?f.shifts-0=${data.shift.id}`
    );
  }

  public formEvent(e: {
    type: string;
    status: 'success';
    form: any;
    checking?: boolean;
  }) {
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }
    // Job creation, extend job success
    if (e.type === 'extend') {
      this.clearSelectedDates();
      this.saveProcess = false;
      this.modalRef?.close();
      this.changeCalendar();
    }
    if (e.type === 'formRegistration') {
      this.extendForm = e.form;
    }
    if (e.type === 'checkObject') {
      this.jobChecking = Boolean(e.checking);
    }
  }

  public formError() {
    this.saveProcess = false;
  }

  public fillinAccess(shift: { date: string; is_fulfilled: Status }) {
    const statusSuccess =
      this.getStatus(shift.is_fulfilled) !== this.getStatus(1);
    const dateSuccess = this.calendar
      .getToday()
      .isBefore(Time.parse(shift.date).add(1, DateRange.Day));

    return statusSuccess && dateSuccess;
  }

  public setAvailability(event: Event, day: any, available: boolean) {
    event.preventDefault();
    event.stopPropagation();

    const { availableId, date } = day;

    const body = {
      confirmed_available: available,
      target_date: date,
      candidate_contact: this.userService.user?.data.contact.candidate_contact,
    };

    if (availableId) {
      this.data
        .updateAvailable(availableId, body)
        .subscribe(() => this.changeCalendar());
    } else {
      this.data.setAvailability(body).subscribe(() => this.changeCalendar());
    }
  }

  public declineJobOffer(id: string) {
    this.data.declineJobOffer(id).subscribe(() => {
      this.changeCalendar(this.currentRange.value);
    });
  }

  public acceptJobOffer(id: string) {
    this.data.acceptJobOffer(id).subscribe(() => {
      this.changeCalendar(this.currentRange.value);
    });
  }

  public canClientCreateJob(): boolean | undefined {
    return isClient() && this.userService.user?.data.allow_job_creation;
  }

  public addJob() {
    const dates = this.selectDateService.getSelectedDates();

    this.modalInfo = {
      endpoint: isClient() ? Endpoints.ClientJobs : Endpoints.Job,
      data: {
        shifts: {
          action: 'add',
          data: {
            value: dates,
            hide: true,
          },
        },
      },
    };

    if (this.isDayRange) {
      this.modalInfo.data['default_shift_starting_time'] = {
        action: 'add',
        data: {
          value: this.selectedTime,
        },
      };
    }

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'md' })
    );
  }

  isSelected(date?: string): boolean {
    return !!date && this.selectDateService.isSelected(date);
  }

  isSelectedTime(time: string) {
    return time === this.selectedTime;
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  clearSelectedDates() {
    this.selectDateService.clear();
  }

  getShiftCount(shifts: any[], status: string) {
    let count = 0;
    shifts.forEach(({ candidates }) => {
      count += candidates[status].length;
    });

    return count;
  }
  getShiftCandidateCount(candidates: any[], shift_id_default: string) {
    let count = 0;
    candidates.forEach(({ shift_id }) => {
      if (shift_id === shift_id_default) {
        count++;
      }
    });
    return count;
  }

  getUnfulfilledCount(shifts: any[]) {
    let count = 0;
    shifts.forEach(({ shift }) => {
      const { workers_details, workers } = shift;
      const shiftUnfilled =
        workers - workers_details['accepted'] - workers_details['undefined'];
      count += shiftUnfilled;
    });

    return count;
  }

  getShiftDataWeekCalendar(tooltip: {
    loaded: boolean;
    loading: boolean;
    shift: any;
  }) {
    if (tooltip.loaded) {
      return;
    }

    tooltip.loading = true;

    this.getShift(tooltip.shift.date.id)
      .pipe(
        finalize(() => {
          tooltip.loading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe(response => {
        const el = this.parseData(response, true);
        const { shift: shiftData, ...rest } = el;
        const newData = {
          ...tooltip,
          ...rest,
          shift: {
            ...tooltip.shift,
            date: {
              ...tooltip.shift.date,
              ...shiftData,
            },
          },
        };

        Object.assign(tooltip, newData);
        tooltip.loaded = true;
      });
  }

  public onTooltipShown(tooltip: TooltipDirective): void {
    this.tooltipRef?.close();
    this.tooltipRef = tooltip;
  }

  public onHideTooltip(): void {
    this.tooltipRef = undefined;
  }

  getShiftData(day: {
    loaded: boolean;
    data: any[];
    loading: boolean;
    tooltip: any;
    isOpen: boolean;
  }) {
    if (day.loaded) {
      return;
    }

    if (isCandidate()) {
      return;
    }

    const shiftDates = day.data.map(item => item.shift.date.id);
    const shiftRequests = uniq(shiftDates).map(id => this.getShift(id));

    forkJoin(shiftRequests)
      .pipe(
        finalize(() => {
          day.loading = false;
          this.tooltipRef?.reposition();
          this.cd.markForCheck();
        })
      )
      .subscribe(response => {
        const parsedShiftDates = response.map(shift =>
          this.parseData(shift, true)
        );

        Object.keys(day.tooltip).forEach(key => {
          if (!Array.isArray(day.tooltip[key])) {
            return;
          }

          day.tooltip[key] = day.tooltip[key].map((data: any) => {
            const el = parsedShiftDates.find(
              el => el.shift_date_id === data.shift.date.id
            );

            if (!el) {
              return data;
            }

            const { shift, ...rest } = el;

            return {
              ...data,
              ...rest,
              shift: {
                ...data.shift,
                date: {
                  ...data.shift.date,
                  ...shift,
                },
              },
            };
          });
        });
        day.loaded = true;
      });

    day.loading = true;

    day.isOpen = true;
  }

  selectJob(event: MouseEvent, shift: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.activeShift === shift.shift.id) {
      this.activeShift = undefined;
      this.eventService.emit(EventType.CalendarJobSelected, null);
      return;
    }

    this.activeShift = shift.shift.id;
    this.eventService.emit(EventType.CalendarJobSelected, shift);

    return false;
  }

  getPlacement(
    i: number,
    length: number
  ): 'bottom-left' | 'bottom-right' | 'bottom' {
    if (i < 2) {
      return 'bottom-left';
    }

    if (i + 3 > length) {
      return 'bottom-right';
    }

    return 'bottom';
  }

  getCandidateLink(id: string) {
    return [`/mn${Endpoints.CandidateContact}${id}/change`];
  }

  // onShowTooltip(tooltip: TooltipDirective): void {
  //   // this.activeTooltip?.hide();
  //   // this.activeTooltip = tooltip;
  //
  //   tooltip.show();
  // }

  private changeCalendar(type?: DateRange) {
    const rangeType = type || this.currentRange.value;
    const range =
      this.customRange ||
      this.calendar.getRangeDates(this.currentDate, rangeType);

    if (this.calendarType === Calendar.Candidate) {
      this.getDataForCandidate(rangeType, range);
    } else {
      this.getData(rangeType, range);
    }
  }

  private getShifts(query: any) {
    return this.data.getShiftsByQuery(query, this.calendarType);
  }

  private getShift(id: string) {
    return this.data.getShiftDate(id);
  }

  private getCandidateAvailability(query: any) {
    return this.data.getCandidateAvailability(query);
  }

  private getCandidateTimesheets(query: any) {
    return this.data.getTimesheetInformation(query, this.calendarType);
  }

  private getJobOffers(query: any) {
    return this.data.getJobOffers(query);
  }

  private getDataForCandidate(rangeType: DateRange, range: IDateRange) {
    this._loading.next(true);
    const { start, end, monthStart, monthEnd } = range;
    let startPeriod = start;
    let endPeriod = end;

    if (rangeType === DateRange.Month) {
      startPeriod = monthStart as Moment;
      endPeriod = monthEnd as Moment;
    }

    const requests = [
      this.getCandidateAvailability(
        this.generateCandidateQuery(startPeriod, endPeriod)
      ),
      this.getCandidateTimesheets(
        this.generateCandidateTimesheetQuery(startPeriod, endPeriod)
      ),
      this.getJobOffers(this.generateJobOffersQuery(startPeriod, endPeriod)),
      this.data.getHolidaysForPeriod(
        startPeriod.format(filterDateFormat),
        endPeriod.format(filterDateFormat)
      ),
    ];

    combineLatest(requests)
      .pipe(
        finalize(() => {
          this._loading.next(false);
        })
      )
      .subscribe(data => {
        const [availability, timesheets, jobOffers, holidays] = data;

        this.prepareTimesheetsData(
          (jobOffers as any).results,
          (timesheets as any).results
        );

        this.availability = (availability as any).results;

        this.shifts.push(...this.availability);
        this.shifts.push(
          ...(holidays as Array<{ name: string; holiday_date: string }>)
        );

        this.updateCalendar(this.currentDate, rangeType);
        this.cd.detectChanges();
      });
  }

  private getData(rangeType: DateRange, range: IDateRange) {
    this._loading.next(true);
    const { start, end, monthStart, monthEnd } = range;
    let startPeriod = start;
    let endPeriod = end;

    if (rangeType === DateRange.Month) {
      startPeriod = monthStart as Moment;
      endPeriod = monthEnd as Moment;
    }

    const requests = [
      this.getShifts(
        this.generateQuery(startPeriod, endPeriod, this.client, this.candidate)
      ),
      this.data.getHolidaysForPeriod(
        startPeriod.format(filterDateFormat),
        endPeriod.format(filterDateFormat)
      ),
    ];

    forkJoin(requests)
      .pipe(
        finalize(() => {
          this._loading.next(false);
        })
      )
      .subscribe(data => {
        const [shifts, holidays] = data;

        this.prepareShiftsData(shifts, holidays);
        this.updateCalendar(this.currentDate, rangeType);
        this.cd.detectChanges();
      });
  }

  private generateQuery(
    from: Moment,
    to: Moment,
    client?: string,
    candidate?: string
  ) {
    const filterList: Record<string, any> = {
      ['date__shift_date_0']: from.format(filterDateFormat),
      ['date__shift_date_1']: to.format(filterDateFormat),
      fields: [
        'id',
        'date',
        'is_fulfilled',
        'workers_details',
        'time',
        'workers',
      ],
      limit: -1,
    };

    if (this.calendarType === Calendar.Client) {
      filterList['role'] = getRoleId();
    }

    if (client) {
      filterList['client'] = client;
    }

    if (candidate) {
      filterList['candidate'] = candidate;
    }

    return filterList;
  }

  private generateCandidateQuery(from: Moment, to: Moment) {
    const filterList = {
      ['target_date_0']: from.format(filterDateFormat),
      ['target_date_1']: to.format(filterDateFormat),
      fields: ['id', 'target_date', 'confirmed_available'],
      limit: -1,
    };

    return filterList;
  }

  private generateCandidateTimesheetQuery(from: Moment, to: Moment) {
    const filterList = {
      ['shift_started_at_0']: from.format(filterDateFormat),
      ['shift_started_at_1']: to.format(filterDateFormat),
      fields: ['id', 'status', 'shift'],
      limit: -1,
    };

    return filterList;
  }

  private generateJobOffersQuery(from: Moment, to: Moment) {
    const filterList = {
      ['shift__date__shift_date_0']: from.format(filterDateFormat),
      ['shift__date__shift_date_1']: to.format(filterDateFormat),
      limit: -1,
    };

    return filterList;
  }

  private prepareShiftsData(data: any, holidays?: any[]) {
    this.shifts = [];
    data = Array.isArray(data) ? data : data.results;

    this.lastData = data;
    this.timesheetCounter.forEach(el => (el.count = 0));

    if (data.length) {
      this.shifts = data
        .map((shift: any) => this.parseData(shift))
        .filter((shift: any) => {
          forEachObjIndexed((value, key) => {
            const objKey = this.shiftStatus[key as Status].key;
            const candidates = { ...shift.candidates };

            candidates[objKey] = value ? shift.candidates[objKey] : 0;
            shift.candidates = candidates;
          }, this.status.data);

          shift.is_fulfilled = this.updateShiftStatus(shift.candidates);

          return this.status.data[shift.is_fulfilled as Status];
        });

      this.shifts.forEach((shift: any) => {
        this.timesheetCounter.forEach(counter => {
          if (counter.type !== 0) {
            counter.count +=
              shift.candidates[this.shiftStatus[counter.type].key];
          }

          if (shift.is_fulfilled === 0 && counter.type === 0) {
            counter.count +=
              shift.shift.workers -
              shift.candidates[this.shiftStatus[Status.FullFilled].key] -
              shift.candidates[this.shiftStatus[Status.Pending].key];
          }
        });
      });
    }

    if (holidays) {
      this.shifts.push(...holidays);
    }
  }

  private parseData(shift: any, fullData?: boolean) {
    if (fullData) {
      const job = shift.job;
      const jobsite = shift.job.jobsite;

      return {
        shift,
        shift_date_id: shift.id,
        job: job.id,
        job_link: (role: 'manager' | 'client') =>
          `${this.getLink('job', role)}${job.id}/change`,
        jobsite_link: (role: 'manager' | 'client') =>
          `${this.getLink('jobsite', role)}${jobsite.id}/change`,
        jobsite: jobsite.short_name || jobsite.__str__,
        position: job.position,
        candidates: shift.workers_details,
      };
    } else {
      return {
        shift,
        date: shift.date.shift_date,
        time: shift.time,
        is_fulfilled: getFulfilledStatus(
          shift.is_fulfilled,
          shift.workers_details
        ),
        candidates: shift.workers_details,
        timesheet: this.calendar.calculateShiftSize(shift.time),
      };
    }
  }

  private getPositionTranslation(position: ITranslationPayload): string {
    const countryCode = this.siteSettings.settings.country_code;
    return checkAndReturnTranslation(position, countryCode, getStorageLang());
  }

  private prepareTimesheetsData(jobOffers: any[], timesheetList: any[]) {
    this.shifts = [];
    this.lastData = [jobOffers, timesheetList];

    this.timesheetCounter.forEach(el => (el.count = 0));

    if (jobOffers.length) {
      this.shifts = jobOffers
        .map(jobOffer => {
          const timesheets = timesheetList
            ? timesheetList.filter(
                timesheet => jobOffer.shift.id === timesheet.shift.id
              )
            : [];

          return {
            jobOffer,
            showButtons: jobOffer.hide_buttons === false,
            date: jobOffer.shift.date.shift_date,
            time: jobOffer.shift.time,
            jobsite:
              jobOffer.shift.date.job.jobsite.short_name ||
              jobOffer.shift.date.job.jobsite.__str__,
            position: this.getPositionTranslation(
              jobOffer.shift.date.job.position.name
            ),
            timesheets,
            timesheetStatus: this.getTimesheetsStatus(timesheets[0]),
          };
        })
        .filter(
          jobOffer =>
            this.status.data[jobOffer.timesheetStatus as number] ||
            jobOffer.showButtons
        );

      this.shifts.forEach((shift: any) => {
        this.timesheetCounter.forEach(counter => {
          if (counter.type === shift.timesheetStatus) {
            counter.count += 1;
          }
        });
      });
    }
  }

  private getTimesheetsStatus(timesheet: any) {
    if (timesheet) {
      if (timesheet.status < 5) {
        return 3;
      }

      if (timesheet.status === 5) {
        return 4;
      }

      if (timesheet.status > 5) {
        return 5;
      }
    }

    return;
  }

  private generateCalendar(date: Moment, type: DateRange) {
    let calendarData;

    switch (type) {
      case DateRange.Month:
        calendarData = this.calendar.generateMonth(date, this.shifts);
        break;
      case DateRange.Week:
        calendarData = this.calendar.generateWeek(
          date,
          this.shifts,
          this.customRange
        );
        break;
      case DateRange.Day:
        calendarData = this.calendar.generateDay(date, this.shifts);
        break;

      default:
        break;
    }

    this.calendarData = calendarData as any;
  }

  private updateCalendar(date: Moment, type: DateRange) {
    this.updateCalendarHeader(date, type);
    this.generateCalendar(date, type);
  }

  private updateCalendarHeader(date: Moment, type: DateRange) {
    this.rangeTitle = this.calendar.getRangeFormatDate(
      date,
      type,
      this.customRange
    );
  }

  private updateDate(date: Moment, type: DateRange, increment: boolean) {
    return increment ? date.add(1, type) : date.add(-1, type);
  }

  private getLink(endpoint: 'job' | 'jobsite', role: 'manager' | 'client') {
    const links = new Map([
      ['manager', { job: '/mn/hr/jobs/', jobsite: '/mn/hr/jobsites/' }],
      [
        'client',
        {
          job: '/cl/hr/jobs/client_contact_job/',
          jobsite: '/cl/hr/jobsites/client_contact_jobsite/',
        },
      ],
    ]);

    const roleLinks = links.get(role);

    if (!roleLinks) {
      return '';
    }

    return roleLinks[endpoint];
  }

  private updateShiftStatus(candidates: {
    canceled: number;
    accepted: number;
    undefined: number;
  }): Status {
    if (candidates.undefined > 0) {
      return Status.Pending;
    }

    if (candidates.accepted > 0) {
      return Status.FullFilled;
    }

    return Status.Unfilled;
  }
}
