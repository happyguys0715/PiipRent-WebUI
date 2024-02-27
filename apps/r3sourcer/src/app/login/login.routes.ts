import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { GenericFormService, METADATA, SiteSettingsService } from '@webui/core';
import { LogoutGuard } from '@webui/core';
// import { METADATA } from '@webui/dynamic-form';
import { Metadata } from './metadata.config';
import { MetadataService } from '@webui/metadata';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    resolve: {
      settings: SiteSettingsService,
    },
    providers: [
      { provide: METADATA, useClass: Metadata },
      MetadataService,
      GenericFormService,
    ],
  },
  {
    path: ':token',
    component: LoginComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
