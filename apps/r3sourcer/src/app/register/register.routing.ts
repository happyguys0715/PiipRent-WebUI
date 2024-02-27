import { Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { GenericFormService } from '@webui/core';
import { MetadataService } from '@webui/metadata';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    providers: [GenericFormService, MetadataService],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
