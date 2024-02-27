import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

import {
  AuthService,
  ENV,
  EventService,
  EventType,
  NavigationService,
  SubscriptionService,
  TranslateHelperService,
  UserService,
} from '@webui/core';
import { Page } from '@webui/data';
import {
  getContactAvatar,
  isCandidate,
  isClient,
  isManager,
} from '@webui/utilities';
import { Time } from '@webui/time';
import { DialogType, IEnv, IRole, Language, User } from '@webui/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TimeComponent } from '../time/time.component';
import { Icon, IconComponent, IconSize } from '../icon/icon.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { OverlayDropdownComponent } from '../overlay-dropdown/overlay-dropdown.component';

@Component({
  standalone: true,
  selector: 'webui-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterLink,
    TimeComponent,
    IconComponent,
    TranslateModule,
    LanguageSelectorComponent,
    OverlayDropdownComponent,
  ],
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>();

  @ViewChild('header') public header: any;
  @ViewChild('list') public list: any;
  @ViewChild('item') public item: any;
  @ViewChild('nav') public nav: any;
  @ViewChild('userBlock') public userBlock: any;
  @ViewChild('modal') public modal: any;
  @ViewChild('roles') public rolesTemplate: any;

  @Input() public user?: User | null;
  @Input() public logo = '/assets/img/new-software.svg';

  @Output()
  public changePasswordEmitter: EventEmitter<any> = new EventEmitter();

  public headerHeight!: number;
  public error: any;
  public isCollapsed = false;
  public hideUserMenu = true;
  public greeting!: string;
  public userPicture!: string;
  public userType!: string;
  public currentRole!: string;
  public company!: string;
  public picture!: string;
  public contactAvatar!: string;
  public urlPrefix = isClient()
    ? '/cl'
    : isCandidate()
    ? '/cd'
    : isManager()
    ? '/mn'
    : '';
  public initTime!: boolean;
  isManager = isManager;
  isClient = isClient;

  language = new FormControl(Language.English);
  Language = Language;
  Icon = Icon;
  IconSize = IconSize;

  get pages(): Page[] {
    return this.navigationService.navigationList[this.currentRole];
  }

  get fullName(): string {
    return this.user?.data.contact.name || '';
  }

  get trialMessage() {
    return this.subscriptionService.activePlan$.pipe(
      map(sub => {
        const expires = Time.parse(this.user?.data.end_trial_date, {
          format: 'YYYY-MM-DD hh:mm:ss',
        });

        if (!sub && expires.isBefore(Time.now())) {
          return `Trial version expired!`;
        } else {
          return '';
        }
      })
    );
  }

  get roles() {
    return this.user?.data.roles;
  }

  get currentRoleObject() {
    return this.user?.currentRole;
  }

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private userService: UserService,
    private translate: TranslateHelperService,
    private eventService: EventService,
    private subscriptionService: SubscriptionService,
    @Optional() @Inject(ENV) private environment: IEnv
  ) {}

  public ngOnInit() {
    this.getUserInformation();

    this.language.valueChanges.pipe(takeUntil(this._destroy)).subscribe(v => {
      this.translate.setLang(v as Language);
    });
  }

  public ngAfterViewInit() {
    const header = this.header.nativeElement;

    setTimeout(() => {
      this.headerHeight = header.offsetHeight - 1;
    }, 200);

    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntil(this._destroy))
      .subscribe(() => {
        if (window.innerWidth > 1200 && this.isCollapsed === true) {
          this.isCollapsed = false;
        } else if (this.headerHeight !== header.offsetHeight - 1) {
          this.headerHeight = header.offsetHeight - 1;
        }
      });
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public getUserInformation() {
    if (this.user && this.user.data.contact) {
      this.currentRole = this.user.currentRole.id;
      this.greeting = `Welcome, ${this.user.data.contact.__str__}`;
      this.checkUserType();
      this.company = this.user.data.contact.company;
      this.picture =
        this.user.data.contact.picture && this.user.data.contact.picture.origin;

      if (!this.picture) {
        this.contactAvatar = getContactAvatar(this.user.data.contact.__str__);
      }
    } else {
      this.greeting = `Welcome, Anonymous User`;
    }
  }

  public checkUserType() {
    this.userType = isClient() ? 'client' : isCandidate() ? 'candidate' : '';
  }

  public toggleUserBlock() {
    this.isCollapsed = false;
    this.hideUserMenu = !this.hideUserMenu;
  }

  public showNavigation(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.hideUserMenu = true;
    this.isCollapsed = !this.isCollapsed;
  }

  public logOut() {
    this.authService.logout();
  }

  public changeRole(role: IRole, event: MouseEvent) {
    if (this.environment.production && role.domain !== location.host) {
      return;
    }

    if (
      !this.environment.production &&
      !this.environment.origin.includes(role.domain)
    ) {
      return;
    }

    event.preventDefault();
    this.eventService.emit(EventType.ChangeRole, { role });
  }

  public clickAction(e: MouseEvent, p: any) {
    e.stopPropagation();
    e.preventDefault();

    p.opened = !p.opened;

    if (p.url !== '/') {
      this.isCollapsed = false;
    }

    return false;
  }

  public checkUrlPrefix(url: string) {
    if (url.includes('settings') || url.includes('billing')) {
      return false;
    }

    return true;
  }

  public changePassword() {
    this.hideUserMenu = true;
    this.changePasswordEmitter.emit();

    return false;
  }

  public getDisableTitle(menu: string): string {
    return `You do not have permission to access ${menu}. Please contact your administrator.`;
  }

  getRolePosition(role?: IRole): string {
    if (!this.user || !role) {
      return '';
    }

    const company = role.company_contact_rel.company.name;

    if (role.name === 'candidate') {
      return 'Candidate, ' + company;
    }

    const position = role.company_contact_rel.company_contact.name.replace(
      this.user.data.contact.name,
      ''
    );

    return `${position.trim()}, ${company}`;
  }

  onChangePhoneNumber() {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.ChangePhoneNumber,
    });
  }

  onChangeEmail() {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.ChangeEmail,
    });
  }

  public onTransferCompany(): void {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.TransferToRegularCompany,
    });
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchend', ['$event'])
  public handleClick(event: MouseEvent) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (
        (this.nav && clickedComponent === this.nav.nativeElement) ||
        (this.userBlock && clickedComponent === this.userBlock.nativeElement)
      ) {
        inside = true;
      }
      clickedComponent = (clickedComponent as HTMLElement).parentNode;
    } while (clickedComponent);
    if (!inside) {
      // if (this.isCollapsed) {
      //   this.isCollapsed = false;
      // }
      if (!this.hideUserMenu) {
        this.hideUserMenu = true;
      }
    }
  }
}
