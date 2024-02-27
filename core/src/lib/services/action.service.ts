import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ActionService {
  private formEvent: Subject<any> = new Subject();
  private buttonEvent: Subject<any> = new Subject();
  private completedEvent: Subject<number> = new Subject();

  get formEvent$() {
    return this.formEvent.asObservable();
  }

  get buttonEvent$() {
    return this.buttonEvent.asObservable();
  }

  get completedEvent$() {
    return this.completedEvent.asObservable();
  }

  emitFormEvent(event: any): number {
    const id = new Date().getTime();
    this.formEvent.next(event);

    return id;
  }

  emitButtonEvent(event: any): number {
    const id = new Date().getTime();
    this.buttonEvent.next(event);

    return id;
  }

  completeEvent(id: number) {
    this.completedEvent.next(id);
  }
}
