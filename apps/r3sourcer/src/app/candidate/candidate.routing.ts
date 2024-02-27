import { Routes } from '@angular/router';

import { SiteComponent } from './components';

import {
  SiteSettingsService,
  PermissionGuard,
  METADATA,
  GenericFormService,
} from '@webui/core';

import { AuthGuard } from '@webui/core';
import { ConsentComponent } from './components/consent/consent.component';
import { Metadata } from './metadata.config';
import { MetadataService } from '@webui/metadata';

export const routes: Routes = [
  {
    path: 'candidate/candidatecontacts/consent/:id',
    component: ConsentComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: '**',
    component: SiteComponent,
    canActivate: [AuthGuard, PermissionGuard],
    resolve: {
      settings: SiteSettingsService,
    },
  },
];
