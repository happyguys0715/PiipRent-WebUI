import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { catchError, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';

import { ENV } from './env.service';
import { isClient, isCandidate, isManager } from '@webui/utilities';
import { EventService, EventType } from './event.service';
import { Endpoints, IRole, User } from '@webui/models';
import { SubscriptionService } from './subscription.service';

interface AuthResponse {
  access_token: string;
  access_token_jwt: string;
  refresh_token: string;
}

// interface LoginByTokenResponse {
//     "status": "success",
//     "data": {
//         "contact": {
//             "id": "e05b2c9c-059f-4640-a13e-d23d238eb3ab",
//             "name": "Mr. Test Candidate",
//             "__str__": "Mr. Test Candidate"
//         },
//         "redirect_to": "/cd/hr/timesheets-candidate/f64ca14d-f12b-4511-9675-79d582e2b4ef/submit",
//         "role": {
//             "id": "8d8e97a3-13fb-4703-9d5c-3349b6c2999c",
//             "name": "Piiprent Estonia OÜ: Sales Manager Mr. Taavi Saavo: candidate",
//             "__str__": "Piiprent Estonia OÜ: Sales Manager Mr. Taavi Saavo: candidate"
//         },
//         "__str__": "Token Login Mr. Test Candidate"
//     },
//     "access_token": "wECP30MTt3VLhR3yvZzNWvLwbyzdsJ",
//     "expires_in": 36000,
//     "token_type": "Bearer",
//     "access_token_jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJSM3NvdXJjZXJJc3N1ZXIiLCJleHAiOjE3MDIwMTM3MzcsImlhdCI6MTcwMTk3NzczNywidXNlcl9pZCI6ImUxNDg4OTE0LTZmN2MtNGVmNS04OTk4LTE2ZGJlYmM1NDQxYSIsIm9yaWdpbiI6Imh0dHBzOi8vcGlpcHJlbnQucGlpcGFpdGVzdC5jb20iLCJjb250YWN0IjpbeyJpZCI6ImUwNWIyYzljLTA1OWYtNDY0MC1hMTNlLWQyM2QyMzhlYjNhYiIsIm5hbWUiOiJNci4gVGVzdCBDYW5kaWRhdGUiLCJjb250YWN0X3R5cGUiOiJtYW5hZ2VyIiwiY29udGFjdF9pZCI6ImI5M2FiMGZkLTQwYWQtNGE4Ni1hZjdiLWE3YzI5OTNjMzllZiIsImVtYWlsIjoiS3Jpc3RlbkBwaWlwYWkuY29tIiwiX19zdHJfXyI6Ik1yLiBUZXN0IENhbmRpZGF0ZSIsImNvbXBhbnkiOiJQaWlwcmVudCBFc3RvbmlhIE9cdTAwZGMiLCJjb21wYW55X2lkIjoiYmJlZWQ4Y2QtMWI2NC00Yzg4LWIwYWUtNTcyM2JkZDQ0YWMzIiwiY2FuZGlkYXRlX2NvbnRhY3QiOiI3M2YzYWJmZC05Y2IzLTRjY2EtODA0YS1iM2ZlZWZkYjY1M2QifV19.HsULckYg_jWP9YszfXHsPpa5E1V-cKvDOdiGN-jMIxfr1AFsOW8-gKY41871VcuOSDpoU5C4SnxGMhTDdMFnJgDjyn4Qn-WG_lBONLC1hgE51vYZ_Zr-hAhK7zfkVdHW9Q4vQGLHGtCNi5Jt8dX2OWWqvShfA-6r2MfKv_qbkyRU9oF85FQlsmYt4uALmNbFwWpUmG1tIhR6qisnQ3kew7GeaMxw0nND8EvgobzSC52y0Uq6n6N-UVzKUvVo2jbN8HhJpHS2wm7A8AmZOi7-Ki7hzjwF8MN12FPb4g_BeHas-uIzUnxexGJFcQTejmjKoU9EzzmK87_mBDxvDcEFS9mc9PSdSRBMUEo3jHISY8Vernf00GlMYW40KycGhrYHiLvmQUe1fasFLZWStGz-f1kw8-dP30l2njbrJa1GWmGADYZpU0u4xoLauoMagCi_9AiuCXo62NiKVpPMK2wrsTm6mxmiv8nVsaIQAZkegEVSQC7o6AiZJyY6FOCuCVXD4lLfqwheotVPek23DTV3jSkyWgloS3PMZoC2Y8-iu-fG5-utOnDVAXHR5j-lZmH07ILnqlZWilDsqQSuI2IzxOZVA0dPQSD5yeID46KWATqcs4ST53-ouGR0HkliCk8CtbE7vzk9SpruhzZu6_mhgDDiwt9THwl50SwmSZKpbSI"
// }

interface LoginByTokenResponse {
  status: 'success';
  data: {
    contact: {
      id: string;
      name: string;
      __str__: string;
    };
    redirect_to: string;
    role: {
      id: string;
      name: string;
      __str__: string;
    };
    __str__: string;
  };
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
  access_token_jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _role?: string;

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private error: ErrorsService,
    private router: Router,
    private eventService: EventService,
    private subscriptionService: SubscriptionService,
    @Optional() @Inject(ENV) private env: any
  ) {}

  set role(role: string | undefined) {
    this._role = role;
  }

  get role(): string | undefined {
    return this._role;
  }

  get isAuthorized(): boolean {
    return !!this.storage.retrieve('user');
  }

  public storeToken(response: any, rememberMe?: boolean, username?: string) {
    const data: AuthResponse = response.data || response || {};

    const {
      access_token = '',
      access_token_jwt = '',
      refresh_token = '',
    } = data;
    this.storage.store('user', {
      access_token,
      refresh_token,
      access_token_jwt,
      rememberMe,
      username,
    });
  }

  public getRedirectUrl(): string {
    if (isClient()) {
      return 'cl';
    }

    if (isCandidate()) {
      return 'cd';
    }

    if (isManager()) {
      return 'mn';
    }

    return '';
  }

  public refreshJWTToken(user: User) {
    const { refresh_token = '', username = '' } = { ...user };
    const body = {
      refresh_token,
      username,
      client_id: this.env.clientId,
      grant_type: 'refresh_token',
    };

    return this.http.post(Endpoints.TokenRefresh, body).pipe(
      tap((response: any) => {
        this.storage.store('user', {
          ...user,
          access_token: response.access_token_jwt,
          refresh_token: response.refresh_token,
        });
      }),
      catchError((error: any) => this.error.handleError(error))
    );
  }

  public loginWithToken(token: string) {
    const url = `/auth/${token}/login_by_token/`;
    return this.http.get<LoginByTokenResponse>(url).pipe(
      tap(response => {
        this.storeToken(response);
        // It is needed to find correct role when logging in with token
        this.role = response.data.role.id;
      }),
      catchError((error: any) =>
        this.error.handleError(error, { showMessage: true })
      )
    );
  }

  public validateResetPasswordToken(token: string) {
    const url = Endpoints.ValidateResetPasswordToken;
    const body = {
      token: token,
    };
    return this.http
      .post(url, body)
      .pipe(catchError((error: any) => this.error.handleError(error)));
  }

  public logoutWithoutRedirect() {
    this.storage.clear('role');
    this.storage.clear('user');
  }

  public logout() {
    this.eventService.emit(EventType.Logout);
    this.storage.clear('role');
    this.storage.clear('user');
    this.subscriptionService.clean();
    this.router.navigateByUrl('/login');
  }
}
