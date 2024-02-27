import { Routes } from '@angular/router';

import {
  VerifyEmailComponent,
  RedirectComponent,
  LoginAsComponent,
} from './components';

import {
  AuthGuard,
  NotAuthorizedGuard,
  PermissionGuard,
  UserService,
  NavigationService,
  ClientGuard,
  CandidateGuard,
  ManagerGuard,
} from '@webui/core';

export const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routing').then(m => m.routes),
    canActivate: [AuthGuard, PermissionGuard, ManagerGuard],
  },
  {
    path: 'myob/oauth2_redirect_uri',
    component: RedirectComponent,
  },
  {
    path: 'contacts/verify_email',
    component: VerifyEmailComponent,
  },
  {
    path: 'login-as/:id',
    component: LoginAsComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'login/:token',
    loadChildren: () => import('./login/login.routes').then(m => m.routes),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes').then(m => m.routes),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./register/register.routing').then(m => m.routes),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'reset_password',
    loadChildren: () =>
      import('./reset-password/reset-password.routes').then(m => m.routes),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.routing').then(m => m.routes),
    resolve: {
      user: UserService,
      pagesList: NavigationService,
    },
    canActivate: [AuthGuard, PermissionGuard, ManagerGuard],
  },
  {
    path: 'cl',
    loadChildren: () => import('./client/client.routing').then(m => m.routes),
    canLoad: [AuthGuard, ClientGuard],
    canActivate: [AuthGuard, ClientGuard],
  },
  {
    path: 'cd',
    loadChildren: () =>
      import('./candidate/candidate.routing').then(m => m.routes),
    canLoad: [AuthGuard, CandidateGuard],
    canActivate: [AuthGuard, CandidateGuard],
  },
  {
    path: 'mn',
    loadChildren: () => import('./manager/manager.routing').then(m => m.routes),
    canLoad: [AuthGuard, ManagerGuard],
    canActivate: [AuthGuard, ManagerGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
