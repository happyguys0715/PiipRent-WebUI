import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { getPropValue, FormatString } from '@webui/utilities';
import { Purpose } from '@webui/data';
import { CompanyPurposeService } from './company-purpose.service';
import { SiteSettingsService } from './site-settings.service';
import { ApiService } from './api.service';

export enum ListEvent {
  Initialized,
  Loading,
}

@Injectable()
export class ListService {
  private _updateList = new Subject();
  private _updateRow = new Subject();

  changes = new Map();

  updateActions!: ((data: any, options: { purpose?: Purpose }) => any)[];
  updateButtons!: Map<string, BehaviorSubject<boolean | string>>;

  config: any;
  data!: any[];

  get update$(): Observable<any> {
    return this._updateList.asObservable();
  }

  get updateRow$(): Observable<any> {
    return this._updateRow.asObservable();
  }

  constructor(
    private companyPurposeService: CompanyPurposeService,
    private settingsService: SiteSettingsService,
    private apiService: ApiService
  ) {}

  updateList() {
    this._updateList.next(Date.now());
  }

  saveChanges() {
    const ids: string[] = [];
    const { required } = this.config.update;

    this.changes.forEach((val, key) => {
      if (this.checkRequiredFields(key, required)) {
        ids.push(key);
      }
    });

    ids.forEach((id: string, index: number) => {
      const last = index === ids.length - 1;

      this.saveObject(id, last);
      const button = this.updateButtons.get(id);
      button?.next('Please wait');
    });
  }

  saveObject(id: string, last: boolean) {
    const data = this.getRowData(id);
    const canEdit = getPropValue(data, this.config.canEdit);
    const { create } = this.config;

    if (canEdit) {
      this.send(id, last);
    } else if (create) {
      const endpoint = create.endpoint;
      const body: Record<string, any> = {};

      Object.keys(create.fields).forEach((key: string) => {
        if (create.fields[key] === 'currentCompany') {
          body[key] = this.settingsService.settings.company;
        } else if (typeof create.fields[key] === 'string') {
          body[key] = getPropValue(data, create.fields[key]);
        } else {
          body[key] = create.fields[key];
        }
      });

      this.apiService.post(endpoint, body).subscribe((res: any) => {
        const additionalData: Record<string, any> = {};
        Object.keys(create.addFields).forEach(key => {
          additionalData[key] = getPropValue(res, create.addFields[key]);
        });

        Object.assign(data, additionalData);
        this.send(id, last);
      });
    }
  }

  send(id: string, updateList: boolean) {
    const data = this.getRowData(id);
    const { update } = this.config;
    const method: keyof ListService = update.method;
    const changes = this.changes.get(id);
    const endpoint = FormatString.format(update.endpoint, data);

    if (this[method]) {
      this[method](endpoint, changes).subscribe(() => {
        this._updateRow.next({ id, data: changes, updateList });

        if (updateList) {
          this.changes.clear();
        }
      });
    }
  }

  updateChanges(id: string, data: any) {
    const exist = this.changes.has(id);
    const rowData = this.getRowData(id);
    const { update } = this.config;

    if (exist) {
      this.updateChangesObject(id, data);
    } else {
      this.changes.set(id, data);
    }

    if (update.fields) {
      update.fields.forEach((field: string) => {
        data[field] =
          getPropValue(this.getChanges(id), field) ||
          getPropValue(rowData, field);
      });
    }

    this.updateActions.forEach(action => {
      const actionData = action(this.changes.get(id), {
        purpose: this.companyPurposeService.purpose,
      });

      if (actionData) {
        this.updateChangesObject(id, actionData);
      }
    });

    this.showSaveButton(id);
  }

  private showSaveButton(id: string) {
    const button = this.updateButtons.get(id);
    const { required, requiredMessage } = this.config.update;
    const value = this.checkRequiredFields(id, required);

    button?.next(value || requiredMessage);
  }

  private checkRequiredFields(
    id: string,
    required: string | string[]
  ): boolean | undefined {
    let value;

    if (required) {
      if (Array.isArray(required)) {
        value = required
          .map(field => getPropValue(this.getChanges(id), field))
          .every(val => Boolean(val));
      } else {
        value = Boolean(getPropValue(this.getChanges(id), required));
      }
    }

    return value;
  }

  private getChanges(id: string): any {
    return this.changes.get(id) || {};
  }

  private updateChangesObject(id: string, data: any) {
    const existChanges = this.getChanges(id);
    const newChanges = { ...existChanges, ...data };

    this.changes.set(id, newChanges);
  }

  private getRowData(id: string): any {
    return this.data.find(el => el.id === id);
  }
}
