import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  PRIMARY_OUTLET,
} from '@angular/router';

import { forkJoin, throwError, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  UserService,
  NavigationService,
  CheckPermissionService,
  SubscriptionService,
} from '../services';
import { Time } from '@webui/time';
import { IRole } from '@webui/models';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private checkPermissionService: CheckPermissionService,
    private navigationService: NavigationService,
    private subscriptionService: SubscriptionService
  ) {}

  isManager(role: IRole): boolean {
    if (!role) {
      return false;
    }

    const { __str__: title } = role;

    return title.includes('manager') || title.includes('trial');
  }

  public canActivate(route: ActivatedRouteSnapshot) {
    return this.userService.getUserData().pipe(
      map(user => {
        if (this.isManager(user.currentRole)) {
          const trialExpired = Time.parse(user.data.end_trial_date).isBefore(
            Time.now()
          );

          trialExpired
            ? this.subscriptionService.update()
            : this.subscriptionService.useTrialPermissions();
        } else {
          this.subscriptionService.useClientPermissions();
        }

        return {
          navigation: this.navigationService.getPages(user.currentRole),
          permissions: this.isManager(user.currentRole)
            ? this.checkPermissionService.getPermissions(user.data.user)
            : of([]),
          user: of(user),
        };
      }),
      switchMap(requests => forkJoin(requests)),
      map(({ navigation, user }) => {
        let result = false;

        if (!this.isManager(user.currentRole)) {
          result = true;
        }

        let routeSegments =
          this.router.getCurrentNavigation()?.initialUrl.root.children[
            PRIMARY_OUTLET
          ].segments;

        if (!routeSegments) {
          throw new Error('Invalid route path');
        }

        if (routeSegments[0].path === 'mn') {
          routeSegments = routeSegments.slice(1);
        }

        if (routeSegments[0]?.path === 'settings') {
          result = true;
        }

        return {
          result,
          navigation,
          routeSegments,
          user,
        };
      }),
      switchMap(({ result, navigation, routeSegments, user }) =>
        result
          ? of(result)
          : this.checkPermissionService.checkPermission(
              user.data.user,
              routeSegments,
              navigation
            )
      ),

      catchError(() => {
        return of(this.router.parseUrl('/'));
      })
    );
  }
}
