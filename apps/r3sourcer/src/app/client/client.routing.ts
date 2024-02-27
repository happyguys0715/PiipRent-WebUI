import { Routes } from '@angular/router';

import { SiteComponent } from './components';

import {
  SiteSettingsService,
  PermissionGuard,
  METADATA,
  GenericFormService,
} from '@webui/core';

import { AuthGuard } from '@webui/core';
import { Metadata } from './metadata.config';
import { MetadataService } from '@webui/metadata';

export const routes: Routes = [
  {
    path: '**',
    component: SiteComponent,
    canActivate: [AuthGuard, PermissionGuard],
    resolve: {
      settings: SiteSettingsService,
    },
  },
];
