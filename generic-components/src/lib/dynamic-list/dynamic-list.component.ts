import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'ngx-webstorage';

import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import {
  ApiService,
  AuthService,
  ENV,
  EventService,
  EventType,
  FilterService,
  GenericFormService,
  ListService,
  ListStorageService,
  MessageType,
  SiteSettingsService,
  SortService,
  ToastService,
  UserService,
} from '@webui/core';
import {
  fillingForm,
  FormatString,
  getContactAvatar,
  getPropValue,
  getTotalTime,
  isCandidate,
  isClient,
  isManager,
  isMobile,
} from '@webui/utilities';
import { Models, Purpose } from '@webui/data';
// import { fillingForm, smallModalEndpoints } from '../../helpers';
// import { FilterEvent } from '../../interfaces';
import {
  CommonModule,
  formatCurrency,
  getCurrencySymbol,
} from '@angular/common';
import { DATE_FORMAT, DATE_TIME_FORMAT, Time, TIME_FORMAT } from '@webui/time';
import {
  CountryCodeLanguage,
  dialogConfig,
  DialogRef,
  DialogType,
  Endpoints,
  FilterEvent,
  Pagination,
  smallModalEndpoints,
  Status,
} from '@webui/models';
// import { empty } from 'ramda';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  CheckboxComponent,
  CloseButtonComponent,
  FaIconComponent,
  PaginationComponent,
  SpinnerComponent,
  SvgIconComponent,
  TooltipDirective,
} from '@webui/ui';
import { ScrollDirective, SubscriptionRequiredDirective } from '@webui/shared';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
// import { ListElementDirective, ScrollDirective } from '../../directives';
import { FilterBlockComponent } from '../filter-block/filter-block.component';
// import {
//   ActionElementComponent,
//   GenericFormComponent,
//   ListButtonsComponent,
//   ListColumnHeaderComponent,
//   ListSerachBarComponent,
// } from '../../components';
import { ListTableComponent } from '../list-table/list-table.component';
// import { ListElementDirective } from '@webui/dynamic-elements';
import { ListButtonsComponent } from '../list-buttons/list-buttons.component';
import { ListSerachBarComponent } from '../list-search-bar/list-search-bar.component';
import { ActionElementComponent } from '../action-element/action-element.component';
import { ListColumnHeaderComponent } from '../list-column-header/list-column-header.component';
import { ListElementDirective } from '../directives';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { Dialog } from '@angular/cdk/dialog';
// import { DialogService } from '@webui/dialog';
// import { GenericFormComponent } from '@webui/generic-form';

const translationMap = CountryCodeLanguage;

const activateSkill = function (res: any, config: any) {
  const { purpose } = config;
  const { default_rate, price_list_default_rate, active } = res;

  const canActivate =
    purpose === Purpose.Hire
      ? default_rate && price_list_default_rate
      : default_rate && default_rate !== '0';
  const canDeactivate =
    purpose === Purpose.Hire
      ? !default_rate || !price_list_default_rate
      : !default_rate || default_rate === '0';

  if (!active && canActivate) {
    return {
      active: true,
    };
  }

  if (active && canDeactivate) {
    return {
      active: false,
    };
  }

  return {
    active,
  };
};

const listUpdateActions: Record<string, any> = {
  [Endpoints.SkillName]: [activateSkill],
};

@Component({
  standalone: true,
  selector: 'webui-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.scss'],
  imports: [
    CommonModule,
    ScrollDirective,
    FilterBlockComponent,
    TranslateModule,
    SvgIconComponent,
    SubscriptionRequiredDirective,
    FormsModule,
    FaIconComponent,
    CheckboxComponent,
    RouterLink,
    ListElementDirective,
    NgbPopoverModule,
    // PaginationModule,
    CloseButtonComponent,
    SpinnerComponent,
    GoogleMapsModule,
    ListButtonsComponent,
    ListSerachBarComponent,
    ActionElementComponent,
    ListColumnHeaderComponent,
    ListTableComponent,
    GenericFormComponent,
    PaginationComponent,
    TooltipDirective,
  ],
})
export class DynamicListComponent
  implements OnInit, OnChanges, OnDestroy, AfterContentChecked
{
  @Input() config: any;
  @Input() data: any;
  @Input() first!: boolean;
  @Input() id!: number;
  @Input() active!: boolean;
  @Input() limit!: number;
  @Input() offset!: number;
  @Input() sorted: any;
  @Input() innerTables: any;
  @Input() minimized!: boolean;
  @Input() maximize!: boolean;
  @Input() endpoint!: string;
  @Input() parentEndpoint!: string;
  @Input() actionData: any;
  @Input() supportData: any;
  @Input() responseField!: string;
  @Input() paginated?: Pagination;
  @Input() actions!: boolean;
  @Input() delay!: boolean;
  @Input() allowPermissions!: string[];
  @Input() metadataQuery!: string;
  @Input() addMetadataQuery!: string;
  @Input() editEndpoint?: string;
  @Input() addData: any;
  @Input() loading = false;
  @Input() inForm = false;
  @Input() disableActions?: boolean;
  @Input() inlineFilters?: boolean;
  @Input() actionProcess!: boolean;
  @Input() uploadAll!: boolean;
  @Input() hasButtonInAction?: boolean;

  @Output() event: EventEmitter<any> = new EventEmitter();
  @Output() list: EventEmitter<any> = new EventEmitter();
  @Output() checkedObjects: EventEmitter<string[]> = new EventEmitter();

  @ViewChild('modal') modal!: TemplateRef<any>;
  @ViewChild('confirmModal') confirmModal!: TemplateRef<any>;
  @ViewChild('sendMessageModal') sendMessageModal!: TemplateRef<any>;
  @ViewChild('pdfDocumentModal') pdfDocumentModal!: TemplateRef<any>;
  @ViewChild('datatable') datatable!: ElementRef<any>;
  @ViewChild('tableWrapper') tableWrapper!: ElementRef<any>;
  @ViewChild('mapModal') mapModal!: TemplateRef<any>;
  @ViewChild('messageDetail') messageDetail!: TemplateRef<any>;
  @ViewChild('history', { static: true }) history!: TemplateRef<any>;
  @ViewChild('timesheetsCandidate', { static: true })
  timesheetsCandidate!: TemplateRef<any>;
  @ViewChild('unapproved', { static: true }) unapproved!: TemplateRef<any>;
  @ViewChild('confirmProfileModal') confirmProfileModal!: TemplateRef<any>;

  public selectedCount!: number;
  public reason: any;
  public page: any;
  public currentData: any;
  public count!: number;
  public innerTableCall = {
    row: '',
    cell: '',
  };
  public modalRef?: DialogRef;
  public tabs: any;
  public evaluateEndpoint!: string;
  public approveEndpoint?: string | null;
  public currentActionData: any;
  public actionEndpoint: any;
  public error: any;
  public saveProcess!: boolean;
  public showFilters!: boolean;
  public asyncData: any;
  public searchFilter = {
    type: 'search',
    query: 'search',
    key: 'search',
  };
  public position!: { top: any; left: any };
  public noneEdit!: boolean;
  public fullData: any;
  public label!: string;
  public description!: string;

  public body: any[] = [];
  public select: any = {};
  public filtersOfList?: any[] = [];
  public selectedAll = false;
  public modalInfo: any = {};
  public pagination: any = {};
  public pageSize = 0;
  public poped = false;
  public move = false;
  public filtersHidden = true;
  public additionalMetadata: any[] = [];
  public pictures = [
    Endpoints.Contact,
    Endpoints.CandidateContact,
    Endpoints.CandidatePool,
    Endpoints.Company,
    Endpoints.CompanyContact,
  ];
  public mobileDesign = [
    Endpoints.TimesheetHistory,
    Endpoints.TimesheetCandidate,
    Endpoints.TimesheetUnapproved,
  ];
  public collapsed = true;
  public updateButtons = new Map();
  public sortedField: any;
  public isMobileDevice = isMobile() && isCandidate();
  public approveInvoice!: boolean;

  get hasSelectColumn() {
    return (
      this.config.list.actions ||
      this.actions ||
      (!this.noneEdit && !this.inForm)
    );
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private filterService: FilterService,
    private modalService: Dialog,
    private genericFormService: GenericFormService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private storage: LocalStorageService,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastService,
    private listStorage: ListStorageService,
    private listService: ListService,
    private route: ActivatedRoute,
    @Optional() private sortService: SortService,
    private siteSettings: SiteSettingsService,
    // private dialog: DialogService,
    @Optional() @Inject(ENV) private environment: any,
    private eventService: EventService,
    private apiService: ApiService,
    private translateService: TranslateService
  ) {}

  public isMobile = isMobile;

  public ngOnInit() {
    this.paginated = this.paginated || Pagination.On;

    if (this.config.list.searchParameter) {
      this.searchFilter.query = this.config.list.searchParameter;
      // this.searchFilter.key = this.config.list.searchParameter;
    }

    this.updateFilters();

    if (this.config.list.openFilter) {
      this.filtersHidden = false;
    }

    this.noneEdit =
      this.pictures.indexOf(this.endpoint as Endpoints) > -1 ||
      this.config.list.editDisable;

    this.subscriptions.push(
      this.listService.updateRow$.subscribe(rowData => {
        const row = this.fullData[this.responseField].find(
          (item: any) => item.id === rowData.id
        );

        Object.assign(row, rowData.data);

        if (rowData.updateList) {
          this.body = [
            ...(this.generateBody(
              this.config,
              this.fullData,
              this.innerTables
            ) as any[]),
          ];
        }
      })
    );

    // Show timesheet approve modal
    const approveTimesheet = this.route.snapshot.queryParamMap.get('approve');

    if (approveTimesheet) {
      this.genericFormService
        .get(Endpoints.Timesheet + approveTimesheet + '/')
        .subscribe(timesheet => {
          if (timesheet.status === 5) {
            this.approveTimesheet(
              {
                el: {
                  rowId: approveTimesheet,
                },
              },
              timesheet
            );
          }
        });
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    const config =
      changes['config'] && changes['config'].isFirstChange()
        ? changes['config'].currentValue
        : this.config;

    const data =
      changes['data'] && changes['data'].isFirstChange()
        ? changes['data'].currentValue
        : this.data;

    const innerTables =
      changes['innerTables'] && changes['innerTables'].isFirstChange()
        ? changes['innerTables'].currentValue
        : this.innerTables;

    const addData = changes['addData'] && changes['addData'].currentValue;

    // this.config.list.columns = this.purposeService.filterListColumns(
    //   this.endpoint,
    //   this.config.list.columns
    // );

    if (this.actionData !== this.currentActionData) {
      this.currentActionData = this.actionData;
      this.actionProcess = false;
      if (this.actionEndpoint.indexOf('/sendsms/') > -1) {
        setTimeout(() => {
          this.openFrame(this.currentActionData.phone_number);
          this.select = {};
        }, 250);
      } else {
        setTimeout(() => {
          this.select = {};
        }, 250);
      }

      if (this.actionEndpoint.indexOf('pdf') > -1) {
        setTimeout(() => {
          this.modalInfo = {
            url: this.sanitizer.bypassSecurityTrustResourceUrl(
              this.currentActionData.pdf_url || this.currentActionData.pdf
            ),
          };
          this.modalRef = this.modalService.open(
            this.pdfDocumentModal,
            dialogConfig({ size: 'md' })
          );
        }, 100);
      }
      return;
    }

    if (data && this.paginated === Pagination.On) {
      this.initPagination(data);
    }

    if (this.datatable) {
      this.datatable.nativeElement.style.zIndex = this.active
        ? 100
        : this.id * 5;
    }

    if ('config' in changes && changes['config'].isFirstChange()) {
      this.parseTabs(config);
      this.parseMultipleFilter(config.list.filters);
    }

    if ('data' in changes && data && !this.fullData) {
      this.label = this.getFormat('label', data, config);
      this.description = this.getFormat('description', data, config);

      this.fullData = data;
      this.body.push(
        ...(this.generateBody(config, data, innerTables) as any[])
      );
    } else if ('data' in changes && !changes['data'].isFirstChange()) {
      this.fullData = data;
      this.body = [...(this.generateBody(config, data, innerTables) as any[])];
    }

    if ('addData' in changes && !changes['addData'].isFirstChange()) {
      this.fullData = {
        ...this.fullData,
        [this.responseField]: [
          ...this.fullData[this.responseField],
          ...addData[this.responseField],
        ],
      };
      this.body.push(
        ...(this.generateBody(config, addData, innerTables) as any[])
      );
    }

    this.listService.updateButtons = this.updateButtons;
    this.listService.data = this.fullData && this.fullData[this.responseField];
    this.listService.config = this.config.list;
    this.listService.updateActions = listUpdateActions[this.endpoint];

    if ('uploadAll' in changes && changes['uploadAll'].currentValue) {
      const keys = Object.keys(this.select);
      keys.forEach(el => {
        this.select[el] = true;
      });
      this.emitSelect();
    }
  }

  public getFormat(property: string, data: any, config: any): string {
    if (data instanceof Object) {
      return FormatString.format(config.list[property], data);
    }

    return config.list[property];
  }

  public updateFilters() {
    if (this.config.list.filters && this.config.list.search_enabled) {
      this.config.list.filters.push(this.searchFilter);
    } else if (this.config.list.search_enabled) {
      this.config.list.filters = [this.searchFilter];
    }
    if (this.config.list.filters) {
      this.filterService.filters = {
        endpoint: this.parentEndpoint || this.endpoint,
        list: this.config.list,
      };
      this.filtersOfList = this.filterService.getFiltersByEndpoint(
        this.endpoint
      );
    }
    if (this.config.list.search_enabled) {
      if (this.filtersOfList && this.filtersOfList.length > 1) {
        this.showFilters = true;
      } else {
        this.showFilters = false;
      }
    } else {
      this.showFilters = !!(this.filtersOfList && this.filtersOfList.length);
    }
  }

  public parseTabs(config: any) {
    this.tabs = config.list.tabs;

    this.updateMetadataByTabs(config.list.columns);

    if (this.tabs) {
      const tabsMetadata = config.list.columns.filter(
        (el: any) => el.tab && el.tab.is_collapsed
      );

      if (tabsMetadata.length) {
        this.tabs.forEach((tab: any) => {
          if (tab.is_collapsed) {
            tab.fields.forEach((field: any) => {
              this.additionalMetadata.push(
                tabsMetadata.find((el: any) => el.name === field)
              );
            });
          }
        });
      }
    }
  }

  public generateBody(config: any, data: any, innerTables: any) {
    let body;

    if (config && data[this.responseField]) {
      this.select = {
        ...this.select,
        ...this.resetSelectedElements(data[this.responseField]),
      };
      if (config.list) {
        if (this.tabs) {
          const mainMetadata = config.list.columns.filter(
            (el: any) => !el.tab || !el.tab.is_collapsed
          );
          const additionalBody = this.prepareData(
            this.additionalMetadata,
            data[this.responseField],
            config.list.highlight
          );

          body = this.prepareData(
            mainMetadata,
            data[this.responseField],
            config.list.highlight
          );
          this.groupedValues(body);
          body.forEach(main => {
            additionalBody.forEach(additional => {
              if (this.tabs && this.tabs[0].inline) {
                additional.inline = true;
              }
              if (main.id === additional.id) {
                if (!additional.parsed) {
                  main.additionalBody = this.parseAdditionalBody(additional);
                } else {
                  main.additionalBody = additional;
                }
              }
            });
          });
        } else {
          body = this.prepareData(
            config.list.columns,
            data[this.responseField],
            config.list.highlight
          );
          this.groupedValues(body);
        }
        if (this.asyncData) {
          this.getAsyncData();
        }
      }
    }

    this.parseInnerTables(innerTables);
    return body;
  }

  public groupedValues(body: any[]) {
    const groups = this.config.list.groups;

    if (groups) {
      groups.forEach((groupName: string) => {
        const group: Record<string, any> = {};
        body.forEach(row => {
          if (row) {
            row.content.forEach((column: any) => {
              if (column) {
                if (column.name === groupName) {
                  column.content.forEach((item: any) => {
                    if (item) {
                      if (group[item.value]) {
                        this.addRowToGroup(row, group[item.value]);

                        item.value = undefined;

                        row.hide = true;
                      } else {
                        group[item.value] = row;
                      }
                    }
                  });
                }
              }
            });
          }
        });
      });
    }
  }

  public addRowToGroup(row: any, target: any) {
    target.content.forEach((column: any, i: number) => {
      if (column && column.name !== 'actions') {
        column.content.push(...row.content[i].content);
      } else if (column.name === 'actions') {
        column.groupIds = (column.groupIds || []).concat([row.id]);
      }
    });
  }

  public parseInnerTables(innerTables: any) {
    if (innerTables && this.innerTableCall) {
      const currentRow = innerTables[this.innerTableCall.row];
      if (currentRow) {
        const currentCell =
          innerTables[this.innerTableCall.row][this.innerTableCall.cell];
        if (currentCell) {
          const cell =
            innerTables[this.innerTableCall.row][this.innerTableCall.cell];
          if (cell.metadata && cell.data) {
            cell.body = this.prepareData(
              cell.metadata.list.columns,
              cell.data.results
            );
          }
        }
      }
    }
  }

  public parseAdditionalBody(body: any) {
    const content: any[] = [];

    body.content.forEach((col: any) => {
      const tab = col.tab;
      const newContent = content.find(c => c.label === tab.label);
      if (newContent) {
        newContent.content.push(col);
      } else {
        content.push(Object.assign({}, tab, { content: [col] }));
      }
    });
    body.content = content;
    body.parsed = true;
    return body;
  }

  public ngOnDestroy() {
    if (this.first) {
      this.filterService.clean(this.endpoint, this.listService.config.list);
      this.filtersOfList = undefined;
      if (this.modalRef) {
        this.modalRef.close();
      }
    }

    this.subscriptions.forEach(subscrption => {
      subscrption.unsubscribe();
    });
  }

  public ngAfterContentChecked() {
    this.checkOverfow();
  }

  public parseMultipleFilter(filters: any[]): void {
    if (filters) {
      const multipleFilters = filters.filter(
        filter => filter.type === 'multiple'
      );
      multipleFilters.forEach(filter => {
        if (!filter.parsed) {
          if (filter.data.data) {
            filter.data = this.getPropValue(this.data, filter.data.data);
            filter.parsed = true;
          }

          if (filter.data.endpoint && !filter.data.data) {
            filter.endpoint = this.format(filter.endpoint, this.data);
            this.genericFormService
              .getAll(filter.endpoint)
              .subscribe((res: any) => {
                filter.data = res;
                filter.parsed = true;
              });
          }
        }
      });
    }
  }

  public getAsyncData() {
    if (this.asyncData) {
      const endpoints = Object.keys(this.asyncData);
      if (endpoints.length) {
        endpoints.forEach(endpoint => {
          if (this.asyncData[endpoint][0].method === 'get') {
            let query = this.generateParams(this.asyncData[endpoint]);
            if (endpoint.indexOf('?') > -1) {
              query = `&${query}`;
            } else {
              query = `${query}`;
            }
            this.genericFormService.getByQuery(endpoint, query).subscribe(
              (res: any) =>
                this.updateValuesOfAsyncData(res, this.asyncData[endpoint]),
              (err: any) => (this.error = err)
            );
          } else {
            const body: any = this.generateParams(this.asyncData[endpoint]);
            this.genericFormService.submitForm(endpoint, body).subscribe(
              (res: any) =>
                this.updateValuesOfAsyncData(res, this.asyncData[endpoint]),
              (err: any) => (this.error = err)
            );
          }
        });
      }
    }
  }

  public generateParams(elements: any[]) {
    if (elements && elements.length) {
      const params: Record<string, any> = {};
      elements.forEach(element => {
        if (element.query) {
          const keys = Object.keys(element.query);
          keys.forEach(key => {
            if (params[key]) {
              if (params[key] === element.query[key]) {
                return;
              } else {
                if (Array.isArray(params[key])) {
                  if (params[key].indexOf(element.query[key]) === -1) {
                    params[key].push(element.query[key]);
                  } else {
                    return;
                  }
                } else {
                  params[key] = [].concat(params[key], element.query[key]);
                }
              }
            } else {
              params[key] = element.query[key];
            }
          });
        }
      });
      if (elements[0].method === 'get') {
        const keys = Object.keys(params);
        let query = '';
        keys.forEach(key => {
          if (Array.isArray(params[key])) {
            params[key].forEach((item: any) => {
              query += `${key}=${item}&`;
            });
          } else {
            query += `${key}=${params[key]}&`;
          }
        });
        return query.slice(0, query.length - 1);
      } else if (elements[0].method === 'post') {
        return params;
      }
    }

    return;
  }

  public updateValuesOfAsyncData(data: any[], target: any[]) {
    data.forEach(el => {
      target.forEach(targetItem => {
        if (el.id === targetItem.id || el.contact === targetItem.id) {
          targetItem.field.value = el[targetItem.request_field];
        }
      });
    });
    this.body = JSON.parse(JSON.stringify(this.body));
  }

  public calcButton(
    offsetTop: number,
    listButtons: any[],
    filterWrapper: any[]
  ) {
    offsetTop = listButtons[0].offsetHeight;
    if (filterWrapper && filterWrapper.length) {
      if (document.body.classList.contains('r3sourcer')) {
        filterWrapper[0].style.top = offsetTop + 'px';
        filterWrapper[0].style.height = `calc(100vh - ${offsetTop}px - 80px)`;
      }
    }
  }

  public calcTable() {
    if (this.tableWrapper) {
      const tableWrapperEl = this.tableWrapper.nativeElement;
      tableWrapperEl.style.maxHeight = `calc(100vh - ${tableWrapperEl.offsetTop}px - 150px)`;
    }
  }

  public checkOverfow() {
    if (this.tableWrapper) {
      const width = this.tableWrapper.nativeElement.offsetWidth;
      let count = 0;
      this.config.list.columns.forEach((el: any) => {
        if (!el.tab) {
          count += 1;
        } else if (el.tab && !el.tab.is_collapsed) {
          count += 1;
        }
      });
      if (width < 1024) {
        this.tableWrapper.nativeElement.style.overflowX = 'auto';
      } else {
        this.tableWrapper.nativeElement.style.overflowX = 'visible';
      }
    }
  }

  public changeTab(tab: any) {
    if (this.tabs) {
      this.tabs.forEach((el: any) => {
        if (el === tab) {
          el.is_collapsed = !el.is_collapsed;
        }
      });
    }
  }

  public getTabOfColumn(name: any) {
    let tab;
    if (this.tabs) {
      const filteredTabs = this.tabs.filter((el: any) => {
        let result = false;
        el.fields.forEach((field: any) => {
          if (field === name) {
            result = true;
          }
        });
        return result;
      });
      if (filteredTabs.length) {
        tab = filteredTabs[0];
      }
    }
    return tab;
  }

  public updateMetadataByTabs(metadata: any[]) {
    metadata.forEach(el => {
      el.tab = this.getTabOfColumn(el.name);
    });
  }

  public prepareData(config: any, data: any, highlight?: any) {
    this.asyncData = {};
    const prepareData: any[] = [];
    data.forEach((el: any) => {
      const { id, __str__ } = el;

      const row = {
        id,
        __str__,
        rowData: el,
        collapsed: true,
        content: <any[]>[],
      };

      if (highlight) {
        this.addHighlight(highlight.field, el, row, highlight.values);
      }

      config.forEach((col: any) => {
        const { label, hideLabel, hide, name, center, width } = col;

        const cell = {
          id,
          label,
          hideLabel,
          hide,
          name,
          center,
          width: width,
          content: <any[]>[],
          showIf: col.showIf,
          isShow: true,
          contextMenu: col.context_menu,
          tab: this.getTabOfColumn(col.name),
          timezone: col.timezone,
        };
        cell.isShow = this.isShowCell(row, cell);

        col.content.forEach((element: any) => {
          const obj = this.generateContentElement(element, col, cell, el);

          if (!obj) {
            return;
          }

          cell.content.push(obj);
        });
        row.content.push(cell);
      });
      prepareData.push(row);
    });
    return prepareData;
  }

  public generateContentElement(element: any, col: any, cell: any, el: any) {
    if (element.showIf && !this.checkShowRules(element.showIf, el)) {
      return;
    }
    let props;
    const obj: any = {
      rowId: el.id,
      key: col.name,
      delim: col.delim,
      title: col.title,
      skillName: col.label,
      widthFull: element.widthFull, // it is for ListTextComponent
      name: element.field,
      type: element.type,
      values: element.values,
      color: element.color,
      action: element.action,
      inline: element.inline,
      outline: element.outline,
      description: element.description,
      redirect: element.redirect,
      file: element.file,
      display: element.display,
      setColorForLabel: element.setColorForLabel,
      noDelim: element.noDelim,
      placement: element.placement,
      hideValue: element.hideValue,
      help: element.help,
      postfix: element.postfix,
      content: element.content,
      groupLabel: element.groupLabel,
      emptyValue: element.emptyValue,
      hideLabel: element.hideLabel,
      messageType: element.messageType,
      customLink: element.customLink,
      fontSize: element.fontSize,
      inverse: element.inverse,
      param: element.param,
      stars: element.stars,
      image: element.image,
      score: element.score,
      hideTitle: element.hideTitle,
      size: element.size,
      shadow: element.shadow,
      muted: element.muted,
      signature: element.signature,
      svg: element.svg,
      process: new Subject(),
      info: element.info,
      styles: element.styles,
      inlineValue: element.inlineValue,
      form: { ...element.form },
      show: element.updateButton ? new BehaviorSubject(false) : undefined,
      required: element.required,
      currency: element.currency,
      translationKey: element.translationKey,
      translateKey: element.translateKey,
      arrayKey: element.arrayKey,
      avatarType: element.avatarType,
      boldClass:
        (el.endpoint === Endpoints.Tag || this.endpoint === Endpoints.Tag) &&
        (el.owner === 'system' || (el.tag && el.tag.system === 'owner')),
      translated: element.translated,
      jsonTranslate: element.jsonTranslate,
    };
    if (cell.timezone) {
      obj.timezone = this.getPropValue(el, cell.timezone);
    }
    if (obj.show) {
      this.updateButtons.set(el.id, obj.show);
    }

    if (obj.form && Object.keys(obj.form).length) {
      fillingForm([obj.form], el);
      if (obj.form.templateOptions.display) {
        const currency = getCurrencySymbol(
          this.siteSettings.settings.currency,
          'wide'
        );

        obj.display = this.format(obj.form.templateOptions.display, {
          ...el,
          currency,
        });
      }
    }
    if (this.listStorage.hasTrackingInfo(el.id)) {
      obj.locationDataEmpty = !this.listStorage.getTrackingInfo(el.id);
    }
    if (obj.action && this.disableActions) {
      obj.disableAction = true;
    }
    if (obj.description) {
      const currency = getCurrencySymbol(
        this.siteSettings.settings.currency,
        'wide'
      );

      obj.description = this.format(obj.description, { ...el, currency });
    }
    if (element.setColor) {
      this.setValue(el, [element.setColor], obj, 'setColor');
    }
    if (element.workers_details) {
      obj['workers_details'] = this.getValueByKey('workers_details', el);
    }
    if ('avatarType' in element) {
      const keys = element.field.split('.');
      keys[keys.length - 1] = '__str__';
      obj['contactName'] = this.getValueByKey(keys.join('.'), el);
    }
    if (element.display && element.type !== 'tags') {
      if (obj.currency) {
        const value = getPropValue(el, obj.key);
        obj.display = formatCurrency(
          value as number,
          'en',
          getCurrencySymbol(this.siteSettings.settings.currency, 'wide') ||
            'USD'
        );
      } else {
        const currency = getCurrencySymbol(
          this.siteSettings.settings.currency,
          'wide'
        );

        obj.display = this.format(
          element.display.replace(/{field}/gi, `{${element.field}}`),
          {
            ...el,
            currency,
          }
        );
      }
    }
    if (element.type === 'datepicker') {
      const field =
        this.config.fields &&
        this.config.fields.find((elem: any) => elem.key === element.field);
      if (field) {
        obj.templateOptions = field.templateOptions;
      }
    }
    if (element.type === 'icon' || element.type === 'static') {
      if (element.type === 'icon') {
        obj.label = element.label;
      }
      const field =
        this.config.fields &&
        this.config.fields.find((elem: any) => elem.key === element.field);
      if (field) {
        obj['values'] = field.templateOptions.values || element.values;
        obj['color'] = field.templateOptions.color || element.color;
        obj['listLabel'] = field.templateOptions.listLabel || element.listLabel;
      }
    }
    if (element.link) {
      const indexOf = element.link.indexOf('{field}');
      if (indexOf) {
        element.link = element.link.replace(/{field}/gi, `{${element.field}}`);
      }
      obj['link'] = this.format(element.link, el);
      obj.text = this.format(element.text, el);
    } else if (element.endpoint) {
      if (element.field) {
        props = element.field.split('.');
        this.setValue(el, props, obj);
      }
      const indexOf = element.endpoint.indexOf('{field}');

      obj.notParsedEndpoint = element.notParsedEndpoint;
      if (element.endpoint[element.endpoint.length - 1] !== '/') {
        obj.notParsedEndpoint = element.endpoint;
        element.notParsedEndpoint = element.endpoint;
        element.endpoint += '/';
      }
      if (indexOf) {
        element.endpoint = element.endpoint.replace(
          /{field}/gi,
          `{${element.field}}`
        );
      }
      if (Array.isArray(obj.value)) {
        obj.link = [];
        obj.value.forEach((val: any) => {
          obj.link.push(
            this.format(element.endpoint, {
              [obj.name]: val,
            })
          );
        });
      } else {
        obj['endpoint'] = this.format(element.endpoint, el);
      }
      obj.text = this.format(element.text, el);
    }
    if (element.type === 'static') {
      if (element.text) {
        if (element.field === 'totalTime') {
          obj.value = this.format(
            element.text.replace(/{field}/gi, `{${element.field}}`),
            {
              ...el,
              totalTime: this.getTotalTime(el),
            }
          );
        } else {
          obj.value = this.format(
            element.text.replace(/{field}/gi, `{${element.field}}`),
            el
          );
        }
      }
      obj.label = element.label;
    }
    if (element.type === 'picture') {
      const field =
        this.config.fields &&
        this.config.fields.find((elem: any) => elem.key === element.field);
      if (field) {
        obj.default = field.default;
      }
    }
    if (element.type === 'button') {
      this.updateButtonTypeCell(obj, element, el);
    }
    if (element.type === 'buttonGroup') {
      obj.content = element.content.map((elem: any) => {
        const newObj = Object.assign(
          {},
          elem,
          { rowId: obj.rowId },
          { disableAction: this.disableActions }
        );

        this.updateButtonTypeCell(newObj, elem, el);
        return newObj;
      });
    }
    if (element.type === 'select' && element.content) {
      obj.content = element.content.map((elem: any) => {
        const newObj = Object.assign({}, elem, {
          disableAction: this.disableActions,
        });

        newObj['endpoint'] = this.format(elem.endpoint, el);

        this.updateButtonTypeCell(newObj, elem, el);
        return newObj;
      });
    }
    if (element.fields) {
      obj.fields = [];
      element.fields.forEach((field: any, index: number) => {
        const item = Object.assign({}, field);
        obj.fields[index] = item;
        props = field.field.split('.');
        this.setValue(el, props, item);
      });
    } else if (element.field) {
      if (element.type === 'info') {
        obj.editDisable = this.config.list.editDisable;
        obj.value = el;
        obj.companyPicture = this.endpoint === Endpoints.Company;
      } else {
        props = element.field.split('.');
        obj.initValue = el;
        this.setValue(el, props, obj);
      }
    }
    if (!this.checkValue(obj)) {
      delete cell.contextMenu;
    }
    if (element.async && obj.value === -1) {
      element.endpoint = this.format(element.endpoint, el);
      const query: Record<string, any> = {};
      if (element.query) {
        const keys = Object.keys(element.query);
        obj.query = <Record<string, any>>{};
        keys.forEach(key => {
          query[key] = this.format(element.query[key], el);

          if (!query[key]) {
            query[key] = this.format(element.query[key], this.data);
          }
        });
      }
      if (this.asyncData[element.endpoint]) {
        this.asyncData[element.endpoint].push({
          method: element.method,
          content: cell.content,
          query,
          field: obj,
          id: el.id,
          request_field: element.request_field,
        });
      } else {
        this.asyncData[element.endpoint] = [
          {
            method: element.method,
            content: cell.content,
            query,
            field: obj,
            id: el.id,
            request_field: element.request_field,
          },
        ];
      }
    }

    return obj;
  }

  public updateButtonTypeCell(obj: any, element: any, el: any) {
    obj.confirm = element.confirm;
    obj.options = element.options;
    obj.color = element.color;
    obj.text_color = element.text_color;
    obj.title = this.format(element.title, el);
    obj.messageType = this.format(element.messageType, el);
    obj.repeat = element.repeat;
    obj.list = true;
    obj.templateOptions = {
      label: element.label,
      icon: element.icon
        ? element.icon.slice(element.icon.indexOf('-') + 1)
        : null,
      small: true,
      mb: false,
      p: true,
      action: element.action,
      text: this.format(element.text, el),
    };

    if (element.hidden) {
      this.setValue(el, element.hidden.split('.'), obj, 'hidden');
    } else if (element.field) {
      this.setValue(el, element.field.split('.'), obj, 'hidden');
      obj.hidden = !obj.hidden;
    }
    if (element.replace_by) {
      this.setValue(el, element.replace_by.split('.'), obj, 'replace_by');
    }
  }

  onSortChange() {
    if (this.delay) {
      return;
    }

    this.event.emit({
      type: 'sort',
      list: this.config.list.list,
      query: this.sortService.getSortQuery(this.sortService.getCurrentState()),
    });
  }

  public setValue(data: any, props: any, object: any, param = 'value') {
    const prop = props.shift();
    if (props.length === 0) {
      if (object.type === 'related' && !object[param]) {
        if (Array.isArray(data[prop])) {
          object[param] = data[prop];
        } else {
          object[param] = data[prop] ? data[prop].__str__ : '';
        }
      } else if (object.type === 'static' && !object[param]) {
        object[param] =
          data[prop] && data[prop].__str__ ? data[prop].__str__ : data[prop];
      } else if (!object[param]) {
        if (prop === 'totalTime') {
          object[param] = this.getTotalTime(data);
        } else {
          if (data.translations || (data.name && data.name.translations)) {
            const translations =
              data.translations || (data.name && data.name.translations) || [];
            const preferLanguage =
              this.storage.retrieve('lang') ||
              translationMap[this.siteSettings.settings.country_code];
            const trans = translations.find((el: any) =>
              el.language ? el.language.id === preferLanguage : false
            );

            data.__str__ = trans ? trans.value : data.__str__;
          }

          if (data[prop] && data[prop].translations) {
            const preferLanguage =
              this.storage.retrieve('lang') ||
              translationMap[this.siteSettings.settings.country_code];

            const trans = data[prop].translations.find(
              (el: any) => el.language.id === preferLanguage
            );

            if (trans) {
              object[param] = trans.value;
            } else {
              object[param] = data[prop].__str__;
            }
          } else {
            object[param] = data[prop];
          }
        }
      }
    } else if (data[prop]) {
      this.setValue(data[prop], props, object, param);
    }
  }

  public getTotalTime(data: any) {
    return getTotalTime(data, data['timezone'] || data['time_zone']);
  }

  public checkValue(obj: any) {
    if (obj.value) {
      return !!obj.value;
    } else if (obj.fields) {
      let value = '';
      obj.fields.forEach((el: any) => {
        if (el.value) {
          value = el.value;
        }
      });
      return !!value;
    }

    return;
  }

  public onCreateNewItem(): void {
    this.event.emit(this.createEvent('createObject'));
  }

  public selectAll(selected: any) {
    if (!this.uploadAll) {
      this.event.emit(this.createEvent('uploadAll'));
      this.selectedAll = false;
      return;
    }

    this.selectedAll = selected;
    const keys = Object.keys(this.select);
    keys.forEach(el => {
      this.select[el] = selected;
    });
    this.emitSelect();
  }

  public emitSelect() {
    if (this.select) {
      const keys = Object.keys(this.select);
      const result = keys.filter(key => this.select[key]);
      this.selectedCount = result.length;
      this.checkedObjects.emit(keys.filter(key => this.select[key]));
    }
  }

  public resetSelectedElements(data: any) {
    const select: Record<string, any> = {};
    data.forEach((el: any) => {
      select[el.id] = false;
    });
    return select;
  }

  public actionHandler(e: any) {
    const { action } = e;
    this.actionEndpoint = action.endpoint;

    if (
      action.required &&
      Object.keys(this.select).every(el => el && !this.select[el])
    ) {
      this.actionProcess = false;
      this.toastr.sendMessage(action.selectionError, MessageType.Error);
      return;
    }

    if (action.signature_endpoint) {
      // this.open(SignatureModalComponent);

      this.eventService.emit(EventType.OpenDialog, {
        type: DialogType.Signature,
        onInit: (modalRef: any) => (this.modalRef = modalRef),
        // options: {
        //   backdrop: 'static',
        // },
      });

      this.modalRef?.closed.subscribe(result => {
        const status = (result as any).status;
        const signature = (result as any).result;

        if (status === Status.Success) {
          action.bodySignature.supervisor_signature = signature;

          this.event.emit({
            type: 'action',
            list: this.config.list.list,
            action: e.action,
            data: this.select,
          });
        }
      });
    } else {
      this.event.emit({
        type: 'action',
        list: this.config.list.list,
        action: e.action,
        data: this.select,
      });
    }
  }

  public filterHandler(e: FilterEvent) {
    this.selectedAll = false;
    this.select = {};

    if (e.reset) {
      this.event.emit({
        type: 'filter',
        list: e.list,
        query: '',
      });

      this.filterService.resetFilters(e.list);
    } else {
      this.event.emit({
        type: 'filter',
        list: e.list,
        query: this.filterService.getQuery(e.list),
      });
    }
  }

  // public open(modal: TemplateRef<unknown>, options = {}) {
  //   this.modalRef = this.modalService.open(modal, {
  //     ...options,
  //     backdrop: 'static',
  //   });

  //   return this.modalRef;
  // }

  public initPagination(data: any) {
    if (this.inForm) {
      if (data !== this.currentData || data.count !== this.count) {
        this.selectedAll = false;
        const count = data.count;
        const length = data.results.length;
        this.count = length;
        if (length === 0) {
          this.pageSize = 10;
          this.page = 1;
          return;
        }
        if (!this.offset) {
          this.page = 1;
        } else if (this.offset) {
          this.page = this.offset / this.limit + 1;
        }
        if (!this.limit) {
          this.pageSize = 10;
        } else {
          this.pageSize = (count / this.limit) * 10;
        }
      }
    }
  }

  public pageChange(page: number) {
    let query;
    this.selectedAll = false;
    this.select = {};
    if (page === 2) {
      query = `limit=${this.limit}&offset=${this.limit}`;
    } else if (page === 1) {
      query = `limit=${this.limit}&offset=0`;
    } else {
      query = `limit=${this.limit}&offset=${this.limit * (page - 1)}`;
    }
    this.event.emit({
      type: 'pagination',
      list: this.config.list.list,
      query,
    });
  }

  public popedTable() {
    this.filtersOfList = this.filterService.getFiltersOfList(
      this.parentEndpoint,
      this.config.list.list
    );
    this.poped = true;
  }

  // public unpopedTable() {
  //   if (this.config.list.filters) {
  //     this.filterService.filters = {
  //       endpoint: this.parentEndpoint,
  //       list: this.config.list
  //     };
  //   }
  //   this.poped = false;
  //   this.minimized = false;
  //   this.maximize = false;
  // }

  // public minimizeTable() {
  //   this.minimized = true;
  //   this.event.emit({
  //     type: 'minimize',
  //     list: this.config.list.list
  //   });
  // }

  // public closeTable() {
  //   this.event.emit({
  //     type: 'close',
  //     list: this.config.list.list
  //   });
  //   this.filterService.resetQueries(this.config.list.list);
  // }

  public buttonHandler(e: any, action?: any, cell?: any) {
    if (action) {
      action.close();
    }
    this.modalInfo = {};
    if (e && e.value) {
      switch (e.value) {
        case 'openMap':
          this.openMap(e.el.fields);
          break;
        case 'openList':
        case 'openDiff':
          this[e.value as keyof DynamicListComponent](e.el.endpoint, e.el);
          break;
        case 'buyCandidate':
          this.buyCandidate(e);
          break;
        case 'approveTimesheet':
          this.approveTimesheet(e);
          break;
        case 'openForm':
          this.openForm(e);
          break;
        case 'submitTimesheet':
          this.submitTimesheet(e);
          break;
        case 'changeTimesheet':
          this.changeTimesheet(e);
          break;
        case 'callAction':
          this.setAction(e);
          break;
        case 'evaluateCandidate':
          this.evaluateCandidate(e);
          break;
        case 'sendSMS':
          this.openFrame(e.el.fields);
          break;
        case 'printInvoice':
          this.printPDF(e);
          break;
        case 'delete':
          this.delete(e, cell);
          break;
        case 'addForm':
          this.addForm(e);
          break;
        case 'editModal':
        case 'editForm':
          this.editForm(e);
          break;
        case 'showMessage':
        case 'messageDetail':
          this.showMessage(e);
          break;
        case 'emptyPost':
          this.post(e);
          break;
        case 'showCandidateProfile':
          this.showCandidateProfile();
          break;
        case 'fillin':
          this.fillIn(e);
          break;
        case 'showTracking':
          this.showTracking(e);
          break;
        case 'updateObject':
          this.updateListObject();
          break;
        case 'setDefaultLanguage':
          this.setDefaultLanguage(e);
          break;
        case 'createSmsTemplate':
          this.openSmsTemplateModal(e);
          break;
        case 'createEmailTemplate':
          this.openEmailTemplateModal(e);
          break;
        case 'rentTool':
          this.rentTool(e);
          break;
        case 'timesheetHistory':
          this.timesheetHistory(e);
          break;
        default:
          return;
      }
    }
    return;
  }

  private rentTool(e: any) {
    const rowData = e.el.initValue;

    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.RentTool,
      onInit: (dialog: DialogRef) => {
        dialog.closed.subscribe(result => {
          if (result === Status.Accept) {
            let body = {};
            if (this.userService.user?.currentRole.isCandidate) {
              body = {
                ...body,
                tool: rowData.tool_id,
                candidate:
                  this.userService.user?.data.contact.candidate_contact,
                status: 0,
              };
            }
            if (this.userService.user?.currentRole.isClient) {
              body = {
                ...body,
                tool: rowData.tool_id,
                customer_company: this.userService.user?.currentRole.company_id,
                customer_representative:
                  this.userService.user?.currentRole.client_contact_id,
                status: 0,
              };
            }
            this.apiService.post(Endpoints.ToolRental, body).subscribe(() => {
              this.refreshList();
            });
          }
        });
      },
      options: {
        data: {
          name: rowData.name,
          location: rowData.address.name,
          picture: rowData.picture.origin,
        },
      },
    });
  }

  private openSmsTemplateModal(e: any) {
    const {
      name,
      slug,
      message_text_template,
      reply_timeout,
      delivery_timeout,
      type,
      company_id,
    } = this.getRowData(e);

    const data = {
      name: this.getDataAction(name),
      slug: this.getDataAction(slug),
      message_text_template: this.getDataAction(message_text_template),
      reply_timeout: this.getDataAction(reply_timeout),
      delivery_timeout: this.getDataAction(delivery_timeout),
      type: this.getDataAction(type),
      company: this.getDataAction(company_id),
    };

    this.modalInfo = {
      type: 'form',
      mode: 'edit',
      endpoint: e.el.endpoint,
      data,
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'md' })
    );
  }

  private openEmailTemplateModal(e: any) {
    const {
      name,
      slug,
      message_text_template,
      message_html_template,
      reply_timeout,
      delivery_timeout,
      type,
      company_id,
    } = this.getRowData(e);

    const data = {
      name: this.getDataAction(name),
      slug: this.getDataAction(slug),
      message_text_template: this.getDataAction(message_text_template),
      message_html_template: this.getDataAction(message_html_template),
      reply_timeout: this.getDataAction(reply_timeout),
      delivery_timeout: this.getDataAction(delivery_timeout),
      type: this.getDataAction(type),
      company: this.getDataAction(company_id),
    };

    this.modalInfo = {
      type: 'form',
      mode: 'edit',
      endpoint: e.el.endpoint,
      data,
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'md' })
    );
  }

  public setDefaultLanguage(e: any) {
    this.genericFormService
      .updateForm(e.el.endpoint, { default: true })
      .subscribe(() => {
        this.event.emit({
          type: 'update',
          list: this.config.list.list,
        });
      });
  }

  public updateListObject() {
    this.listService.saveChanges();
  }

  public buyCandidate(e: any) {
    const rowData = this.getRowData(e);
    const currency = getCurrencySymbol(
      this.siteSettings.settings.currency,
      'wide'
    );

    this.modalInfo = {
      amount: currency + rowData.profile_price,
      e,
    };

    this.modalRef = this.modalService.open(
      this.confirmProfileModal,
      dialogConfig({ size: 'md' })
    );
  }

  public timesheetHistory(e: any) {
    const arr = e.el.endpoint.split('/');
    const id = arr[arr.length - 2];
    arr.splice(arr.length - 2, 1);
    const endpoint = arr.join('/');

    this.eventHandler({
      target: 'form',
      endpoint: endpoint,
      // label: this.translateService.instant(e.el.translationKey),
      id: id,
    });
  }

  public confirmCandidateBuy() {
    const e = this.modalInfo.e;
    this.saveProcess = true;
    const user = this.userService.user;

    const body = {
      company: user ? user.data.contact.company_id : '',
    };

    this.genericFormService
      .submitForm(e.el.endpoint, body)
      .pipe(finalize(() => (this.saveProcess = false)))
      .subscribe(
        response => {
          this.modalRef?.close();
          const { candidate, message } = response;
          this.toastr.sendMessage(
            `${candidate} has been added to your Candidate Contact list. ${message}`,
            MessageType.Success
          );
          this.event.emit({
            type: 'update',
            list: this.config.list.list,
          });
        },
        () => {
          this.modalRef?.close();
          this.toastr.sendMessage(
            `Please add Credit Card for paid services!`,
            MessageType.Error
          );
          this.router.navigate(['/billing']);
        }
      );
  }

  public fillIn(e: any) {
    let fillInPath;

    if (isManager()) {
      fillInPath = `/mn/hr/jobs/${e.el.rowId}/fillin/`;
    } else if (isClient()) {
      fillInPath = `/cl/hr/jobs/${e.el.rowId}/fillin/`;
    }

    this.router.navigate([fillInPath]);
  }

  public showCandidateProfile() {
    // console.log(e);
    // const arr = e.el.endpoint.split('/');
    // const id = arr[arr.length - 2];
    // arr.splice(arr.length - 2, 1);
    // const endpoint = arr.join('/');
    // this.modalInfo = {
    //   type: 'form',
    //   mode: 'view',
    //   endpoint: '/candidate/candidatecontacts/',
    //   metadataQuery: 'type=profile',
    //   id
    // };
    // this.open(this.modal, { size: 'lg' });
  }

  public openForm(e: any) {
    this.modalInfo = {
      type: 'form',
      endpoint: e.el.endpoint,
      label: e.el.value,
    };

    this.modalService.open(this.modal, dialogConfig({ size: 'lg' }));
  }

  public setAction(e: any) {
    this.modalInfo = {
      type: 'action',
      endpoint: e.el.endpoint,
    };

    if (e.el.confirm && e.el.options) {
      this.modalInfo.message = e.el.options.message;
      this.modalInfo.agree_label = e.el.options.agree_label;
      this.modalInfo.decline_label = e.el.options.decline_label;
      this.modalRef = this.modalService.open(
        this.confirmModal,
        dialogConfig({ size: 'sm' })
      );
    } else {
      this.callAction(this.modalInfo);
    }
  }

  public callAction(modalInfo: any) {
    this.modalRef?.close();
    const endpoint = modalInfo.endpoint;
    this.genericFormService.submitForm(endpoint, {}).subscribe(() => {
      this.event.emit({
        type: 'update',
        list: this.config.list.list,
      });
    });
  }

  public openMap(value: any) {
    this.modalInfo = {};
    value.forEach((el: any) => {
      const keys = el.field.split('.');
      this.modalInfo[el.key || keys[keys.length - 1]] = +el.value;
    });
    this.modalRef = this.modalService.open(
      this.mapModal,
      dialogConfig({ size: 'lg' })
    );
  }

  handleFormClose(result?: Observable<unknown>, refresh = true) {
    return result?.pipe(tap(() => refresh && this.refreshList()));
  }

  public submitTimesheet(e: any) {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.Submission,
      onInit: (dialogRef: DialogRef) => {
        // dialogRef.componentInstance.data = this.getRowData(e);
        dialogRef.closed.subscribe((result: any) => {
          if (result.status === Status.Success) {
            this.refreshList();
          }
        });
      },
      options: {
        data: this.getRowData(e),
        size: 'md',
      },
    });

    // const dialogRef = this.dialog.open(SubmissionModalComponent, {
    //   size: 'md',
    // });
    // dialogRef.componentInstance.data = this.getRowData(e);
    // dialogRef.result
    //   .then((result: any) => {
    //     if (result.status === Status.Success) {
    //       this.refreshList();
    //     }
    //   })
    //   .catch(() => empty({}));
  }

  public evaluateCandidate(e: any) {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.EvaluateCandidate,
      onInit: (dialogRef: DialogRef) => {
        // dialogRef.componentInstance.data = this.getRowData(e);
        // dialogRef.componentInstance.endpoint = e.el.endpoint;
        dialogRef.closed.subscribe((result: any) => {
          if (result.status === Status.Success) {
            this.refreshList();
          }
        });
      },
      options: {
        data: {
          data: this.getRowData(e),
          endpoint: e.el.endpoint,
        },
      },
    });

    // const dialogRef = this.dialog.open(EvaluateCandidateModalComponent);
    // dialogRef.componentInstance.data = this.getRowData(e);
    // dialogRef.componentInstance.endpoint = e.el.endpoint;
    // dialogRef.result
    //   .then((result: any) => {
    //     if (result.status === Status.Success) {
    //       this.refreshList();
    //     }
    //   })
    //   .catch(() => EMPTY);
  }

  public evaluate(e: any, data?: any, refresh = true) {
    if (!data) {
      data = this.getRowData(e);
    }

    if (data) {
      const contact = data.job_offer.candidate_contact.contact;
      this.modalInfo = {
        type: 'evaluate',
        endpoint: e.el.endpoint,
        edit: true,
        evaluate: true,
        rowData: data,
        label: {
          picture: contact.picture && contact.picture.origin,
          contactAvatar: getContactAvatar(contact.__str__),
          name: contact.__str__,
        },
        data: {
          evaluation_score: 5,
        },
      };

      this.eventService.emit(EventType.OpenDialog, {
        type: DialogType.Evaluate,
        onInit: (dialogRef: DialogRef) => (this.modalRef = dialogRef),
        options: {
          backdrop: 'static',
          windowClass: 'small-modal',
          data: {
            config: this.modalInfo,
          },
        },
      });

      // this.modalRef = this.modalService.open(EvaluateModalComponent, {
      //   backdrop: 'static',
      //   windowClass: 'small-modal',
      // });
      // this.modalRef.componentInstance.config = this.modalInfo;
      return this.handleFormClose(this.modalRef?.closed, refresh);
    }

    return;
  }

  public sendSignature(submitButton?: any) {
    if (this.modalInfo.signature) {
      const image = this.modalInfo.signature.value;

      this.modalInfo.form.supervisor_signature = image;
    }

    if (this.modalInfo.data.evaluation_score && !this.modalInfo.evaluated) {
      this.sendEvaluateData(
        this.modalInfo.evaluateEndpoint,
        this.modalInfo.data
      );
    }

    if (this.modalInfo.changeEndpoint) {
      setTimeout(() => {
        submitButton.click();
      }, 100);
    } else {
      this.saveProcess = true;

      this.genericFormService
        .submitForm(this.modalInfo.endpoint, this.modalInfo.form)
        .pipe(finalize(() => (this.saveProcess = false)))
        .subscribe(() => {
          this.modalRef?.close();

          this.evaluateEvent({
            type: 'sendForm',
            status: 'success',
          });
        });
    }
  }

  public refreshList() {
    this.event.emit({
      type: 'update',
      list: this.config.list.list,
    });
  }

  public convertBase64(url: string) {
    const b64Data = url.slice(url.indexOf(',') + 1);
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const theBlob = new Blob([byteArray], { type: 'image/png' });
    return new File([theBlob], 'signature.png');
  }

  public updateSignature(signature: string) {
    this.modalInfo.signature.value = signature;
  }

  public sendEvaluateData(endpoint: string, data: any) {
    this.saveProcess = true;

    this.genericFormService
      .editForm(endpoint, data)
      .pipe(finalize(() => (this.saveProcess = false)))
      .subscribe(() => {
        this.modalRef?.close();

        this.evaluateEvent({
          type: 'sendForm',
          status: 'success',
        });
      });
  }

  // TODO: implement change timesheet
  public changeTimesheet(e: any) {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.ApproveWorksheet,
      onInit: (dialogRef: DialogRef) => {
        // dialogRef.componentInstance.data = this.getRowData(e);
        dialogRef.closed.subscribe((result: any) => {
          if (result.status === Status.Success) {
            this.refreshList();
          }
        });
      },
      options: {
        data: this.getRowData(e),
        size: 'lg',
      },
    });

    // const dialogRef = this.dialog.open(ApproveWorksheetModalComponent);
    // dialogRef.componentInstance.data = this.getRowData(e);
    // dialogRef.result.then((result: any) => {
    //   if (result.status === Status.Success) {
    //     this.refreshList();
    //   }
    // });
  }

  // TODO: implement approve timesheet
  public approveTimesheet(e: any, initialData?: any) {
    const data = initialData || this.getRowData(e);
    const {
      shift_started_at,
      shift_ended_at,
      break_started_at,
      break_ended_at,
    } = data;
    const signature =
      data.company.supervisor_approved_scheme.includes('SIGNATURE');

    const approveTimesheet = () => {
      this.genericFormService
        .editForm(`${Endpoints.Timesheet}${data.id}/approve/`, {
          shift_started_at,
          shift_ended_at,
          break_started_at,
          break_ended_at,
          send_candidate_message: false,
          send_supervisor_message: false,
          no_break: !break_started_at && !break_started_at,
        })
        .pipe(
          catchError(err => {
            const message = err.errors.non_field_errors[0];
            this.toastr.sendMessage(message, MessageType.Error);

            return of(false);
          })
        )
        .subscribe(response => {
          if (typeof response === 'boolean') {
            return;
          }

          this.refreshList();
        });
    };

    if (data) {
      const evaluateEndpoint = `${Endpoints.Timesheet}${data.id}/evaluate/`;

      e.el.endpoint = evaluateEndpoint;

      if (signature) {
        const contact = data.job_offer.candidate_contact.contact;
        const score =
          this.getPropValue(data, 'evaluation.evaluation_score') || 5;
        this.modalInfo = {
          endpoint: `${Endpoints.Timesheet}${data.id}/approve_by_signature/`,
          evaluateEndpoint,
          evaluated: data.evaluated,
          timesheet: {
            date: this.format('{shift_started_at__date}', data),
            started_at: this.format('{shift_started_at__time}', data),
            break: this.format(
              '{break_started_at__time} - {break_ended_at__time}',
              data
            ),
            ended_at: this.format('{shift_ended_at__time}', data),
            shift_start_end: this.format(
              '{shift_started_at__time} - {shift_ended_at__time}',
              data
            ),
            break_start_and: this.format(
              '{break_started_at__time} - {break_ended_at__time}',
              data
            ),
            unformated_date: data.shift_started_at,
            total: this.getTotalTime(data),
          },
          form: {},
          signature: {
            endpoint: `${Endpoints.Timesheet}${data.id}/approve_by_signature/`,
            value: '',
          },
          label: {
            avatar: contact.picture,
            fullName: contact.__str__,
          },
          data: {
            evaluation_score: score,
          },
          signatureStep: true,
          approve: true,
          evaluateEvent: this.evaluateEvent.bind(this),
          sendSignature: this.sendSignature.bind(this),
        };

        this.eventService.emit(EventType.OpenDialog, {
          type: DialogType.ApproveTimesheet,
          onInit: (modalRef: any) => (this.modalRef = modalRef),
          options: {
            windowClass: 'approve-modal',
            data: {
              config: this.modalInfo,
              timesheet: data,
            },
          },
        });

        // this.modalRef = this.modalService.open(ApproveTimesheetModalComponent, {
        //   windowClass: 'approve-modal approve',
        // });
        // this.modalRef.componentInstance.config = this.modalInfo;
        // this.modalRef.componentInstance.timesheet = data;
        this.handleFormClose(this.modalRef?.closed);
      } else if (!data.evaluated) {
        this.approveEndpoint = `${Endpoints.Timesheet}${data.id}/approve/`;

        this.evaluate(e, data, false)?.subscribe(result => {
          (result as any).status === Status.Success && approveTimesheet();
        });
      } else {
        approveTimesheet();
      }
    }
  }

  public getRowData(event: any): any {
    return this.fullData[this.responseField].find(
      (el: any) => el.id === event.el.rowId
    );
  }

  public openFrame(e: any, param = 'recipient') {
    let query = '?';
    const contacts: string[] = [];
    if (e && e.length) {
      e.forEach((el: any) => {
        if (el) {
          if (el instanceof Object) {
            if (el.value) {
              contacts.push(el.value);
            }
          } else {
            contacts.push(el);
          }
        }
      });
    }
    if (contacts && contacts.length) {
      contacts.forEach(el => {
        query += `${param}[]=${encodeURIComponent(el)}&`;
      });
      query = query.slice(0, query.length - 1);
    }
    let url;
    this.modalInfo = {};
    url = param === 'recipient' ? `${this.environment.api}/twilio/` : '';
    url += query;
    url += `&token=${this.storage.retrieve('user').access_token_jwt}`;
    this.modalInfo.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.modalRef = this.modalService.open(
      this.sendMessageModal,
      dialogConfig({ size: 'sm' })
    );
  }

  public eventHandler(e: any) {
    this.modalInfo = {
      type: e.target,
      endpoint: e.endpoint,
      label: e.label,
      id: e.id,
      mode: this.allowPermissions.includes('update') ? 'edit' : 'view',
      dontUseMetadataQuery: true,
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'lg' })
    );
  }

  public addObject() {
    this.modalInfo = {
      type: 'form',
      endpoint: this.endpoint,
      label: `Add ${this.config.list.label}`,
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'lg' })
    );
  }

  public editObject(id: string, label?: string) {
    this.modalInfo = {
      type: 'form',
      endpoint: this.endpoint,
      label: label ? label : 'Edit',
      id,
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'lg' })
    );
  }

  // editListObject(row) {
  //   const endpoint = this.config.list.editEndpoint;
  //   const id = getPropValue(row.rowData, this.config.list.canEdit);
  //   const label = row.__str__;

  //   this.modalInfo = {
  //     type: 'form',
  //     endpoint,
  //     id,
  //     label,
  //     mode: 'edit'
  //   };

  //   this.open(this.modal, { size: 'lg' });
  // }

  canEdit(row: any): boolean {
    return !!getPropValue(row.rowData, this.config.list.canEdit);
  }

  // public activeTable() {
  //   if (this.poped) {
  //     this.event.emit({
  //       type: 'active',
  //       list: this.config.list.list
  //     });
  //   }
  // }

  public addHighlight(prop: string, data: any, row: any, values: any) {
    const props = prop.split('.');
    const key: string = props.shift() as string;
    if (props.length === 0) {
      const property = data[prop];
      row.highlight = false;
      if (typeof values[property] === 'boolean') {
        row.highlight = {
          highlight: true,
        };
      } else if (property) {
        row.highlight = {
          color: values[property],
        };
      }
    } else {
      this.addHighlight(props.join('.'), data[key], row, values);
    }
  }

  public openList(value: any) {
    this.list.emit({
      endpoint: value,
    });
  }

  public openDiff(endpoint: string, el: any) {
    this.innerTableCall.row = el.rowId;
    this.innerTableCall.cell = el.key;
    this.list.emit({
      endpoint,
      innerTable: true,
      list: this.config.list.list,
      key: el.key,
      row: el.rowId,
    });
  }

  public format(str: string, data: any) {
    const open = '{';
    const close = '}';
    const pieces = [];
    let before;
    let propValue;
    let pos = 0;
    let trail;
    const timezone = data['timezone'] || data['time_zone'];
    while (true && str) {
      const start = str.indexOf(open, pos);
      const end = str.indexOf(close, pos);
      const key = str.substring(start + 1, end);
      if (start === -1 || end === -1) {
        trail = str.substr(pos);
        if (trail !== '') {
          pieces.push(trail);
        }
        break;
      }
      propValue = this.getPropValue(data, key, timezone);
      before = str.substring(pos, start);
      pieces.push(before);
      pieces.push(propValue);
      pos = end + 1;
    }
    return pieces.join('');
  }

  public getPropValue(data: any, key: string, timezone?: string): any {
    const props = key.split('.');
    const prop: string = props.shift() as string;
    if (!props.length) {
      if (data) {
        if (prop.indexOf('__') > -1) {
          const [field, format] = prop.split('__');
          const datetime = ['date', 'time', 'datetime', 'diff'];
          if (datetime.indexOf(format) > -1) {
            if (data[field]) {
              if (format === 'diff') {
                return Time.parse(data[field], { timezone }).from(
                  Time.now(timezone)
                );
              }

              return Time.parse(data[field], { timezone }).format(
                format === 'time'
                  ? TIME_FORMAT
                  : format === 'datetime'
                  ? DATE_TIME_FORMAT
                  : DATE_FORMAT
              );
            } else {
              return isMobile() && isCandidate() ? '-' : '';
            }
          } else {
            return data[prop];
          }
        } else {
          return data[prop];
        }
      }
    } else {
      if (prop === 'session') {
        return this.getPropValue(this.userService.user, props.join('.'));
      }

      if (data) {
        return this.getPropValue(data[prop], props.join('.'));
      }
    }
  }

  public formEvent(e: any) {
    if (e.type === 'formRegistration') {
      this.modalInfo.form = e.form;
    }
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }
    if (e.type === 'sendForm' && e.status === 'success') {
      this.saveProcess = false;
      this.modalRef?.close();

      if (this.approveInvoice && e.data.billing_email) {
        this.post(this.approveInvoice);
        return;
      }

      this.event.emit({
        type: 'update',
        list: this.config.list.list,
        samePage: this.config.list.refreshOnSamePage,
      });
    }
  }

  public formError() {
    this.saveProcess = false;
  }

  public evaluateEvent(e: any) {
    if (e.type === 'sendForm' && e.status === 'success') {
      this.modalRef?.close();
      if (this.approveEndpoint) {
        this.genericFormService
          .editForm(this.approveEndpoint, {})
          .subscribe(() => {
            this.event.emit({
              type: 'update',
              list: this.config.list.list,
            });
            this.approveEndpoint = null;
          });
      } else {
        this.formEvent(e);
      }
    }
  }

  public buttonAction(e: any) {
    if (e && e.type) {
      switch (e.type) {
        case 'add_object':
          this.addObject();
          break;
        case 'poped_table':
          this.popedTable();
          break;
        case 'openMap':
          this.showMap();
          break;
        case 'sendSMS':
          this.openFrame([]);
          break;
        default:
          return;
      }
    }
  }

  public showMap() {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.FillInMap,
      // onInit: (dialogRef: DialogRef) => {
      //   // dialogRef.componentInstance.data = this.data[this.responseField];
      //   // dialogRef.componentInstance.select = this.select;
      //   // dialogRef.componentInstance.markerClick = (marker: any) =>
      //   //   this.markerClick(marker);

      //   // if (this.supportData) {
      //   //   dialogRef.componentInstance.supportData = this.data[this.supportData];
      //   // }
      // },
      options: {
        size: 'lg',
        data: {
          results: this.data[this.responseField],
          select: this.select,
          markerClick: (marker: any) => this.markerClick(marker),
          supportData: this.data[this.supportData],
        },
        windowClass: 'fillin-map',
      },
    });

    // const modalRef = this.open(FillinMapComponent, {
    //   size: 'lg',
    //   windowClass: 'fillin-map',
    // });
    // modalRef.componentInstance.data = this.data[this.responseField];
    // modalRef.componentInstance.select = this.select;
    // modalRef.componentInstance.markerClick = (marker: any) =>
    //   this.markerClick(marker);
    //
    // if (this.supportData) {
    //   modalRef.componentInstance.supportData = this.data[this.supportData];
    // }
  }

  public printPDF(e: any) {
    this.genericFormService.getAll(e.el.endpoint).subscribe((res: any) => {
      this.modalInfo = {
        url: this.sanitizer.bypassSecurityTrustResourceUrl(res.pdf),
      };
      this.modalRef = this.modalService.open(
        this.pdfDocumentModal,
        dialogConfig({ size: 'lg' })
      );
    });
  }

  public delete(e: any, cell: any) {
    let dialog: DialogRef<any> | null = null;

    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.ConfirmAction,
      onInit: (dialogRef: DialogRef) => (dialog = dialogRef),
      options: {
        data: {
          message: 'message.confirm_delete_instance',
          model: this.label,
          name: '',
          accept: 'delete',
          decline: 'action.cancel',
        },
      },
    });

    if (!dialog) {
      return;
    }

    (dialog as DialogRef).closed.subscribe(status => {
      if (status === Status.Accept) {
        const requests = [
          this.genericFormService.delete(
            this.endpoint,
            e.el.name !== 'id' ? e.el.value : e.el.rowId
          ),
        ];

        if (cell.groupIds) {
          cell.groupIds.forEach((id: string) => {
            requests.push(this.genericFormService.delete(this.endpoint, id));
          });
        }

        combineLatest(requests).subscribe(
          () => {
            this.event.emit({
              type: 'update',
              list: this.config.list.list,
            });
          },
          (err: any) => {
            if (err && err.errors) {
              const { non_field_errors } = err.errors;
              this.toastr.sendMessage(non_field_errors, MessageType.Error);
            }
          }
        );
      }
    });
  }

  public identifyDevice() {
    let changeDesign = false;

    this.mobileDesign.forEach(el => {
      if (this.endpoint && this.endpoint.includes(el)) {
        changeDesign = true;
      }
    });

    if (changeDesign) {
      return isMobile();
    }

    return false;
  }

  public editForm(e: any) {
    let endpoint;
    let id;
    let withoutId;
    let data;
    let label;
    const rowData = this.getRowData(e);

    if (this.editEndpoint) {
      endpoint = this.format(this.editEndpoint, rowData);

      const arr: string[] = endpoint.split('/');
      const lastElement = arr.pop();

      id = lastElement;
      endpoint = [...arr, ''].join('/');
    } else {
      endpoint = e.el.endpoint || this.endpoint;
      if (
        e.el.notParsedEndpoint &&
        e.el.notParsedEndpoint[e.el.notParsedEndpoint.length - 1] !== '/'
      ) {
        const arr: string[] = e.el.endpoint.split('/');
        arr.pop();
        const lastElement = arr.pop();
        if (lastElement === 'extend') {
          endpoint = [...arr, 'extend'].join('/') + '/';
          withoutId = true;
          data = {
            skill: {
              action: 'add',
              data: {
                value: this.format('{position.id}', rowData),
              },
            },
            default_shift_starting_time: {
              action: 'add',
              data: {
                value: this.format('{default_shift_starting_time}', rowData),
              },
            },
            job: {
              action: 'add',
              data: {
                value: e.el.rowId,
              },
            },
          };
        } else if (lastElement === 'candidate_fill') {
          endpoint = [...arr, 'candidate_fill'].join('/') + '/';
          withoutId = true;
          label = this.format('{job_offer.candidate_contact.__str__}', rowData);
          data = {
            [Models.Timesheet]: {
              action: 'add',
              data: {
                value: this.format('{id}', rowData),
              },
            },
            company: {
              action: 'add',
              data: {
                value: this.format('{company.id}', rowData),
              },
            },
          };
        } else if (lastElement === 'supervisor_approve') {
          endpoint = [...arr, 'supervisor_approve'].join('/') + '/';
          withoutId = true;
          label = this.format('{job_offer.candidate_contact.__str__}', rowData);
          data = {
            [Models.Timesheet]: {
              action: 'add',
              data: {
                value: this.format('{id}', rowData),
              },
            },
            company: {
              action: 'add',
              data: {
                value: this.format('{company.id}', rowData),
              },
            },
          };
        } else {
          id = lastElement;
          endpoint = [...arr, ''].join('/');
        }
      }
    }
    this.modalInfo = {
      type: 'form',
      endpoint,
      id: id || (!withoutId && e.el.rowId),
      mode: 'edit',
      edit: true,
      data,
      label,
      dontUseMetadataQuery: e.value === 'editModal' || e.value === 'editForm',
    };

    const size = 'lg';
    let windowClass = '';

    if (this.modalInfo.endpoint.includes('/candidate/skillrels/')) {
      this.modalInfo.label = 'Edit skills';
    }

    if (
      smallModalEndpoints.includes(this.modalInfo.endpoint) ||
      e.el.size === 'small'
    ) {
      // size = undefined;
      windowClass = 'small-modal';
    }

    if (this.modalInfo.endpoint.includes('/extend')) {
      windowClass = 'extend-modal';
    }

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size, windowClass })
    );
  }

  public showMessage(e: any) {
    const arr: string[] = e.el.endpoint.split('/');
    arr.pop();

    if (e.el.messageType) {
      e.el.messageType = (<string>e.el.messageType).toLowerCase();
    }

    const id = arr.pop();
    const endpoint = [...arr, ''].join('/');
    const metadataQuery = `type=${
      e.el.messageType === 'received' ? 'reply' : e.el.messageType
    }`;

    const label =
      e.el.messageType === 'sent'
        ? 'message.sent-message'
        : e.el.messageType === 'reply' || e.el.messageType === 'received'
        ? 'message.received-message'
        : undefined;

    this.modalInfo = {
      metadataQuery,
      label,
      type: 'form',
      endpoint,
      id,
      mode: 'view',
      edit: true,
      data: {
        ['has_resend_action']: {
          action: 'add',
          data: {
            value: this.getRowData(e)['has_resend_action'],
          },
        },
        ['resend_id']: {
          action: 'add',
          data: {
            value: e.el.rowId,
          },
        },
      },
    };

    this.modalRef = this.modalService.open(
      this.messageDetail,
      dialogConfig({ size: 'sm', windowClass: 'message-detail' })
    );
  }

  public addForm(e: any) {
    this.modalInfo = {
      type: 'form',
      endpoint: e.el.endpoint,
    };

    this.modalRef = this.modalService.open(
      this.modal,
      dialogConfig({ size: 'lg' })
    );
  }

  public post(e: any) {
    const endpoint: string = e.el.endpoint;
    const isInvoiceApproveEndpoint =
      endpoint.includes('/core/invoices/') && endpoint.includes('/approve/');

    this.genericFormService
      .submitForm(endpoint, {}, { showMessage: isInvoiceApproveEndpoint })
      .subscribe(
        (res: any) => {
          if (e.el && e.el.redirect) {
            // "loginas" functionlity
            const helper = new JwtHelperService();
            const token = helper.decodeToken(res.access_token_jwt);

            if (
              token.origin.includes(location.host) ||
              location.host.includes('localhost')
            ) {
              this.authService.logoutWithoutRedirect();
              this.userService.user = null;
              this.authService.storeToken(res);
              this.userService.getUserData().subscribe(() => {
                location.href = '/';
              });

              return;
            }

            return;
          }

          this.event.emit({
            type: 'update',
            list: this.config.list.list,
          });
        },
        (err: any) => {
          this.error = err;
          if (isInvoiceApproveEndpoint) {
            this.approveInvoice = e;
            const invoice = this.getRowData(e);
            this.modalInfo = {
              id: invoice.customer_company.id,
              endpoint: Endpoints.Company,
              label: invoice.customer_company.name,
              type: 'form',
              edit: true,
              mode: 'edit',
            };
            this.modalRef = this.modalService.open(
              this.modal,
              dialogConfig({ size: 'lg' })
            );

            setTimeout(() => {
              const input = document.querySelector(
                'input[name="billing_email"]'
              ) as HTMLInputElement;
              input.focus();
            }, 2000);
          }
        }
      );
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
        let targetValue = el[key];
        const value = this.getValueByKey(key, data);

        if (typeof targetValue === 'string' && targetValue.includes('{')) {
          targetValue = this.format(targetValue, {
            session: this.userService.user,
          });
        }

        if (Array.isArray(targetValue)) {
          const exist = targetValue.some(item => item === value);
          if (exist) {
            approvedRules += 1;
          }
        } else if (value === targetValue) {
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

  public checkPermission(type: string): boolean {
    if (this.allowPermissions) {
      return this.allowPermissions.indexOf(type) > -1;
    } else {
      return false;
    }
  }

  public toggleFilterBlock() {
    this.filtersHidden = !this.filtersHidden;

    if (!this.filtersHidden) {
      document.body.classList.add('scroll-hidden');
    } else {
      document.body.classList.remove('scroll-hidden');
    }
  }

  public markerClick(e: any) {
    e.selected = !e.selected;
    this.select[e.id] = e.selected;

    this.emitSelect();
  }

  public openAllTabs() {
    this.collapsed = !this.collapsed;

    this.body.forEach(row => {
      row.collapsed = this.collapsed;
    });
  }

  public getView() {
    switch (this.endpoint) {
      case Endpoints.TimesheetHistory:
        return this.history;
      case Endpoints.TimesheetCandidate:
        return this.timesheetsCandidate;
      case Endpoints.TimesheetUnapproved:
        return this.unapproved;
    }

    return null;
  }

  public getElement(name: string, row: any[]): any {
    return row.find(el => el.name === name);
  }

  public inverseButton(field: any) {
    return { ...field, inverse: true };
  }

  public showTracking(e: any) {
    e.el.process.next(true);
    this.genericFormService
      .getByQuery(e.el.endpoint, `?timesheet=${e.id}&limit=-1`)
      .pipe(finalize(() => e.el.process.next(false)))
      .subscribe(res => {
        if (res.results.length > 0) {
          this.listStorage.updateTrackingInfo(e.id, true);
          const timesheet = this.getRowData(e);
          e.el.locationDataEmpty = false;
          this.listStorage.updateTrackingInfo(e.id, true);

          this.eventService.emit(EventType.OpenDialog, {
            type: DialogType.Tracking,
            onInit: (dialogRef: DialogRef) => (this.modalRef = dialogRef),
            options: {
              data: {
                results: res.results,
                timesheet: timesheet,
              },
              // backdrop: 'static',
            },
          });

          // this.modalRef = this.modalService.open(TrackingModalComponent, {
          //   backdrop: 'static',
          // });
          // this.modalRef.componentInstance.timesheet = timesheet;
          // this.modalRef.componentInstance.data = res.results;
        } else {
          e.el.locationDataEmpty = true;
          this.listStorage.updateTrackingInfo(e.id, false);
          this.toastr.sendMessage('Location data is empty', MessageType.Info);
        }
      });
  }

  public isInteger(value: any) {
    return Number.isInteger(value);
  }

  toggleTab(event: MouseEvent, row: any) {
    event.stopPropagation();
    row.collapsed = !row.collapsed;
  }

  toggleCheckbox(event: MouseEvent, row: any) {
    event.stopPropagation();
    this.select[row.id] = !this.select[row.id];

    this.emitSelect();
    return false;
  }

  getListLabelKey(): string {
    return this.config.list.list + '.list.label';
  }

  get hasEditLink() {
    if (this.checkPermission('get')) {
      const { editEndpoint, editDisable } = this.config.list;

      return this.first && !editEndpoint && !this.inForm && !editDisable;
    }

    return false;
  }

  openDetails(row: any, e: any) {
    if (e.target instanceof HTMLInputElement) {
      return;
    }

    if (this.checkPermission('get')) {
      const { editEndpoint, editDisable } = this.config.list;
      // set temp flag in localstorage
      localStorage.setItem('flagAfterEditRecord', 'true');

      if (this.first && !editEndpoint && !this.inForm && !editDisable) {
        this.router.navigate([row.id, 'change'], { relativeTo: this.route });
      }

      if (editEndpoint && this.canEdit(row) && !editDisable) {
        const id = getPropValue(row.rowData, this.config.list.canEdit);
        const label = row.__str__;

        this.modalInfo = {
          type: 'form',
          endpoint: editEndpoint,
          id,
          label,
          mode: 'edit',
        };

        this.modalRef = this.modalService.open(
          this.modal,
          dialogConfig({ size: 'lg' })
        );
      }
    }
  }

  private isShowCell(row: any, cell: any) {
    return cell.showIf ? this.checkShowRules(cell.showIf, row.rowData) : true;
  }

  private getDataAction(value: any, type = 'add') {
    return {
      action: type,
      data: {
        value,
      },
    };
  }

  private createEvent(type: string) {
    return {
      list: this.config.list.list,
      type,
    };
  }
}
