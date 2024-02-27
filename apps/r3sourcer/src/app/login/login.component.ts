import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { AuthService, FormService, UserService } from '@webui/core';

import { environment } from '../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  CheckboxComponent,
  CloseButtonComponent,
  NavigationComponent,
  SiteLoaderComponent,
  SpinnerComponent,
} from '@webui/ui';
import { CommonModule } from '@angular/common';
import { DialogRef, IFormErrors, dialogConfig } from '@webui/models';
import { GenericFormComponent } from '@webui/generic-components';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  selector: 'webui-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CheckboxComponent,
    SpinnerComponent,
    RouterModule,
    SiteLoaderComponent,
    CloseButtonComponent,
    GenericFormComponent,
    NavigationComponent,
    ButtonComponent,
  ],
  providers: [FormService],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('modal') public modal!: TemplateRef<unknown>;

  public response: any;
  public loginProcess!: boolean;
  public settings: any;
  public modalRef!: DialogRef;

  public error: IFormErrors = {} as IFormErrors;
  public token: string | null = null;
  public endpoint = `/auth/login/`;
  public rememberMe = false;

  public data = {
    client_id: {
      action: 'add',
      data: {
        value: environment.clientId,
      },
    },
    username: {
      action: 'add',
      data: {
        label: '',
        templateOptions: {
          required: true,
          placeholder: 'Login',
          addon: '/assets/img/mail.svg',
          max: 255,
        },
      },
    },
    password: {
      action: 'add',
      data: {
        label: '',
        templateOptions: {
          required: false,
          placeholder: 'Password',
          addon: '/assets/img/key.svg',
          type: 'password',
          max: 128,
        },
      },
    },
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: Dialog,
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.userService.user = null;
    this.settings = this.route.snapshot.data['settings'];
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.tokenAuth(this.token);
    }
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public tokenAuth(token: string) {
    this.authService.loginWithToken(token).subscribe({
      next: (res: any) => {
        this.authService.storeToken({ data: res });
        this.userService.getUserData().subscribe(() => {
          if (res.data.redirect_to) {
            const redirect = res.data.redirect_to.replace('/?', '?');

            this.router.navigateByUrl(redirect);
          } else {
            this.router.navigate([this.authService.getRedirectUrl()]);
          }
        });
      },
      error: () => (this.token = null),
    });
  }

  public responseHandler(response: any) {
    if (response.message) {
      this.loginProcess = false;
    }

    if (response.data) {
      if (response.data.redirect) {
        location.href = response.data.redirect;

        return;
      }

      this.authService.storeToken(
        response,
        this.rememberMe,
        response.formData.username
      );

      this.userService.getUserData().subscribe(() => {
        this.router.navigate([this.authService.getRedirectUrl()]);
      });
    }
  }

  public redirectHandler() {
    this.router.navigate(['/registration']);
  }

  public formEvent(e: any) {
    if (e.type === 'saveStart') {
      this.loginProcess = true;
    }
  }

  public errorHandler() {
    this.loginProcess = false;
  }

  public openResetForm() {
    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'sm' })
    );

    return false;
  }
}
