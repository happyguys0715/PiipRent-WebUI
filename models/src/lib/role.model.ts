export type RoleType = 'manager' | 'client' | 'candidate';

interface ICompany {
  id: string;
  name: string;
  timezone: string;
  __str__: string;
}

interface ICompanyContact {
  id: string;
  name: string;
  __str__: string;
}

export interface IRole {
  __str__: string;
  id: string;
  domain: string;
  company_contact_rel: {
    company: ICompany;
    company_contact: ICompanyContact;
    id: string;
    __str__: string;
  };
  name: RoleType;
  is_active: boolean;
  is_primary: boolean;
}

export class Role implements IRole {
  readonly __str__: string;
  readonly id: string;
  readonly domain: string;
  readonly company_id: string;
  readonly company_name: string;
  readonly client_contact_id: string;
  readonly name: RoleType;
  readonly is_active: boolean;
  readonly is_primary: boolean;
  readonly company_contact_rel: {
    company: ICompany;
    company_contact: ICompanyContact;
    id: string;
    __str__: string;
  };

  constructor(payload: IRole) {
    this.__str__ = payload.__str__;
    this.client_contact_id = payload.company_contact_rel.company_contact.id;
    this.company_contact_rel = payload.company_contact_rel;
    this.company_id = payload.company_contact_rel.company.id;
    this.company_name = payload.company_contact_rel.company.name;
    this.domain = payload.domain;
    this.id = payload.id;
    this.is_active = payload.is_active;
    this.is_primary = payload.is_primary;
    this.name = payload.name;
  }

  get isCandidate() {
    return this.name === 'candidate';
  }

  get isClient() {
    return this.name === 'client';
  }

  get isManager() {
    return this.name === 'manager';
  }
}
