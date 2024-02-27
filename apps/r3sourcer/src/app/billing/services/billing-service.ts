import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ErrorsService } from '@webui/core';
import { BillingSubscription, Plan } from '@webui/models';

@Injectable()
export class BillingService {
  private endpoints = {
    cardInfo: '/billing/stripe_customer/',
    plan: '/billing/subscription/create/',
    subscriptionInfo: '/billing/subscription/list/',
    subscriptionStatus: '/billing/subscription/status/',
    cancelSubscription: '/billing/subscription/cancel/',
    subscriptionTypes: '/billing/subscription_type/',
    checkPaymentInformation: '/billing/check_payment_information/',
    payments: '/billing/payments/',
    autoCharge: '/billing/auto_charge_twilio/',
    fund: '/billing/add_funds_twilio/',
    countryAccount: '/billing/country_account/',
  };

  constructor(private http: HttpClient, private errorService: ErrorsService) {}

  public getStripeKey() {
    return this.http
      .get(this.endpoints.countryAccount)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public setCardInfo(body: any) {
    return this.http
      .post(this.endpoints.cardInfo, body)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public changeCard(body: any) {
    return this.http
      .put(this.endpoints.cardInfo, body)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public getSubscriptionInfo() {
    return this.http
      .get<Record<'subscriptions', BillingSubscription[]>>(
        this.endpoints.subscriptionInfo
      )
      .pipe(
        map(response => response.subscriptions),
        catchError((err: any) => this.errorService.handleError(err))
      );
  }

  public getSubscriptionStatus() {
    return this.http
      .get(this.endpoints.subscriptionStatus)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public setPlan(body: Plan) {
    return this.http
      .post(this.endpoints.plan, body)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public checkPaymentInformation() {
    return this.http
      .get<{
        payment_information_submited: true;
        card_number_last4: null | string;
      }>(this.endpoints.checkPaymentInformation)
      .pipe(catchError(err => this.errorService.handleError(err)));
  }

  public cancelSubscription() {
    return this.http
      .get(this.endpoints.cancelSubscription)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public getCreditDetails() {
    return this.http
      .get(this.endpoints.autoCharge)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public setCreditDetails(body: any) {
    return this.http
      .post(this.endpoints.autoCharge, body)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public addFunds(body: any) {
    return this.http
      .post(this.endpoints.fund, body)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  public getSubscriptionTypes() {
    return this.http
      .get<{ subscription_types: Plan[] }>(this.endpoints.subscriptionTypes)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }

  removeCC() {
    return this.http
      .delete(this.endpoints.cardInfo)
      .pipe(catchError((err: any) => this.errorService.handleError(err)));
  }
}
