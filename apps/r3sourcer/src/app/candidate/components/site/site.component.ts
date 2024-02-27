import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, merge, of, takeUntil } from 'rxjs';

import {
  SiteService,
  UserService,
  AuthService,
  NavigationService,
  EventService,
  EventType,
  GenericFormService,
  METADATA,
  ListActionService,
} from '@webui/core';
import { PageData } from '@webui/data';
import { ToastService, MessageType } from '@webui/core';
import { isMobile, isCandidate, isManager } from '@webui/utilities';
import {
  Endpoints,
  User,
  FormMode,
  DialogRef,
  dialogConfig,
  Status,
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
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CalendarComponent } from '@webui/calendar';
import { CounterWidgetComponent } from '@webui/dashboard';
import {
  GenericFormComponent,
  GenericListComponent,
} from '@webui/generic-components';
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
    TranslateModule,
    SpinnerComponent,
    InfiniteScrollModule,
    CalendarComponent,
    CloseButtonComponent,
    SiteLoaderComponent,
    NavigationComponent,
    GenericFormComponent,
    GenericListComponent,
    CounterWidgetComponent,
  ],
  providers: [
    GenericFormService,
    MetadataService,
    { provide: METADATA, useClass: Metadata },
  ],
})
export class SiteComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();

  public pageData!: PageData | null;
  public user?: User | null;
  public dashboard = true;
  // public currentRole?: IRole;
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

  public listNameCache = {};
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

  @ViewChild('modal') public modal!: TemplateRef<unknown>;
  @ViewChild('forgotPassword')
  public forgotPasswordModal!: TemplateRef<unknown>;
  @ViewChild('list') list?: GenericListComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private siteService: SiteService,
    private navigationService: NavigationService,
    private userService: UserService,
    private authService: AuthService,
    private ts: ToastService,
    private modalService: Dialog,
    private eventService: EventService,
    private listActionService: ListActionService
  ) {}

  public ngOnInit() {
    this.user = this.userService.user;
    // this.currentRole = this.user?.currentRole;
    this.changePasswordEndpoint = `${Endpoints.Contact}${this.user?.data.contact.id}/change_password/`;

    this.route.url.pipe(takeUntil(this._destroy)).subscribe((url: any) => {
      this.checkTimesheetSubmitRedirect();

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
        if (this.isProfilePage(pageData)) {
          pageData.pathData.id = this.user?.data.contact.candidate_contact;
          pageData.endpoint = '/candidate/candidatecontacts/';
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
          }, 0);
        }
        this.setActivePage(this.pagesList, pageData.pathData.path);
      });
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
  }

  public formError() {
    this.saveProcess = false;
  }

  public modeEvent(mode: FormMode) {
    this.formMode = mode;
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

  public openChangePassword() {
    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({
        size: 'sm',
      })
    );
  }

  public openResetForm() {
    this.modalRef.close();
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

  public permissionErrorHandler() {
    const path =
      (this.pageData &&
        this.pageData.pathData &&
        this.pageData.pathData.path) ||
      '/';
    this.router.navigate([path]);
  }

  public isProfilePage(page: PageData) {
    return page.pathData.path === '/profile/';
  }

  private checkTimesheetSubmitRedirect() {
    const isTimesheetsPage = this.route.snapshot.url.some(el =>
      el.path.includes('timesheets-candidate')
    );
    const timesheetId = this.route.snapshot.queryParamMap.get('timesheet');

    if (isTimesheetsPage && timesheetId) {
      this.listActionService.submitTimesheet(timesheetId).subscribe(status => {
        if (status === Status.Success) {
          this.list?.refreshList();
        }
      });
    }
  }
}
