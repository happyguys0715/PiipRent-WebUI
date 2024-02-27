import { Routes } from '@angular/router';

import { SiteComponent } from './components';
// import { RedirectComponent } from './redirect.component';

import { GenericFormService, METADATA, SiteSettingsService } from '@webui/core';

import { AuthGuard, PermissionGuard } from '@webui/core';
import { Metadata } from './metadata.config';
import { MetadataService } from '@webui/metadata';

export const routes: Routes = [
  // {
  //   path: 'myob/oauth2_redirect_uri',
  //   component: RedirectComponent
  // },
  {
    path: '**',
    component: SiteComponent,
    canActivate: [AuthGuard, PermissionGuard],
    resolve: {
      settings: SiteSettingsService,
    },
  },
];
