import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import {
  CheckboxComponent,
  NavigationComponent,
  SpinnerComponent,
} from '@webui/ui';
import { GenericFormComponent } from '@webui/generic-components';
import { Endpoints, IFormErrors } from '@webui/models';
import { AuthService } from '@webui/core';
import { TranslateModule } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'webui-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxComponent,
    SpinnerComponent,
    RouterModule,
    NavigationComponent,
    GenericFormComponent,
  ],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetProcess!: boolean;
  public settings: any;
  public error: IFormErrors = {} as IFormErrors;
  public endpoint = Endpoints.ConfirmPassword;
  public token = '';
  public pageNum = 0; // 0: password reset form, 1: Link expired form, 2: Invalid link form
  public data: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.data = {
        token: {
          action: 'add',
          data: {
            value: this.token,
          },
        },
        password: {
          action: 'add',
          data: {
            label: '',
            templateOptions: {
              required: true,
              placeholder: 'Password',
              addon: '/assets/img/key.svg',
              type: 'password',
              max: 128,
            },
          },
        },
      };
      if (this.token) {
        this.validateResetPasswordToken(this.token);
      } else {
        this.pageNum = 2;
      }
    });
    this.settings = this.route.snapshot.data['settings'];
  }
  public validateResetPasswordToken(token: string) {
    this.authService
      .validateResetPasswordToken(token)
      .pipe(catchError(async () => this.tokenExpired()))
      .subscribe((res: any) => {
        if (res && res.status == 'ok') {
          this.pageNum = 0;
        }
      });
  }

  public ngOnDestroy(): void {}

  public tokenExpired() {
    this.pageNum = 1;
  }
  public redirectHandler() {
    this.router.navigate(['/login']);
  }

  public responseHandler(response: any) {
    if (response && response.status === 'OK') {
      this.resetProcess = false;
      this.router.navigate(['/login']);
    }
  }

  public formEvent(e: any) {
    if (e.type === 'saveStart') {
      this.resetProcess = true;
    }
  }

  public errorHandler() {
    this.resetProcess = false;
  }
}
