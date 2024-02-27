import { Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { CompanyComponent } from './company/company.component';
import { MyobComponent } from './myob/myob.component';

import {
  AuthGuard,
  GenericFormService,
  ManagerGuard,
  METADATA,
  NavigationService,
  PermissionGuard,
  SiteSettingsService,
  UserService,
} from '@webui/core';
import { MyobResolver } from './services';
import { MetadataService } from '@webui/metadata';
import { Metadata } from '../manager/metadata.config';

export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    resolve: {
      user: UserService,
      pagesList: NavigationService,
      settings: SiteSettingsService,
    },
    children: [
      {
        path: '',
        redirectTo: 'permissions',
        pathMatch: 'full',
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
      },
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'myob',
        component: MyobComponent,
        resolve: {
          myobSettings: MyobResolver,
        },
      },
    ],
    providers: [
      GenericFormService,
      MetadataService,
      { provide: METADATA, useClass: Metadata },
    ],
  },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: ''
  // }
];
