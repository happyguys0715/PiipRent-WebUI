import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GenericFormService,
  MessageType,
  ToastService,
  UserService,
} from '@webui/core';
// import { GenericFormService } from '@webui/dynamic-form';
import { Endpoints } from '@webui/models';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
  imports: [TranslateModule, NavigationComponent],
})
export class ConsentComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private genericFormService: GenericFormService,
    private userServise: UserService,
    private toast: ToastService
  ) {}

  get user() {
    return this.userServise.user;
  }

  onAgree() {
    const id = this.route.snapshot.params['id'];

    this.genericFormService
      .submitForm(`${Endpoints.CandidateContact}${id}/consent/`, {})
      .pipe(
        catchError(err => {
          const message = err.errors.detail;

          this.toast.sendMessage(message, MessageType.Error);
          return of(err);
        })
      )
      .subscribe(res => {
        if (res.status == 'success') {
          this.toast.sendMessage('Thank you!', MessageType.Success);
          this.router.navigate(['/']);
        }
      });
  }

  notAgree() {
    this.router.navigate(['/']);
  }
}
