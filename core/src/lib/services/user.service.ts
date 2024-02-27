import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ErrorsService } from './errors.service';
import { ToastService, MessageType } from './toast.service';
import { EventService, EventType } from './event.service';
import { ENV } from './env.service';
import { Language, IRole, User, IUser, Role, IEnv } from '@webui/models';

const defaultCountryCode = 'GB';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public authEndpoint = '/auth/restore_session/';
  public rolesEndpoint = '/core/users/roles/';
  public timezoneEndpoint = '/core/users/timezone/';
  public user?: User | null;
  public error: any;
  public roleRedirect!: string;

  get companyId(): string {
    if (this.user) {
      return this.user.data.contact.company_id;
    }

    return '';
  }

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private toastService: ToastService,
    private authService: AuthService,
    private errorsService: ErrorsService,
    private eventService: EventService,
    @Optional() @Inject(ENV) private env: IEnv
  ) {
    this.eventService.event$
      .pipe(filter(event => event === EventType.ChangeRole))
      .subscribe(() => {
        if (this.user) {
          const { role } = this.eventService.payload;
          this.user.currentRole = role;
          this.storage.store('role', role);
          this.eventService.emit(EventType.UpdateNavigation, { role });
        }
      });
  }

  public getUserData() {
    if (!this.user && this.storage.retrieve('user')) {
      return this.http.get<IUser>(this.authEndpoint).pipe(
        map(payload => {
          const user = new User(payload);
          const { roles, contact, country_code } = user.data;

          const currentDomainRoles = roles.filter(role => {
            return (
              role.domain === location.host ||
              (this.env.origin
                ? this.env.origin.replace('https://', '') === role.domain
                : false)
            );
          });

          if (!contact.contact_type || !roles.length) {
            this.logout();
          }

          user.data.country_code = country_code || defaultCountryCode;

          const redirectRole: string | undefined = this.authService.role;
          const storageRole: IRole = this.storage.retrieve('role');
          const lang: Language = this.storage.retrieve('lang') as Language;

          let role: Role | undefined = currentDomainRoles.find(el =>
            storageRole
              ? el.id === storageRole.id
              : el.__str__.includes(contact.contact_type)
          );

          if (redirectRole) {
            const existRole = currentDomainRoles.find(
              el => el.id === redirectRole
            );

            if (existRole) {
              role = existRole;
            } else {
              this.logout();
            }
            // Do not remove! Probably used for some cases when restore_session don't return roles
            // else {
            //   role = new Role(redirectRole);
            //   roles.push(role);
            // }
          }

          user.currentRole = role || currentDomainRoles[0];
          this.storage.store('role', user.currentRole);

          if (!lang && contact.default_language) {
            this.storage.store('lang', contact.default_language);
          }

          this.user = user;

          return user;
        }),
        catchError(errors => this.errorsService.handleError(errors))
      );
    } else {
      return of(this.user as User);
    }
  }

  public resolve() {
    return this.getUserData();
  }

  private logout() {
    this.authService.logout();

    setTimeout(() => {
      this.toastService.sendMessage('User is invalid', MessageType.Error);
    }, 1000);

    throw Error('User is invalid');
  }
}
