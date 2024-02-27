import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillingSubscription } from '@webui/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { EventService, EventType } from './event.service';

type Payload = {
  subscriptions: Array<BillingSubscription>;
};

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private _endpoint = '/billing/subscription/list/';
  private _subscription = new BehaviorSubject<BillingSubscription | null>(null);

  public get activePlan$() {
    return this._subscription.asObservable();
  }

  constructor(
    private http: HttpClient,
    private errorService: ErrorsService,
    private eventService: EventService
  ) {
    this.init();
  }

  public update() {
    if (this._subscription.value) {
      return;
    }

    this.getSubscription();
  }

  public useTrialPermissions(): void {
    this._subscription.next({} as BillingSubscription);
  }

  public useClientPermissions(): void {
    this._subscription.next({} as BillingSubscription);
  }

  public clean() {
    this._subscription.next(null);
  }

  public getSubscription() {
    this.getActiveSubscription().subscribe(subscription => {
      this._subscription.next(subscription);
    });
  }

  private getActiveSubscription(): Observable<BillingSubscription | null> {
    return this.http.get<Payload>(this._endpoint).pipe(
      map(payload => payload.subscriptions.find(el => el.active) || null),
      catchError((err: any) => {
        this.errorService.handleError(err);

        return of(null);
      })
    );
  }

  private init() {
    this.eventService.event$.subscribe(event => {
      if (event === EventType.SubscriptionChanged) {
        this.getSubscription();
      }
    });
  }
}
