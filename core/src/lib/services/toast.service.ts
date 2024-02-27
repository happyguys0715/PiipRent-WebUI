import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { EventService, EventType } from './event.service';

export interface Message {
  text: string;
  type: MessageType;
}

export enum MessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

@Injectable({
  providedIn: 'root',
})
export class ToastService implements OnDestroy {
  private readonly _destroy = new Subject<void>();
  private readonly _messages = new BehaviorSubject<Message | null>(null);
  public readonly message$ = this._messages.asObservable();

  constructor(private eventService: EventService) {
    this.eventService.event$
      .pipe(
        filter(event => event === EventType.ShowMessage),
        takeUntil(this._destroy)
      )
      .subscribe(() => {
        const { text = '', type } = this.eventService.payload;

        this.sendMessage(text, type);
      });
  }

  public sendMessage(text = '', type: MessageType) {
    if (!text) {
      return;
    }

    this._messages.next({ text, type });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
