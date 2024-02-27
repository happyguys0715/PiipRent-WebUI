import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ENV } from './services';
import { guards } from './guards';
import { interceptors } from './interceptors';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { IEnv } from '@webui/models';

@NgModule({
  imports: [CommonModule, ToastNoAnimationModule.forRoot()],
  providers: [...guards, ...interceptors],
})
export class CoreModule {
  static forRoot(environment: IEnv): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: ENV, useValue: environment }],
    };
  }
}
