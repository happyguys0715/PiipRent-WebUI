import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { VerifyService, UserService } from '@webui/core';
import { ToastService, MessageType } from '@webui/core';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'webui-verify-email',
  template: '',
})
export class VerifyEmailComponent implements OnInit {
  public verifyEndpoint = '/core/contacts/verify_email/';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vs: VerifyService,
    private ts: ToastService,
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.vs
        .verifyEmail(this.verifyEndpoint + `?token=${params['token']}`)
        .pipe(
          catchError(err => {
            return of(err);
          })
        )
        .subscribe(res => {
          if (res.status && res.status === 404) {
            this.router.navigate(['']);
            return;
          }

          if (res.message) {
            setTimeout(() => {
              this.ts.sendMessage(res.message, MessageType.Success);

              const user = this.userService.user;
              if (
                user &&
                user.currentRole &&
                user.currentRole.__str__.includes('candidate')
              ) {
                this.router.navigate(['/cd/profile']);
              }
            }, 200);
          } else if (res.statusText) {
            setTimeout(() => {
              this.ts.sendMessage(res.statusText, MessageType.Error);
            }, 200);
          }

          this.router.navigate(['']);
        });
    });
  }
}
