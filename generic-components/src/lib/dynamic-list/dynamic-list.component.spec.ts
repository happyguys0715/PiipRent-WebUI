import { FilterService } from './../../services/filter.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  TestBed,
  async,
  ComponentFixture,
  inject,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DynamicListComponent } from './dynamic-list.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { GenericFormService } from './../../services/generic-form.service';
import { Observable } from 'rxjs/Observable';

describe('DynamicListComponent', () => {
  let fixture: ComponentFixture<DynamicListComponent>;
  let comp: DynamicListComponent;
  let el;
  let config = {
    fields: [],
    list: {
      label: 'Company',
      list: 'company',
      highlight: {
        values: {
          master: true,
        },
        field: 'company.type',
      },
      tabs: [
        {
          label: 'Contact',
          fields: ['gender', 'phone_modile'],
          is_collapsed: false,
        },
        {
          label: 'Branch',
          fields: ['branch'],
          is_collapsed: true,
        },
      ],
      columns: [
        {
          name: 'first_name',
          sort_field: 'first_name',
          label: 'First Name',
          sort: true,
          sorted: 'asc',
          content: [
            {
              field: 'first_name',
              type: 'static',
              text: '{first_name}',
              label: 'Test',
              async: true,
              endpoint: '/localization/{id}',
              method: 'post',
              query: {
                type: '{company.type}',
                contacts: '{id}',
              },
              request_field: 'first_name',
            },
          ],
          context_menu: [
            {
              label: 'edit profile',
              endpoint: 'endpoint',
            },
          ],
        },
        {
          name: 'branch',
          sort_field: 'branch',
          label: 'Branch',
          sort: true,
          sorted: 'asc',
          values: {},
          content: [
            {
              fields: [
                {
                  field: 'address.latitude',
                  type: 'input',
                },
                {
                  field: 'address.longitude',
                  type: 'input',
                },
              ],
              type: 'button',
              action: 'openMap',
              icon: 'fa-glob',
              text: '{company.type}',
              confirm: true,
              options: {
                label: 'Delete selected',
                message: 'Are you sure?',
                agree_label: 'Agree',
                decline_label: 'Decline',
              },
            },
          ],
        },
        {
          name: 'evaluate',
          label: 'Evaluate',
          content: [
            {
              action: 'evaluateCandidate',
              color: 'warning',
              endpoint: '/timesheets/{id}/evaluate/',
              field: 'id',
              icon: 'fa-star',
              label: 'Evaluate',
              replace_by: 'supervisor',
              hidden: 'supervisor_approved_at',
              repeat: 5,
              type: 'button',
            },
          ],
        },
        {
          name: 'gender',
          label: 'Gender',
          sort: false,
          content: [
            {
              field: 'gender',
              type: 'text',
              async: true,
              endpoint: '/localization/{id}',
              method: 'post',
              query: {
                type: '{company.type}',
                contacts: '{id}',
              },
              request_field: 'gender',
            },
          ],
          context_menu: [
            {
              label: 'edit profile',
              endpoint: 'endpoint',
            },
          ],
        },
        {
          name: 'phone_mobile',
          sort_field: 'phone_mobile',
          label: 'Mobile Phone',
          sort: true,
          sorted: 'desc',
          content: [
            {
              field: 'phone_mobile',
              type: 'link',
              link: 'tel:{phone_mobile}',
            },
            {
              field: 'email',
              type: 'link',
              link: 'mailto:{email}',
            },
            {
              field: 'last_name',
              type: 'link',
              endpoint: '/contacts/{id}',
            },
          ],
          context_menu: [
            {
              label: 'send',
              endpoint: 'endpoint',
            },
          ],
        },
      ],
    },
  };

  let data = {
    count: 4,
    next: '/core/companyaddresses/?limit=1&offset=1',
    results: [
      {
        title: null,
        first_name: null,
        last_name: 'Testovich',
        email: 'test.testovich@gmail.com',
        phone_mobile: '+380978107725',
        gender: null,
        is_available: true,
        marital_status: null,
        birthday: null,
        spouse_name: '',
        children: null,
        picture: null,
        address: {
          latitude: 12,
          longitude: 13,
        },
        company: {
          type: 'master',
        },
        id: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
        __str__: 'Test Testovich',
      },
    ],
  };
  let query;
  let filters;
  let mockFilterService = {
    _filters: [],
    set filters(value) {
      this._filters = data;
    },
    get filters() {
      return this._filters;
    },
    getQuery(list) {
      return query;
    },
    getFiltersOfList() {
      return filters;
    },
    resetQueries() {
      return true;
    },
  };
  let response;

  const mockGenericFormService = {
    submitForm() {
      return Observable.of({});
    },
    getAll() {
      return Observable.of(response);
    },
    getByQuery() {
      return Observable.of(response);
    },
    editForm() {
      return Observable.of({});
    },
    delete() {
      return Observable.of({});
    },
  };

  const mockRouter = {
    navigate() {
      return true;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicListComponent],
      providers: [
        DomSanitizer,
        { provide: FilterService, useValue: mockFilterService },
        { provide: GenericFormService, useValue: mockGenericFormService },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [NgbModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DynamicListComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', async () => {
    comp.config = config;
    fixture.detectChanges();
    expect(comp.config).toBeDefined();
  });

  describe('ngOnInit method', () => {
    it('should init innerTableCall property', async(() => {
      comp.config = config;
      comp.ngOnInit();
      expect(comp.innerTableCall).toEqual({
        row: '',
        cell: '',
      });
    }));
  });

  describe('ngOnChanges method', () => {
    it('should called prepareData method', async(() => {
      comp.config = Object.assign({}, config);
      comp.responseField = 'results';
      comp.data = data;
      comp.maximize = true;
      comp.asyncData = true;
      spyOn(comp, 'prepareData');
      spyOn(comp, 'resetSelectedElements');
      spyOn(comp, 'getSortedColumns');
      spyOn(comp, 'unpopedTable');
      spyOn(comp, 'updateMetadataByTabs');
      spyOn(comp, 'getAsyncData');
      spyOn(comp, 'parseMultipleFilter');
      comp.ngOnChanges();
      expect(comp.prepareData).toHaveBeenCalled();
      expect(comp.resetSelectedElements).toHaveBeenCalled();
      expect(comp.getSortedColumns).toHaveBeenCalled();
      expect(comp.unpopedTable).toHaveBeenCalled();
      expect(comp.updateMetadataByTabs).toHaveBeenCalled();
      expect(comp.getAsyncData).toHaveBeenCalled();
      expect(comp.parseMultipleFilter).toHaveBeenCalled();
    }));

    it('should call openFrame method', fakeAsync(() => {
      comp.config = config;
      comp.data = data;
      comp.actionData = {};
      comp.actionEndpoint = '/core/companyaddresses/sendsms/';
      comp.currentActionData = {
        phone_mobile: ['+380983456723'],
      };
      spyOn(comp, 'openFrame');
      spyOn(comp, 'parseMultipleFilter');
      comp.ngOnChanges();
      tick(300);
      expect(comp.openFrame).toHaveBeenCalledWith(
        comp.currentActionData.phone_mobile
      );
      comp.actionData = undefined;
      comp.currentActionData = undefined;
      expect(comp.parseMultipleFilter).toHaveBeenCalled();
    }));

    it('should update datatable', async(() => {
      comp.config = config;
      comp.data = {};
      comp.active = false;
      comp.id = 5;
      spyOn(comp, 'initPagination');
      spyOn(comp, 'updateMetadataByTabs');
      spyOn(comp, 'parseMultipleFilter');
      comp.ngOnChanges();
      expect(+comp.datatable.nativeElement.style.zIndex).toEqual(25);
      comp.active = true;
      comp.ngOnChanges();
      expect(+comp.datatable.nativeElement.style.zIndex).toEqual(100);
      expect(comp.updateMetadataByTabs).toHaveBeenCalled();
      expect(comp.parseMultipleFilter).toHaveBeenCalled();
    }));

    it('should call updateSort method', async(() => {
      comp.config = config;
      comp.data = {};
      comp.active = false;
      comp.id = 5;
      comp.sorted = {
        'company.name': 'asc',
      };
      spyOn(comp, 'updateSort');
      spyOn(comp, 'resetSort');
      spyOn(comp, 'initPagination');
      spyOn(comp, 'updateMetadataByTabs');
      spyOn(comp, 'parseMultipleFilter');
      comp.ngOnChanges();
      expect(comp.sortedColumns).toEqual(comp.sorted);
      expect(comp.updateSort).toHaveBeenCalled();
      comp.sorted = {};
      comp.ngOnChanges();
      expect(comp.resetSort).toHaveBeenCalled();
      expect(comp.updateMetadataByTabs).toHaveBeenCalled();
      expect(comp.parseMultipleFilter).toHaveBeenCalled();
    }));

    it('should create body for inner tables', async(() => {
      comp.innerTableCall = {
        row: 125,
        cell: 'diff',
      };
      comp.config = config;
      let tables = {
        125: {
          diff: {
            metadata: {
              list: {
                columns: [],
              },
            },
            data: {
              results: [],
            },
            body: {},
          },
        },
      };
      comp.innerTables = tables;
      comp.data = {};
      spyOn(comp, 'prepareData');
      spyOn(comp, 'initPagination');
      spyOn(comp, 'updateMetadataByTabs');
      spyOn(comp, 'parseMultipleFilter');
      comp.ngOnChanges();
      expect(comp.prepareData).toHaveBeenCalled();
      expect(comp.updateMetadataByTabs).toHaveBeenCalled();
      expect(comp.parseMultipleFilter).toHaveBeenCalled();
    }));
  });

  describe('ngOnDestroy method', () => {
    it('should clean filters and close modal', async(
      inject([FilterService], (fs: FilterService) => {
        comp.first = true;
        comp.config = config;
        comp.endpoint = '/contacts/';
        comp.modalRef = {
          close() {
            return true;
          },
        };
        spyOn(comp.modalRef, 'close');
        comp.ngOnDestroy();
        expect(fs.filters).toEqual({
          endpoint: comp.endpoint,
          list: null,
        });
        expect(comp.modalRef.close).toHaveBeenCalled();
      })
    ));
  });

  describe('ngAfterContentChecked method', () => {
    it('should call checkOverflow method', () => {
      spyOn(comp, 'checkOverfow');
      comp.ngAfterContentChecked();
      expect(comp.checkOverfow).toHaveBeenCalled();
    });
  });

  describe('parseMultipleFilter method', () => {
    it('should update data from metadata', () => {
      comp.data = {
        shifts: [],
      };
      const tableFilters = <any>[
        {
          type: 'multiple',
          data: {
            data: 'shifts',
          },
        },
      ];
      comp.parseMultipleFilter(tableFilters);
      expect(tableFilters[0].data).toEqual([]);
      expect(tableFilters[0].parsed).toBeTruthy();
    });

    it('sholud update data from separate endpoint', () => {
      comp.data = {
        id: '123',
      };
      const tableFilters = <any>[
        {
          type: 'multiple',
          data: {
            endpoint: '/hr/vacancy/{id}/shifts/',
          },
        },
      ];
      response = [];
      comp.parseMultipleFilter(tableFilters);
      expect(tableFilters[0].data).toBeDefined();
      expect(tableFilters[0].parsed).toBeTruthy();
    });
  });

  describe('getAsyncData method', () => {
    it('should get async data by get request', () => {
      comp.asyncData = {
        '/locatozation/?code=AU': [
          {
            method: 'get',
            content: [{}],
            field: {},
            id: '123',
            request_field: 'contact',
          },
        ],
      };
      spyOn(comp, 'generateParams').and.returnValue('country=Australia');
      spyOn(comp, 'updateValuesOfAsyncData');
      comp.getAsyncData();
      expect(comp.generateParams).toHaveBeenCalled();
      expect(comp.updateValuesOfAsyncData).toHaveBeenCalled();
    });

    it('should get async data by post request', () => {
      comp.asyncData = {
        '/locatozation/?code=AU': [
          {
            method: 'post',
            content: [{}],
            field: {},
            id: '123',
            request_field: 'contact',
          },
        ],
      };
      comp.endpoint = '/hr/vacancies/';
      comp.data = {
        vacancy: {
          id: '123',
        },
      };
      comp.supportData = 'vacancy';
      spyOn(comp, 'generateParams').and.returnValue({});
      spyOn(comp, 'updateValuesOfAsyncData');
      comp.getAsyncData();
      expect(comp.generateParams).toHaveBeenCalled();
      expect(comp.updateValuesOfAsyncData).toHaveBeenCalled();
    });
  });

  describe('generateParams method', () => {
    it('should generate data for get request', () => {
      const elements = [
        {
          method: 'get',
          query: {
            vacancy: '1',
            contacts: '1',
          },
        },
        {
          method: 'get',
          query: {
            vacancy: '1',
            contacts: '2',
          },
        },
        {
          method: 'get',
          query: {
            vacancy: '1',
            contacts: '3',
          },
        },
      ];
      const result = comp.generateParams(elements);
      expect(result).toEqual('vacancy=1&contacts=1&contacts=2&contacts=3');
    });

    it('should generate data for post request', () => {
      const elements = [
        {
          method: 'post',
          query: {
            vacancy: '1',
            contacts: '1',
          },
        },
        {
          method: 'post',
          query: {
            vacancy: '1',
            contacts: '2',
          },
        },
        {
          method: 'post',
          query: {
            vacancy: '1',
            contacts: '3',
          },
        },
      ];
      const result = comp.generateParams(elements);
      expect(result).toEqual({
        vacancy: '1',
        contacts: ['1', '2', '3'],
      });
    });
  });

  describe('updateValuesOfAsyncData method', () => {
    it('should udate field in the table', () => {
      const field = {
        value: null,
      };
      const responseData = [
        {
          id: '123',
          contact: '12',
        },
      ];
      const target = {
        id: '123',
        request_field: 'contact',
        obj: field,
        content: [field],
      };
      comp.updateValuesOfAsyncData(responseData, target);
      expect(target.content.length).toEqual(1);
      expect(target.content[0].value).toEqual('12');
    });
  });

  describe('checkOverflow method', () => {
    it('should set overflow auto', () => {
      comp.tableWrapper = {
        nativeElement: {
          style: {
            overflowX: 'visible',
          },
          offsetWidth: 500,
        },
      };
      comp.config = config;
      comp.checkOverfow();
      expect(comp.tableWrapper.nativeElement.style.overflowX).toEqual('auto');
    });

    it('should set overflow visible', () => {
      comp.tableWrapper = {
        nativeElement: {
          style: {
            overflowX: 'auto',
          },
          offsetWidth: 800,
        },
      };
      comp.config = config;
      comp.checkOverfow();
      expect(comp.tableWrapper.nativeElement.style.overflowX).toEqual(
        'visible'
      );
    });
  });

  describe('changeTab method', () => {
    it('should change status of tab', () => {
      comp.tabs = config.list.tabs;
      let tab = comp.tabs[1];
      comp.changeTab(tab);
      expect(tab.is_collapsed).toBeFalsy();
    });
  });

  describe('getTabOfColumn method', () => {
    it('should return tab of tabs by name of column', () => {
      comp.tabs = config.list.tabs;
      let name = 'gender';
      let tab = comp.getTabOfColumn(name);
      expect(tab).toEqual(comp.tabs[0]);
    });
  });

  describe('updateMetadataByTabs method', () => {
    it('should add tab proporty for all column', () => {
      comp.config = config;
      spyOn(comp, 'getTabOfColumn');
      comp.updateMetadataByTabs(comp.config.list.columns);
      expect(comp.getTabOfColumn).toHaveBeenCalledTimes(5);
    });
  });

  describe('prepareData method', () => {
    it('should prepare data for body', async(() => {
      comp.config = config;
      comp.tabs = config.list.tabs;
      let body = [
        {
          id: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
          __str__: 'Test Testovich',
          content: [
            {
              id: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
              label: 'First Name',
              name: 'first_name',
              content: [
                {
                  rowId: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  key: 'first_name',
                  name: 'first_name',
                  type: 'static',
                  values: undefined,
                  value: null,
                  label: 'Test',
                  delim: undefined,
                  title: undefined,
                },
              ],
              contextMenu: [
                {
                  label: 'edit profile',
                  endpoint: 'endpoint',
                },
              ],
              tab: undefined,
            },
            {
              id: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
              label: 'Branch',
              name: 'branch',
              content: [
                {
                  rowId: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  key: 'branch',
                  name: undefined,
                  type: 'button',
                  values: undefined,
                  confirm: true,
                  options: {
                    label: 'Delete selected',
                    message: 'Are you sure?',
                    agree_label: 'Agree',
                    decline_label: 'Decline',
                  },
                  color: undefined,
                  text_color: undefined,
                  repeat: undefined,
                  list: true,
                  templateOptions: {
                    label: undefined,
                    icon: 'glob',
                    small: true,
                    mb: false,
                    p: true,
                    action: 'openMap',
                    text: 'master',
                  },
                  delim: undefined,
                  title: undefined,
                  fields: [
                    {
                      field: 'address.latitude',
                      type: 'input',
                      value: 12,
                    },
                    {
                      field: 'address.longitude',
                      type: 'input',
                      value: 13,
                    },
                  ],
                },
              ],
              contextMenu: undefined,
              tab: undefined,
            },
            {
              id: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
              label: 'Evaluate',
              name: 'evaluate',
              content: [
                {
                  rowId: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  key: 'evaluate',
                  name: 'id',
                  type: 'button',
                  values: undefined,
                  endpoint:
                    '/timesheets/8ffddc8b-058b-4d71-94fb-f95eed60cbf9/evaluate/',
                  confirm: undefined,
                  options: undefined,
                  color: 'warning',
                  text_color: undefined,
                  repeat: 5,
                  hidden: undefined,
                  replace_by: undefined,
                  list: true,
                  templateOptions: {
                    label: 'Evaluate',
                    icon: 'star',
                    small: true,
                    mb: false,
                    p: true,
                    action: 'evaluateCandidate',
                    text: '',
                  },
                  value: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  delim: undefined,
                  title: undefined,
                },
              ],
              contextMenu: undefined,
              tab: undefined,
            },
            {
              id: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
              label: 'Gender',
              name: 'gender',
              content: [
                {
                  rowId: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  key: 'gender',
                  name: 'gender',
                  type: 'text',
                  values: undefined,
                  value: null,
                  delim: undefined,
                  title: undefined,
                },
              ],
              tab: undefined,
            },
            {
              id: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
              label: 'Mobile Phone',
              name: 'phone_mobile',
              content: [
                {
                  rowId: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  key: 'phone_mobile',
                  name: 'phone_mobile',
                  type: 'link',
                  values: undefined,
                  link: 'tel:+380978107725',
                  text: '',
                  value: '+380978107725',
                  delim: undefined,
                  title: undefined,
                },
                {
                  rowId: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  key: 'phone_mobile',
                  name: 'email',
                  type: 'link',
                  values: undefined,
                  link: 'mailto:test.testovich@gmail.com',
                  text: '',
                  value: 'test.testovich@gmail.com',
                  delim: undefined,
                  title: undefined,
                },
                {
                  rowId: '8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  key: 'phone_mobile',
                  name: 'last_name',
                  type: 'link',
                  values: undefined,
                  endpoint: '/contacts/8ffddc8b-058b-4d71-94fb-f95eed60cbf9',
                  value: 'Testovich',
                  delim: undefined,
                  title: undefined,
                },
              ],
              contextMenu: [
                {
                  label: 'send',
                  endpoint: 'endpoint',
                },
              ],
              tab: undefined,
            },
          ],
          highlight: {
            highlight: true,
          },
        },
      ];
      spyOn(comp, 'getTabOfColumn').and.returnValue(undefined);
      let result = comp.prepareData(
        config.list.columns,
        data.results,
        config.list.highlight
      );
      expect(result).toEqual(result);
      expect(comp.evaluateEndpoint).toEqual('/timesheets/{id}/evaluate/');
    }));
  });

  describe('getSortedColumns method', () => {
    it('should return object with sorted columns', async(() => {
      let result = {
        first_name: 'asc',
        phone_mobile: 'desc',
        branch: 'asc',
      };
      expect(comp.getSortedColumns(config.list.columns)).toEqual(result);
    }));
  });

  describe('sorting method', () => {
    it('should change sorted columns', async(() => {
      let sortedCol = {};
      let field;
      comp.config = config;
      comp.sortedColumns = sortedCol;
      spyOn(comp.event, 'emit');
      spyOn(comp, 'sortTable');
      field = {
        name: 'first_name',
        sort_field: 'first_name',
        sorted: 'asc',
      };
      comp.sorting(field);
      expect(comp.sortedColumns).toEqual({ first_name: 'asc' });
      expect(field.sorted).toEqual('asc');
      comp.sorting(field);
      expect(comp.sortedColumns).toEqual({ first_name: 'desc' });
      expect(field.sorted).toEqual('desc');
      expect(comp.event.emit).toHaveBeenCalled();
      expect(comp.sortTable).toHaveBeenCalled();
    }));
  });

  describe('resetSort method', () => {
    it('should reset sort query', async(() => {
      let sortedCol = {};
      let field;
      comp.config = config;
      comp.sortedColumns = sortedCol;
      spyOn(comp.event, 'emit');
      field = {
        name: 'first_name',
        sorted: 'asc',
      };
      comp.sorting(field);
      comp.resetSort(field, true);
      expect(comp.sortedColumns).toEqual({});
      expect(field.sorted).toBeUndefined();
      expect(comp.event.emit).toHaveBeenCalled();
    }));
  });

  describe('updateSort method', () => {
    it('should update sort property', async(() => {
      comp.config = config;
      comp.updateSort(comp.config.list.columns, 'first_name', 'asc');
      expect(comp.config.list.columns[0].sorted).toEqual('asc');
    }));
  });

  describe('setValue method', () => {
    it('should set value from data', async(() => {
      let props = 'primary_contact.contact.__str__'.split('.');
      let values = {
        primary_contact: {
          contact: {
            __str__: 'Mr. Test Testovich',
          },
        },
        name: 'Home LTD',
      };
      let resultOne = {};
      let resultTwo = {};
      comp.setValue(values, props, resultOne);
      comp.setValue(values, ['name'], resultTwo);
      expect(resultOne['value']).toEqual('Mr. Test Testovich');
      expect(resultTwo['value']).toEqual('Home LTD');
    }));

    it('should set value from data', async(() => {
      let props = 'primary_contact.contact'.split('.');
      let values = {
        primary_contact: {
          contact: {
            __str__: 'Mr. Test Testovich',
          },
        },
      };
      let resultOne = {
        type: 'related',
      };
      comp.setValue(values, props, resultOne);
      expect(resultOne['value']).toEqual('Mr. Test Testovich');
    }));
  });

  describe('checkValue method', () => {
    it('should return true if some value exist', async(() => {
      let obj = {
        value: 'Some value',
        fields: [],
      };
      let result = comp.checkValue(obj);
      expect(result).toBeTruthy();
      obj = {
        value: '',
        fields: [
          {
            value: 'Some Value',
          },
        ],
      };
      let resultTwo = comp.checkValue(obj);
      expect(resultTwo).toBeTruthy();
    }));
  });

  describe('selectAll method', () => {
    it('should selected all items on list', async(() => {
      let select = {
        123: true,
        124: false,
      };
      comp.select = select;
      comp.selectedAll = true;
      comp.selectAll();
      expect(comp.select[123]).toBeTruthy();
      expect(comp.select[124]).toBeTruthy();
      comp.selectedAll = false;
      comp.selectAll();
      expect(comp.select[123]).toBeFalsy();
      expect(comp.select[124]).toBeFalsy();
    }));
  });

  describe('resetSelectedElements method', () => {
    it('should reset all selected elements', async(() => {
      let value = [{ id: 123 }, { id: 124 }];
      let select = {
        123: false,
        124: false,
      };
      comp.select = comp.resetSelectedElements(value);
      expect(comp.select).toEqual(select);
    }));
  });

  describe('actionHandler method', () => {
    it('should emit new action', async(() => {
      let event = {
        confirm: true,
        key: 'key of action',
        label: 'label of action',
        message: 'confirm message',
        query: 'delete',
        action: {
          endpoint: 'some endpoint',
        },
      };
      comp.config = config;
      spyOn(comp.event, 'emit');
      comp.actionHandler(event);
      expect(comp.actionEndpoint).toEqual(event.action.endpoint);
      expect(comp.event.emit).toHaveBeenCalled();
    }));
  });

  describe('filterHandler method', () => {
    it('should emit new filter', async(() => {
      let event = {
        list: 'company',
      };
      comp.config = config;
      spyOn(comp.event, 'emit');
      comp.filterHandler(event);
      expect(comp.event.emit).toHaveBeenCalled();
    }));
  });

  describe('openModal method', () => {
    it('should be defined', async(() => {
      expect(comp.openModal).toBeDefined();
    }));

    it('should open modal', async(() => {
      let field = {
        label: 'Company',
        endpoint: '/core/companyaddresses',
        type: 'form',
      };
      spyOn(comp, 'open');
      comp.openModal('modal', field);
      expect(comp.open).toHaveBeenCalled();
      expect(comp.modalInfo).toEqual(field);
    }));
  });

  describe('initPagination method', () => {
    it('should be defined', async(() => {
      expect(comp.initPagination).toBeDefined();
    }));

    it('should init pagination properties', async(() => {
      data.count = 1;
      comp.limit = 1;
      comp.offset = 0;
      comp.initPagination(data);
      expect(comp.page).toEqual(1);
      expect(comp.pageSize).toEqual(10);
    }));

    it('should open on page 2', async(() => {
      data.count = 10;
      comp.limit = 2;
      comp.offset = 2;
      comp.initPagination(data);
      expect(comp.page).toEqual(2);
      expect(comp.pageSize).toEqual(50);
    }));
  });

  describe('sortTable method', () => {
    it('should be defined', async(() => {
      expect(comp.sortTable).toBeDefined();
    }));

    it('should create query', async(() => {
      let sort = {
        primary_contact: 'desc',
      };
      let result = comp.sortTable(sort);
      expect(result).toEqual('ordering=-primary_contact');
    }));
  });

  describe('pageChange method', () => {
    it('should be defined', async(() => {
      expect(comp.pageChange).toBeDefined();
    }));

    it('should emit event', async(() => {
      comp.config = config;
      comp.limit = 2;
      comp.page = 2;
      spyOn(comp.event, 'emit');
      comp.pageChange();
      comp.page = 3;
      expect(comp.event.emit).toHaveBeenCalled();
    }));
  });

  describe('popedTable method', () => {
    it('should change poped property', async(
      inject([FilterService], (fs: FilterService) => {
        comp.config = config;
        comp.poped = false;
        spyOn(fs, 'getFiltersOfList');
        comp.popedTable();
        expect(comp.poped).toEqual(true);
        expect(fs.getFiltersOfList).toHaveBeenCalled();
      })
    ));
  });

  describe('unpopedTable method', () => {
    it('should unpoped table', async(() => {
      comp.config = config;
      comp.poped = true;
      comp.minimized = true;
      comp.maximize = true;
      comp.unpopedTable();
      expect(comp.poped).toEqual(false);
      expect(comp.minimized).toEqual(false);
      expect(comp.maximize).toEqual(false);
    }));
  });

  describe('minimizeTable method', () => {
    it('should change change minimized property', async(() => {
      comp.config = config;
      comp.minimized = false;
      comp.minimizeTable();
      expect(comp.minimized).toEqual(true);
    }));

    it('should emit event', async(() => {
      comp.config = config;
      spyOn(comp.event, 'emit');
      comp.minimizeTable();
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'minimize',
        list: config.list.list,
      });
    }));
  });

  describe('closeTable method', () => {
    it('should emit event ofclose table', async(
      inject([FilterService], (fs: FilterService) => {
        comp.config = config;
        spyOn(comp.event, 'emit');
        spyOn(fs, 'resetQueries');
        comp.closeTable();
        expect(comp.event.emit).toHaveBeenCalled();
        expect(fs.resetQueries).toHaveBeenCalled();
      })
    ));
  });

  describe('buttonHandler method', () => {
    it('should call openMap method', () => {
      let event = {
        value: 'openMap',
        el: {
          fields: [],
        },
      };
      spyOn(comp, 'openMap');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.openMap).toHaveBeenCalledWith(event.el.fields);
    });

    it('should call openList method', () => {
      let event = {
        value: 'openList',
        el: {
          endpoint: 'some endpoint',
        },
      };
      spyOn(comp, 'openList');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.openList).toHaveBeenCalledWith(event.el.endpoint, event.el);
    });

    it('should call openDiff method', () => {
      let event = {
        value: 'openDiff',
        el: {
          endpoint: 'some endpoint',
        },
      };
      spyOn(comp, 'openDiff');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.openDiff).toHaveBeenCalledWith(event.el.endpoint, event.el);
    });

    it('should call approveTimesheet method', () => {
      let event = {
        value: 'approveTimesheet',
        el: {
          endpoint: 'some endpoint',
        },
      };
      spyOn(comp, 'approveTimesheet');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.approveTimesheet).toHaveBeenCalledWith(event);
    });

    it('should call openForm method', () => {
      let event = {
        value: 'openForm',
      };
      spyOn(comp, 'openForm');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.openForm).toHaveBeenCalledWith(event);
    });

    it('should call changeTimesheet method', () => {
      let event = {
        value: 'changeTimesheet',
      };
      spyOn(comp, 'changeTimesheet');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.changeTimesheet).toHaveBeenCalledWith(event);
    });

    it('should call setAction method', () => {
      let event = {
        value: 'callAction',
      };
      spyOn(comp, 'setAction');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.setAction).toHaveBeenCalledWith(event);
    });

    it('should call evaluateCandidate method', () => {
      let event = {
        value: 'evaluateCandidate',
      };
      spyOn(comp, 'evaluate');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.evaluate).toHaveBeenCalledWith(event);
    });

    it('should call openFrame method', () => {
      let event = {
        value: 'sendSMS',
        el: {
          fields: [],
        },
      };
      spyOn(comp, 'openFrame');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.openFrame).toHaveBeenCalledWith(event.el.fields);
    });

    it('should call showPreview method', () => {
      let event = {
        value: 'previewInvoice',
      };
      spyOn(comp, 'showPreview');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.showPreview).toHaveBeenCalledWith(event);
    });

    it('should call printPDF method', () => {
      let event = {
        value: 'printInvoice',
      };
      spyOn(comp, 'printPDF');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.printPDF).toHaveBeenCalledWith(event);
    });

    it('should call delete method', () => {
      let event = {
        value: 'delete',
      };
      spyOn(comp, 'delete');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.delete).toHaveBeenCalledWith(event);
    });

    it('should call addForm method', () => {
      let event = {
        value: 'addForm',
      };
      spyOn(comp, 'addForm');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.addForm).toHaveBeenCalledWith(event);
    });

    it('should call editForm method', () => {
      let event = {
        value: 'editForm',
      };
      spyOn(comp, 'editForm');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.editForm).toHaveBeenCalledWith(event);
    });

    it('should call emptyPost method', () => {
      let event = {
        value: 'emptyPost',
      };
      spyOn(comp, 'post');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.post).toHaveBeenCalledWith(event);
    });

    it('should call showCandidateProfile method', () => {
      let event = {
        value: 'showCandidateProfile',
      };
      spyOn(comp, 'showCandidateProfile');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.showCandidateProfile).toHaveBeenCalledWith(event);
    });

    it('should call fillIn method', () => {
      let event = {
        value: 'fillin',
      };
      spyOn(comp, 'fillIn');
      comp.buttonHandler(event);
      expect(comp.modalInfo).toEqual({});
      expect(comp.fillIn).toHaveBeenCalledWith(event);
    });
  });

  describe('fillIn method', () => {
    it('should redirect on fillin form', async(
      inject([Router], (router: Router) => {
        spyOn(router, 'navigate');
        const event = {
          el: {
            rowId: '123',
          },
        };
        const url = `/hr/vacancies/${event.el.rowId}/fillin/`;
        comp.fillIn(event);
        expect(router.navigate).toHaveBeenCalledWith([url]);
      })
    ));
  });

  describe('showCandidateProfile method', () => {
    it('should open candidate profile', () => {
      const event = {
        el: {
          endpoint: '/candidate/candidate/123/',
        },
      };
      spyOn(comp, 'open');
      comp.showCandidateProfile(event);
      expect(comp.modalInfo).toEqual({
        type: 'profile',
        id: '123',
      });
      expect(comp.open).toHaveBeenCalled();
    });
  });

  describe('openForm method', () => {
    it('should prepareData for form', () => {
      let event = {
        el: {
          endpoint: 'some endpoint',
          value: 'Invoice',
        },
      };
      spyOn(comp, 'open');
      comp.modal = {};
      comp.openForm(event);
      expect(comp.modalInfo).toEqual({
        type: 'form',
        endpoint: event.el.endpoint,
        label: event.el.value,
      });
      expect(comp.open).toHaveBeenCalledWith(comp.modal, { size: 'lg' });
    });
  });

  describe('setAction method', () => {
    it('should call callAction method', () => {
      let event = {
        el: {
          endpoint: 'some endpoint',
        },
      };
      spyOn(comp, 'callAction');
      comp.setAction(event);
      expect(comp.modalInfo).toEqual({
        type: 'action',
        endpoint: event.el.endpoint,
      });
      expect(comp.callAction).toHaveBeenCalledWith(comp.modalInfo);
    });

    it('should call open method', () => {
      let event = {
        el: {
          endpoint: 'some endpoint',
          confirm: true,
          options: {
            message: 'Are you sure?',
            agree_label: 'Agree',
            decline_label: 'Decline',
          },
        },
      };
      comp.confirmModal = {};
      spyOn(comp, 'open');
      comp.setAction(event);
      expect(comp.modalInfo).toEqual({
        type: 'action',
        endpoint: event.el.endpoint,
        message: event.el.options.message,
        agree_label: event.el.options.agree_label,
        decline_label: event.el.options.decline_label,
      });
      expect(comp.open).toHaveBeenCalledWith(comp.confirmModal);
    });
  });

  describe('callAction method', () => {
    it('should call action', () => {
      let modal = {
        closeModal() {
          return true;
        },
      };
      let modalInfo = {
        endpoint: 'some endpoint',
      };
      comp.config = config;
      spyOn(modal, 'closeModal');
      spyOn(comp.event, 'emit');
      comp.callAction(modalInfo, modal.closeModal);
      expect(modal.closeModal).toHaveBeenCalled();
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'update',
        list: comp.config.list.list,
      });
    });
  });

  describe('openMap method', () => {
    it('should show map on modal', async(() => {
      spyOn(comp, 'open');
      let value = [
        {
          field: 'address.latitude',
          value: 12,
        },
        {
          field: 'address.longitude',
          value: 13,
        },
      ];
      let result = {
        type: 'map',
        latitude: 12,
        longitude: 13,
      };
      comp.modal = {};
      comp.openMap(value);
      expect(comp.modalInfo).toEqual(result);
      expect(comp.open).toHaveBeenCalled();
    }));
  });

  describe('evaluate method', () => {
    it('should set data for evaluation booking', () => {
      let event = {
        el: {
          rowId: 123,
          endpoint: '/contacts/',
        },
      };
      let mockData = {
        results: [
          {
            id: 123,
            picture: {
              thumb: 'imageSrc',
            },
            vacancy_offer: {
              candidate_contact: {
                contact: {
                  __str__: 'Mr. Tom Smith',
                },
              },
            },
          },
        ],
      };
      comp.evaluateModal = {};
      comp.data = mockData;
      comp.responseField = 'results';
      spyOn(comp, 'open');
      comp.evaluate(event);
      expect(comp.modalInfo).toEqual({
        type: 'evaluate',
        needData: false,
        edit: true,
        endpoint: event.el.endpoint,
        label: {
          picture: mockData.results[0].picture.thumb,
          name: mockData.results[0].vacancy_offer.candidate_contact.contact
            .__str__,
        },
      });
      expect(comp.open).toHaveBeenCalledWith(comp.evaluateModal);
    });

    it('should set default picture for modal window', () => {
      let event = {
        el: {
          rowId: 123,
          endpoint: '/contacts/',
        },
      };
      let mockData = {
        results: [
          {
            id: 123,
            picture: null,
            vacancy_offer: {
              candidate_contact: {
                contact: {
                  __str__: 'Mr. Tom Smith',
                },
              },
            },
          },
        ],
      };
      comp.evaluateModal = {};
      comp.data = mockData;
      comp.responseField = 'results';
      spyOn(comp, 'open');
      comp.evaluate(event);
      expect(comp.modalInfo).toEqual({
        type: 'evaluate',
        needData: false,
        edit: true,
        endpoint: event.el.endpoint,
        label: {
          picture: '/assets/img/avatar.png',
          name: mockData.results[0].vacancy_offer.candidate_contact.contact
            .__str__,
        },
      });
      expect(comp.open).toHaveBeenCalledWith(comp.evaluateModal);
    });
  });

  describe('changeTimesheet method', () => {
    it('should open modal for change timesheet', () => {
      let event = {
        el: {
          rowId: 123,
          endpoint: '/contacts/',
        },
      };
      let mockData = {
        results: [
          {
            id: 123,
            picture: null,
            shift_started_at: '2017-09-21T07:00:00+10:00',
            break_started_at: '2017-09-21T12:00:00+10:00',
            break_ended_at: '2017-09-21T12:30:00+10:00',
            shift_ended_at: '2017-09-21T15:30:00+10:00',
            supervisor: '',
            position: '',
            company: '',
            jobsite: '',
            vacancy_offer: {
              candidate_contact: {
                contact: {
                  __str__: 'Mr. Tom Smith',
                },
              },
            },
          },
        ],
      };
      comp.evaluateModal = {};
      comp.responseField = 'results';
      comp.data = mockData;
      spyOn(comp, 'open');
      comp.changeTimesheet(event);
      expect(comp.modalInfo).toEqual({
        type: 'evaluate',
        needData: false,
        edit: true,
        endpoint: event.el.endpoint,
        data: {
          shift_started_at: {
            action: 'add',
            data: {
              value: mockData.results[0].shift_started_at,
            },
          },
          break_started_at: {
            action: 'add',
            data: {
              value: mockData.results[0].break_started_at,
            },
          },
          break_ended_at: {
            action: 'add',
            data: {
              value: mockData.results[0].break_ended_at,
            },
          },
          shift_ended_at: {
            action: 'add',
            data: {
              value: mockData.results[0].shift_ended_at,
            },
          },
          supervisor: {
            action: 'add',
            data: {
              value: mockData.results[0].supervisor,
            },
          },
          position: {
            action: 'add',
            data: {
              value: mockData.results[0].position,
            },
          },
          company: {
            action: 'add',
            data: {
              value: mockData.results[0].company,
            },
          },
          jobsite: {
            action: 'add',
            data: {
              value: mockData.results[0].jobsite,
            },
          },
        },
        label: {
          picture: '/assets/img/avatar.png',
          name: mockData.results[0].vacancy_offer.candidate_contact.contact
            .__str__,
        },
      });
      expect(comp.open).toHaveBeenCalledWith(comp.evaluateModal, {
        size: 'lg',
      });
    });
  });

  describe('approveTimesheet method', () => {
    it('should open modal for approve timesheet', () => {
      let event = {
        el: {
          rowId: 123,
          endpoint: '/contacts/',
        },
      };
      let mockData = {
        results: [
          {
            id: 123,
            picture: null,
            vacancy_offer: {
              candidate_contact: {
                contact: {
                  __str__: 'Mr. Tom Smith',
                },
              },
            },
          },
        ],
      };
      comp.evaluateModal = {};
      comp.responseField = 'results';
      comp.data = mockData;
      spyOn(comp, 'evaluate');
      spyOn(comp, 'format');
      comp.approveTimesheet(event);
      expect(comp.evaluate).toHaveBeenCalled();
      expect(comp.format).toHaveBeenCalled();
      expect(comp.approveEndpoint).toEqual('/contacts/');
    });
  });

  describe('openFrame method', () => {
    it('should prepare query and call open method', () => {
      let event = [
        '+380984532345',
        {
          value: '+380984532345',
        },
      ];
      comp.sendMessageModal = {};
      comp.modalInfo = {};
      spyOn(comp, 'open');
      comp.openFrame(event);
      expect(comp.modalInfo).toEqual({
        url: undefined,
      });
      expect(comp.open).toHaveBeenCalledWith(comp.sendMessageModal);
    });
  });

  describe('eventHandler method', () => {
    it('should open modal', async(() => {
      comp.config = config;
      let event = {
        target: 'form',
        endpoint: '/',
        label: 'Modal label',
        id: 'element id',
      };
      let result = {
        type: 'form',
        endpoint: '/',
        label: 'Modal label',
        id: 'element id',
      };
      spyOn(comp, 'open');
      comp.eventHandler(event);
      expect(comp.modalInfo).toEqual(result);
      expect(comp.open).toHaveBeenCalled();
    }));
  });

  describe('addObject method', () => {
    it('should open modal for create new object', () => {
      comp.config = config;
      comp.endpoint = '/companies/';
      comp.addObject();
      expect(comp.modalInfo).toEqual({
        type: 'form',
        endpoint: comp.endpoint,
        label: `Add ${config.list.label}`,
      });
    });
  });

  describe('editObject method', () => {
    it('should open modal for edit object', () => {
      let id = '123';
      let label = 'Edit';
      comp.endpoint = 'some edpoint';
      spyOn(comp, 'open');
      comp.editObject(id, label);
      expect(comp.modalInfo).toEqual({
        type: 'form',
        endpoint: comp.endpoint,
        label,
        id,
      });
      expect(comp.open).toHaveBeenCalled();
    });

    it('should open modal for edit object with "Edit" label', () => {
      let id = '123';
      comp.endpoint = 'some edpoint';
      spyOn(comp, 'open');
      comp.editObject(id);
      expect(comp.modalInfo).toEqual({
        type: 'form',
        endpoint: comp.endpoint,
        label: 'Edit',
        id,
      });
      expect(comp.open).toHaveBeenCalled();
    });
  });

  describe('activeTable method', () => {
    it('should emit event', async(() => {
      comp.poped = true;
      comp.config = config;
      spyOn(comp.event, 'emit');
      comp.activeTable({});
      expect(comp.event.emit).toHaveBeenCalled();
    }));
  });

  describe('addHighlight method', () => {
    it('should added property highlight into row', async(() => {
      let field = config.list.highlight.field;
      let elem = data.results[0];
      let row = {
        highlight: undefined,
      };
      let values = config.list.highlight.values;
      comp.addHighlight(field, elem, row, values);
      expect(row.highlight).toBeTruthy();
    }));

    it('should add object with color for highlight', async(() => {
      let field = 'is_available';
      let elem = data.results[0];
      let row = {
        highlight: undefined,
      };
      let values = {
        true: 'green',
      };
      comp.addHighlight(field, elem, row, values);
      expect(row.highlight.color).toEqual('green');
    }));
  });

  describe('openList method', () => {
    it('should be defined', async(() => {
      expect(comp.openList).toBeDefined();
    }));

    it('should open new list', async(() => {
      let endpoint = 'some endpoint';
      spyOn(comp.list, 'emit');
      comp.openList(endpoint);
      expect(comp.list.emit).toHaveBeenCalledWith({ endpoint });
    }));
  });

  describe('openDiff method', () => {
    it('should be defined', async(() => {
      expect(comp.openList).toBeDefined();
    }));

    it('should open new list', async(() => {
      comp.innerTableCall = {};
      let elem = {
        rowId: '124',
        key: 'diff',
      };
      let endpoint = 'some endpoint';
      comp.config = config;
      spyOn(comp.list, 'emit');
      comp.openDiff(endpoint, elem);
      expect(comp.list.emit).toHaveBeenCalledWith({
        endpoint,
        innerTable: true,
        list: config.list.list,
        key: elem.key,
        row: elem.rowId,
      });
    }));
  });

  describe('format method', () => {
    it('should be defined', async(() => {
      expect(comp.format).toBeDefined();
    }));

    it('should return full string', async(() => {
      let dataFromApi = {
        company: {
          name: 'Home LTD',
        },
      };
      let value = 'some string';
      let result = comp.format(value, dataFromApi);
      expect(result).toEqual(value);
    }));

    it('should call getPropValue method', async(() => {
      let dataFromApi = {
        company: {
          name: 'Home LTD',
        },
      };
      let key = 'company.name';
      let value = `full company name {${key}}`;
      spyOn(comp, 'getPropValue').and.returnValue('Home LTD');
      let result = comp.format(value, dataFromApi);
      expect(comp.getPropValue).toHaveBeenCalledWith(dataFromApi, key);
      expect(result).toEqual('full company name Home LTD');
    }));
  });

  describe('getPropValue method', () => {
    it('should be defined', async(() => {
      expect(comp.getPropValue).toBeDefined();
    }));

    it('should parse data by key', async(() => {
      let dataFromApi = {
        company: {
          name: 'Home LTD',
        },
      };
      let key = 'company.name';
      let result = comp.getPropValue(dataFromApi, key);
      expect(result).toEqual(dataFromApi.company.name);
    }));
  });

  describe('formEvent method', () => {
    it('should update listafter edit element', () => {
      let event = {
        type: 'sendForm',
        status: 'success',
      };
      let test = {
        closeModal() {
          return true;
        },
      };
      comp.config = config;
      spyOn(comp.event, 'emit');
      spyOn(test, 'closeModal');
      comp.formEvent(event, test.closeModal);
      expect(test.closeModal).toHaveBeenCalled();
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'update',
        list: config.list.list,
      });
    });
  });

  describe('evaluateEvent method', () => {
    it('should emit event for update list', () => {
      const event = {
        type: 'sendForm',
        status: 'success',
      };
      const modal = {
        closeModal() {
          return true;
        },
      };
      comp.config = Object.assign({}, config);
      comp.approveEndpoint = 'some endpoint';
      spyOn(comp.event, 'emit');
      spyOn(modal, 'closeModal');
      comp.evaluateEvent(event, modal.closeModal);
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'update',
        list: comp.config.list.list,
      });
      expect(modal.closeModal).toHaveBeenCalled();
      expect(comp.approveEndpoint).toBeNull();
    });

    it('should call formEvent method', () => {
      const event = {
        type: 'sendForm',
        status: 'success',
      };
      const modal = {
        closeModal() {
          return true;
        },
      };
      comp.approveEndpoint = undefined;
      spyOn(comp, 'formEvent');
      spyOn(modal, 'closeModal');
      comp.evaluateEvent(event, modal.closeModal);
      expect(modal.closeModal).toHaveBeenCalled();
      expect(comp.formEvent).toHaveBeenCalledWith(event, modal.closeModal);
    });
  });

  describe('buttonAction method', () => {
    it('should call add_object action', () => {
      let event = {
        type: 'add_object',
      };
      spyOn(comp, 'addObject');
      comp.buttonAction(event);
      expect(comp.addObject).toHaveBeenCalled();
    });

    it('should call poped_table action', () => {
      let event = {
        type: 'poped_table',
      };
      spyOn(comp, 'popedTable');
      comp.buttonAction(event);
      expect(comp.popedTable).toHaveBeenCalled();
    });

    it('should call openMap action', () => {
      let event = {
        type: 'openMap',
      };
      spyOn(comp, 'showMap');
      comp.buttonAction(event);
      expect(comp.showMap).toHaveBeenCalled();
    });
  });

  describe('showMap method', () => {
    it('should open map', () => {
      spyOn(comp, 'generateDataForFillInMap');
      spyOn(comp, 'open');
      comp.showMap();
      expect(comp.generateDataForFillInMap).toHaveBeenCalled();
      expect(comp.open).toHaveBeenCalled();
    });
  });

  describe('generateDataForFillInMap method', () => {
    it('should generate modal data', () => {
      comp.data = {
        candidates: [
          {
            latitude: 0,
            longitude: 0,
            contact: {
              address: {
                __str__: 'Baker Street',
              },
              __str__: 'Mr. Test Testovich',
            },
          },
        ],
        vacancy: {
          latitude: 0,
          longitude: 0,
          __str__: 'Home Street',
          address: 'Home Street',
        },
      };
      comp.responseField = 'candidates';
      comp.supportData = 'vacancy';
      const formData = {};
      comp.generateDataForFillInMap(formData);
      expect(formData).toEqual({
        markers: [
          {
            latitude: NaN,
            longitude: NaN,
            name: 'Mr. Test Testovich',
            description: 'Baker Street',
          },
          {
            latitude: 0,
            longitude: 0,
            name: 'Home Street',
            description: 'Home Street',
          },
        ],
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('showPreview method', () => {
    it('should open modal preview', () => {
      let e = {
        el: {
          endpoint: 'some endpoint',
        },
      };
      response = 'prf url';
      spyOn(comp, 'open');
      comp.showPreviewInvoice = {};
      comp.showPreview(e);
      expect(comp.open).toHaveBeenCalledWith(comp.showPreviewInvoice, {
        size: 'lg',
      });
    });
  });

  describe('printPDF method', () => {
    it('should open modal for print pdf file', () => {
      let e = {
        el: {
          endpoint: 'some endpoint',
        },
      };
      response = 'prf url';
      spyOn(comp, 'open');
      comp.sendMessageModal = {};
      comp.printPDF(e);
      expect(comp.open).toHaveBeenCalledWith(comp.sendMessageModal, {
        size: 'lg',
      });
    });
  });

  describe('delete method', () => {
    it('should delete element from list', () => {
      const event = {
        el: {
          rowId: '123',
        },
      };
      comp.config = Object.assign({}, config);
      comp.endpoint = 'some endpoint';
      spyOn(comp.event, 'emit');
      comp.delete(event);
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'update',
        list: comp.config.list.list,
      });
    });
  });

  describe('editForm method', () => {
    it('should prepare data for edit object', () => {
      const event = {
        el: {
          id: '123',
          endpoint: '/contacts/123/',
        },
      };
      comp.config = Object.assign({}, config);
      comp.modal = {};
      spyOn(comp, 'open');
      comp.editForm(event);
      expect(comp.modalInfo).toEqual({
        type: 'form',
        endpoint: '/contacts/123/',
        mode: 'edit',
        edit: true,
      });
      expect(comp.open).toHaveBeenCalled();
    });
  });

  describe('addForm method', () => {
    it('should prepare data for add object', () => {
      const event = {
        el: {
          endpoint: 'some endpoint',
        },
      };
      comp.config = Object.assign({}, config);
      comp.endpoint = 'some endpoint';
      comp.modal = {};
      spyOn(comp, 'open');
      comp.addForm(event);
      expect(comp.modalInfo).toEqual({
        type: 'form',
        endpoint: comp.endpoint,
      });
      expect(comp.open).toHaveBeenCalled();
    });
  });

  describe('post method', () => {
    it('should send post data', () => {
      const event = {
        el: {
          endpoint: 'some endpoint',
        },
      };
      comp.config = Object.assign({}, config);
      spyOn(comp.event, 'emit');
      comp.post(event);
      expect(comp.event.emit).toHaveBeenCalled();
    });
  });
});
