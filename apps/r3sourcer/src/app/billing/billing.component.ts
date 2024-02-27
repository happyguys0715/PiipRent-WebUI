import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from './services';
import {
  EventService,
  EventType,
  MessageType,
  SiteSettingsService,
  ToastService,
} from '@webui/core';
import { Subject, takeUntil } from 'rxjs';
import { BillingSubscription, Plan, User } from '@webui/models';
import { CommonModule } from '@angular/common';
import {
  BillingListsComponent,
  BillingPlanComponent,
  BillingSmsComponent,
  CheckCardComponent,
} from './components';
import { NavigationComponent } from '@webui/ui';
import { MasterGuideComponent } from '../master-guide/components';

@Component({
  standalone: true,
  selector: 'webui-billing-page',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    CheckCardComponent,
    BillingPlanComponent,
    BillingSmsComponent,
    BillingListsComponent,
    NavigationComponent,
    MasterGuideComponent,
  ],
})
export class BillingComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  private _subscriptions = <BillingSubscription[]>[];

  public user!: User;
  public pagesList!: any[];
  public currentPlan?: BillingSubscription;
  public checkInformation?: {
    payment_information_submited: true;
    card_number_last4: null | string;
  };
  public saveProcess!: boolean;
  public cancelProcess!: boolean;
  public plans!: Plan[];
  public currency!: string;

  get hasSubscriptions() {
    return this._subscriptions.length > 0;
  }

  constructor(
    private billingService: BillingService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastService,
    private eventService: EventService,
    private siteSettings: SiteSettingsService,
    private toastrService: ToastService
  ) {}

  public ngOnInit() {
    this._subscriptions = this.route.snapshot.data['subscriptions'];

    this.user = this.route.snapshot.data['user'];
    this.pagesList = this.route.snapshot.data['pagesList'];

    this.currency = this.siteSettings.settings.currency;

    this.currentPlan =
      this._subscriptions && this._subscriptions.find(el => el.active);

    this.checkPaymentInformation();

    this.setActivePage(this.pagesList, `${this.router.url}/`);

    this.billingService.getSubscriptionTypes().subscribe(res => {
      if (Array.isArray(res)) {
        return;
      }

      const plans: Plan[] = [];

      for (const plan of res.subscription_types) {
        if (plan.table_text) {
          plan.table = plan.table_text.split(';');
        }

        plans.push({
          ...plan,
          procent: plan.percentage_discount
            ? (100 - plan.percentage_discount) / 100
            : 1,
        });
      }

      this.plans = plans;
    });

    this.eventService.event$.pipe(takeUntil(this._destroy)).subscribe(event => {
      if (event === EventType.PurposeChanged) {
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public selectPlan(event: 'update' | 'create') {
    let message = '';

    switch (event) {
      case 'create':
        message = 'Subscription has been created';
        break;
      case 'update':
        message = 'Subscription has been updated';
        break;
    }

    this.toastr.sendMessage(message, MessageType.Success);
    this.eventService.emit(EventType.SubscriptionChanged);
    this.getSubscriptionInformation();
  }

  public getSubscriptionInformation() {
    this.billingService
      .getSubscriptionInfo()
      .subscribe((subscriptions: BillingSubscription[]) => {
        this.currentPlan = subscriptions.find((el: any) => el.active);
      });
  }

  public checkPaymentInformation() {
    this.billingService
      .checkPaymentInformation()
      .subscribe(data => (this.checkInformation = data));
  }

  public cancelPlan() {
    this.billingService.cancelSubscription().subscribe(() => {
      this.currentPlan = undefined;
      this.toastr.sendMessage(
        'Subscription has been canceled',
        MessageType.Success
      );
      this.eventService.emit(EventType.SubscriptionChanged);
    });
  }

  public setActivePage(pages: any[], path: string) {
    let active = false;
    pages.forEach(page => {
      if (path === page.url && page.url !== '/') {
        active = true;
        page.active = true;
      } else if (page.children) {
        page.active = this.setActivePage(page.children, path);
        active = active || page.active;
      }
    });
    return active;
  }

  onCardChange() {
    this.toastrService.sendMessage(
      'message.credit_card_updated',
      MessageType.Success
    );
    this.checkPaymentInformation();
  }

  onRemoveCC(): void {
    this.billingService.removeCC().subscribe(() => {
      this.toastrService.sendMessage(
        'message.credit_card_removed',
        MessageType.Success
      );

      this.checkPaymentInformation();
    });
  }
}
