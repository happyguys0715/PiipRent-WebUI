import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';

import {
  getContactAvatar,
  isCandidate,
  isMobile,
  FormatString,
  checkAndReturnTranslation,
  getUrlPrefix,
} from '@webui/utilities';
import {
  FormService,
  GenericFormService,
  SiteSettingsService,
} from '@webui/core';
import { LocalStorageService } from 'ngx-webstorage';
import { DialogRef, Endpoints, FormMode, dialogConfig } from '@webui/models';
import { DecimalPipe, NgIf } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  CloseButtonComponent,
  FaIconComponent,
  InfoComponent,
  SpinnerComponent,
  TimeComponent,
} from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormatPipe, SubscriptionRequiredDirective } from '@webui/shared';
import { FormElementDirective } from '../../../directives';
import { GenericFormComponent } from '../../../generic-form/generic-form.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  selector: 'webui-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss'],
  imports: [
    NgIf,
    GoogleMapsModule,
    FaIconComponent,
    forwardRef(() => FormElementDirective),
    TranslateModule,
    InfoComponent,
    TimeComponent,
    SubscriptionRequiredDirective,
    DateFormatPipe,
    CloseButtonComponent,
    GenericFormComponent,
    SpinnerComponent,
    DecimalPipe,
    RouterLink,
  ],
})
export class FormInfoComponent implements OnInit, OnDestroy {
  public config: any;
  public group: any;
  public errors: any;

  public picture!: string;
  public available!: boolean;
  public title!: string;
  public skill_title!: string;
  public address!: string;
  public description!: string;
  public status!: any[];
  public averageScore: any;
  public contactAvatar!: string | null;
  public created_at!: string;
  public updated_at!: string;
  public job_title!: string;
  public company!: string;
  public titlePath!: boolean;
  public carrier_reserve!: number;
  public map: any;
  public client: any;
  public link!: string;
  public job: any;
  public jobsite: any;
  public tags: any;
  public birthday!: string;
  public timezone!: string;

  public color: any;
  public colorAttr!: string;
  public className: any;
  public viewMode!: boolean;

  public modalRef!: DialogRef;
  public modalInfo: any;
  public saveProcess!: boolean;

  public statusList!: any[];
  public more!: boolean;
  public disableButtons = true;
  public isMobileDevice = isMobile() && isCandidate();
  public fillInLink = '';

  public colors: Record<number, string> = {
    1: '#FA5C46',
    2: '#fc9183',
    3: '#FFA236',
    4: '#ffbf00',
    5: '#FFD042',
  };

  formId!: number;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @ViewChild('modal')
  public modal!: TemplateRef<any>;

  private subscriptions: Subscription[];

  constructor(
    private modalService: Dialog,
    private router: Router,
    private gfs: GenericFormService,
    private formService: FormService,
    private siteSettings: SiteSettingsService,
    private storage: LocalStorageService
  ) {
    this.subscriptions = [];
  }

  get isCandiateContactForm() {
    if (this.formId) {
      return (
        this.formService.getForm(this.formId).endpoint ===
        Endpoints.CandidateContact
      );
    }

    return false;
  }

  public ngOnInit() {
    setTimeout(() => {
      this.disableButtons = false;
    }, 500);
    this.checkModeProperty();
    if (this.config.values && this.config.value) {
      const keys = Object.keys(this.config.values);

      this.averageScore = this.config.value.average_score;

      keys.forEach(key => {
        if (key === 'status') {
          this[key] = this.getValue(
            this.config.values[key].field,
            this.config.value
          );

          if (this[key]) {
            if (this[key].length > 4) {
              this.statusList = this[key].slice(0, 4);

              this.more = true;
            } else {
              this.statusList = this[key];
            }

            this.color = this.config.values[key].color;
            this.colorAttr = this.config.values[key].color_attr;
          }
        } else if (key === 'picture') {
          this[key] =
            this.getValue(
              this.config.values[key],
              this.config.value,
              'picture'
            ) ||
            (this.getConfig('picture') &&
            this.getConfig('picture').companyContact
              ? '/assets/img/logo.svg'
              : null);
        } else if (key === 'map') {
          this[key] = this.getValue(this.config.values[key], this.config.value);

          if (this[key]) {
            if (this[key].latitude && this[key].longitude) {
              this[key].center = {
                lat: parseFloat(this[key].latitude),
                lng: parseFloat(this[key].longitude),
              };
            }
          }
        } else {
          const prop: keyof FormInfoComponent = key as keyof FormInfoComponent;

          if (prop !== 'isCandiateContactForm') {
            this[prop] = this.getValue(
              this.config.values[key],
              this.config.value
            ) as never;
          }
        }
      });

      if (!this.picture && this.title) {
        this.contactAvatar = getContactAvatar(this.title);
      }

      if (
        this.config.metadata['title'] &&
        this.config.metadata['title'].value instanceof Object
      ) {
        this.titlePath = true;
      }
    }

    this.createEvent();

    if (this.job) {
      this.fillInLink = `/${getUrlPrefix()}/hr/jobs/${
        this.config.value.id
      }/fillin`;
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public availabelLabel(): string {
    return this.available ? 'available.label' : 'unavailable.label';
  }

  public isCandidatePage(): boolean {
    if (this.config.value && this.config.value instanceof Object) {
      return 'average_score' in this.config.value;
    }

    return false;
  }

  public createEvent() {
    if (this.config.value) {
      this.event.emit({
        type: 'create',
        el: this.config,
        value: this.config.key === 'id' && { id: this.config.value.id },
      });
    }
  }

  public getConfig(name: string) {
    if (name === 'title' && !this.config.editForm) {
      const config = this.config.metadata[name];

      config.templateOptions.label = `${config.key[0].toUpperCase()}${config.key.slice(
        1
      )}`;
      return config;
    }

    return this.config.metadata[name];
  }

  public getValue(key: string, data: any, type?: string): any {
    if (key) {
      const keys = key.split('.');
      const prop: string = keys.shift() as string;

      if (!keys.length) {
        if (data[prop] instanceof Object && type === 'picture') {
          return data[prop].origin;
        }

        const { country_code } = this.siteSettings.settings;
        const lang = this.storage.retrieve('lang');

        data.__str__ = checkAndReturnTranslation(data, country_code, lang);

        return data[prop];
      } else if (data[prop]) {
        return this.getValue(keys.join('.'), data[prop], type);
      }
    }
  }

  public checkClass(item: any) {
    let className;
    if (this.color && this.colorAttr) {
      const keys = Object.keys(this.color);

      keys.forEach(key => {
        className =
          this.color[key].indexOf(item[this.colorAttr]) > -1 ? key : 'success';
      });
    }

    return className || 'success';
  }

  public showMore(e: any) {
    e.preventDefault();
    e.stopPropagation();

    this.statusList = this.status;
    this.more = false;

    return false;
  }

  public getScore(score: string) {
    return Math.floor(parseFloat(score));
  }

  public checkModeProperty() {
    if (this.config && this.config.mode) {
      const subscription = this.config.mode.subscribe((mode: FormMode) => {
        this.viewMode = mode === 'view';
      });

      this.subscriptions.push(subscription);
    }
  }

  public extendJob() {
    const formatString = new FormatString();

    this.modalInfo = {
      type: 'form',
      endpoint: `/hr/jobs/${this.config.value.id.id}/extend/`,
      mode: 'edit',
      edit: true,
      data: {
        default_shift_starting_time: {
          action: 'add',
          data: {
            value: formatString.format(
              '{default_shift_starting_time}',
              this.config.value
            ),
          },
        },
        skill: {
          action: 'add',
          data: {
            value: formatString.format('{position.id}', this.config.value),
          },
        },
        job: {
          action: 'add',
          data: {
            value: formatString.format('{id.id}', this.config.value),
          },
        },
      },
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({
        size: 'md',
        windowClass: 'extend-modal',
      })
    );
  }

  public formEvent(e: { type: 'saveStart' | 'extend' }) {
    this.saveProcess = e.type === 'saveStart';

    if (e.type === 'extend') {
      this.modalRef.close();
    }
  }

  public eventHandler(e: any) {
    if (e.type === 'patchPicture') {
      this.updateContact({ picture: e.value });
    }

    if (e.type === 'patchAddress') {
      this.updateContact({ address: e.value });
    }

    // if (this.isCandidatePage()) {
    //   if (e.additionalData
    //     && e.additionalData.picture
    //     && e.additionalData.picture.origin
    //   ) {
    //       this.picture = this.getValue('picture', e.additionalData, 'picture');
    //       this.contactAvatar = undefined;
    //     }
    // }
  }

  public formError() {
    this.saveProcess = false;
  }

  private updateContact(data: { picture?: string; address?: string }) {
    const contactId = this.config.formData.value.data.contact.id;
    const birthday = this.config.formData.value.data.contact.birthday;
    const endpoint = `${Endpoints.Contact}${contactId}/`;

    this.gfs.updateForm(endpoint, { ...data, birthday }).subscribe(res => {
      if (data.picture) {
        this.picture = res.picture.origin;
        this.config.metadata['picture'].value = res.picture;
        this.contactAvatar = null;
      }

      if (data.address) {
        this.config.metadata['address'].value = res.address;
      }
    });
  }
}
