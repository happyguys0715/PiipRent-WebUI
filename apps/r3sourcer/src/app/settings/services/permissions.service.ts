import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { ErrorsService } from '@webui/core';

@Injectable()
export class PermissionsService {
  public endpoints = {
    base: '/permissions/',
    user: '/permissions/user/',
    group: '/permissions/group/',
    users: '/company_settings/users/',
    all: 'all/',
    add: 'set/',
    create: 'create/',
    addUser: 'add_user/',
    removeUser: 'remove_user/',
    revoke: 'revoke/',
    delete: 'delete/',
    groups: 'groups/',
    availableGroups: 'available_groups/',
  };

  constructor(private http: HttpClient, private errors: ErrorsService) {}

  public getAllPermissions() {
    const endpoint = `${this.endpoints.base}${this.endpoints.all}?limit=-1`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public getAllUsers() {
    const endpoint = `${this.endpoints.users}`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public getPermissionsOfUser(id: string) {
    const endpoint = `${this.endpoints.user}${id}/`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public addPermissionsOnTheUser(id: string, permissions: string[]) {
    const endpoint = `${this.endpoints.user}${id}/${this.endpoints.add}`;
    const body = {
      permission_list: permissions,
    };
    return this.http
      .post(endpoint, body)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public getGroupsOnTheUser(id: string) {
    const endpoint = `${this.endpoints.user}${id}/${this.endpoints.groups}`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public getAvailableGroupsOnTheUser(id: string) {
    const endpoint = `${this.endpoints.user}${id}/${this.endpoints.availableGroups}`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public revokePermissionsOfTheUser(id: string, permissions: string[]) {
    const endpoint = `${this.endpoints.user}${id}/${this.endpoints.revoke}`;
    const body = {
      permission_list: permissions,
    };
    return this.http
      .post(endpoint, body)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public getAllGroups() {
    const endpoint = `${this.endpoints.base}${this.endpoints.groups}`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public getAllPermissionsOfTheGroup(id: string) {
    const endpoint = `${this.endpoints.group}${id}/`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public createGroup(name: string) {
    const endpoint = `${this.endpoints.base}${this.endpoints.groups}${this.endpoints.create}`;
    const body = { name };
    return this.http
      .post(endpoint, body)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public deleteGroup(id: string) {
    const endpoint = `${this.endpoints.group}${id}/${this.endpoints.delete}`;
    return this.http
      .get(endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public addPermissionsOnTheGroup(id: string, permissions: string[]) {
    const endpoint = `${this.endpoints.group}${id}/${this.endpoints.add}`;
    const body = {
      permission_list: permissions,
    };
    return this.http
      .post(endpoint, body)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public addUserOnTheGroup(groupId: string, userId: string) {
    const endpoint = `${this.endpoints.group}${groupId}/${this.endpoints.addUser}`;
    const body = {
      user_id: userId,
    };
    return this.http
      .post(endpoint, body)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public removeUserOnTheGroup(groupId: string, userId: string) {
    const endpoint = `${this.endpoints.group}${groupId}/${this.endpoints.removeUser}`;
    const body = {
      user_id: userId,
    };
    return this.http
      .post(endpoint, body)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public revokePermissionsOfTheGroup(id: string, permissions: string[]) {
    const endpoint = `${this.endpoints.group}${id}/${this.endpoints.revoke}`;
    const body = {
      permission_list: permissions,
    };
    return this.http
      .post(endpoint, body)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }
}
