import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('DynamicFormComponent', () => {
  let fixture;
  let comp;

  const config = [{}];
  const errors = {
    non_field_errors: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent],
      providers: [
        FormBuilder,
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).overrideComponent(DynamicFormComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DynamicFormComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the input assertion', async(
    inject([FormBuilder], (fb: FormBuilder) => {
      comp.config = config;
      comp.errors = errors;
      fixture.detectChanges();
      expect(comp.form).toBeDefined();
      expect(comp.config).toBeDefined();
    })
  ));

  describe('ngOnInit method', () => {
    it('should called addData method', async(
      inject([FormBuilder], (fb: FormBuilder) => {
        let form = fb.group({});
        comp.config = [];
        comp.ngOnInit();
        expect(comp.currentForm).toEqual([]);
      })
    ));
  });

  describe('ngOnChanges method', () => {
    it('should called addData method', async(() => {
      spyOn(comp, 'addData');

      comp.ngOnChanges();
      expect(comp.addData).toHaveBeenCalled();
    }));

    it('should update values', async(
      inject([FormBuilder], (fb: FormBuilder) => {
        comp.config = <any>['some'];
        let form = fb.group({});
        comp.form = form;
        let currentForm = [];
        spyOn(comp, 'getValues').and.returnValue({});
        spyOn(comp.formChange, 'emit');
        comp.ngOnChanges();
        expect(comp.currentForm).toEqual(comp.config);
        expect(comp.getValues).toHaveBeenCalled();
        expect(comp.formChange.emit).toHaveBeenCalledWith({});
      })
    ));
  });

  describe('getValues method', () => {
    it('should return values of form', () => {
      let data = { first_name: 'Tom' };
      let list = ['first_name'];
      spyOn(comp, 'getValue').and.returnValue('Tom');
      let result = comp.getValues(data, list);
      expect(result).toEqual(data);
    });
  });

  describe('getValue method', () => {
    it('should return value of form element', inject(
      [FormBuilder],
      (fb: FormBuilder) => {
        let list = ['address.country'];
        comp.form = fb.group({});
        comp.form.addControl('address', fb.group({ country: 'Australia' }));
        let result = comp.getValues(comp.form, list);
        expect(result).toEqual({
          'address.country': 'Australia',
        });
      }
    ));
  });

  describe('handleSubmit method', () => {
    it('should emit event of submit form', async(() => {
      let event = {
        preventDefault() {
          return true;
        },
        stopPropagation() {
          return true;
        },
      };
      comp.form = {
        value: {},
      };
      comp.hiddenFields = {
        elements: [],
      };
      spyOn(comp, 'removeValuesOfHiddenFields');
      spyOn(comp.submit, 'emit');
      spyOn(comp, 'filterSendData');
      comp.handleSubmit(event);
      expect(comp.removeValuesOfHiddenFields).toHaveBeenCalled();
      expect(comp.filterSendData).toHaveBeenCalled();
      expect(comp.submit.emit).toHaveBeenCalled();
    }));
  });

  describe('eventHandler method', () => {
    it('should be emit event', fakeAsync(() => {
      comp.hiddenFields = {
        elements: [{}],
      };
      spyOn(comp.event, 'emit');
      spyOn(comp, 'parseConfig');
      comp.eventHandler(<any>'event');
      tick(50);
      expect(comp.event.emit).toHaveBeenCalled();
      expect(comp.parseConfig).toHaveBeenCalled();
    }));
  });

  describe('parseConfig method', () => {
    it('should parseConfig for check hidden fields', () => {
      let metadata = [
        {
          type: 'collapse',
          children: [
            {
              key: 'contact',
              showIf: ['user'],
            },
          ],
        },
      ];
      spyOn(comp, 'checkHiddenFields');
      comp.parseConfig(metadata);
      expect(comp.checkHiddenFields).toHaveBeenCalled();
    });
  });

  describe('buttonActionHandler method', () => {
    it('should be emit event', () => {
      spyOn(comp.buttonAction, 'emit');
      comp.buttonActionHandler('event');
      expect(comp.buttonAction.emit).toHaveBeenCalled();
    });
  });

  describe('resourseDataHandler method', () => {
    it('should be emit event', () => {
      spyOn(comp.resourseData, 'emit');
      comp.resourseDataHandler('event');
      expect(comp.resourseData.emit).toHaveBeenCalled();
    });
  });

  describe('addData method', () => {
    it('should update metadata', async(() => {
      spyOn(comp, 'updateForm');
      comp.config = [
        {
          key: 'address.country',
          value: '',
          templateOptions: {
            readonly: false,
          },
        },
      ];
      comp.data = [
        {
          key: 'country',
          value: 'Australia',
          read_only: true,
        },
      ];
      fixture.detectChanges();
      comp.addData(comp.data, comp.config);
      expect(comp.updateForm).toHaveBeenCalled();
    }));
  });

  describe('updateForm method', () => {
    it('should update metadata', async(
      inject([FormBuilder], fb => {
        let form = fb.group({});
        form.addControl('address', fb.group({}));
        form.get('address').addControl('country', fb.control(''));
        let data = {
          country: {
            action: 'update',
            value: 'Australia',
          },
        };
        comp.updateForm('address.country'.split('.'), data, form, 'country');
        expect(form.get('address').get('country').value).toEqual('Australia');
      })
    ));
  });

  describe('checkHiddenFields method', () => {
    it('should check hidden field', () => {
      let field = <any>{
        hide: true,
        showIf: ['contact'],
      };
      field.hidden = new BehaviorSubject(true);
      spyOn(comp, 'checkShowRules').and.returnValue(true);
      spyOn(field.hidden, 'next');
      comp.checkHiddenFields(field);
      expect(comp.checkShowRules).toHaveBeenCalledWith(['contact']);
      expect(field.hidden.next).toHaveBeenCalledWith(false);
    });
  });

  describe('checkShowRules method', () => {
    it('should return true if rule is string', () => {
      let rule = ['contact'];
      comp.form = {
        data: {
          contact: '123',
        },
      };
      spyOn(comp, 'getValueByKey').and.returnValue('123');
      let result = comp.checkShowRules(rule);
      expect(result).toBeTruthy();
    });

    it('should return false if rule is string', () => {
      let rule = ['contact'];
      comp.form = {
        data: {
          contact: null,
        },
      };
      spyOn(comp, 'getValueByKey').and.returnValue(null);
      let result = comp.checkShowRules(rule);
      expect(result).toBeFalsy();
    });

    it('should return true if rule is object', () => {
      let rule = [
        {
          is_available: false,
        },
      ];
      comp.form = {
        data: {
          is_available: false,
        },
      };
      spyOn(comp, 'getValueByKey').and.returnValue(false);
      let result = comp.checkShowRules(rule);
      expect(result).toBeTruthy();
    });

    it('should return false if rule is object', () => {
      let rule = [
        {
          is_available: false,
        },
      ];
      comp.form = {
        data: {
          is_available: true,
        },
      };
      spyOn(comp, 'getValueByKey').and.returnValue(true);
      let result = comp.checkShowRules(rule);
      expect(result).toBeFalsy();
    });
  });

  describe('getValueByKey method', () => {
    it('should return value by some key', () => {
      let data = {
        contact: {
          name: 'Tom',
        },
      };
      let key = 'contact.name';
      let result = comp.getValueByKey(key, data);
      expect(result).toEqual('Tom');
    });
  });

  describe('removeValuesOfHiddenFields method', () => {
    it('should call removeValue method form hidden elements', () => {
      let metadata = [
        {
          type: 'input',
          key: 'first_name',
          hide: true,
        },
      ];
      let data = {
        first_name: 'Tom',
      };
      spyOn(comp, 'removeValue');
      comp.removeValuesOfHiddenFields(metadata, data);
      expect(comp.removeValue).toHaveBeenCalledWith('first_name', data);
    });
  });

  describe('removeValue method', () => {
    it('should remove value from data', () => {
      let key = 'contact.email';
      let data = {
        contact: {
          email: 'test@test.com',
        },
      };
      comp.removeValue(key, data);
      expect(data.contact.email).toBeUndefined();
    });
  });

  describe('filterSendData method', () => {
    it('should check metadata for send property', () => {
      const metadata = [
        {
          type: 'collapse',
          children: [
            {
              type: 'related',
              key: 'contact.picture',
              send: false,
            },
          ],
        },
      ];
      const data = {
        contact: {
          picture: 'picture.jpg',
        },
      };
      spyOn(comp, 'removeValue');
      comp.filterSendData(metadata, data);
      expect(comp.removeValue).toHaveBeenCalled();
    });
  });
});
