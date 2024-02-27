import { Language } from './language.model';
import { IRole, Role } from './role.model';

export interface IUser {
  status: string;
  data: {
    contact: {
      company: string;
      picture: {
        origin: string;
        thumb: string;
      };
      email: string;
      contact_id: string;
      contact_type: string;
      company_id: string;
      candidate_contact: string;
      id: string;
      name: string;
      __str__: string;
      default_language: Language;
    };
    is_superuser: boolean;
    user: string;
    roles: IRole[];
    end_trial_date?: string;
    country_code: string;
    country_phone_prefix?: string;
    timezone?: string;
    allow_job_creation?: boolean;
  };
  currentRole: IRole;
}

export class User implements IUser {
  private _currentRole!: Role;

  readonly status: string;
  readonly data: {
    contact: {
      company: string;
      picture: {
        origin: string;
        thumb: string;
      };
      email: string;
      contact_id: string;
      contact_type: string;
      company_id: string;
      candidate_contact: string;
      id: string;
      name: string;
      __str__: string;
      default_language: Language;
    };
    is_superuser: boolean;
    user: string;
    roles: Role[];
    end_trial_date?: string;
    country_code: string;
    country_phone_prefix?: string;
    timezone?: string;
    allow_job_creation?: boolean;
  };

  set currentRole(value: Role) {
    this._currentRole = value;
  }

  get currentRole() {
    return this._currentRole;
  }

  constructor(payload: IUser) {
    this.data = {
      ...payload.data,
      roles: payload.data.roles
        .filter(el => el.is_active || payload.data.is_superuser)
        .map(el => new Role(el)),
    };
    this.status = payload.status;
  }
}
