import { checkAndReturnTranslation, getStorageLang } from '@webui/utilities';
import { Models } from '../enums';
import { Model } from './model';
import { DATE_TIME_FORMAT, Moment, Time } from '@webui/time';
import { Endpoints } from '@webui/models';

export type Timesheet = {
  id: string;
  shift_started_at: string;
  shift_ended_at: string;
  break_started_at: string;
  break_ended_at: string;
  supervisor_signature: {
    origin: string;
    thumb: string;
  };
  evaluation: {
    evaluation_score: number;
  };
  timezone?: string;
  time_zone?: string;
};

export class TimesheetModel extends Model {
  override readonly key = Models.Timesheet;
  override readonly label = 'Timesheet';
  override readonly endpoint = Endpoints.Timesheet;
  override data!: Timesheet;
  readonly endpoints = {
    not_agree: `${Endpoints.Timesheet}{id}/not_agree/`,
    evaluate: `${Endpoints.Timesheet}{id}/evaluate/`,
    approve_by_signature: `${Endpoints.Timesheet}{id}/approve_by_signature/`,
  };

  get totalTime() {
    if (!this.data) {
      return null;
    }

    const {
      timezone,
      time_zone,
      shift_started_at,
      shift_ended_at,
      break_started_at,
      break_ended_at,
    } = this.data;
    const timeZone = timezone || time_zone;
    const defaultTime = '0h 0min';

    if (!shift_ended_at) {
      return defaultTime;
    }

    let times: Record<string, Moment | null> = {
      shift_ended_at: Time.parse(shift_ended_at, { timezone: timeZone }),
      shift_started_at: Time.parse(shift_started_at, { timezone: timeZone }),
      break_started_at: null,
      break_ended_at: null,
    };

    let breakTime = 0;

    if (
      (times['shift_ended_at'] as Moment).isBefore(times['shift_started_at'])
    ) {
      return defaultTime;
    }

    if (break_ended_at && break_started_at) {
      times = {
        ...times,
        break_ended_at: Time.parse(break_ended_at, { timezone: timeZone }),
        break_started_at: Time.parse(break_started_at, { timezone: timeZone }),
      };

      if (
        (times['break_started_at'] as Moment).isAfter(
          times['shift_ended_at']
        ) ||
        (times['break_ended_at'] as Moment).isAfter(times['shift_ended_at']) ||
        (times['break_started_at'] as Moment).isBefore(
          times['shift_started_at']
        ) ||
        (times['break_ended_at'] as Moment).isBefore(times['shift_started_at'])
      ) {
        return defaultTime;
      }

      breakTime = (times['break_ended_at'] as Moment).diff(
        times['break_started_at']
      );
    }

    const workTime = (times['shift_ended_at'] as Moment).diff(
      times['shift_started_at']
    );
    const totalTime = Time.duration(workTime - breakTime);

    return `${Math.floor(totalTime.asHours())}hr ${totalTime.minutes()}min`;
  }
}

class Image {
  origin?: string;
  thumb?: string;

  constructor(data: any) {
    this.origin = data.origin;
    this.thumb = data.thumb;
  }
}

class RelatedObject {
  __str__: string;
  id: string;

  constructor(config: any) {
    this.__str__ = config
      ? checkAndReturnTranslation(config, 'EN', getStorageLang())
      : '';
    this.id = config?.id;
  }
}

class Contact {
  id?: string;
  avatar: Image;
  email: string;
  __str__: string;

  constructor(data: any) {
    this.id = data.id;
    this.avatar = new Image(data.picture);
    this.email = data.email;
    this.__str__ = data.__str__;
  }

  public get fullName(): string {
    return this.__str__;
  }
}

class ApiModel {
  public id?: string;
  public apiEndpoint!: string;

  public get editApiEndpoint(): string {
    return `${this.apiEndpoint}${this.id}/`;
  }

  constructor(endpoint: Endpoints, id?: string) {
    this.apiEndpoint = endpoint;
    this.id = id;
  }
}

export class TimeSheet extends ApiModel {
  candidate: Contact;
  contact_id: string;
  startedAt: string | null;
  endedAt: string | null;
  breakStartedAt: string | null;
  breakEndedAt: string | null;
  readonly timezone: string;
  status: number;

  position: RelatedObject;
  company: RelatedObject;
  shift: RelatedObject;
  jobSite: RelatedObject;
  evaluation: {
    evaluation_score: number;
    evaluated_at: string;
  };
  supervisor: RelatedObject;

  constructor(data: any) {
    super(data.endpoint || Endpoints.TimesheetCandidate, data.id);

    this.candidate = new Contact(data.job_offer.candidate_contact.contact);
    this.contact_id = data.job_offer.candidate_contact.id;
    this.startedAt = data.shift_started_at;
    this.endedAt = data.shift_ended_at;
    this.breakEndedAt = data.break_ended_at;
    this.breakStartedAt = data.break_started_at;
    this.timezone = data.timezone || data.time_zone;
    this.position = new RelatedObject(data.position);
    this.company = new RelatedObject(data.company);
    this.shift = new RelatedObject(data.shift);
    this.jobSite = new RelatedObject(data.jobsite);
    this.status = data.status;
    this.evaluation = data.evaluation;
    this.supervisor = new RelatedObject(data.supervisor);
  }

  get totalTime(): string {
    const defaultTime = '0h 0min';

    if (!this.endedAt) {
      return defaultTime;
    }

    let times: Record<string, Moment | null> = {
      shift_ended_at: Time.parse(this.endedAt, { timezone: this.timezone }),
      shift_started_at: Time.parse(this.startedAt, { timezone: this.timezone }),
      break_started_at: null,
      break_ended_at: null,
    };

    let breakTime = 0;

    if (
      (times['shift_ended_at'] as Moment).isBefore(times['shift_started_at'])
    ) {
      return defaultTime;
    }

    if (this.breakEndedAt && this.breakStartedAt) {
      times = {
        ...times,
        break_ended_at: Time.parse(this.breakEndedAt, {
          timezone: this.timezone,
        }),
        break_started_at: Time.parse(this.breakStartedAt, {
          timezone: this.timezone,
        }),
      };

      if (
        (times['break_started_at'] as Moment).isAfter(
          times['shift_ended_at']
        ) ||
        (times['break_ended_at'] as Moment).isAfter(times['shift_ended_at']) ||
        (times['break_started_at'] as Moment).isBefore(
          times['shift_started_at']
        ) ||
        (times['break_ended_at'] as Moment).isBefore(times['shift_started_at'])
      ) {
        return defaultTime;
      }

      breakTime = (times['break_ended_at'] as Moment).diff(
        times['break_started_at']
      );
    }

    const workTime = (times['shift_ended_at'] as Moment).diff(
      times['shift_started_at']
    );
    const totalTime = Time.duration(workTime - breakTime);

    return `${Math.floor(totalTime.asHours())}hr ${totalTime.minutes()}min`;
  }

  get isValid(): boolean {
    if (!this.endedAt) {
      return true;
    }

    return this.totalTime !== '0h 0min';
  }

  get format(): Record<string, string | undefined> {
    const startedAt = Time.parse(this.startedAt, {
      timezone: this.timezone,
    }).format(DATE_TIME_FORMAT);
    const endedAt = this.endedAt
      ? Time.parse(this.endedAt, { timezone: this.timezone }).format(
          DATE_TIME_FORMAT
        )
      : undefined;
    const breakTime =
      this.breakStartedAt && this.breakEndedAt
        ? Time.duration(
            Time.parse(this.breakEndedAt, { timezone: this.timezone }).diff(
              Time.parse(this.breakStartedAt, { timezone: this.timezone })
            )
          )
        : undefined;

    return {
      startedAt,
      endedAt,
      breakTime: breakTime
        ? `${Math.floor(breakTime.asHours())}hr ${breakTime.minutes()}min`
        : '00h 00m',
    };
  }

  public updateBreak(duration: [hours: number, minutes: number] | null): void {
    if (!duration) {
      this.breakStartedAt = null;
      this.breakEndedAt = null;
      return;
    }

    const [hours, minutes] = duration;
    this.breakStartedAt = this.startedAt;
    this.breakEndedAt = Time.parse(this.breakStartedAt, {
      timezone: this.timezone,
    })
      .add(hours, 'hours')
      .add(minutes, 'minutes')
      .utc()
      .format();
  }

  public getRequestBody(hasActivity: boolean) {
    return {
      shift_started_at: this.startedAt,
      shift_ended_at: this.endedAt,
      break_started_at: this.breakStartedAt,
      break_ended_at: this.breakEndedAt,
      hours: !hasActivity || !!this.endedAt,
    };
  }
}

export class TimesheetRate extends ApiModel {
  timesheet: RelatedObject;
  worktype: RelatedObject;
  value: number;
  rate: number;

  constructor(config: any) {
    super(Endpoints.TimesheetRates, config.id);

    this.timesheet = new RelatedObject(config.timesheet);
    this.worktype = new RelatedObject(config.worktype);
    this.value = parseFloat(config.value);
    this.rate = parseFloat(config.rate);
  }

  public get requestBody() {
    return {
      timesheet: this.timesheet.id,
      worktype: this.worktype.id,
      rate: this.rate,
      value: this.value,
    };
  }
}
