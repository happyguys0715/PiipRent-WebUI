import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewChecked,
  ElementRef,
  Optional,
  forwardRef,
  TemplateRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomEvent, dialogConfig } from '@webui/models';

import { Subscription, BehaviorSubject, Subject, merge } from 'rxjs';
import {
  debounceTime,
  skip,
  filter,
  takeUntil,
  catchError,
} from 'rxjs/operators';

import {
  NavigationService,
  AuthService,
  UserService,
  SiteSettingsService,
  CheckPermissionService,
  ToastService,
  MessageType,
  Page,
  TimelineAction,
  GenericFormService,
  TimelineService,
} from '@webui/core';
import {
  FormatString,
  isClient,
  getTranslationKey,
  checkAndReturnTranslation,
  setPropValue,
  getUrlPrefix,
} from '@webui/utilities';

// import {
//   GenericFormService,
//   TimelineService,
//   TimelineAction,
// } from '../../../services';
import { BasicElementComponent } from '../basic-element/basic-element.component';
import { LocalStorageService } from 'ngx-webstorage';
import { Field, ITemplateOptions, QueryObject } from '@webui/metadata';
import { CountryCodeLanguage, Endpoints } from '@webui/models';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { forEach, keys, remove } from 'ramda';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  CheckboxComponent,
  CloseButtonComponent,
  FaIconComponent,
  InfoComponent,
  LoaderComponent,
  OverlayDropdownComponent,
  SpinnerComponent,
  TooltipDirective,
} from '@webui/ui';
import { ApiTranslatePipe, SubscriptionRequiredDirective } from '@webui/shared';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormElementDirective } from '../../../directives';
import { GenericFormComponent } from '../../../generic-form/generic-form.component';
import { Dialog } from '@angular/cdk/dialog';
// import { InfoComponent } from '../../info/info.component';
// import { GenericFormComponent } from '../../generic-form/generic-form.component';
// import { FormElementDirective } from '../../../directives';

export interface RelatedObject {
  id?: string;
  allData?: any;
  data: FormGroup;
  metadata: Field[];
}

export interface CustomField {
  key: string;
  value: any;
  icon?: IconName;
  link?: boolean;
  prefix?: string;
  outside?: boolean;
}

const translationMap = CountryCodeLanguage;

@Component({
  standalone: true,
  selector: 'webui-form-related',
  templateUrl: './form-related.component.html',
  styleUrls: ['./form-related.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    InfoComponent,
    OverlayDropdownComponent,
    SubscriptionRequiredDirective,
    FaIconComponent,
    FormsModule,
    LoaderComponent,
    InfiniteScrollModule,
    SpinnerComponent,
    ApiTranslatePipe,
    CloseButtonComponent,
    CheckboxComponent,
    forwardRef(() => FormElementDirective),
    GenericFormComponent,
    TooltipDirective,
  ],
})
export class FormRelatedComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  private _destroy = new Subject<void>();
  private _dropdownClose = new Subject<void>();

  @ViewChild('search') search!: FormControl;
  @ViewChild('searchElement') searchElement!: ElementRef;
  @ViewChild('modal') modal!: TemplateRef<unknown>;
  @ViewChild('tableWrapper') tableWrapper: any;
  @ViewChild('messageDetail') messageDetail: any;

  @Output() override event: EventEmitter<any> = new EventEmitter();

  public override config!: Field & { key: string };
  public override group!: FormGroup;
  public errors: any;
  public message!: Record<string, any>;
  public override key: any;

  public label!: boolean;
  public viewMode?: boolean;
  public editMode: boolean;
  public saveProcess!: boolean;
  public linkPath!: string;

  public display!: string;
  public param!: string;

  public list!: any[] | null;
  public previewList!: any[] | null;
  public results: any;
  public displayValue: any;

  public lastElement = 0;
  public limit = 10;
  public count!: number | null;
  public searchValue: any;
  public fields!: string[];
  public modalData: any = {};
  public modalRef?: any;

  public modalScrollDistance = 2;
  public modalScrollThrottle = 50;
  public skipScroll = false;

  public dataOfList?: RelatedObject[];
  public formData: any = {};
  public allowPermissions!: string[];

  public replaceElements: any = [];

  public listElement!: Field;

  public skillEndpoint!: boolean;
  public customTemplate!: CustomField[];

  public autocompleteDisplay!: boolean;
  public currentQuery?: string | null;
  public currentId?: string;
  public update: Subject<void> = new Subject();
  public manual!: boolean;
  public hideDetail!: boolean;
  public currentUser!: boolean;
  public listDefaultQuery!: string;
  public disableMessage!: string;
  public fieldDisabled!: boolean;
  public placeholder!: string;
  public loading!: boolean;

  private subscriptions: Subscription[] = [];

  public colors: Record<number, string> = {
    0: '#bdbdbd',
    1: '#FA5C46',
    2: '#fc9183',
    3: '#FFA236',
    4: '#ffbf00',
    5: '#FFD042',
  };

  isClient = isClient;
  getTranslationKey = getTranslationKey;

  get canEdit() {
    return (
      this.config.templateOptions?.edit &&
      this.displayValue &&
      this.checkPermission('update')
    );
  }

  get canCreate() {
    return this.config.templateOptions?.add && this.checkPermission('post');
  }

  get canDelete() {
    return (
      this.config.templateOptions?.delete &&
      this.displayValue &&
      this.checkPermission('delete')
    );
  }

  get hasActions() {
    const { options, type, errorMessage } = this.config;

    return (
      (options || type === 'address') &&
      (this.canCreate || this.canEdit || this.canDelete) &&
      !(errorMessage && errorMessage.visible)
    );
  }

  constructor(
    private fb: FormBuilder,
    private modalService: Dialog,
    private genericFormService: GenericFormService,
    private permission: CheckPermissionService,
    private navigation: NavigationService,
    private authService: AuthService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private settingsService: SiteSettingsService,
    private sanitizer: DomSanitizer,
    private toastr: ToastService,
    private storage: LocalStorageService,
    @Optional() private timelineService: TimelineService
  ) {
    super();
    this.editMode = true;
  }

  public ngOnInit() {
    if (this.config.replaceKey) {
      this.config.key = this.config.replaceKey;
    }

    this.addControl(
      this.config,
      this.fb,
      this.config.templateOptions?.required
    );

    this.skillEndpoint =
      this.config.endpoint === '/skills/skillbaserates/' ||
      this.config.endpoint === '/pricing/pricelistrates/';

    this.display = this.config.templateOptions?.display || '{__str__}';
    this.param = this.config.templateOptions?.param || 'id';
    this.fields = this.config.templateOptions?.values || ['__str__'];
    this.viewMode = this.config.editForm && this.config.read_only;

    if (this.fields.indexOf(this.param) === -1) {
      this.fields.push(this.param);
    }

    this.getAllowPermissions();
    this.checkAutocomplete();
    this.checkFormData();
    this.setInitValue();
    this.createEvent();
    this.checkModeProperty();
    this.checkHiddenProperty();
    this.getDefaultDataForListType();
    this.checkCustomTemplate();
    this.checkIfListType();
    this.checkDelayData();
    this.checkMetadataQuery();

    if (this.config && this.config.metadata) {
      this.getReplaceElements(this.config.metadata);
    }

    this.placeholder =
      this.config.templateOptions?.placeholder ||
      (this.config.templateOptions?.edit ? 'select_or_add_new' : 'select');

    if (this.timelineService) {
      this.subscriptions.push(
        this.timelineService.buttonAction$.subscribe((action: any) => {
          if (
            action.type === 'editContact' &&
            this.config.endpoint === Endpoints.Contact &&
            !this.config.hide
          ) {
            this.open('update');
          }
        })
      );
    }
  }

  public ngAfterViewChecked() {
    if (this.search && !this.autocompleteDisplay) {
      this.autocompleteDisplay = true;
      this.search.valueChanges
        .pipe(
          skip(2),
          filter(value => value !== null),
          debounceTime(400),
          takeUntil(this._destroy)
        )
        .subscribe(() => {
          this.filter(this.searchValue);
        });
    }
  }

  public checkMetadataQuery() {
    const properties: (keyof Field)[] = [
      'metadata_query',
      'add_metadata_query',
    ];

    properties.forEach(prop => {
      this.config[prop] =
        this.config[prop] && this.parseMetadataQuery(this.config, prop);
    });
  }

  public checkDelayData() {
    if (this.config.delay) {
      this.config.data = {
        sendData: [],
      };
      this.config.delayData[this.config.endpoint as string] = this.config;
    }
  }

  public checkIfListType() {
    if (this.config && this.config.list && this.config.data) {
      const subscription = this.config.data.subscribe((data: any) => {
        this.generateDataForList(this.config, data);
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkCustomTemplate() {
    if (this.config.custom && this.config.custom.length) {
      this.generateCustomTemplate(this.config.custom);
    }
  }

  public getAllowPermissions() {
    if (!this.allowPermissions) {
      this.allowPermissions = this.permission.getAllowMethods(
        undefined,
        this.config.endpoint as string
      );
    }
  }

  public getDefaultDataForListType() {
    if (this.config.defaultData) {
      let query = '?limit=-1&';
      const format = new FormatString();
      Object.keys(this.config.defaultData).forEach(el => {
        query += `${el}=${
          format.format(this.config.defaultData[el], this.formData) || false
        }&`;
      });

      if (this.listDefaultQuery === query) {
        return;
      }

      this.listDefaultQuery = query;

      const metadata = JSON.parse(JSON.stringify(this.config.metadata));
      metadata.forEach((el: any) => {
        if (el.key) {
          el.mode = new BehaviorSubject('view');
          el.read_only = true;
          if (el.query) {
            Object.keys(el.query).forEach(param => {
              el.query[param] = format.format(el.query[param], this.formData);
            });
          }
        }
      });

      this.genericFormService
        .getByQuery(this.config.endpoint as string, query)
        .subscribe(res => {
          this.generateDataForList(<any>{ list: true, metadata }, res.results);
        });
    }
  }

  public parseMetadataQuery(data: any, field: any) {
    if (data[field] instanceof Object) {
      const keys = Object.keys(data[field]);
      const result = keys.map(query => {
        return `${query}=${data[field][query]}`;
      });
      return result.join('&');
    } else {
      return data[field];
    }
  }

  // Deprecated
  public generateCustomTemplate(fieldsList: any[]) {
    if (this.config.value) {
      this.customTemplate = fieldsList.map((el, index) => {
        const object = <CustomField>{};
        object.value = this.config.customValue[index];
        object.key = el;
        if (el.indexOf('email') > -1) {
          object.icon = 'envelope';
          object.prefix = 'mailto:';
        } else if (el.indexOf('phone_mobile') > -1) {
          object.icon = 'commenting';
          object.prefix = 'tel:';
        } else if (el.indexOf('website') > -1) {
          object.icon = 'globe';
          object.outside = true;
        } else if (el.indexOf('address') > -1) {
          object.icon = 'map-marker-alt';
        } else if (el === '__str__' || el.indexOf('contact.__str__') > -1) {
          object.link = true;
        }
        return object;
      });
    } else {
      this.customTemplate = [];
    }
  }

  public checkHiddenProperty() {
    if (this.config && this.config.hidden) {
      const subscription = this.config.hidden.subscribe(hide => {
        if (hide && !this.config.hide) {
          this.displayValue = null;
          this.group.get(this.key)?.patchValue('');
          this.setInitValue();
          this.eventHandler(
            { type: 'reset' },
            this.group.get(this.key)?.value,
            this.resetAdditionalData()
          );
        }
        this.config.hide = hide;

        if (!(<any>this.cd).destroyed) {
          this.cd.detectChanges();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkModeProperty() {
    if (this.config && this.config.mode) {
      this.config.mode.subscribe(mode => {
        if (mode === 'view') {
          this.viewMode = true;
          this.editMode = false;

          this.group.get(this.key)?.patchValue('');
          this.displayValue = undefined;

          this.autocompleteDisplay = false;
          this.setInitValue();
          this.eventHandler(
            { type: 'change' },
            this.group.get(this.key)?.value,
            this.resetAdditionalData()
          );
        } else if (mode === 'edit') {
          this.viewMode = this.config.read_only || false;
          this.editMode = true;
          this.setInitValue();
        }
      });
    }
  }

  public resetAdditionalData() {
    const res: Record<string, any> = {};
    if (this.group.get(this.key)?.value === '') {
      if (this.fields) {
        this.fields.forEach(el => (res[el] = null));
      }
    }
    return res;
  }

  public checkFormData() {
    if (this.config.formData) {
      const subscription = this.config.formData.subscribe(formData => {
        if (
          this.config.updated &&
          !this.config.updated.includes(formData.key)
        ) {
          return;
        }

        this.formData = formData.data;
        if (this.config.key !== formData.key) {
          const disableData = this.isDisabled(this.formData);
          this.fieldDisabled = disableData.disable;
          this.disableMessage = disableData.messages.join(' ');

          if (this.config.errorMessage) {
            if (
              !this.getValueByKey(this.config.errorMessage.field, this.formData)
            ) {
              this.config.errorMessage.visible = true;
            } else {
              this.config.errorMessage.visible = false;
            }
          }

          if (this.config.default instanceof Object) {
            if (
              this.config.default.useIf &&
              this.checkExistKey(this.config.default.useIf, formData.key)
            ) {
              if (this.config.default.manual) {
                if (!formData.manual) {
                  return;
                }
              }
              const result = this.checkShowRules(
                this.config.default.useIf,
                formData.data
              );

              if (result) {
                this.getOptions.call(
                  this,
                  '',
                  0,
                  false,
                  this.setValue,
                  '',
                  this.config.default.query,
                  this.config.default.only
                );
              }
            }
          }

          if (
            this.checkRelatedField(formData.key, formData.data) ||
            (this.config.default &&
              this.config.default.includes &&
              !this.config.default.includes('session') &&
              !(formData.reset && formData.reset.indexOf(this.config.key) > -1))
          ) {
            if (this.config.defaultData) {
              this.getDefaultDataForListType();
            }

            if (this.checkIfMasterCompany(this.formData)) {
              if (this.config.if_master) {
                if (this.config.if_master.includes('session')) {
                  const id = this.userService.user?.data.contact.contact_id;

                  if (this.config.read_only) {
                    this.viewMode = true;
                  }

                  if (!this.config.hide) {
                    this.getOptions.call(this, '', 0, false, this.setValue, id);
                  }
                } else {
                  const format = new FormatString();
                  let id: any;
                  if (typeof this.config.if_master === 'string') {
                    id = format.format(this.config.if_master, this.formData);
                  } else if (Array.isArray(this.config.if_master)) {
                    this.config.if_master.forEach(el => {
                      if (!id) {
                        id = format.format(el, this.formData);
                      }
                    });
                  }
                  if (id && id !== this.group.get(this.key)?.value) {
                    this.getOptions.call(this, '', 0, false, this.setValue, id);
                    if (this.config.read_only) {
                      this.viewMode = true;
                    }
                  }
                }
              }
            }

            if (
              this.config.default &&
              !this.config.hide &&
              !this.config.value
            ) {
              const format = new FormatString();
              let id: any;
              if (typeof this.config.default === 'string') {
                if (this.config.default === 'industry.default') {
                  if (this.formData.regular_company) {
                    const { industries } = this.formData.regular_company;

                    if (industries) {
                      const industry = industries.find((el: any) => el.default);

                      if (industry) {
                        id = industry.id;
                      }
                    }
                  }
                } else {
                  id = format.format(this.config.default, this.formData);
                }
              } else if (Array.isArray(this.config.default)) {
                this.config.default.forEach(el => {
                  if (!id) {
                    id = format.format(el, this.formData);
                  }
                });
              }
              if (id && id !== this.group.get(this.key)?.value) {
                this.getOptions.call(this, '', 0, false, this.setValue, id);
                if (this.config.read_only) {
                  this.viewMode = true;
                }
              }
            }
          }

          if (formData.reset && formData.reset.indexOf(this.config.key) > -1) {
            if (this.group.get(this.key)?.value) {
              this.displayValue = '';
              this.group.get(this.key)?.patchValue('');
              this.eventHandler(
                { type: 'reset' },
                this.group.get(this.key)?.value,
                this.resetAdditionalData()
              );
            }
          }
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkIfMasterCompany(data: any) {
    const customerCompany = data.customer_company;
    const providerCompany = data.provider_company;

    if (customerCompany && providerCompany && !this.config.editForm) {
      return customerCompany.id === providerCompany.id;
    }

    return;
  }

  public checkAutocomplete() {
    if (this.config.autocompleteData) {
      const subscription = this.config.autocompleteData.subscribe(data => {
        const key = this.propertyMatches(
          Object.keys(data),
          this.config.key as string
        );
        if (key) {
          this.hideDetail = true;
          this.viewMode = true;
          this.currentQuery = undefined;
          this.getOptions.call(this, '', 0, false, this.setValue, data[key]);
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public propertyMatches(keys: string[], key: string): string | undefined {
    return keys.find(el => key.includes(el));
  }

  public getLinkPath(endpoint: string): string {
    const contactPage: Page = {
      url: '/core/contacts/',
      endpoint: '/core/contacts/',
      children: [],
      name: 'Contacts',
      __str__: 'Contacts',
      translateKey: '/core/contacts/',
    };

    const result = [...this.navigation.linksList, contactPage].find(
      page => page.url === endpoint
    )?.url;

    return getUrlPrefix() + result;
  }

  public setInitValue() {
    const formatString = new FormatString();
    this.results = [];
    if (this.config.value || this.group.get(this.key)?.value) {
      const data = this.config.value
        ? this.config.value
        : this.group.get(this.key)?.value;
      if (!this.config.many) {
        let value;
        if (data instanceof Object) {
          if (this.config.options && this.config.options.length) {
            const obj = this.config.options.find(
              el => el[this.param] === data[this.param]
            );
            if (obj) {
              const path = this.getLinkPath(this.config.endpoint as string);
              if (path) {
                this.linkPath =
                  location.origin + path + data[this.param] + '/change';
              } else {
                this.linkPath = '/';
              }
              this.displayValue = formatString.format(this.display, obj);
            }
          } else {
            const path = this.getLinkPath(this.config.endpoint as string);
            if (path) {
              this.linkPath =
                location.origin + path + data[this.param] + '/change';
            } else {
              this.linkPath = '/';
            }

            const { country_code } = this.settingsService.settings;
            const lang = this.storage.retrieve('lang');

            data.__str__ = checkAndReturnTranslation(data, country_code, lang);
            this.displayValue = formatString.format(this.display, data);
          }
          value = data[this.param];
        } else {
          value = data;
          if (this.config.options && this.config.options.length) {
            const obj = this.config.options.find(el => el[this.param] === data);
            if (obj) {
              const path = this.getLinkPath(this.config.endpoint as string);
              if (path) {
                this.linkPath = location.origin + path + value + '/change';
              } else {
                this.linkPath = '/';
              }
              this.displayValue = formatString.format(this.display, obj);
            }
          } else {
            this.getOptions.call(this, '', 0, false, this.setValue, data);
          }
        }
        this.group.get(this.key)?.patchValue(value);
      } else {
        if (this.config.options && this.config.options.length) {
          const results: any[] = [];
          this.config.options.forEach(el => {
            this.parseOption(el);
            el.checked = false;
            data.forEach((elem: any) => {
              if (elem instanceof Object) {
                if (elem.translations) {
                  const trans = elem.translations.find(
                    (el: any) =>
                      el.language.id ===
                      translationMap[this.settingsService.settings.country_code]
                  );

                  if (trans) {
                    elem.__str__ = trans.value;
                  }
                }

                const param = this.config.relatedObjects
                  ? this.config.relatedObjects.field + '.id'
                  : this.param;
                const elemValue = { value: '' };
                this.getValueOfData(elem, param, elemValue);

                if (elemValue.value === el[this.param]) {
                  el.checked = true;
                  results.push(el);
                }
              } else {
                if (elem === el[this.param]) {
                  el.checked = true;
                  results.push(el);
                }
              }
            });
            this.results = [...results];
          });
          this.config.options.sort((p, n) => (p.__str__ > n.__str__ ? 1 : -1));
        } else {
          this.results =
            data && data !== '-'
              ? data.map((el: any) => {
                  if (el.industry && el.industry.translations) {
                    el.translations = el.industry.translations;
                  }

                  if (el.__str__) {
                    el.__str__ = formatString.format(this.display, el);
                  }
                  return el;
                })
              : [];
        }
        this.updateData();
      }
    } else if (
      this.config.default &&
      this.config.default.includes &&
      this.config.default.includes('session') &&
      !this.config.editForm
    ) {
      const id = FormatString.format(this.config.default, {
        session: this.userService.user?.data,
      });

      if (this.config.read_only) {
        this.viewMode = true;
      }

      if (!this.config.hide) {
        this.getOptions.call(this, '', 0, false, this.setValue, id);
      }
    } else if (
      this.config.default &&
      this.config.default.includes &&
      (this.config.default?.includes('company_id') ||
        this.config.default?.includes('client_contact_id')) &&
      !this.config.editForm
    ) {
      const formatString = new FormatString();
      const id = formatString.format(
        this.config.default,
        this.userService.user?.currentRole as any
      );

      if (this.config.read_only) {
        this.viewMode = true;
      }

      this.group.get(this.key)?.patchValue(id);
      this.getOptions.call(this, '', 0, false, this.setValue, id);
    } else if (
      this.config.default &&
      this.config.default.includes &&
      this.config.default.includes('currentCompany')
    ) {
      const id = this.settingsService.settings.company;

      this.group.get(this.key)?.patchValue(id);
    } else if (
      typeof this.config.default === 'string' &&
      this.config.default?.includes('client_contact_id')
    ) {
      const id = this.userService.user?.currentRole.client_contact_id;

      this.group.get(this.key)?.patchValue(id);
    } else {
      this.parseOptions();
    }

    this.generateDataForList(this.config, this.config.value);
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this._destroy.next();
    this._destroy.complete();
    this._dropdownClose.next();
    this._dropdownClose.complete();

    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public parseOptions() {
    if (this.config.options && this.config.options.length) {
      const formatString = new FormatString();
      this.config.options.forEach(el => {
        el.__str__ = formatString.format(this.display, el);
      });
      this.config.options.sort((p, n) => (p.__str__ > n.__str__ ? 1 : -1));
    }
  }

  public getReplaceElements(metadata: Field[]): void {
    metadata.forEach(el => {
      if (el.type === 'replace') {
        this.replaceElements.push(el);
      } else if (el.children) {
        this.getReplaceElements(el.children);
      }
    });
  }

  public generateDataForList(config: Field, data?: any): void {
    if (config.list && config.metadata) {
      this.prefilledAttributes();
      this.dataOfList = [];
      const value = [];
      if (data) {
        data.forEach((el: any) => {
          const object = this.createObject(config.metadata);
          Object.assign(object, { id: el.id, el });
          this.fillingForm(object.metadata, el);
          object.data = this.fb.group({});
          value.push(object.data.value);
          this.dataOfList?.push(object);
        });

        if (data.length == 0) {
          this.addObject();
        }
        this.group.get(this.key)?.patchValue(data);
      }
    }
  }

  public prefilledAttributes() {
    if (this.config && this.config.metadata) {
      this.config.metadata.forEach(el => {
        if (el && el.attributes) {
          const formatString = new FormatString();

          for (const prop in el.attributes) {
            if (el.templateOptions) {
              el.templateOptions[prop as keyof ITemplateOptions] =
                formatString.format(
                  el.attributes[prop as keyof ITemplateOptions],
                  this.formData
                );
            }
          }
        }
      });
    }
  }

  public createObject(
    metadata: Field[] | undefined = this.config.metadata,
    value?: any
  ) {
    const object: RelatedObject = {
      id: undefined,
      allData: undefined,
      data: this.fb.group({}),
      metadata: <Field[]>[],
    };
    const format = new FormatString();
    const formData = new BehaviorSubject({ data: {} });
    object.metadata = metadata
      ? metadata.map(el => {
          const element = { ...el, formData };
          element.mode = el.mode;

          if (el.endpoint) {
            el.endpoint = format.format(el.endpoint, this.formData);
          }

          if (el.query) {
            const newQuery: Record<string, any> = {};
            Object.keys(el.query).forEach(query => {
              if (typeof el.query[query] == 'string') {
                newQuery[query] = format.format(el.query[query], this.formData);
              } else {
                newQuery[query] = el.query[query];
              }
            });

            element.query = newQuery;
          }

          if (el.prefilled) {
            const newPrefilled: Record<string, any> = {};
            Object.keys(el.prefilled).forEach(field => {
              newPrefilled[field] = format.format(
                el.prefilled[field],
                this.formData
              );
            });

            element.prefilled = newPrefilled;
          }

          if (
            !el.value &&
            typeof el.default === 'string' &&
            this.dataOfList?.length === 0
          ) {
            element.value = format.format(el.default, this.formData);
          }

          return element;
        })
      : [];

    if (value) {
      this.fillingForm(object.metadata, value);
    }

    return object;
  }

  public addObject(value?: any) {
    this.dataOfList?.push(this.createObject(this.config.metadata, value));
  }

  public addAllObjects() {
    if (!this.config.addAll) {
      return;
    }

    const { endpoint, query, property, properties } = this.config.addAll;
    const newQuery: QueryObject = {};

    if (query) {
      forEach((el: string) => {
        const value = query[el];
        newQuery[el] =
          typeof value === 'string'
            ? FormatString.format(value, this.formData)
            : value;
      }, keys(query));
    }

    this.genericFormService.get(endpoint, newQuery).subscribe(response => {
      const existIds = this.dataOfList?.map(
        (el: any) => el.data.value[property].id
      );
      const { country_code } = this.settingsService.settings;
      const lang = this.storage.retrieve('lang');

      if (response.count > 0) {
        response.results.forEach((el: any) => {
          if (existIds?.includes(el.id)) {
            return;
          }

          if (properties) {
            Object.keys(properties).forEach(key => {
              el[key] = FormatString.format(properties[key], el);
            });
          }

          el.__str__ = checkAndReturnTranslation(el, country_code, lang);

          this.addObject({ ...el, [property]: el });
        });
      }
    });
  }

  public deleteObject(object: RelatedObject): void {
    const id = object.id;

    if (id) {
      this.genericFormService
        .delete(this.config.endpoint as string, id)
        .pipe(
          catchError(error => {
            this.toastr.sendMessage(error.errors.join(' '), MessageType.Error);

            throw error;
          })
        )
        .subscribe(() => {
          const index = this.dataOfList?.indexOf(object);

          if (index && index !== -1) {
            this.removeItem(index);
          }
        });
    }
  }

  public editObject(object: RelatedObject): void {
    if (object.id) {
      this.open('update', object);
    }
  }

  public setAsDefault(object: RelatedObject): void {
    if (object.id) {
      const endpoint = `${this.config.endpoint}${object.id}/`;
      const body = {
        default_rate: true,
        skill: object.allData.skill.id,
      };
      this.genericFormService
        .editForm(endpoint, body)
        .subscribe(() => this.updateList());
    }
  }

  public updateValue(e?: any): void {
    if (!e) {
      return;
    }

    const { el, type } = e;
    const eventTypes = ['change', 'create', 'blur'];

    if (el?.formData) {
      if (
        eventTypes.includes(type) &&
        el.key &&
        (el.key !== 'address' || el.updateFormData)
      ) {
        el.formData.next({
          key: el.key,
          data: this.generateData(el.key, el.formData.getValue().data, e),
          reset: e.manual && el.reset,
          manual: e.manual,
        });
      }

      this.cd.markForCheck();
    }

    this.group.get(this.key)?.patchValue(this.getListValue());
  }

  public getListValue() {
    const value = this.dataOfList
      ?.filter((el: any) => el.data.valid)
      .map((el: any) => {
        const object = el.data.value;

        if (el.id) {
          object.id = el.id;
        }
        return object;
      });

    if (this.config.delayData) {
      this.config.data.sendData = value?.filter((el: any) => !el.id);
    }

    const newValue = value?.filter((el: any) => {
      if (el.language) {
        if (el.language.id) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    });

    return newValue;
  }

  public generateData(
    key: string,
    data: Record<string, any> = {},
    event: CustomEvent
  ): any {
    const keys = key.split('.');
    const firstKey: string = keys.shift() as string;

    if (keys.length === 0) {
      if (event.el.type === 'related' && firstKey !== 'id') {
        if (data[firstKey]) {
          data[firstKey] = {
            ...data[firstKey],
            ...event.additionalData,
          };
        } else {
          data[firstKey] = {
            id: event.value,
            ...event.additionalData,
          };
        }
      } else {
        data[firstKey] = event.value;
      }
    } else {
      if (data[firstKey]) {
        this.generateData(keys.join('.'), data[firstKey], event);
      } else {
        data[firstKey] = {};
        this.generateData(keys.join('.'), data[firstKey], event);
      }
    }

    return data;
  }

  public fillingForm(metadata: Field[], data: any): void {
    metadata.forEach(el => {
      if (el.key) {
        this.getValueOfData(data, el.key, el);
      } else if (el.children) {
        this.fillingForm(el.children, data);
      }
    });
  }

  public getValueOfData(data: any, key: string, obj: Field): void {
    const keys = key.split('.');
    const prop: string = keys.shift() as string;
    if (keys.length === 0) {
      if (data) {
        obj['value'] = data[key];
        if (obj.type === 'related') {
          if (obj.value && obj.value instanceof Object) {
            if (obj.value.id && obj.value.__str__) {
              obj.options = [obj.value];
            }
          }
        }
      }
    } else {
      if (data[prop]) {
        this.getValueOfData(data[prop], keys.join('.'), obj);
      }
    }
  }

  public onModalScrollDown(): void {
    if (
      !this.skipScroll &&
      this.previewList &&
      this.previewList.length !== this.count
    ) {
      this.skipScroll = true;
      this.generateList(this.searchValue, true);
    }
  }

  public deleteElement(): void {
    this.modalRef?.close();
    this.event.emit({
      type: 'delete',
      endpoint: this.modalData.endpoint,
      id: this.modalData.id,
      el: this.config,
    });
    this.group.get(this.key)?.patchValue('');
    delete this.config.value;
    this.displayValue = null;
  }

  public open(type: 'post' | 'update' | 'delete', object?: any, event?: any) {
    if (isClient() && type !== 'post') {
      if (event) {
        event.preventDefault();
      }

      return;
    }

    this.currentUser = false;

    if (this.hideDetail) {
      return false;
    }

    const format = new FormatString();

    if (type === 'update' && !this.config.templateOptions?.edit) {
      return false;
    }

    if (
      !this.checkPermission(type) &&
      (this.config.addEndpoint || this.config.endpoint)
    ) {
      return;
    }
    this.modalData = {};
    this.modalData.type = type;
    this.modalData.title = this.config.templateOptions?.label;
    if (object && object.endpoint) {
      const parts = object.endpoint.split('/');
      parts.pop();
      object[this.param] = parts.pop();
      this.modalData.endpoint = Array.from([...parts, '']).join('/');
    } else {
      let endpoint;
      if (this.config.editEndpoint) {
        endpoint = format.format(this.config.editEndpoint, this.formData);
      }
      if (this.config.addEndpoint) {
        endpoint = format.format(this.config.addEndpoint, this.formData);
      }

      this.modalData.endpoint = endpoint || this.config.endpoint;
    }
    if (type === 'update' || type === 'delete') {
      if (object) {
        this.modalData.title = object.allData
          ? object.allData.__str__
          : object.__str__;
        this.modalData.id = object[this.param];
        this.modalData.needData = true;
        if (this.modalData.endpoint === Endpoints.Timesheet) {
          this.modalData.title = '';
        }
      } else {
        this.modalData.title =
          this.config.templateOptions?.editLabel || this.displayValue;
        const description = this.config.templateOptions?.editDescription
          ? format.format(
              this.config.templateOptions.editDescription,
              this.formData
            )
          : '';

        if (description) {
          this.modalData.description =
            this.sanitizer.bypassSecurityTrustHtml(description);
          this.currentUser =
            this.formData['id'] === this.userService.user?.data.user;
        }
        this.modalData.id =
          !this.config.editEndpoint && this.group.get(this.key)?.value;

        if (this.modalData.id instanceof Object) {
          this.modalData.id = this.modalData.id.id;
        }

        this.modalData.needData = this.config.editEndpoint ? false : true;
        this.modalData.edit = this.config.editEndpoint && true;
      }
      if (type === 'update') {
        this.modalData.mode = 'edit';
      }
    }
    if (this.config.prefilled) {
      this.modalData.data = {};
      const keys = Object.keys(this.config.prefilled);
      keys.forEach(el => {
        this.modalData.data[el] = {
          action: 'add',
          data: {
            value: this.config.list
              ? this.config.prefilled[el]
              : format.format(this.config.prefilled[el], this.formData),
            read_only: true,
            isPrefilled: true,
            editForm: true,
          },
        };
      });
    }

    if (this.modalData.endpoint === Endpoints.SmsMessages) {
      const messageType = (object && object.type) || this.config.metadata_query;
      const newModal = Object.assign(this.modalData, {
        label: messageType.toLowerCase().includes('sent')
          ? 'message.sent-message'
          : 'message.received-message',
        mode: 'view',
        edit: true,
        metadataQuery: messageType.toLowerCase(),
      });

      if (this.config.strField) {
        newModal.label = '';
      }

      this.modalRef = this.modalService.open(
        this.messageDetail,
        dialogConfig({
          size: 'lg',
          windowClass: 'message-detail',
        })
      );

      return false;
    }

    let windowClass = '';
    if (this.config.smallModal && type === 'post') {
      windowClass = 'small-modal';
    }

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({
        size: windowClass === 'small-modal' || type === 'delete' ? 'sm' : 'lg',
        windowClass,
      })
    );

    return false;
  }

  public changeLabel(data: { str: string; data: any }) {
    if (this.config.strField) {
      const type = data.data[this.config.strField].toLowerCase();

      this.modalData.label = type.includes('sent')
        ? 'message.sent-message'
        : 'message.received-message';
    }
  }

  public openAutocomplete(): void {
    if (
      this.config.type !== 'address' &&
      !this.config.doNotChoice &&
      !this.fieldDisabled
    ) {
      this.searchValue = null;
      this.count = 0;
      this.lastElement = 0;
      this.generateList(this.searchValue);
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 50);
    }
  }

  public generateList(value?: any, concat = false): void {
    if (!this.config.doNotChoice) {
      this.currentQuery = null;
      if (this.config.useOptions) {
        if (this.searchValue) {
          this.filter(this.searchValue);
        } else {
          this.list = this.config.options as any[];
          this.generatePreviewList(this.list);
        }
      } else {
        this.loading = !this.skipScroll && true;
        this.getOptions(value, this.lastElement, concat);
      }
    }
  }

  public generatePreviewList(list: any[]) {
    if (this.config.options) {
      this.previewList = list;
      return;
    }

    this.lastElement += this.limit;
    this.previewList = list ? list.slice(0, this.lastElement) : [];
  }

  public resetList() {
    setTimeout(() => {
      this.searchValue = null;
      this.list = null;
      this.previewList = null;
      this.lastElement = 0;
      this.count = null;
      this.skipScroll = false;
      this.loading = false;
      this._dropdownClose.next();
    }, 150);
  }

  public filter(value: any) {
    this.lastElement = 0;
    this.count = null;
    this.previewList = null;
    if (this.config.useOptions) {
      let filteredList;
      if (value && this.config.options) {
        filteredList = this.config.options.filter((el: any) => {
          const val = el.__str__;
          if (val) {
            return val.toLowerCase().indexOf(value.toLowerCase()) > -1;
          }
          return false;
        });
        this.list = filteredList;
        this.generatePreviewList(this.list);
      } else {
        this.generatePreviewList(this.config.options as any[]);
      }
    } else {
      this.generateList(value);
    }
  }

  public setValue(item: any, manual?: boolean, update?: boolean) {
    let updated = false;

    if (this.config.relatedData) {
      const data = this.config.relatedData.find(
        (el: any) => !!el[item[this.param]]
      );
      const mapedData: Record<string, any> = {};

      if (data) {
        const relatedData: any[] = data[item[this.param]];
        relatedData.forEach((el, i) => {
          const key = this.config.relatedDataMap[i];
          mapedData[key] = el;
        });
      }
      item.relatedData = mapedData;
    }

    if (item) {
      if (this.config.many) {
        updated = this.updateValueOfManyType(item);
      } else {
        updated = this.updateValueOfSingleType(item, update);
      }
    } else {
      updated = this.resetValue();
    }

    if (updated || update) {
      this.eventHandler(
        { type: 'change' },
        item && item[this.param],
        item,
        manual
      );
    }

    if (updated) {
      this.changeList();
    }
    // if (!this.config.useOptions) {
    //   this.searchValue = null;
    //   this.list = null;
    //   this.count = null;
    //   this.previewList = null;
    //   this.lastElement = 0;
    // }
    this.count = null;

    if (!(<any>this.cd).destroyed) {
      this.cd.detectChanges();
    }
  }

  public resetValue(): boolean {
    this.displayValue = '';
    this.group.get(this.key)?.patchValue('');

    return true;
  }

  public updateValueOfSingleType(item: any, update?: boolean): boolean {
    if (item[this.param] !== this.group.get(this.key)?.value || update) {
      const formatString = new FormatString();

      this.displayValue = formatString.format(this.display, item);
      this.group.get(this.key)?.patchValue(item[this.param]);

      if (!(<any>this.cd).destroyed) {
        this.cd.markForCheck();
      }

      return true;
    }

    return false;
  }

  public updateValueOfManyType(item: any): boolean {
    if (this.config.useOptions) {
      if (item.checked) {
        this.results.push(item);
      } else {
        this.results.splice(this.results.indexOf(item), 1);
      }
    } else {
      if (this.key === 'industries_objects') {
        item.default = !this.results.length;
      }

      if (this.results.includes(item)) {
        return false;
      }

      item.tests = this.addTests(item);
      this.results.push(item);
    }

    this.updateData();

    return true;
  }

  public addTests(item: any) {
    if (this.config.tests) {
      const testsMap: Record<string, any> = {
        skill: 'acceptance_tests_skills',
        tag: 'acceptance_tests_tags',
      };

      return this.config.tests.filter(test => {
        const list = test[testsMap[this.config.key as string]];

        if (!list.length) {
          return false;
        }

        return list.some(
          (el: any) => el[this.config.key as string].id === item.id
        );
      });
    }

    return;
  }

  public passTests(item: any, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.event.emit({
      type: 'test',
      item,
    });
  }

  public deleteItem(index: number, item: any, api?: boolean) {
    if (api || this.config.send === false) {
      this.genericFormService
        .delete(
          this.config.endpoint as string,
          item[this.param],
          this.config.send !== false ? 'delete' : ''
        )
        .subscribe(() => {
          if (this.results[index]) {
            this.results.splice(index, 1);
            this.config.value.splice(index, 1);
            this.changeList();
          }
        });
    } else {
      if (this.results[index]) {
        if (this.config.options) {
          const val = this.config.options.find(
            el => el[this.param] === this.results[index][this.param]
          );
          if (val) {
            val.checked = false;
          }
        }
        this.results.splice(index, 1);
        this.changeList();
        this.updateData();
      }
    }
  }

  public setDefault(_: any, item: any) {
    this.results.forEach((el: any) => {
      el.default = false;
      if (el === item) {
        el.default = true;
      }
    });
    this.updateData();
  }

  public eventHandler(
    e: any,
    value: any,
    additionalData?: any,
    manual?: boolean
  ) {
    this.event.emit({
      type: e.type,
      el: this.config,
      value,
      additionalData,
      manual,
    });
  }

  public changeList() {
    this.event.emit({
      list: this.results,
      el: this.config,
      type: 'chenge',
    });
  }

  public updateData() {
    const results = this.results.map((el: any) => {
      if (this.config.sendData) {
        const result: Record<string, any> = {};

        this.config.sendData.forEach(key => (result[key] = el[key]));
        return {
          [this.param]: el[this.param],
          ...result,
        };
      }
      return el[this.param];
    });
    this.group.get(this.key)?.patchValue(results);
  }

  public formEvent(e: any) {
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }
    if (e.type === 'sendForm' && e.status === 'success' && !this.config.list) {
      this.modalRef?.close();
      this.saveProcess = false;

      if (this.modalData.description && this.currentUser) {
        this.authService.logout();
      }

      if (this.timelineService) {
        this.timelineService.emit(TimelineAction.Update);
      }

      const formatString = new FormatString();
      if (this.config.many) {
        e.data.__str__ = formatString.format(this.display, e.data);
        this.setValue(e.data);
        if (!this.config.useOptions) {
          if (!this.config.value) {
            this.config.value = [e.data];
          } else {
            this.config.value.push(e.data);
          }
        }
        return;
      }

      if (this.modalData.endpoint !== this.config.addEndpoint) {
        this.group
          .get(this.key)
          ?.patchValue(
            this.config.useValue
              ? this.config.value[this.param]
              : e.data[this.param]
          );
        this.config.value = this.config.useValue
          ? this.config.value
          : e.data[this.param];
        this.displayValue = this.config.useValue
          ? formatString.format(this.display, this.config.value)
          : formatString.format(this.display, e.data);
        this.eventHandler({ type: 'change' }, e.data[this.param], e.data);

        if (this.config.candidateForm) {
          this.eventHandler(
            { type: 'patchAddress' },
            this.group.get(this.key)?.value
          );
        }
      }
    } else if (
      e.type === 'sendForm' &&
      e.status === 'success' &&
      this.config.list
    ) {
      this.modalRef?.close();
      this.saveProcess = false;
      this.updateList(e.data);
    }
  }

  public formError() {
    this.saveProcess = false;
  }

  public updateList(data?: any) {
    const object = this.dataOfList?.find((el: any) => el.id === data.id);

    if (object) {
      const newMetadata = object.metadata.slice();
      this.fillingForm(newMetadata, data);
      object.metadata = newMetadata;

      if (!(<any>this.cd).destroyed) {
        this.cd.detectChanges();
      }
    }

    const newList = this.dataOfList?.slice();

    this.dataOfList = undefined;

    setTimeout(() => {
      this.dataOfList = newList;
    }, 500);

    this.event.emit({
      type: 'updateData',
      el: this.config,
    });
  }

  public generateFields(fields?: string[]) {
    let query = '&';
    if (fields) {
      fields.forEach(el => {
        query += `fields=${el}&`;
      });
      query = query.slice(0, query.length - 1);
    } else {
      query = `&fields=__str__&fields=${this.param}`;
    }
    return query;
  }

  public removeItem(index: number) {
    if (this.dataOfList) {
      this.dataOfList = remove(index, 1, this.dataOfList);

      this.group.get(this.key)?.patchValue(this.getListValue());
    }
  }

  public generateQuery(queries: Record<string, any>) {
    const format = new FormatString();
    let query = '&';
    if (queries) {
      const keys = Object.keys(queries);
      const parsedKeys: Map<string, any> = new Map();

      keys.forEach(key => {
        const value =
          typeof queries[key] === 'string'
            ? queries[key] === 'currentCompany'
              ? this.settingsService.settings.company
              : format.format(queries[key], this.formData)
            : this.parseQueryValue(queries[key]);

        if (!['', undefined, null].includes(value)) {
          parsedKeys.set(key, value);
        }
      });

      query += Array.from(parsedKeys.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    }
    return query.length > 1 ? query : '';
  }

  public parseQueryValue(value: string | string[]) {
    const format = new FormatString();
    let result = '';
    if (Array.isArray(value)) {
      value.forEach(el => {
        if (result) {
          return;
        }

        result = format.format(el, this.formData);
      });
    } else {
      result = value;
    }
    return result;
  }

  public getOptions(
    value: any,
    offset: number,
    concat = false,
    callback?: (item: any, manual?: boolean, update?: boolean) => void,
    id?: string,
    customQuery?: any,
    only?: boolean
  ) {
    const format = new FormatString();

    const endpoint = format.format(
      this.config.endpoint as string,
      this.formData
    );
    if (endpoint) {
      let query = '';
      if (value) {
        query += `?${this.config.searchParam || 'search'}=${value}&`;
      }
      query += !query ? '?' : '';
      query += `limit=${this.limit}&offset=${offset}`;
      if (!this.config.templateOptions?.dontSendFields) {
        query += this.generateFields(this.fields);
      }
      query += this.generateQuery(this.config.query);
      if (customQuery) {
        query += this.generateQuery(customQuery);
      }
      if (
        (query !== this.currentQuery || id !== this.currentId) &&
        (!this.count || (this.count && offset < this.count && concat))
      ) {
        this.lastElement += this.limit;
        this.currentQuery = query;
        this.currentId = id;
        this.cd.detectChanges();
        if (!id) {
          this.genericFormService
            .getByQuery(endpoint, query)
            .pipe(
              takeUntil(
                merge(
                  // Find another solution
                  this.search?.valueChanges.pipe(skip(1)),
                  this._dropdownClose
                )
              )
            )
            .subscribe((res: any) => {
              this.loading = false;
              this.skipScroll = false;
              this.count = res.count;
              if (res.results && res.results.length) {
                let results = [...res.results];

                if (this.config.unique) {
                  results = this.filterUniqueValue(res.results, this.results);
                }

                results.forEach(el => this.parseOption(el));

                if (this.config.options) {
                  this.config.options = [
                    ...this.config.options,
                    ...results.filter(
                      element =>
                        !this.config.options?.find(
                          option => option.id === element.id
                        )
                    ),
                  ];
                } else {
                  this.config.options = [...results];
                }

                if (concat && this.previewList) {
                  this.previewList.push(...results);
                } else {
                  this.previewList = results;
                }
              }
              if (res && res.length) {
                this.count = res.length;
                const formatString = new FormatString();

                if (this.config.unique) {
                  res = this.filterUniqueValue(res, this.results);
                }
                res.forEach((el: any) => {
                  el.__str__ = formatString.format(this.display, el);
                });
                if (concat && this.previewList) {
                  this.previewList.push(...res);
                } else {
                  this.previewList = res;
                }
              }

              if (!this.previewList) {
                this.previewList = [];
              }

              if (callback) {
                let canSetValue;

                if (only) {
                  if (res.results.length === only) {
                    canSetValue = true;
                  } else if (
                    only > res.results.length ||
                    only < res.results.length
                  ) {
                    this.count = null;
                    this.clearField();
                  }
                } else if (!only) {
                  canSetValue = true;
                }

                if (canSetValue) {
                  const target = res.results.find((el: any) => el.id === id);

                  const item = target || res.results[0];

                  if (item) {
                    const path = this.getLinkPath(
                      this.config.endpoint as string
                    );
                    if (path) {
                      this.linkPath =
                        location.origin + path + item[this.param] + '/change';
                    } else {
                      this.linkPath = '/';
                    }

                    callback.call(this, item);
                  }
                }
              }
              this.updatePosition();
              this.cd.detectChanges();
            });
        } else {
          this.genericFormService
            .getByQuery(
              endpoint + id + '/',
              `?${this.generateFields(this.fields)}`
            )
            .subscribe((res: any) => {
              this.loading = false;
              this.lastElement = 0;
              const { country_code } = this.settingsService.settings;
              const lang = this.storage.retrieve('lang');
              if (res) {
                res.__str__ = checkAndReturnTranslation(
                  res,
                  country_code,
                  lang
                );

                setPropValue(
                  this.display.replace('{', '').replace('}', ''),
                  res,
                  res.__str__
                );

                const path = this.getLinkPath(this.config.endpoint as any);
                if (path) {
                  this.linkPath =
                    location.origin + path + res[this.param] + '/change';
                } else {
                  this.linkPath = '/';
                }

                callback?.call(this, res, false, true);
              }
              this.cd.detectChanges();
            });
        }
      }
    }
  }

  public checkPermission(type: string): boolean {
    return this.allowPermissions?.indexOf(type) > -1;
  }

  public checkRelatedField(key: string, data: any): boolean {
    let result;
    if (this.config.showIf && this.checkExistKey(this.config.showIf, key)) {
      result = this.checkShowRules(this.config.showIf, data);
    }
    return result || false;
  }

  public checkExistKey(rules: any[], key: string) {
    let result = false;
    rules.forEach(rule => {
      if (rule instanceof Object) {
        const keys = Object.keys(rule);
        result = result || keys.indexOf(key) > -1;
      } else {
        result = result || rule.indexOf(key) > -1;
      }
    });
    return result;
  }

  public checkShowRules(rule: any[], data: any): boolean {
    let approvedRules = 0;
    const rulesNumber = rule.length;

    rule.forEach((el: any) => {
      if (typeof el === 'string') {
        const value = this.getValueByKey(el, data);

        if (value && value !== '0') {
          approvedRules += 1;
        } else {
          return;
        }
      } else if (el instanceof Object) {
        const key = Object.keys(el)[0];
        const targetValue = el[key];
        const value = this.getValueByKey(key, data);

        if (value === targetValue) {
          approvedRules += 1;
        } else {
          return;
        }
      }
    });

    return approvedRules === rulesNumber;
  }

  public getValueByKey(key: string, data: any): any {
    const keysArray = key.split('.');
    const firstKey: string = keysArray.shift() as string;
    if (keysArray.length === 0) {
      return data && data[firstKey];
    } else if (keysArray.length > 0) {
      const combineKeys = keysArray.join('.');
      return this.getValueByKey(combineKeys, data[firstKey]);
    }
  }

  public trackByFn(value: any) {
    return value[this.param];
  }

  public isArray(target: any) {
    return Array.isArray(target);
  }

  public updatePosition() {
    this.update.next();
  }

  public clearField() {
    if (this.group.get(this.key)?.value) {
      this.displayValue = '';
      this.group.get(this.key)?.patchValue('');
      this.eventHandler(
        { type: 'reset' },
        this.group.get(this.key)?.value,
        this.resetAdditionalData()
      );
    }
  }

  public filterUniqueValue(target: any[], data: any[]): any[] {
    return target.filter(el => {
      return !data.find(elem => el[this.param] === elem[this.param]);
    });
  }

  public isDisabled(data: any) {
    const config = this.config.disabled;
    const messages: string[] = [];
    let disable = false;

    if (config) {
      config.keys.forEach((key, i) => {
        if (config.values[i] === this.getValueByKey(key, data)) {
          disable = true;
          messages.push(config.messages[i]);
        }
      });
    }

    return {
      disable,
      messages,
    };
  }

  public getScore(score: string) {
    return Math.floor(parseFloat(score));
  }

  hasObjectExistError(): boolean {
    if (!this.errors) {
      return false;
    }

    const { key } = this.config;
    const error = this.errors[key as string];

    if (error && Array.isArray(error) && error.length > 1) {
      return true;
    }

    return false;
  }

  hasError(): boolean {
    if (!this.errors) {
      return false;
    }

    const { key } = this.config;
    const error = this.errors[key as string];

    if (!error) {
      return false;
    }

    if (typeof error === 'string') {
      return !!error.trim();
    }

    if (Array.isArray(error)) {
      return error.length === 1 && error.some(text => !!text);
    }

    return false;
  }

  parseOption(option: any) {
    const formatString = new FormatString();
    const { country_code } = this.settingsService.settings;
    const lang = this.storage.retrieve('lang');
    const { templateOptions } = this.config;
    const { listParam, listDisplay, info } =
      templateOptions as ITemplateOptions;
    const display = listDisplay || this.display;

    option.__str__ =
      checkAndReturnTranslation(option, country_code, lang) ||
      formatString.format(display, option);
    setPropValue(
      this.display.replace('{', '').replace('}', ''),
      option,
      option.__str__
    );

    if (listParam) {
      option[this.param] = FormatString.format(listParam, option);
      option['name'] = FormatString.format(listDisplay as string, option);
    }

    if (info) {
      option.score = formatString.format(info['score'], option);
      option.distance = formatString.format(info['distance'], option);
    }
  }

  public onClose() {
    this.resetList();
  }
}
