import { Routes } from '@angular/router';

import { ResetPasswordComponent } from './reset-password.component';
import { GenericFormService, METADATA, SiteSettingsService } from '@webui/core';
import { MetadataService } from '@webui/metadata';
import { Metadata } from './metadata.config';

export const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
    resolve: {
      settings: SiteSettingsService,
    },
    providers: [
      GenericFormService,
      MetadataService,
      { provide: METADATA, useClass: Metadata },
    ],
  },
];
