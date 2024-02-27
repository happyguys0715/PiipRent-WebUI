import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BillingSubscription } from '@webui/models';
import { BillingService } from './billing-service';

@Injectable()
export class SubscriptionResolver implements Resolve<BillingSubscription[]> {
  constructor(private service: BillingService) {}

  public resolve() {
    return this.service.getSubscriptionInfo();
  }
}
