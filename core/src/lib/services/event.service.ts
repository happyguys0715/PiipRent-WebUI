import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export enum EventType {
  PurposeChanged,
  Logout,
  RoleChanged,
  CalendarJobSelected,
  RefreshCalendar,
  SubscriptionChanged,
  OpenDialog,
  ChangeRole,
  UpdateNavigation,
  ShowMessage,
  UpdateList,
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  get event$() {
    return this.event.asObservable();
  }
  payload: any;

  private event = new Subject<EventType>();

  emit(type: EventType, payload?: any) {
    this.payload = payload;

    this.event.next(type);
  }
}
