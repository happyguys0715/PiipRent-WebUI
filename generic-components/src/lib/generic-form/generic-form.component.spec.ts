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

import { GenericFormComponent } from './generic-form.component';
import { GenericFormService } from './../../services/generic-form.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { customTemplates } from '../../models/custom-templates';
import { Subject } from 'rxjs/Subject';

describe('GenericFormComponent', () => {
  let fixture: ComponentFixture<GenericFormComponent>;
  let comp: GenericFormComponent;
  let el;
  let metadata = [];
  let metadataError = [];
  let response = null;
  let errors = null;
  let sendData = null;
  let serviceMock = {
    getMetadata() {
      if (response.status === 'error') {
        return Observable.throw(response);
      }
      return Observable.of(metadata);
    },
    submitForm() {
      if (response.status === 'error') {
        return Observable.throw(response);
      }
      return Observable.of(response);
    },
    editForm() {
      if (response.status === 'error') {
        return Observable.throw(response);
      }
      return Observable.of(response);
    },
    delete() {
      if (response.status === 'error') {
        return Observable.throw(response);
      }
      return Observable.of(response);
    },
    getByQuery() {
      return Observable.of(response);
    },
    getAll() {
      return Observable.of(response);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericFormComponent],
      providers: [{ provide: GenericFormService, useValue: serviceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(GenericFormComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', () => {
    fixture.detectChanges();
    expect(comp).toBeDefined();
  });

  describe('ngOnInit method', () => {
    it('init view mode', fakeAsync(() => {
      comp.id = '123';
      spyOn(comp.modeEvent, 'emit');
      comp.ngOnInit();
      tick(100);
      expect(comp.mode).toEqual('view');
      expect(comp.modeEvent.emit).toHaveBeenCalledWith(comp.mode);
    }));
  });

  describe('ngOnChanges method', () => {
    it('should be defined', async(() => {
      expect(comp.ngOnChanges).toBeDefined();
    }));

    it('should add new element after save part of form', () => {
      comp.id = '123';
      comp.splitElements = [{ key: 'group' }];
      comp.metadata = [];
      comp.data = {};
      spyOn(comp, 'getData');
      spyOn(comp, 'parseMetadata');
      spyOn(comp, 'getMetadata');
      comp.ngOnChanges();
      expect(comp.getData).toHaveBeenCalledWith(comp.splitElements);
      expect(comp.metadata).toEqual(comp.splitElements);
      expect(comp.parseMetadata).toHaveBeenCalledWith(comp.metadata, comp.data);
    });

    it('should called getMetadata method', async(() => {
      let endpoint = '/contacts';
      let currentEndpoint = '/countries';
      response = {
        status: 'success',
        type: 'input',
      };
      comp.currentEndpoint = currentEndpoint;
      comp.endpoint = endpoint;
      spyOn(comp, 'getMetadata');
      comp.ngOnChanges();
      expect(comp.getMetadata).toHaveBeenCalledWith(comp.endpoint);
      expect(comp.currentEndpoint).toEqual(endpoint);
    }));

    it('should called parseMetadata method', async(() => {
      let endpoint = '/contacts';
      let data = { row: { data: { value: 'value' } } };
      let config = [{ key: 'row' }, { key: 'row' }];
      comp.currentEndpoint = endpoint;
      comp.endpoint = endpoint;
      comp.data = data;
      comp.metadata = config;
      spyOn(comp, 'parseMetadata');
      comp.ngOnChanges();
      expect(comp.parseMetadata).toHaveBeenCalledWith(comp.metadata, comp.data);
    }));

    it('should parse endpoint', async(() => {
      let endpoint = '/contacts/?company=123';
      comp.endpoint = endpoint;
      spyOn(comp, 'getMetadata');
      comp.ngOnChanges();
      expect(comp.currentEndpoint).toEqual('/contacts/');
      expect(comp.getMetadata).toHaveBeenCalledWith(comp.endpoint);
    }));

    it('should parse endpoint', async(() => {
      comp.id = '123';
      comp.mode = 'edit';
      comp.metadata = [];
      spyOn(comp, 'toggleModeMetadata');
      comp.ngOnChanges();
      expect(comp.toggleModeMetadata).toHaveBeenCalledWith(
        comp.metadata,
        comp.mode
      );
    }));
  });

  describe('setModeForElement method', () => {
    it('should set view mode for elements', () => {
      const mode = 'view';
      const config = [
        {
          type: 'collapse',
          children: [
            {
              type: 'input',
              key: 'contact',
              mode: undefined,
            },
          ],
        },
      ];
      comp.setModeForElement(config, mode);
      expect(config[0].children[0].mode).toBeDefined();
    });
  });

  describe('toggleModeMetadata method', () => {
    it('should change mode value', () => {
      const mode = 'edit';
      const modeObject = new BehaviorSubject('mode');
      const config = [
        {
          type: 'collapse',
          children: [
            {
              type: 'related',
              key: 'contact',
              mode: modeObject,
              metadata: [],
            },
          ],
        },
      ];
      comp.toggleModeMetadata(config, mode);
      modeObject.subscribe(value => {
        expect(mode).toEqual(value);
      });
    });
  });

  describe('formChange method', () => {
    it('should be defined', async(() => {
      expect(comp.formChange).toBeDefined();
    }));

    it('should updateMetadata', async(() => {
      let data = {
        fisrt_name: 'Tom',
      };
      let config = [
        {
          key: 'first_name',
        },
      ];
      comp.metadata = config;
      spyOn(comp, 'parseMetadata');
      spyOn(comp, 'parseError');
      comp.formChange(data);
      expect(comp.parseMetadata).toHaveBeenCalledWith(config, {
        fisrt_name: {
          action: 'add',
          data: {
            value: 'Tom',
          },
        },
      });
      expect(comp.parseError).toHaveBeenCalled();
    }));
  });

  describe('getMetadata method', () => {
    it('should be defined', async(() => {
      expect(comp.getMetadata).toBeDefined();
    }));

    it('should update metadata property', async(() => {
      response.status = 'success';
      metadata = [
        {
          type: 'checkbox',
          key: 'is_available',
          templateOptions: {
            label: 'test',
            type: 'checkbox',
            required: true,
          },
        },
      ];
      let endpoint = 'endpoint';
      spyOn(comp, 'parseMetadata');
      spyOn(comp, 'getData');
      spyOn(comp, 'checkRuleElement');
      spyOn(comp, 'saveHiddenFields');
      spyOn(comp, 'getReplaceElements');
      spyOn(comp, 'checkFormStorage');
      spyOn(comp, 'checkFormBuilder');
      spyOn(comp, 'updateFormData');
      spyOn(comp.str, 'emit');
      comp.getMetadata(endpoint);
      expect(comp.parseMetadata).toHaveBeenCalledTimes(2);
      expect(comp.getData).toHaveBeenCalled();
      expect(comp.saveHiddenFields).toHaveBeenCalled();
      expect(comp.str.emit).toHaveBeenCalledWith({
        str: 'Add',
      });
      expect(comp.checkRuleElement).toHaveBeenCalled();
      expect(comp.getReplaceElements).toHaveBeenCalled();
      expect(comp.checkFormStorage).toHaveBeenCalled();
      expect(comp.checkFormBuilder).toHaveBeenCalled();
      expect(comp.updateFormData).toHaveBeenCalled();
      expect(comp.show).toBeTruthy();
    }));

    it('should update metadataError property', async(() => {
      response = {
        status: 'error',
      };
      let endpoint = 'endpoint';
      comp.getMetadata(endpoint);
      expect(comp.metadataError).toEqual(response);
    }));

    it('should call getDataForForm method', async(() => {
      response.status = 'success';
      metadata = [
        {
          type: 'checkbox',
          key: 'is_available',
          templateOptions: {
            label: 'test',
            type: 'checkbox',
            required: true,
          },
        },
      ];
      comp.id = 'Some id';
      comp.show = true;
      let endpoint = 'endpoint';
      spyOn(comp, 'getDataForForm');
      spyOn(comp, 'updateElements');
      spyOn(comp, 'getReplaceElements');
      spyOn(comp, 'checkFormStorage');
      spyOn(comp, 'checkFormBuilder');
      spyOn(comp, 'updateFormData');
      comp.getMetadata(endpoint);
      expect(comp.show).toBeFalsy();
      expect(comp.updateElements).toHaveBeenCalled();
      expect(comp.getDataForForm).toHaveBeenCalled();
      expect(comp.getReplaceElements).toHaveBeenCalled();
      expect(comp.checkFormStorage).toHaveBeenCalled();
      expect(comp.checkFormBuilder).toHaveBeenCalled();
      expect(comp.updateFormData);
    }));
  });

  describe('saveHiddenFields method', () => {
    it('should save fields with show rules', () => {
      let config = <any>[
        {
          type: 'collapse',
          children: [
            {
              key: 'manager',
              hide: false,
              showIf: ['contact'],
            },
          ],
        },
      ];
      comp.hiddenFields = {
        elements: [],
        keys: [],
      };
      comp.saveHiddenFields(config);
      expect(comp.hiddenFields).toEqual(<any>{
        elements: [config[0].children[0]],
        keys: ['manager'],
      });
      expect(
        config[0].children[0].hidden instanceof BehaviorSubject
      ).toBeTruthy();
    });
  });

  describe('updateFormData method', () => {
    it('should add formData property for elements', () => {
      const config = <any>[
        {
          key: 'address',
        },
        {
          type: 'collapse',
          children: [
            {
              key: 'company',
            },
          ],
        },
      ];
      const formData = new Subject();
      comp.updateFormData(config, formData);
      expect(config[0].formData).toEqual(formData);
      expect(config[1].children[0].formData).toEqual(formData);
    });
  });

  describe('updateDataOfReplaceElements method', () => {
    it('should update data of all replace elements', () => {
      comp.id = '123';
      comp.endpoint = 'some endpoint';
      const replaceElement = {
        data: new BehaviorSubject({}),
      };
      comp.replaceElements = [replaceElement];
      spyOn(replaceElement.data, 'next');
      comp.updateDataOfReplaceElements({});
      expect(replaceElement.data.next).toHaveBeenCalled();
    });

    it('should update related data', () => {
      comp.id = '123';
      comp.endpoint = 'some endpoint';
      const replaceElement = {
        data: new BehaviorSubject({}),
      };
      const element = {
        type: 'related',
        data: new BehaviorSubject({}),
      };
      comp.replaceElements = [replaceElement];
      spyOn(comp, 'getValueOfData').and.returnValue({});
      spyOn(element.data, 'next');
      comp.updateDataOfReplaceElements(element);
      expect(comp.getValueOfData).toHaveBeenCalled();
      expect(element.data.next).toHaveBeenCalled();
    });
  });

  describe('getDataForForm method', () => {
    it('should be defined', async(() => {
      expect(comp.getDataForForm).toBeDefined();
    }));

    it('should called fillingForm method', async(() => {
      response = {
        status: 'success',
        message: 'All be fine',
        __str__: 'Str',
      };
      let endpoint = 'endpoint';
      let id = 'Some id';
      spyOn(comp, 'fillingForm');
      spyOn(comp.str, 'emit');
      comp.getDataForForm(endpoint, id);
      expect(comp.str.emit).toHaveBeenCalledWith({
        str: 'Str',
        data: response,
      });
      expect(comp.fillingForm).toHaveBeenCalled();
    }));
  });

  describe('fillingForm method', () => {
    it('should be defined', async(() => {
      expect(comp.fillingForm).toBeDefined();
    }));

    it('should udpate metadata with value', async(() => {
      let config: any[] = [
        {
          type: 'replace',
          key: 'company.is_available',
          templateOptions: {
            label: 'Checked',
            type: 'checkbox',
            required: true,
          },
        },
        {
          type: 'row',
          children: [
            {
              type: 'checkbox',
              key: 'company.checked',
              templateOptions: {
                label: 'Checked',
                type: 'checkbox',
                required: true,
              },
            },
          ],
        },
        {
          type: 'list',
          endpoint: '/candidatecontact/',
          query: {
            contact: '{id}',
          },
          prefilled: {
            contact: '{id}',
          },
        },
        {
          key: 'timeline',
        },
      ];
      let data = {
        company: {
          is_available: true,
          checked: false,
        },
        id: '123',
      };
      spyOn(comp, 'getValueOfData');
      comp.fillingForm(config, data);
      expect(config[0].data instanceof BehaviorSubject).toBeTruthy();
      expect(config[2]).toEqual({
        type: 'list',
        endpoint: '/candidatecontact/',
        query: {
          contact: '123',
        },
        prefilled: {
          contact: '123',
        },
      });
      expect(config[3].value).toEqual(data);
      expect(comp.getValueOfData).toHaveBeenCalled();
    }));
  });

  describe('getValueOfData method', () => {
    it('should be defined', async(() => {
      expect(comp.getValueOfData).toBeDefined();
    }));

    it('should udpate metadata with value', async(() => {
      let object = {
        type: 'related',
        key: 'contact',
        value: undefined,
        options: undefined,
        templateOptions: {
          label: 'Contact',
          type: 'related',
          required: true,
        },
      };
      let key = 'company.contact';
      let data = {
        company: {
          contact: {
            __str__: 'Mr. Tom Smith',
            id: '123',
          },
        },
      };
      let testMetadata = [object];
      comp.getValueOfData(data, key, object, testMetadata);
      expect(object['value']).toEqual({
        __str__: 'Mr. Tom Smith',
        id: '123',
      });
      expect(object.options).toEqual([
        {
          __str__: 'Mr. Tom Smith',
          id: '123',
        },
      ]);
    }));
  });

  describe('submitForm method', () => {
    it('should be defined', async(() => {
      expect(comp.submitForm).toBeDefined();
    }));

    it('should update send data', async(() => {
      let field = 'email';
      response = {
        status: 'success',
        message: 'All be fine',
      };
      comp.endpoint = 'endpoint';
      let form = {
        [field]: 'test@test.com',
      };
      let data = { username: 'test' };
      let result = Object.assign({}, data, form);
      comp.form = form;
      spyOn(comp, 'parseResponse');
      spyOn(comp.event, 'emit');
      comp.submitForm(data);
      expect(comp.parseResponse).toHaveBeenCalled();
      expect(comp.event.emit).toHaveBeenCalledWith({ type: 'saveStart' });
      expect(comp.sendData).toEqual(result);
    }));

    it('should called parseResponse method', async(() => {
      response = {
        status: 'success',
        message: 'All be fine',
      };
      comp.endpoint = 'endpoint';
      comp.editForm = true;
      let data = { username: 'test' };
      spyOn(comp, 'parseResponse');
      spyOn(comp.event, 'emit');
      comp.submitForm(data);
      expect(comp.sendData).toEqual(data);
      expect(comp.parseResponse).toHaveBeenCalled();
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'saveStart',
      });
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'sendForm',
        data: response,
        status: 'success',
      });
    }));

    it('should called parseError method', async(() => {
      response = {
        status: 'error',
        errors: {
          email: 'Is not valid',
        },
      };
      comp.endpoint = 'endpoint';
      let data = { username: 'test' };
      spyOn(comp, 'parseError');
      comp.submitForm(data);
      expect(comp.parseError).toHaveBeenCalled();
    }));

    it('should call parseResponse for edit form', async(() => {
      response = {
        status: 'success',
        message: 'All be fine',
      };
      comp.endpoint = 'endpoint';
      comp.editForm = true;
      let data = { username: 'test' };
      spyOn(comp, 'parseResponse');
      spyOn(comp.event, 'emit');
      comp.submitForm(data);
      expect(comp.parseResponse).toHaveBeenCalledWith(response);
      expect(comp.event.emit).toHaveBeenCalledWith({
        type: 'sendForm',
        data: response,
        status: 'success',
      });
    }));

    it('should call parseError for edit form', async(() => {
      response = {
        status: 'error',
        errors: {
          username: 'It is not valid property',
        },
      };
      comp.endpoint = 'endpoint';
      comp.editForm = true;
      let data = { username: 'test' };
      spyOn(comp, 'parseError');
      comp.submitForm(data);
      expect(comp.parseError).toHaveBeenCalledWith(response.errors);
    }));
  });

  describe('parseError method', () => {
    it('should be defined', async(() => {
      expect(comp.parseError).toBeDefined();
    }));

    it('should emit redirect', async(() => {
      let field = 'email';
      let data = {
        register: field,
      };
      comp.sendData = { username: field };
      spyOn(comp.redirect, 'emit');
      comp.parseError(data);
      expect(comp.redirect.emit).toHaveBeenCalled();
    }));

    it('should called resetData, updateErrors methods and emit errorForm', async(() => {
      let field = 'email';
      let message = 'Email is invalid';
      let data = {
        [field]: message,
      };
      comp.errors = {};
      comp.response = {};
      spyOn(comp, 'resetData');
      spyOn(comp, 'updateErrors');
      spyOn(comp.errorForm, 'emit');
      comp.parseError(data);
      expect(comp.resetData).toHaveBeenCalledTimes(2);
      expect(comp.updateErrors).toHaveBeenCalled();
      expect(comp.errorForm.emit).toHaveBeenCalled();
    }));
  });

  describe('parseResponse method', () => {
    it('should be defined', async(() => {
      expect(comp.parseResponse).toBeDefined();
    }));

    it('should parse response', async(() => {
      let field = 'email';
      let message = 'Email is valid';
      let data = {
        [field]: message,
      };
      comp.editForm = false;
      comp.response = {};
      comp.errors = {};
      spyOn(comp, 'resetData');
      spyOn(comp.responseForm, 'emit');
      comp.parseResponse(data);
      expect(comp.response).toEqual(data);
      expect(comp.resetData).toHaveBeenCalledTimes(2);
      expect(comp.responseForm.emit).toHaveBeenCalledWith(data);
    }));
  });

  describe('eventHandler method', () => {
    it('should be defined', async(() => {
      expect(comp.eventHandler).toBeDefined();
    }));

    it('should update options for related data', async(() => {
      let field = 'country';
      let query = '?country';
      let param = 'id';
      let reset = 'city';
      let event = {
        type: 'update',
        el: {
          type: 'related',
          key: 'country',
        },
        currentQuery: 'some query',
      };
      comp.metadata = [];
      spyOn(comp, 'getData');
      comp.eventHandler(event);
      expect(comp.getData).toHaveBeenCalledWith(
        comp.metadata,
        event.el.key,
        event.currentQuery
      );
    }));

    it('should handle event', async(() => {
      let field = 'country';
      let query = '?country';
      let param = 'id';
      let reset = 'city';
      let event = {
        type: 'change',
        el: {
          type: 'related',
          related: {
            field,
            query,
            reset,
          },
        },
        value: [
          {
            [param]: 2,
          },
        ],
      };
      comp.metadata = [];
      spyOn(comp, 'getData');
      spyOn(comp, 'resetRalatedData');
      spyOn(comp.event, 'emit');
      comp.eventHandler(event);
      expect(comp.getData).toHaveBeenCalled();
      expect(comp.resetRalatedData).toHaveBeenCalled();
      expect(comp.event.emit).toHaveBeenCalled();
    }));

    it('should handle event if type equal "rule"', async(() => {
      let e = {
        type: 'change',
        el: {
          type: 'rule',
          endpoint: 'some endpoint',
          related: {
            field: 'rules',
            query: '?company=',
            param: 'id',
            prop: 'app',
          },
        },
        value: [{ id: 2 }],
      };
      comp.metadata = [];
      spyOn(comp, 'getRalatedData');
      comp.eventHandler(e);
      expect(comp.getRalatedData).toHaveBeenCalledWith(
        comp.metadata,
        'rules',
        'some endpoint',
        null,
        '?company=2',
        'app',
        false
      );
    }));

    it('should parse response for delete object', async(() => {
      let e = {
        type: 'delete',
        endpoint: 'some endpoint',
        id: 123,
      };
      response = {
        status: 'success',
        message: 'Deleted',
      };
      comp.metadata = [];
      spyOn(comp, 'parseResponse');
      comp.eventHandler(e);
      expect(comp.parseResponse).toHaveBeenCalledWith(response);
    }));

    it('should parse error for delete object', async(() => {
      let e = {
        type: 'delete',
        endpoint: 'some endpoint',
        id: 123,
      };
      response = {
        status: 'error',
        errors: ['canceled'],
      };
      comp.metadata = [];
      spyOn(comp, 'parseError');
      comp.eventHandler(e);
      expect(comp.parseError).toHaveBeenCalledWith(response);
    }));

    it('should update timeline after change', async(() => {
      let e = {
        type: 'update',
        el: {
          key: 'timeline',
          endpoint: 'some endpoint',
        },
        query: 'some query',
      };
      comp.metadata = [];
      spyOn(comp, 'getRalatedData');
      comp.eventHandler(e);
      expect(comp.getRalatedData).toHaveBeenCalledWith(
        comp.metadata,
        e.el.key,
        e.el.endpoint,
        null,
        e.query,
        undefined,
        false
      );
    }));

    it('should update value for replace elements', async(() => {
      let e = {
        type: 'updateData',
        el: {
          key: 'related',
          endpoint: 'some endpoint',
        },
      };
      spyOn(comp, 'updateDataOfReplaceElements');
      comp.eventHandler(e);
      expect(comp.updateDataOfReplaceElements).toHaveBeenCalledWith(e.el);
    }));
  });

  describe('buttonActionHandler method', () => {
    it('should be defined', async(() => {
      expect(comp.buttonActionHandler).toBeDefined();
    }));

    it('should emit button action', async(() => {
      let event = 'event';
      spyOn(comp.buttonAction, 'emit');
      comp.buttonActionHandler(event);
      expect(comp.buttonAction.emit).toHaveBeenCalledWith(event);
    }));
  });

  describe('getRelatedMetadata method', () => {
    it('should get metadata of related elements', () => {
      metadata = <any>{ fields: [] };
      response.status = 'success';
      let testMetadata = [
        {
          key: 'skill',
        },
      ];
      let key = 'skill';
      let endpoint = 'some endpoint';
      const metadataQuery = 'vacancie=true';
      spyOn(comp, 'getData');
      comp.getRelatedMetadata(testMetadata, key, endpoint, metadataQuery);
      expect(comp.getData).toHaveBeenCalled();
      expect(testMetadata[0]['metadata']).toEqual(metadata['fields']);
    });
  });

  describe('getRalatedData method', () => {
    it('should be defined', async(() => {
      expect(comp.getRalatedData).toBeDefined();
    }));

    it('should get all elements', async(() => {
      let key = 'address.country';
      let endpoint = '/countries';
      let inner = true;
      response = {
        results: [{ id: 2, name: 'Australia' }],
      };
      comp.metadata = [];
      spyOn(comp, 'parseMetadata');
      comp.getRalatedData(
        comp.metadata,
        key,
        endpoint,
        null,
        null,
        null,
        inner
      );
      expect(comp.parseMetadata).toHaveBeenCalled();
    }));

    it('should get elements by query', async(() => {
      let key = 'address.country';
      let endpoint = '/countries';
      let query = '?region=5';
      let param = 'app';
      let fields = {};
      response = {
        results: [{ id: 2, name: 'Australia' }],
      };
      comp.metadata = [];
      spyOn(comp, 'parseMetadata');
      spyOn(comp, 'updateMetadata');
      spyOn(comp, 'generateQueryForRelatedFields').and.returnValue(
        `fields=__str__&fields=id`
      );
      comp.getRalatedData(comp.metadata, key, endpoint, fields, query, param);
      expect(comp.generateQueryForRelatedFields).toHaveBeenCalledWith({});
      expect(comp.parseMetadata).toHaveBeenCalled();
      expect(comp.updateMetadata).toHaveBeenCalledWith([], key);
    }));

    it('should update metadata for rules type', async(() => {
      let key = 'rules';
      let endpoint = '/core/workflownodes/';
      let query = '?company=123&workflow=124';
      response = {
        results: [{ number: 10, name_before_activation: 'New' }],
      };
      comp.endpoint = endpoint;
      comp.metadata = [];
      comp.workflowData = {
        company: '123',
        number: '10',
        workflow: '124',
      };
      spyOn(comp, 'updateValueOfRules');
      spyOn(comp, 'parseMetadata');
      spyOn(comp, 'getElementFromMetadata').and.returnValue({
        activeMetadata: [],
      });
      comp.getRalatedData(
        comp.metadata,
        key,
        endpoint,
        null,
        query,
        'options',
        false
      );
      expect(comp.updateValueOfRules).toHaveBeenCalledWith(response.results);
      expect(comp.getElementFromMetadata).toHaveBeenCalled();
      expect(comp.parseMetadata).toHaveBeenCalledWith(
        comp.metadata,
        {
          [key]: {
            action: 'add',
            data: { options: response.results, currentQuery: query },
          },
        },
        false
      );
    }));
  });

  describe('generateQueryForRelatedFields method', () => {
    it('should be defined', async(() => {
      expect(comp.generateQueryForRelatedFields).toBeDefined();
    }));

    it('should generate query by default', async(() => {
      let fields = {};
      let query = comp.generateQueryForRelatedFields(fields);
      expect(query).toEqual(`fields=__str__&fields=id`);
    }));

    it('should generate query', async(() => {
      let fields = {
        display: 'name',
        param: 'id',
        code2: 'code2',
      };
      let query = comp.generateQueryForRelatedFields(fields);
      expect(query).toEqual(`fields=code2&fields=name&fields=id`);
    }));
  });

  describe('getData method', () => {
    it('should be defined', async(() => {
      expect(comp.getData).toBeDefined();
    }));

    it('should get all related data', async(() => {
      let config = [
        {
          type: 'related',
          key: 'address.country',
          endpoint: '/countries',
        },
        {
          type: 'row',
          children: [
            {
              type: 'related',
              key: 'address.city',
              endpoint: '/cities',
            },
          ],
        },
      ];
      spyOn(comp, 'getRalatedData');
      comp.getData(config, 'address.city', '?region=2');
      expect(comp.getRalatedData).toHaveBeenCalledWith(
        config[1]['children'],
        'address.city',
        '/cities',
        {},
        '?region=2&limit=-1'
      );
    }));

    it('should get all related data', async(() => {
      let config = [
        {
          type: 'related',
          key: 'address.country',
          endpoint: '/countries',
          list: true,
          metadata_query: {
            vacancie: true,
          },
          templateOptions: {
            display: 'name',
            param: 'id',
          },
        },
        {
          type: 'row',
          children: [
            {
              type: 'related',
              key: 'address.city',
              endpoint: '/cities',
              templateOptions: {
                display: 'name',
                param: 'id',
              },
            },
          ],
        },
      ];
      spyOn(comp, 'getRalatedData');
      spyOn(comp, 'parseMetadataQuery');
      spyOn(comp, 'getRelatedMetadata');
      comp.getData(config);
      expect(comp.getRalatedData).toHaveBeenCalledTimes(1);
      expect(comp.parseMetadataQuery).toHaveBeenCalled();
      expect(comp.getRelatedMetadata).toHaveBeenCalled();
    }));
  });

  describe('pasreMetadataQuery method', () => {
    it('should generate metadata query', () => {
      const config = {
        data: {
          vacancie: true,
          query: false,
        },
      };
      const result = comp.parseMetadataQuery(config, 'data');
      expect(result).toEqual('vacancie=true&query=false');
    });
  });

  describe('parseMetadata method', () => {
    it('should be defined', async(() => {
      expect(comp.parseMetadata).toBeDefined();
    }));

    it('should update metadata', async(() => {
      let fieldCity = 'address.city';
      let fieldCountry = 'address.country';
      let fieldBusinnesId = 'company.business_id';
      let config = [
        {
          type: 'related',
          key: fieldCountry,
          endpoint: '/countries',
          readonly: false,
          related: {
            reset: 'region',
          },
        },
        {
          type: 'row',
          children: [
            {
              type: 'related',
              key: fieldCity,
              endpoint: '/cities',
            },
            {
              type: 'business_id',
              key: 'input',
            },
          ],
        },
        {
          type: 'hidden',
        },
      ];
      let params = {
        [fieldCity]: {
          action: 'add',
          data: {
            options: [{ key: 1, name: 'Tampa' }],
          },
        },
        [fieldCountry]: {
          query: '?region=',
          id: 3,
          update: true,
          value: 'Australia',
          block: true,
        },
        [fieldBusinnesId]: {
          action: 'update',
          block: true,
          value: '7777',
        },
      };
      comp.hide = true;
      spyOn(comp, 'getRalatedData');
      spyOn(comp, 'getElementFromMetadata').and.returnValue(config[0]);
      spyOn(comp, 'resetRalatedData');
      comp.parseMetadata(config, params);
      expect(comp.getRalatedData).toHaveBeenCalled();
      expect(comp.resetRalatedData).toHaveBeenCalled();
      expect(comp.getElementFromMetadata).toHaveBeenCalled();
      expect(config[0]['readonly']).toBeTruthy();
      expect(config[0]['value']).toEqual('Australia');
      expect(config[2]['hide']).toEqual(comp.hide);
    }));
  });

  describe('resetRalatedData method', () => {
    it('should be defined', async(() => {
      expect(comp.resetRalatedData).toBeDefined();
    }));

    it('should reset related data', async(() => {
      let fieldCity = 'address.city';
      let fieldCountry = 'address.country';
      let config = [
        {
          type: 'related',
          key: fieldCountry,
          endpoint: '/countries',
          options: [
            {
              key: 1,
              name: 'Tampa',
            },
          ],
        },
        {
          type: 'row',
          children: [
            {
              type: 'related',
              key: fieldCity,
              endpoint: '/cities',
              options: [
                {
                  key: 1,
                  name: 'Tampa',
                },
              ],
              value: 'Tampa',
            },
          ],
        },
      ];
      comp.resetRalatedData(config, fieldCity, 'options');
      expect(config[1]['children'][0].options).toBeUndefined();
      expect(config[1]['children'][0].value).toBeUndefined();
    }));
  });

  describe('updateErrors method', () => {
    it('should be defined', async(() => {
      expect(comp.updateErrors).toBeDefined();
    }));

    it('should update errors', async(() => {
      let fieldCity = 'address.city';
      let fieldCountry = 'address.country';
      let err = {};
      let error = {
        [fieldCity]: 'City is invalid',
        [fieldCountry]: 'City is invalid',
      };
      let res = {
        [fieldCity]: 'City is valid',
        [fieldCountry]: 'City is valid',
      };
      comp.updateErrors(err, error, res);
      expect(err).toEqual(error);
      expect(res).toEqual({});
    }));
  });

  describe('resetData method', () => {
    it('should be defined', async(() => {
      expect(comp.resetData).toBeDefined();
    }));

    it('should reset data', async(() => {
      let fieldCity = 'address.city';
      let fieldCountry = 'address.country';
      let data = { fieldCity, fieldCountry };
      comp.resetData(data);
      expect(data[fieldCity]).toBeUndefined();
      expect(data[fieldCountry]).toBeUndefined();
    }));
  });

  describe('checkRuleElement method', () => {
    it('should be defined', async(() => {
      expect(comp.checkRuleElement).toBeDefined();
    }));

    it('should check rule element', async(() => {
      let active = {
        type: 'related',
        key: 'rules',
        read_only: false,
        many: true,
        useOptions: true,
        templateOptions: {
          label: 'Active',
          display: '{name_before_activation}',
          param: 'number',
        },
      };
      let config = [
        {
          type: 'rule',
          key: 'rules',
          activeMetadata: null,
        },
      ];
      spyOn(comp, 'getElementFromMetadata').and.returnValue(config[0]);
      spyOn(comp, 'getRalatedData');
      comp.checkRuleElement(config);
      expect(comp.getElementFromMetadata).toHaveBeenCalledWith(config, 'rules');
      expect(comp.getRalatedData).toHaveBeenCalledTimes(2);
      expect(config[0].activeMetadata).toEqual([active]);
    }));
  });

  describe('getElementFromMetadata method', () => {
    it('should be defined', async(() => {
      expect(comp.getElementFromMetadata).toBeDefined();
    }));

    it('should return element from metadata', async(() => {
      let config = [
        {
          type: 'row',
          key: 'country',
          children: [
            {
              type: 'rule',
              key: 'rules',
            },
          ],
        },
      ];
      let result = comp.getElementFromMetadata(config, 'rules');
      expect(result).toEqual(config[0]['children'][0]);
    }));
  });

  describe('updateWorkflowData method', () => {
    it('should be defined', async(() => {
      expect(comp.updateWorkflowData).toBeDefined();
    }));

    it('should update workflow data property', async(() => {
      let event = {
        el: {
          key: 'company',
        },
        value: '123',
      };
      spyOn(comp, 'getDataOfWorkflownode');
      comp.workflowData = {};
      comp.updateWorkflowData(event);
      expect(comp.getDataOfWorkflownode).toHaveBeenCalled();
      expect(comp.workflowData.company).toEqual('123');
    }));

    it('should call getDataOfWorkflownode method', async(() => {
      let event = {
        el: {
          key: 'company',
        },
        value: [
          {
            name: 'Home LTD',
            id: '123',
          },
        ],
      };
      comp.workflowData = {
        workflow: '124',
        number: 10,
      };
      spyOn(comp, 'getDataOfWorkflownode');
      comp.updateWorkflowData(event);
      expect(comp.workflowData.company).toEqual('123');
      expect(comp.getDataOfWorkflownode).toHaveBeenCalled();
    }));
  });

  describe('getDataOfWorkflownode method', () => {
    it('should be defined', async(() => {
      expect(comp.getDataOfWorkflownode).toBeDefined();
    }));

    it('should update workflow data property', async(() => {
      comp.workflowData = {
        company: '123',
        number: 10,
        workflow: '124',
      };
      let config = [
        {
          key: 'rules',
          activeMetadata: [
            {
              key: 'rules',
            },
          ],
        },
      ];
      comp.metadata = config;
      comp.workflowEndpoints = {
        state: '/workflownodes',
        app: '',
      };
      spyOn(comp, 'getElementFromMetadata').and.returnValue(config[0]);
      spyOn(comp, 'getRalatedData');
      comp.getDataOfWorkflownode();
      expect(comp.getElementFromMetadata).toHaveBeenCalledWith(config, 'rules');
      expect(comp.getRalatedData).toHaveBeenCalledWith(
        comp.metadata,
        'rules',
        comp.workflowEndpoints.state,
        null,
        `?company=123&workflow=124&limit=-1`
      );
    }));
  });

  describe('updateMetadata method', () => {
    it('should be defined', async(() => {
      expect(comp.updateMetadata).toBeDefined();
    }));

    it('should update metadata', async(() => {
      let key = 'rules';
      let config = [
        {
          type: 'row',
          children: [
            {
              key: 'rules',
            },
          ],
        },
      ];
      comp.updateMetadata(config, key);
      expect(config).toEqual(config);
    }));
  });

  describe('updateValueOfRules method', () => {
    it('should be defined', async(() => {
      expect(comp.updateValueOfRules).toBeDefined();
    }));

    it('should update value of element', async(() => {
      let res = [
        {
          number: 20,
          rules: {
            active: [20],
            required_states: [10],
            required_functions: ['some function'],
          },
        },
      ];
      let key = 'rules';
      comp.metadata = [
        {
          key: 'rules',
        },
      ];
      comp.workflowData = {
        number: 20,
      };
      spyOn(comp, 'getElementFromMetadata').and.returnValue(comp.metadata[0]);
      comp.updateValueOfRules(res);
      expect(comp.metadata[0].value).toEqual(res[0].rules);
    }));

    it('should update value of element with null', async(() => {
      let res = [
        {
          number: 20,
          rules: null,
        },
      ];
      let key = 'rules';
      comp.metadata = [
        {
          key: 'rules',
        },
      ];
      comp.workflowData = {
        number: 10,
      };
      spyOn(comp, 'getElementFromMetadata').and.returnValue(comp.metadata[0]);
      comp.updateValueOfRules(res);
      expect(comp.metadata[0].value).toBeNull();
    }));
  });

  describe('updateElements method', () => {
    it('should update elements', () => {
      let config = [
        {
          children: [
            {
              type: 'list',
            },
          ],
        },
      ];
      comp.updateElements(config, 'id', 'list', 123);
      expect(config[0].children[0]['id']).toEqual(123);
    });

    it('should update elements for edit form', () => {
      let prop = 'editForm';
      let config = [
        {
          children: [
            {
              type: 'list',
            },
          ],
        },
      ];
      comp.updateElements(config, prop, undefined, true);
      expect(config[0][prop]).toBeTruthy();
      expect(config[0].children[0][prop]).toBeTruthy();
    });
  });

  describe('checkFormStorage method', () => {
    it('should update metadata for formStorage page', () => {
      const endpoint = '/core/formstorages/';
      const config = <any>[
        {
          type: 'collapse',
          children: [
            {
              key: 'data',
              type: 'input',
              read_only: false,
            },
            {
              key: 'status',
              hide: false,
            },
          ],
        },
      ];
      comp.checkFormStorage(config, endpoint);
      expect(config[0].children[0].type).toEqual('json');
      expect(config[0].children[0].read_only).toBeTruthy();
      expect(config[0].children[1].hide).toBeTruthy();
    });
  });

  describe('checkFormBuilder method', () => {
    it('should remove groups element of from builder', () => {
      let endpoint = '/core/forms/';
      let config = [{ key: 'groups' }];
      comp.editForm = false;
      comp.checkFormBuilder(config, endpoint);
      expect(comp.splitElements.length).toEqual(1);
      expect(comp.splitElements[0]).toEqual({
        key: 'groups',
        read_only: false,
        createOnly: true,
        type: 'fieldsGroup',
      });
    });

    it('should update groups element of form builder', () => {
      let endpoint = '/core/forms/';
      let config = <any>[{ key: 'groups' }];
      comp.editForm = true;
      comp.checkFormBuilder(config, endpoint);
      expect(config[0]).toEqual({
        key: 'groups',
        read_only: false,
        createOnly: true,
        type: 'fieldsGroup',
      });
    });

    it('should change choice element on formOptions type', () => {
      let endpoint = '/core/radiobuttonsformfields/';
      let config = <any>[{ key: 'choices' }];
      comp.checkFormBuilder(config, endpoint);
      expect(config[0].type).toEqual('formOptions');
    });
  });

  describe('getReplaceElements method', () => {
    it('should update replaceElements property', () => {
      const config = [
        {
          type: 'collapse',
          children: [
            {
              type: 'replace',
            },
          ],
        },
      ];
      comp.replaceElements = [];
      comp.getReplaceElements(config);
      expect(comp.replaceElements.length).toEqual(1);
    });
  });

  describe('addCustomTemplates method', () => {
    it('should add custom templates for related objects', () => {
      const config = [
        {
          type: 'related',
          custom: ['__str__'],
          customValue: [],
        },
      ];
      const data = {
        __str__: 'Mr. Tom Smith',
      };
      spyOn(comp, 'getValueOfData').and.returnValue('Mr. Tom Smith');
      comp.addCustomTemplates(config, data);
      expect(config[0].customValue).toEqual(['Mr. Tom Smith']);
    });
  });
});
