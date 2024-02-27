import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { ToastService } from '@webui/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-toast',
  template: '',
})
export class ToastComponent implements OnInit, OnDestroy {
  private readonly _destroy = new Subject<void>();

  constructor(
    private toastr: ToastrService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  public ngOnInit() {
    this.toastService.message$.subscribe(data => {
      if (!data || !data.text) {
        return;
      }

      this.toastr[data.type](this.translateService.instant(data.text), '', {
        timeOut: 5000,
      });
    });
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
