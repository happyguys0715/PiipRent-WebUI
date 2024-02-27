import { Observable } from 'rxjs/Observable';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { GenericListComponent } from './generic-list.component';
import { GenericFormService } from './../../services/generic-form.service';
import { FilterService } from './../../services/filter.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('GenericListComponent', () => {
  let fixture: ComponentFixture<GenericListComponent>;
  let comp: GenericListComponent;
  let el;
  let metadata = {};
  let data;
  let mockGenericFormService = {
    getMetadata() {
      return Observable.of(metadata);
    },
    getAll() {
      return Observable.of(data);
    },
    getByQuery() {
      return Observable.of(data);
    },
    callAction() {
      return Observable.of(data);
    },
  };
  let mockFilterService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericListComponent],
      providers: [
        { provide: GenericFormService, useValue: mockGenericFormService },
        { provide: FilterService, useValue: mockFilterService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([])],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(GenericListComponent);
      comp = fixture.componentInstance;
    });
  }));

  describe('ngOnInit method', () => {
    it('should be defined', async(() => {
      expect(comp.ngOnInit).toBeDefined();
    }));

    it('should create first table', async(() => {
      let endpoint = 'endpoint';
      metadata = {
        list: {
          list: 'company',
        },
      };
      let newTable = {
        endpoint,
        innerTables: {},
        fisrt: true,
        query: {},
      };
      comp.endpoint = endpoint;
      comp.tables = [];
      comp.update = new BehaviorSubject(true);
      spyOn(comp, 'createTableData').and.returnValue(newTable);
      spyOn(comp.tables, 'push');
      spyOn(comp, 'getFirstTable').and.returnValue(newTable);
      spyOn(comp, 'getData');
      comp.ngOnInit();
      expect(comp.tables.push).toHaveBeenCalledWith(newTable);
      expect(comp.createTableData).toHaveBeenCalledWith(endpoint);
      expect(comp.getFirstTable).toHaveBeenCalled();
      expect(comp.getData).toHaveBeenCalled();
    }));
  });

  describe('getMetadata method', () => {
    it('should be defined', async(() => {
      expect(comp.getMetadata).toBeDefined();
    }));

    it('should update metadata property', async(() => {
      let table: any = { first: true };
      metadata = {
        list: {
          list: 'companies',
        },
        fields: [
          {
            type: 'checkbox',
            key: 'is_available',
            templateOptions: {
              label: 'test',
              type: 'checkbox',
              required: true,
            },
          },
        ],
      };
      let endpoint = 'endpoint';
      spyOn(comp, 'parseUrl');
      spyOn(comp, 'getTable').and.returnValue(table);
      spyOn(comp, 'prepareSortQuery');
      spyOn(comp, 'getSortedFields');
      comp.tables.push(table);
      comp.getMetadata(endpoint, table);
      expect(table.metadata).toEqual(metadata);
      expect(table.list).toEqual('companies');
      expect(table.id).toEqual(1);
      expect(comp.existingIds).toEqual([1]);
      expect(comp.tableId).toEqual(2);
      expect(comp.getTable).toHaveBeenCalledWith(table.list);
      expect(comp.parseUrl).toHaveBeenCalledWith({}, table.list);
      expect(comp.prepareSortQuery).toHaveBeenCalled();
      expect(comp.getSortedFields).toHaveBeenCalled();
    }));

    it('should update metadata for subtables', async(() => {
      let table: any = { first: false };
      metadata = {
        list: {
          list: 'companies',
        },
        fields: [
          {
            type: 'checkbox',
            key: 'is_available',
            templateOptions: {
              label: 'test',
              type: 'checkbox',
              required: true,
            },
          },
        ],
      };
      let endpoint = 'endpoint';
      comp.limit = 1;
      comp.tables.push(table);
      spyOn(comp, 'prepareSortQuery');
      spyOn(comp, 'getSortedFields');
      comp.getMetadata(endpoint, table, false, table);
      expect(table.metadata).toEqual(metadata);
      expect(table.metadata.list.list).toEqual('companies1');
      expect(table.list).toEqual('companies1');
      expect(table.id).toEqual(1);
      expect(table.limit).toEqual(comp.limit);
      expect(table.offset).toEqual(0);
      expect(comp.existingIds).toEqual([1]);
      expect(comp.tableId).toEqual(2);
      expect(comp.prepareSortQuery).toHaveBeenCalled();
      expect(comp.getSortedFields).toHaveBeenCalled();
      setTimeout(() => {
        expect(table.update).toEqual(metadata);
      }, 310);
    }));
  });

  describe('getSortedFields method', () => {
    it('should return object with sorted fields', () => {
      const columns = [{ sort: true, sorted: 'desc', sort_field: 'contact' }];
      let result = comp.getSortedFields(columns);
      expect(result).toEqual({
        contact: 'desc',
      });
    });
  });

  describe('prepareSortQuery method', () => {
    it('should return ordering query', () => {
      const sorted = {
        contact: 'desc',
        date: 'asc',
      };
      let result = comp.prepareSortQuery(sorted);
      expect(result).toEqual('ordering=-contact,date');
    });
  });

  describe('getData method', () => {
    it('should be defined', async(() => {
      expect(comp.getData).toBeDefined();
    }));

    it('should update data property of first table', () => {
      let table: any = { first: true };
      data = {
        results: [
          {
            name: 'Home LTD',
            id: 123,
          },
        ],
      };
      let endpoint = 'endpoint';
      spyOn(comp, 'calcPagination');
      spyOn(comp, 'getMetadata');
      spyOn(comp.dataLength, 'emit');
      comp.getData(endpoint, null, table, true);
      expect(comp.calcPagination).toHaveBeenCalledWith(data);
      expect(comp.getMetadata).toHaveBeenCalledWith(endpoint, table);
      expect(comp.dataLength.emit).toHaveBeenCalled();
      expect(table.refresh).toBeFalsy();
    });

    it('should update data property', fakeAsync(() => {
      let table: any = {};
      data = {
        results: [
          {
            name: 'Home LTD',
            id: 123,
          },
        ],
      };
      let endpoint = 'endpoint';
      spyOn(comp, 'calcPagination');
      spyOn(comp.dataLength, 'emit');
      comp.getData(endpoint, null, table, false, table);
      expect(table.data).toEqual(data);
      expect(comp.calcPagination).toHaveBeenCalledWith(data);
      expect(comp.dataLength.emit).toHaveBeenCalled();
      expect(table.refresh).toBeFalsy();
      tick(200);
      expect(table.update).toEqual(data);
    }));

    it('should update data by query', fakeAsync(() => {
      let table: any = {};
      let query = '?active=true';
      comp.query = 'type=master';
      data = {
        results: [
          {
            name: 'Home',
            id: 125,
          },
        ],
      };
      let endpoint = 'endpoint';
      spyOn(comp, 'calcPagination');
      spyOn(comp.dataLength, 'emit');
      comp.getData(endpoint, query, table, false, table);
      expect(table.data).toEqual(data);
      expect(comp.calcPagination).toHaveBeenCalledWith(data);
      expect(comp.dataLength.emit).toHaveBeenCalled();
      expect(table.refresh).toBeFalsy();
      tick(200);
      expect(table.update).toEqual(data);
    }));
  });

  describe('calcPagination method', () => {
    it('should be defined', async(() => {
      expect(comp.calcPagination).toBeDefined();
    }));

    it('should call calcLimit method', async(() => {
      comp.limit = null;
      data = {
        count: 1,
        results: [
          {
            name: 'Home LTD',
            id: 123,
          },
        ],
      };
      spyOn(comp, 'calcLimit').and.returnValue(false);
      comp.calcPagination(data);
      expect(comp.count).toEqual(data.count);
      expect(comp.limit).toBeNull();
      expect(comp.calcLimit).toHaveBeenCalledWith(
        data.count,
        data.results.length
      );
    }));

    it('should call updateTables method', async(() => {
      comp.limit = null;
      data = {
        count: 2,
        results: [
          {
            name: 'Home LTD',
            id: 123,
          },
        ],
      };
      spyOn(comp, 'updateTables');
      comp.calcPagination(data);
      expect(comp.count).toEqual(data.count);
      expect(comp.limit).toEqual(1);
      expect(comp.updateTables).toHaveBeenCalledWith('limit');
    }));
  });

  describe('calcLimit method', () => {
    it('should be defined', async(() => {
      expect(comp.calcLimit).toBeDefined();
    }));

    it('should return integer', async(() => {
      let count = 2;
      let length = 1;
      let result = comp.calcLimit(count, length);
      expect(result).toEqual(1);
    }));

    it('should return null', async(() => {
      let count = 2;
      let length = 2;
      let result = comp.calcLimit(count, length);
      expect(result).toBeNull();
    }));
  });

  describe('updateTables method', () => {
    it('should be defined', async(() => {
      expect(comp.updateTables).toBeDefined();
    }));

    it('should update all tables on page', async(() => {
      let tables = [
        {
          first: true,
          id: 0,
          list: 'companyaddress',
        },
        {
          id: 1,
          list: 'companyaddresslog',
        },
      ];
      comp.tables = tables;
      comp.limit = 2;
      comp.updateTables('limit');
      expect(comp.tables[0].limit).toEqual(2);
      expect(comp.tables[1].limit).toEqual(2);
    }));
  });

  describe('eventHandler method', () => {
    it('should be defined', async(() => {
      expect(comp.eventHandler).toBeDefined();
    }));

    it('should update queries of list', async(() => {
      spyOn(comp, 'updateUrl');
      let event = {
        type: 'sort',
        list: 'company',
        query: 'company.name=Home',
      };
      comp.tables = [];
      comp.tables.push({ list: event.list, first: true });
      comp.eventHandler(event);
      expect(comp.updateUrl).toHaveBeenCalled();
      expect(comp.getTable(event.list).query).toEqual({
        [event.type]: event.query,
      });
    }));

    it('should remove table', async(() => {
      let event = {
        type: 'close',
        list: 'company',
      };
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: true,
      };
      comp.tables = [];
      comp.tables.push(table);
      comp.eventHandler(event);
      expect(comp.tables).toEqual([]);
    }));

    it('should set active table', async(() => {
      let event = {
        type: 'active',
        list: 'company',
      };
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: true,
        active: false,
      };
      comp.tables = [];
      comp.tables.push(table);
      spyOn(comp, 'resetActiveTable');
      comp.eventHandler(event);
      expect(table.active).toBeTruthy();
      expect(comp.resetActiveTable).toHaveBeenCalled();
    }));

    it('should call action', async(() => {
      let event = {
        type: 'action',
        list: 'company',
        data: [123, 124],
        action: {
          endpoint: 'some endpoint',
        },
      };
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: true,
        active: false,
      };
      comp.tables = [];
      comp.tables.push(table);
      spyOn(comp, 'callAction');
      comp.eventHandler(event);
      expect(comp.callAction).toHaveBeenCalledWith(
        event.data,
        event.action.endpoint,
        table,
        event
      );
    }));

    it('should update data of table', async(() => {
      let event = {
        type: 'pagination',
        list: 'company',
        query: 'limit=6&offset=4',
      };
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: false,
        offset: undefined,
        innerTables: <any>{ 1: { 1: {} } },
      };
      comp.tables = [];
      comp.tables.push(table);
      spyOn(comp, 'getData');
      spyOn(comp, 'getTable').and.returnValue(table);
      spyOn(comp, 'generateQuery');
      comp.eventHandler(event);
      expect(comp.getData).toHaveBeenCalled();
      expect(comp.getTable).toHaveBeenCalledWith(table.list);
      expect(comp.generateQuery).toHaveBeenCalledWith({
        pagination: event.query,
      });
      expect(table.offset).toEqual('4');
      expect(table.innerTables).toEqual({});
    }));

    it('should update minimizedTables property', async(() => {
      let event = {
        type: 'minimize',
        list: 'company',
      };
      let table = {
        list: 'company',
        minimized: false,
        maximize: true,
      };
      comp.tables = [];
      comp.tables.push(table);
      comp.minimizedTable = [];
      comp.eventHandler(event);
      expect(table.minimized).toBeTruthy();
      expect(table.maximize).toBeFalsy();
      expect(comp.minimizedTable.length).toEqual(1);
    }));

    it('should call updateUrl method with true', async(() => {
      let event = {
        type: 'filter',
        list: 'company',
        query: 'some query',
      };
      let table = {
        list: 'company',
        first: true,
        query: { filter: 'some value' },
      };
      comp.tables = [];
      comp.tables.push(table);
      spyOn(comp, 'updateUrl');
      comp.eventHandler(event);
      expect(comp.updateUrl).toHaveBeenCalledWith(
        table.query,
        event.list,
        true
      );
    }));

    it('should update list', async(() => {
      let event = {
        type: 'update',
        list: 'company',
      };
      let table = {
        list: 'company',
        first: true,
        query: {},
      };
      comp.tables = [];
      comp.tables.push(table);
      spyOn(comp, 'getData');
      comp.eventHandler(event);
      expect(comp.getData).toHaveBeenCalled();
    }));
  });

  describe('action method', () => {
    it('should be defined', async(() => {
      expect(comp.action).toBeDefined();
    }));

    it('should set minimized prop to false', async(() => {
      let table = {
        list: 'company',
        minimized: true,
      };
      comp.action('minimize', table);
      expect(table.minimized).toBeFalsy();
    }));

    it('should set maximize prop to true', async(() => {
      let table = {
        list: 'company',
        maximize: false,
      };
      comp.action('maximize', table);
      expect(table.maximize).toBeTruthy();
    }));

    it('should remove table from page', async(() => {
      let table = {
        list: 'company',
        minimize: false,
      };
      comp.tables.push(table);
      comp.minimizedTable.push(table);
      comp.action('close', table);
      expect(comp.tables.length).toEqual(0);
      expect(comp.minimizedTable.length).toEqual(0);
    }));
  });

  describe('generateQuery method', () => {
    it('should be defined', async(() => {
      expect(comp.generateQuery).toBeDefined();
    }));

    it('should generate query', async(() => {
      let table = {
        list: 'company',
        query: {
          sort: 'company.name=Home',
          pagination: 'limit=2&offset=2',
        },
      };
      let result = comp.generateQuery(table.query);
      expect(result).toEqual(`?${table.query.sort}&${table.query.pagination}`);
    }));

    it('should add new queries', async(() => {
      let table = {
        list: 'company',
        query: {
          sort: 'company.name=Home',
          pagination: 'limit=2&offset=2',
        },
      };
      comp.endpoint = '/contacts/?company=123';
      let result = comp.generateQuery(table.query);
      expect(result).toEqual(`&${table.query.sort}&${table.query.pagination}`);
    }));
  });

  describe('createTableData method', () => {
    it('should be defined', async(() => {
      expect(comp.createTableData).toBeDefined();
    }));

    it('should create first table', async(() => {
      let endpoint = 'endpoint';
      spyOn(comp, 'getData').and.returnValue({ results: [] });
      let result = comp.createTableData(endpoint);
      expect(comp.getData).toHaveBeenCalledWith(
        endpoint,
        null,
        {
          endpoint,
          innerTables: {},
          first: true,
        },
        true
      );
      expect(result).toEqual(<any>{
        endpoint,
        innerTables: {},
        first: true,
      });
      expect(comp.first).toBeTruthy();
    }));

    it('should create table', async(() => {
      let endpoint = 'endpoint';
      let table = {
        endpoint,
        innerTables: {},
        parentEndpoint: '/ecore/',
      };
      spyOn(comp, 'getMetadata');
      spyOn(comp, 'getData');
      spyOn(comp, 'getFirstTable').and.returnValue({ endpoint: '/ecore/' });
      comp.first = true;
      let result = comp.createTableData(endpoint);
      expect(comp.getMetadata).toHaveBeenCalledWith(endpoint, table);
      expect(comp.getData).toHaveBeenCalledWith(endpoint, null, table);
      expect(result).toEqual(table);
    }));
  });

  describe('getTable method', () => {
    it('should return table from tables', async(() => {
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: true,
      };
      comp.tables.push(table);
      let result = comp.getTable('company');
      expect(result).toEqual(table);
    }));
  });

  describe('getFirstTable method', () => {
    it('should return first table', () => {
      let table = {
        first: true,
      };
      comp.tables.push(table);
      let result = comp.getFirstTable();
      expect(result).toEqual(table);
    });
  });

  describe('resetActiveTable method', () => {
    it('should reset active property of all tables', async(() => {
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: true,
        active: true,
      };
      comp.tables.push(table);
      comp.resetActiveTable(comp.tables);
      expect(comp.tables[0].active).toBeFalsy();
    }));
  });

  describe('listHandler method', () => {
    it('should reset active property of all tables', async(() => {
      let event = {
        endpoint: 'another endpoint',
      };
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: true,
        active: true,
      };
      comp.tables.push(table);
      spyOn(comp, 'createTableData').and.returnValue({});
      spyOn(comp, 'checkList').and.returnValue(true);
      spyOn(comp.tables, 'push');
      comp.listHandler(event);
      expect(comp.createTableData).toHaveBeenCalledWith(event.endpoint);
      expect(comp.checkList).toHaveBeenCalledWith(event.endpoint);
      expect(comp.tables.push).toHaveBeenCalledWith({});
    }));

    it('should create inner table', async(() => {
      let event = {
        endpoint: 'some endpoint',
        innerTable: true,
        list: 'company',
        row: '12345-345',
        key: 'diff',
      };
      let table = {
        list: 'company',
        innerTables: {},
      };
      comp.tables.push(table);
      spyOn(comp, 'getMetadata');
      spyOn(comp, 'getData');
      spyOn(comp, 'getTable').and.returnValue(table);
      comp.listHandler(event);
      expect(table.innerTables).toEqual({
        '12345-345': {
          diff: {},
        },
      });
      expect(comp.getMetadata).toHaveBeenCalledWith(event.endpoint, {}, table);
      expect(comp.getData).toHaveBeenCalledWith(
        event.endpoint,
        null,
        {},
        false,
        table
      );
      expect(comp.getTable).toHaveBeenCalledWith(event.list);
    }));
  });

  describe('checkList method', () => {
    it('should check if table allready exist', async(() => {
      let endpoint = 'endpoint';
      let table = {
        list: 'company',
        endpoint: 'endpoint',
        first: true,
        active: true,
      };
      comp.tables.push(table);
      let result = comp.checkList(endpoint);
      expect(result).toBeFalsy();
    }));
  });

  describe('callAction method', () => {
    it('should update table after action', async(() => {
      data = {
        status: 'success',
      };
      let table = {
        endpoint: 'some endpoint',
        query: {},
      };
      let endpoint = 'endpoint';
      let selectedElements = {
        123: true,
        124: true,
        125: false,
      };
      let event = {
        action: {
          reload: true,
        },
      };
      spyOn(comp, 'getData');
      spyOn(comp, 'generateQuery').and.returnValue('');
      comp.callAction(selectedElements, endpoint, table, event);
      expect(comp.generateQuery).toHaveBeenCalledWith(table.query);
      expect(comp.getData).toHaveBeenCalledWith(table.endpoint, '', table);
    }));

    it('should change actionData of table', async(() => {
      data = {
        status: 'success',
      };
      let table = {
        endpoint: 'some endpoint',
        query: {},
        actionData: undefined,
      };
      let endpoint = 'endpoint';
      let selectedElements = {
        123: true,
        124: true,
        125: false,
      };
      let event = {
        action: {
          reload: false,
        },
      };
      comp.callAction(selectedElements, endpoint, table, event);
      expect(table.actionData).toEqual(data);
    }));
  });

  describe('updateUrl method', () => {
    it('should update query on URL', async(
      inject(
        [ActivatedRoute, Router],
        (route: ActivatedRoute, router: Router) => {
          let query = {
            filter:
              'company=1c80c973-1c9e-4392-b044-da9c450c631b&company__type=master',
            pagination: 'limit=2&offset=2',
            sort: 'ordering=-company.name',
          };
          let list = 'companyaddress';
          let queryParams = {
            'companyaddress.f.company-0':
              '1c80c973-1c9e-4392-b044-da9c450c631b',
            'companyaddress.f.company__type-1': 'master',
            'companyaddress.p.page': 1,
            'companyaddress.s.ordering': '-company.name',
          };
          spyOn(router, 'navigate');
          comp.updateUrl(query, list, true);
          expect(queryParams['companyaddress.p.page']).toEqual(1);
          expect(router.navigate).toHaveBeenCalledWith([], { queryParams });
        }
      )
    ));
  });

  describe('parseUrl method', () => {
    it('should parse query params on URL', async () => {
      let table = {
        list: 'companyaddress',
        endpoint: 'endpoint',
        first: true,
        active: false,
      };
      comp.tables = [];
      comp.tables.push(table);
      let query = {
        filter:
          'company=1c80c973-1c9e-4392-b044-da9c450c631b&company__type=master',
        sort: 'ordering=-company.name',
        pagination: 'limit=1&offset=0',
      };
      let list = 'companyaddress';
      let queryParams = {
        'companyaddress.f.company-0': '1c80c973-1c9e-4392-b044-da9c450c631b',
        'companyaddress.f.company__type-1': 'master',
        'companyaddress.p.page': 1,
        'companyaddress.s.ordering': '-company.name',
      };
      spyOn(comp, 'getTable').and.returnValue(table);
      spyOn(comp, 'getData');
      spyOn(comp, 'generateQuery');
      comp.count = 1;
      comp.limit = 1;
      comp.parseUrl(queryParams, list);
      let target = comp.getTable(list);
      expect(target.query).toEqual(query);
      expect(target.limit).toEqual(1);
      expect(target.offset).toEqual(0);
      expect(target.sorted).toEqual({
        'company.name': 'desc',
      });
      expect(comp.getData).toHaveBeenCalledWith(
        table.endpoint,
        comp.generateQuery(target.query),
        target
      );
      expect(comp.generateQuery).toHaveBeenCalledWith(target.query);
    });
  });

  describe('setPage method', () => {
    it('should calculate page by query', async () => {
      let params = {
        limit: 2,
        offset: 2,
      };
      comp.pagination = {};
      let result;
      Object.keys(params).forEach((elem, i, arr) => {
        result = comp.setPage(elem, params[elem]);
      });
      expect(comp.pagination).toEqual(params);
      expect(result).toEqual(2);
    });
  });

  describe('checkedHandler method', () => {
    it('should emit event with chekced objects', () => {
      spyOn(comp.checkedObjects, 'emit');
      comp.checkedHandler([]);
      expect(comp.checkedObjects.emit).toHaveBeenCalledWith([]);
    });
  });
});
