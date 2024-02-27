import {
  Component,
  // ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, merge, of, Subject, Subscription, takeUntil } from 'rxjs';

import {
  AuthService,
  EventService,
  EventType,
  GenericFormService,
  MessageType,
  METADATA,
  NavigationService,
  SiteService,
  ToastService,
  UserService,
} from '@webui/core';
import { PageData } from '@webui/data';
// import {
//   FormMode,
//   GenericFormComponent,
//   GenericFormService,
//   GenericListComponent,
// } from '@webui/dynamic-form';
import { isCandidate, isManager, isMobile } from '@webui/utilities';
// import { DialogRef } from '@webui/dialog';
import {
  Endpoints,
  User,
  FormMode,
  DialogRef,
  dialogConfig,
  Pagination,
} from '@webui/models';
import { CommonModule } from '@angular/common';
import {
  BackLinkComponent,
  CloseButtonComponent,
  NavigationComponent,
  SiteLoaderComponent,
  SpinnerComponent,
} from '@webui/ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent } from '@webui/calendar';
import {
  GenericFormComponent,
  GenericListComponent,
} from '@webui/generic-components';
import { Metadata } from '../../metadata.config';
import { MetadataService } from '@webui/metadata';
import { Dialog } from '@angular/cdk/dialog';
// import { GenericFormComponent } from '@webui/generic-form';
// import { GenericListComponent } from '@webui/generic-list';

@Component({
  standalone: true,
  selector: 'webui-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  imports: [
    CommonModule,
    BackLinkComponent,
    SpinnerComponent,
    InfiniteScrollModule,
    TranslateModule,
    CalendarComponent,
    CloseButtonComponent,
    SiteLoaderComponent,
    NavigationComponent,
    GenericFormComponent,
    GenericListComponent,
  ],
  providers: [
    { provide: METADATA, useClass: Metadata },
    MetadataService,
    GenericFormService,
  ],
})
export class SiteComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();

  public pageData?: PageData | null;
  public user?: User | null;
  public dashboard = true;
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

  public additionalData: any;
  public data: any;
  public endpointWithoutViewMode: string[] = ['/core/users/'];
  public passwordData: any;
  checkingInstance = false;

  public modalRef!: DialogRef;

  public mobileDesign: string[] = [
    '/hr/timesheets/approved/',
    '/hr/timesheets/history/',
    '/hr/timesheets/unapproved/',
  ];

  public loader!: boolean;
  public dialogRef!: DialogRef;

  loader$ = merge(of(EventType.RoleChanged), this.eventService.event$).pipe(
    filter(
      event => event === EventType.ChangeRole || event === EventType.RoleChanged
    ),
    map(event => event === EventType.ChangeRole)
  );

  private subscriptions: Subscription[] = [];

  get isMobileDevice() {
    return isMobile() && isCandidate();
  }

  get backToListLabel() {
    return `Back to ${this.listName.toLocaleLowerCase()} list`;
  }

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
    private ts: ToastService,
    private modalService: Dialog,
    private eventService: EventService
  ) {}

  public ngOnInit() {
    this.user = this.userService.user;
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

    this.subscriptions.forEach(sub => sub.unsubscribe());
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
        this.loader = false;

        if (this.isProfilePage(pageData)) {
          pageData.pathData.id = this.user?.data.contact.contact_id;
          pageData.pathData.postfix = 'change_username';
          pageData.endpoint = '/core/companycontacts/';
          this.formMode = FormMode.View;
          this.pageData = pageData;
          this.permissionMethods = ['get'];
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
            this.permissionMethods = ['delete', 'get', 'post', 'update'];
            this.formStorage = false;
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
    if (e.type === 'saveStart') {
      this.saveProcess = true;
      return;
    }
    if (e.type === 'sendForm' && e.status === 'success') {
      if (this.pageData?.pathData.postfix === 'submit') {
        this.router.navigate([this.pageData.pathData.path]);
        this.saveProcess = false;
        return;
      }
      if (!this.pageData?.pathData.id) {
        this.router.navigate([
          this.pageData?.pathData.path + e.data.id + '/change',
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
    if (e.type === 'checkObject') {
      this.checkingInstance = e.checking;
    }
  }

  public formError() {
    this.saveProcess = false;
  }

  public modeEvent(mode: FormMode) {
    this.formMode = mode;
  }

  public updateNavigation(e: any) {
    if (e.changed) {
      this.userModules = null;
      this.modulesList = null;
      this.getPageNavigation([]);
    }
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
    if (this.user?.currentRole?.__str__.includes('client')) {
      return this.user?.currentRole.id;
    }

    return undefined;
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

  public checkedObjects(e: any) {
    const shifts = e.filters.keys.date.value.filter((el: any) => el.checked);
    this.data = {
      candidates: e.checkedData,
      shifts: shifts.map((el: any) => el.data.id),
    };
  }

  public back() {
    this.router.navigate([
      this.pageData?.pathData.path +
        '/' +
        this.getId(this.pageData?.endpoint as string) +
        '/change',
    ]);

    return false;
  }

  public sendData() {
    if (this.data) {
      this.genericFormService
        .submitForm(this.pageData?.endpoint as string, this.data)
        .pipe(takeUntil(this._destroy))
        .subscribe(
          () =>
            this.router.navigate([
              this.pageData?.pathData.path +
                '/' +
                this.getId(this.pageData?.endpoint as string) +
                '/change',
            ]),
          (err: any) => (this.error = err)
        );
    }
  }

  public getId(path: string): string {
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
    return;
  }

  public permissionErrorHandler() {
    const path =
      (this.pageData &&
        this.pageData.pathData &&
        this.pageData.pathData.path) ||
      '/';
    this.router.navigate([path]);
  }

  public showDeleteButton() {
    return this.pageData?.pathData.id && this.checkPermission('delete');
  }

  public isProfilePage(page: PageData) {
    return page.pathData.path === '/profile/';
  }
}
