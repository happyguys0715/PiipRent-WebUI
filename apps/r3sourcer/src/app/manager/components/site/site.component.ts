import {
  Component,
  // ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, of, Subject } from 'rxjs';
import { filter, finalize, map, takeUntil } from 'rxjs/operators';

import {
  AuthService,
  CheckPermissionService,
  EventService,
  EventType,
  GenericFormService,
  ListEvent,
  MessageType,
  METADATA,
  NavigationService,
  SiteService,
  SiteSettingsService,
  ToastService,
  UserService,
} from '@webui/core';
import { PageData } from '@webui/data';
// import {
//   FormMode,
//   GenericFormComponent,
//   GenericFormService,
//   GenericListComponent,
//   ListEvent,
// } from '@webui/dynamic-form';
import { isCandidate, isClient, isManager, isMobile } from '@webui/utilities';
// import { DialogRef } from '@webui/dialog';
import {
  DialogType,
  Endpoints,
  IRole,
  User,
  FormMode,
  DialogRef,
  dialogConfig,
  Status,
  Pagination,
} from '@webui/models';
// import { empty } from 'ramda';
import { CommonModule } from '@angular/common';
import {
  BackLinkComponent,
  CloseButtonComponent,
  FaIconComponent,
  NavigationComponent,
  SiteLoaderComponent,
  SpinnerComponent,
} from '@webui/ui';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilderComponent } from '../form-builder/form-builder.component';
import { TestBuilderComponent } from '../test-builder/test-builder.component';
import { MapComponent } from '../map/map.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DashboardComponent } from '@webui/dashboard';
import {
  GenericFormComponent,
  GenericListComponent,
} from '@webui/generic-components';
import { MasterGuideComponent } from '../../../master-guide/components';
import { MetadataService } from '@webui/metadata';
import { Metadata } from '../../metadata.config';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  selector: 'webui-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  imports: [
    CommonModule,
    BackLinkComponent,
    SubscriptionRequiredDirective,
    TranslateModule,
    FaIconComponent,
    SpinnerComponent,
    FormBuilderComponent,
    TestBuilderComponent,
    MapComponent,
    CloseButtonComponent,
    SiteLoaderComponent,
    NavigationComponent,
    GenericFormComponent,
    InfiniteScrollModule,
    GenericListComponent,
    DashboardComponent,
    MasterGuideComponent,
  ],
  providers: [
    GenericFormService,
    MetadataService,
    { provide: METADATA, useClass: Metadata },
  ],
})
export class SiteComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();

  public pageData?: PageData | null;
  public user?: User | null;
  public dashboard = true;
  public currentRole?: IRole;
  public changePasswordEndpoint!: string;

  public modulesList: any;
  public userModules: any;
  public pagesList: any;
  public formLabel!: string;
  public fillInData = {
    responseField: 'list',
    paginated: Pagination.Off,
    supportData: 'job',
    metaType: true,
    actions: true,
  };
  public FormMode = FormMode;

  public formStorage!: boolean;
  public formStorageEndpoint = '/core/formstorages/';
  public approvedStorage!: boolean;

  public error: any;

  public formMode!: FormMode | null;

  public saveProcess!: boolean;
  public permissionMethods!: string[];
  public reload!: boolean;

  public upload: Subject<boolean> = new Subject();
  public listName!: string;

  public listNameCache: Record<string, any> = {};
  public errors: any = {};

  public acceptenceTestData: any;
  public additionalData: any;
  public data: any;
  public endpointWithoutViewMode: string[] = ['/core/users/'];
  public passwordData: any;

  public modalRef!: DialogRef;

  public mobileDesign: string[] = [
    '/hr/timesheets/approved/',
    '/hr/timesheets/history/',
    '/hr/timesheets/unapproved/',
  ];

  public loader!: boolean;

  public rowId: any = '';
  public dialogRef!: DialogRef;

  loader$ = merge(of(EventType.RoleChanged), this.eventService.event$).pipe(
    filter(
      event => event === EventType.ChangeRole || event === EventType.RoleChanged
    ),
    map(event => event === EventType.ChangeRole)
  );

  get isMobileDevice() {
    return isMobile() && isCandidate();
  }

  get backToListLabel() {
    return `Back to ${this.listName.toLocaleLowerCase()} list`;
  }

  fillInList = {
    initialized: false,
    loading: false,
  };

  @ViewChild('modal') public modal!: TemplateRef<unknown>;
  @ViewChild('forgotPassword')
  public forgotPasswordModal!: TemplateRef<unknown>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private siteService: SiteService,
    private genericFormService: GenericFormService,
    private navigationService: NavigationService,
    private userService: UserService,
    private authService: AuthService,
    private permission: CheckPermissionService,
    private ts: ToastService,
    private siteSettingsService: SiteSettingsService,
    private modalService: Dialog,
    private eventService: EventService
  ) {}

  public ngOnInit() {
    this.user = this.userService.user;
    this.currentRole = this.user?.currentRole;
    this.changePasswordEndpoint = `${Endpoints.Contact}${this.user?.data.contact.id}/change_password/`;

    this.route.url.pipe(takeUntil(this._destroy)).subscribe((url: any) => {
      this.formLabel = '';
      this.pageData = null;
      setTimeout(() => {
        this.getPageNavigation(url);
      }, 0);
      if (url.length) {
        this.formMode = null;
        this.dashboard = false;
      } else {
        this.dashboard = true;
      }
    });
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this._destroy.next();
    this._destroy.complete();
  }

  public checkPermission(type: string): boolean {
    if (isManager()) {
      return this.permissionMethods.indexOf(type) > -1;
    } else {
      return true;
    }
  }

  public changeFormLabel(e: any) {
    if (e && e.str) {
      this.formLabel = e.str;
      if (e.data && this.formStorage) {
        this.approvedStorage = e.data.status;
      }
    }
  }

  public onModalScrollDown() {
    this.upload.next(true);
  }

  public getPageData(url: Array<{ path: string }>) {
    this.siteService
      .getDataOfPage(url, this.pagesList)
      .pipe(takeUntil(this._destroy))
      .subscribe((pageData: PageData) => {
        if (pageData.endpoint === '/core/workflownodes/') {
          this.additionalData = {
            company: {
              action: 'add',
              data: {
                value: {
                  id: this.siteSettingsService.settings.company,
                },
              },
            },
          };
          this.pageData = pageData;
          this.permissionMethods = this.permission.getAllowMethods(
            undefined,
            pageData.endpoint
          );
        } else if (this.isProfilePage(pageData)) {
          if (this.user) {
            pageData.pathData.id = this.user.data.contact.candidate_contact;
            pageData.endpoint = '/candidate/candidatecontacts/';
            this.formMode = FormMode.View;
            this.pageData = pageData;
            this.permissionMethods = this.permission.getAllowMethods(
              undefined,
              pageData.endpoint
            );
          }
        } else if (
          pageData.endpoint === '/' &&
          pageData.pathData.path !== '/'
        ) {
          setTimeout(() => {
            this.ts.sendMessage('Page not found!', MessageType.Error);
          }, 2000);

          this.router.navigate(['']);
          return;
        } else {
          setTimeout(() => {
            this.pageData = pageData;
            if (
              pageData.pathData.id &&
              this.endpointWithoutViewMode.indexOf(pageData.endpoint) === -1
            ) {
              this.formMode = FormMode.View;
            }
            if (isClient()) {
              this.permissionMethods = ['delete', 'get', 'post', 'update'];
            } else {
              this.permissionMethods = this.permission.getAllowMethods(
                undefined,
                pageData.endpoint
              );
            }
            if (pageData.endpoint === '/core/formstorages/') {
              this.formStorage = true;
            } else {
              this.formStorage = false;
            }
          }, 0);
        }
        this.setActivePage(this.pagesList, pageData.pathData.path);

        this.getNameOfList(pageData);
      });
  }

  public getNameOfList(pageData: PageData) {
    if (pageData.pathData.type === 'form') {
      if (this.listNameCache[pageData.endpoint]) {
        this.listName = this.listNameCache[pageData.endpoint];
        return;
      }

      this.genericFormService
        .getMetadata(pageData.endpoint)
        ?.subscribe(list => {
          if (list && list.list && list.list.label) {
            this.listName = list.list.label;
            this.listNameCache[pageData.endpoint] = list.list.label;
          }
        });
    }
  }

  public getPageNavigation(url: any[]) {
    if (!this.pagesList) {
      this.getPages(url);
    }
    if (this.pagesList) {
      this.getPageData(url);
    }
  }

  public getPages(url: Array<{ path: string }>) {
    const role = this.user?.currentRole;
    // const companyId = isManager() ? this.user.data.contact.company_id : '';

    this.navigationService
      .getPages(role)
      .pipe(takeUntil(this._destroy))
      .subscribe((res: any) => {
        this.pagesList = res;

        if (url.length) {
          this.getPageData(url);
        }
      });
  }

  public changeMode(mode: FormMode) {
    this.formMode = mode;
  }

  public formEvent(e: any) {
    const rowId = this.pageData?.pathData.id as string;
    localStorage.setItem('rowId', rowId);
    if (e.type === 'saveStart') {
      this.saveProcess = true;
      return;
    }
    if (e.type === 'sendForm' && e.status === 'success') {
      if (this.pageData?.pathData.postfix === 'submit') {
        this.router.navigate([
          '/' + this.authService.getRedirectUrl() + this.pageData.pathData.path,
        ]);
        this.saveProcess = false;
        return;
      }
      if (!this.pageData?.pathData.id) {
        this.router.navigate([
          '/' +
            this.authService.getRedirectUrl() +
            this.pageData?.pathData.path +
            e.data.id +
            '/change',
        ]);
        this.saveProcess = false;
        return;
      }
      this.saveProcess = false;
      this.formMode = FormMode.View;
      this.reload = true;
      setTimeout(() => {
        this.reload = false;
      }, 150);
    }
  }

  public formError() {
    this.saveProcess = false;
  }

  public modeEvent(mode: FormMode) {
    this.formMode = mode;
  }

  public deleteElement(element: any) {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.ConfirmAction,
      onInit: (dialogRef: any) => (this.dialogRef = dialogRef),
      options: {
        data: {
          message: 'message.confirm_delete_instance',
          model: this.listName.toLowerCase(),
          name: this.formLabel,
          accept: 'delete',
          decline: 'action.cancel',
        },
      },
    });

    this.dialogRef.closed.subscribe(status => {
      if (status === Status.Accept) {
        this.genericFormService
          .delete(element.endpoint, element.pathData.id)
          .pipe(takeUntil(this._destroy))
          .subscribe(
            () =>
              this.router.navigate([
                '/' + this.authService.getRedirectUrl() + element.pathData.path,
              ]),
            (err: any) => (this.error = err)
          );
      }
    });
  }

  public updateNavigation(e: any) {
    if (e.changed) {
      this.userModules = null;
      this.modulesList = null;
      this.getPageNavigation([]);
    }
  }

  public approveFormStorage(element: any) {
    const endpoint = `${this.formStorageEndpoint}${element.pathData.id}/approve/`;
    const body = {
      status: 'True',
    };
    this.genericFormService
      .submitForm(endpoint, body)
      .pipe(takeUntil(this._destroy))
      .subscribe(
        () =>
          this.router.navigate([
            '/' + this.authService.getRedirectUrl() + element.pathData.path,
          ]),
        (err: any) => (this.error = err)
      );
  }

  public setActivePage(pages: any[], path: string) {
    let active = false;
    pages.forEach(page => {
      if (path === page.url && page.url !== '/') {
        active = true;
        page.active = true;
      } else if (page.children) {
        page.active = this.setActivePage(page.children, path);
        active = active || page.active;
      }
    });
    return active;
  }

  public getClientId(): string | undefined {
    if (this.currentRole?.__str__.includes('client')) {
      return this.currentRole.id;
    }

    return undefined;
  }

  public setTestData(data: any) {
    this.acceptenceTestData = data.data;
  }

  public openChangePassword() {
    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({
        size: 'sm',
      })
    );
  }

  public openResetForm() {
    this.modalRef?.close();
    this.passwordData = {
      email: {
        action: 'add',
        data: {
          value: this.user?.data.contact.email,
          read_only: true,
        },
      },
    };

    this.modalRef = this.modalService.open(
      this.forgotPasswordModal,
      dialogConfig({
        size: 'sm',
      })
    );

    return false;
  }

  public resetEvent(response: any) {
    if (response && response.status === 'success') {
      this.authService.logout();
    }
  }

  public checkedObjects(data: { checkedData: string[]; filters: any }) {
    const { checkedData: candidates, filters } = data;
    const shifts = filters.keys.date.value
      .filter(({ checked }: { checked: boolean }) => checked)
      .map(({ data: { id } }: { data: { id: string } }) => id);

    if (!candidates.length || !shifts.length) {
      this.data = null;

      return;
    }

    this.data = {
      candidates,
      shifts,
    };
  }

  public back() {
    const redirectUrl = this.authService.getRedirectUrl();
    const path = this.pageData?.pathData.path;
    const id = this.getId(this.pageData?.endpoint);
    const url = `/${redirectUrl}${path}/${id}/change`;

    this.router.navigate([url]);
  }

  public sendData() {
    if (this.data && !this.fillInList.loading) {
      this.fillInList.loading = true;

      this.genericFormService
        .submitForm(this.pageData?.endpoint as string, this.data)
        .pipe(finalize(() => (this.fillInList.loading = false)))
        .pipe(takeUntil(this._destroy))
        .subscribe(
          () => this.back(),
          (err: any) => {
            const { detail } = err.errors;

            if (!detail) {
              return;
            }

            this.ts.sendMessage(detail, MessageType.Error);
          }
        );
    }
  }

  public getId(path?: string): string {
    if (!path) {
      return '';
    }

    const keys = path.split('/');

    return keys[keys.length - 3];
  }

  public identifyDevice() {
    if (this.pageData) {
      if (
        this.user?.currentRole.__str__.includes('client') &&
        this.pageData.pathData.path === '/'
      ) {
        return isMobile();
      }
    }
    return false;
  }

  public permissionErrorHandler() {
    const path =
      (this.pageData &&
        this.pageData.pathData &&
        this.pageData.pathData.path) ||
      '';
    this.router.navigate(['/' + this.authService.getRedirectUrl() + path]);
  }

  public showDeleteButton() {
    return (
      this.pageData?.pathData.id &&
      this.checkPermission('delete') &&
      !this.isProfilePage(this.pageData)
    );
  }

  public isProfilePage(page: PageData) {
    return page.pathData.path === '/profile/';
  }

  public fillinListEventHandler(event: ListEvent) {
    this.fillInList.initialized = event === ListEvent.Initialized;
  }
}
