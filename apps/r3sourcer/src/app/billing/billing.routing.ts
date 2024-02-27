import { Routes } from '@angular/router';

import { BillingComponent } from './billing.component';
import { SubscriptionResolver } from './services/subscription.resolver';
import { GenericFormService, METADATA, SiteSettingsService } from '@webui/core';
import { BillingService } from './services';
import { MetadataService } from '@webui/metadata';
import { Metadata } from './metadata.config';

export const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
    resolve: {
      subscriptions: SubscriptionResolver,
      settings: SiteSettingsService,
    },
    providers: [
      BillingService,
      SubscriptionResolver,
      GenericFormService,
      MetadataService,
      { provide: METADATA, useClass: Metadata },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
